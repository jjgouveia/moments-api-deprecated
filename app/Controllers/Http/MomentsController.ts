import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import { v4 as uuidv4 } from 'uuid'

import Moment from 'App/Models/Moment'

export default class MomentsController {
  private validationOptions = {
    types: ['image'],
    size: '2mb',
  }

  // método de criar um Moment
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const image = request.file('image', this.validationOptions)

    if (image) {
      //cria um namefile único garantindo que dados não sejam sobrescritos no banco
      const imageName = `${uuidv4()}.${image.extname}`
      //move as imagens para a past tmp/uploads do sistema e seta o nome escolhido
      await image.move(Application.tmpPath('uploads'), {
        name: imageName,
      })

      //adiciona o mesmo nome ao body
      body.image = imageName
    }

    //cria o Moment a partir dos dados fornecidos pelo body
    const moment = await Moment.create(body)

    response.status(201)

    return {
      message: 'Momento Criado com Sucesso',
      data: moment,
    }
  }

  public async index() {
    const moments = await Moment.query().preload('comments').orderBy('id', 'desc')

    return {
      data: moments,
    }
  }

  public async show({ params: { id } }: HttpContextContract) {
    const moment = await Moment.findOrFail(id)

    await moment.load('comments')

    return {
      data: moment,
    }
  }

  public async destroy({ params: { id }, response }: HttpContextContract) {
    const moment = await Moment.findOrFail(id)
    await moment.delete()
    response.status(202)

    return {
      message: 'Momento Excluído com sucesso',
      data: moment,
    }
  }

  public async update({ params: { id }, request, response }: HttpContextContract) {
    const body = request.body()

    const moment = await Moment.findOrFail(id)

    moment.title = body.title
    moment.description = body.description

    if (moment.image !== body.image || !moment.image) {
      const image = request.file('image', this.validationOptions)

      //cria um namefile único garantindo que dados não sejam sobrescritos no banco
      const imageName = `${uuidv4()}.${image?.extname}`
      //move as imagens para a past tmp/uploads do sistema e seta o nome escolhido
      await image?.move(Application.tmpPath('uploads'), {
        name: imageName,
      })

      //adiciona o mesmo nome ao body
      body.image = imageName
    }

    await moment.save()

    response.status(202)

    return {
      message: 'Moment atualizado',
      data: moment,
    }
  }
}
