# Trekky

Trekky is a crime app that identifies historic crime data in relation to the users location.  We will successfully merge news reporting and live user commentating, to bridge the gap between between citizens and law enforcement and build strong, safe communities. 
___

# Contents
- [Quick Start up Guide](#Quick-Start-up-Guide)
- [Beta Release Notes](#Beta-Release-Notes)
- [Our Philosophy](#Our-Philosophy)
- [What Motivated This APP](#What-Motivated-This-APP)
- [Where does our data come from?](#Where-does-our-data-come-from?)
- [The User Icon](#The-User-Icon)
- [Map Usage](#Map-Usage)
- [News Feed](#NewsFeed-Functionality)
- [Crime Markers](#Crime-Markers)
- [Route](#Route)
- [Comment](#Comment)
- [Article Review](#Article-Review)
- [Technologies Used](#Technologies-Used)
- [Goals Looking Forward...](#Goals-Looking-Forward)


# Quick Start up Guide
> Here is video [demo](https://www.youtube.com/watch?v=J5hwEFtVCnU) to get your feet wet.
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
> Earlier, the user's GPS was used to render the initial blue and red marker, which indicates the users position. Then, the users GPS began to act strange when moving the wifi was changed. Until this is resolved, the GPS is given a default location. 


# Our Philosophy

**Don't just find your way, know your way**

# What Motivated This APP
> It is important to have historical and real-time information to make informed decisions about what to do next. Having historical information is not current enough and have current information is not logical unless processed in respect to the context of the times in which we live. This is where Trekky takes both, merges them into one, and allows communities to come together to keep their communities safe.
>
>Hopefully with additional support from law enforcement agencies, we can see Trekky building a community that extends past just a simple mapping application for data. We can see users commenting on news reports and articles, commentating on where they are as they ping their locations, identifying criminal activity, taking video or images that might help law enforcement investigations, reference data from quarterly arrests and hopefully, police officers can assist people based on the urgency of these posts and create a rating system that incentivizes police officers based on the positive comments and community badges they can earn.
>
> Trekky was truly a marvel to think up, but it needs you to breathe, and it needs you to see. As I build out different aspects of this app, I hope you will all join me in testing various functionality. This beta version is far from finished, but we will get there.

___

# Where does our data come from?
> Our data is collected from NYC OpenData, primarily NYPD Arrest Data (Year to Date). There are about 600,000+ incidents, but for the sake of testing and building new functionality and routing, only 1000 incidents are being used and rendered to this beta version of Trekky.

___

# The User Icon
> - Be aware that on loading the map, the user icon should appear as a blue circular figure with a red dot in the middle. If it does not please refresh the page.
>
> - For this beta version, the GPS will not pick up your current location but is given a default location as the GPS is being debugged for accurate geolocation rendering.
___

# Map Usage
> - To access the beta version of the app click on this [Trekky](https://evening-castle-24597.herokuapp.com/) link. Please allow time for Heroku to load, as it is hosting this beta application and requires a few seconds to load if openned for the first time.
>
> - Enable location services on your browser, which will appear as a notification prompting you to accept or decline. Accept the location finder to have your location rendered to the map. 
>
> - After registering and signing in, go to the map to see crime data in your area or crime near you. 
>
> - This is a Google Map API, so the user interface is no different from any google map you've used before. Additional documentation on the google map interface can be found [here](https://support.google.com/maps/answer/144349?hl=en).
>
> - The buttons on the right test functionality for identifying types of crimes like Felonys, Misdemeanors, Violations. Below the these types of crime buttons we have the all trains, trains near me and crimes near me buttons as well.
>
> ## Resources Near Me Buttons
> To reference to Type of Crime Buttons please click [here](#Type-of-Crime-Buttons).
>
> - **Train button**  renders all trains in the New York City area as a train icon in each respective location where they are located. When clicked, each icon will display an information window about the trains that pass there, the station name, the address of the station, and (Coming Soon...) the next train to arrive at that station.
>
> - **Train near me button** renders all trains near your current location as a train icon, accompanied by a blue line connecting the user location icon to the train icon on the map. When any of these icons are clicked, an infowindow will appear above the icon stating: which trains pass there, the name of the station, an infowindow identifying how far each train is from your location, and (Coming Soon...) when the next train will be arriving at that station.
>
> - **Crime near me button** renders all crimes near your current location as a crime icon with a red slash over a shadowed figure, accompanied by a red line connecting the user location icon with the crime icon on the map. Upon clicking on the crime icon, you will get a host of information in an infowindow above the icon stating: the crime committed, the distance the user current is from the crime, the level of offense the crime falls under, whether the assailant is male of female. 

# NewsFeed Functionality

> - The NewsFeed is the teal, rectangular box centered at the top of the map but just below the navigation bar.
>
> - The NewsFeed scrolls continuously to the next article headline until the mouse pointer hovers over it. When the mouse-pointer is hovering over the NewsFeed box, the feed will stop scrolling to the next headline.
>
> - If you missed a story that scrolled by, you can click on the left arrow on the left side of the NewsFeed box to go back one headline. Continuously clicking either the left or right arrow will scroll the headlines in their respective directions.
>
> - You can double click the headline and an additional box area with a brief summary of the news story will drop down from the headline box. You can click on this summary area to get the full article.

# Crime Markers

> ## Type of Crime Buttons
> - **Felony button** Renders all felony level arrests, by location, as an icon with a red slash over a shadowed figure. When any of these icons are clicked, an infowindow will appear above the icon stating: the sex of assailant, their race, the crime committed, the level of the offence committed and the date of arrest. 
>
> - **Misdemeanor button** Renders all misdemeanor level arrests, by location, as an icon with a red slash over a shadowed figure. When any of these icons are clicked, an infowindow will appear above the icon stating: the sex of assailant, their race, the crime committed, the level of the offence committed and the date of arrest. 
>
> - **Violation button** Renders all violation level arrests, by location, as an icon with a red slash over a shadowed figure. When any of these icons are clicked, an infowindow will appear above the icon stating: the sex of assailant, their race, the crime committed, the level of the offence committed and the date of arrest. 
>
> To reference the Resources Near Me Buttons please click [here](#Resources-Near-Me-Buttons)
>
> - These markers are actual crime locations as cited by New York State OpenData [NYPD Arrest Data](https://data.cityofnewyork.us/Public-Safety/NYPD-Arrest-Data-Year-to-Date-/uip8-fykc).
>
> - The [information window](https://developers.google.com/maps/documentation/javascript/infowindows) for each marker appears above the icon after clicking on a crime marker. These information windows will give additional [information](#Type-of-Crime-Buttons) of the crime committed in that area. To close these window just click on the marker or another marker and the infowindow will close.

___


# Route
> - When clicked, an address can be typed into the destination input box. 
> - Thereafter, a route will indicate a safe path for the user in the form of a blue polyline.
> - **Coming Soon...** The user will be given options of routes to choose from based on the crime report of a given path. 
> - **Coming Soon...** The crime locations along the path to the user's destination will render crime icons upon user clicking to view the crime report for a given route. 

# Comment
> - **Currently in development** The comment feature will allow users to ping locations and comment on a given area.

# Article Review
> - **Currently in development** This will allow the user to review and comment on articles appear in the NewsFeed.
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
* [NYPD Arrest Data](https://data.cityofnewyork.us/Public-Safety/NYPD-Arrest-Data-Year-to-Date-/uip8-fykc)

# Goals Looking Forward...
> Crime markers visualized along the path leading to the users destination, with a crime report appearing at the bottom of the map. 
>
> Alternate routes recommended to the user, as a result of the crime report's calculation of crimes in proximity to the routes generated.
> 
> Adding more API's that indicate community information like: school violence, school graduation rates, stabbings, murders, real estate prices, school graduation rates, and hospital ratings would be an ideal set of information to have rendered on a chart and the map as well. It would be ideal to have these rendered on a graph all at once to measure trends if any exist.
>
> Eventually becoming a visualization tool for law enforcement agencies and citizens alike, utilizing NCIC at full exposure to law enforcement and low for citizens. The goal is to bridge the gap between law enforcement and the citizens they protect by allowing a free flow of information and dialogue that covers community issues.


