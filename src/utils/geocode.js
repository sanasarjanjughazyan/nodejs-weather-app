const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/search/geocode/v6/forward?q=" + encodeURIComponent(address) + "&access_token=pk.eyJ1Ijoic2FuYXNhcmphbmp1Z2hhenlhbiIsImEiOiJjbHd3bnE5NzUxMzVpMmxwc3FiNWpycmw3In0.0bitiJIQegSB3_PtZuwrKA&limit=1"

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to mapbox!", undefined)
        } else if (body.features.length === 0) {
            callback("Wrong input params for mapbox", undefined)
        } else {
            const {latitude, longitude} = body.features[0].properties.coordinates
            const location = body.features[0].properties.full_address
            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode