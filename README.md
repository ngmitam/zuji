## Description

Backend for zuju app

## Installation

```bash
$ npm install
```

## Environments

.env

```bash
DB_USER=zuju
DB_PASS=password
DB_NAME=zuju
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API docs

After running the app, the swagger document would be on this URI:

```bash
http://localhost:3000/api_docs/
```

## Test

Example/Test Sql data in data.sql file. You should import it to your database before running the test.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
