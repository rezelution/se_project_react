# WTWR (What to Wear?)

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

## Key Functions

This application utilizes a location-based API to fetch real-time weather data based on the user's geographic coordinates (longitude and latitude). The data retrieved includes the current temperature, weather condition, and city information, which is seamlessly integrated into the user interface (UI).

**Real-Time Weather Information:** Displays the user's current temperature and location, providing an accurate and up-to-date weather overview.

**Weather Overview Card:** A prominent, easy-to-read weather card highlights the temperature and visually represents the current weather condition.

**Clothing Recommendations:** Based on the current weather conditions, the app provides tailored clothing suggestions for the user.

**Clothing Management (Future Release):** In an upcoming update, users will have the ability to:

* Add custom clothing items

* Name each clothing item

* Upload an image (via URL) of the clothing

* Categorize the clothing based on temperature suitability (Hot, Warm, Cold)

* Users will be able to personalize their profiles by editing their name and avatar.  

## Technology Used

This was built in react + vite, html, css. There were several components that were built for different areas and all imported into the APP. There is a GET funciton which is grabbing the API from Open Weather. The needed data that is being used is identified and added. React is using "usestate" which allows you to store and update values in your app. React is also using "UseEffect" which perform actions based on other actions being performed.  


## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)
- [Video Walkthrough](https://www.loom.com/share/3ee1179925f14c8f8e5e055da111a4b5?sid=111f8303-5663-4b08-a43e-c2c6e4a6b44d)


## Images

![Overall_look](https://github.com/user-attachments/assets/f2baf760-dd16-4c4e-a30b-a32b8a45d260)
 _This is showing the overall look of the APP._

![Add_cloth_preview](https://github.com/user-attachments/assets/96770195-0121-4ecb-aed5-0d4acb8a6b32)<br>
_The Modal that will open when you select "Add Clothes"._

![Image_preview](https://github.com/user-attachments/assets/620b1c5e-e6a0-4a94-b78b-fec35bbe8b36)<br>
_The Modal that will open to give you a larger preview of the recommended clothes._


