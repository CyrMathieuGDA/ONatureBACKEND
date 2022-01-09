'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleSchema extends Schema {
    up() {
        this.drop('articles')
        this.create('articles', (table) => {
            table.increments()
            table.string('nom', 100).notNullable().unique()
            table.integer('prix').unsigned().notNullable()
            table.string('url_img', 100)
            table.string('description', 255)
            table.integer('categorie').unsigned().notNullable()
            table.foreign('categorie').references('categories.id')
            table.integer('variete').unsigned().notNullable()
            table.foreign('variete').references('varietes.id')
            table.boolean('stock').defaultTo(true).notNullable()
            table.boolean('promo').defaultTo(true).notNullable()
            table.integer('prix_promo').unsigned().defaultTo(0).notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('articles')
    }
}

module.exports = ArticleSchema