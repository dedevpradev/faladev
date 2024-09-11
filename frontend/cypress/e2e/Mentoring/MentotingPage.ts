import { faker } from '@faker-js/faker'

export class MentoringPage {
	static visit() {
		cy.visit('/')
	}

	static clickSubmitButton() {
		cy.get('[data-testid="button-submit"]').click()
	}

	static fillEmailInput() {
		cy.get('#email').type(faker.internet.email())
	}

	static fillNameInput() {
		cy.get('#name').type(faker.internet.userName())
	}

	static fillPhoneInput() {
		cy.get('#phone').type('11960606060')
	}

	static getDisplayedErrors(expectedCount: number) {
		cy.get('[data-testid="error-message"]').should('have.length', expectedCount)
	}

	static verificarMensagemDeAlerta(title: string, description: string) {
		cy.get('[data-testid="alert-title"]').should('have.text', title)
		cy.get('[data-testid="alert-description"]').should('have.text', description)
	}

	static MockRegisterSuccess() {
		cy.intercept('POST', 'http://localhost:8080/api/events ', req => {
			req.reply({
				statusCode: 200,
				body: { response: 'success' },
			})
		}).as('requestRegisterMentoring')
	}

	static MockRegisterFail() {
		cy.intercept('POST', 'http://localhost:8080/api/events ', req => {
			req.reply({
				statusCode: 400,
				body: { response: 'success' },
			})
		}).as('requestRegisterMentoring')
	}
}
