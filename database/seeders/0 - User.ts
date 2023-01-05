import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        username: 'juniorgouveia',
        email: 'junior@teste.com',
        password: '123456',
      },
      {
        username: 'mariaisis',
        email: 'isis@teste.com',
        password: 'casadagabi',
      },
    ])
  }
}
