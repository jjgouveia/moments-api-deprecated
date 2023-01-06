import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Moment from 'App/Models/Moment'
import { v4 as uuidv4 } from 'uuid'
import Application from '@ioc:Adonis/Core/Application'

export default class MomentsController {
  private validationOptions = {
    types: ['image'],
    size: '2mb',
  }

  public async index({}: HttpContextContract) {
    const moment = await Moment.query().preload('comments').orderBy('id', 'desc')

    return {
      data: moment,
    }
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response, auth }: HttpContextContract) {
    const data = request.body()

    data.user_id = auth.user?.id
    data.posted_by = auth.user?.username

    const image = request.file('image', this.validationOptions)

    if (image) {
      //cria um namefile único garantindo que dados não sejam sobrescritos no banco
      const imageName = `${uuidv4()}.${image.extname}`
      //move as imagens para a past tmp/uploads do sistema e seta o nome escolhido
      await image.move(Application.tmpPath('uploads'), {
        name: imageName,
      })

      //adiciona o mesmo nome ao body
      data.image = imageName
    }

    //cria o Moment a partir dos dados fornecidos pelo body
    const moment = await Moment.create(data)

    response.status(201)

    return {
      message: 'Momento Criado com Sucesso',
      data: moment,
    }
  }

  public async show({ params: { id }, response }: HttpContextContract) {
    const moment = await Moment.find(id)

    if (!moment) {
      response.status(404)
      return {
        message: `Nenhum Moment encontrado com o id ${id}`,
      }
    }

    await moment.load('comments')

    return {
      data: moment,
    }
  }

  public async edit({}: HttpContextContract) {}

  public async update({ params: { id }, request, response }: HttpContextContract) {
    const moment = await Moment.find(id)
    const data = request.body()

    if (!moment) {
      response.status(404)
      return {
        message: `Nenhum Moment encontrado com o id ${id}`,
      }
    }

    moment.merge(data)
    await moment.save()

    return moment
  }

  public async destroy({ params: { id }, response }: HttpContextContract) {
    const moment = await Moment.find(id)

    if (!moment) {
      response.status(404)
      return {
        message: `Nenhum Moment encontrado com o id ${id}`,
      }
    }

    moment.delete()
    response.status(202)

    return {
      message: `Moment ${id} excluído coom sucesso!`,
    }
  }
}
