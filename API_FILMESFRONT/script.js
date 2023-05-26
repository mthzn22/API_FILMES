const form = document.querySelector('#FilmeForm')
const tituloInput = document.querySelector('#tituloInput')
const diretorInput = document.querySelector('#diretorInput')
const ano_lancamentoInput = document.querySelector('#ano_lancamentoInput')
const generoInput = document.querySelector('#generoInput')
const URL = 'http://localhost:8000/filmes.php'

const tableBody = document.querySelector('#FilmesTable')

function carregarFilmes() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(filmes => {
            tableBody.innerHTML = ''

            for (let i = 0; i < filmes.length; i++) {
                const tr = document.createElement('tr')
                const filme = filmes[i]
                tr.innerHTML = `
                    <td>${filme.id}</td>
                    <td>${filme.titulo}</td>
                    <td>${filme.diretor}</td>
                    <td>${filme.ano_lancamento}</td>
                    <td>${filme.genero}</td>
                    <td>
                        <button data-id="${filme.id}" onclick="atualizarFilme(${filme.id})">Editar</button>
                        <button data-id="${filme.id}" onclick="excluirFilme(${filme.id})">Excluir</button>
                    </td>
                `
                tableBody.appendChild(tr)
            }

        })
}

//função para criar um filme
function adicionarFilme(e) {

    e.preventDefault()

    const titulo = tituloInput.value
    const diretor = diretorInput.value
    const ano_lancamento = ano_lancamentoInput.value
    const genero = generoInput.value

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `titulo=${encodeURIComponent(titulo)}&diretor=${encodeURIComponent(diretor)}&ano_lancamento=${encodeURIComponent(ano_lancamento)}&genero=${encodeURIComponent(genero)}`
    })
        .then(response => {
            if (response.ok) {
                carregarFilmes()
                tituloInput.value = ''
                diretorInput.value = ''
                ano_lancamentoInput.value = ''
                generoInput.value = ''
            } else {
                console.error('Erro ao add filmes')
                alert('Erro ao add filme')
            }
        })
}


function atualizarFilme(id){
    const novoTitulo = prompt("digite o novo filme")
    const novoDiretor  = prompt("digite o diretor")
    const novoAno    = prompt("digite o ano")
    const novoGenero = prompt("digite o genero")

    if(novoTitulo && novoAno && novoDiretor && novoGenero){
        fetch(`${URL}?id=${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-url-urlencoded'
            },
            body:`titulo=${encodeURIComponent(novoTitulo)}&diretor=${encodeURIComponent(novoDiretor)}&ano_lancamento=${encodeURIComponent(novoAno)}&genero=${encodeURIComponent(novoGenero)}`
        })
        .then (response => {
            if(response.ok){
                carregarFilmes()
            }else{
                console.error('Erro ao atualizar filme')
                alert('erro ao atualizar filme')
            }
        })
    }
}

function excluirFilme(id){
    if(confirm('Deseja excluir o filme ?')){
        fetch(`${URL}?id=${id}`,{
            method: 'DELETE'
        })
        .then(response =>{
            if(response.ok){
                carregarFilmes()
            }else{
                console.error('Erro ao excluir filme')
                alert('Erro ao excluir filme')
            }
        })
    }
}


form.addEventListener('submit', adicionarFilme)

carregarFilmes() 