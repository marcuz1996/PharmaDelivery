import { STRIPE } from "../constants/stripeSettings";

/**
 * Create the Stripe Checkout redirect html code for a given user
 */
export function stripeCheckoutRedirectHTML(email) {
  return `
  <html>
    <body>
      <!-- Load Stripe.js on your website. -->
      <script src="https://js.stripe.com/v3"></script>
      <h1>Loading...</h1>
      <div id="error-message"></div>
      <script>
        (function () {
          var stripe = Stripe('pk_test_mKFM1iDRQmiHFzdV3duvCJ0c009WWBvC8j');
          window.onload = function () {
            // When the customer clicks on the button, redirect
            // them to Checkout.
            stripe.redirectToCheckout({
              items: [{sku: 'sku_HGUjGxZH2IXBjS', quantity: 1}],
              customerEmail: '${email}',
              // Do not rely on the redirect to the successUrl for fulfilling
              // purchases, customers may not always reach the success_url after
              // a successful payment.
              // Instead use one of the strategies described in
              // https://stripe.com/docs/payments/checkout/fulfillment
              successUrl: '${STRIPE.SUCCESS_URL}',
              cancelUrl: '${STRIPE.CANCELED_URL}',
              clientReferenceId: '123',
            })
              .then(function (result) {
                if (result.error) {
                  // If redirectToCheckout fails due to a browser or network
                  // error, display the localized error message to your customer.
                  var displayError = document.getElementById('error-message');
                  displayError.textContent = result.error.message;
                }
              });
          };
        })();
      </script>
    </body>
  </html>
  `;
}

/*
 `
  <html>
  <body>
  <!-- Load Stripe.js on your website. -->
  <script src="https://js.stripe.com/v3"></script>
  
  <div id="error-message"></div>
  
  <script>
    var stripe = Stripe('pk_test_mKFM1iDRQmiHFzdV3duvCJ0c009WWBvC8j');    
      stripe.redirectToCheckout({
        items: [{sku: 'sku_HGUjGxZH2IXBjS', quantity: 1}],
        customerEmail: '${email}',
        // Do not rely on the redirect to the successUrl for fulfilling
        // purchases, customers may not always reach the success_url after
        // a successful payment.
        // Instead use one of the strategies described in
        // https://stripe.com/docs/payments/checkout/fulfillment
        successUrl: '${STRIPE.SUCCESS_URL}',
        cancelUrl: '${STRIPE.CANCELED_URL}',
      })
      .then(function (result) {
        if (result.error) {
          
          var displayError = document.getElementById('error-message');
          displayError.textContent = result.error.message;
        }
        window.close()
      });
      </script>
      </body>
  </html>
  `
*/
