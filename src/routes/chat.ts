import { Router, Request, Response, NextFunction } from 'express';
import { resolveTargetModel } from '../utils/modelMapper';
import { forwardChatCompletion, forwardChatCompletionStream } from '../services/nimClient';

const router = Router();

router.post('/completions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { model, stream, ...rest } = req.body;

    if (!model) {
      res.status(400).json({
        error: {
          message: "The 'model' field is required.",
          type: "invalid_request_error",
          param: "model",
          code: "missing_model"
        }
      });
      return;
    }

    const targetModel = resolveTargetModel(model);
    console.log(`[Proxy] Mapping model '${model}' -> '${targetModel}'`);

    const payload = {
      model: targetModel,
      stream: !!stream,
      ...rest
    };

    if (stream) {
      await forwardChatCompletionStream(payload, res);
    } else {
      const data = await forwardChatCompletion(payload);
      res.json(data);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
