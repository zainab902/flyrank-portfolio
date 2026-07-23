# FlyRank Capstone Project Rules

## Developer Profile
- Technical builder utilizing AI-assisted workflows to rapidly design, build, and manage software systems.

## Tech Stack & Architecture
- Core Architecture: Modular, scalable web application components.
- Toolchain: Node.js (LTS), Git, VS Code/Cursor.

## Development & Code Conventions
- Prioritize clear structure, clean routing, and robust authentication patterns.
- AI Assistance: Use AI heavily to audit code, generate boilerplate, optimize schemas, and debug performance blocks. Do not manually type routine code when automated generation is cleaner.

## Git & Commit Guidelines
- Strict Requirement: Every commit must follow the Conventional Commits 1.0.0 specification.
- Allowed prefixes: feat:, fix:, docs:, style:, refactor:, test:, chore:

## Strict Development Rules (Learned from FE-03)
1. **Forms & Validation:** All user inputs must be validated using React Hook Form paired with a Zod schema; never rely on uncontrolled native inputs or standard HTML5 validation.
2. **Button Declarations:** Inside form elements, all buttons must explicitly declare their type attribute (e.g., `type="submit"` or `type="button"`) to prevent unintended form submission side-effects.
3. **Optional Fields Schema:** Any optional field (like a password update) must utilize Zod's `.optional()` or preprocess transforms so empty strings do not trigger validation failures on submission.