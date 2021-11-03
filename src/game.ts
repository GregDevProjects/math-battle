import 'phaser'
import Player from './player'
import Asteroid from './asteriod'
import inputController from './inputController'
import { Position, PlayerTexture } from './enums'

export default class Demo extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite
  enemy: Phaser.Physics.Arcade.Sprite
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  asteroid

  constructor() {
    super('demo')
  }

  preload() {
    this.load.image('shipYellow_manned', 'assets/shipYellow_manned.png')
    this.load.image('shipGreen_manned', 'assets/shipGreen_manned.png')
    this.load.image('spaceMeteors_001', 'assets/spaceMeteors_001.png')
  }

  create() {
    //this.add.shader('RGB Shift Field', 0, 0, 800, 600).setOrigin(0);

    this.player = new Player(this, Position.Top, PlayerTexture.Green)
    this.enemy = new Player(this, Position.Bottom, PlayerTexture.Yellow)

    const horizontalOffset = 70
    const y = this.cameras.main.centerY
    const x = this.cameras.main.centerX
    this.asteroid = [
      new Asteroid(this, horizontalOffset, y),
      new Asteroid(this, x, y),
      new Asteroid(this, this.cameras.main.width - horizontalOffset, y)
    ]

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    inputController(this.player, this.cursors)
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  width: 600,
  height: 600,
  scene: Demo,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  }
}

const game = new Phaser.Game(config)
