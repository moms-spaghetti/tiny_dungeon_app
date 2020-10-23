class World {
    constructor() {
        this.rooms = []

        this.setWorldAttributes()
    }

    addRooms() {
        const randomisedRoomNames = shuffle(roomNames)
        for (let i = 0; i < 9; i++) {
            let room = new Room
            room.setRoomId(i)
            room.setRoomName(randomisedRoomNames[i])
            this.rooms.push(room)
        }
    }

    setExitRoom() {
        this.rooms[randomNumber(0, 9)].setExit()
    }

    addEnemies() {
        const roomsWithEnemies = arrayOfNumbers(9, 5)
        roomsWithEnemies.forEach((value) => {
            this.rooms[value].enemy = new Enemy
            this.rooms[value].setEnemyInRoom()
        })
    }

    assignEnemyKeys() {
        let roomsWithEnemies = this.rooms.filter((value) => value.enemy != undefined)
        roomsWithEnemies = roomsWithEnemies.map((value) => {
            return value.roomId
        })
        roomsWithEnemies = shuffle(roomsWithEnemies)
        roomsWithEnemies = roomsWithEnemies.slice(0, 3)
        roomsWithEnemies.forEach((value) => {

            this.rooms[Number(value)].enemy.assignKey(new Key)
        })
    }

    getRoomEnemy(roomid) {
        return this.rooms[roomid].enemy
    }

    setWorldAttributes(){
        this.addRooms()
        this.setExitRoom()
        this.addEnemies()
        this.assignEnemyKeys()
    }
}