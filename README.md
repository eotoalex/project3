# Trekky

Trekky is a crime tracking app that identifies recent crime data and tracks patterns to better inform those that travel around the city.
___

## Technologies 
* Javascript
* NodeJS
* CSS
* Bootstrap
* React
* React-Router-Dom
* ExpressJS
* MongoDB
* Mongoose
* Axios
* Cheerio
* JSON Web Tokens
* Google Maps API
* New York Crime API
___

# Map Usage
> - To access the beta version of the app click on the [Trekky](https://evening-castle-24597.herokuapp.com/) link. Please allow time for Heroku to load, as it is hosting this beta application and requires a few seconds if openned for the first time.
>
> - Enable location services on your browser, which will appear as a notification prompting you to accept or decline. Accept the location finder to have your location rendered to the map. There after, you may have to refresh the page if the crime data does not render properly.
>
> - After registering and signing in, go to the map to see crime data in your area. 
>
> - Now you can see historic crime data that has occurred around you within this year. (10 markers should be rendering for now, as I test the database settings.)
>
> - Though, the tools around the map are none existent the map is interactive, and given the fact that is a Google Map API the user interface is no different from any google map you've used before. Additional documentation on google map interface can be found [here](https://support.google.com/maps/answer/144349?hl=en).

# NewsFeed Functionality
> - The newsfeed scrolls continuously unless you hover over it, in which case it will stop scrolling to the next story. You can now read the headline / summary without it scrolling away.
>
> - If you missed a story that scrolled by, you can click on the left arrow on the left side of the newsfeed container to go back one story. Continuous clicking will scroll backwards through the story headlines.
>
> - You can double click the headline and get a brief summary of the news story. You can click this summary area to get the full article.

# Crime Markers
> - The markers with the red slash over a shadowed figure is an actual crime location as cited by New York State Open Data records.
> - The pop up window works on mouseover and will soon indicate the information of the crime (currently debugging).

# Destination Bar
> - When an address is put into the destination input box, a route will indicate a safe route for the user, around the crime markers (currently debugging).
___

# Goals
* Fix all bugs!
* We will be inserting the crime data into a structured table that can be accessed in types as apposed to all crimes rendering to the map.
For example;
* The user can access which crime to generate on the map (murder, robbery, assault, etc.), in combination with other crimes and/or in isolation from other crimes.
* A description of the suspect will appear above the marker as an infowindow, along with time, date of crime and a description of the crime when the crime marker is clicked.
* The user can track trends of each crime in a given area of the city by clicking on a given area or indicating on the destination input area and pressing enter.
* The user can get access to schools graduation rates, hospitals ratings, tax rates, or average rent within a given area, but more importantly year over year crime for a given borough/area of the city.
* The user can have their data visualized on a graph.
