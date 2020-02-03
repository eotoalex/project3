# Trekky

Trekky is a crime app that identifies historic crime data in relation to the users location.  
___

# Contents
- [Quick Start up Guide](#Quick-Start-up-Guide)
- [Beta Release Notes](#Beta-Release-Notes)
- [Our Philosophy](#Our-Philosophy)
- [Map Usage](#Map-Usage)
- [News Feed](#NewsFeed-Functionality)
- [Crime Markers](#Crime-Markers)
- [Route](#Route)
- [Comment](#Comment)
- [Article Review](#Article-Review)
- [Goals Looking Forward...](#Goals-Looking-Forward)
- [Technologies Used](#Technologies-Used)
- [Where does our data come from?](#Where-does-our-data-come-from?)


# Quick Start up Guide
> Here is video [demo]() to get your feet wet.
>
> If you want to get started on your own click [here](https://evening-castle-24597.herokuapp.com/) to visit the beta version of the app.
> If it's taking extra long to load, please be patient as Heroku wakes up.




# Beta Release Notes
**New Features**
> The Routes link now renders a user route to their destination when a landmark or address is put into the modal that appears at the top of the Route page when clicked. Please reference the [Route](#Route) documentation for more information. 
>
> A checkered flag icon will now appear at the users routed location. Please reference the [Route](#Route) documentation for more information.
>
> A reference to the google object made it possible to get every instance of the polyline latitude and longitude routes. This is crucial for recommending routes to users based on the amount of criminal activity in a given route.

**Fixed Bugs**
> Converting the users input into a valid latitude and longitude to connect to a polyline seemed almost impossible, especially when the polylines Google Maps API offered did not give me the exact latitudes and longitudes of the routes being referenced. 
>
> The Routes linked in the navigation bar would identify a routed path but no marker.

**Current Issues**
> The GPS does not render the users exact location on the map when the map link is clicked, unless a latitude and longitude in manually put into the map position attribute within its component Map [example]().


# Our Philosophy
**Don't just find your way, know your way ;)**


# Where does our data come from?
> Our data is collected from NYC OpenData, primarily NYPD Arrest Data (Year to Date). There are about 600,000+ incidents, but for the sake of testing functionality and routing, only 1000 incidents are being used and rendered to the map.

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
> - Currently in development. This will allow the user to review and comment on articles appear in the NewsFeed.
> - Users will also be able to ping the precise location of the articles coverage and contribute to forum on a given article or issue developed into a new forum by the commentators.


___

## Technologies Used
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

# Goals Looking Forward...
> Crime markers visualized along the path leading to the users destination, with a crime report appearing at the bottom of the map. 
> Alternate routes recommended to the user, as a result of the crime report's calculation of crimes in proximity to the routes generated. 
> Adding more API's that indicate community information like: school violence, school graduation rates, stabbings, murders, real estate prices, school graduation rates, and hospital ratings would be an ideal set of information to have rendered on a chart and the map as well. It would be ideal to have these rendered on a graph all at once to measure trends if any exist.
> Eventually becoming a visualization tool for law enforcement agencies and citizens alike, utilizing NCIC at full exposure to law enforcement and low for citizens. The goal is to bridge the gap between law enforcement and the citizens they protect by allowing a free flow of information and dialogue along community issues.
