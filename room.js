class Room{
    constructor(enemy){
        this.roomName;
        this.isExit = false
        this.enemy = enemy
        this.roomId;
        this.enemyInRoom = false
        this.explored = false
    }

    setExit(){
        this.isExit = true
    }

    setRoomName(name) {
        this.roomName = name
    }

    setRoomId(idValue) {
        this.roomId = idValue
    }

    setEnemyInRoom() {
        this.enemyInRoom = true
    }

    getRoomId() {
        return this.roomId
    }

    getRoomName() {
        return this.roomName
    }

    setExplored() {
        this.explored = true
    }
}