document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".filter");
  const listingContainer = document.querySelector(".row");

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
            <div class="card">
              <a href="/listing/${list._id}" class="listing-link">
                <img src="${list.image?.url || '/images/default.jpg'}"
                  class="card-img-top"
                  alt="listing image"
                  style="height:20rem">
                <div class="card-body">
                  <p class="card-text">
                    <b>${list.title}</b><br>
                    ₹${list.price.toLocaleString('en-IN')} per night
                  </p>
                </div>
              </a>
            </div>
          `)
          .join("");

      } catch (err) {
        console.error("Error fetching filtered listings:", err);
      }
    });
  });
});
