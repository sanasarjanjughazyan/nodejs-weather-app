const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=83ac32bff53aab3f0452d4f2427042e3&query=" + latitude + "," + longitude

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to watherstack!", undefined)
        } else if (body.error) {
            callback("Wrong input params for weatherstack", undefined)
        } else {
            const {weather_descriptions, temperature, feelslike} = body.current
            callback(undefined, weather_descriptions[0] + ". It is currently " + temperature + " degrees. Feels like " + feelslike + " degrees")
        }
    })
}

module.exports = forecast