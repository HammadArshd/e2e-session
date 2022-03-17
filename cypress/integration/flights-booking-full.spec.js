import * as sessionCC from '../fixtures/sessionCC';
it(
    '',
    {
        retries: {
            openMode: 1,
        },
    },
    () => {
        sessionCC.navigateToSRP();
        sessionCC.filterEmirates();
        sessionCC.watchQuoteAPI();
        sessionCC.selectFlight();
        sessionCC.waitForQuoteAPI();
        sessionCC.fillInPax();
        sessionCC.interceptReservationAPI();
        sessionCC.proceedToPayment();
        sessionCC.waitForReservationAPI();
        sessionCC.verifyErrorModalNotExit();
    }
);
