# 📚 FE-12 Case Study: Full-Stack & AI Engineering Portfolio

**Author:** Zainab Sultan  
**Track:** Frontend AI Engineering  
**Production URL:** [https://flyrank-portfolio-heh3-fbosgs5d0-zeeez.vercel.app](https://flyrank-portfolio-heh3-fbosgs5d0-zeeez.vercel.app)  
**Repository:** [https://github.com/zainab902/flyrank-portfolio](https://github.com/zainab902/flyrank-portfolio)  

---

## 🎯 1. Problem Statement & Capstone Overview
Modern portfolio web applications often suffer from static representation, failing to demonstrate real-time technical capabilities or interactive engineering paradigms. The objective of this project was to architect a high-performance, accessible, and interactive portfolio platform featuring:
1. An **AI Portfolio Assistant** streaming LLM outputs via Vercel AI SDK and Groq (`llama-3.3-70b-versatile`).
2. An **Interactive 3D WebGL Product Configurator** built with React Three Fiber (`@react-three/fiber`).
3. A **Custom GLSL Shader Hero** utilizing domain-warped sinusoidal fluid dynamics and real-time cursor vectors.

---

## 🤖 2. AI Workflow & Engineering Patterns

Throughout the 12-assignment track, AI tools (Claude Code, Cursor, and the Claude API) served as active pair-programming collaborators rather than code generators. Three specific, verifiable instances highlight this workflow:

### A. Specific Prompt Engineering Pattern (GLSL Shader Math)
* **Goal:** Generate an organic, multi-layered fluid wave displacement in GLSL without importing external GLB models or heavy textures.
* **Prompt Strategy:**
  > *"Write a GLSL fragment shader function using cosine color palettes and a 4-iteration sinusoidal loop that warps UV space based on u_time and a normalized u_mouse vector, maintaining a radial vignette for typography contrast."*
* **Outcome:** Produced an efficient procedural domain-warping loop (`st.x += 0.35 / i * sin(...)`) with 0 KB network overhead.

### B. AI Bug Caught & Corrected (Module Resolution & Caching)
* **The AI Error:** When converting `tsconfig.json` module resolution settings, the AI suggested `"moduleResolution": "node"`, which triggered TypeScript 5.0+ deprecation warnings (`Option 'moduleResolution=node10' is deprecated`).
* **Detection & Fix:** Caught via VS Code language server error diagnostic tool (`PROBLEMS 1`). Refactored to `"moduleResolution": "bundler"` and added `"ignoreDeprecations": "5.0"`, clearing build logs.

### C. Verification Loop (A11y & Test-Driven Development)
* **Automated Loop:** Built an automated verification loop pairing Vitest unit tests with Chrome DevTools Lighthouse / WAVE audits.
* **Implementation:** Refactored streaming message logs to include `aria-live="polite"` and added a keyboard-reachable `stop()` cancellation button. Verified post-fix via automated Vitest test suite and achieved 100/100 Lighthouse Mobile Accessibility.

---

## ⏱️ 3. Itemized Hours Log (66 Hours Total)

| Assignment Code | Description | Logged Hours |
| :--- | :--- | :--- |
| **FE-01** | Environment and AI toolchain setup | 3 hrs |
| **FE-02** | Certifications and capstone spec (`SPEC.md`) | 5 hrs |
| **FE-03** | Accessible component fundamentals | 5 hrs |
| **FE-04** | AI-assisted workflow drills & branching | 4 hrs |
| **FE-05** | Capstone skeleton deployment | 4 hrs |
| **FE-06** | Streaming AI chat interface (`useChat`) | 6 hrs |
| **FE-07** | Tool results & structured JSON rendering | 5 hrs |
| **FE-08** | Errors, edge cases, and Checkpoint 1 | 4 hrs |
| **FE-09** | Testing pass (Vitest & Playwright E2E) | 5 hrs |
| **FE-10** | Accessibility and performance audit (`AUDIT.md`) | 4 hrs |
| **FE-11** | Production deploy, input caps & README | 3 hrs |
| **FE-12** | Case study & final package submission | 4 hrs |
| **Live Office Hours** | Discord supervised contact sessions | 8 hrs |
| **Capstone Buffer** | Post-feedback revision buffer | 6 hrs |
| **TOTAL** | | **66 Hours** |

---

## 🏆 4. Completed Certifications
1. **Anthropic AI Fluency Framework** — Completed ✅
2. **Anthropic Claude Code in Action** — Completed ✅
3. **Building with the Claude API** — Completed ✅