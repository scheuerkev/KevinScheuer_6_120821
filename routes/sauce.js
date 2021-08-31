//Sauce routes requirements
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.js');
const multer = require('../middlewares/multer-config.js');
const sauceCtrl = require('../controllers/sauce.js');

//Swagger doc
/**
 * @swagger
 * components :
 *   schemas:
 *     Sauce:
 *       type: object
 *       required:
 *         - userId
 *         - name
 *         - manufacturer
 *         - description
 *         - mainPepper
 *         - imageUrl
 *         - heat
 *         - likes
 *         - dislikes
 *         - usersLiked
 *         - usersDislikes
 *       properties:
 *         userId:
 *           type: string
 *           description: User id provided by database
 *         name:
 *           type: string
 *           description: The name of the sauce
 *         manufacturer:
 *           type: string
 *           description: The manufacturer of the sauce
 *         description:
 *           type: string
 *           description: Short description of the sauce
 *         mainPepper:
 *           type: string
 *           description: The main spicy ingredient of the sauce
 *         imageUrl:
 *           type: string
 *           description: URL of sauce's picture
 *         heat:
 *           type: number
 *           description: The strength of the sauce from 1 to 10
 *         likes:
 *           type: number
 *           description: How many users liked this sauce
 *         dislikes:
 *           type: number
 *           description: How many users disliked this sauce
 *         usersLiked:
 *           type: array
 *           description: User's ids whom liked the sauce
 *         usersDisliked:
 *           type: array
 *           description: User's ids whom disliked the sauce
 *       example:
 *         userId: 8ds3skj45zzk99ds22jsc98
 *         name: Bandita's pepper
 *         manufacturer: TuxicFire
 *         description: Bandita's pepper is the perfect sauce to all your favorites meals
 *         mainPepper: paprika
 *         imageUrl: https://m.media-amazon.com/images/I/61aZ2bzwsEL._SL1500_.jpg
 *         heat: 6
 *         likes: 12
 *         dislikes: 2
 *         usersLiked: ['8ds3skj45zzk99ds22jsz98', '92saz982zkia91113zzk99ds']
 *         usersDisliked: ['092zioc2902jks09qskjk12', '544zdsq4665fqfe5e6fd4d5f']
 */
/**
 * @swagger
 * tags:
 *  name: Sauces
 *  description: Create, read, update, delete, like and dislike a sauce
 */
/**
 * @swagger
 * /api/sauces:
 *  get:
 *    summary: Sign up as a new user
 *    tags: [Sauces]
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
 *      409:
 *        description: Conflict error, a previous ressource is existing
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    description: This user already exists
 *      422:
 *        description: Unprocessable entity, request and syntax are good by something mismatch
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    description: Password entered doesn't require security checks (between 8 and 100 chars, at least 2 digits, 1 uppercase, 1 lowercase)
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
 * /api/sauces/{id}:
 *  get:
 *    summary: Login as a registered user
 *    tags: [Sauces]
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

//Sauce CRUD
router.get('/', auth, sauceCtrl.getSauces);
router.get('/:id', auth, sauceCtrl.getSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, sauceCtrl.manageLikes);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//Export router to the app
module.exports = router;