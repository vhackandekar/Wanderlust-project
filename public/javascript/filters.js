document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".filter");
  const listingsContainer = document.querySelector(".row");

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
          listingsContainer.innerHTML = `<p>No listings found for this category.</p>`;
          return;
        }

        listings.forEach(list => {
          const card = `
            <div class="card">
              <a href="/listing/${list._id}" class="listing-link">
                <img src="${list.image.url}" class="card-img-top" alt="listing image" style="height:20rem">
                <div class="card-body">
                  <p class="card-text"><b>${list.title}</b><br>₹${list.price} per night</p>
                </div>
              </a>
            </div>
          `;
          listingsContainer.insertAdjacentHTML("beforeend", card);
        });

      } catch (err) {
        console.error("Error fetching filtered listings:", err);
      }
    });
  });
});
