# Horror Films Backend v1.0.0

The idea of making this backend was lack of https://api.themoviedb.org/ search options, fe. search by title of specyfic films genre.
Using this backend you can copy specyfic themoviedb entries to your own mongo database and then use search api in your project.

<br>

## Horror Films Frontend Resources

**Github:** https://github.com/airfortech/horror-films-frontend

**Live:** https://horror-films.airm.ct8.pl/

<br>

## Tech Stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

<br>

## Additional Main Packages

cli-progress
https://www.npmjs.com/package/cli-progress

mongoose
https://www.npmjs.com/package/mongoose

<br>

## Project Structure
    app
    │   config.js
    │   .env
    │   .env.example
    ├───controllers
    │   └───api
    ├───db
    │   ├───data
    │   │       films.json
    │   ├───models
    │   └───tools
    ├───helpers
    └───routes

<br>

## Install Packages

    npm install

<br>

## Configure Project

`/app/.env` file
- rename `.env.example` file to `.env`,
- get API key from https://www.themoviedb.org/documentation/api, creating an account and provide it in  `.env` file
- provide your mongo database url in `.env` file

`/app/config.js` file
- `frontEndHost: "http://localhost:3000"` - url for cors
- `resultsPerPage: 12` - results per page provided by API
- `languagesToFetch: ["en", "pl"]` - you can specify in array films languages you want to store in your database
- `yearFrom: 2000` - year you start gathering films from
- ` yearTo: 2022` - year you end gathering films
- `genre: 27` - films genre you want to store in database (more in tools section)

<br>

## Tools

Tests your db connection:

    npm run test-db

Gets ID of genres you can provide in `/app/config.js` file:

    npm get-genres

![image](/res/ConEmu64_wlpSNKiFgN.png)

Tests your db connection:

    npm run test-db

Store entries in `/app/db/data/films.json`:

    npm run create-json

Store entries in your database:

    npm run create-db

![image](/res/ConEmu64_sCiObxyyWA.gif)

After creating database you can start API:

    npm start

<br>

## API Requests

### Search

/api/films/?title=

Dracula&page=1&sort_type=descending&sort_by=release_date&language=en