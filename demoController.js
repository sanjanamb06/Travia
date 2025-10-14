// Demo controller for showcasing features without database
const mockListings = require('./mockData.js');

module.exports.indexDemo = async (req, res) => {
  try {
    let { search, country, minPrice, maxPrice, sortBy } = req.query;
    
    // Start with all mock listings
    let filteredListings = [...mockListings];
    
    // Search functionality
    if (search && search.trim()) {
      const searchTerm = search.toLowerCase();
      filteredListings = filteredListings.filter(listing => 
        listing.title.toLowerCase().includes(searchTerm) ||
        listing.description.toLowerCase().includes(searchTerm) ||
        listing.location.toLowerCase().includes(searchTerm) ||
        listing.country.toLowerCase().includes(searchTerm)
      );
    }
    
    // Country filter
    if (country && country.trim() && country !== 'all') {
      filteredListings = filteredListings.filter(listing => 
        listing.country.toLowerCase().includes(country.toLowerCase())
      );
    }
    
    // Price range filter
    if (minPrice) {
      filteredListings = filteredListings.filter(listing => 
        listing.price >= parseInt(minPrice)
      );
    }
    if (maxPrice) {
      filteredListings = filteredListings.filter(listing => 
        listing.price <= parseInt(maxPrice)
      );
    }
    
    // Sorting
    switch (sortBy) {
      case 'price-low':
        filteredListings.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredListings.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Mock newest (reverse order)
        filteredListings.reverse();
        break;
      case 'oldest':
        // Keep original order
        break;
      default:
        // Default to newest
        filteredListings.reverse();
    }
    
    // Get unique countries for filter dropdown
    const countries = [...new Set(mockListings.map(listing => listing.country))];
    
    // Search statistics
    const totalListings = mockListings.length;
    const filteredCount = filteredListings.length;
    
    res.render("listings/index.ejs", { 
      allListings: filteredListings, 
      countries,
      searchParams: req.query,
      totalListings,
      filteredCount
    });
  } catch (error) {
    console.error('Error in demo listings:', error);
    res.render("listings/index.ejs", { 
      allListings: mockListings, 
      countries: ['India'],
      searchParams: {},
      totalListings: mockListings.length,
      filteredCount: mockListings.length
    });
  }
};

module.exports.showDemo = async (req, res) => {
  let { id } = req.params;
  const showListing = mockListings.find(listing => listing._id === id);
  
  if (!showListing) {
    return res.status(404).send('Listing not found');
  }
  
  // Mock reviews, owner data, and geometry for maps
  showListing.reviews = [];
  showListing.owner = { username: 'demo-user' };
  showListing.geometry = {
    coordinates: [77.2090, 28.6139] // Delhi coordinates as default
  };
  
  res.render("listings/show.ejs", { showListing });
};

// API endpoint for search functionality
module.exports.searchAPIDemo = async (req, res) => {
  try {
    let { search, country, minPrice, maxPrice, sortBy, limit = 20 } = req.query;
    
    // Use the same filtering logic as indexDemo
    let filteredListings = [...mockListings];
    
    // Apply all filters (same logic as above)
    if (search && search.trim()) {
      const searchTerm = search.toLowerCase();
      filteredListings = filteredListings.filter(listing => 
        listing.title.toLowerCase().includes(searchTerm) ||
        listing.description.toLowerCase().includes(searchTerm) ||
        listing.location.toLowerCase().includes(searchTerm) ||
        listing.country.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply other filters and sorting...
    // (same logic as indexDemo)
    
    // Limit results
    filteredListings = filteredListings.slice(0, parseInt(limit));
    
    res.json({
      listings: filteredListings,
      total: mockListings.length,
      filtered: filteredListings.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
};

module.exports.createDemo = (req, res) => {
  res.send('<h1>Demo Mode - Create listing form would be here</h1>');
};