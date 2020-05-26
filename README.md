# Mono Typescript

I create new mono repository for typescript projects. Which include `typescript`, `webpack` and `react`. For testing, I choose `jest` as testing framework. For linter, I choose `eslint` combine with `prettier`.

## How to use

1. choose technology that you want. [here](#technology)

## Technology

1. CI/CD
   1. github workflow - for testing only
   2. circleci - for testing and deployment; Need more configuration on circleci side
2. Package management
   1. dependabot - for auto create and merge new package from package.json
3. Commit management
   1. gitgo - custom commit message which follow angular commit conversion
4. Code analytics
   1. sonar - for checking code smell and errors; Need more configuration on sonar side
