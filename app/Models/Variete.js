'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Variete extends Model {
    /**
     * @swagger
     * definitions:
     *  Variete:
     *      type: object
     *      properties:
     *          nom:
     *              type: string
     */

    nom = String()
}

module.exports = Variete
