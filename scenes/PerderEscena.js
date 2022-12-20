export class PerderEscena extends Phaser.Scene {
    constructor() {
        super({ key: 'perderScene' });
    }

    preload() {
        this.load.image('perder', 'assets/img/gameover.png');
    }

    create() {
        this.add.image(740, 350, 'perder');
        this.input.on('pointerdown', () => this.scene.start('game'));
    }
}