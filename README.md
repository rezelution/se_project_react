# WTWR (What to Wear?)

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

## Key Functions

Based on user location API grabs that information which is based on Longitude and Latitude. It them provides specific data(temp, condition, city) that then get's incorprated into the UX. This shows the user their current temperature and location. There is a quick look weather card which stands out shoing the temp and a visual representation of the current weather condition. Based on your location and condition the recommednded cloth to wear will be shown. There is a button which in a future release will allow the user to add clothing, name the cloth, add an image via url of the cloth and provide it a value of hot, warm or cold. The user will also be able to edit their name and avatar.  

## Techncology Used

This was built in react + vite, html, css. There were several components that were built for different areas and all imported into the APP. There is a GET funciton which is grabbing the API from Open Weather. The needed data that is being used is identified and added. React is using "usestate" which allows you to store and update values in your app. React is also using "UseEffect" which perform actions based on other actions being performed.  

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)
- [Video Walkthrough] (https://www.loom.com/share/3ee1179925f14c8f8e5e055da111a4b5?sid=111f8303-5663-4b08-a43e-c2c6e4a6b44d)
