class Character {
    constructor(name, hp, attackPower, defense) {
        this.name = name;
        this.hp = hp;
        this.attackPower = attackPower;
        this.defense = defense;
    }

    attack(target) {
        let damage = Math.max(this.attackPower - target.defense, 1);
        target.hp -= damage;
        console.log(`${this.name}, ${target.name} adlı rakibe ${damage} hasar verdi!`);
    }

    isAlive() {
        return this.hp > 0;
    }
}

class Player extends Character {
    constructor(name) {
        super(name, 100, 20, 5);
    }

    heal() {
        let healAmount = Math.floor(Math.random() * 10) + 10;
        this.hp += healAmount;
        console.log(`${this.name}, kendini ${healAmount} can puanı kadar iyileştirdi!`);
    }
}

class Enemy extends Character {
    constructor(name) {
        super(name, Math.floor(Math.random() * 50) + 50, Math.floor(Math.random() * 15) + 5, Math.floor(Math.random() * 5) + 2);
    }
}

class Game {
    constructor() {
        this.player = new Player("Oyuncu");
        this.enemies = [
            new Enemy("Canavar 1"),
            new Enemy("Canavar 2"),
            new Enemy("Canavar 3")
        ];
        this.currentEnemy = 0;
    }

    play() {
        console.log("Oyun Başladı!");
        console.log(`İlk rakibin: ${this.enemies[this.currentEnemy].name}`);
        
        while (this.player.isAlive() && this.currentEnemy < this.enemies.length) {
            let enemy = this.enemies[this.currentEnemy];

            let action = prompt("Ne yapmak istersin? (saldır / iyileş)").toLowerCase();

            if (action === "saldır") {
                this.player.attack(enemy);
            } else if (action === "iyileş") {
                this.player.heal();
            } else {
                console.log("Geçersiz hareket! Lütfen 'saldır' veya 'iyileş' yaz.");
                continue;
            }

            if (!enemy.isAlive()) {
                console.log(`${enemy.name} yenildi!`);
                this.currentEnemy++;
                if (this.currentEnemy < this.enemies.length) {
                    console.log(`Yeni rakibin: ${this.enemies[this.currentEnemy].name}`);
                }
            } else {
                enemy.attack(this.player);
            }

            if (!this.player.isAlive()) {
                console.log("Oyunu kaybettin! Tüm canavarlara yenildin.");
                return;
            }
        }

        console.log("Tüm düşmanları yendin! Tebrikler, oyunu kazandın!");
    }
}

let game = new Game();
game.play();
