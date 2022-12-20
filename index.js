import { Escena } from './scenes/Escena.js';
import { PerderEscena } from './scenes/PerderEscena.js';
import { Inicio } from './scenes/Inicio.js';

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: [Inicio, Escena, PerderEscena],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        },
    },
};

var game = new Phaser.Game(config);