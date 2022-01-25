'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VarieteSchema extends Schema {
  up () {
    this.create('varietes', (table) => {
      table.increments()
      table.string('nom', 100).unique().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('varietes')
  }
}

module.exports = VarieteSchema
