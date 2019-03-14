import FootEnemy from './FootEnemy'
import { action } from 'mobx'
import directions from '../shared/enum/directions'

class ThrowerEnemy extends FootEnemy {
  longRangeAttackChance = 0.75

  longRangeAttackTimeout = 1500

  shortAttackRange = [ 0, 10 ]

  longAttackRange = [ 25, 250 ]

  @action
  doLongRangeAttack() {
    const animation = 'throw'
    const { duration } = this.animationTracks[ animation ]
    this.setAnimation( animation )
    this.freezeMovement( duration, 'throw' )

    const projectileDelay = 350
    this.throwTimeout = setTimeout( this.throwProjectile, projectileDelay )
  }

  @action
  throwProjectile = () => {
    const xOffset = this.direction === directions.right ? this.rightThrowOffset : this.leftThrowOffset
    this.gameState.addGameObject( this.projectileType, {
      position: {
        x: this.position.x + xOffset,
        y: this.position.y + this.throwHeight,
        z: this.position.z
      },
      direction: this.direction,
      parentEnemy: this,
    })
  }

  @action
  takeDamage( damage, fromDirection, fromGameCharacter ) {
    clearTimeout( this.throwTimeout )
    super.takeDamage( damage, fromDirection, fromGameCharacter )
  }
}

export default ThrowerEnemy