const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.js');

/**
 * @swagger
 * components :
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *       example:
 *         email: scheuer.kevin@gmail.com
 *         password: aSuperS3cretP@sS_w0rD!
 */
/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Register a new user and create a new one
 */
/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *    summary: Sign up as a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: Create and save a new user to database
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    description: A new user was created in database
 *      404:
 *        description: Creating user in database failed
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    description: Unable to create user in database
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  error:
 *                    type: string
 *                    description: Provide error description
 *
 * */
/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Login as a registered user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Find user by getting his id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  userId:
 *                    type: string
 *                    description: User id
 *                  token:
 *                    type: string
 *                    description: Bearer JWT Token
 *      401:
 *        description: Password provided by user is incorrect
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    description: This password is incorrect
 *      404:
 *        description: Based-on-id search returns no result
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    description: Unable to find an user with this email
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  error:
 *                    type: string
 *                    description: Provide error description
 *
 * */

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;