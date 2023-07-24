const express = require('express')
const app = express.Router()

const {
  getAllUsers,
  getUser,
  checkIDInput,
  checkIDExist,
  getUsersByLastname,
  checkLastNameInput,
  checkLastNameExist
} = require('./user.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - birthday
 *       properties:
 *         id:
 *           type: UUIDV4
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: Firstname of User
 *         lastName:
 *           type: string
 *           description: Lastname of User
 *         email:
 *           type: string
 *           description: Email of User
 *         birthday:
 *           type: date
 *           description: Birth Date of User
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The User's API
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get All Users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

app.get("/", getAllUsers);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get User by Id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of User
 *     responses:
 *       200:
 *         description: The Object of User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User Does not Exist
 */

app.get("/:id", [checkIDInput, checkIDExist], getUser);

/**
 * @swagger
 * /api/user/lastname/{lastname}:
 *   get:
 *     summary: Get Users by lastname
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: lastname
 *         schema:
 *           type: string
 *         required: true
 *         description: Lastname of User
 *     responses:
 *       200:
 *         description: The list of the users by lastname
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: User Does not Exist
 */

app.get("/lastname/:lastname", [checkLastNameInput, checkLastNameExist], getUsersByLastname);

module.exports = app