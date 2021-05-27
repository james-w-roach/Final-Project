const ClientError = require('./client-error');

function errorMiddleware(err, req, res, next) {
  if (err instanceof ClientError) {
    res.status(err.status).json({
      error: err.message
    });
  } else if (err.code === '23505') {
    res.status(500).json({
      error: 'Username already exists.'
    });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'An unexpected error occurred.'
    });
  }
}

module.exports = errorMiddleware;
