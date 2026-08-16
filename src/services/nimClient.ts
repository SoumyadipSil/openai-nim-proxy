import axios, { AxiosResponse } from 'axios';
import { env } from '../config/env';
import { Request, Response } from 'express';

const NIM_BASE_URL = 'https://integrate.api.nvidia.com/v1';

const nimClient = axios.create({
  baseURL: NIM_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${env.NVIDIA_API_KEY}`
  }
});

/**
 * Forwards a standard non-streaming chat completion request to NIM.
 */
export async function forwardChatCompletion(body: any): Promise<any> {
  const response = await nimClient.post('/chat/completions', body);
  return response.data;
}

/**
 * Forwards a streaming chat completion request to NIM and streams back to the client.
 */
export async function forwardChatCompletionStream(body: any, clientRes: Response): Promise<void> {
  try {
    const response: AxiosResponse = await nimClient.post('/chat/completions', body, {
      responseType: 'stream'
    });

    // Set appropriate headers for SSE
    clientRes.setHeader('Content-Type', 'text/event-stream');
    clientRes.setHeader('Cache-Control', 'no-cache');
    clientRes.setHeader('Connection', 'keep-alive');

    // Pipe the stream from NIM directly to the client
    response.data.pipe(clientRes);

    response.data.on('error', (err: any) => {
      console.error('❌ Stream error from NIM:', err);
      clientRes.end();
    });

  } catch (error: any) {
    if (error.response && error.response.data) {
      // If error occurs before the stream starts, we might need to consume the stream to get the error body
      let errorBody = '';
      error.response.data.on('data', (chunk: any) => {
        errorBody += chunk.toString();
      });
      error.response.data.on('end', () => {
        try {
          const parsed = JSON.parse(errorBody);
          clientRes.status(error.response.status).json(parsed);
        } catch (e) {
          clientRes.status(error.response.status).json({
            error: {
              message: errorBody || 'Error from upstream NIM provider',
              type: 'provider_error'
            }
          });
        }
      });
    } else {
      throw error;
    }
  }
}
