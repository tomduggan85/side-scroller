import ThrowerEnemy from './ThrowerEnemy'
import BladeProjectile from './BladeProjectile'

class BladeThrowerEnemy extends ThrowerEnemy {
  longRangeAttackChance = 0.75

  longRangeAttackTimeout = 1500

  shortAttackRange = [ 0, 10 ]

  longAttackRange = [ 25, 250 ]

  projectileType = BladeProjectile

  throwHeight = 65

  leftThrowOffset = -40
  rightThrowOffset = 60

  animationTracks = {
    walking: {
      frames: [
        { x: 1145, y: 20 },
        { x: 1220, y: 20 },
        { x: 1280, y: 20 },
        { x: 1220, y: 20 },
      ],
      duration: 700,
    },
    attack: {
      frames: [
        { x: 1145, y: 20 },
        { x: 1150, y: 350, width: 120 },
      ],
      duration: 600,
    },
    take_damage: {
      frames: [{ x: 1145, y: 510 }],
      duration: 1000
    },
    dead: {
      frames: [{ x: 1240, y: 490, width: 120 }],
      duration: 1000
    },
    explode: {
      frames: [
        { x: 400, y: 460 },
        { x: 490, y: 450, width: 100 },
        { x: 0, y: 0, width: 1 },
      ], 
      loopStartFrame: 2,
      introDuration: 200,
      duration: 1000,
    },
    throw: {
      frames: [
        { x: 1145, y: 20 },
        { x: 1160, y: 204 },
        { x: 1250, y: 204, width: 120 },
      ],
      duration: 500,
    },
  }
}

export default BladeThrowerEnemy