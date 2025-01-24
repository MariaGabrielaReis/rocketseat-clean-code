// Nomenclatura de variáveis

/**
O código em que que você vai praticar esses conceitos consiste em uma função que recebe um nome de usuário do Github e retorna o mesmo usuário com uma categoria.

As categorias serão atribuídas ao usuário de acordo com o número de seus seguidores no Github, onde caso o número de seguidores seja maior ou igual ao número mínimo que cada categoria necessita, será retornada a categoria que possuir o maior `mínimo de seguidores` possível.

As categorias serão as seguintes:

- **User**: Preciso no mínimo 5 seguidores para receber essa categoria
- **Friendly:** Preciso no mínimo 50 seguidores para receber essa categoria
- **Famous**: Preciso no mínimo 500 seguidores para receber essa categoria
- **Super** **Star**: Preciso no mínimo 1000 seguidores para receber essa categoria

Seu objetivo nesse código não é corrigir ou implementar o seu funcionamento, pois ele já funciona, mas você deve renomear variáveis ou até atributos de objetos de acordo com o que foi aprendido, dando sentindo às variáveis de acordo com as regras acima.
*/

const userCategories = [
  {
    title: "User",
    followers: 5,
  },
  {
    title: "Friendly",
    followers: 50,
  },
  {
    title: "Famous",
    followers: 500,
  },
  {
    title: "Super Star",
    followers: 1000,
  },
];

export default async function getAndClassifyUsers(req, res) {
  const username = String(req.query.username);

  if (!username) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`,
    });
  }

  const userResponse = await fetch(`https://api.github.com/users/${username}`);

  if (userResponse.status === 404) {
    return res.status(400).json({
      message: `User with username "${username}" not found`,
    });
  }

  const userData = await userResponse.json();

  const categoriesOrdenedByFollowersQuantity = userCategories.sort(
    (a, b) => b.followers - a.followers,
  );

  const userCategory = categoriesOrdenedByFollowersQuantity.find(
    category => userData.followers > category.followers,
  );

  const classifiedUser = {
    username,
    category: userCategory?.title,
  };

  return classifiedUser;
}

getAndClassifyUsers(
  {
    query: {
      username: "josepholiveira",
    },
  },
  {},
);
