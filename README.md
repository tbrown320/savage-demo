# Savage Demo

A first Express + MongoDB CRUD app — a message board for 21 Savage fans.

![21 Savage](public/21savage.jpg)

## What it does

- **List messages** — every message in the database, shown on the home page.
- **Add a message** — name and message, saved with a thumbs-up count starting at 0 (`POST /messages`).
- **Thumbs-up** — adds 1 to a message's count (`PUT /messages`).
- **Thumbs-down** — subtracts 1 from the same count (`PUT /down`). There is no separate thumbs-down count — the stored `thumbDown` field is never used.
- **Delete a message** — trash icon on each message (`DELETE /messages`).

There is no login or signup in this app — anyone who opens the page can post, vote, and delete.

## Tech stack

- Node.js + Express 4
- EJS templates
- MongoDB native driver (no Mongoose, no Passport)
- body-parser

## Getting started

1. Clone the repo and install dependencies:

   ```bash
   git clone https://github.com/tbrown320/savage-demo.git
   cd savage-demo
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

   (`npm run savage` starts it with nodemon instead, so the server restarts when you save a file.)

3. Open http://localhost:3000, add a message, and try the thumbs-up, thumbs-down, and trash icons.

**Database:** `server.js` has a hardcoded MongoDB connection string for the shared 100Devs demo cluster (`demo` database, username and password both `demo`, collection `messages`). It works as-is for trying the demo, but for your own data, replace that URL with your own connection string — ideally read from an environment variable instead of hardcoding it. This project has no dotenv setup.

## Project structure

```
server.js              - app entry point and all routes (port 3000)
views/
  index.ejs            - the whole app: message list + add-a-message form
public/
  main.js              - message interactions (thumbs up/down, delete)
  styles.css           - styling
  font-awesome.min.css - icons
  fonts/               - Font Awesome fonts
  21savage.jpg         - image referenced in this README
  favicon.ico
```

---

Thay Brown — thaybrown22@gmail.com · https://thaythecoder.netlify.app · https://github.com/tbrown320 · https://www.linkedin.com/in/thaybrown
