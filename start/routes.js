'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.resource('/article', 'ArticleController').apiOnly()
Route.resource('/article_commande', 'ArticleCommandeController').apiOnly()
Route.resource('/categorie', 'CategorieController').apiOnly()
Route.resource('/client', 'ClientController').apiOnly()
Route.resource('/commande', 'CommandeController').apiOnly()
Route.resource('/mise_enavant', 'MiseEnavantController').apiOnly()