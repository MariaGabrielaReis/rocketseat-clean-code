// Comentários vs documentação

/**
O código em que você vai praticar esses conceitos contém uma função responsável pelo registro do usuário no banco de dados. Porém, antes de cadastrar o usuário no banco é preciso realizar alguns passos:

- Validações
- Conversão do avatar para JPG.

Seu objetivo nesse código é aplicar os conceitos aprendidos na aula, removendo o máximo de comentários possível. Lembrando que é válido reescrever um trecho de código para deixá-lo mais claro, dispensando assim a necessidade do comentário.
*/

async function register(data) {
  const { email, name, avatar } = data;

  if (!avatar) return { error: "avatar is required" };
  if (!name) return { error: "name is required" };

  const userMail = getUserByEmail(email);
  if (userMail) return { error: "email already used" };

  // Essa função realiza a conversão das imagens para JPG a fim de evitar erros de incompatibilidade.
  // Mais informações na issue https://github.com/rocketseat-education/example-repository/issues/1
  const avatar2 = convertImageToJPG(avatar);

  const user = await createUser({ email, name, avatar: avatar2 });

  return { user };
}
