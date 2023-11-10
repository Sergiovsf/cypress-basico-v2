Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function(){
    const longText = "testeaskjdsaijdhsahfuiashfafhaufhashiuahahsihaisdhasasojasijdasjaad"

    cy.get("input[name='firstName']").should("be.visible").type("Sérgio").should("have.value", "Sérgio")
    cy.get("input[name='lastName']").should("be.visible").type("Fernandes").should("have.value", "Fernandes")
    cy.get("input[type='email']").should("be.visible").type("sergioviniciussantanafer@gmail.com", {delay : 0}).should("have.value", "sergioviniciussantanafer@gmail.com")
    cy.get('#open-text-area').should("be.visible").type(longText, {delay : 0}).should("have.value", "testeaskjdsaijdhsahfuiashfafhaufhashiuahahsihaisdhasasojasijdasjaad")
    cy.contains("button", "Enviar").click()
    //cy.get('button[type="submit"]').click()

})