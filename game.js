class Game {
  constructor(characterId, name, character) {
    this.player = new Player(characterId, name, character); //TODO: am I putting the player here or what?
    this.world = new World(); //TODO: where am I creating a new player and world?
    this.room = this.world.rooms;
    this.battleText = [];

    //ROOM
    this.roomCounter = 0;
    this.currentRoomName = "";
    this.roomsList = ``;

    //ENEMY
    this.enemyEncounterName;
    this.enemyEncountterType;
    this.enemy;
  }
  playStart() {
    this.battleText = [];
    document.querySelector("ul").textContent = "";

    this.setDisableNavigation(true);

    if (!this.player.isDead) {
      this.battleText.push(`❔🚪 You enter the ${this.currentRoomName}...`);
      this.setEnemyStats(false);

      //exit blocked
      if (
        this.room[this.roomCounter].isExit &&
        this.player.heldKeys.length < 3
      ) {
        document.querySelector("#computer-image").src = `./images/locked.jpg`;
        document.querySelector("#computer-image").style.display = "inline";
        this.addToBattleText(
          `🔒 This room appears to have a door to the outside world but it is locked shut!`
        );
        this.addToBattleText(`Looks like I need 3 keys...`);
        this.addToBattleText(
          `🔑🔑🔑 You need ${
            3 - this.player.heldKeys.length
          } more to leave this place...`
        );
      }

      //exit allowed
      if (
        this.room[this.roomCounter].isExit &&
        this.player.heldKeys.length >= 3
      ) {
        document.querySelector("#computer-image").src = `./images/exit.jpg`;
        document.querySelector("#computer-image").style.display = "inline";
        this.addToBattleText(
          `🎉🎉🚪🎉🎉 You have made it! You leave the dungeon!`
        );
        this.delay = 0;
        for (let i = 0; i < this.battleText.length; i++) {
          setTimeout(() => {
            let ul = document.querySelector("ul");
            let li = document.createElement("li");
            li.innerText = this.battleText[i];
            ul.appendChild(li);
          }, this.delay);
          this.delay += 800;
        }
        return;
      }

      //empty room
      if (
        this.room[this.roomCounter].enemyInRoom === false &&
        this.room[this.roomCounter].isExit === false
      ) {
        document.querySelector("#computer-image").src = `./images/empty.jpg`;
        document.querySelector("#computer-image").style.display = "inline";
        this.addToBattleText(
          `👀 The dank air lays still, nothing is here, the quest continues...`
        );
      } else if (
        this.room[this.roomCounter].enemyInRoom === true &&
        this.room[this.roomCounter].enemy.isDead === true
      ) {
        document.querySelector("#computer-image").src = `./images/defeated.jpg`;
        document.querySelector("#computer-image").style.display = "inline";
        this.addToBattleText(
          `✝️ A previously slain foe lies here. The quest continues...`
        );
      }

      if (
        this.room[this.roomCounter].enemyInRoom === true &&
        this.room[this.roomCounter].enemy.isDead === false
      ) {
        this.enemy = this.getEnemy();
        this.setEnemyStats(true);
        let statCounters = document.querySelectorAll(".stat-counters");
        statCounters.forEach((value) => {
          value.style.display = "flex";
        });
        this.enemyEncounterName = this.enemy.name;
        this.enemyEncounterType = this.enemy.type;
        document.querySelector(
          "#computer-image"
        ).src = `./images/${this.enemyEncounterType}.jpg`;
        document.querySelector("#computer-image").style.display = "inline";
        this.addToBattleText(
          `➡️👿 A ${this.enemyEncounterType} (${this.enemy.attackPts}AP, ${this.enemy.healthPts}HP) called ${this.enemyEncounterName} appears from the shadows, prepare to fight!`
        );

        while (
          this.player.getDeadState() === false &&
          this.enemy.getDeadState() === false
        ) {
          this.playerAttack = this.player.attack();
          this.enemy.deductHealth(this.playerAttack);
          if (this.playerAttack === 0) {
            this.addToBattleText(`❗ Your attack missed!`);
          } else {
            if (this.enemy.healthPts > 0) {
              this.addToBattleText(
                `🤺⚔️ ${this.player.name} the ${this.player.type} hits the ${this.enemyEncounterType} for ${this.playerAttack}AP, it has ${this.enemy.healthPts}HP remaining.`
              );
            } else {
              this
                .addToBattleText(`☠️ ${this.player.name} the ${this.player.type} fatally hits the ${this.enemyEncounterType} for ${this.playerAttack}AP. The ${this.enemyEncounterType} has been defeated!
                            `);
              this.enemy.setDead();

              if (this.enemy.holdsKey === true) {
                this.player.assignKey(this.enemy.deassignKey());
                this.addToBattleText(
                  `🔑⭐ You have found a key, hidden on the slumped body of the ${this.enemyEncounterType}. You now have ${this.player.heldKeys.length}! Your freedom draws closer...`
                );

                this.setPlayerStats();

                if (
                  this.room[this.roomCounter].isExit &&
                  this.player.heldKeys.length >= 3
                ) {
                  this.addToBattleText(
                    `🎉🎉🚪🎉🎉 You have made it! You leave the dungeon!`
                  );
                  break;
                } else {
                  break;
                }
              } else {
                this.addToBattleText(
                  `❌ Your slain foe holds no key. Your quest continues...`
                );

                break;
              }
            }
          }

          this.enemyAttack = this.enemy.attack();
          this.player.deductHealth(this.enemyAttack);
          if (this.enemyAttack === 0) {
            this.addToBattleText(`❗ The enemy attack missed you!`);
          } else {
            if (this.player.healthPts > 0) {
              this.addToBattleText(
                `👿⚔️ You were hit for ${this.enemyAttack}AP, you have ${this.player.healthPts}HP remaining.`
              );
            } else {
              this.addToBattleText(
                `☠️ You were fatally hit for ${this.enemyAttack}AP. You died!!!`
              );
              this.player.setDead();
              this.player.diedTo = this.enemy.name;
              this.player.diedWhere = this.currentRoomName;
              break;
            }
          }
        }
      }
    } else {
      this.battleText.push(
        `☠️ You died!!! Your slain body lies before ${this.player.diedTo} in the ${this.player.diedWhere}. Your spirit haunts the dungeon till the end of time.`
      );
    }

    this.delay = 0;
    for (let i = 0; i < this.battleText.length; i++) {
      setTimeout(() => {
        let ul = document.querySelector("ul");
        let li = document.createElement("li");
        li.innerText = this.battleText[i];
        ul.appendChild(li);
      }, this.delay);
      this.delay += 500;
    }
    setTimeout(() => {
      this.setDisableNavigation(false);
    }, 500 * this.battleText.length + 200);
  }

  outputBattleText() {
    this.delay = 0;
    for (let i = 0; i < this.battleText.length; i++) {
      setTimeout(() => {
        let ul = document.querySelector("ul");
        let li = document.createElement("li");
        li.innerText = this.battleText[i];
        ul.appendChild(li);
      }, this.delay);
      this.delay += 500;
    }
  }

  addToBattleText(text) {
    this.battleText.push(text);
  }

  getEnemy() {
    return this.world.rooms[this.roomCounter].enemy;
  }

  getListOfRoomNamesAndNumbers() {
    this.roomsList = "";
    this.world.rooms.forEach((value) => {
      if (value.isExit === false) {
        this.roomsList += `
            ${value.roomId} - ${value.roomName} --- Explored: ${value.explored}`;
      } else {
        this.roomsList += `
            ${value.roomId} - ${value.roomName} --- EXIT: --- Explored: ${value.explored}`;
      }
    });
  }

  createRoomButtons() {
    this.world.rooms.forEach((value) => {
      let button = document.createElement("button");
      button.setAttribute("id", value.roomId);
      button.className = "room-button";
      button.addEventListener("click", (event) => {
        this.roomCounter = event.target.id;
        this.currentRoomName = event.target.textContent;
        this.room[this.roomCounter].setExplored();
        this.setRoomName();
        if (this.room[this.roomCounter].isExit) {
          button.style.backgroundColor = `steelblue`;
        } else button.style.backgroundColor = `palegreen`;
        this.playStart();
      });
      button.textContent = value.roomName;
      document.querySelector("#room-button-container").appendChild(button);
    });
    let resetButton = document.createElement("button");
    resetButton.setAttribute("id", "resetButton");
    resetButton.textContent = "Reset";
    resetButton.addEventListener("click", function () {
      location.reload();
    });
    document.querySelector("#room-button-container").appendChild(resetButton);
  }

  setPlayerStats() {
    document.querySelector(
      "#player-name"
    ).textContent = `Name: ${this.player.name}`;
    document.querySelector(
      "#player-type"
    ).textContent = `Class: ${this.player.type}`;
    document.querySelector(
      "#player-keys"
    ).textContent = `KEYS: ${this.player.heldKeys.length} `;
    document.querySelector(
      "#player-hp"
    ).textContent = `HP: ${this.player.healthPts}`;
    document.querySelector(
      "#player-ap"
    ).textContent = `AP: ${this.player.attackPts}`;
  }

  setEnemyStats(control) {
    if (control) {
      document.querySelector(
        "#computer-name"
      ).textContent = `Name: ${this.enemy.name}`;
      document.querySelector(
        "#computer-type"
      ).textContent = `Class: ${this.enemy.type}`;
      document.querySelector(
        "#computer-hp"
      ).textContent = `HP: ${this.enemy.healthPts}`;
      document.querySelector(
        "#computer-ap"
      ).textContent = `AP: ${this.enemy.attackPts}`;
    } else {
      document.querySelector("#computer-name").textContent = `Name: -`;
      document.querySelector("#computer-type").textContent = `Class: -`;
      document.querySelector("#computer-hp").textContent = `HP: -`;
      document.querySelector("#computer-ap").textContent = `AP: -`;
    }
  }

  setRoomName() {
    document.querySelector("#room-name-heading").textContent = this.room[
      this.roomCounter
    ].roomName;
  }

  setEmptyRoom() {
    document.querySelector("#computer-name").textContent = `An empty place`;
    document.querySelector("#computer-type").textContent = ``;
  }

  setDisableNavigation(control) {
    if (control) {
      const allButtons = document.querySelectorAll(".room-button");
      allButtons.forEach((button) => {
        button.setAttribute("disabled", true);
      });
    } else {
      const allButtons = document.querySelectorAll(".room-button");
      allButtons.forEach((button) => {
        button.removeAttribute("disabled");
      });
    }
  }
}
