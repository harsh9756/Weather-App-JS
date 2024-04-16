const loading = document.getElementById("loading")
loading.style.display = 'none'
const getWeather = async (e) => {
    e.preventDefault()
    const city = document.getElementById("city").value
    const temp = document.getElementById("temp")
    const err = document.getElementById("err")
    const image = document.getElementById("image")
    const wind = document.getElementById("wind")
    const minTemp = document.getElementById("min-temp")
    const maxTemp = document.getElementById("max-temp")
    const humidity = document.getElementById("humidity")
    const cloudPct = document.getElementById("cloud_pct")

    image.src = ''
    wind.innerHTML = ''
    temp.innerHTML=''
    minTemp.innerHTML = ''
    maxTemp.innerHTML = ''
    humidity.innerHTML = ''
    cloudPct.innerHTML = ''
    err.innerHTML = ""
    loading.style.display = 'block'
    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e157dcc752msh0b68830134dc4d2p1994e7jsn0f9368692e1c',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (!result.error) {
            loading.style.display = "none"
            if (result.cloud_pct < 10) {
                image.src = "images/clear.png"
            }
            if (result.cloud_pct < 30 && result.cloud_pct > 10) {
                image.src = "images/clouds.png"
            }
            if (result.cloud_pct < 50 && result.cloud_pct > 30) {
                image.src = "images/drizzle.png"
            }
            if (result.cloud_pct < 70 && result.cloud_pct > 50) {
                image.src = "images/mist.png"
            }
            if (result.cloud_pct > 70) {
                image.src = "images/rain.png"
            }
            temp.innerHTML = `${result.temp} °C`
            minTemp.innerHTML = `<p>Min: </p>${result.min_temp} °C`
            maxTemp.innerHTML = `<p>Max: </p>${result.max_temp} °C`
            humidity.innerHTML = `<p>Humidity: </p>${result.humidity}`
            cloudPct.innerHTML = `<p>Cloud %: </p>${result.cloud_pct}`
            wind.innerHTML = `<p>Wind Speed</p>: ${result.wind_speed}`
        }
        else {
            err.innerHTML = "Enter Correct City Name"
            loading.style.display = 'none'
        }
    }
    catch (err) {
        console.log(err)
    }
}