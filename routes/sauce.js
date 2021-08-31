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
 *       properties:
 *         userId:
 *           type: string
 *           description: userId provided by database
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
 *           default: 0
 *         dislikes:
 *           type: number
 *           description: How many users disliked this sauce
 *           default: 0
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
 *    summary: Get all existing sauces
 *    tags: [Sauces]
 *    responses:
 *      200:
 *        description: An array of all existing sauces
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                  type: object
 *                  $ref: '#/components/schemas/Sauce'
 *      400:
 *        description: Unable to display sauces
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  error:
 *                    type: object
 *                    description: An error object provided by API when get fails
 * */
/**
 * @swagger
 * /api/sauces/{id}:
 *  get:
 *    summary: Get a specify sauces
 *    tags: [Sauces]
 *    responses:
 *      200:
 *        description: Id matching sauce (based on params.id)
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Sauce'
 *      400:
 *        description: Unable to display sauces
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  error:
 *                    type: object
 *                    description: An error object provided by API when get fails
 * */
/**
 * @swagger
 * /api/sauces:
 *  post:
 *    summary: Create a new sauce
 *    tags: [Sauces]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sauce'
 *    responses:
 *      201:
 *        description: Create and save a new sauce into database
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    description: Sauce created successfully!
 *      400:
 *        description: Creating sauce in database failed
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  error:
 *                    type: object
 *                    description: An error object provided by API when get fails
 * */
/**
 * @swagger
 * /api/sauces/{id}:
 *  put:
 *    summary: Update the sauce with the id provided. If an image is downloaded, it is captured and the Url image of the sauce is updated. If no file is provided, sauce information are located directly in the body of the request (req.body.name, req.body.heat, etc.). If a file is provided, the sauce transformed into a chain of characters are in req.body.sauce.
 *    tags: [Sauces]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sauce'
 *        text/plain:
 *          schema:
 *            properties:
 *              sauce:
 *                type: string
 *              file:
 *                type: string
 *    responses:
 *      200:
 *        description: Sauce was successfully updated in database
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    description: Update successful
 *      400:
 *        description: Creating sauce in database failed
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  error:
 *                    type: object
 *                    description: An error object provided by API when get fails
 * */
/**
 * @swagger
 * /api/sauces/{id}:
 *  delete:
 *    summary: Delete a specific sauce
 *    tags: [Sauces]
 *    responses:
 *      200:
 *        description: Deletion worked
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                    type: string
 *                    description: Item successfully deleted
 *      400:
 *        description: Unable to delete sauce
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  error:
 *                    type: object
 *                    description: An error object provided by API when get fails
 *      500:
 *        description: Server error, unable to find sauce to delete
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  error:
 *                    type: object
 *                    description: An error object provided by API when get fails
 * */
/**
 * @swagger
 * /api/sauces/{id}/like:
 *  put:
 *    summary: Sets the "Like" status for the supplied userId. If like = 1, the user likes (= like) the sauce. If like = 0, the user cancels his like or his dislike. If like = -1, user doesn't like (= dislike) the sauce. The ID of user must be added or removed from the table appropriate.
 *    tags: [Sauces]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *              like:
 *                type: number
 *    responses:
 *      201:
 *        description: Like/Dislike dropped out or added with success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Like/Dislike removed successfully | Like/Dislike successfully added
 *      400:
 *        description: Adding or updating like/dislike failed
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: object
 *                  description: An error object provided by API when get fails
 *      404:
 *        description: Unable to reach like/dislike on matching sauce
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: object
 *                  description: An error object provided by API when get fails
 *      500:
 *        description: Invalid value for req.body.like (!== 0/1/-1)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Internal server error
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