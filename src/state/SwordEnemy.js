import FootEnemy from './FootEnemy'

class SwordEnemy extends FootEnemy {
  longRangeAttackChance = 0.6

  longRangeAttackTimeout = 2000

  jumpKickVelocity = { x: 4, y: 16, z: 0 }

  shortAttackRange = [ 0, 10 ]

  longAttackRange = [ 25, 250 ]

  animationTracks = {
    walking: {
      frames: [
        { x: 1500, y: 20, width: 80 },
        { x: 1590, y: 20 },
        { x: 1690, y: 20 },
        { x: 1590, y: 20 },
      ],
      duration: 700,
    },
    attack: {
      frames: [
        { x: 1500, y: 202, width: 80 },
        { x: 1590, y: 200, width: 120 },
      ],
      duration: 600,
    },
    take_damage: {
      frames: [{ x: 1500, y: 560 }],
      duration: 1000
    },
    dead: {
      frames: [{ x: 1590, y: 550, width: 120 }],
      duration: 1000
    },
    jump_kick: {
      frames: [
        { x: 1500, y: 370 },
        { x: 1590, y: 360, width: 120 },
      ],
      loopStartFrame: 1,
      introDuration: 150,
      duration: 400,
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
    }
  }
}

export default SwordEnemy