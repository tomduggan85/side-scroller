import { observable } from 'mobx'
import EnemySpawner from './EnemySpawner'
import DoorSpawner from './DoorSpawner'
import Fire from './Fire'
import WreckingBall from './WreckingBall'
import FootEnemy from './FootEnemy'
import SwordEnemy from './SwordEnemy'
import BladeThrowerEnemy from './BladeThrowerEnemy'
import ElevatorSpawner from './ElevatorSpawner'
import SpearEnemy from './SpearEnemy'

class Level {

  @observable
  backgroundUrl = '/assets/images/levels/level1/background.png'

  @observable
  minZ = 25

  @observable
  maxZ = 260

  maxCamPosition = 3795

  startingGameObjects = [
    { objectType: Fire },
    {
      objectType: EnemySpawner,
      position: { x: 0, y: 0, z: 0 },
      triggerX: 0,
      enemies: [
        { position: { x: -80, y: 0, z: 250 }, delay: 0, enemyType: FootEnemy },
      ],
      locksCamera: true,
    },
    {
      objectType: EnemySpawner,
      position: { x: 620, y: 0, z: 0 },
      triggerX: 250,
      enemies: [
        { position: { x: -450, y: 0, z: 250 }, delay: 0, enemyType: FootEnemy },
        { position: { x: 320, y: 0, z: 150 }, delay: 1000, enemyType: FootEnemy },
        { position: { x: 320, y: 0, z: 100 }, delay: 2000, enemyType: FootEnemy },
        { position: { x: 320, y: 0, z: 250 }, delay: 5000, enemyType: FootEnemy },
      ],
      locksCamera: true,
    },
    {
      objectType: EnemySpawner,
      position: { x: 880, y: 0, z: 0 },
      triggerX: 510,
      enemies: [
        { position: { x: -550, y: 0, z: 250 }, delay: 0, enemyType: FootEnemy },
        { position: { x: -550, y: 0, z: 250 }, delay: 1000, enemyType: FootEnemy },
        { position: { x: 300, y: 0, z: 250 }, delay: 2000, enemyType: FootEnemy },
        { position: { x: -550, y: 0, z: 250 }, delay: 5000, enemyType: FootEnemy },
      ],
      locksCamera: true,
    },
    {
      objectType: DoorSpawner,
      position: { x: 1018, y: 0, z: 283 },
      triggerX: 680,
      enemies: [
        { position: { x: 30, y: 0, z: -5 }, delay: 300, enemyType: FootEnemy },
      ]
    },
    {
      objectType: EnemySpawner,
      position: { x: 1050, y: 0, z: 0 },
      triggerX: 680,
      enemies: [
        { position: { x: -500, y: 0, z: 200 }, delay: 1000, enemyType: FootEnemy },
        { position: { x: 500, y: 0, z: 200 }, delay: 1500, enemyType: FootEnemy },
        { position: { x: 500, y: 0, z: 250 }, delay: 5000, enemyType: FootEnemy },
        { position: { x: 500, y: 0, z: 200 }, delay: 6500, enemyType: FootEnemy },
        { position: { x: 500, y: 0, z: 100 }, delay: 800, enemyType: FootEnemy },
        { position: { x: -500, y: 0, z: 250 }, delay: 11000, enemyType: FootEnemy },
        { position: { x: -500, y: 0, z: 150 }, delay: 12000, enemyType: FootEnemy },
      ],
      locksCamera: true,
    },
    {
      objectType: EnemySpawner,
      position: { x: 1400, y: 0, z: 200 },
      triggerX: 930,
      enemies: [
        { position: { x: -100, y: 100, z: 120 }, delay: 0, enemyType: WreckingBall },
        { position: { x: -120, y: 100, z: 125 }, delay: 200, enemyType: WreckingBall },
      ],
      respawnEvery: 2400,
    },
    {
      objectType: EnemySpawner,
      position: { x: 1400, y: 0, z: 0 },
      triggerX: 930,
      enemies: [
        { position: { x: -500, y: 0, z: 220 }, delay: 400, enemyType: BladeThrowerEnemy },
        { position: { x: -500, y: 0, z: 80 }, delay: 1400, enemyType: BladeThrowerEnemy },
      ],
      locksCamera: true,
    },
    {
      objectType: EnemySpawner,
      position: { x: 1550, y: 0, z: 0 },
      triggerX: 1180,
      enemies: [
        { position: { x: -500, y: 0, z: 220 }, delay: 400, enemyType: BladeThrowerEnemy },
        { position: { x: -500, y: 0, z: 80 }, delay: 1400, enemyType: BladeThrowerEnemy },
        { position: { x: 500, y: 0, z: 80 }, delay: 3000, enemyType: BladeThrowerEnemy },
      ],
      locksCamera: true,
    },
    {
      objectType: DoorSpawner,
      position: { x: 1983, y: 0, z: 283 },
      triggerX: 1680,
      enemies: [
        { position: { x: 30, y: 0, z: -5 }, delay: 300, enemyType: FootEnemy },
      ]
    },
    {
      objectType: EnemySpawner,
      position: { x: 2050, y: 0, z: 0 },
      triggerX: 1680,
      enemies: [
        { position: { x: 500, y: 0, z: 240 }, delay: 1000, enemyType: FootEnemy },
        { position: { x: -500, y: 0, z: 240 }, delay: 2000, enemyType: FootEnemy },
        { position: { x: 500, y: 0, z: 150 }, delay: 6000, enemyType: FootEnemy },
        { position: { x: 500, y: 0, z: 50 }, delay: 7000, enemyType: FootEnemy },
        { position: { x: 500, y: 0, z: 250 }, delay: 11000, enemyType: FootEnemy },
      ],
      locksCamera: true,
    },
    {
      objectType: EnemySpawner,
      position: { x: 2200, y: 0, z: 0 },
      triggerX: 1830,
      enemies: [
        { position: { x: 400, y: 0, z: 0 }, delay: 0, enemyType: FootEnemy },
        { position: { x: -500, y: 0, z: 200 }, delay: 15000, enemyType: FootEnemy },
        { position: { x: -500, y: 0, z: 240 }, delay: 2500, enemyType: FootEnemy },
        { position: { x: -500, y: 0, z: 240 }, delay: 5500, enemyType: FootEnemy },
        { position: { x: 500, y: 0, z: 10 }, delay: 8500, enemyType: FootEnemy },
        { position: { x: 500, y: 0, z: 10 }, delay: 11500, enemyType: FootEnemy },
      ],
      locksCamera: true,
    },
    {
      objectType: EnemySpawner,
      position: { x: 2700, y: 0, z: 200 },
      triggerX: 2280,
      enemies: [
        { position: { x: -100, y: 100, z: 120 }, delay: 0, enemyType: WreckingBall },
        { position: { x: -120, y: 100, z: 125 }, delay: 200, enemyType: WreckingBall },
      ],
      respawnEvery: 2200,
    },
    {
      objectType: EnemySpawner,
      position: { x: 2700, y: 0, z: 0 },
      triggerX: 2280,
      enemies: [
        { position: { x: -500, y: 0, z: 220 }, delay: 400, enemyType: BladeThrowerEnemy },
        { position: { x: -500, y: 0, z: 80 }, delay: 1400, enemyType: BladeThrowerEnemy },
      ],
      locksCamera: true,
    },
    {
      objectType: EnemySpawner,
      position: { x: 2850, y: 0, z: 0 },
      triggerX: 2480,
      enemies: [
        { position: { x: 400, y: 0, z: 20 }, delay: 400, enemyType: BladeThrowerEnemy },
        { position: { x: -500, y: 0, z: 240 }, delay: 1400, enemyType: BladeThrowerEnemy },
        { position: { x: -500, y: 0, z: 80 }, delay: 3500, enemyType: BladeThrowerEnemy },
        { position: { x: 400, y: 0, z: 240 }, delay: 5000, enemyType: BladeThrowerEnemy },
      ],
      locksCamera: true,
    },
    {
      objectType: DoorSpawner,
      position: { x: 2946, y: 0, z: 283 },
      triggerX: 2780,
      enemies: [
        { position: { x: 30, y: 0, z: -5 }, delay: 300, enemyType: FootEnemy },
        { position: { x: 500, y: 0, z: -25 }, delay: 1000, enemyType: FootEnemy },
        { position: { x: 500, y: 0, z: -25 }, delay: 1500, enemyType: FootEnemy },
        { position: { x: 500, y: 0, z: -225 }, delay: 5500, enemyType: FootEnemy },
        { position: { x: 500, y: 0, z: -25 }, delay: 7000, enemyType: FootEnemy },
      ],
      locksCamera: true
    },
    {
      objectType: DoorSpawner,
      position: { x: 3268, y: 0, z: 283 },
      triggerX: 2930,
      enemies: [
        { position: { x: 30, y: 0, z: -5 }, delay: 300, enemyType: FootEnemy },
        { position: { x: 700, y: 0, z: -25 }, delay: 1000, enemyType: FootEnemy },
        { position: { x: -450, y: 0, z: -25 }, delay: 2000, enemyType: FootEnemy },
        { position: { x: 700, y: 0, z: -25 }, delay: 5000, enemyType: FootEnemy },
      ],
      locksCamera: true
    },
    {
      objectType: EnemySpawner,
      position: { x: 3500, y: 0, z: 0 },
      triggerX: 3130,
      enemies: [
        { position: { x: -500, y: 0, z: 240 }, delay: 0, enemyType: SwordEnemy },
        { position: { x: -500, y: 0, z: 240 }, delay: 500, enemyType: SwordEnemy },
        { position: { x: 500, y: 0, z: 240 }, delay: 1000, enemyType: SwordEnemy },
        { position: { x: 500, y: 0, z: 240 }, delay: 4000, enemyType: SwordEnemy },
        { position: { x: 500, y: 0, z: 240 }, delay: 6500, enemyType: SwordEnemy },
        { position: { x: 500, y: 0, z: 40 }, delay: 9500, enemyType: SwordEnemy },
        { position: { x: -400, y: 0, z: 240 }, delay: 11000, enemyType: SwordEnemy },
      ],
      locksCamera: true,
    },
    {
      objectType: ElevatorSpawner,
      position: { x: 3594, y: 0, z: 280 },
      triggerX: 3480,
      enemies: []
    },
    {
      objectType: ElevatorSpawner,
      position: { x: 3915, y: 0, z: 280 },
      triggerX: 3480,
      enemies: [
        { position: { x: 30, y: 0, z: -5 }, delay: 300, enemyType: FootEnemy },
        { position: { x: -305, y: 0, z: -5 }, delay: 300, enemyType: FootEnemy },
      ],
      locksCamera: true
    },
    {
      objectType: EnemySpawner,
      position: { x: 3950, y: 0, z: 0 },
      triggerX: 3580,
      enemies: [
        { position: { x: -500, y: 0, z: 50 }, delay: 0, enemyType: FootEnemy },
        { position: { x: 400, y: 0, z: 240 }, delay: 800, enemyType: FootEnemy },
        { position: { x: 400, y: 0, z: 220 }, delay: 1300, enemyType: FootEnemy },
        { position: { x: 400, y: 0, z: 240 }, delay: 3000, enemyType: FootEnemy },
      ],
      locksCamera: true,
    },
    {
      objectType: EnemySpawner,
      position: { x: 4100, y: 0, z: 0 },
      triggerX: 3730,
      enemies: [
        { position: { x: -500, y: 0, z: 50 }, delay: 0, enemyType: SpearEnemy },
        { position: { x: -500, y: 0, z: 250 }, delay: 250, enemyType: SpearEnemy },
        { position: { x: -500, y: 0, z: 50 }, delay: 3000, enemyType: SwordEnemy },
        { position: { x: -500, y: 0, z: 250 }, delay: 4000, enemyType: SwordEnemy },
        { position: { x: -500, y: 0, z: 50 }, delay: 5000, enemyType: SwordEnemy },
        { position: { x: -500, y: 0, z: 50 }, delay: 7500, enemyType: SpearEnemy },
        { position: { x: -500, y: 0, z: 250 }, delay: 8500, enemyType: SpearEnemy },
      ],
    },
  ]
}

export default Level