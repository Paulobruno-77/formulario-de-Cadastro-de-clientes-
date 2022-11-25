const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#nome')
const semail = document.querySelector('#email')
const ssenha = document.querySelector('#senha')
const sEndereço = document.querySelector('#Endereço')
const stelefone = document.querySelector('#telefone')
const sdatadenascimento = document.querySelector('#datadenascimento')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    semail.value = itens[index].email
    ssenha.value = itens[index].senha
    sEndereço.value = itens[index].endereço
    stelefone.value = itens[index].telefone
    sdatadenascimento.value = itens[index].datadenascimento
    id = index
  } else {
    sNome.value = ''
    semail.value = ''
    ssenha.value = ''
    sEndereço.value = ''
    stelefone.value = ''
    sdatadenascimento.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.email}</td>
    <td>${item.senha}</td>
    <td>${item.endereço}</td>
    <td>${item.telefone}</td>
    <td>${item.datadenascimento}</td></
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || semail.value == '' || ssenha.value == ''|| sEndereço.value == ''|| stelefone.value == '' || sdatadenascimento.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].email = semail.value
    itens[id].senha = ssenha.value
    itens[id].endereço = sEndereço.value
    itens[id].telefone = stelefone.value
    itens[id].datadenascimento = sdatadenascimento.value
  } else {
    itens.push({'nome': sNome.value, 'email': semail.value, 'senha': ssenha.value, 'endereço': sEndereço.value, 
  'telefone': stelefone.value, 'datadenascimento': sdatadenascimento.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()

const init = () =>{
  const inputnome = document.querySelector('input[id="nome"]')
  const inputemail= document.querySelector('input[id="email"]');
  const inputsenha = document.querySelector('input[id="senha"]');
  const inputEndereço = document.querySelector('input[id="Endereço"]');
  const inputtelefone = document.querySelector('input[id="telefone"]');
  const inputdatadenascimento = document.querySelector('input[id="datadenascimento"]');
  const btnSalvar = document.querySelector('.outline');
  
 if(btnSalvar) {
  btnSalvar.addEventListener('click', (event) => {
      event.preventDefault();

      fetch('http://localhost:3000/posts',{
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json'
           },
          body: JSON.stringify({
              nome: inputnome.value,
              email: inputemail.value,
              senha: inputsenha.value,
              Endereço: inputEndereço.value,
              telefone: inputtelefone.value,
              datadenascimento: inputdatadenascimento.value,

          })


      }).then((response) => {
          return response.json();
      }).then((data) => {
          console.log(data)
      })

  })
}

}


window.onload = init;