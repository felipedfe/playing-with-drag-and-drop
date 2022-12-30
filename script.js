const pieces = document.querySelectorAll(".piece")
const piecesArray = [...pieces]
const card = document.querySelector(".card")
const cardButton = document.querySelector(".card-button")
const containers = document.querySelectorAll('.container')
const piecesSection = document.querySelector('.pieces-section')
const catSection = document.querySelector('.cat-section')
const cardText = document.querySelector('.card-text-container').firstElementChild
const rotateIcon = '<i class="fa-solid fa-arrow-rotate-right"></i>'
const reloadCardText = `ERA UMA VEZ UM GATO CHINÊS...
                    QUE TAL MONTAR OUTRA VEZ?` 


// quando o elemento começa a ser arrastado ele recebe a classe "dragging"
pieces.forEach((piece) => {
    piece.addEventListener('dragstart', () => {
        piece.classList.add('dragging')
    })
})

// quando ele termina de ser arrastado é removida a classe "dragging"
pieces.forEach((piece) => {
    piece.addEventListener('dragend', () => {
        piece.classList.remove('dragging')
        containers.forEach((container) => container.classList.remove('allow-drop'))
    })
})

// cada container ganha um evento "dragover", que é pra quando o elemento tá em cima dele
// e um "drop" pra quando largamos o elemento arrastado
containers.forEach((container) => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault()

        const draggable = document.querySelector('.dragging')
        if (e.target.dataset.pair === draggable.dataset.pair) {
            e.target.classList.add('allow-drop')
            e.target.style.zIndex = 99             // o z-index é alterado para o container "pular" pra frente ficando com toda a sua área disponível pra peça ser colocada
        }
    })
    container.addEventListener('drop', (e) => {
        const draggable = document.querySelector('.dragging')

        if (e.target.dataset.pair === draggable.dataset.pair) {
            e.target.classList.remove('allow-drop')
            e.target.style.zIndex = 0              // aqui o container volta pra posição original
            e.target.dataset.pair = 0              // esses datasets recebem zero para que peças com o mesmo "pair" não ocupem o mesmo lugar depois que uma delas já está em sua posição
            draggable.dataset.pair = 0
            draggable.style.top = "0"
            draggable.style.left = "0"
            container.appendChild(draggable)

            draggable.draggable = false
        }

        if (!piecesSection.children.length) {
            cardButton.removeEventListener('click', () => {
                card.classList.add('card-move-out')
            })
            cardButton.addEventListener('click', () => {
                location.reload()
            })
            cardButton.innerHTML = rotateIcon
            catSection.classList.add('scale')
            cardText.innerHTML = reloadCardText
            setTimeout(() => { card.classList.add('card-move-in') }, 2200)
        }
    })
})

// evento do card inicial
cardButton.addEventListener('click', () => {
    card.classList.add('card-move-out')
})
