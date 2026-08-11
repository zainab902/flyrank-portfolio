# 🚀 Zainab Sultan — Software & AI Engineering Portfolio

A high-performance, accessible, and interactive Next.js 14 web application featuring an AI-powered portfolio assistant, interactive 3D WebGL product configurator, custom GLSL fragment shaders, and automated testing pipelines.

**Live Production Deployment:** [https://flyrank-portfolio-heh3-fbosgs5d0-zeeez.vercel.app](https://flyrank-portfolio-heh3-fbosgs5d0-zeeez.vercel.app)  
**CI/CD Pipeline Status:** GitHub Actions Passing ✅

---

## 🌟 Key Features & Pages

* **🤖 AI Portfolio Assistant (`/`):** Streamed chat interface powered by Vercel AI SDK (`@ai-sdk/react`) and Groq (`llama-3.3-70b-versatile`). Features dynamic `aria-live="polite"` screen-reader accessibility and a keyboard-reachable stream cancellation button.
* **🧊 3D Product Configurator (`/3d-demo`):** Interactive WebGL 3D model viewer built with React Three Fiber (`@react-three/fiber`) and `@react-three/drei`. Includes real-time material swatches, roughness/metalness adjustment, mesh distortion shaders, and orbit/touch controls.
* **✨ Signature Shader Hero (`/shader-hero`):** Custom GLSL domain-warped cosmic aurora fragment shader with live mouse vector tracking (`u_mouse`), aspect ratio correction (`u_resolution`), time evolution (`u_time`), and automated `prefers-reduced-motion` fallbacks.
* **⚡ Smart Action Buttons (`/buttons-demo`):** Custom micro-interaction button components with accessible loading and active states.
* **♿ Accessibility & Web Vitals Audit (`AUDIT.md`):** 100/100 Accessibility score on Lighthouse Mobile and 0 WAVE errors across primary flows.

---

## 🛠️ Tech Stack & Architecture

| Category | Technologies & Libraries |
| :--- | :--- |
| **Framework & Core** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS |
| **AI Integration** | Vercel AI SDK (`ai`, `@ai-sdk/react`), Groq API (`llama-3.3-70b-versatile`) |
| **3D & WebGL Shaders**| Three.js, `@react-three/fiber`, `@react-three/drei`, GLSL Shaders |
| **Testing Suite** | Vitest, React Testing Library, Playwright (E2E testing) |
| **CI/CD & Hosting** | GitHub Actions (Node 20), Vercel Production Deployment |

---

## 🔒 Production Hygiene & Abuse Protection

1. **Streaming Timeout (`maxDuration = 30`):** Enforces a 30-second execution cap on Vercel serverless API routes to prevent hanging long-lived connections.
2. **Input Character Capping:** Truncates user input messages to a maximum of 1,000 characters and caps conversation context history to the last 10 messages, preventing token-drain abuse.
3. **Array Payload Validation:** Rejects malformed requests missing required message structures with explicit HTTP `400 Bad Request` headers.

---

## 🔑 Environment Variables

To run this project locally, create a `.env.local` file in the root directory:

| Environment Variable | Description | Required | Default / Mock Value |
| :--- | :--- | :--- | :--- |
| `GROQ_API_KEY` | API key from Groq Cloud console for LLM inference | Yes (in Prod) | `gsk_dummy_key_for_ci_build` |

---

## ⚙️ Local Development Setup

Follow these steps to clone and run the repository locally:

```bash
# 1. Clone the repository
git clone [https://github.com/zainab902/flyrank-portfolio.git](https://github.com/zainab902/flyrank-portfolio.git)
cd flyrank-portfolio

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Set up environment variables
echo "GROQ_API_KEY=your_groq_api_key_here" > .env.local

# 4. Start local development server
npm run dev