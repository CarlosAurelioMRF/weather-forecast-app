export const testInputStatus = (field: string, error?: string): void => {
  !error
    ? cy.get(`[title="${field}"]`).should('not.exist')
    : cy.get(`[title="${field}"]`).should('have.text', error)
}

export const testHttpCallsCount = (count: number): void => {
  cy.get('@request.all').should('have.length', count)
}
