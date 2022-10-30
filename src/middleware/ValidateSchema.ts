import joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logging from '../library/Logging';
import { IUser } from '../models/User'

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      Logging.error(error);
      return res.status(422).json({ error });
    }
  };
};


export const Schemas = {
    user: {
        create: joi.object<IUser>({
            name: joi.string().required()
        }),
        update: joi.object<IUser>({
            name: joi.string().required()
        })
    }
}