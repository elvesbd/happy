import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import institutionView from '../views/institutions_view';
import * as Yup from 'yup';

import Institution from '../models/Institution';

export default {
  async index(request: Request, response: Response) {
    const institutionsRepository = getRepository(Institution);
    const institutions = await institutionsRepository.find({
      relations: ['images']
    });
    
    return response.json(institutionView.renderMany(institutions));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const institutionsRepository = getRepository(Institution);
    const institution = await institutionsRepository.findOneOrFail(id, {
      relations: ['images']
    });
    
    return response.json(institutionView.render(institution));
  },

  async create(request: Request, response: Response) {
    const {
      name,
       latitude,
        longitude,
         about,
          instructions,
           opening_hours,
            open_on_weekends
    } = request.body;
  
    const institutionsRepository = getRepository(Institution);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename}
    })
  
    const data = {
      name,
       latitude,
        longitude,
         about,
          instructions,
           opening_hours,
            open_on_weekends: open_on_weekends === 'true',
             images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required().max(300),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });

    await schema.validate(data, {
      abortEarly: false,
    });
    
    const institution = institutionsRepository.create(data);
  
    await institutionsRepository.save(institution);
  
    return response.status(201).json({ institution });
  }
}