// Parâmetros e desestruturação

/**
O código em que você vai praticar esses conceitos contém funções que lidam com a atualização dos dados de um usuário a partir de uma rota que receberá os seguintes dados:

`body: { name, email, password }`

`params: { id }`

Seu objetivo nesse código é aplicar os conceitos aprendidos na aula dando mais clareza ao código sobre o que os parâmetros `body`, `params` e `data` recebem, nenhuma implementação de funcionalidade é necessária para a conclusão do desafio.
*/

function updateUserRoute({ body, params }) {
  const { name, email, password } = body;
  const { id } = params;

  updateUserController({
    id,
    user: { name, email, password },
  });
}

function updateUserController({ id, user }) {
  userRepository.update({
    id,
    name: user.name,
    email: user.email,
    password: user.password,
  });
}

const userRepository = {
  update: ({ id, name, email, password }) => {
    const userUpdated = updateUserOnDatabase({ id, name, email, password });

    return { user: userUpdated };
  },
};
