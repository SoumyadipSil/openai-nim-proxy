import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'OpenAI to NVIDIA NIM Proxy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

export default router;
