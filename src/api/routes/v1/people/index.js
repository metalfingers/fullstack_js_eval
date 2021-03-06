const statusCodes = require('../../../lib/httpStatusCodes')
const httpErrorMessages = require('../../../lib/httpErrorMessages')
const { database } = require('../../../lib/database')

module.exports = (api) => {
  /**
   * POST /v1/people
   * Create a new person
   */
  api.post('/', async (req, res, next) => {
    const person = await database('people')
      .insert(req.body)
      .returning('*')

    // todo: take a second look...
    res
      .status(statusCodes.OK)
      .json(person[0])
  })

  /**
   * GET /v1/people/:personID
   * Retrieve a person by their ID
   */
  api.get('/:personID', async (req, res) => {
    const person = await database('people')
      .where({id: req.params.personID})
      .first()

    if (person) {
      res
        .status(statusCodes.OK)
        .json(person)  
    } else {
      res.sendStatus(statusCodes.NotFound)
    }
  })

  /**
   * GET /v1/people
   * Retrieve a list of people
   */
  api.get('/', async (req, res) => {
    const people  = await database('people')
      .select('*')
    res.status(statusCodes.OK).json(people)
  })

  /**
   * Do not modify beyond this point until you have reached
   * TDD / BDD Mocha.js / Chai.js
   * ======================================================
   * ======================================================
   */

  /**
   * POST /v1/people/:personID/addresses
   * Create a new address belonging to a person
   **/
  api.post('/:personID/addresses', async (req, res) => {
    const address = await database('addresses')
      .insert({ person_id: req.params.personID, ...req.body })
      .returning('*')

    res
      .status(statusCodes.OK)
      .json(address[0])
  })

  /**
   * GET /v1/people/:personID/addresses/:addressID
   * Retrieve an address by it's addressID and personID
   **/
  api.get('/:personID/addresses/:addressID', async (req, res) => {
    res
      .status(statusCodes.NotImplemented)
      .json(httpErrorMessages.NotImplemented)
  })

  /**
   * GET /v1/people/:personID/addresses
   * List all addresses belonging to a personID
   **/
  api.get('/:personID/addresses', async (req, res) => {
    res
      .status(statusCodes.NotImplemented)
      .json(httpErrorMessages.NotImplemented)
  })

  /**
   * BONUS!!!!
   * DELETE /v1/people/:personID/addresses/:addressID
   * Mark an address as deleted by it's personID and addressID
   * Set it's deleted_at timestamp
   * Update the previous GET endpoints to omit rows where deleted_at is not null
   **/
  api.delete('/:personID/addresses/:addressID', async (req, res) => {
    res
      .status(statusCodes.NotImplemented)
      .json(httpErrorMessages.NotImplemented)
  })
}
