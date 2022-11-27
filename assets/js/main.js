const inputTarefa = document.querySelector(".input-tarefa");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

//1. GRUPO DE ACIONAMENTO*****************************************************************
function acionar() {
  //Função para acionar o botão dando ENTER
  inputTarefa.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
      if (!inputTarefa.value) return;
      criaTarefa(inputTarefa.value);
    }
  });




  //FUNÇÃO PARA ACIONAR O BOTÃO****************************************
  btnTarefa.addEventListener("click", function () {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);

    //isso é para caso seja um valor falso (ou seja, nenhum valor at all), ele irá retornar nada
    //toda vez que assionar o botão, ele vai pôr uma tarefa no sistema (value é justamente o valor que está no 'inputTarefa', ou seja, o texto inserido)
  });
}
acionar();




//2. FUNÇÃO PARA JOGAR TEXTO NO HTML**********************************
function criaTarefa(textoInput) {
  const li = document.createElement("li"); //criei um li no HTML
  li.innerHTML = textoInput; //defini seu texto
  tarefas.appendChild(li); //pus a li no .tarefas
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}



//3. EVENTO QUE APAGA LI**********************************************
document.addEventListener("click", function (e) {
  //o evento 'e' é o evento de clicar
  const elemento = e.target; //estou pondo um alvo no click

  if (elemento.classList.contains("apagar")) {
    //se tiver class "apagar"
    elemento.parentElement.remove(); //apaga o elemento pai (no caso, a LI)
    salvarTarefas();
    //assim ele vai salvar também quando forem apagadas(6.)
  }
});




//4. FUNÇÃO QUE LIMPA O CAMPO E JOGA FOCO NELE************************
function limpaInput() {
  inputTarefa.value = ""; //limpa
  inputTarefa.focus(); //joga o foco lá
}




//5. FUNÇÃO QUE CRIA BOTÃO DE APAGAR**********************************
function criaBotaoApagar(li) {
  //puxa o conteudo da li
  li.innerText += " ";
  const botaoApagar = document.createElement("button"); //criei botao
  botaoApagar.innerHTML = "Apagar"; //defini o texto do botão
  li.appendChild(botaoApagar); // coloquei o botão na li
  botaoApagar.setAttribute("class", "apagar"); //defini a class do botão
  botaoApagar.setAttribute("title", "Apagar esta tarefa"); //defini um título (passa o mouse por ele)
}




//6. FUNÇÃO QUE SALVA AS TAREFAS NO NAVEGADOR***************************
function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll("li");
  const listaDeTarefas = [];

  for (let taref of liTarefas) {
    let tarefaTexto = taref.innerText; 
    //salvei o texto dentro do index do nodelist 'tarefas' numa variável
    
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); 
    //estou tirando a palavra 'Apagar' da minha variável, substituindo por um espaço vazio.
    //.trim remove os espaços vazios que vem depois e antes


    listaDeTarefas.push(tarefaTexto); 
    //joguei a nodelist no array listaDeTarefas
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas)
  //JSON: não preciso quebrar a cabeça com isso. basta saber que esta função está transformando meu ARRAY em uma STRING, para que eu possa salvar no sistema
  //Importante também é saber que, posteriormente, poderei transformar em ARRAY novamente. posso sair manipulando
  //   console.log(typeof tarefasJSON);

  localStorage.setItem('minhasTarefas', tarefasJSON);
  // essa função salva strings. Por isso converti o array pra STRING
  //'minhasTarefas' é apenas a key que estou usando pra salvar


  //ATENÇÃO::::::
  //No Dev Tools do navegador, dentro da aba APPLICATIONS > LOCAL STORAGE, vai aparecer o lugar onde essas informações estão sendo salvas. Como se fosse uma mini base de dados do navegador
}




//7. FUNÇÃO QUE RETORNA AS TAREFAS SALVAS *************************
function adicionaTarefasSalvas () {
    const tarefiles = localStorage.getItem('minhasTarefas'); 
    //está em string
    const listaDeTarefas = JSON.parse(tarefiles);
    //transformei novamente em Array

    for(let taref of listaDeTarefas) {
        criaTarefa(taref);
    }
    //agora minhas tarefas salvas estão retornando para o navegador, sempre que eu recarregá-lo
}
adicionaTarefasSalvas();