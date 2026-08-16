import { Router, Request, Response } from 'express';
import { professionalModels } from '../utils/modelMapper';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const response = {
    object: 'list',
    data: professionalModels.map((model) => ({
      id: model.id,
      object: 'model',
      created: Math.floor(Date.now() / 1000),
      owned_by: model.provider,
      permission: [],
      root: model.id,
      parent: null,
    }))
  };

  res.json(response);
});

export default router;
