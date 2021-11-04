import Player from './player'

const inputController = (
  sprite: any, //Phaser.Physics.Arcade.Sprite,
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
): void => {
  sprite.setVelocity(0)
  if (cursors.left.isDown) {
    sprite.moveLeft()
  } else if (cursors.right.isDown) {
    sprite.moveRight()
  }

  // if (cursors.up.isDown) {
  //   sprite.setVelocityY(-speed)
  // } else if (cursors.down.isDown) {
  //   sprite.setVelocityY(speed)
  // }

  if (cursors.space.isDown) {
    sprite.shoot()
  }
}

export default inputController
