# Voyager

Voyager is a travel planner that lets users create and edit itineraries. Users can search for locations using an interactive map and add them to their itinerary. Each location they add has a dedicated page where users can view the location on a map and add location-specific points of interest. They can either search for a specific place to go, or they can use the 'Explore' button to find recommended places near that location. Each itinerary, location, and point of interest the user creates is fully editable. Voyager uses the [Mapbox JavaScript API](https://docs.mapbox.com/mapbox-gl-js/api/) to provide the user with interactive maps and the [Foursquare Places API](https://developer.foursquare.com/docs/places-api/) to provide them with points of interest data.

## Demo

The site can be accessed using this link: http://voyager-application.herokuapp.com/

## Features
- User can create an itinerary
- User can search for locations from an interactive map and add them to their itinerary
- User can view an itinerary page containing the name of the trip and each added location
- User can view a location page containing a map and added points of interest
- User can search for points of interest near a location
- User can find recommended points of interest using the 'Explore' button
- User can add points of interest to their itinerary
- User can view a list of created itineraries
- User can delete points of interest
- User can remove locations from their itinerary
- User can delete itineraries

## Technologies Used

- React.js
- Express.js
- Node.js
- PostgreSQL
- HTML5
- JSX
- CSS3
- JavaScript
- npm
- Adobe XD
- Adobe Photoshop
- [Mapbox JavaScript API](https://docs.mapbox.com/mapbox-gl-js/api/)
- [Foursquare Places API](https://developer.foursquare.com/docs/places-api/)

## Screenshots

<img width="1029" alt="Voyager_Front_Page" src="https://user-images.githubusercontent.com/76799878/120382903-102cdf00-c2d9-11eb-8ebb-bf74a9dbec2a.png">
<img width="1029" alt="Voyager_Sign_In" src="https://user-images.githubusercontent.com/76799878/120382911-128f3900-c2d9-11eb-950f-b89ade1d37ae.png">
<img width="1029" alt="Voyager_Create" src="https://user-images.githubusercontent.com/76799878/120382926-16bb5680-c2d9-11eb-9e54-3cd78de7e6fb.png">
<img width="1029" alt="Voyager_Trip_Page" src="https://user-images.githubusercontent.com/76799878/120382957-2175eb80-c2d9-11eb-884d-ef430a1b77c3.png">
<img width="1029" alt="Voyager_Location_Page" src="https://user-images.githubusercontent.com/76799878/120382969-25097280-c2d9-11eb-85a5-c2d31674a306.png">
<img width="1029" alt="Voyager_Add_POI" src="https://user-images.githubusercontent.com/76799878/120382978-28046300-c2d9-11eb-9c8a-7d9b1edb5fd3.png">
<img width="1029" alt="Voyager_Delete_Location" src="https://user-images.githubusercontent.com/76799878/120383002-2dfa4400-c2d9-11eb-9b62-63726cd0e6f5.png">
<img width="1029" alt="Voyager_Itineraries_List" src="https://user-images.githubusercontent.com/76799878/120383015-318dcb00-c2d9-11eb-83ef-0e6c20f46d5c.png">


## How to Run Voyager on Your Computer

Requirements:
- A development environment with node.js
- Code editor (Virtual Studio)

To run Voyager on you machine follow these steps:
1. To access the Mapbox API and Foursquare API, you will need an API key for both.
2. Go to these sites to create an account and obtain both keys: [Mapbox JavaScript API](https://docs.mapbox.com/mapbox-gl-js/api/), [Foursquare Places API](https://developer.foursquare.com/docs/places-api/).
3. Once you have the API keys, clone the Voyager repo onto your computer or download the files directly.
4. Navigate to the root of the Voyager directory in your dev environment.
5. Use the 'npm install' command in your dev environment to install all dependencies and devDependencies.
6. Open the Voyager directory in your code editor and navigate to the .env file.
7. Assign your API keys to their respective variables.
8. In your dev environment run the following command to start the PostgreSQL server: sudo service postgresql start
9. This command will stop the server when needed: sudo service postgresql start
10. In the root directory of Voyager, enter the following command: npm run dev
11. Open localhost:3000 in your browser and you should be good to go!
