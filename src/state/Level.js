import { observable } from 'mobx'

class Level {

  @observable
  backgroundUrl = '/assets/images/levels/level1/background.png'

  @observable
  minZ = 25

  @observable
  maxZ = 260
}

export default Level