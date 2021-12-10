// This should already be set in the user's local storage.
// I did not want to include it in the checkout.js file so
// there wouldn't be any accidental copy/paste errors where
// localStorage would always be set to delivery. Exists for 
// testing only - LM
localStorage.setItem("activeDeliveryChannel", "delivery");

localStorage.setItem("localDevEnv", "true");