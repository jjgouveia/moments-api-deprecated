import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Moment from 'App/Models/Moment'

export default class extends BaseSeeder {
  public async run() {
    await Moment.createMany([
      {
        userId: 1,
        title: 'Uma verdade',
        description: 'Dê às pessoas a possibilidade de te perder',
        image: '6e77a7cd-1882-4690-b224-fae7d2936fde.png',
      },
      {
        userId: 2,
        title: 'Moment',
        description: 'Ainda na dúvida se chamo de "Moment" ou "Memory"',
        image: '6e77a7cd-1882-4690-b224-fae7d2936fde.png',
      },
    ])
  }
}
