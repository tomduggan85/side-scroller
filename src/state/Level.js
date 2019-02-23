import { observable } from 'mobx'
import EnemySpawner from './EnemySpawner'
import DoorSpawner from './DoorSpawner'

class Level {

  @observable
  backgroundUrl = '/assets/images/levels/level1/background.png'

  @observable
  minZ = 25

  @observable
  maxZ = 260

  enemySpawners = [
    {
      spawnerType: EnemySpawner,
      position: { x: 0, y: 0, z: 0 },
      triggerX: 0,
      enemies: [
        { position: { x: -100, y: 0, z: 200 }, delay: 0 },
      ],
      locksCamera: true,
    },
    {
      spawnerType: DoorSpawner,
      position: { x: 1018, y: 0, z: 283 },
      triggerX: 1000,
      enemies: [
        { position: { x: 30, y: 0, z: -5 }, delay: 300 },
      ]
    },
    {
      spawnerType: EnemySpawner,
      position: { x: 1000, y: 0, z: 0 },
      triggerX: 1000,
      enemies: [
        { position: { x: -400, y: 0, z: 50 }, delay: 300 },
        { position: { x: 400, y: 0, z: 250 }, delay: 500 },
      ],
      locksCamera: true,
    },
    {
      spawnerType: EnemySpawner,
      position: { x: 1600, y: 0, z: 0 },
      triggerX: 1600,
      enemies: [
        { position: { x: -400, y: 0, z: 100 }, delay: 0 },
        { position: { x: -400, y: 0, z: 300 }, delay: 400 },
        { position: { x: 400, y: 0, z: 200 }, delay: 200 },
        { position: { x: 400, y: 0, z: 250 }, delay: 400 },
      ],
      locksCamera: true,
    },
    {
      spawnerType: DoorSpawner,
      position: { x: 1983, y: 0, z: 283 },
      triggerX: 1983,
      enemies: [
        { position: { x: 30, y: 0, z: -5 }, delay: 300 },
        { position: { x: 30, y: 0, z: -5 }, delay: 700 },
      ]
    },
    {
      spawnerType: DoorSpawner,
      position: { x: 2946, y: 0, z: 283 },
      triggerX: 2946,
      enemies: [
        { position: { x: 30, y: 0, z: -5 }, delay: 300 },
        { position: { x: 30, y: 0, z: -5 }, delay: 700 },
      ]
    },
  ]
}

export default Level