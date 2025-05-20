import faker from 'faker'
import * as Helpers from '../utils/form-helpers'
import * as LoginMock from '../utils/login-mocks'

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(faker.random.alphaNumeric(8))
  cy.getByTestId('submit-button').click()
}

describe('LoginPage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.value', '')
    Helpers.testInputStatus('email')
    cy.getByTestId('password').should('have.value', '')
    Helpers.testInputStatus('password')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.internet.email()).clear()
    Helpers.testInputStatus('email-helper', 'Campo obrigatório.')
    cy.getByTestId('password').type(faker.internet.password()).clear()
    Helpers.testInputStatus('password-helper', 'Campo obrigatório.')
    cy.getByTestId('password').type(faker.random.alphaNumeric(2))
    cy.get('[title="password-helper"]').should('have.text', 'Campo deve ter 8 caracteres ou mais.')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    Helpers.testInputStatus('email')
    cy.getByTestId('password').type(faker.random.alphaNumeric(8))
    Helpers.testInputStatus('password')
    cy.getByTestId('submit-button').should('not.have.attr', 'disabled')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    LoginMock.mockInvalidCredentialsError()
    simulateValidSubmit()
    cy.getByTestId('login-toast')
      .should('exist')
      .should('contain.text', 'As credenciais informadas são inválidas.')
  })

  it('Should present AccessDeniedError on 403', () => {
    LoginMock.mockAccessDeniedError()
    simulateValidSubmit()
    cy.getByTestId('login-toast')
      .should('exist')
      .should('contain.text', 'Você não tem permissão para acessar este conteúdo.')
  })

  it('Should present UnexpectedError on 400/404/500', () => {
    LoginMock.mockUnexpectedError()
    simulateValidSubmit()
    cy.getByTestId('login-toast')
      .should('exist')
      .should('contain.text', 'Algum erro inesperado ocorreu, tente novamente em alguns instantes.')
  })

  it('Should save account if valid credentials provided', () => {
    LoginMock.mockOk()
    simulateValidSubmit()
    cy.getByTestId('login-toast').should('not.exist')
    cy.window().then((window) => assert.isOk(window.localStorage.getItem('token')))
  })

  it('Should not call submit if form is invalid', () => {
    LoginMock.mockOk()
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    Helpers.testHttpCallsCount(0)
  })
})
