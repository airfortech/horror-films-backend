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

### Search for films:

**title**: film title

**sort_type**: ascending/descending

**sort_by**: title/release_date/vote_average/popularity

**page**: page number

**language**: pl/en/de/fr/other you have copied to your database

example: `http://localhost:3001/api/films/?title=Dracula&page=1&sort_type=descending&sort_by=release_date&language=en`

https://horror-films.airm.ct8.pl/en/films/6114-Bram-Stoker's-Dracula

```json
{
  "count": 4,
  "pages": 1,
  "page": 1,
  "films": [
    {
      "id": 119169,
      "original_title": "Mama Dracula",
      "title": "Mama Dracula",
      "overwiew": "A female vampire must bathe in the blood of virgins in order to stay alive. The trouble is that virgins are in short supply nowadays, and she is running into major problems in finding one.",
      "release_date": "1980-11-19",
      "popularity": 1.3,
      "vote_average": 2.7,
      "poster_path": "/gHDQ1f0gnaWB3G6q3h4GCJtHbSj.jpg",
      "backdrop_path": null
    },
    ...
  ]
}
```

<br>

### Get film details:

**id**: film id

**cast**: number of cast

**posters**: number of posters

**backdrops**: number of backdrops

**language**: pl/en/de/fr/other

example: `localhost:3001/api/films/6114?language=en&backdrops=2&posters=2&cast=5`

```json
{
  "id": "6114",
  "title": "Bram Stoker's Dracula",
  "original_title": "Bram Stoker's Dracula",
  "overview": "When Dracula leaves the captive Jonathan Harker and Transylvania for London in search of Mina Harker, the reincarnation of Dracula's long-dead wife Elisabeta, obsessed vampire hunter Dr. Van Helsing sets out to end the madness.",
  "overview_en": "When Dracula leaves the captive Jonathan Harker and Transylvania for London in search of Mina Harker, the reincarnation of Dracula's long-dead wife Elisabeta, obsessed vampire hunter Dr. Van Helsing sets out to end the madness.",
  "vote_average": 7.4,
  "vote_count": 4070,
  "popularity": 36.807,
  "release_date": "1992-11-13",
  "tagline": "The blood is life.",
  "budget": 40000000,
  "revenue": 215862692,
  "genres": [
    "Romance",
    "Horror"
  ],
  "runtime": 128,
  "poster_path": "/o5F6juFKJKEaK8nTd6Ilx5eWRH6.jpg",
  "video_url": "o-_IA-MY0mI",
  "backdrops": [
    "/1ZVsHrPyogvUMJEuuB9eCkHSwaR.jpg",
    "/qX24VUDbumNnqSqeknaLrrlEYbz.jpg"
  ],
  "posters": [
    "/o5F6juFKJKEaK8nTd6Ilx5eWRH6.jpg",
    "/scFDS0U5uYAjcVTyjNc7GmcZw1q.jpg",
    "/n39glC4GkBeCbwdenES8ZBodim8.jpg",
    "/ecuP4ZaIHawKmmIaXD5mS55UlhL.jpg",
    "/tEY7csvyp9yERNv3x7cZsLMlBxK.jpg",
    "/4UnKABH7E3ftGjEec15XkPLfVtX.jpg",
    "/ohavVPFeDHtid0uV5o6nqLRNcxq.jpg",
    "/bEYp5EcimOHUcQn311r80hCMtJl.jpg",
    "/5jkixIm1Tm2lRMkkZHW8Dr5envx.jpg",
    "/24tvqIQxSayFCmzmYucgX4ejhbJ.jpg"
  ],
  "cast": [
    {
      "id": 64,
      "name": "Gary Oldman",
      "original_name": "Gary Oldman",
      "character": "Dracula",
      "profile_path": "/2v9FVVBUrrkW2m3QOcYkuhq9A6o.jpg"
    },
    {
      "id": 1920,
      "name": "Winona Ryder",
      "original_name": "Winona Ryder",
      "character": "Mina Murray / Elisabeta",
      "profile_path": "/5yteOSY2lgGOgSWmRTlxqfY59MS.jpg"
    },
    {
      "id": 4173,
      "name": "Anthony Hopkins",
      "original_name": "Anthony Hopkins",
      "character": "Professor Abraham Van Helsing",
      "profile_path": "/9ukJS2QWTJ22HcwR1ktMmoJ6RSL.jpg"
    },
    {
      "id": 6384,
      "name": "Keanu Reeves",
      "original_name": "Keanu Reeves",
      "character": "Jonathan Harker",
      "profile_path": "/4D0PpNI0kmP58hgrwGC3wCjxhnm.jpg"
    },
    {
      "id": 20766,
      "name": "Richard E. Grant",
      "original_name": "Richard E. Grant",
      "character": "Dr. Jack Seward",
      "profile_path": "/pIwiAEX7LiOgnV7KehM3OVmuG1f.jpg"
    }
  ],
  "directors": [
    {
      "id": 1776,
      "name": "Francis Ford Coppola",
      "original_name": "Francis Ford Coppola",
      "profile_path": "/mGKkVp3l9cipPt10AqoQnwaPrfI.jpg"
    }
  ],
  "screenplay": [
    {
      "id": 10295,
      "name": "James V. Hart",
      "original_name": "James V. Hart",
      "profile_path": null
    }
  ]
}
```