# TriviaChallenge

This project was generated using [Nx](https://nx.dev).

## Setup

Install the latest node.js LTS (version 14) or [according to .nvmrc](.nvmrc).

Then install NPM dependencies:
`npm install`

## Folder structure

This repo is organized as Nx monorepo.

`apps/ui/` contains the user interface code written in React.

`apps/api/` contains the REST API code written in Express.

`package.json` at the root of the repo is common to all `apps`.

## Start Development server

Please ensure that you are at the root of the repo, before running the following commands.

Run `npm start api` to start the API server. Navigate to http://localhost:3333/api.

Run `npm start ui` for a dev server for the UI. Navigate to http://localhost:4200/. It is already configured to proxy `/api` requests to

The apps will automatically reload if you change any of the source files.

## Build

Run `npm run build app-name` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
