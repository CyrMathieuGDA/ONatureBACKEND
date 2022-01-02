'use strict'

const Client = use('App/Models/Client')

class ClientController {
    /**
     * @swagger
     * /client:
     *   get:
     *     tags:
     *       - API client
     *     summary: renvoi toutes les client
     *     responses:
     *       200:
     *         description: renvoi la liste des client enregistres
     */
    async index() { return Client.all() }

    /**
     * @swagger
     * /client:
     *   post:
     *     tags:
     *       - API client
     *     summary: enregistre une nouvelle client
     *     parameters:
     *         - name: client
     *           in: body
     *           required: true
     *           schema:
     *              $ref: "#/definitions/Client"
     *     responses:
     *       201:
     *         description: Client enregistré avec succès!
     *       500:
     *         description: Stockage impossible, veuillez reessayer!
     */
    async store({ request, response }) {
        try {
            const client_ = await Client.create({
                nom_complet: request.input('nom_complet'),
                email: request.input('email'),
                tel: request.input('tel'),
                adresse: request.input('adresse'),
                passwd: request.input('passwd')
            })
            console.log(request)
            return response.status(201).json(client_)
        } catch (error) {
            return response.status(500).send(error)
        }
    }

    /**
     * @swagger
     * /client/{id}:
     *   get:
     *     tags:
     *       - API client
     *     summary: renvois la client correspondante a l'identifiant
     *     parameters:
     *         - name: id
     *           desciption: identifiant
     *           in: path
     *           schema:
     *              type: number
     *     responses:
     *       200:
     *         description: Client renvoyé avec succès!
     *       400:
     *         description: Aucun client ne correspond à cet identifiant!
     */
    async show({ response, params }) {
        try {
            const client_ = await Client.findOrFail(params.id)
            return response.status(200).json(client_)
        } catch (error) {
            return response.status(400).send(error)
        }
    }

    /**
     * @swagger
     * /client/{id}:
     *   put:
     *     tags:
     *       - API client
     *     summary: met a jour une client
     *     parameters:
     *         - name: id
     *           desciption: identifiant
     *           in: path
     *           schema:
     *              type: number
     *         - name: client
     *           in: body
     *           required: true
     *           schema:
     *              $ref: "#/definitions/Client"
     *     responses:
     *       202:
     *         description: Client mis a jour avec succès!
     *       500:
     *         description: Une erreur s'est produite lors de la mise a jour!
     */
    async update({ request, response, params }) {
        try {
            const client_ = await Client.findOrFail(params.id)
            client_.nom_complet = request.input('nom')
            client_.email = request.input('email')
            client_.tel = request.input('tel')
            client_.adresse = request.input('adresse')
            client_.passwd = request.input('passwd')
            client_.save()
            return response.status(202).json(client_)
        } catch (error) {
            return response.status(500).send(error)
        }
    }

    /**
     * @swagger
     * /client/{id}:
     *   delete:
     *     tags:
     *       - API client
     *     summary: supprime une client
     *     parameters:
     *         - name: id
     *           desciption: identifiant
     *           in: path
     *           schema:
     *              type: number
     *     responses:
     *       203:
     *         description: Suppression réussie!
     *       400:
     *         description: Aucun client ne correspond à cet identifiant!
     */
    async destroy({ params, response }) {
        try {
            const client_ = await Client.find(params.id)
            await client_.delete()
            return response.status(203).send('Suppression réussie!')
        } catch (error) {
            return response.status(500).send(error)
        }
    }
}

module.exports = ClientController