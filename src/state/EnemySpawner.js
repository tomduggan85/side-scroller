import GameObject from './GameObject'
import FootEnemy from './FootEnemy'

class EnemySpawner extends GameObject {

  triggered = false
  enemiesKilled = 0

  constructor( props ) {
    super( props )
    this.triggerX = props.triggerX
    this.enemies = props.enemies
  }

  stepMovement() {
    
    this.gameState.players.forEach( player => {
      if ( player.position.x >= this.triggerX ) {
        this.trigger()
      }
    })

    super.stepMovement()
  }

  trigger() {
    if ( !this.triggered ) {
      this.triggered = true
      this.enemies.forEach( enemy => {
        setTimeout(() => this.addEnemy( enemy ), enemy.delay )
      })
      
      this.camera.lock()
    }
  }

  addEnemy = ( enemy ) => {
    this.gameState.addGameObject( FootEnemy, {
      position: enemy.position,
      onDie: this.onEnemyKilled
    })  
  }

  onEnemyKilled = () => {
    this.enemiesKilled += 1
    if ( this.enemiesKilled === this.enemies.length ) {
      this.camera.unlock()
    }
  }
}

export default EnemySpawner