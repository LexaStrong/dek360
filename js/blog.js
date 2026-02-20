/* ===== DEK360 — Blog Page Logic ===== */

document.addEventListener('DOMContentLoaded', () => {
    injectNav('blog');
    injectFooter();

    const POSTS_PER_PAGE = 6;
    let currentPage = 1;
    let currentCategory = 'All';

    // Check URL for category filter
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) currentCategory = catParam;

    function getPosts() {
        return JSON.parse(localStorage.getItem('dek360_posts') || '[]')
            .filter(p => p.published)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    function filterPosts(posts) {
        if (currentCategory === 'All') return posts;
        return posts.filter(p => p.category === currentCategory);
    }

    function renderPosts() {
        const allPosts = getPosts();
        const filtered = filterPosts(allPosts);
        const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        const pagePosts = filtered.slice(start, start + POSTS_PER_PAGE);

        const grid = document.getElementById('blogGrid');
        if (pagePosts.length === 0) {
            grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:var(--sp-3xl); color:var(--clr-text-muted);">No posts yet. Check back soon!</div>';
        } else {
            grid.innerHTML = pagePosts.map(p => `
        <a href="post.html?id=${p.id}" class="card" style="text-decoration:none; color:inherit;">
          <div class="card-image">
            <img src="${p.image}" alt="${p.title}" loading="lazy">
            <span class="card-category">${p.category}</span>
          </div>
          <div class="card-body">
            <h3>${p.title}</h3>
            <p>${truncate(p.excerpt, 100)}</p>
            <div class="card-meta">
              <span>${formatDate(p.date)}</span>
              <span>Read more →</span>
            </div>
          </div>
        </a>
      `).join('');
        }

        // Update filter tabs active state
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.cat === currentCategory);
        });

        // Pagination
        const pag = document.getElementById('pagination');
        if (totalPages <= 1) {
            pag.innerHTML = '';
            return;
        }
        let pagHTML = `<button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">← Prev</button>`;
        for (let i = 1; i <= totalPages; i++) {
            pagHTML += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        }
        pagHTML += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">Next →</button>`;
        pag.innerHTML = pagHTML;
    }

    window.changePage = (page) => {
        currentPage = page;
        renderPosts();
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    window.filterByCategory = (cat) => {
        currentCategory = cat;
        currentPage = 1;
        renderPosts();
    };

    renderPosts();
});
