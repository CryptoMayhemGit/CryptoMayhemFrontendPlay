describe('crypto-mayhem-frontend', () => {
  beforeEach(() => cy.visit('/'));

  it('should display connect button', () => {
    // Custom command example, see `../support/commands.ts` file
    //cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    //getGreeting().contains('Welcome crypto-mayhem-frontend');
    cy.get('#wallet > button').contains('Connect');
  });
});
