// Código em inglês

/**
O código em que que você vai praticar esses conceitos contém uma lógica de um componente React que faz um filtro em uma lista de produtos para exibir em tela somente os produtos que o usuário buscar quando digitar no input.

Seu objetivo nesse código não é corrigir ou implementar o seu funcionamento, pois ele já funciona, mas você deve renomear variáveis ou até atributos de objetos de acordo com o que foi aprendido, dando sentindo às variáveis de acordo com as regras acima.
*/

import { useState } from "react";

interface Product {
  title: string;
  price: string;
}

const productList = [
  {
    title: "Macarrão",
    price: "R$ 25,00",
  },
  {
    title: "Hamburger",
    price: "R$ 30,00",
  },
];

export function ListProduct() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  function searchProduct(search: string) {
    const products = productList.filter(product =>
      product.title.includes(search),
    );

    setFilteredProducts(products);
  }

  return (
    <div>
      <input
        type="text"
        onChange={event => searchProduct(event.target.value)}
      />

      {filteredProducts.map(product => (
        <div>
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}
