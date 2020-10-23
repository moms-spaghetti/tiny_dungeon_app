//TODO: pass playerData objects here to player?
//TODO: add to scripts html

// const name = prompt(`Who are you traveller?`)

// const playerChoice = prompt(`Please choose a player: 
// 1: Wizard - 20 Attack, 45 Health
// 2: Warrior - 10 Attack, 65 Health
// 3: Rogue - 15 Attack, 50 Health`) - 1

const startButton = document.querySelector('#start-button')
const nameInput = document.querySelector('input')
const playerPanel = document.querySelector('#player-panel')

function startGame() {
    let name = nameInput.value
    let playerChoice

    if(document.querySelector('#wizard').checked){
        playerChoice = 0
    }

    if(document.querySelector('#warrior').checked){
        playerChoice = 1
    }

    if(document.querySelector('#rogue').checked){
        playerChoice = 2
    }

    game = new Game (name, playerTypes[playerChoice])
    game.createRoomButtons()
    createPotionButtons('health', '❤️')
    game.setPlayerStats()
    showPlayerImage(playerChoice)
    document.querySelector('#room-button-container').style.display = 'flex'
    // game.renderToPanel(`🗺️ This dungeon is vast, where shall I go?`)
}

function showPlayerImage(playerId){
    playerPanel.innerHTML = ""
    let image = document.createElement('img')
    image.setAttribute('id', 'player-image')
    if(playerId === 0) {
        image.src = "images/wizard.jpg"
    }

    if(playerId === 1) {
        image.src = "images/warrior.jpg"
    }

    if(playerId === 2) {
        image.src = "images/rogue.jpg"
    }
    playerPanel.appendChild(image)
    image.style.display = 'inline'
}



function createPotionButtons(type, icon) {
    let button = document.createElement('button')
    let roomButtonContainer = document.querySelector('#room-button-container h2')
    button.setAttribute('id', `${type}`)
    button.className = 'potion-buttons'
    button.textContent = `${icon}`
    button.addEventListener('click', _ => {
        game.player.usePotion('health')
    })
    roomButtonContainer.insertAdjacentElement('afterend', button)
}

startButton.addEventListener('click', startGame)
