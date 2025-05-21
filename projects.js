// projects.js
// Handles filtering, searching, and pagination for the projects page

document.addEventListener('DOMContentLoaded', function () {
  const cards = Array.from(document.querySelectorAll('.project-card'));
  const filterBar = document.getElementById('projectFilterBar');
  const searchInput = document.getElementById('projectSearchInput');
  const loadMoreBtn = document.getElementById('loadMoreProjectsBtn');
  const cardsPerPage = 9;
  let currentFilter = 'all';
  let currentSearch = '';
  let currentPage = 1;

  // Helper: filter and search
  function getFilteredCards() {
    return cards.filter(card => {
      const matchesCategory = currentFilter === 'all' || card.dataset.category === currentFilter;
      const matchesSearch = card.textContent.toLowerCase().includes(currentSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  // Helper: show cards for current page
  function showCards() {
    cards.forEach(card => card.style.display = 'none');
    const filtered = getFilteredCards();
    filtered.slice(0, currentPage * cardsPerPage).forEach(card => card.style.display = 'block');
    // Show/hide Load More
    if (filtered.length > currentPage * cardsPerPage) {
      loadMoreBtn.style.display = 'inline-block';
    } else {
      loadMoreBtn.style.display = 'none';
    }
    // If no results
    if (filtered.length === 0) {
      if (!document.getElementById('noProjectsMsg')) {
        const msg = document.createElement('div');
        msg.id = 'noProjectsMsg';
        msg.className = 'text-center text-muted my-5';
        msg.innerText = 'No projects found.';
        document.getElementById('projectsGrid').appendChild(msg);
      }
    } else {
      const msg = document.getElementById('noProjectsMsg');
      if (msg) msg.remove();
    }
  }

  // Filter bar click
  filterBar.addEventListener('click', function (e) {
    if (e.target.matches('button[data-filter]')) {
      filterBar.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      currentPage = 1;
      showCards();
    }
  });

  // Search input
  searchInput.addEventListener('input', function () {
    currentSearch = this.value;
    currentPage = 1;
    showCards();
  });

  // Load More button
  loadMoreBtn.addEventListener('click', function () {
    currentPage++;
    showCards();
  });

  // Initial display
  showCards();
}); 