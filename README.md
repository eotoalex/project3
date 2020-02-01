# Trekky

Trekky is a crime location app that identifies historic crime data and tracks patterns of incidents, to better inform those that travel around the city. Quarterly arrest records from the NYPD Arrests Data API, are rendered to the Google Maps API, as well as the users location, with additional information on the arrest when the marker is clicked.Users are routed to the nearest subway or any given location they put into the destination bar, with rendered crime that occurred near or around the polyline that forms leading to the destination marker on the map. Trekky is designed to inform user travel and safe routing around the city, with an eventual lead into practical data visualization for law enforcement agencies’ National Crime Information Center database.
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
> - Though, the tools around the map are not visible the map is interactive, and given the fact that it is a Google Map API the user interface is no different from any google map you've used before. Additional documentation on the google map interface can be found [here](https://support.google.com/maps/answer/144349?hl=en).
>
>The buttons on the right test functionality for identifying Felonys, Misdemeanors, Violations throughout the city that are currently stored in the database (1000 crime records).
>The train button has stored information on every train location in the city. 
>The train near me identifies trains near your current location. Upon clicking the train icon on the map, an infowindow will identify how far each train is, which trains pass there, the name of the station, etc.
>
>The crime near me button identifies the nearest crimes to your current location. Upon clicking on the crime icon, you will get a host of information in the infowindow: the distance, the crime committed, etc. 

# NewsFeed Functionality
> - The newsfeed scrolls continuously unless you hover over it, in which case it will stop scrolling to the next story. You can now read the headline / summary without it scrolling away.
>
> - If you missed a story that scrolled by, you can click on the left arrow on the left side of the newsfeed container to go back one story. Continuous clicking will scroll backwards through the story headlines.
>
> - You can double click the headline and get a brief summary of the news story. You can click this summary area to get the full article.

# Crime Markers
> - The markers with the red slash over a shadowed figure is an actual crime location as cited by New York State Open Data records.
> - The pop up window for each marker works after clicking on a crime location. These informatin windows will give additional information of the crime committed in that area.
> - The information include, sex, race, crime committed, leve of offence and date of arrest.

# Route
> - When clicked, an address can be typed into the destination input box. 
> - Thereafter, a route will indicate a safe route for the user, in the form of a blue polyline.
> - Coming Soon (User gets to choose their route based on the crime report of a given route and crime locations render upon user request and so does a crime report for a given location or route within a 3 mile radius.)

# Comment
> - Currently in development. The comment feature will allow users to ping locations and comment on a given area.

# Article Review
> - Currently in development. This will allow the user to review and comment on articles that are written on a given area.
> - Users will also be able to ping the precise location of the articles coverage.


___

# Goals
* Fix all bugs!
* Have crime markers visualize along the path leading to the users destination. A crime report will be put into the mix as well to give the users an understanding of the path they will be taking.
* Users will be given alternate routes pending the results of the crime report generated from the user destination input.
* The user can track trends of each crime in a given area of the city by clicking on a given area or indicating on the destination input area and pressing enter.
* The user can get access to schools graduation rates, hospitals ratings, tax rates, or average rent within a given area, but more importantly year over year crime for a given borough/area of the city.
* The user can have their data visualized on a graph.
