import GameObject from './GameObject'

const RESPAWN_MAX_DISTANCE = 800

class EnemySpawner extends GameObject {

  triggered = false
  enemiesKilled = 0

  constructor( props ) {
    super( props )
    this.triggerX = props.triggerX
    this.enemies = props.enemies
    this.locksCamera = props.locksCamera
    this.respawnEvery = props.respawnEvery
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

    this.addEnemies()
    if ( this.locksCamera ) {
      this.camera.lock()
    }
  }

  playersStillCloseEnoughToRespawn() {
    return this.gameState.players.every( player => player.position.x <= this.triggerX + RESPAWN_MAX_DISTANCE )
  }

  addEnemies = () => {
    this.enemies.forEach( enemy => {
      setTimeout(() => this.addEnemy( enemy ), enemy.delay )
    })

    if ( this.respawnEvery && this.playersStillCloseEnoughToRespawn() ) {
      setTimeout( this.addEnemies, this.respawnEvery )
    }
  }

  addEnemy = ( enemy ) => {
    this.gameState.addGameObject( enemy.enemyType, {
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