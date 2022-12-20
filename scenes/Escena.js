export class Escena extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }

    preload() {
        this.load.setBaseURL('http://localhost/Flappy/');
        //Cargamos el fondo del juego 
        this.load.image('fondo', 'assets/img/fondo.png');
        //Cargamos el heroe 
        this.load.spritesheet('heroe', 'assets/img/heroe.png', { frameWidth: 164, frameHeight: 160 });
        //Cargamos las tuberías
        this.load.image('pipe0', 'assets/img/pipe0.png');

        this.load.image('pipeArriba0', 'assets/img/pipeArriba.png');
        this.load.image('pipeAbajo0', 'assets/img/pipeAbajo.png');
    }

    create() {
        this.bg = this.add.tileSprite(900, 320, 1920, 1080, 'fondo').setScrollFactor(0);
        //Colocamos el heroe en pantalla y le añadimos físicas para que caiga por la gravedad
        this.player = this.physics.add.sprite(50, 100, 'heroe');
        this.anims.create({
            key: 'volar',
            frames: this.anims.generateFrameNumbers('heroe', { start: 0, end: 7 }),
            frameRate: 9,
            repeat: -1,
        });

        this.anims.create({
            key: 'saltar',
            frames: this.anims.generateFrameNumbers('heroe', { start: 8, end: 8 }),
            frameRate: 7,
            repeat: 1,
        });

        //Iniciamos la animación de volar
        this.player.play('volar');

        //Añadimos el evento de la tecla espacio para que el heroe salte.
        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode === 32) {
                this.saltar();
            }
        });

        //Anadimos el evento del mouse para que el heroe salte
        this.input.on('pointerdown', () => this.saltar());

        //Detecta cuando cualquier animación termina.
        this.player.on('animationcomplete', this.animationComplete, this);

        this.nuevaColumna();

    }

    //Definimos la animación de saltar
    saltar() {
        this.player.setVelocityY(-200);
        this.player.play('saltar');
    }

    //Detecta cuando termina la animación de saltar y ejecuta nuevamente la animación de volar
    animationComplete(animation, frame, sprite) {
        if (animation.key === 'saltar') {
            this.player.play('volar');
        }
    }


    nuevaColumna() {
        //Una columna es un grupo de cubos
        const columna = this.physics.add.group();
        //Cada columna tendrá un hueco (zona en la que no hay cubos) por donde pasará el super heroe
        const hueco = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < 8; i++) {
            //El hueco estará compuesto por dos posiciones en las que no hay cubos, por eso ponemos hueco + 1
            if (i !== hueco && i !== hueco + 1 && i !== hueco - 1) {
                let cubo;
                if (i == hueco - 2) {
                    cubo = columna.create(1920, i * 201 + 3, 'pipeArriba0');
                } else if (i == hueco + 2) {
                    cubo = columna.create(1920, i * 201 + 3, 'pipeAbajo0');
                } else {
                    cubo = columna.create(1920, i * 201 + 3, 'pipe0');
                }
                cubo.body.allowGravity = false;
            }
        }
        columna.setVelocityX(-200);
        //Detectamos cuando las columnas salen de la pantalla..
        columna.checkWorlsBounds = true;
        //... y con la siguiente linea las eliminaremos
        columna.outOfBoundsKill = true;
        //Cada 1000 milisegundos llamaremos de nuevo esta función para que genere una nueva columna
        this.time.delayedCall(1000, this.nuevaColumna, [], this);
        this.physics.add.overlap(this.player, columna, this.hitColumna, null, this);

    }

    //Redirige a la siguiente escena luego de haber chocado contra un muro
    hitColumna() {
        this.scene.start('perderScene');
    }

    //Permite generar la animación de movimiento del fondo
    update(time) {
        this.bg.tilePositionX = time * 0.1;
    }

}