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
  questionText
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

    const questions = this.questionGenerator()
    //console.log(questions)

    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 100,
        questions.statement
      )
      .setFontFamily('Arial')
      .setFontSize(64)
      .setColor('#ffff00')
      .setOrigin(0.5, 0.5)

    this.asteroid = [
      new Asteroid(this, horizontalOffset, y, questions.options[0]),
      new Asteroid(this, x, y, questions.options[1]),
      new Asteroid(
        this,
        this.cameras.main.width - horizontalOffset,
        y,
        questions.options[2]
      )
    ]

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  private questionGenerator() {
    const options = 3
    const result = {
      statement: '',
      options: [],
      answer: 0
    }

    for (let i = 0; i < options; i++) {
      const randomValue = Phaser.Math.RND.between(1, 20)
      result.options.push(randomValue)
    }

    result.answer = result.options[Phaser.Math.RND.between(0, options - 1)]

    const getStatement = (answer: number) => {
      const firstAddend = Phaser.Math.RND.between(0, answer)
      const secondAddend = answer - firstAddend
      return `${firstAddend} + ${secondAddend} =`
    }

    result.statement = getStatement(result.answer)
    return result
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
