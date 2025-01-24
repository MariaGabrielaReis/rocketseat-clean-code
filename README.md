# Clean Code

### O que é?

Para Diego Fernandes, o "clean code prático", diferente do teórico, cobre:

- legibilidade, de fácil leitura (não significa ser simples, o código pode ser complexo, mas deve ser legível)
- tem que ser manutenível (de fácil manutenção). Precisa conseguir ler o código e dar manutenção
- confiança e previsibilidade

O que NÃO é Clean Code:

- não é um livro, é um conceito
- não é estrutura de pastas
- não é código pequeno
- não tem a ver com arquitetura/design de software (clean archtechture, DDD...). Algumas dessas rpáticas ajudam a deixar o código limpo, mas não são obrigatórios
- não tem a ver com a performance

> "Qualquer pessoa escreve código limpo para si mesmo, a questão é criar uma base compartilhável entre um time"

Pilares do Código Limpo prático:
1. Testes: Implementar testes automatizados ajuda com os pilares de manutenção, previsibilidade e confiança;
2. Revisão: Implementar revisões (pelo menos 2 pessoas avaliando o código)
3. Refatoração: se você não faz, ou não está aprendendo nada novo ou só está cuspindo features novas e não está preocupado em melhorar códigos feitos anteriormente
4. Simplicidade (KISS - Keep it simple and stupid): muitas vezes quem traz complexidade pro código é o próprio dev, mas precisa manter o código simples, não pensar em soluções pra problemas que não existem
5. Iterações curtas: não ter feature demorando dias, semanas, para ir para revisão/produção. Buscar fazer pequenas adições no código para ir incrementando e validando aos poucos.

---

## Código Limpo no Javascript

<details>
   <summary>Acessar anotações das aulas</summary>
  
### Nomenclatura de variáveis

```js
const users = ["Diego", "Mayk", "Rodrigo"];
const filtered = users.filter(u => u.startsWith("D"));
```

1. Evite diminutivos (`u => users`)
2. Mesmo que a variável fique com nome grande, deixe claro sobre o que ela se trata (`filtered => usersStartingWithLetterD`)
3. Evite nomes genéricos (`data, response, list, args, params...`)

```js
const users = ["Diego", "Mayk", "Rodrigo"];
const usersStartingWithLetterD = users.filter(user => user.startsWith("D"));
```

> **DESFAFIO 1:** [Nomeação de variáveis](challenges/01-nomenclatura-de-variaveis.ts)


### Nomenclatura de variáveis: booleanos

> Para nomear booleanos, o ideal é escrever como pergunta, usando "is", "does", "has", por exemplo:
>
> ```js
> const userMajority = true; // evitar
> const isUserOnMajority = true;
>
> const disabled = true; // evitar
> const isDisabled = true;
> ```

> **DESFAFIO 2:** [Booleanos](challenges/02-booleanos.ts)


### Causa vs Efeito

Não nomear variáveis com base no efeito delas, e sim na causa. Exemplo: ao invés de criar uma variável chamada `isButtonDisabled`, que num contexto de botão estaria ok, mas seu uso em qualquer outro lugar da aplicação já ficaria estranho, chamar de `isFormSubmitting`.

```js
function Button() {
  const isButtonDisabled = true;

  return (
    <button disabled={isButtonDisabled}>
      {/* isso não é tão legível... */}
      {isButtonDisabled ? "Carregando" : "Enviar"}
    </button>
  );
}

function Button() {
  const isFormSubmitting = true;

  return (
    <button disabled={isFormSubmitting}>
      {/* melhor legibilidade! */}
      {isFormSubmitting ? "Carregando" : "Enviar"}
    </button>
  );
}
```

> **DESFAFIO 3:** [Código em inglês](challenges/03-causa-vs-efeito.ts)


### Código em inglês

O ideal é sempre o código ser inglês, pois não é acessível: leitores de tela para ler código não consegue ler 2 idiomas ao mesmo tempo (ex: português e inglês), e como a linguagem de programação já é em inglês, o ideal é funções, variáveis e etc também serem nomeadas em inglês.

> **DESFAFIO 4:** [Código em inglês](challenges/04-codigo-em-ingles.ts)


### Regras em condicionais

- Evitar negações sempre que possível, pois dificulta a leitura.

```js
const isUserOlderThan18Years = true;
const isUserLivesOnBrazil = true;

if (!isUserOlderThan18Years && !isUserLivesOnBrazil) {
  // evitar
}

const isUserYoungerThan18Years = true;
const doesUserLivesOutsideBrazil = true;

if (isUserYoungerThan18Years && doesUserLivesOutsideBrazil) {
  // melhor
}
```

- Early return vs else: usar sempre early return, mas se ele não puder ser facilmente identificado, usar else

```js
function isUserOlderThan18Years(user) {
  if (!user) {
    return { error: true };
  } else {
    return user.age >= 18;
  }
}

// boa prática
function isUserOlderThan18Years(user) {
  if (!user) return { error: true };
  return user.age >= 18;
}
```

- Evite condicionais aninhadas: prefira fazer um if abaixo do outro ou unir vários ifs (se continuar legível)

> **DESFAFIO 5:** [Regras em condicionais](challenges/05-regras-em-condicionais.ts)


### Parâmetros e desestruturação

Sempre opte por passar parâmetros nomeados, pois quando escalar a aplicação vai ser mais difícil entender o que é um "data" em um arquvio qualquer. Tipagem estática (TS) ajudaria, mas em ambiente de desenvolvimento, em produção ela não consegue cravar que dentro de data vai ter só nome, email e senha, vai ser repassado o que vier.

```js
// evitar
function createUserRoute(data) {
  // validações

  createUserController(body)
}

function createUserController(data) {
  userRepository.create(data)
}

function userRepository(data) {
  create(data){
    // cria usuário (nome, email, senha)
  }
}

// melhor forma
function createUserRoute(data) {
  const {name, email, password} = data;
  createUserController({name, email, password});
}

function createUserController({name, email, password}) {
  const {name, email, password} = data;
  userRepository.create({name, email, password});
}

function userRepository(data) {
  create(data){
    // cria usuário (nome, email, senha)
  }
}
```

- Prefira receber objetos ao invés de múltiplos parâmetros em funções

```js
// evitar
createUserRoute(body, params) {}
createUserRoute(null, {id: 1}) // o que é null?

// melhor forma
createUserRoute({body, params}) {}
createUserRoute({body: null, params: {id: 1}}) // ou só createUserRoute({params: {id: 1}})
```

- Prefira responder funções com objetos, pois quando a aplicação escalar, vai ficar mais fácil de apenas adicionar mais uma propriedade ao objeto do que mudar todo o retorno

```js
// evitar
function userRepository(data) {
  create(data){
    const user = createUserOnDatabase();

    return user;
  }
}

// melhor forma
function userRepository(data) {
  create(data){
    const user = createUserOnDatabase();

    return { user };
  }
}
```

> **DESFAFIO 6:** [Parâmetros e desestruturação](challenges/06-parametros-e-desestruturacao.tsx)


### Números mágicos

"Números mágicos" são cálculos/números que usamos que outras pessoas podem não entender facilmente (exmplo: cálculos de data, idades ou tempos predefinidos...).

```js
// evitar
setTimeout(() => {}, 2_592_000_000);
// melhor forma: separar em uma variável ou adicionar um comentário
const INTERVAL_30_DAYS = 1000 * 60 * 60 * 24 * 30;
setTimeout(() => {}, INTERVAL_30_DAYS);

setTimeout(() => {}, 1000 * 60 * 60 * 24 * 30); // 30 days
```

- Ajuda nomear com a unidade de medida da variável quando se trata de tempo (dias, meses, horas, minutos, segundos), dinheiro (centavos, reais, milhares, milhões)...

```js
// evitar
function calculateDiscount(price, discountAmount) {
  // retorna o desconto
}
// melhor forma
function calculateDiscount(priceInCents, discountAmountInPercentage) {
  // retorna o desconto
}
```

> **DESFAFIO 7:** [Números mágicos](challenges/07-numeros-magicos.js)


### Comentários vs documentação

O comentário não devia dizer o que o código está fazendo (isso é documentação, onde vai flar também o motivo da regra de negócio estar ali, casos de uso e etc). Ele serve mais como um aviso do motivo que algo foi feito daquela forma, dado por alguma limitação do dev, da lib ou algum padrão diferente que foi usado.

> **DESFAFIO 8:** [Comentários vs documentação](challenges/08-comentarios-vs-documentacao.js)


### Syntatic Sugars

É um conceito abrangente que faz menção a coisas específicas de uma linguagem, por exemplo transformar uma string em número no Javascript usando + ou usando o operador !! para validar se é nulo:

```js
const numberInString = "123";

// transformar string em number
const number = +numberInString; // evitar: não é legível
const number = Number(numberInString); // melhor

// validar se não é null
const isNumberNotNull = !!number; // evitar
const isNumberNotNull = Boolean(number); // melhor
```

> **DESFAFIO 9:** [Syntatic Sugars](challenges/09-syntatic-sugars.ts)

</details>

---

## Código limpo no React

<details>
   <summary>Acessar anotações das aulas</summary>
  
### Desacoplando componentes
Quando separar um componente em componentes menores?
- Quando tem algo repetitivo
- Quando consigo isolar algo do seu contexto (sem prejudicar o comportamento original): exemplo um footer usa uma variável de `currentYear`que não é usada em outro lugar da página. Pode ser legal separar o footer em um componente.

```js
export function App() {
  const [todos, setTodos] = useState<String[]>([])
  const currentYear = new Date().getFullYear()

  return (
    <div>
      <header>
        <h1>Lista de afazeres</h1>
        <button onClick={() => {}}>Nova tarefa</button>
      </header>

      <main>
        <ul>{todos.map(todo => <li key={todo}>{todo}</li>)}</ul>
      </main>

      <footer>Copyright &copy; Maby Reis {currentYear}</footer>
    </div>
  )
}
```

- Separando o footer, evitando deixar confuso a parte "Jvascript", não HMTL:

```js
export function Footer() {
  const currentYear = new Date().getFullYear()
  return <footer>Copyright &copy; Maby Reis {currentYear}</footer>;
}

export function App() {
  const [todos, setTodos] = useState<String[]>([])

  return (
    <div>
      <header>
        <h1>Lista de afazeres</h1>
        <button onClick={() => {}}>Nova tarefa</button>
      </header>

      <main>
        <ul>{todos.map(todo => <li key={todo}>{todo}</li>)}</ul>
      </main>

      <Footer />
    </div>
  )
}
```

---

### Componentes puros

Função pura é uma função que não dependem do seu meio ou alguma interação externa (requisições, etc), depende apenas dos próprios parâmetros para devolver a resposta.

- Diferente do footer, no header não seria legal separar em outro arquivo a lógica para criar uma nova tarefa, pois não seria um componente puro, desacoplado, seria só uma parte do App em outro arquivo, mas totalmente interligado (o que não é necessariamente uma coisa ruim). Mas, nesse caso, para deixar mais desacoplado, o ideal seria tipar e não levar a lógica pro arquivo do header, dessa forma ele não depende de mais nenhum componente para existir, só precisa dos próprios parâmetros:

```js
interface IHeaderProps {
  onCreateNewTodo: () => void
}

export function Header({ onCreateNewTodo }: IHeaderProps) {

  return (
    <header>
      <h1>Lista de afazeres</h1>
      <button onClick={onCreateNewTodo}>Nova tarefa</button>
    </header>
  )
}

export function App() {
  const [todos, setTodos] = useState<String[]>([])

  return (
    <div>
      <Header onCreateNewTodo={() => {}}/>
      <main>
        <ul>{todos.map(todo => <li key={todo}>{todo}</li>)}</ul>
      </main>
      <Footer />
    </div>
  )
}
```

### Funções e eventos

Usar prefixo `handle` quando for cria ruma função disparada através de uma ação do usuário (click, por exemplo), e prefixo `on` para um componente receber um parâmetro (igual no `onClick` padrão do HTML).

```js
export function App() {
  const [todos, setTodos] = useState<String[]>([])

  function handleCreateNewTodo() {}

  return (
    <div>
      <Header onCreateNewTodo={handleCreateNewTodo}/>
      <main>
        <ul>{todos.map(todo => <li key={todo}>{todo}</li>)}</ul>
      </main>
      <Footer />
    </div>
  )
}
```

### Composição vs Customização

Normalmente as pessoas se prendem muito às propriedades para customizar componentes, criando-as para fazer configurações visuais, o que não é muito legal:

```js
interface IInputProps {
  label?: string;
  leftIcon?: ReactNode;
  icon?: ReactNode;
  errorMessage?: string;
}

export function Input({ label, icon = null, leftIcon = null, errorMessage }: IInputProps) {
  return (
    <div>
      {leftIcon}
      {label && <label>{label}<label>}
      <input type="text"/>;
      {icon}

      {errorMessage && <span>{errorMessage}</span>}
    </div>
  )
}

export function CreateTodoForm() {
  return (
    <div>
      <Input
        label="Tarefa"
        errorMessage="Digite um nome para sua tarefa!"
        icon={<div />}
      >
    </div>
  )
}
```

- Para esses casos, usar o Pattern de Composição pode ser um caminho melhor:

```js
interface IRootProps {
  children: ReactNode;
}

export function Root({ children }: IRootProps) {
  return <div>{children}</div>;
}

interface IFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

export function FormField(props: IFormFieldProps) {
  return <input {...props} />;
}

interface ILabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}
export function Label(props: ILabelProps) {
  return <label {...props} />;
}

interface IErrorMessageProps {
  message: string;
}
export function ErrorMessage({ message }: IErrorMessageProps) {
  return <span>{message}</span>;
}

interface IIconProps {
  children: ReactNode;
}
export function Icon({ children }: IIconProps) {
  return <span>{children}</span>;
}

// Para usar:
import * as Input from "./components/Input";

export function CreateTodoForm() {
  return (
    <div>
      <Input.Root>
        <Input.Label htmlFor="task" id="task" />
        <Input.FormField />
        <Input.Icon>
          <div />
        </Input.Icon>

        <Input.ErrorMessage message="Digite um nome para sua tarefa!" />
      </Input.Root>
    </div>
  );
}
```

### Condicionais no render

- Evite colocar operações Javascript dentro do render:

```js
export function App() {
  return (
    <div>
      <Header />
      <main>
        <ul>
          {todos.map(todo => (
            <li key={todo}>{todo}</li>
          ))}
        </ul>
        {/* Evitar deixar aqui */}
        {todos.length === 0 && <p>Nenhuma tarefa cadastrada</p>}
      </main>
      <Footer />
    </div>
  );
}
```

- Idealmente separar numa variável e deixar "na parte javascript":

```js
export function App() {
  // calcular a variável
  const isTodoListEmpty = todos.length === 0;

  return (
    <div>
      <Header />
      <main>
        <ul>
          {todos.map(todo => (
            <li key={todo}>{todo}</li>
          ))}
        </ul>
        {/* Usar a variável */}
        {isTodoListEmpty && <p>Nenhuma tarefa cadastrada</p>}
      </main>
      <Footer />
    </div>
  );
}
```

</details>
