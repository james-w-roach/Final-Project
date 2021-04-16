export default function parseRoute(hashRoute) {
  if (hashRoute.startsWith('#location?')) {
    hashRoute = hashRoute.replace('#location?', '');
    const trip = hashRoute.split('/')[0];
    const location = hashRoute.split('/')[1];
    return { trip, location };
  } else {
    return hashRoute;
  }
}
