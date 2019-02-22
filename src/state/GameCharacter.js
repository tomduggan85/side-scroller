import GameObject from './GameObject'
import { action, observable } from 'mobx'
import directions from '../shared/enum/directions'

// A GameObject that can attack and take damage

const DAMAGE_FLYBACK_X = 4
const DAMAGE_FLYBACK_Y = 5

const DAMAGE_RANGE_NEAR_X = -30
const DAMAGE_RANGE_FAR_X = 10
const DAMAGE_RANGE_Z = 15

class GameCharacter extends GameObject {

  @observable
  health = 2

  canTakeDamage = true

  @action
  attack( animation, damageDelay ) {
    if ( !this.isMovementFrozen() && this.onGround ) {
      this.attacking = true
      this.setAnimation( animation )
      const duration = this.animationTracks[ animation ].duration
      this.freezeMovement( duration, 'attack' )
      
      setTimeout( this.doAttackDamage, damageDelay )
    }
  }

  @action
  doAttackDamage = () => {
    if ( this.attacking ) { // If the attack has not been interrupted by taking damage
      this.attacking = false
      this.gameState.gameObjects.forEach( gameObject => {
        if (gameObject !== this && gameObject.canTakeDamage) {
          let minX, maxX

          if ( this.direction === directions.right ) {
            minX = this.position.x + this.collisionWidth + DAMAGE_RANGE_NEAR_X
            maxX = this.position.x + this.collisionWidth + DAMAGE_RANGE_FAR_X
          } else {
            maxX = this.position.x - gameObject.collisionWidth - DAMAGE_RANGE_NEAR_X
            minX = this.position.x - gameObject.collisionWidth - DAMAGE_RANGE_FAR_X
          }

          if (
            gameObject.position.x >= minX &&
            gameObject.position.x <= maxX &&
            gameObject.position.z >= this.position.z - DAMAGE_RANGE_Z &&
            gameObject.position.z <= this.position.z + DAMAGE_RANGE_Z ) {
            gameObject.takeDamage( 1, this.direction === directions.right ? directions.left : directions.right )
          }
        }
      })
    }
  }

  @action
  takeDamage( damage, fromDirection ) {
    this.health -= damage
    this.clearMovementFreezes() // Clear movement freezes because the character is about to be knocked backwards
    this.attacking = false // Interrupt any attack in progress

    this.setAnimation( 'take_damage' )
    this.direction = fromDirection

    this.setAirborneOverrideVelocity({
      x: fromDirection === directions.left ? DAMAGE_FLYBACK_X : -DAMAGE_FLYBACK_X,
      y: DAMAGE_FLYBACK_Y,
      z: 0
    })
  }
}

export default GameCharacter