import { Position, PlayerTexture } from './enums'

class Player extends Phaser.Physics.Arcade.Sprite {
  canMove: boolean
  speed: number

  constructor(scene: Phaser.Scene, position: Position, texture: PlayerTexture) {
    const verticalOffset = 70
    const y =
      position === Position.Top
        ? verticalOffset
        : scene.cameras.main.height - verticalOffset
    const x = scene.cameras.main.centerX

    super(scene, x, y, texture)

    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setCollideWorldBounds(true)

    if (position === Position.Bottom) {
      this.setRotation(Math.PI)
    }
    this.canMove = true
    this.speed = 400
  }

  pauseMovementForMilliseconds(milliseconds: number) {
    this.canMove = false
    this.scene.time.delayedCall(milliseconds, () => (this.canMove = true))
  }

  moveLeft() {
    if (!this.canMove) {
      return
    }
    this.setVelocityX(-this.speed)
  }

  moveRight() {
    if (!this.canMove) {
      return
    }
    this.setVelocityX(this.speed)
  }

  shoot() {
    if (!this.canMove) {
      return
    }
    this.pauseMovementForMilliseconds(1000)
    const shotWidth = 70
    const boundries: [number, number, number, number] = [
      this.x - shotWidth / 2,
      this.y + this.displayHeight / 2 + 10,
      shotWidth,
      200
    ]
    const bodies = this.scene.physics.overlapRect(...boundries)

    bodies.forEach((item) => {
      const className = item.gameObject.constructor.name
      if (className === 'Asteroid') {
        item.gameObject.suckTo(this)
      }
    })

    const rect = this.scene.add
      .rectangle(...boundries)
      .setStrokeStyle(2, 0xffff00)
      .setOrigin(0, 0)

    setTimeout(() => {
      rect.destroy()
    }, 1000)
  }
}

export default Player
