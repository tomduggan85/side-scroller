import GameObject from './GameObject'
import FootEnemy from './FootEnemy'

class EnemySpawner extends GameObject {

  triggered = false
  enemiesKilled = 0

  constructor( props ) {
    super( props )
    this.triggerX = props.triggerX
    this.enemies = props.enemies
    this.locksCamera = props.locksCamera
  }

  stepMovement() {
    
    this.gameState.players.forEach( player => {
      if ( player.position.x >= this.triggerX ) {
        if ( !this.triggered ) {
          this.trigger()
        }
      }
    })

    super.stepMovement()
  }

  trigger() {
  
    this.triggered = true
    this.enemies.forEach( enemy => {
      setTimeout(() => this.addEnemy( enemy ), enemy.delay )
    })
  
    if ( this.locksCamera ) {
      this.camera.lock()
    }
  }

  addEnemy = ( enemy ) => {
    this.gameState.addGameObject( FootEnemy, {
      position: {
        x: enemy.position.x + this.position.x, 
        y: enemy.position.y + this.position.y,
        z: enemy.position.z + this.position.z
      },
      onDie: this.onEnemyKilled
    })  
  }

  onEnemyKilled = () => {
    this.enemiesKilled += 1
    if ( this.enemiesKilled === this.enemies.length && this.locksCamera ) {
      this.camera.unlock()
    }
  }
}

export default EnemySpawner