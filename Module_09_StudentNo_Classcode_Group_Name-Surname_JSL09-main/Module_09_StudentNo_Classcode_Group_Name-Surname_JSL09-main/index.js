try {
    // Fetch a random landscape nature photo from the Unsplash API
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature");
    // Convert the response to JSON format
    const data = await res.json();
    // Set the background image of the document body to the fetched image
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    // Display the name of the photographer
    document.getElementById("author").textContent = `By: ${data.user.name}`;
} catch (err) {
    // If an error occurs, set a fallback background image and photographer name
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
    document.getElementById("author").textContent = `By: Dodi Achmad`;
}

/**
 * Challenge: Update the code below and in the 
 * getCurrentLocation callback to use try...catch
 */

try {
    // Fetch data about Dogecoin from the CoinGecko API
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin");
    // If the response is not successful, throw an error
    if (!res.ok) {
        throw Error("Something went wrong");
    }
    // Convert the response to JSON format
    const data = await res.json();
    // Display cryptocurrency information
    document.getElementById("crypto-top").innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>
    `;
    document.getElementById("crypto").innerHTML += `
        <p>🎯: $${data.market_data.current_price.usd}</p>
        <p>👆: $${data.market_data.high_24h.usd}</p>
        <p>👇: $${data.market_data.low_24h.usd}</p>
    `;
} catch (err) {
    // Log the error to the console if an error occurs
    console.error(err);
}

// Function to get and display the current time
function getCurrentTime() {
    const date = new Date();
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" });
}

// Call getCurrentTime every second to update the displayed time
setInterval(getCurrentTime, 1000);

// Get the user's current location using the geolocation API
navigator.geolocation.getCurrentPosition(async position => {
    try {
        // Fetch weather data from the OpenWeatherMap API based on the user's coordinates
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`);
        // If the response is not successful, throw an error
        if (!res.ok) {
            throw Error("Weather data not available");
        }
        // Convert the response to JSON format
        const data = await res.json();
        // Construct the URL for the weather icon
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        // Display weather information
        document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            <p class="weather-city">${data.name}</p>
        `;
    } catch (err) {
        // Log the error to the console if an error occurs
        console.error(err);
    }
});
