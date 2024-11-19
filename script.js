// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const locationDropdown = document.querySelector(".location-dropdown");
const propertyTypeButtons = document.querySelectorAll(".property-type-btn");
const localityTags = document.querySelectorAll(".locality-tag");
const exploreButton = document.querySelector(".explore-btn");

// Enhanced State Management
const state = {
  currentLocation: "Warangal",
  currentPropertyType: "rent", // Default to rent
  isSearching: false,
  locations: ["Hyderabad", "Warangal", "Mumbai", "Delhi", "Bangalore", "Chennai", "Pune"],
  propertyTypes: ["buy", "rent", "plots"],
  pageRedirects: {
    Warangal: {
      rent: {
        "Naimnagar": "WarangalRent.html",
        "Ku-cross": "WarangalRent.html",
        "Warangal": "WarangalRent.html",
        "Hanmakonda": "WarangalRent.html",
        "Kazipet": "WarangalRent.html"
      },
      buy: {
        "Naimnagar": "WarangalBuy.html",
        "Ku-cross": "WarangalBuy.html",
        "Warangal": "WarangalBuy.html",
        "Hanmakonda": "WarangalBuy.html",
        "Kazipet": "WarangalBuy.html"
      },
      plots: {
        "Naimnagar": "WarangalPlots.html",
        "Ku-cross": "WarangalPlots.html",
        "Warangal": "WarangalPlots.html",
        "Hanmakonda": "WarangalPlots.html",
        "Kazipet": "WarangalPlots.html"
      }
    },
    Hyderabad: {
      rent: {
        "Hyderabad": "HydRent.html",
        "kukatpally": "HydRent.html",
        "Ghatkesar": "HydRent.html",
        "Kukatpally": "HydRent.html", // Added capitalized version
        "Kompally": "HydRent.html",
        "Miyapur": "HydRent.html"
      },
      buy: {
        "Hyderabad": "HydBuy.html",
        "kukatpally": "HydBuy.html",
        "Ghatkesar": "HydBuy.html",
        "Kukatpally": "HydBuy.html", // Added capitalized version
        "Kompally": "HydBuy.html",
        "Miyapur": "HydBuy.html"
      },
      plots: {
        "Hyderabad": "HydPlots.html",
        "kukatpally": "HydPlots.html",
        "Ghatkesar": "HydPlots.html",
        "Kukatpally": "HydPlots.html", // Added capitalized version
        "Kompally": "HydPlots.html",
        "Miyapur": "HydPlots.html"
      }
    }
  }
};

// Enhanced Property Type Selection
propertyTypeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const propertyType = button.dataset.type;
    if (propertyType === state.currentPropertyType) return;

    // Update UI
    propertyTypeButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    // Update state
    state.currentPropertyType = propertyType;
    
    // If there's a search query, update results
    const searchQuery = searchInput.value.trim();
    if (searchQuery) {
      handleSearch();
    }
  });
});

// Enhanced Search Functionality
function handleSearch() {
  if (state.isSearching) return;

  const searchQuery = searchInput.value.trim();
  if (!searchQuery) {
    alert("Please enter a locality to search");
    return;
  }

  state.isSearching = true;
  searchButton.classList.add("searching");

  // Get redirect URL based on current selection
  const redirectUrl = getRedirectUrl(state.currentLocation, searchQuery);
  
  setTimeout(() => {
    console.log(`Searching in ${state.currentLocation} for: ${searchQuery}`);
    console.log(`Property type: ${state.currentPropertyType}`);

    state.isSearching = false;
    searchButton.classList.remove("searching");

    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      alert("Please select a valid location and locality combination.");
    }
  }, 1000);
}

// Helper function to get redirect URL
function getRedirectUrl(location, locality) {
  const locationPages = state.pageRedirects[location];
  if (!locationPages) return null;

  const propertyTypePages = locationPages[state.currentPropertyType];
  if (!propertyTypePages) return null;

  return propertyTypePages[locality] || null;
}

// Property Type Selection
function handlePropertyTypeChange(propertyType) {
  console.log(`Switching to ${propertyType} properties`);
  state.currentPropertyType = propertyType;
  
  // If there's already a search query, update results
  const searchQuery = searchInput.value.trim();
  if (searchQuery) {
    handleSearch();
  }
}

// Enhanced Locality Selection
function handleLocalitySelect(locality) {
  console.log(`Selected locality: ${locality}`);
  searchInput.value = locality;
  
  const redirectUrl = getRedirectUrl(state.currentLocation, locality);
  
  if (redirectUrl) {
    window.location.href = redirectUrl;
  } else {
    alert("Please select a valid location and locality combination.");
  }
}

// Initialize Locality Tags
function initializeLocalityTags() {
  const container = document.querySelector(".localities-container");

  localityTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      const locality = tag.textContent.replace("→", "").trim();
      handleLocalitySelect(locality);
    });
  });

  // Scroll handling
  let isScrolling = false;
  let startX, scrollLeft;

  container.addEventListener("mousedown", (e) => {
    isScrolling = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.style.cursor = "grabbing";
  });

  container.addEventListener("mousemove", (e) => {
    if (!isScrolling) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  });

  container.addEventListener("mouseup", () => {
    isScrolling = false;
    container.style.cursor = "grab";
  });

  container.addEventListener("mouseleave", () => {
    isScrolling = false;
    container.style.cursor = "grab";
  });
}

// Scroll Animation for Header
function initializeScrollHeader() {
  const header = document.querySelector("header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("scroll-up");
      return;
    }

    if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
      header.classList.remove("scroll-up");
      header.classList.add("scroll-down");
    } else if (currentScroll < lastScroll && header.classList.contains("scroll-down")) {
      header.classList.remove("scroll-down");
      header.classList.add("scroll-up");
    }

    lastScroll = currentScroll;
  });
}

// Event Listeners
locationDropdown.addEventListener("click", (e) => {
  e.stopPropagation();
  if (locationDropdownMenu.classList.contains("hidden")) {
    showLocationDropdown();
  } else {
    hideLocationDropdown();
  }
});

document.addEventListener("click", (e) => {
  if (!locationDropdown.contains(e.target)) {
    hideLocationDropdown();
  }
});

searchButton.addEventListener("click", handleSearch);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});

propertyTypeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const propertyType = button.dataset.type;
    if (propertyType === state.currentPropertyType) return;

    // Update UI
    propertyTypeButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    // Update state and trigger search
    handlePropertyTypeChange(propertyType);
  });
});

exploreButton.addEventListener("click", () => {
  console.log("Exploring Mega Utsav deals");
  window.location.href = "mega-utsav.html";
});

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeLocalityTags();
  initializeScrollHeader();
});