/* ===== DEK360 — Blog Page Logic ===== */

document.addEventListener('DOMContentLoaded', () => {
    injectNav('blog');
    injectFooter();

    const POSTS_PER_PAGE = 6;
    let currentPage = 1;
    let currentCategory = 'All';
    let searchQuery = '';

    // Check URL for category filter
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) currentCategory = catParam;

    // Set active tab if category was set via URL
    if (catParam) {
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.cat === catParam);
        });
    }

    function getPosts() {
        return JSON.parse(localStorage.getItem('dek360_posts') || '[]')
            .filter(p => p.published)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    function filterPosts(posts) {
        let result = posts;
        if (currentCategory !== 'All') {
            result = result.filter(p => p.category === currentCategory);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            result = result.filter(p =>
                p.title.toLowerCase().includes(q) ||
                (p.excerpt || '').toLowerCase().includes(q)
            );
        }
        return result;
    }

    function renderPosts() {
        const allPosts = getPosts();
        const filtered = filterPosts(allPosts);
        const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
        if (currentPage > totalPages) currentPage = 1;
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        const pagePosts = filtered.slice(start, start + POSTS_PER_PAGE);

        const grid = document.getElementById('blogGrid');
        if (pagePosts.length === 0) {
            grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:var(--sp-3xl); color:var(--clr-text-muted);">' +
                (searchQuery ? `No posts found for "<strong>${searchQuery}</strong>".` : 'No posts yet. Check back soon!') +
                '</div>';
        } else {
            grid.innerHTML = pagePosts.map(p => `
        <a href="post.html?id=${p.id}" class="card" style="text-decoration:none; color:inherit;">
          <div class="card-image">
            <img src="${p.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600'}" alt="${p.title}" loading="lazy">
            <span class="card-category">${p.category}</span>
          </div>
          <div class="card-body">
            <h3>${p.title}</h3>
            <p>${truncate(p.excerpt, 110)}</p>
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

    window.onBlogSearch = (val) => {
        searchQuery = val;
        currentPage = 1;
        renderPosts();
    };

    renderPosts();
});
