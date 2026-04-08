import './assets/estilo.css'
import {v4 as uuidv4} from 'uuid' 

const formulario   = document.querySelector<HTMLFormElement>("#formulario")
const inputTarefa  = document.querySelector<HTMLInputElement>("#tarefa")
const tabelaTarefas = document.querySelector<HTMLDivElement>("#tabela-tarefas")

interface Tarefa {
  id: string, 
  tarefa: string
}

let listaDeTarefas: Tarefa[] = []

function imprimirTabela(){
  if (tabelaTarefas && Array.isArray(listaDeTarefas)) {
    tabelaTarefas.innerHTML = `
      <ul>
        ${listaDeTarefas.map(i => `
          <li>
            <input type="checkbox" id="${i.id}">
            <label for="${i.id}">${i.tarefa}</label>
          </li>
        `).join('')}
      </ul>
    `
  }
}

function salvar(){
  localStorage.setItem("lista-de-tarefas", JSON.stringify(listaDeTarefas))
}

function recuperar(){
  const dados = localStorage.getItem("lista-de-tarefas")
  if (dados) {
    listaDeTarefas = JSON.parse(dados)
  } else {
    listaDeTarefas = []
  }
}

recuperar()
imprimirTabela()

formulario?.addEventListener('submit', (e) =>{
  e.preventDefault()
  
  if (inputTarefa && inputTarefa.value.trim() !== "") {
    const novaTarefa: Tarefa = {
      id: uuidv4(),
      tarefa: inputTarefa.value
    }
    
    listaDeTarefas.push(novaTarefa) 
    
    salvar()          
    imprimirTabela()  
    
    inputTarefa.value = "" 
  }
})