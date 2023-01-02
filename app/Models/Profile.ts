import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Profile extends BaseModel {
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public birthdate: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
