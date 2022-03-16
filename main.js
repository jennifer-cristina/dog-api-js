'use strict'


// chamando api sem precisar de uma raca especifica
const pesquisarRacas = async () => {
    const url = 'https://dog.ceo/api/breeds/list/all'

    const response = await fetch(url)

    const data = await response.json()

    return Object.keys(data.message)

}

// chamando api
const pesquisarCachorro = async (raca) => {
    const url = `https://dog.ceo/api/breed/${raca}/images`

    const response = await fetch(url)

    const data = await response.json()

    return data
}

const criarImg = (imagem) => {
    const img = document.createElement('img')
    img.src = imagem

    return img
}

const carregarImagens = async () => {
    const container = document.getElementById('imagem-container')
    const raca = document.getElementById('raca').value
    const imagens = await pesquisarCachorro(raca)

    const tagImagens = imagens.message.map(criarImg)

    container.replaceChildren(...tagImagens)
}

const carregarRacas = async () => {
    const lista = document.getElementById('lista-racas')

    const racas = await pesquisarRacas()

    // join: tranforma array em string e pode inserir em caracter entre eles
    lista.innerHTML = `
        <option>
        ${racas.join('</option><option>')}
        </option>
    `
}

document.getElementById('pesquisar').addEventListener('click', carregarImagens)

carregarRacas()