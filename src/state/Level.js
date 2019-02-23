import { observable } from 'mobx'

class Level {

  @observable
  backgroundUrl = '/assets/images/levels/level1/background.png'

  @observable
  minZ = 25

  @observable
  maxZ = 260

  enemySpawners = [
    {
      position: { x: 0, y: 0, z: 0 },
      triggerX: 0,
      enemies: [
        { position: { x: -100, y: 0, z: 200 }, delay: 0 },
        { position: { x: 840, y: 0, z: 300 }, delay: 100 },
      ]
    },
    {
      position: { x: 0, y: 0, z: 0 },
      triggerX: 950,
      enemies: [
        { position: { x: 400, y: 0, z: 100 }, delay: 0 },
        { position: { x: 1400, y: 0, z: 200 }, delay: 200 },
        { position: { x: 1400, y: 0, z: 250 }, delay: 400 },
      ]
    }
  ]
}

export default Level