# Contributing to UseSearchParams

First off, thank you for considering contributing to UseSearchParams! It's people like you that make UseSearchParams such a great tool.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps which reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed after following the steps
- Explain which behavior you expected to see instead and why
- Include code samples and screenshots if relevant

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- A clear and descriptive title
- A detailed description of the proposed functionality
- Any possible drawbacks
- Relevant examples of how the enhancement would be used

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/use-search-params.git
   cd use-search-params
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development environment:

   ```bash
   pnpm dev
   ```

4. Run tests:
   ```bash
   pnpm test
   ```

## Project Structure

```
use-search-params/
├── src/
│   ├── lib/         # Core library code
│   ├── adapters/    # Framework adapters
│   ├── hooks/       # React hooks
│   ├── components/  # React components
│   ├── core/        # Core API
│   └── utils/       # Utility functions
├── examples/        # Example implementations
└── docs/           # Documentation
```

## Coding Guidelines

- Write code in TypeScript
- Follow the existing code style
- Add JSDoc comments for all public APIs
- Maintain 100% test coverage for all new code
- Use meaningful commit messages following [Conventional Commits](https://www.conventionalcommits.com/)

## Testing

- Write tests for all new features and bug fixes
- Run `pnpm test` to execute the test suite
- Run `pnpm test:coverage` to generate coverage reports

## Documentation

- Update the README.md if you change functionality
- Add JSDoc comments for new functions and types
- Update the examples if you add new features
- Keep the API documentation up to date

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.com/) specification:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for test-related changes
- `chore:` for maintenance tasks

## Release Process

1. Maintainers will review and merge pull requests
2. Changes will be automatically versioned using semantic-release
3. New versions will be published to npm automatically

## Questions?

Don't hesitate to ask questions by creating an issue or reaching out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
