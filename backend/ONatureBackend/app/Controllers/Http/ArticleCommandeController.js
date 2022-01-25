'use strict'

const ArticleCommande = use('App/Models/ArticleCommande')

class ArtileCommandeController {
    /**
     * @swagger
     * /article_commande:
     *   get:
     *     tags:
     *       - API article & commandes
     *     summary: nothing
     *     responses:
     *       200:
     *         description: nothing
     */
    async index() { return ArticleCommande.all() }

    /**
     * @swagger
     * /article_commande:
     *   post:
     *     tags:
     *       - API article & commandes
     *     summary: nothing
     *     parameters:
     *         - name: article-commande
     *           in: body
     *           required: true
     *           schema:
     *              $ref: "#/definitions/ArticleCommande"
     *     responses:
     *       201:
     *         description: nothing
     *       500:
     *         description: Stockage impossible, veuillez reessayer!
     */
    async store({ request, response }) {
        try {
            const articleCommande_ = await ArticleCommande.create({
                article: request.input('article'),
                commande: request.input('commande'),
                quantite: request.input('quantite'),
            })
            return response.status(201).json(articleCommande_)
        } catch (error) {
            return response.status(500).send('Stockage impossible, veuillez reessayer!')
        }
    }

    /**
     * @swagger
     * /article_commande/{id}:
     *   get:
     *     tags:
     *       - API article & commandes
     *     summary: nothing
     *     parameters:
     *         - name: id
     *           in: path
     *           schema:
     *              type: number
     *     responses:
     *       200:
     *         description: nothing
     *       400:
     *         description: Aucun resultat trouvé!
     */
    async show({ response, params }) {
        try {
            const articleCommande_ = await ArticleCommande.findOrFail(params.id)
            return response.status(200).json(articleCommande_)
        } catch (error) {
            return response.status(400).send('Aucun resultat trouvé!')
        }
    }

    /**
     * @swagger
     * /article_commande/{id}:
     *   put:
     *     tags:
     *       - API article & commandes
     *     summary: nothing
     *     parameters:
     *         - name: id
     *           in: path
     *           schema:
     *              type: number
     *         - name: article-commande
     *           in: body
     *           required: true
     *           schema:
     *              $ref: "#/definitions/ArticleCommande"
     *     responses:
     *       202:
     *         description: nothing
     *       500:
     *         description: Échec de la mise a jour, veuillez reessayer!
     */
    async update({ request, response, params }) {
        try {
            const articleCommande_ = await ArticleCommande.findOrFail(params.id)
            articleCommande_.article = request.input('article')
            articleCommande_.commande = request.input('commande')
            articleCommande_.quantite = request.input('quantite')
            articleCommande_.save()
            return response.status(202).json(articleCommande_)
        } catch (error) {
            return response.status(500).send('Échec de la mise a jour, veuillez reessayer!')
        }
    }

    /**
     * @swagger
     * /article_commande/{id}:
     *   delete:
     *     tags:
     *       - API article & commandes
     *     summary: nothing
     *     parameters:
     *         - name: id
     *           in: path
     *           schema:
     *              type: number
     *     responses:
     *       203:
     *         description: Suppression réussie!
     *       400:
     *         description: Aucun resultat ne correspond a cet id!
     */
    async destroy({ params, response }) {
        try {
            const articleCommande_ = await ArticleCommande.findOrFail(params.id)
            await articleCommande_.delete()
            return response.status(203).send('Suppression réussie!')
        } catch (error) {
            return response.status(500).send('Aucun resultat ne correspond a cet id!')
        }
    }
}

module.exports = ArtileCommandeController