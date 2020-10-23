class Player extends Enemy {
    constructor(name, character) {
        super()
        this.name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        this.characterId = character.id
        this.type = character.type
        this.attackPts = character.attackPts
        this.healthPts = character.healthPts
        this.startingHealth = this.healthPts
        this.heldKeys = []
        this.healthPotions = []
        this.initPotions()
    }

    assignKey(key) {
        super.assignKey(key)
        key.collectKey()
        this.heldKeys.push(key)
    }

    restoreHealth() {
        this.healthPts = this.startingHealth
    }

    initPotions() {
        for(let i = 0; i < 3; i++){
            this.healthPotions.push(playerPotions[0])
        }
        
    }

    collectPotion(potion) {
        if (potion.type === 'health') {
            this.healthPotions.push(potion)
        }
    }

    usePotion(type) {
        if (type === 'health' && this.healthPotions.length > 0) {
            if ((this.healthPts + this.healthPotions[0].points) >= this.startingHealth) {
                this.restoreHealth()
                this.healthPotions.pop()
            } else {
                this.healthPts += this.healthPotions[0].points
                this.healthPotions.pop()
            }
            game.battleText = []
            game.addToBattleText(`❤️ ${game.player.name} the ${game.player.type}'s health was restored to ${game.player.healthPts}HP`)
            game.outputBattleText()
        } else return

    }
}