'use strict'

const Commande = use('App/Models/Commande')
// const ArticleCommande = use('App/Models/ArticleCommande')
const Client = use('App/Models/Client')
const mailjet = use('node-mailjet')
    .connect('88c4aac0a69ec905a64db5eb91328578', '6dec295c3ad9607abfddc4195e8e9c5d')

class CommandeController {
    /**
     * @swagger
     * /commande:
     *   get:
     *     tags:
     *       - API commande
     *     summary: renvoi toutes les commande
     *     responses:
     *       200:
     *         description: renvoi la liste des commande enregistres
     */
    async index() { return Commande.all() }

    /**
     * @swagger
     * /commande:
     *   post:
     *     tags:
     *       - API commande
     *     summary: enregistre une nouvelle commande
     *     parameters:
     *         - name: commande
     *           in: body
     *           required: true
     *           schema:
     *              $ref: "#/definitions/Commande"
     *     responses:
     *       201:
     *         description: Commande enregistree avec succes
     *       500:
     *         description: une Erreur s'est produite lors de la creation de la commande, verifiez les erreurs
     */
    async store({ request, response }) {
        const total = request.input('total')
        const pay = request.input('mode_paiement')
        const client = request.input('client')
        const stat = request.input('status')
        const articles_ = request.input('articles')
        const client_ = await Client.findOrFail(client)
        const requestOwner = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [{
                "From": {
                    "Email": "info@onaturesn.com",
                    "Name": "O'Nature Info"
                },
                "To": [{
                    "Email": client_.$attributes.email,
                    "Name": client_.$attributes.nom_complet
                },
                {
                    "Email": "contact@onaturesn.com",
                    "Name": "O'Nature Contact"
                }],
                "Subject": "Notification de commande",
                "TextPart": "Mail notifiant une nouvelle commande",
                "HTMLPart": "<h1>Commande passée avec succès!</h1>",
                "CustomID": "ONatureMailer"
            }]
        })
        
        let text = '[',
            i = 0
        if(articles_.length > 1) {
            for(; i < articles_.length -1 ; i++) text += '{"article": ' + articles_[i].id + ', "quantite": ' + articles_[i].quantite + '}, '
            text += '{"article": ' + articles_[i].id + ', "quantite": ' + articles_[i].quantite + '}]'
        } else text += '{"article": ' + articles_[i].id + ', "quantite": ' + articles_[i].quantite + '}]'

        try{
            const commande_ = await Commande.create({
                total: total,
                mode_paiement: pay,
                client: client,
                status: stat,
                articles: text
            })
            requestOwner

            /* 
            articles_forEach(item => {
                    try{
                        await ArticleCommande.create({
                            article: item.id,
                            quantite: item.quantite,
                            commande: commande_.$attributes.id
                        })
                        return 1
                    }catch(error){
                        return error
                    }
            }) 
             */
            return response.status(201).json(commande_)
        } catch(error){
            response.status(400).json(error)
        }
    }

    /**
     * @swagger
     * /commande/{id}:
     *   get:
     *     tags:
     *       - API commande
     *     summary: renvois la commande correspondante a l'identifiant
     *     parameters:
     *         - name: id
     *           desciption: identifiant
     *           in: path
     *           schema:
     *              type: number
     *     responses:
     *       200:
     *         description: Commande renvoyée avec succès!
     *       400:
     *         description: Aucune commande ne correspond à cet identifiant!
     */
    async show({ response, params }) {
        try {
            const commande_ = await Commande.findOrFail(params.id)
            return response.status(200).json(commande_)
        } catch (error) {
            return response.status(400).send(error)
        }
    }

    /*
    /**
     * @swagger
     * /commande/info/{id}:
     *   get:
     *     tags:
     *       - API commande
     *     summary: renvois plus d'info sur une commande
     *     parameters:
     *         - name: id
     *           desciption: identifiant
     *           in: path
     *           schema:
     *              type: number
     *     responses:
     *       200:
     *         description: More info
     *       400:
     *         description: Aucun resultat
     */
    /*async showQuantityArticlesOrdered({ response, params }) {
        try {
            const commande_ = await Commande.findOrFail(params.id)
            let reg = new RegExp("[{: }]+", "g"),
                j = 0,
                table = commande_.$attributes.articles.split(reg),
                tab = []
            for (let i = 1; i < table.length - 2; i += 2) {
                let quantite_article_commande = new QuantiteArticleCommande(parseInt(table[i]), parseInt(table[i + 1]))
                tab[j++] = quantite_article_commande
            }
            return 'hey bitches!!!'
        } catch (error) {
            console.log(error)
            return response.status(500).send(error)
        }
    }*/

    /**
     * @swagger
     * /commande/{id}:
     *   put:
     *     tags:
     *       - API commande
     *     summary: met a jour une commande
     *     parameters:
     *         - name: id
     *           desciption: identifiant
     *           in: path
     *           schema:
     *              type: number
     *         - name: commande_status
     *           in: body
     *           required: true
     *           schema:
     *              $ref: "#/definitions/StatusCommande"
     *     responses:
     *       202:
     *         description: Commande mise à jour avec succès!
     *       500:
     *         description: Échec de la mise à jour!
     */
    async update({ request, response, params }) {
        try {
            const commande_ = await Commande.findOrFail(params.id)
            commande_.status = request.input('status')
            commande_.save()
            return response.status(202).json(commande_)
        } catch (error) {
            return response.status(500).send(error)
        }
    }

    /**
     * @swagger
     * /commande/{id}:
     *   delete:
     *     tags:
     *       - API commande
     *     summary: supprime une commande
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
     *         description: Aucune commande ne correspond à cet identifiant!
     */
    async destroy({ params, response }) {
        try {
            const commande_ = await Commande.find(params.id)
            await commande_.delete()
            return response.status(203).send('Suppression réussie!')
        } catch (error) {
            return response.status(500).send(error)
        }
    }
}

module.exports = CommandeController