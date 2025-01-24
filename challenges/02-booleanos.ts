// Boleanos

/**
O código em que que você vai praticar esses conceitos contém uma lógica que representa uma ida do Diego à um parque de diversões, o Rocket Park, para andar no seu brinquedo preferido.

Para entrar no parque, existem algumas regras:

- Você precisa ter um bilhete
- O parque está aberto entre as 9h e 18h

Já para andar em seu brinquedo preferido, o Diego precisa apenas ser maior que 130cm de altura.

Seu objetivo nesse código não é corrigir ou implementar o seu funcionamento, pois ele já funciona, mas você deve renomear variáveis ou até atributos de objetos de acordo com o que foi aprendido, dando sentindo às variáveis de acordo com as regras acima.
*/

const user = {
  name: "Diego Fernandes",
  height: 190,
  hasTicket: true,
};

const necessaryHeight = 130;

const currentHour = new Date().getHours();

const isParkOpened = currentHour > 9 && currentHour < 18;

if (!isParkOpened) {
  throw new Error("O parque está fechado!");
}

const userHasTicket = user.hasTicket;

if (!userHasTicket) {
  throw new Error("O Diego não possui um bilhete para entrar no parque!");
}

const userHasNecessaryHeight = user.height > necessaryHeight;

if (!userHasNecessaryHeight) {
  throw new Error("O Diego não pode entrar no brinquedo!");
}

console.log("O Diego se divertiu muito! :)");
