const express = require('express')
const app = express.Router()

const {
  getBooking,
    getAllBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    checkIDExist,
    checkIDInput
} = require('./booking.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - startDate
 *         - endDate
 *         - userId
 *         - vehicleId
 *         - active
 *       properties:
 *         id:
 *           type: UUID
 *           description: The auto-generated id of the user
 *         startDate:
 *           type: date
 *           description: Start Date of Booking
 *         endDate:
 *           type: date
 *           description: End Date of Booking
 *         userId:
 *           type: UUID
 *           description: User id of Booking
 *         vehicleId:
 *           type: UUID
 *           description: Vehicle id of Booking
 *         active:
 *           type: boolean
 *           description: Booking Active or not
 */

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: The Booking's API
 */

/**
 * @swagger
 * /api/booking:
 *   get:
 *     summary: Get All Bookings
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: The list of the bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */

app.get("/", getAllBookings);

/**
 * @swagger
 * /api/booking/{id}:
 *   get:
 *     summary: Get Booking by Id
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of Booking
 *     responses:
 *       200:
 *         description: The Object of Booking
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking Does not Exist
 */

app.get("/:id", [checkIDInput, checkIDExist], getBooking);

/**
 * @swagger
 * /api/booking:
 *   post:
 *     summary: Create a new booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: The Booking is successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Unable to Create Booking
 *       500:
 *         description: Internal Error
 */

app.post("/", createBooking)

/**
 * @swagger
 * /api/booking/{id}:
 *  put:
 *    summary: Update Booking by the id
 *    tags: [Booking]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Booking id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Booking'
 *    responses:
 *      200:
 *        description: Booking is updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Booking'
 *      404:
 *        description: Booking Does not Exist
 *      500:
 *        description: Internal Error
 */

app.put("/:id", [checkIDInput, checkIDExist], updateBooking)

/**
 * @swagger
 * /api/booking/{id}:
 *   delete:
 *     summary: Remove Booking by id
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking id
 *
 *     responses:
 *       200:
 *         description: Booking Deleted Successfully
 *       404:
 *         description: Booking Does not Exist
 */

app.delete("/:id", [checkIDInput, checkIDExist], deleteBooking)

module.exports = app