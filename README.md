# openai-nim-proxy

A lightweight, strictly typed proxy service that translates standard OpenAI API requests to the NVIDIA NIM API. Designed as a drop-in replacement for OpenAI endpoints in enterprise tools and AI IDEs.

## Features

- **OpenAI API Compatibility:** Native support for `/v1/chat/completions` and `/v1/models`.
- **Streaming Support:** Robust Server-Sent Events (SSE) handling.
- **Model Mapping:** Aliases standard names (e.g., `gpt-4`) to NVIDIA's high-performance open models.
- **Security:** Constant-time authentication validation.

The aliases in `src/utils/modelMapper.ts` target model IDs currently exposed by
NVIDIA's Integrate API. Clients may also send a full NIM model ID such as
`meta/llama-3.2-90b-vision-instruct`; full IDs are passed through unchanged.

## Quick Start

### 1. Install
```bash
git clone https://github.com/SoumyadipSil/openai-nim-proxy.git
cd openai-nim-proxy
npm install
```

### 2. Configure
Create a `.env` file in the root directory:
```env
PORT=3000
NVIDIA_API_KEY=your_nvidia_api_key
CLIENT_AUTH_KEY=your_secure_client_token
```

### 3. Run
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

### 4. Deploy on Render or Railway

Use these commands (or use the included `render.yaml`):

- **Build command:** `yarn install && yarn build`
- **Start command:** `yarn start`

Set these environment variables in the hosting dashboard:

```env
NVIDIA_API_KEY=your_nvidia_api_key
CLIENT_AUTH_KEY=your_secure_client_token
```

The host provides `PORT` automatically. Do not hard-code it in production.

## Usage

Point any OpenAI-compatible client (Cursor, Cline, Langchain, etc.) to the proxy:

- **Local base URL:** `http://localhost:3000/v1`
- **Hosted base URL:** `https://<your-service-name>.onrender.com/v1` (Render)
- **Hosted base URL:** `https://<your-service-name>.up.railway.app/v1` (Railway)
- **API Key:** the value of `CLIENT_AUTH_KEY`

For chat completions, clients call:

```text
POST https://<your-service-domain>/v1/chat/completions
Authorization: Bearer <your CLIENT_AUTH_KEY>
Content-Type: application/json
```

## License
MIT
