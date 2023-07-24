const { populateUser } = require("./user/user.service");
const { populateVehicle } = require("./vehicle/vehicle.service")
const { populateBookings } = require("./booking/booking.service")

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

// Server port
let HTTP_PORT = process.env.NODE_PORT || 8000

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ABI REST API Project',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:' + HTTP_PORT
            }
        ]
    },
    apis: [
        './user/user.routes.js',
        './vehicle/vehicle.routes.js',
        './booking/booking.routes.js'
    ]
}

const cors = require('cors')

// Create express app
let express = require("express")
let app = express()

const user_routes = require('./user/user.routes')
const vehicle_routes = require('./vehicle/vehicle.routes')
const booking_routes = require('./booking/booking.routes')

const models = require('./models')
require('dotenv').config()
let bodyParser = require("body-parser");

app.use(cors())

const specs = swaggerJsDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

models.sequelize.sync().then(async function() {
    console.log('Connected to DB through Sequelize on ENV:', process.env.NODE_ENV)
    const user = await populateUser();
    const vehicle = await populateVehicle();
    populateBookings(user.id, vehicle.id)
}).catch(function(err) {
    console.log(err)
});

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.use('/api/user', user_routes)
app.use('/api/vehicle', vehicle_routes)
app.use('/api/booking', booking_routes)

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});