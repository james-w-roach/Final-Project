require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

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

app.get('/api/travelPlanner/itineraries', (req, res, next) => {
  const sql = `
    select *
      from "itineraries"
  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/travelPlanner/itineraries/users/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  const sql = `
    select *
      from "itineraries"
     where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/travelPlanner/itineraries/:tripId', (req, res, next) => {
  const tripId = parseInt(req.params.tripId, 10);
  const sql = `
    select *
      from "itineraries"
     where "tripId" = $1;
  `;
  const params = [tripId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/travelPlanner/itineraries', (req, res, next) => {
  const { tripName, locations } = req.body.trip;
  const { userId } = req.body;
  const locationsJSON = JSON.stringify(locations);
  if (!tripName) {
    throw new ClientError(400, 'please enter an itinerary name');
  } else if (!locations) {
    throw new ClientError(400, 'please add one or more locations');
  }
  const sql = `
     insert into "itineraries" ("tripName", "locations", "userId")
          values ($1, $2, $3)
       returning "tripName", "locations", "userId";
  `;
  const params = [tripName, locationsJSON, userId];
  db.query(sql, params)
    .then(result => {
      const [trip] = result.rows;
      res.status(201).json(trip);
    })
    .catch(err => next(err));
});

app.put('/api/travelPlanner/itineraries/:tripId', (req, res, next) => {
  const locationsJSON = JSON.stringify(req.body);
  const tripId = parseInt(req.params.tripId, 10);
  const sql = `
     update "itineraries"
        set "locations" = $1
      where "tripId" = $2
    returning "locations";
  `;
  const params = [locationsJSON, tripId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.delete('/api/travelPlanner/itineraries/:tripId', (req, res, next) => {
  const tripId = parseInt(req.params.tripId, 10);
  const sql = `
    delete from "itineraries"
          where "tripId" = $1
      returning *;
  `;
  const params = [tripId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/travelPlanner/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username", "createdAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/travelPlanner/auth/login', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);
