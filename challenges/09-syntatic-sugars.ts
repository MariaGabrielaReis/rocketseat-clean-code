// Syntatic Sugars

/**
O código em que você vai praticar esses conceitos possui um objetivo: pegar os primeiros 5 valores de um array de avaliações de um app, somá-los e retornar o resultado e horário atual. Para isso, temos duas funções:

- `sumFirstFiveRatings`: essa função deve retornar um objeto com o somatório das 5 primeiras avaliações e o horário atual em timestamp (caso tenha dúvidas sobre esse formato, é a quantidade de segundos que se passaram desde 1 de janeiro de 1970). Porém, caso avaliações seja `falsy` ou não possua pelo menos 5 valores, deve retornar os respectivos erros.
- `getFirstFiveRatings`: essa função deve retornar os primeiros 5 valores do array de avaliações caso o seu tamanho seja no mínimo 5. Se essa condição não for atendida, deve retornar `false`.

Seu objetivo nesse código é aplicar os conceitos aprendidos na aula, removendo o máximo de `syntatic sugars` possíveis do código. Lembrando que nem sempre um código mais curto é melhor.
*/

function getFirstFiveRatings(ratings) {
  return ratings.length >= 5 && ratings.slice(0, 5);
}

function sumFirstFiveRatings(ratings) {
  const hasRatings = Boolean(ratings);

  if (hasRatings) {
    const firstFiveRatings = getFirstFiveRatings(ratings);

    if (!firstFiveRatings) return { error: "there must be at least 5 ratings" };

    let ratingsSum = 0;

    for (const rating of firstFiveRatings) {
      ratingsSum += Number(rating);
    }

    return { ratingsSum, created_at: Number(new Date()) };
  }

  return { error: "ratings is required" };
}

const appRatings = ["5", "3", "4", "4", "5", "1", "5", "4", "4", "3"];
sumFirstFiveRatings(appRatings);
