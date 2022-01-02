'use strict'

const MiseEnavant = use('App/Models/MiseEnavant')

class MiseEnavantController {
    /**
     * @swagger
     * /mise_enavant:
     *   get:
     *     tags:
     *       - API expo
     *     summary: Retourne la liste des articles à mettre en avant
     *     responses:
     *       200:
     *         description: Liste retournée avec succès!
     */
    async index() { return MiseEnavant.all() }

    /**
     * @swagger
     * /mise_enavant:
     *   post:
     *     tags:
     *       - API expo
     *     summary: Met en avant un nouvel article!
     *     parameters:
     *         - name: expo
     *           in: body
     *           required: true
     *           schema:
     *              $ref: "#/definitions/MiseEnavant"
     *     responses:
     *       201:
     *         description: Article mis en avant avec succès!
     *       500:
     *         description: Stockage impossible!
     */
    async store({ request, response }) {
        try {
            const mise_enavant_ = await MiseEnavant.create({
                article: request.input('article')
            })
            return response.status(201).json(mise_enavant_)
        } catch (error) {
            return response.status(500).send(error)
        }
    }

    /**
     * @swagger
     * /mise_enavant/{id}:
     *   get:
     *     tags:
     *       - API expo
     *     summary: Retoure un article mis en avant
     *     parameters:
     *         - name: id
     *           desciption: identifiant
     *           in: path
     *           schema:
     *              type: number
     *     responses:
     *       200:
     *         description: Article mis en avant!
     *       400:
     *         description: Aucun resultat trouvé
     */
    async show({ params, response }) {
        try {
            const mise_enavant_ = await MiseEnavant.findOrFail(params.id)
            return response.status(200).json(mise_enavant_)
        } catch (error) {
            return response.status(400).send(error)
        }
    }

    /**
     * @swagger
     * /mise_enavant/{id}:
     *   put:
     *     tags:
     *       - API expo
     *     summary: Met à jour l'exposition
     *     parameters:
     *         - name: id
     *           desciption: identifiant
     *           in: path
     *           schema:
     *              type: number
     *         - name: favori
     *           in: body
     *           required: true
     *           schema:
     *              $ref: "#/definitions/MiseEnavant"
     *     responses:
     *       202:
     *         description: Mise à jour réussie!
     *       500:
     *         description: Échec de la mise a jour!
     */
    async update({ params, request, response }) {
        try {
            const mise_enavant_ = await MiseEnavant.findOrFail(params.id)
            mise_enavant_.article = request.input('article')
            mise_enavant_.save()
            return response.status(202).json(mise_enavant_)
        } catch (error) {
            return response.status(500).send(error)
        }
    }

    /**
     * @swagger
     * /mise_enavant/{id}:
     *   delete:
     *     tags:
     *       - API expo
     *     summary: Supprime un article de l'exposition
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
     *         description: Aucun résultat ne correspond à cet identifiant
     */
    async destroy({ params, response }) {
        try {
            const mise_enavant_ = await MiseEnavant.find(params.id)
            await mise_enavant_.delete()
            return response.status(203).send('Suppression réussie!')
        } catch (error) {
            return response.status(400).send(error)
        }
    }
}

module.exports = MiseEnavantController