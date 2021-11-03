import { Position, PlayerTexture } from './enums'

class Player extends Phaser.Physics.Arcade.Sprite {
  canShoot: boolean

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

    if (position === Position.Bottom) {
      this.setRotation(Math.PI)
    }
    this.canShoot = true
  }

  shoot() {
    if (!this.canShoot) {
      return
    }
    this.canShoot = false
    this.scene.time.delayedCall(1000, () => {
      this.canShoot = true
    })

    const boundries: [number, number, number, number] = [
      this.x - this.displayWidth / 2,
      this.y,
      this.displayWidth,
      500
    ]
    const bodies = this.scene.physics.overlapRect(...boundries)

    bodies.forEach((item) => {
      const className = item.gameObject.constructor.name

      if (className === 'Asteroid') {
        // console.log('got one')
        item.gameObject.suckTo(this)
      }
      //console.log(item.gameObject.constructor.name)
    })

    //console.log(bodies)

    const rect = this.scene.add
      .rectangle(...boundries)
      .setStrokeStyle(2, 0xffff00)

    setTimeout(() => {
      rect.destroy()
    }, 1000)
  }
}

export default Player
