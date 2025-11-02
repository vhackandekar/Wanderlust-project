document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".filter");
  const listingContainer = document.querySelector(".row");

  // Check if elements exist before adding event listeners
  if (filters.length > 0 && listingContainer) {
    filters.forEach((filter) => {
      filter.addEventListener("click", async () => {
        // Remove active state from others
        filters.forEach((f) => f.classList.remove("active"));
        filter.classList.add("active");

        const category = filter.dataset.category;

        try {
          // Fetch filtered listings
          const res = await fetch(`/listing/filter?category=${category}`);
          const listings = await res.json();

          // Replace listing cards dynamically
          listingContainer.innerHTML = listings
            .map((list) => `
              <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card h-100">
                  <a href="/listing/${list._id}" class="listing-link">
                    <img src="${list.image?.url || '/images/default.jpg'}"
                      class="card-img-top"
                      alt="listing image">
                    <div class="card-body d-flex flex-column">
                      <p class="card-text flex-grow-1">
                        <b>${list.title}</b><br>
                        ₹${list.price ? list.price.toLocaleString('en-IN') : 'N/A'} per night
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            `)
            .join("");

        } catch (err) {
          console.error("Error fetching filtered listings:", err);
        }
      });
    });
  }
  
  // Add touch support for mobile devices
  const touchSupported = 'ontouchstart' in window;
  if (touchSupported) {
    document.body.classList.add('touch-device');
  }
});