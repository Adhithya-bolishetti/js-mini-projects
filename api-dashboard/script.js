const WEATHER_API_KEY = CONFIG.WEATHER_API_KEY;

function getWeather() {
    const city = document.getElementById("cityInput").value;
    const weatherResult = document.getElementById("weatherResult");

    if(!city) {
        weatherResult.textContent = "Please enter a valid city"
        return;
    }

    weatherResult.textContent = "Loading...";

    fetch(`https://api.openweather.org/data/2.5/weather?q=${city}&appid-${WEATHER_API_KEY}&units=metric`)
        .then(res => {
            if(!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then(data => {
            weatherResult.innerHTML = `
            Temp : ${data.main.temp} °C <br>
            Weather : ${data.weather[0].description}`;
        })
        .catch (err => {
            weatherResult.textContent = err.message;
        });
}

function getGitHub() {
    const username = document.getElementById("githubInput").value;
    const result = document.getElementById("githubResult");

    if(!username) {
        result.textContent = "Please enter a valid username";
        return;
    }

    result.textContent = "Loading...";

    fetch(`https://api.github.com/users/${username}`)
        .then(res => {
            if(!res.ok) throw new Error("User not found");
            return res.json();
        })
        .then(user => {
            result.innerHTML = `
            <img src="${user.avatar_url}">
            <p><strong>${user.name || user.login}</strong></p>
            <p>Repos : ${user.public_repos}</p>
            <p>Followers : ${user.followers}</p>
            <a href=${user.html_url}" target="blank">View Profile</a>`;
        })
        .catch(err => {
            result.textContent = err.message;
        });
}