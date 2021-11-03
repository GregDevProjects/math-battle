import { Position, PlayerTexture } from './enums'

class Asteroid extends Phaser.Physics.Arcade.Sprite {
  text
  constructor(scene: Phaser.Scene, x, y) {
    super(scene, x, y, 'spaceMeteors_001')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setDisplaySize(150, 150)

    //text.parentContainer
    this.text = scene.add
      .text(this.x, this.y, '100')
      .setFontFamily('Arial')
      .setFontSize(64)
      .setColor('#ffff00')
      .setOrigin(0.5, 0.5)

    // scene.add.container(0, 0, [this, text])
    this.addToUpdateList()
  }
  preUpdate() {
    this.setAngularVelocity(10)
    this.text.setRotation(this.rotation)
    this.text.setX(this.x)
    this.text.setY(this.y)
  }

  suckTo(gameObject) {
    console.log('me called')
    this.scene.tweens.add({
      targets: [this, this.text],
      y: gameObject.y,
      duration: 2000,
      ease: 'Sine.easeInOut',
      alpha: 0,
      displayWidth: 0,
      displayHeight: 0
    })
  }
}

export default Asteroid
