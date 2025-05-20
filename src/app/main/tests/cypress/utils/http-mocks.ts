import faker from 'faker'

export const mockUnauthorizedError = (url: RegExp): void => {
  cy.server()
  cy.route({
    method: 'POST',
    url,
    status: 401,
    response: {},
  }).as('request')
}

export const mockUnexpectedError = (method: string, url: RegExp): void => {
  cy.server()
  cy.route({
    method,
    url,
    status: faker.random.arrayElement([400, 404, 500]),
    response: {},
  }).as('request')
}

export const mockAccessDeniedError = (method: string, url: RegExp): void => {
  cy.server()
  cy.route({
    method,
    url,
    status: 403,
    response: {},
  }).as('request')
}

export const mockOk = (url: RegExp, method: string, response: any): void => {
  cy.server()
  cy.route({
    method,
    url,
    status: 200,
    response,
  }).as('request')
}
