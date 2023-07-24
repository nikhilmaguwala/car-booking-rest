const express = require('express')
const app = express.Router()

const {
  getAllVehicles,
  getVehicle,
  createVehicle,
  deactivateVehicle,
  updateVehicle,
  deleteVehicle,
  checkIDExist,
  checkIDInput
} = require('./vehicle.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - licensePlate
 *         - vin
 *         - model
 *         - color
 *         - validTill
 *         - active
 *       properties:
 *         id:
 *           type: UUIDV4
 *           description: The auto-generated id of the user
 *         licensePlate:
 *           type: string
 *           description: License Plate of Vehicle
 *         vin:
 *           type: string
 *           description: vin of Vehicle
 *         model:
 *           type: string
 *           description: Model of Vehicle
 *         color:
 *           type: string
 *           description: Color of Vehicle
 *         validTill:
 *           type: date
 *           description: Valid Date of Vehicle
 *         active:
 *           type: boolean
 *           description: Vehicle Active or not
 */

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: The Vehicle's API
 */

/**
 * @swagger
 * /api/vehicle:
 *   get:
 *     summary: Get All Vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: The list of the vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 */

app.get("/", getAllVehicles);

/**
 * @swagger
 * /api/vehicle/{id}:
 *   get:
 *     summary: Get Vehicle by Id
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of Vehicle
 *     responses:
 *       200:
 *         description: The Object of Vehicle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle Does not Exist
 */

app.get("/:id", [checkIDInput, checkIDExist], getVehicle);

/**
 * @swagger
 * /api/vehicle:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: The vehicle is successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Unable to Create Vehicle
 *       500:
 *         description: Internal Error
 */

app.post("/", createVehicle)

/**
 * @swagger
 * /api/vehicle/deactivate/{id}:
 *   get:
 *     summary: Deactivate Vehicle By id
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of Vehicle
 *     responses:
 *       200:
 *         description: Vehicle Successfully Deactivated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle Does not Exist
 */

app.get("/deactivate/:id", [checkIDInput, checkIDExist], deactivateVehicle)

module.exports = app