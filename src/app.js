const express = require("express")
const path = require("path")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

// Define paths for Express config
const publicPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup hnadlebar engine
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Sano"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Sano"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Sano"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide the address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecast: data
            })
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Help",
        name: "Sano",
        errorMessage: "Help article not found"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "Help",
        name: "Sano",
        errorMessage: "Page not found"
    })
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})