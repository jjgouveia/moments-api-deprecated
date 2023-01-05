import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.query().orderBy('id', 'asc')
    return users
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.only(['username', 'email', 'password'])
    const user = await User.create({
      username: body.username,
      email: body.email,
      password: body.password,
    })

    response.status(201)

    return {
      message: `User ${user.id} created successfully!`,
      data: user,
    }
  }

  public async show({ params: { id }, response }: HttpContextContract) {
    const user = await User.find(id)

    if (!user) {
      response.status(404)
      return { message: 'User not found' }
    }

    return user
  }

  public async update({ params: { id }, request, response }: HttpContextContract) {
    const user = await User.find(id)
    if (!user) {
      response.status(404)
      return { message: 'User not found' }
    }
    const body = request.body()
    await user.merge(body).save()
    response.status(201)

    return {
      message: 'User updated successfully',
      data: user,
    }
  }

  public async destroy({ params: { id }, response }: HttpContextContract) {
    const user = await User.find(id)

    if (!user) {
      response.status(404)
      return { message: 'User not found' }
    }

    user.delete()
    response.status(202)

    return {
      message: `User ${id} deleted successfully!`,
    }
  }
}
