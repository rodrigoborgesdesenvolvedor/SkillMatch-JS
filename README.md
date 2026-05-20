<<<<<<< HEAD
# SkillMatch-JS

## Sobre o Projeto

O SkillMatch é Sistema simples, que compara habilidades de candidatos em Java Script para vagas de programador Front-End Júnior.
O sistema mostra:
- percentual de compatibilidade;
- habilidades encontradas;
- habilidades faltantes;
- vaga mais compatível;
- recomendações para estudo;
- O link para o Quadro Kambam é: https://trello.com/b/ZJ8bpU4f/skillmatch-js-simulador-de-compatibilidade-com-vaga-front-end-junior
- O link para o Vídeo explicativo é: 

## Objetivo
Praticar os conceitos aprendidos no módulo 1:

-lógica de programação;
- tipos de dados;
- condicionais;
- operadores;
- laços de repetição;
- funções;
- arrow functions;
- arrays;
- métodos de array;
-objetos;
- classes;
- herança;
- this; this
-GitHub;
Kanban.

## Como executar

Para utilizar o sistema skillmatch é necessário node.js e um sistema como vscode.
também é necessário o uso do pacote prompt-sync, utilizado para dar mais dinamismo e praticidade na avaliação em sequência de vários candidatos.
1- Abra o vscode ou similar;
2- Certifique que tenha o node.js. instruções de download nesse link: https://nodejs.org/en/download
3- Certifique que tenha instalado o pacote prompt-sync; Caso não tenha pode instalá-lo seguindo o passo a passo de acordo com esse link: https://www.npmjs.com/package/prompt-sync?activeTab=readme;
4- copie o código e cole em um arquivo.js
5- Execute no terminal do vscode ou similar.

## Como a internet Funciona

Quando você acessa um site, seu navegador (cliente) envia uma requisição a um servidor pedindo dados. O servidor processa e devolve a resposta — geralmente em JSON, HTML ou outro formato. Essa comunicação viaja pela internet usando protocolos como HTTP/HTTPS. Na prática, há uma pequena espera até o servidor responder, por isso requisições reais são assíncronas. O cliente então usa os dados recebidos para montar a interface ou continuar o fluxo.

## Arquitetura Cliente Servidor

No projeto, as linhas 51–55 simulam exatamente esse comportamento: buscarVagas() retorna uma Promise com setTimeout de 1 segundo imitando o tempo de resposta de um servidor real. Na linha 61, o await pausa a execução até os "dados chegarem", assim como aconteceria numa chamada real a uma API.

## Estrutura do projeto
Qadro_Kamban.txt
SkillMatch-JS-Simulador-de-Compatibilidade-com-Vaga-Front-End-J-nior/
skillmatch.js
README.md


=======
# SkillMatch-JS-Simulador-de-Compatibilidade-com-Vaga-Front-End-Júnior
Sistema que compara habilidades de candidatos em JS para uma vaga de programador Front-End Júnior.
>>>>>>> d75f7e2db55f88f2f621d78700555042848623e6
