export function navigateToSRP() {
    cy.visit('en/flights/DXB-JED/2022-04-18/Economy/1Adult');
}

export function filterEmirates() {
    cy.get(
        '[data-testid=FlightSearchResult__AirlinesFilter__Airline_EK_Checkbox]'
    ).click({ force: true });
}

export function watchQuoteAPI() {
    cy.intercept('GET', 'api/v3/flights/flight/quote/itineraryId/*').as(
        'quote'
    );
}

export function selectFlight() {
    cy.get(
        '[data-testid=FlightSearchResult__Itinerary0__SelectFlightButton]'
    ).click({ force: true });
}

export function waitForQuoteAPI() {
    cy.wait('@quote');
}

export function fillInPax() {
    cy.get('[data-testid=FlightPAX__Adult1_selectedTitle]').click({
        force: true,
    });
    cy.get('[data-testid=FlightPAX__Adult1__TitleSelector__OptionMs]').click();
    cy.get('[data-testid=FlightPAX__Adult1__FirstNameInput]').type('Adult');
    cy.get('[data-testid=FlightPAX__Adult1__LastNameInput]').type('One');
    cy.get('[data-testid=FlightPAX__ContactDetails__FirstNameInput]').type(
        'Adult'
    );
    cy.get('[data-testid=FlightPAX__ContactDetails__LastNameInput]').type(
        'One'
    );
    cy.get('[data-testid=FlightPAX__ContactDetails__EmailInput]').type(
        'hamza.seera@gmail.com'
    );
    cy.get('[data-testid=FlightPAX__ContactDetails__MobileNumberInput]').type(
        '121212212'
    );
}

export function interceptReservationAPI() {
    cy.intercept('POST', 'api/v3/flights/flight/seat/reservation', {
        statusCode: 404,
        body: {
            detail: 'The seat you have selected are no longer available, please choose another lfight',
            status: 404,
            title: '[Gateway: ]',
            type: 'url',
        },
    }).as('reservation');
}

export function proceedToPayment() {
    cy.contains('Please enter a valid mobile number')
        .should('not.exist')
        .get('[data-testid=FlightPAX__ContinueToPaymentButton]')
        .click({ force: true })
        .click();
}

export function waitForReservationAPI() {
    cy.wait('@reservation');
}

export function verifyErrorModalNotExit() {
    cy.contains('Search again').should('not.exist');
}
