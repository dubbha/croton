context('Index', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:3000/')
  });

  it('should load successfully', () => {
    cy.get('body').should('not.be.empty')
  });
});
