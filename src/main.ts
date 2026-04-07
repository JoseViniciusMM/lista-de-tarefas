import './assets/estilo.css';
import {v4 as uuidv4} from 'uuid';

const formulario = document.querySelector<HTMLFormElement>('#formulario')
const inputTarefa = document.querySelector<HTMLInputElement>('#tarefa')
const listaTarefas = document.querySelector<HTMLDivElement>('#lista-tarefas')

interface Tarefa {
  id: string,
  tarefa: string,
}

let listaDeTarefas: Tarefa[] = []

function salvar () {
  const dados = JSON.stringify(listaDeTarefas)
  localStorage.setItem('tarefas', dados)
}

function recuperar () {
  listaDeTarefas = JSON.parse(localStorage.getItem("tarefas"))
  console.log(listaDeTarefas)
}

recuperar()
imprimirTabelaTarefas()

function imprimirTabelaTarefas () {
  listaTarefas.innerHTML = `
  <ul>
    ${listaDeTarefas.map(tarefa => `<li>${tarefa.tarefa}</li>`).join('')}
  </ul>
  `
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault()

  const tarefa: Tarefa = {
    id: uuidv4(),
    tarefa: inputTarefa.value
  }

  listaDeTarefas.push(tarefa)

  console.log(listaDeTarefas)

  salvar()
  recuperar()
})

