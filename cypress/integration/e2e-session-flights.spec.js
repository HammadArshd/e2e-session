it('', () => {
    let searchQuery = {
        from: 'DXB',
        to: 'JED',
        year: '2022',
        monthAlpha: 'June',
        monthNumeric: '06',
        date: '12',
        cabin: 'Economy',
        pax: {
            adult: '1Adult',
            child: '1Child',
        },
    };
    cy.visit('/flights-home');
    cy.get('[data-testid=FlightSearchBox__OneWayButton]').click();
    cy.intercept('GET', 'api/v3/flights/service/shazam/api/search*').as(
        'shazam'
    );
    cy.get('[data-testid=FlightSearchBox__FromAirportInput]')
        .clear()
        .type(searchQuery.from)
        .wait('@shazam')
        .get('[data-testid=FlightSearchBox__AirportOption0]')
        .find('span')
        .contains(searchQuery.from)
        .click()
        .get('[data-testid=FlightSearchBox__FromAirportInput]')
        .should('have.value', 'Dubai, United Arab Emirates');

    cy.get('[data-testid=FlightSearchBox__ToAirportInput]')
        .clear()
        .type(searchQuery.to)
        .wait('@shazam')
        .get('[data-testid*=FlightSearchBox__AirportOption]')
        .find('span')
        .contains(searchQuery.to)
        .click()
        .get('[data-testid=FlightSearchBox__ToAirportInput]')
        .should('have.value', 'Jeddah, Saudi Arabia');

    cy.get('[data-testid=FlightSearchBox__FromDateButton]')
        .click()
        .get('[data-testid=FlightSearchCalendar__YearDropdown]')
        .first()
        .select(searchQuery.year)
        .get('[data-testid=FlightSearchCalendar__MonthDropdown]')
        .first()
        .select(searchQuery.monthAlpha)
        .get(
            `[data-testid=FlightSearchCalendar__${searchQuery.year}-${searchQuery.monthNumeric}-${searchQuery.date}]`
        )
        .first()
        .click();

    cy.get('[data-testid=FlightSearchBox__CabinTypeDropdown]')
        .click()
        .get(
            `[data-testid=FlightSearchCabinSelection__${searchQuery.cabin}Option]`
        )
        .click()
        .get('[data-testid=FlightSearchBox__CabinTypeDropdown]')
        .find('span')
        .contains(searchQuery.cabin);

    cy.get('[data-testid=FlightSearchBox__PaxDropdown]')
        .click()
        .get('[data-testid=FlightSearchPAXSelection__ChildrenPlusButton]')
        .click()
        .get('[data-testid=FlightSearchBox__PaxDropdown]')
        .click()
        .get('[data-testid=FlightSearchBox__PaxDropdown]')
        .find('span')
        .contains('2 Passengers');

    cy.get('button[data-testid=FlightSearchBox__SearchButton]')
        .first()
        .click()
        .url()
        .should(
            'include',
            `/flights/${searchQuery.from}-${searchQuery.to}/${searchQuery.year}-${searchQuery.monthNumeric}-${searchQuery.date}/${searchQuery.cabin}/${searchQuery.pax.adult}/${searchQuery.pax.child}`
        );
});
