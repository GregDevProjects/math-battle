import { Position, PlayerTexture } from './enums'

class Asteroid extends Phaser.Physics.Arcade.Sprite {
  text
  constructor(scene: Phaser.Scene, x, y, number: number) {
    super(scene, x, y, 'spaceMeteors_001')
    this.rotation = Phaser.Math.RND.between(0, Phaser.Math.PI2)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setDisplaySize(140, 140)

    //text.parentContainer
    this.text = scene.add
      .text(this.x, this.y, number.toString())
      .setFontFamily('Arial')
      .setFontSize(64)
      .setColor('#ffff00')
      .setOrigin(0.5, 0.5)

    // scene.add.container(0, 0, [this, text])
    //this.addToUpdateList()
  }
  preUpdate() {
    //this.setAngularVelocity(10)
    // this.text.setRotation(this.rotation)
    // this.text.setX(this.x)
    // this.text.setY(this.y)
  }

  suckTo(gameObject) {
    // console.log('me called')
    this.scene.tweens.add({
      targets: [this, this.text],
      y: gameObject.y,
      x: gameObject.x,
      duration: 2000,
      ease: 'Sine.easeInOut',
      alpha: 0,
      displayWidth: 0,
      displayHeight: 0,
      rotation: this.rotation + Phaser.Math.PI2
    })
  }
}

export default Asteroid
