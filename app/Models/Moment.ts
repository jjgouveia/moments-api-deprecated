import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'
import User from './User'

export default class Moment extends BaseModel {
  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @column({ isPrimary: true })
  public id: number

  @column()
  public userId?: number

  @column()
  public postedBy: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    localKey: 'id',
  })
  @belongsTo(() => User, {
    localKey: 'username',
  })
  public user: BelongsTo<typeof User>
}
