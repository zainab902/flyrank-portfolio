# Workflow Analysis: Lazy vs. Guided AI Engineering

## The Comparison
- **Round One (Lazy Prompting):** In the lazy round, I passed a single-sentence prompt asking for a settings form. The output was a basic HTML form with raw state management and generic inline validation. It required manually correcting elements, lacked clean error styling, and omitted any automated test verification.
- **Round Two (Guided AI Loop):** In the guided round, I provided strict schema constraints, toolchain preferences (React Hook Form, Zod, Vitest), edge-case expectations (password optionality parameters), and a request for test implementation. By approving a clear plan first, the AI generated a highly stable component, separated the schema schema layout, and added automated unit tests that verified form validation behavior immediately.

## Key Differences & Diffs
- **Correctness & Type Safety:** Round 1 generated standard uncontrolled React inputs. Round 2 structured typed, controlled inputs bound directly to a Zod schema, preventing type mismatch errors.
- **Edge-Case Resilience:** Round 1 failed to handle the optional password field safely (it treated an empty password as a validation error). Round 2 successfully implemented schema logic to ignore empty password submissions while validating strong rules if any character was inputted.
- **AI Mistakes Caught:** In Round 1, the AI omitted setting explicit button types inside the form, causing accidental submissions. This was prevented in Round 2 by explicitly declaring the button behavior in the initial prompt parameters.

## Conclusion
While writing a precise prompt and waiting for plan approval in Round 2 took a few extra minutes up front, it eliminated roughly 20-30 minutes of manual debugging, code organization, and testing. Investing effort into prompt constraints is significantly faster and safer end-to-end.