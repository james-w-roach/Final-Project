require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');

const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const jsonMiddleware = express.json();

const app = express();

app.use(staticMiddleware);

app.use(jsonMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

app.post('/planner/itineraries', (req, res, next) => {
  const { tripName, locations } = req.body;
  if (!tripName) {
    throw new ClientError(400, 'please enter an itinerary name');
  }
  const sql = `
     insert into "itineraries" ("tripName", "locations")
          values ($1, $2)
       returning "tripName", "locations"
  `;
  const params = [tripName, locations];
  db.query(sql, params)
    .then(result => {
      const [trip] = result.rows;
      res.status(201).json(trip);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);
