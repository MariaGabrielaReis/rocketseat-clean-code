// Regras em condicionais

/**
O código em que que você vai praticar esses conceitos contém uma função que verifica se um aluno irá ou não ser aprovado ao final do ano escolar.

Para ser aprovado, existem duas regras:

- Sua nota deve ser maior que 7
- Suas faltas devem ser menores que 100

Seu objetivo nesse código não é corrigir ou implementar o seu funcionamento, pois ele já funciona, mas você reorganizar o código de forma a aplicar o que foi aprendido sobre regras em condicionais.
*/

const necessaryGradeToBeApproved = 7;
const studentGrade = 10;

const numberOfAbsensesToFailSchool = 100;
const studentNumberOfAbsenses = 109;

function checkIfStudentPassedTheSchoolYear() {
  if (studentGrade < necessaryGradeToBeApproved)
    return {
      error: true,
      message:
        "Student was not approved because his grade was below the necessary.",
    };

  return studentNumberOfAbsenses > numberOfAbsensesToFailSchool
    ? {
        error: true,
        message: "Student was not approved because of his absenses",
      }
    : { error: false, message: "Student was approved :)" };
}

console.log(checkIfStudentPassedTheSchoolYear());
