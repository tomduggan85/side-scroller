import GameObject from './GameObject'
import { observable } from 'mobx'
import directions from '../shared/enum/directions'


class Projectile extends GameObject {
  
  @observable
  isAffectedByGravity = false

  @observable
  hasShadow = false

  lifetime = 1500

  constructor( props ) {
    super( props )
    this.parentEnemy = props.parentEnemy
    this.setAnimation( 'default' )
    this.direction = props.direction
    this.velocity.x = this.direction === directions.right ? this.speed : -this.speed

    this.lifetimeTimeout = setTimeout( this.removeFromGame, this.lifetime )
  }

  stepMovement( deltaTime ) {
    super.stepMovement( deltaTime )
    
    this.gameState.getGameObjectsInsideBox( this.getBoundingBox() ).forEach( gameObject => {
      if ( gameObject !== this && gameObject.canTakeDamage && !gameObject.isDead && gameObject !== this.parentEnemy ) {
        gameObject.takeDamage( 1, this.position.x < gameObject.position.x ? directions.left : directions.right, this )
        clearTimeout( this.lifetimeTimeout )
        this.removeFromGame()
      }
    })
  }
}

export default Projectile