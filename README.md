# WTWR (What to Wear?)

## About the Project

The idea of the application is pretty simple – we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

Users can register on the site and upload their favorite clothing items. These items will be visible to other users based on the current weather conditions in their area. Registered users can like or dislike clothing items, creating an interactive and personalized wardrobe-sharing experience.

## Key Features

This application utilizes a location-based API to fetch real-time weather data based on the user's geographic coordinates (longitude and latitude). The data retrieved includes the current temperature, weather condition, and city information, which is seamlessly integrated into the user interface (UI).

### ☁️ Real-Time Weather Information

Displays the user's current temperature and location, providing an accurate and up-to-date weather overview.

### 📋 Weather Overview Card

A prominent, easy-to-read weather card highlights the temperature and visually represents the current weather condition.

### 👕 Clothing Recommendations

Based on the current weather conditions, the app provides tailored clothing suggestions from user-submitted wardrobe items.

### 👤 User Registration and Uploads

- New users can register and log in using a secure form.
- Upon registration, users can upload their favorite clothing items, categorized by weather suitability (hot, warm, cold).
- Each clothing item includes a name, an image URL, and a weather category.

### ❤️ Clothing Interaction

- Users can view weather-appropriate clothing uploaded by others.
- Registered users can like or dislike clothing items.
- Items display the total number of likes and are styled based on user interaction (active if liked).
- Users can delete only their own clothing uploads.

### 👥 User Context

- Uses React Context (`CurrentUserContext`) to manage and distribute user information across components.
- Conditional rendering of elements like like/delete buttons based on current user.

### 🧑‍🎨 Profile Management

- Users can update their profile name and avatar through a modal form.
- If no avatar is uploaded, a placeholder with the user's initial is displayed.

## Technology Used

- React (with Vite)
- HTML & CSS
- OpenWeather API
- React Hooks: `useState`, `useEffect`
- React Context API
- JWT for authentication
- Fetch API for backend communication

## Development & Integration Notes

- Frontend and backend should run on different ports (e.g., 3000 and 3001)
- JWT tokens are stored in `localStorage` and used to authenticate protected requests
- Protected frontend routes and UI states reflect the user's auth status

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)
- [Video Walkthrough](https://www.loom.com/share/3ee1179925f14c8f8e5e055da111a4b5?sid=111f8303-5663-4b08-a43e-c2c6e4a6b44d)
- [Backend Repository](https://github.com/rezelution/se_project_express)
- [Website Domain](https://www.heatcheck.blinklab.com)

## Images

![Overall_look](https://github.com/user-attachments/assets/f2baf760-dd16-4c4e-a30b-a32b8a45d260)
_This is showing the overall look of the APP._

![Add_cloth_preview](https://github.com/user-attachments/assets/96770195-0121-4ecb-aed5-0d4acb8a6b32)<br>
_The Modal that will open when you select "Add Clothes"._

![Image_preview](https://github.com/user-attachments/assets/620b1c5e-e6a0-4a94-b78b-fec35bbe8b36)<br>
_The Modal that will open to give you a larger preview of the recommended clothes._
