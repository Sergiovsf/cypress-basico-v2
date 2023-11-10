/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(() => {
    cy.visit("./src/index.html")
    })

    it('verifica o título da aplicação', function(){
      cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
      const longText = "testeaskjdsaijdhsahfuiashfafhaufhashiuahahsihaisdhasasojasijdasjaad"

      cy.get("input[name='firstName']").should("be.visible").type("Sérgio").should("have.value", "Sérgio")
      cy.get("input[name='lastName']").should("be.visible").type("Fernandes").should("have.value", "Fernandes")
      cy.get("input[type='email']").should("be.visible").type("sergioviniciussantanafer@gmail.com", {delay : 0}).should("have.value", "sergioviniciussantanafer@gmail.com")
      cy.get('#open-text-area').should("be.visible").type(longText, {delay : 0}).should("have.value", "testeaskjdsaijdhsahfuiashfafhaufhashiuahahsihaisdhasasojasijdasjaad")
      cy.contains("button", "Enviar").click()
      //cy.get('button[type="submit"]').click()

      cy.get('.success').should("be.visible")
    })

    it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function(){
      cy.get("input[name='firstName']").should("be.visible").type("Sérgio").should("have.value", "Sérgio")
      cy.get("input[name='lastName']").should("be.visible").type("Fernandes").should("have.value", "Fernandes")
      cy.get("input[type='email']").should("be.visible").type("sergioviniciussantanafer@gmail,com", {delay : 0}).should("have.value", "sergioviniciussantanafer@gmail,com")
      cy.get('#open-text-area').should("be.visible").type("Teste", {delay : 0}).should("have.value", "Teste")
      cy.contains("button", "Enviar").click()
      //cy.get('button[type="submit"]').click()

      cy.get('.error').should("be.visible")
    })

    it("valida o campo telefone só aceitar números", function(){
      cy.get('#phone')
        .type("teste")
        .should("have.value", "")

    })

    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function(){
      const longText = "testeaskjdsaijdhsahfuiashfafhaufhashiuahahsihaisdhasasojasijdasjaad"

      cy.get("input[name='firstName']").should("be.visible").type("Sérgio").should("have.value", "Sérgio")
      cy.get("input[name='lastName']").should("be.visible").type("Fernandes").should("have.value", "Fernandes")
      cy.get("input[type='email']").should("be.visible").type("sergioviniciussantanafer@gmail.com", {delay : 0}).should("have.value", "sergioviniciussantanafer@gmail.com")
      cy.get('#open-text-area').should("be.visible").type(longText, {delay : 0}).should("have.value", "testeaskjdsaijdhsahfuiashfafhaufhashiuahahsihaisdhasasojasijdasjaad")
      cy.get('#phone-checkbox').check()
      cy.contains("button", "Enviar").click()
      //cy.get('button[type="submit"]').click()

      cy.get('.error').should("be.visible")
    })

    it("preenche e limpa os campos nome, sobrenome, email e telefone", function(){
      const longText = "testeaskjdsaijdhsahfuiashfafhaufhashiuahahsihaisdhasasojasijdasjaad"

      cy.get("input[name='firstName']").should("be.visible").type("Sérgio").should("have.value", "Sérgio").clear().should("have.value", "")
      cy.get("input[name='lastName']").should("be.visible").type("Fernandes").should("have.value", "Fernandes").clear().should("have.value", "")
      cy.get("input[type='email']").should("be.visible").type("sergioviniciussantanafer@gmail.com", {delay : 0}).should("have.value", "sergioviniciussantanafer@gmail.com").clear().should("have.value", "")
      cy.get('#phone-checkbox').click()
      cy.get('#phone').type("92984809331").should("have.value", "92984809331").clear().should("have.value", "")

    })

    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function(){
      cy.contains("button", "Enviar").click()
      //cy.get('button[type="submit"]').click()

      cy.get('.error').should("be.visible")
    })

    it("envia o formuário com sucesso usando um comando customizado", function(){
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should("be.visible")
    })
    
    it("seleciona um produto (YouTube) por seu texto", function() {
      cy.get('#product').select("YouTube").should("have.value", "youtube")
    })

    it("seleciona um produto (Mentoria) por seu valor (value)", function(){
      cy.get('#product')
       .select("mentoria")
       .should("have.value", "mentoria")
    })

    it("seleciona um produto (Blog) por seu índice", function(){
      cy.get('#product')
       .select(1)
       .should("have.value", "blog")
    })

    it("marca o tipo de atendimento 'Feedback", function(){
      cy.get("input[type='radio'][value='feedback']")
        .check()
        .should("have.value", "feedback")
    })

    it("marca cada tipo de atendimento", function(){
      cy.get("input[type='radio']")
       .should("have.length", 3)
       .each(function($radio) { //each recebendo função de callback que recebe como argument cada um dos elemtentos(radios) que foram selecionados
          cy.wrap($radio).check() //.wrap empacota cada um desses radios para pode receber comandos
          cy.wrap($radio).should("be.checked") 
       })

    })

    it("marca ambos checkboxes, depois desmarca o último", function(){
      cy.get("input[type='checkbox']")
       .check()
       .should("be.checked")
       .last()
       .uncheck()
       .should("not.be.checked")
    })

    it("seleciona um arquivo da pasta fixtures", function(){
      cy.get("input[type='file']")
       .should("not.have.value")
       .selectFile("cypress/fixtures/example.json")
       .should(function($input){
        expect($input[0].files[0].name).to.equal("example.json") //função de callback buscando o arquivo example.json que recebe como elemento o próprio get que foi passado anteriormente
       })
    })

    it("seleciona um arquivo simulando um drag-and-drop", function(){
      cy.get("input[type='file']")
       .should("not.have.value")
       .selectFile("cypress/fixtures/example.json", {action: "drag-drop"})
       .should(function($input){
        expect($input[0].files[0].name).to.equal("example.json") //função de callback buscando o arquivo example.json que recebe como elemento o próprio get que foi passado anteriormente
       })
       
    })

    it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function(){
      cy.fixture("../fixtures/example.json", {encoding: null}).as("exemplo")
      cy.get("input[type='file']")
       .should("not.have.value")
       .selectFile("@exemplo")
       .should(function($input){
        expect($input[0].files[0].name).to.equal("example.json") //função de callback buscando o arquivo example.json que recebe como elemento o próprio get que foi passado anteriormente
       })
    })

    it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function(){
      cy.contains("Política de Privacidade").should("have.attr", "target", "_blank")
      //cy.get("#privacy a").should("have.attr", "target", "_blank")
    })

    it("acessa a página da política de privacidade removendo o target e então clicando no link", function(){
      cy.contains("Política de Privacidade").invoke("removeAttr", "target").click()
      cy.contains("CAC TAT - Política de privacidade").should("be.visible")
    })

    //it.only("testa a página da política de privacidade de forma independente", function(){
    //  cy.contains("Política de Privacidade").invoke("removeAttr", "target").click()
    //  cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT - Política de privacidade")
    //})


  })