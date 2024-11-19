// Dummy data for saved properties
const savedProperties = [
    {
      id: 1,
      image: 'https://media.gettyimages.com/id/128502214/photo/classic-turn-of-the-century-american-house.jpg?s=612x612&w=0&k=20&c=CYuyGZw8DfXzjSD2Ue6IIPbJ5IwXPMDGsnfpWYrJQZg=',
      title: 'Apartment in Warangal',
      details: '2 BHK, 1200 sq ft, ₹50 lakhs'
    },
    {
      id: 2,
      image: 'https://housing-images.n7net.in/4f2250e8/347387fb1ae278e32842490c64e5803d/v0/fs/tech_homes-patancheru-hyderabad-sri_aditya_squares.jpeg',
      title: 'House in Naimnagar',
      details: '3 BHK, 2000 sq ft, ₹80 lakhs'
    },
    {
      id: 3,
      image: 'https://housing-images.n7net.in/01c16c28/088a0897b72175e61810ccd48e661a16/v0/fs/3_bhk_apartment-for-sale-nizampet-Hyderabad-others.jpg',
      title: 'Plot in Ku-cross',
      details: '500 sq yards, ₹35 lakhs'
    }
  ];
  
  // Function to render saved properties
  function renderSavedProperties() {
    const propertyGrid = document.getElementById('property-grid');
  
    savedProperties.forEach(property => {
      const propertyCard = document.createElement('div');
      propertyCard.classList.add('property-card');
  
      const img = document.createElement('img');
      img.src = property.image;
      img.alt = property.title;
  
      const content = document.createElement('div');
      content.classList.add('content');
  
      const title = document.createElement('h3');
      title.textContent = property.title;
  
      const details = document.createElement('p');
      details.textContent = property.details;
  
      const actions = document.createElement('div');
      actions.classList.add('property-actions');
  
      const viewDetailsLink = document.createElement('a');
      viewDetailsLink.href = '#';
      viewDetailsLink.textContent = 'View Details';
  
      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-from-saved');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => removeProperty(property.id));
  
      actions.appendChild(viewDetailsLink);
      actions.appendChild(removeButton);
  
      content.appendChild(title);
      content.appendChild(details);
      content.appendChild(actions);
  
      propertyCard.appendChild(img);
      propertyCard.appendChild(content);
  
      propertyGrid.appendChild(propertyCard);
    });
  }
  
  // Function to remove a property from the saved list
  function removeProperty(id) {
    // Remove the property from the savedProperties array
    const index = savedProperties.findIndex(property => property.id === id);
    if (index !== -1) {
      savedProperties.splice(index, 1);
    }
  
    // Re-render the saved properties
    const propertyGrid = document.getElementById('property-grid');
    propertyGrid.innerHTML = '';
    renderSavedProperties();
  }
  
  // Initialize the page
  renderSavedProperties();