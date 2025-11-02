document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".filter");
  const listingsContainer = document.querySelector(".row");

  // Check if elements exist before adding event listeners
  if (filters.length > 0 && listingsContainer) {
    filters.forEach(filter => {
      filter.addEventListener("click", async () => {
        const category = filter.dataset.category;

        filters.forEach(f => f.classList.remove("active"));
        filter.classList.add("active");

        try {
          const res = await fetch(`/listing/filter?category=${encodeURIComponent(category)}`);
          if (!res.ok) throw new Error("Network response was not ok");

          const result = await res.json();
          const listings = result.data || [];

          listingsContainer.innerHTML = "";

          if (listings.length === 0) {
            listingsContainer.innerHTML = `<div class="col-12"><p class="text-center">No listings found for this category.</p></div>`;
            return;
          }

          listings.forEach(list => {
            const card = `
              <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card h-100">
                  <a href="/listing/${list._id}" class="listing-link">
                    <img src="${list.image.url}" class="card-img-top" alt="listing image">
                    <div class="card-body d-flex flex-column">
                      <p class="card-text flex-grow-1">
                        <b>${list.title}</b><br>
                        ₹${list.price.toLocaleString('en-IN')} per night
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            `;
            listingsContainer.insertAdjacentHTML("beforeend", card);
          });

        } catch (err) {
          console.error("Error fetching filtered listings:", err);
          listingsContainer.innerHTML = `<div class="col-12"><p class="text-center text-danger">Error loading listings. Please try again.</p></div>`;
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