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
            bloco.innerText = 'W'

        } else if (map[linha][coluna] === 'S') {
            bloco.id = 'posicaoAtual'
            bloco.classList.add('blocoSpace')
            bloco.classList.add(`bloco${linha}_${coluna}`)
            bloco.innerText = 'S'
            blocoDeInicio = bloco
            cordenadaAtualLinha = linha
            cordenadaAtualColuna = coluna

        } else if (map[linha][coluna] === 'F') {
            bloco.classList.add('blocoFinish')
            bloco.classList.add(`bloco${linha}_${coluna}`)
            bloco.innerText = 'F'
            blocoFim = bloco

        } else {
            bloco.classList.add('blocoSpace')
            bloco.classList.add(`bloco${linha}_${coluna}`)
            bloco.innerText = 'X'

        }
        
        blocoLinha.appendChild(bloco)
    }
    
    section.appendChild(blocoLinha)
}

// console.log(cordenadaAtual)

function movimento(teclaPressionada) {
    let blocoFinal = document.getElementsByClassName('blocoFinish')[0]
    let blocoAtual = document.getElementsByClassName(`bloco${cordenadaAtualLinha}_${cordenadaAtualColuna}`)[0]
    let novoBlocoAtual

    let podeMover = true

    if (teclaPressionada === 'ArrowUp' && cordenadaAtualLinha > 0) {
        cordenadaAtualLinha--
        novoBlocoAtual = document.getElementsByClassName(`bloco${cordenadaAtualLinha}_${cordenadaAtualColuna}`)[0]
        
        if (novoBlocoAtual.classList[0] === 'blocoW') {
            cordenadaAtualLinha++
            podeMover = false
            console.log('Não pode mover nesta direção')
        }


    } else if (teclaPressionada === 'ArrowDown' && cordenadaAtualLinha < 14) {
        cordenadaAtualLinha++
        novoBlocoAtual = document.getElementsByClassName(`bloco${cordenadaAtualLinha}_${cordenadaAtualColuna}`)[0]
        
        if (novoBlocoAtual.classList[0] === 'blocoW') {
            cordenadaAtualLinha--
            podeMover = false
            console.log('Não pode mover nesta direção')
        }
    
    } else if (teclaPressionada === 'ArrowRight' && cordenadaAtualColuna < 20) {
        cordenadaAtualColuna++
        novoBlocoAtual = document.getElementsByClassName(`bloco${cordenadaAtualLinha}_${cordenadaAtualColuna}`)[0]
        
        if (novoBlocoAtual.classList[0] === 'blocoW') {
            cordenadaAtualColuna--
            podeMover = false
            console.log('Não pode mover nesta direção')
        }
    
    } else if (teclaPressionada === 'ArrowLeft' && cordenadaAtualColuna > 0) {
        cordenadaAtualColuna--
        novoBlocoAtual = document.getElementsByClassName(`bloco${cordenadaAtualLinha}_${cordenadaAtualColuna}`)[0]
        
        if (novoBlocoAtual.classList[0] === 'blocoW') {
            cordenadaAtualColuna++
            podeMover = false
            console.log('Não pode mover nesta direção')
        }
    
    } else {
        console.log('Não pode mover nesta direção')
        podeMover = false
    }

    if (podeMover) {
        blocoAtual.removeAttribute('id')
        novoBlocoAtual.id = 'posicaoAtual'
    }

    console.log(blocoAtual)
    console.log(novoBlocoAtual)

    // console.log(novoBlocoAtual.id)

    condiçãoDeVitoria(blocoFinal)
}


document.addEventListener('keydown', (event) => {
    const keyName = event.key
    // console.log('keydown event\n\n' + 'key: ' + keyName)
    let teclaPressionada = event.key

    movimento(teclaPressionada)

})

function condiçãoDeVitoria(bloco) {
    if (bloco.id === 'posicaoAtual') {
        window.alert('Parabéns! Você venceu.')
    }
}