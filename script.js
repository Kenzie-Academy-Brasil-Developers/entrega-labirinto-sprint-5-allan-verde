const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
]

let blocoDeInicio
let cordenadaAtualLinha
let cordenadaAtualColuna


let blocoFim
let blocoFimLinha
let blocoFimColuna

const section = document.getElementById('secao')
for (let linha in map) {
    const blocoLinha = document.createElement('div')
    blocoLinha.classList.add('blocoLinha')
    
    for (let coluna in map[linha]) {
        const bloco = document.createElement('div')
        if (map[linha][coluna] === 'W') {
            bloco.classList.add('blocoW')
            bloco.classList.add(`bloco${linha}_${coluna}`)

        } else if (map[linha][coluna] === 'S') {
            bloco.id = 'posicaoAtual'
            bloco.classList.add('blocoSpace')
            bloco.classList.add(`bloco${linha}_${coluna}`)
            blocoDeInicio = bloco
            cordenadaAtualLinha = linha
            cordenadaAtualColuna = coluna

        } else if (map[linha][coluna] === 'F') {
            bloco.classList.add('blocoFinish')
            bloco.classList.add(`bloco${linha}_${coluna}`)
            blocoFim = bloco

        } else {
            bloco.classList.add('blocoSpace')
            bloco.classList.add(`bloco${linha}_${coluna}`)
        }
        
        blocoLinha.appendChild(bloco)
    }
    
    section.appendChild(blocoLinha)
}

let movimentoPersonagemLinha = 0
let movimentoPersonagemColuna = 105 

function movimento(teclaPressionada) {
    let blocoFinal = document.getElementsByClassName('blocoFinish')[0]
    let blocoAtual = document.getElementsByClassName(`bloco${cordenadaAtualLinha}_${cordenadaAtualColuna}`)[0]
    let personagem = document.getElementById('personagem')

    let podeMover = true

    if (teclaPressionada === 'ArrowUp' && cordenadaAtualLinha > 0) {
        cordenadaAtualLinha--
        movimentoPersonagemColuna += 20
        novoBlocoAtual = document.getElementsByClassName(`bloco${cordenadaAtualLinha}_${cordenadaAtualColuna}`)[0]
        
        if (novoBlocoAtual.classList[0] === 'blocoW') {
            cordenadaAtualLinha++
            movimentoPersonagemColuna -= 20
            podeMover = false
        }


    } else if (teclaPressionada === 'ArrowDown' && cordenadaAtualLinha < 14) {
        cordenadaAtualLinha++
        movimentoPersonagemColuna -= 20
        novoBlocoAtual = document.getElementsByClassName(`bloco${cordenadaAtualLinha}_${cordenadaAtualColuna}`)[0]
        
        if (novoBlocoAtual.classList[0] === 'blocoW') {
            cordenadaAtualLinha--
            movimentoPersonagemColuna += 20
            podeMover = false
        }
    
    } else if (teclaPressionada === 'ArrowRight' && cordenadaAtualColuna < 20) {
        cordenadaAtualColuna++
        movimentoPersonagemLinha += 20
        novoBlocoAtual = document.getElementsByClassName(`bloco${cordenadaAtualLinha}_${cordenadaAtualColuna}`)[0]
        
        if (novoBlocoAtual.classList[0] === 'blocoW') {
            cordenadaAtualColuna--
            movimentoPersonagemLinha -= 20
            podeMover = false
        }
    
    } else if (teclaPressionada === 'ArrowLeft' && cordenadaAtualColuna > 0) {
        cordenadaAtualColuna--
        movimentoPersonagemLinha -= 20
        novoBlocoAtual = document.getElementsByClassName(`bloco${cordenadaAtualLinha}_${cordenadaAtualColuna}`)[0]
        
        if (novoBlocoAtual.classList[0] === 'blocoW') {
            cordenadaAtualColuna++
            movimentoPersonagemLinha += 20
            podeMover = false
        }
    
    } else {
        podeMover = false
    }

    if (podeMover) {
        blocoAtual.removeAttribute('id')
        novoBlocoAtual.id = 'posicaoAtual'
        personagem.style.bottom = `${movimentoPersonagemColuna}px`
        personagem.style.left = `${movimentoPersonagemLinha}px`
    }

    if (blocoFinal.id === 'posicaoAtual') {
        vitoria()
    }
}

document.addEventListener('keydown', (event) => {
    let teclaPressionada = event.key
    movimento(teclaPressionada)
})

const geraCorAleatoria = () => {
    const codigo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
    let codigoHexadeciamal = []
    for (let i = 1; i <= 6; i++) {
        let indiceAleatorio = () => Math.floor(Math.random() * 16)
        codigoHexadeciamal.push(codigo[indiceAleatorio()])
    }
    codigoHexadeciamal = codigoHexadeciamal.join('')
    
    for (let index = 0; index < 175; index++) {
        document.getElementsByClassName('blocoW')[index].style.backgroundColor = `#${codigoHexadeciamal}`
    }
    
}

let tempo = setInterval(() => {
    geraCorAleatoria()
}, 2000);

function vitoria() {
    clearInterval(tempo)
    section.innerText = ''
    section.removeAttribute('id')
    section.classList.add('section')
    const titulo = document.createElement('h1')
    titulo.innerText = 'Parabéns!'
    titulo.classList.add('titulo')
    const paragrafo = document.createElement('p')
    paragrafo.classList.add('paragrafo')
    paragrafo.innerText = 'Pra mim é claro, criador desse game. \n Obrigado!'
    section.appendChild(titulo)
    section.appendChild(paragrafo)
}