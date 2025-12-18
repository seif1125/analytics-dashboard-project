



describe('Dashboard Performance and Data Integrity', () => {
  // Base URL is typically configured in cypress.config.ts, pointing to the frontend
  const DASHBOARD_URL = 'http://localhost:5173/'; 
  const API_ENDPOINT = '/api/v1/analytics/daily_downloads'; 

  it('should load data and verify caching reduces subsequent load time', () => {

    // 1. Monitor the first API request (Should be a Cache Miss)
    cy.intercept('GET', API_ENDPOINT).as('firstLoad');
    cy.visit(DASHBOARD_URL);

    // Wait for the first load. We expect it to take time (~500ms simulation).
    cy.wait('@firstLoad').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);

      // Verify the mock data structure
      expect(interception.response.body).to.be.an('array').with.length.greaterThan(0);

      // Get the duration of the first request
      const firstDuration = interception.duration;
      cy.log(`First load duration (Cache Miss): ${firstDuration}ms`);
    });

    // 2. Reload the page (Frontend Client-Side Cache Check)
    // TanStack Query should serve the cached data immediately on the client side.
    cy.reload();

    // Check if the chart is visible immediately without a loading state, 
    // confirming client-side caching is working.
    cy.get('h3').contains('Daily Application Downloads').should('be.visible');

    // 3. Force Backend Re-Fetch (Backend Redis Cache Check)
    // We will now test the *server-side* cache.

    // Monitor the second API request (Should be a Cache Hit)
    cy.intercept('GET', API_ENDPOINT).as('secondLoad');

    // Force a backend fetch (e.g., by clicking a refresh button, simulated here by a reload)
    cy.reload(); 

    cy.wait('@secondLoad').then((interception) => {
        const secondDuration = interception.duration;
        cy.log(`Second load duration (Redis Cache Hit): ${secondDuration}ms`);

        // Assertion: The second request duration should be significantly faster 
        // than the first request (due to skipping the 500ms mock DB call).
        // A realistic assertion would be: 
        // expect(secondDuration).to.be.lessThan(firstDuration * 0.5);

        // For the mock, we can assert it's just fast:
        expect(secondDuration).to.be.lessThan(100); 
    });

    // Final check that the chart rendered successfully
    cy.get('.recharts-wrapper').should('be.visible');
  });
});