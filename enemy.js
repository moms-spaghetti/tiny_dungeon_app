class Enemy {
    constructor() {
        this.name
        this.type
        this.attackPts
        this.healthPts
        this.holdsKey = false
        this.isDead = false
        this.key;
        this.setAttributes()
    }

    setname() {
        let nameIndex = randomNumber(0, enemyNames.length)
        this.name = enemyNames[nameIndex]
    }

    setType() {
        let typeIndex = randomNumber(0, enemyTypes.length)
        this.type = enemyTypes[typeIndex]
    }

    setAttackPts() {
        this.attackPts = randomNumber(5, 10)
    }

    setHealthPts() {
        this.healthPts = randomNumber(30, 60)
    }

    setAttributes() {
        this.setname()
        this.setType()
        this.setAttackPts()
        this.setHealthPts()
    }

    setDead() {
        this.isDead = true
    }

    getDeadState() {
        return this.isDead
    }

    getKeyHoldState() {
        return holdsKey
    }

    attack() {
        return randomNumber(0, this.attackPts)
    }

    deductHealth(incomingAttack) {
        if (this.healthPts - incomingAttack > 0) {
            this.healthPts = this.healthPts - incomingAttack
        } else {
            this.healthPts = 0
            this.setDead()
        }
    }

    assignKey(key) {
        this.key = key
        this.holdsKey = true
    }

    deassignKey() {
        const keyInTransfer = this.key
        this.holdsKey = false
        this.key = undefined
        return keyInTransfer
        
    }
}