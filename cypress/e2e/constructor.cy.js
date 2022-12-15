describe('Constructor', { testIsolation: false }, () => {
  before(function () {
    cy.visit('/');
  });

  it('Should open ingredient modal', () => {
    cy.get('[data-test-id=ingredient]').first().click();
    cy.contains('Детали ингредиента');
    cy.get('body').type('{esc}');
  });

  const dataTransfer = new DataTransfer();

  it('Should drag bun to constructor', () => {
    cy.get('[data-test-id=bun').first().trigger('dragstart', {
      dataTransfer,
    });
    cy.get('[data-test-id=constructor]').trigger('drop', {
      dataTransfer,
    });
  });

  it('Should drag ingredient to constructor', () => {
    cy.get('[data-test-id=ingredient]').first().trigger('dragstart', {
      dataTransfer,
    });
    cy.get('[data-test-id=constructor]').trigger('drop', {
      dataTransfer,
    });
  });

  before(function () {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('refresh');
    window.localStorage.removeItem('expires_in');
  });

  it('Should order', () => {
    cy.get('button').contains('Оформить заказ').click();

    cy.get('input[name=email]').type('zhenia@z.com');
    cy.get('input[name=password]').type('Z12345678');
    cy.get('button').contains('Войти').click();

    cy.get('button').contains('Оформить заказ').click().wait(20000);
    cy.contains('Ваш заказ начали готовить');
  });
});
