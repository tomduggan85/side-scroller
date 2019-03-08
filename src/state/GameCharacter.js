import GameObject from './GameObject'
import { action, observable } from 'mobx'
import directions from '../shared/enum/directions'

// A GameObject that can attack and take damage

const DAMAGE_FLYBACK_X = 4
const DAMAGE_FLYBACK_Y = 5

const DAMAGE_RANGE_NEAR_X = 25
const DAMAGE_RANGE_FAR_X = 30
const DAMAGE_RANGE_Z = 15

class GameCharacter extends GameObject {

  @observable
  health = 2

  @observable
  damageDealt = 0

  @observable
  kills = 0

  canTakeDamage = true
  isDead = false

  constructor( props ) {
    super( props )
    this.onDie = props.onDie
  }

  @action
  attack( animation, damageDelay ) {
    if ( !this.isMovementFrozen() && this.onGround ) {
      this.attacking = true
      this.setAnimation( animation )
      const { duration } = this.animationTracks[ animation ]
      this.freezeMovement( duration, 'attack' )
      
      this.attackDamageTimeout = setTimeout( this.doAttackDamage, damageDelay )
    }
  }

  getAttackBox = () => {
    let minX, maxX

    if ( this.direction === directions.right ) {
      minX = this.position.x + this.collisionWidth + DAMAGE_RANGE_NEAR_X
      maxX = this.position.x + this.collisionWidth + DAMAGE_RANGE_FAR_X
    } else {
      maxX = this.position.x - DAMAGE_RANGE_NEAR_X
      minX = this.position.x - DAMAGE_RANGE_FAR_X
    }

    return {
      x: { min: minX, max: maxX },
      y: { min: this.position.y, max: this.position.y + this.collisionHeight },
      z: { min: this.position.z - DAMAGE_RANGE_Z, max: this.position.z + DAMAGE_RANGE_Z }
    }
  }

  @action
  doAttackDamage = () => {
    const attackBox = this.getAttackBox()

    this.gameState.getGameObjectsInsideBox(attackBox).forEach( gameObject => {
      if ( gameObject !== this && gameObject.canTakeDamage && !gameObject.isDead ) {
        gameObject.takeDamage( 1, this.direction === directions.right ? directions.left : directions.right, this )
      }
    })
  }

  @action
  takeDamage( damage, fromDirection, fromGameCharacter ) {
    if ( this.isCurrentlyTakingDamage ) {
      return
    }

    this.health -= damage
    fromGameCharacter.damageDealt += damage

    this.clearMovementFreezes() // Clear movement freezes because the character is about to be knocked backwards
    clearTimeout( this.attackDamageTimeout ) // Interrupt any in-progress attack
    this.isCurrentlyTakingDamage = true

    this.setAnimation( 'take_damage' )
    this.direction = fromDirection

    this.setFreefall({
      x: fromDirection === directions.left ? DAMAGE_FLYBACK_X : -DAMAGE_FLYBACK_X,
      y: DAMAGE_FLYBACK_Y,
      z: 0
    })

    if ( this.health <= 0 ) {
      this.die()
      fromGameCharacter.kills += 1
    }
  }

  @action
  onReturnToGround() {
    super.onReturnToGround()
    this.isCurrentlyTakingDamage = false // Reset currently-taking-damage flag once damage freefall completes
  }

  @action
  die() {
    this.setAnimation( 'dead' )
    this.isDead = true
    // Increase the freefall velocity a bit
    this.freefall.velocity.x *= 1.5
    this.freefall.velocity.y *= 1.5
    this.freefall.velocity.z *= 1.5

    if ( this.onDie ) {
      this.onDie()
    }
  }
}

export default GameCharacter