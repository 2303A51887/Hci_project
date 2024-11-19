// Function to handle form submission
const propertyForm = document.getElementById('property-form');
propertyForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get form data
  const formData = new FormData(event.target);
  const propertyData = Object.fromEntries(formData.entries());

  // Simulate posting the property
  postProperty(propertyData);

  // Reset the form
  event.target.reset();
});

// Function to simulate posting the property
function postProperty(propertyData) {
  // Simulate sending the data to the server
  console.log('Posting property:', propertyData);

  // Display a success message or redirect the user
  alert('Property posted successfully!');
}