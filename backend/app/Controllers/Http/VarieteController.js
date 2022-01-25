'use strict'

const Variete = use('App/Models/Variete')

class VarieteController {
  /**
   * @swagger
   * /variete:
   *   get:
   *     tags:
   *       - API variete
   *     summary: retourne toutes les varietes
   *     responses:
   *       200:
   *         description: toutes les varietes sont retournes
   */
  async index() { return Variete.all() }

  /**
   * @swagger
   * /variete:
   *   post:
   *     tags:
   *       - API variete
   *     summary: cree une nouvelle variete
   *     parameters:
   *         - name: variete
   *           in: body
   *           required: true
   *           schema:
   *              $ref: "#/definitions/Variete"
   *     responses:
   *       201:
   *         description: Variete enregistrée avec succès!
   *       500:
   *         description: Stockage impossible, veuillez reessayer!
   */
  async store({ request, response }) {
      try {
          const variete_ = await Variete.create({nom: request.input('nom')})
          return response.status(201).json(variete_)
      } catch (error) {
          return response.status(500).send(error)
      }
  }

  /**
   * @swagger
   * /variete/{id}:
   *   get:
   *     tags:
   *       - API variete
   *     summary: retourne la variete correspondante a l'identifiant
   *     parameters:
   *         - name: id
   *           in: path
   *           schema:
   *              type: number
   *     responses:
   *       200:
   *         description: Variete retournée!
   *       400:
   *         description: Variete introuvable!
   */
  async show({ response, params }) {
      try {
          const variete_ = await Variete.findOrFail(params.id)
          return response.status(200).json(variete_)
      } catch (error) {
          return response.status(400).send(error)
      }
  }

  /**
   * @swagger
   * /variete/{id}:
   *   put:
   *     tags:
   *       - API variete
   *     summary: met a jour la variete correspondante a l'identifiant
   *     parameters:
   *         - name: id
   *           in: path
   *           schema:
   *              type: number
   *         - name: variete
   *           in: body
   *           required: true
   *           schema:
   *              $ref: "#/definitions/Variete"
   *     responses:
   *       202:
   *         description: Variete mise a jour avec succès
   *       500:
   *         description: Échec de la mise a jour, veuillez reessayer!
   */
  async update({ request, response, params }) {
      try {
          const variete_ = await Variete.findOrFail(params.id)
          variete_.nom = request.input('nom')
          variete_.save()
          return response.status(202).json(variete_)
      } catch (error) {
          return response.status(500).send(error)
      }
  }

  /**
   * @swagger
   * /variete/{id}:
   *   delete:
   *     tags:
   *       - API variete
   *     summary: supprime la variete correspondante a l'identifiant
   *     parameters:
   *         - name: id
   *           in: path
   *           schema:
   *              type: number
   *     responses:
   *       203:
   *         description: Suppression réussie!
   *       400:
   *         description: Variete introuvable!
   */
  async destroy({ params, response }) {
      try {
          const variete_ = await Variete.find(params.id)
          await variete_.delete()
          return response.status(203).send('Suppression réussie!')
      } catch (error) {
          return response.status(500).send(error)
      }
  }
}

module.exports = VarieteController
