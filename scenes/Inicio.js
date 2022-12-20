export class Inicio extends Phaser.Scene {
    constructor() {
        super({ key: 'inicio' });
    }

    preload() {
        this.load.image('bienvenida', 'assets/img/message.png');
    }

    create() {
        this.add.image(740, 350, 'bienvenida');
        this.input.on('pointerdown', () => this.scene.start('game'));
    }
}