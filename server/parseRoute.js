export default function parseRoute(hashRoute) {
  if (hashRoute.startsWith('#itinerary/')) {
    const trip = hashRoute.split('/')[1];
    const route = hashRoute.split('/')[0];
    return [route, trip];
  } else {
    return hashRoute;
  }
}
