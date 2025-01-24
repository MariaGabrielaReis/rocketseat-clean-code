// Causa vs Efeito

/**
O código em que que você vai praticar esses conceitos contém uma lógica de um componente React que faz uma chamada para uma função que retorna os dados do usuário.

Enquanto os dados do usuário não são retornados, é exibido em tela o comportamento de `Loading` para que a tela não fique em branco.

Seu objetivo nesse código não é corrigir ou implementar o seu funcionamento, pois ele já funciona, mas você deve renomear variáveis ou até atributos de objetos de acordo com o que foi aprendido, dando sentindo às variáveis de acordo com as regras acima.
*/

import { useEffect, useState } from "react";

interface User {
  name: string;
  github: string;
}

function fetchUser() {
  return {
    data: {
      user: {
        name: "Joseph Oliveira",
        github: "https://github.com/josepholiveira",
      },
    },
  };
}

export function UserProfile() {
  const [isFetchingUserData, setIsFetchingUserData] = useState(false);
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    function loadUser() {
      setIsFetchingUserData(true);

      const fetchUserResponse = fetchUser();
      setUserData(fetchUserResponse.data.user);

      setIsFetchingUserData(false);
    }

    loadUser();
  });

  if (isFetchingUserData) return <p>Loading...</p>;

  return (
    <div>
      <img src={`${userData?.github}.png`} alt="" />
      <a href={userData?.github}>{userData?.name}</a>
    </div>
  );
}
