import { observable } from 'mobx'
import EnemySpawner from './EnemySpawner'
import DoorSpawner from './DoorSpawner'
import Fire from './Fire'
import WreckingBall from './WreckingBall'
import FootEnemy from './FootEnemy'
import SwordEnemy from './SwordEnemy'
import BladeThrowerEnemy from './BladeThrowerEnemy'
import SpearEnemy from './SpearEnemy'

class Level {

  @observable
  backgroundUrl = '/assets/images/levels/level1/background.png'

  @observable
  minZ = 25

  @observable
  maxZ = 260

  startingGameObjects = [
    { objectType: Fire },
    {
      objectType: EnemySpawner,
      position: { x: 0, y: 0, z: 0 },
      triggerX: 0,
      enemies: [
        { position: { x: -100, y: 0, z: 200 }, delay: 0, enemyType: FootEnemy },
        { position: { x: 800, y: 0, z: 200 }, delay: 0, enemyType: BladeThrowerEnemy },
      ],
      locksCamera: true,
    },
    {
      objectType: EnemySpawner,
      position: { x: 1400, y: 0, z: 200 },
      triggerX: 1350,
      enemies: [
        { position: { x: -100, y: 100, z: 120 }, delay: 0, enemyType: WreckingBall },
        { position: { x: -120, y: 100, z: 125 }, delay: 200, enemyType: WreckingBall },
      ],
      respawnEvery: 2200,
    },
    {
      objectType: DoorSpawner,
      position: { x: 1018, y: 0, z: 283 },
      triggerX: 1000,
      enemies: [
        { position: { x: 30, y: 0, z: -5 }, delay: 300, enemyType: FootEnemy },
      ]
    },
    {
      objectType: EnemySpawner,
      position: { x: 1000, y: 0, z: 0 },
      triggerX: 1000,
      enemies: [
        { position: { x: -500, y: 0, z: 50 }, delay: 300, enemyType: SwordEnemy },
        { position: { x: 500, y: 0, z: 250 }, delay: 500, enemyType: SwordEnemy },
      ],
      locksCamera: true,
    },
    {
      objectType: EnemySpawner,
      position: { x: 1600, y: 0, z: 0 },
      triggerX: 1600,
      enemies: [
        { position: { x: -400, y: 0, z: 100 }, delay: 0, enemyType: FootEnemy },
        { position: { x: -400, y: 0, z: 300 }, delay: 400, enemyType: SpearEnemy },
        { position: { x: 400, y: 0, z: 200 }, delay: 200, enemyType: SpearEnemy },
        { position: { x: 400, y: 0, z: 250 }, delay: 400, enemyType: FootEnemy },
      ],
      locksCamera: true,
    },
    {
      objectType: DoorSpawner,
      position: { x: 1983, y: 0, z: 283 },
      triggerX: 1983,
      enemies: [
        { position: { x: 30, y: 0, z: -5 }, delay: 300, enemyType: FootEnemy },
        { position: { x: 30, y: 0, z: -5 }, delay: 700, enemyType: FootEnemy },
      ]
    },
    {
      objectType: EnemySpawner,
      position: { x: 2700, y: 0, z: 200 },
      triggerX: 2650,
      enemies: [
        { position: { x: -100, y: 100, z: 120 }, delay: 0, enemyType: WreckingBall },
        { position: { x: -120, y: 100, z: 125 }, delay: 200, enemyType: WreckingBall },
      ],
      respawnEvery: 2200,
    },
    {
      objectType: DoorSpawner,
      position: { x: 2946, y: 0, z: 283 },
      triggerX: 2946,
      enemies: [
        { position: { x: 30, y: 0, z: -5 }, delay: 300, enemyType: FootEnemy },
        { position: { x: 30, y: 0, z: -5 }, delay: 700, enemyType: FootEnemy },
      ]
    },
  ]
}

export default Level