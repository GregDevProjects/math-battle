const inputController = (
  sprite: any, //Phaser.Physics.Arcade.Sprite,
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
): void => {
  const speed = 400
  sprite.setVelocity(0)
  if (cursors.left.isDown) {
    sprite.setVelocityX(-speed)
  } else if (cursors.right.isDown) {
    sprite.setVelocityX(speed)
  }

  if (cursors.up.isDown) {
    sprite.setVelocityY(-speed)
  } else if (cursors.down.isDown) {
    sprite.setVelocityY(speed)
  }

  if (cursors.space.isDown) {
    sprite.shoot()
  }
}

export default inputController
