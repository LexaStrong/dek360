// DEK360 Ghana — Main Application JavaScript
// SPA Router & UI Logic

(function () {
  'use strict';

  /* ==========================================
     STATE
     ========================================== */
  const state = {
    currentPage: 'home',
    currentCategory: null,
    currentSlug: null,
    theme: localStorage.getItem('dek360-theme') || 'light',
    sidebarOpen: false,
    searchOpen: false,
    mobileTab: 'home',          // home | discover | bookmark | profile
    mobileArticle: null,        // slug of article open in mobile detail view
    mobileDiscoverCat: 'All',   // active chip in discover
    bookmarks: JSON.parse(localStorage.getItem('dek360-bookmarks') || '[]'),
    history: [], // For back button
  };

  /* ==========================================
     THEME
     ========================================== */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    state.theme = theme;
    localStorage.setItem('dek360-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }

  function toggleTheme() {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  }

  /* ==========================================
     HELPERS
     ========================================== */
  function isMobile() { return window.innerWidth <= 640; }

  function renderBackButton(style = '') {
    return `
      <button class="back-btn" onclick="goBack()" style="${style}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back
      </button>
    `;
  }

  function toggleBookmark(slug) {
    const idx = state.bookmarks.indexOf(slug);
    if (idx === -1) {
      state.bookmarks.push(slug);
      showToast('🔖 Article bookmarked!');
    } else {
      state.bookmarks.splice(idx, 1);
      showToast('🗑 Bookmark removed.');
    }
    localStorage.setItem('dek360-bookmarks', JSON.stringify(state.bookmarks));
  }

  /* ==========================================
     ROUTER
     ========================================== */
  function navigate(page, params = {}) {
    // Save current state to history before changing
    state.history.push({
      page: state.currentPage,
      category: state.currentCategory,
      slug: state.currentSlug
    });

    state.currentPage = page;
    state.currentCategory = params.category || null;
    state.currentSlug = params.slug || null;

    // On mobile: article navigation opens full-screen overlay
    if (isMobile() && page === 'article' && params.slug) {
      state.mobileArticle = params.slug;
      renderMobileArticleDetail();
      return;
    }

    // Robust SPA Category & Home Filtering (Desktop)
    const canDoSPA = !isMobile() && (page === 'category' || page === 'home') && document.querySelector('.main-layout');
    if (canDoSPA) {
      const contentMain = document.querySelector('.content-main');
      const layout = document.querySelector('.main-layout');

      if (contentMain && layout) {
        contentMain.style.opacity = '0';
        // Remove existing right sidebar if it exists to be replaced or removed
        const existingRight = layout.querySelector('.sidebar-right');
        if (existingRight) existingRight.style.opacity = '0';

        setTimeout(() => {
          if (page === 'home') {
            const featured = getFeaturedArticles();
            const latest = getAllArticles(8);
            const related = DEK360_DATA.articles.slice(0, 3);
            const trending = DEK360_DATA.trendingVideos.slice(0, 3);

            contentMain.innerHTML = `
              ${state.history.length > 0 ? renderBackButton('margin-top:24px; margin-bottom: 8px;') : ''}
              ${renderBreadcrumb(['Home'])}
              <div class="section-header"><h2 class="section-title"><span class="section-title-accent">LIVE</span> Latest News</h2></div>
              ${featured.length > 0 ? renderHeroGrid(featured) : ''}
              <div class="section-header" style="margin-top:28px"><h2 class="section-title">${featured[0]?.category || 'Top Story'}</h2></div>
              ${featured[0] ? renderFeaturedCard(featured[0]) : ''}
              <div class="section-header" style="margin-top:32px"><h2 class="section-title">Recent Stories</h2><a class="see-all-link" href="#" onclick="event.preventDefault(); navigateTo('magazine')">See all ›</a></div>
              <div class="news-grid">${latest.slice(2, 8).map(renderNewsCard).join('')}</div>
              <div class="section-header" style="margin-top:36px"><h2 class="section-title">🎬 Trending Videos</h2><a class="see-all-link" href="#" onclick="event.preventDefault(); navigateTo('video')">View All ›</a></div>
              <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:16px; margin-bottom:8px;">
                ${trending.map(v => renderVideoMiniCard(v)).join('')}
              </div>
            `;
            // Update or add right sidebar
            if (existingRight) {
              existingRight.outerHTML = renderRightSidebar(related);
            } else {
              layout.insertAdjacentHTML('beforeend', renderRightSidebar(related));
            }
          } else {
            const cat = state.currentCategory;
            const articles = getArticlesByCategory(cat);
            const total = articles.length;
            const related = articles.slice(0, 3);
            const catColors = { Politics: '#e53935', National: '#3b82f6', International: '#8b5cf6', Business: '#f59e0b', Finance: '#10b981', Health: '#ef4444', Technology: '#0ea5e9', Entertainment: '#ec4899', Sports: '#16a34a', Culture: '#d97706', Defense: '#6366f1', Media: '#db2777', Jobs: '#059669', Energy: '#eab308', Kids: '#f97316', Regulation: '#7c3aed' };
            const color = catColors[cat] || '#e53935';

            contentMain.innerHTML = `
              ${renderBackButton('margin-top:24px;')}
              ${renderBreadcrumb(['Home', 'Category', cat])}
              <div class="category-page-header" style="background: linear-gradient(135deg, ${color} 0%, ${color}cc 100%); margin-top:24px;">
                <h1 class="category-page-title">${cat}</h1>
                <p class="category-page-count">${total} article${total !== 1 ? 's' : ''} in this category</p>
              </div>
              ${total === 0 ? `
                <div style="text-align:center; padding:60px 20px; color:var(--text-muted);">
                  <div style="font-size:3rem; margin-bottom:16px;">📰</div>
                  <p style="font-size:1.1rem; font-weight:600;">No articles yet in ${cat}</p>
                </div>
              ` : `
                <div class="news-grid">${articles.map(renderNewsCard).join('')}</div>
              `}
            `;
            // Update or add right sidebar
            if (existingRight) {
              existingRight.outerHTML = renderRightSidebar(related);
            } else {
              layout.insertAdjacentHTML('beforeend', renderRightSidebar(related));
            }
          }
          contentMain.style.opacity = '1';
          const newRight = layout.querySelector('.sidebar-right');
          if (newRight) {
            newRight.style.opacity = '0';
            void newRight.offsetWidth;
            newRight.style.opacity = '1';
          }
        }, 150);
      }

      // Update sidebar active state
      document.querySelectorAll('.category-item').forEach(el => {
        el.classList.toggle('active', el.dataset.cat === state.currentCategory);
      });
      document.querySelectorAll('.nav-link').forEach(el => {
        el.classList.toggle('active', el.dataset.page === page);
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(el => {
      el.classList.remove('active');
      if (el.dataset.page === page) el.classList.add('active');
    });

    // Update category sidebar
    document.querySelectorAll('.category-item').forEach(el => {
      el.classList.remove('active');
      if (el.dataset.cat === state.currentCategory) el.classList.add('active');
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    renderPage();
  }

  function goBack() {
    if (state.history.length === 0) {
      navigate('home');
      return;
    }
    const prevState = state.history.pop();
    state.currentPage = prevState.page;
    state.currentCategory = prevState.category;
    state.currentSlug = prevState.slug;

    if (isMobile() && state.mobileArticle) {
      closeMobileArticle();
    }

    renderPage();
  }

  window.goBack = goBack;

  /* ==========================================
     RENDER DISPATCH
     ========================================== */
  function renderPage() {
    const app = document.getElementById('app');
    app.classList.remove('page-content');
    void app.offsetWidth; // Reflow for animation
    app.classList.add('page-content');

    // On mobile, route to mobile page system
    if (isMobile()) {
      renderMobilePage(app);
      return;
    }

    switch (state.currentPage) {
      case 'home': renderHome(app); break;
      case 'video': renderVideoPage(app); break;
      case 'pools': renderPoolsPage(app); break;
      case 'magazine': renderMagazinePage(app); break;
      case 'category': renderCategoryPage(app); break;
      case 'article': renderArticlePage(app); break;
      default: renderHome(app);
    }
  }

  /* ==========================================
     MOBILE PAGE SYSTEM
     ========================================== */
  function renderMobilePage(container) {
    window.scrollTo(0, 0);
    switch (state.mobileTab) {
      case 'discover': renderMobileDiscover(container); break;
      case 'categories': renderMobileCategories(container); break;
      case 'profile': renderMobileProfile(container); break;
      default: renderMobileHome(container);
    }

    // Add mobile footer
    container.innerHTML += renderMobileFooter();
  }

  function renderMobileFooter() {
    return `
      <footer class="mob-footer">
        <img src="logo.png" class="mob-footer-logo" alt="DEK360" />
        <p class="mob-footer-desc">DEK360 Ghana is your premier source for national news, politics, and culture. Delivering balanced and insightful reporting since 2026.</p>
        <div class="mob-footer-links">
          <a href="#" class="mob-footer-link" onclick="event.preventDefault(); navigateTo('home')">Home</a>
          <a href="#" class="mob-footer-link" onclick="event.preventDefault(); navigateTo('magazine')">Magazine</a>
          <a href="#" class="mob-footer-link" onclick="event.preventDefault(); navigateTo('pools')">Pools</a>
        </div>
        <div class="mob-footer-bottom">
          © 2026 DEK360 Ghana. All rights reserved.
        </div>
      </footer>
    `;
  }

  /* ---- Mobile Home ---- */
  function renderMobileHome(container) {
    const articles = getAllArticles();
    const breaking = articles.slice(0, 3);
    const recommendations = articles.slice(3, 10);
    const activeIdx = state.mobileHeroIdx || 0;
    const cats = ['All', ...DEK360_DATA.categories];
    const activeCat = state.mobileDiscoverCat || 'All';

    container.innerHTML = `
      <div class="mob-home">
        <!-- Back Button & Header -->
        <div style="display:flex; align-items:center; gap:16px; margin: 16px;">
          <button class="mob-back-btn" onclick="goBack()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div style="font-size:1.4rem; font-weight:800; font-family:'Playfair Display', serif;">DEK360 Ghana</div>
        </div>

        <!-- Breaking News Header -->
        <div class="mob-section-header">
          <span class="mob-section-title">Breaking News</span>
          <span class="mob-see-all" onclick="navigateTo('magazine')">View all</span>
        </div>

        <!-- Breaking Hero -->
        <div class="mob-breaking-card" onclick="openMobileArticle('${breaking[activeIdx]?.slug}')">
          <img src="${breaking[activeIdx]?.image}" alt="${breaking[activeIdx]?.title}" loading="lazy" />
          <div class="mob-breaking-overlay">
            <span class="article-tag">${breaking[activeIdx]?.tag || breaking[activeIdx]?.category}</span>
            <div class="mob-breaking-title">${breaking[activeIdx]?.title}</div>
            <div class="mob-breaking-source" style="margin-top:8px;">
              <span style="opacity:0.8;">${breaking[activeIdx]?.author} &bull; ${breaking[activeIdx]?.readTime}</span>
            </div>
          </div>
        </div>

        <!-- Hero Indicators -->
        <div class="mob-dot-indicator">
          ${breaking.map((_, i) => `
            <div class="mob-dot ${i === activeIdx ? 'active' : ''}" 
                 onclick="event.stopPropagation(); state.mobileHeroIdx=${i}; renderMobileHome(document.getElementById('app'))"></div>
          `).join('')}
        </div>

        <!-- Horizontal Category Chips -->
        <div class="mob-section-header" style="margin-top:16px;">
          <span class="mob-section-title">Categories</span>
        </div>
        <div class="mob-cat-chips" style="display:flex; overflow-x:auto; gap:10px; padding:0 16px 16px; scrollbar-width:none;">
          ${cats.map(c => `
            <div class="mob-cat-chip ${activeCat === c ? 'active' : ''}" 
                 onclick="state.mobileDiscoverCat='${c}'; setMobileTab('discover')"
                 style="flex-shrink:0; padding:10px 20px; border-radius:32px; font-size:0.85rem; font-weight:600; background:${activeCat === c ? 'var(--accent-red)' : 'var(--bg-primary)'}; color:${activeCat === c ? '#fff' : 'var(--text-secondary)'}; border: 1px solid var(--border);">
              ${c}
            </div>
          `).join('')}
        </div>

        <!-- Recommendation Section -->
        <div class="mob-section-header" style="margin-top:16px;">
          <span class="mob-section-title">Recommendation</span>
          <span class="mob-see-all" onclick="navigateTo('magazine')">View all</span>
        </div>

        <div class="mob-rec-list">
          ${recommendations.map(a => `
            <div class="mob-rec-item" onclick="openMobileArticle('${a.slug}')">
              <img class="mob-rec-img" src="${a.thumbnail || a.image}" alt="${a.title}" loading="lazy" />
              <div class="mob-rec-content">
                <div class="mob-rec-cat">${a.category}</div>
                <div class="mob-rec-title" style="font-size:0.92rem; font-weight:700;">${a.title}</div>
                <div class="mob-rec-meta">
                  <div class="mob-author-avatar">${a.author.charAt(0)}</div>
                  <span>${a.author} &bull; ${a.date}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        ${renderPagination('home')}
      </div>
    `;
  }

  /* ---- Mobile Discover ---- */
  function renderMobileDiscover(container) {
    const cats = ['All', ...DEK360_DATA.categories];
    const category = state.mobileDiscoverCat || 'All';
    const articles = category === 'All'
      ? getAllArticles()
      : getArticlesByCategory(category);

    // Simple pagination for demo
    const page = state.mobDiscoverPage || 1;
    const perPage = 6;
    const paginated = articles.slice((page - 1) * perPage, page * perPage);

    container.innerHTML = `
      <div class="mob-discover">
        <div style="display:flex; align-items:center; gap:16px; margin: 16px;">
          <button class="mob-back-btn" onclick="goBack()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div style="font-size:1.4rem; font-weight:800; font-family:'Playfair Display', serif;">Discover</div>
        </div>

        <div class="mob-discover-header" style="padding-top:0;">
          <div class="mob-discover-sub">News from all around the world</div>
        </div>

        <div class="mob-discover-search" onclick="openSearch()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span style="font-size:1rem; margin-left:8px;">Search</span>
          <div class="mob-discover-filter" style="margin-left:auto;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
          </div>
        </div>

        <div class="mob-cat-chips" style="display:flex; overflow-x:auto; gap:10px; padding:0 16px 16px; scrollbar-width:none;">
          ${cats.map(c => `
            <div class="mob-cat-chip ${category === c ? 'active' : ''}" 
                 onclick="state.mobileDiscoverCat='${c}'; state.mobDiscoverPage=1; renderMobilePage(document.getElementById('app'))"
                 style="flex-shrink:0; padding:10px 20px; border-radius:32px; font-size:0.85rem; font-weight:600; background:${category === c ? 'var(--accent-red)' : 'var(--bg-primary)'}; color:${category === c ? '#fff' : 'var(--text-secondary)'}; border: 1px solid var(--border);">
              ${c}
            </div>
          `).join('')}
        </div>

        <div class="mob-discover-list" style="padding:0 16px;">
          ${paginated.map(a => `
            <div class="mob-rec-item" onclick="openMobileArticle('${a.slug}')" style="margin-bottom:16px;">
              <img class="mob-rec-img" src="${a.thumbnail || a.image}" alt="${a.title}" />
              <div class="mob-rec-content">
                <div class="mob-rec-cat">${a.category}</div>
                <div class="mob-rec-title" style="font-size:0.92rem; font-weight:700;">${a.title}</div>
                <div class="mob-rec-meta">
                  <div class="mob-author-avatar">${a.author.charAt(0)}</div>
                  <span>${a.author} &bull; ${a.date}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        ${renderPagination('discover', articles.length, page, perPage)}
      </div>
    `;
  }

  function renderPagination(type, total = 0, current = 1, perPage = 6) {
    if (type === 'home') return ''; // Design doesn't show pagination on home recommendations, but we can add if needed.

    const maxPage = Math.ceil(total / perPage);
    if (maxPage <= 1) return '';

    return `
      <div class="mob-pagination">
        <button class="mob-page-btn" ${current === 1 ? 'disabled' : ''} 
                onclick="state.mobDiscoverPage=${current - 1}; renderMobilePage(document.getElementById('app'))">Prev</button>
        <span class="mob-page-info">Page ${current} of ${maxPage}</span>
        <button class="mob-page-btn" ${current === maxPage ? 'disabled' : ''} 
                onclick="state.mobDiscoverPage=${current + 1}; renderMobilePage(document.getElementById('app'))">Next</button>
      </div>
    `;
  }

  /* ---- Mobile Article Detail ---- */
  function renderMobileArticleDetail() {
    const article = getArticleBySlug(state.mobileArticle);
    if (!article) return;

    document.getElementById('mob-article-overlay')?.remove();

    const isBookmarked = state.bookmarks.includes(article.slug);

    const overlay = document.createElement('div');
    overlay.id = 'mob-article-overlay';
    overlay.className = 'mob-article-wrap';
    overlay.innerHTML = `
      <div class="mob-article-hero">
        <img src="${article.image}" alt="${article.title}" />
        <div class="mob-article-hero-overlay"></div>
        <div class="mob-article-top-bar">
          <button class="mob-back-btn" onclick="closeMobileArticle()" aria-label="Back" style="background:rgba(255,255,255,0.25); backdrop-filter:blur(8px); border:none; color:#fff;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div class="mob-top-actions">
            <button class="mob-top-btn" onclick="toggleMobileBookmark('${article.slug}')" id="mobBmBtn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="${isBookmarked ? 'white' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
            <button class="mob-top-btn" onclick="shareArticle('${article.slug}')">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="mob-article-body">
        <span class="article-tag" style="background:var(--accent-red); color:#fff; display:inline-block; padding:4px 12px; border-radius:20px; font-size:0.7rem; font-weight:700; margin-bottom:12px;">${article.tag || article.category}</span>
        <h1 style="font-size:1.52rem; font-weight:800; line-height:1.2; margin-bottom:16px; font-family:'Playfair Display', serif;">${article.title}</h1>
        
        <div class="mob-article-source" style="margin-bottom:24px;">
          <div class="mob-src-logo" style="background:var(--accent-red);">${article.author.charAt(0)}</div>
          <div style="flex:1;">
            <div style="display:flex; align-items:center; gap:4px; font-weight:700; font-size:0.95rem;">
              DEK360 Ghana <span style="color:#1877f2; font-size:0.8rem;">✓</span>
            </div>
            <div style="font-size:0.78rem; color:var(--text-muted);">${article.date} &bull; ${article.readTime}</div>
          </div>
        </div>

        <div class="mob-article-text" style="font-size:1.05rem; line-height:1.6; color:var(--text-secondary);">
          ${article.body.split('\n\n').map(p => p.trim() ? `<p style="margin-bottom:20px;">${p.trim()}</p>` : '').join('')}
        </div>

        <button class="mob-page-btn" onclick="closeMobileArticle()" style="width:100%; margin-top:32px; padding:14px; border-radius:16px;">
          Back to list
        </button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
  }

  function closeMobileArticle() {
    document.getElementById('mob-article-overlay')?.remove();
    document.body.style.overflow = '';
    state.mobileArticle = null;
  }

  function openMobileArticle(slug) {
    state.mobileArticle = slug;
    renderMobileArticleDetail();
  }

  function toggleMobileBookmark(slug) {
    toggleBookmark(slug);
    // Re-render the bookmark icon
    const btn = document.getElementById('mobBmBtn');
    if (btn) {
      const isBm = state.bookmarks.includes(slug);
      btn.querySelector('svg')?.setAttribute('fill', isBm ? 'white' : 'none');
    }
  }

  function setMobileDiscoverCat(cat) {
    state.mobileDiscoverCat = cat;
    renderMobileDiscover(document.getElementById('app'));
  }

  window.openMobileArticle = openMobileArticle;
  window.closeMobileArticle = closeMobileArticle;
  window.toggleMobileBookmark = toggleMobileBookmark;
  window.setMobileDiscoverCat = setMobileDiscoverCat;

  /* ==========================================
     HOME PAGE
     ========================================== */
  function renderHome(container) {
    const featured = getFeaturedArticles();
    const latest = getAllArticles(8);
    const related = DEK360_DATA.articles.slice(0, 3);
    const trending = DEK360_DATA.trendingVideos.slice(0, 3);

    container.innerHTML = `
      <div class="page-wrapper">
        <div class="main-layout">
          ${renderSidebar()}
          <main class="content-main">
            ${state.history.length > 0 ? renderBackButton('margin-top:24px; margin-bottom: 8px;') : ''}
            ${renderBreadcrumb(['Home'])}
            <div class="section-header">
              <h2 class="section-title">
                <span class="section-title-accent">LIVE</span>
                Latest News
              </h2>
            </div>

            <!-- Hero -->
            ${featured.length > 0 ? renderHeroGrid(featured) : ''}

            <!-- Featured Article -->
            <div class="section-header" style="margin-top:28px">
              <h2 class="section-title">${featured[0]?.category || 'Top Story'}</h2>
            </div>
            ${featured[0] ? renderFeaturedCard(featured[0]) : ''}

            <!-- Latest Articles -->
            <div class="section-header" style="margin-top:32px">
              <h2 class="section-title">Recent Stories</h2>
              <a class="see-all-link" href="#" onclick="event.preventDefault(); navigateTo('magazine')">
                See all ›
              </a>
            </div>
            <div class="news-grid">
              ${latest.slice(2, 8).map(renderNewsCard).join('')}
            </div>

            <!-- Trending Videos Preview -->
            <div class="section-header" style="margin-top:36px">
              <h2 class="section-title">🎬 Trending Videos</h2>
              <a class="see-all-link" href="#" onclick="event.preventDefault(); navigateTo('video')">
                View All ›
              </a>
            </div>
            <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:16px; margin-bottom:8px;">
              ${trending.map(v => renderVideoMiniCard(v)).join('')}
            </div>
          </main>
          ${renderRightSidebar(related)}
        </div>
        ${renderFooter()}
      </div>
    `;

    attachHandlers();
  }

  function renderHeroGrid(articles) {
    const [main, ...subs] = articles;
    return `
      <div class="hero-grid">
        <div class="hero-main" onclick="navigateTo('article', {slug:'${main.slug}'})">
          <img src="${main.image}" alt="${main.title}" loading="lazy" />
          <div class="hero-overlay">
            <span class="article-tag">${main.tag}</span>
            <h1 class="hero-title">${main.title}</h1>
            <div class="hero-meta">
              <span>👁 ${main.views}</span>
              <span>📅 ${main.date}</span>
              <span>⏱ ${main.readTime}</span>
            </div>
          </div>
        </div>
        ${subs.slice(0, 2).map(a => `
          <div class="sub-hero-card" onclick="navigateTo('article', {slug:'${a.slug}'})">
            <img src="${a.image}" alt="${a.title}" loading="lazy" />
            <div class="sub-hero-overlay">
              <span class="article-tag" style="font-size:0.62rem; padding:2px 8px;">${a.tag}</span>
              <p class="sub-hero-title">${a.title}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderFeaturedCard(article) {
    return `
      <div class="featured-article" onclick="navigateTo('article', {slug:'${article.slug}'})">
        <img class="featured-article-image" src="${article.image}" alt="${article.title}" loading="lazy" />
        <div class="featured-article-body">
          <span class="article-tag">${article.tag}</span>
          <h2 class="featured-title">${article.title}</h2>
          <div class="article-meta">
            <span class="article-meta-item">✍️ ${article.author}</span>
            <span class="article-meta-item">📅 ${article.date}</span>
            <span class="article-meta-item">👁 ${article.views}</span>
            <span class="article-meta-item">🔁 ${article.shares}</span>
            <span class="article-meta-item">⏱ ${article.readTime}</span>
          </div>
          <p class="article-excerpt">${article.headline}</p>
          <div class="article-actions">
            <button class="btn-action btn-action-primary" onclick="event.stopPropagation(); navigateTo('article', {slug:'${article.slug}'})">
              📖 Read Full Story
            </button>
            <button class="btn-action btn-action-secondary" onclick="event.stopPropagation(); shareArticle('${article.slug}')">
              📤 Share on Media
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================
     VIDEO PAGE
     ========================================== */
  function renderVideoPage(container) {
    const videos = DEK360_DATA.trendingVideos;
    container.innerHTML = `
      <div class="page-wrapper">
        <div class="video-page-wrap">
          ${renderBackButton('margin-bottom:24px;')}
          ${renderBreadcrumb(['Home', 'Video'])}
          <div class="section-header" style="margin-bottom:28px">
            <h1 class="section-title" style="font-size:1.8rem;">
              🎬 Trending Videos from DEK360 Ghana
            </h1>
          </div>
          <p style="color:var(--text-secondary); margin-bottom:32px; font-size:0.95rem;">
            Watch the latest and most popular videos from 
            <a href="https://youtube.com/@DEK360GHANA" target="_blank" rel="noopener" style="color:var(--accent-red); font-weight:600;">@DEK360GHANA</a>
            — Ghana's go-to YouTube channel with 173K subscribers.
          </p>
          <div class="trending-videos-grid">
            ${videos.map(v => renderVideoCard(v)).join('')}
          </div>
          <div style="text-align:center; margin-top:40px;">
            <a href="https://youtube.com/@DEK360GHANA" target="_blank" rel="noopener"
              class="btn-action btn-action-primary" 
              style="display:inline-flex; gap:8px; padding:14px 28px; border-radius:40px; text-decoration:none; font-size:1rem;">
              🎬 Visit DEK360Ghana on YouTube
            </a>
          </div>
        </div>
        ${renderFooter()}
      </div>
    `;
    attachHandlers();
  }

  function renderVideoCard(video) {
    return `
      <div class="video-card">
        <div class="video-embed-wrap">
          <iframe 
            src="https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1"
            title="${video.title}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy">
          </iframe>
        </div>
        <div class="video-card-body">
          <span class="badge badge-red" style="margin-bottom:8px;">${video.category}</span>
          <p class="video-card-title">${video.title}</p>
          <div class="video-card-meta">
            <span>👁 ${video.views} views</span>
            <span>⏱ ${video.duration}</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderVideoMiniCard(video) {
    return `
      <div class="video-card" onclick="navigateTo('video')">
        <div class="video-embed-wrap">
          <iframe 
            src="https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1"
            title="${video.title}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy">
          </iframe>
        </div>
        <div class="video-card-body">
          <p class="video-card-title">${video.title}</p>
          <div class="video-card-meta">
            <span>👁 ${video.views}</span>
            <span>⏱ ${video.duration}</span>
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================
     CATEGORY PAGE
     ========================================== */
  function renderCategoryPage(container) {
    const cat = state.currentCategory;
    const articles = getArticlesByCategory(cat);
    const total = articles.length;

    // Color map for categories
    const catColors = {
      Politics: '#e53935', National: '#3b82f6', International: '#8b5cf6',
      Business: '#f59e0b', Finance: '#10b981', Health: '#ef4444',
      Technology: '#0ea5e9', Entertainment: '#ec4899', Sports: '#16a34a',
      Culture: '#d97706', Defense: '#6366f1', Media: '#db2777',
      Jobs: '#059669', Energy: '#eab308', Kids: '#f97316', Regulation: '#7c3aed'
    };
    const color = catColors[cat] || '#e53935';

    const related = articles.slice(0, 3);
    container.innerHTML = `
      <div class="page-wrapper">
        <div class="main-layout">
          ${renderSidebar()}
          <main class="content-main">
            ${renderBackButton('margin-top:24px;')}
            ${renderBreadcrumb(['Home', 'Category', cat])}
            <div class="category-page-header" style="background: linear-gradient(135deg, ${color} 0%, ${color}cc 100%); margin-top:24px;">
              <h1 class="category-page-title">${cat}</h1>
              <p class="category-page-count">${total} article${total !== 1 ? 's' : ''} in this category</p>
            </div>

            ${total === 0 ? `
              <div style="text-align:center; padding:60px 20px; color:var(--text-muted);">
                <div style="font-size:3rem; margin-bottom:16px;">📰</div>
                <p style="font-size:1.1rem; font-weight:600;">No articles yet in ${cat}</p>
                <p style="font-size:0.9rem; margin-top:8px;">Check back soon for the latest ${cat} news.</p>
              </div>
            ` : `
              <div class="news-grid">
                ${articles.map(renderNewsCard).join('')}
              </div>
            `}
          </main>
          ${renderRightSidebar(related)}
        </div>
        ${renderFooter()}
      </div>
    `;
    attachHandlers();
  }

  /* ==========================================
     ARTICLE PAGE
     ========================================== */
  function renderArticlePage(container) {
    const article = getArticleBySlug(state.currentSlug);
    if (!article) {
      container.innerHTML = `
        <div class="page-wrapper">
          <div class="article-page">
            <div style="text-align:center; padding:80px 20px; color:var(--text-muted);">
              <div style="font-size:3rem; margin-bottom:16px;">🔍</div>
              <h2 style="margin-bottom:8px;">Article Not Found</h2>
              <p style="margin-bottom:24px;">The article you're looking for doesn't exist or has been moved.</p>
              <button class="btn-action btn-action-primary" onclick="navigateTo('home')">
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      `;
      return;
    }

    const related = DEK360_DATA.articles.filter(a => a.category === article.category && a.slug !== article.slug).slice(0, 3);

    container.innerHTML = `
      <div class="page-wrapper">
        <div style="max-width:1200px; margin:0 auto; padding:24px 24px 0;">
          ${renderBackButton()}
          ${renderBreadcrumb(['Home', article.category, 'Article'])}
        </div>

        <div class="article-page">
          <span class="article-tag" style="margin-bottom:16px; display:inline-block;">${article.tag}</span>
          <h1 class="article-title-main">${article.title}</h1>
          <p style="font-size:1.05rem; color:var(--text-secondary); margin-bottom:20px; line-height:1.7; font-style:italic;">${article.headline}</p>

          <div class="article-info-bar">
            <div class="article-author-info">
              <div class="author-avatar">${article.author.charAt(0)}</div>
              <div>
                <div class="author-name">${article.author}</div>
                <div class="article-date">${article.date} · ${article.readTime}</div>
              </div>
            </div>
            <div class="article-stats">
              <div class="article-stat">👁 <strong>${article.views}</strong></div>
              <div class="article-stat">🔁 <strong>${article.shares}</strong></div>
            </div>
          </div>

          <img class="article-header-img" src="${article.image}" alt="${article.title}" loading="lazy" />

          <div class="article-body">
            ${article.body.split('\n\n').map(p => p.trim() ? `<p>${p.trim()}</p>` : '').join('')}
          </div>

          <div class="article-share" style="margin-top:40px; padding-top:20px; border-top:1px solid var(--border);">
            <span class="share-label" style="font-weight:700; display:block; margin-bottom:16px;">Share this story:</span>
            <div style="display:flex; gap:16px;">
              <button class="share-btn" onclick="window.open('https://facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href))" style="display:flex; align-items:center; gap:10px; padding:12px 24px; background:#1877f2; color:#fff; border:none; border-radius:12px; font-weight:700; cursor:pointer; font-size:1rem;">
                f Facebook
              </button>
              <button class="share-btn" onclick="window.open('https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=' + encodeURIComponent(window.location.href))" style="display:flex; align-items:center; gap:10px; padding:12px 24px; background:#000; color:#fff; border:none; border-radius:12px; font-weight:700; cursor:pointer; font-size:1rem;">
                𝕏 Twitter
              </button>
              <button class="share-btn" onclick="copyLink()" style="display:flex; align-items:center; gap:10px; padding:12px 24px; background:var(--bg-card); color:var(--text-primary); border:1px solid var(--border); border-radius:12px; font-weight:700; cursor:pointer; font-size:1rem;">
                🔗 Copy Link
              </button>
            </div>
          </div>

          ${related.length > 0 ? `
            <div style="margin-top:48px;">
              <h3 class="section-title" style="margin-bottom:20px;">More from ${article.category}</h3>
              <div class="news-grid">
                ${related.map(renderNewsCard).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        ${renderFooter()}
      </div>
    `;
    attachHandlers();
  }

  /* ==========================================
     POOLS PAGE
     ========================================== */
  function renderPoolsPage(container) {
    const polls = [
      {
        id: 'p1',
        question: 'Who do you think will win the next Ghanaian general election?',
        options: [
          { label: 'NDC (John Mahama)', votes: 1240 },
          { label: 'NPP (New Candidate)', votes: 890 },
          { label: 'Third Party', votes: 210 },
          { label: 'Undecided', votes: 330 },
        ]
      },
      {
        id: 'p2',
        question: 'Which issue do you think Ghana\'s government should prioritize most in 2026?',
        options: [
          { label: '💡 Fix the Economy', votes: 2100 },
          { label: '🏥 Improve Healthcare', votes: 890 },
          { label: '📚 Education Reform', votes: 760 },
          { label: '🌿 Fight Corruption', votes: 1450 },
        ]
      },
      {
        id: 'p3',
        question: 'Should Ghana invest more in renewable energy?',
        options: [
          { label: '✅ Absolutely Yes', votes: 3200 },
          { label: '🤔 Maybe, with conditions', votes: 540 },
          { label: '❌ Not a priority now', votes: 210 },
        ]
      },
      {
        id: 'p4',
        question: 'Who is Ghana\'s greatest sportsperson of all time?',
        options: [
          { label: '⚽ Abedi Pele', votes: 1800 },
          { label: '⚽ Michael Essien', votes: 1200 },
          { label: '⚽ Asamoah Gyan', votes: 1560 },
          { label: '🥊 Azumah Nelson', votes: 980 },
        ]
      },
    ];

    container.innerHTML = `
      <div class="page-wrapper">
        <div class="pools-page-wrap">
          ${renderBackButton('margin-bottom:24px;')}
          ${renderBreadcrumb(['Home', 'Polls'])}
          <div class="section-header" style="margin-bottom:28px">
            <h1 class="section-title" style="font-size:1.8rem;">📊 Ghana Polls</h1>
          </div>
          <p style="color:var(--text-secondary); margin-bottom:32px; font-size:0.95rem;">Have your say on the issues that matter most to Ghana. Vote in our weekly polls and see how your opinion compares.</p>
          
          ${polls.map(poll => renderPoll(poll)).join('')}
        </div>
        ${renderFooter()}
      </div>
    `;
    attachHandlers();

    // Attach poll click handlers
    document.querySelectorAll('.poll-option').forEach(option => {
      option.addEventListener('click', function () {
        const pollId = this.closest('.poll-card').dataset.pollId;
        const allOptions = this.closest('.poll-card').querySelectorAll('.poll-option');
        const prevVoted = localStorage.getItem('poll_' + pollId);
        if (prevVoted) {
          showToast('You have already voted in this poll!');
          return;
        }
        localStorage.setItem('poll_' + pollId, 'voted');
        this.classList.add('voted');
        allOptions.forEach(opt => { opt.style.pointerEvents = 'none'; });
        showToast('✅ Your vote has been recorded!');
      });
    });
  }

  function renderPoll(poll) {
    const total = poll.options.reduce((s, o) => s + o.votes, 0);
    return `
      <div class="poll-card" data-poll-id="${poll.id}">
        <p class="poll-question">${poll.question}</p>
        ${poll.options.map(opt => {
      const pct = Math.round((opt.votes / total) * 100);
      return `
            <div class="poll-option ${localStorage.getItem('poll_' + poll.id) ? 'voted' : ''}">
              <div class="poll-fill" style="width: ${pct}%"></div>
              <span class="poll-option-label">${opt.label}</span>
              <span class="poll-option-pct">${pct}%</span>
            </div>
          `;
    }).join('')}
        <div class="poll-meta">
          <span>📊 ${total.toLocaleString()} votes</span>
          <span>⏳ Closes Sunday</span>
        </div>
      </div>
    `;
  }

  /* ==========================================
     MAGAZINE PAGE
     ========================================== */
  function renderMagazinePage(container) {
    const articles = getAllArticles();
    container.innerHTML = `
      <div class="page-wrapper">
        <div class="video-page-wrap">
          ${renderBackButton('margin-bottom:24px;')}
          ${renderBreadcrumb(['Home', 'Magazine'])}
          <div class="section-header" style="margin-bottom:28px">
            <h1 class="section-title" style="font-size:1.8rem;">📰 DEK360 Magazine</h1>
          </div>
          <p style="color:var(--text-secondary); margin-bottom:32px; font-size:0.95rem;">In-depth stories, features, and analysis covering everything Ghana.</p>
          
          <div class="magazine-grid">
            ${articles.map(a => `
              <div class="magazine-card" onclick="navigateTo('article', {slug:'${a.slug}'})">
                <img class="magazine-card-img" src="${a.thumbnail || a.image}" alt="${a.title}" loading="lazy" />
                <div class="magazine-card-body">
                  <div class="magazine-category">${a.category}</div>
                  <h3 class="magazine-title">${a.title}</h3>
                  <p class="magazine-excerpt">${a.headline}</p>
                  <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted);">
                    <span>${a.date}</span>
                    <span>⏱ ${a.readTime}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        ${renderFooter()}
      </div>
    `;
    attachHandlers();
  }

  /* ==========================================
     SHARED COMPONENTS
     ========================================== */
  function renderSidebar() {
    const categories = DEK360_DATA.categories;
    const profileImg = `https://yt3.googleusercontent.com/JRzuQi2cRm_MNFiJVsGTKYn2a_aGcDuLLi3QUzMhUkWZwXkNEGT2aJaRvhRXoJRQv5Jvy9-h=s88-c-k-c0x00ffffff-no-rj`;
    return `
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-profile">
          <img class="profile-avatar" src="${profileImg}" alt="DEK360 Ghana" 
               onerror="this.src='https://ui-avatars.com/api/?name=DEK360&background=e53935&color=fff&size=44'" />
          <div>
            <div class="profile-name">DEK360 Ghana</div>
            <div class="profile-sub">173K Subscribers</div>
          </div>
        </div>
        <div class="sidebar-section-title">Category</div>
        <div class="category-nav">
          ${categories.map(cat => `
            <button class="category-item ${state.currentCategory === cat ? 'active' : ''}" 
                    data-cat="${cat}"
                    onclick="navigateTo('category', {category:'${cat}'})">
              <span class="category-dot"></span>
              ${cat}
            </button>
          `).join('')}
        </div>
      </aside>
    `;
  }

  function renderRightSidebar(articles) {
    return `
      <aside class="sidebar-right">
        <div class="right-panel">
          <div class="section-header" style="margin-bottom:8px;">
            <h3 style="font-size:1rem; font-weight:700;">Related News</h3>
            <a class="see-all-link" href="#" onclick="event.preventDefault(); navigateTo('magazine')">See all</a>
          </div>
          ${articles.map(a => `
            <div class="related-card" onclick="navigateTo('article', {slug:'${a.slug}'})">
              <img class="related-img" src="${a.thumbnail || a.image}" alt="${a.title}" loading="lazy" />
              <div class="related-content">
                <span class="badge badge-red">${a.tag}</span>
                <p class="related-title">${a.title}</p>
                <div class="related-meta">
                  <span>👁 ${a.views}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Channel Widget -->
        <div class="right-panel">
          <h3 style="font-size:0.9rem;font-weight:700; margin-bottom:12px;">🎬 DEK360 on YouTube</h3>
          <p style="font-size:0.8rem; color:var(--text-secondary); line-height:1.6; margin-bottom:12px;">
            Subscribe to @DEK360GHANA for the latest videos from Ghana — culture, news, entertainment and more.
          </p>
          <a href="https://youtube.com/@DEK360GHANA" target="_blank" rel="noopener"
            style="display:block; text-align:center; background:#ff0000; color:#fff; padding:10px; border-radius:8px; font-size:0.82rem; font-weight:700; transition:opacity 0.2s;"
            onmouseover="this.style.opacity=0.85" onmouseout="this.style.opacity=1">
            ▶ Subscribe on YouTube
          </a>
        </div>
      </aside>
    `;
  }

  function renderNewsCard(article) {
    return `
      <div class="news-card" onclick="navigateTo('article', {slug:'${article.slug}'})">
        <img class="news-card-img" src="${article.thumbnail || article.image}" alt="${article.title}" loading="lazy" />
        <div class="news-card-body">
          <span class="badge badge-red" style="margin-bottom:8px;">${article.category}</span>
          <h3 class="news-card-title">${article.title}</h3>
          <p class="news-card-excerpt">${article.headline}</p>
          <div class="news-card-footer">
            <span>📅 ${article.date}</span>
            <span>⏱ ${article.readTime}</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderBreadcrumb(items) {
    return `
      <div class="breadcrumb">
        ${items.map((item, i) => i === items.length - 1
      ? `<span class="breadcrumb-current">${item}</span>`
      : `<a href="#" onclick="event.preventDefault(); navigateTo('${item.toLowerCase()}')" style="transition:color 0.2s;" onmouseover="this.style.color='var(--accent-red)'" onmouseout="this.style.color=''">${item}</a><span class="breadcrumb-sep">›</span>`
    ).join('')}
      </div>
    `;
  }

  function renderFooter() {
    return `
      <footer class="footer">
        <div class="footer-inner">
          <div>
            <div class="footer-brand">
              <div class="nav-logo" style="font-size:1.2rem;">
                <div class="logo-icon">DEK</div>
                DEK360 Ghana
              </div>
            </div>
            <p class="footer-desc">
              Immerse yourself in Ghana's vibrant culture, rich traditions, and irresistible cuisine. 
              Discover hidden gems, exciting events, and fascinating stories.
            </p>
            <div class="social-links" style="margin-top:16px;">
              <a class="social-link" href="https://www.youtube.com/@DEK360GHANA" target="_blank" rel="noopener" title="YouTube — @DEK360GHANA">▶</a>
              <a class="social-link" href="https://www.facebook.com/DEK360Ghana" target="_blank" rel="noopener" title="Facebook — DEK360Ghana">f</a>
              <a class="social-link" href="https://twitter.com/DEK360Ghana" target="_blank" rel="noopener" title="Twitter / X — @DEK360Ghana">𝕏</a>
              <a class="social-link" href="https://www.instagram.com/dek360ghana" target="_blank" rel="noopener" title="Instagram — @dek360ghana">📷</a>
            </div>
          </div>
          <div>
            <h4 class="footer-col-title">Navigation</h4>
            <a class="footer-link" href="#" onclick="event.preventDefault(); navigateTo('home')">Home</a>
            <a class="footer-link" href="#" onclick="event.preventDefault(); navigateTo('video')">Video</a>
            <a class="footer-link" href="#" onclick="event.preventDefault(); navigateTo('pools')">Pools</a>
            <a class="footer-link" href="#" onclick="event.preventDefault(); navigateTo('magazine')">Magazine</a>
          </div>
          <div>
            <h4 class="footer-col-title">Categories</h4>
            ${DEK360_DATA.categories.slice(0, 7).map(cat => `
              <a class="footer-link" href="#" onclick="event.preventDefault(); navigateTo('category', {category:'${cat}'})">${cat}</a>
            `).join('')}
          </div>
          <div>
            <h4 class="footer-col-title">More</h4>
            ${DEK360_DATA.categories.slice(7, 14).map(cat => `
              <a class="footer-link" href="#" onclick="event.preventDefault(); navigateTo('category', {category:'${cat}'})">${cat}</a>
            `).join('')}
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 DEK360 Ghana. All rights reserved.</span>
          <span>Made by CalexDev</span>
          <a href="https://youtube.com/@DEK360GHANA" target="_blank" rel="noopener" style="color:var(--accent-red); font-weight:600;">@DEK360GHANA</a>
        </div>
      </footer>
    `;
  }

  /* ==========================================
     ATTACH EVENT HANDLERS
     ========================================== */
  function attachHandlers() {
    const hamburger = document.getElementById('navHamburger');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');

    if (hamburger) {
      hamburger.onclick = () => {
        state.sidebarOpen = !state.sidebarOpen;
        hamburger.classList.toggle('active', state.sidebarOpen);
        if (sidebar) {
          sidebar.classList.toggle('mobile-open', state.sidebarOpen);
          sidebar.innerHTML = `
            <div class="sidebar-header" style="justify-content: space-between; align-items: center; display: flex; padding: 20px;">
              <span style="font-weight:700; font-size:1.2rem;">Menu</span>
              <button onclick="document.getElementById('navHamburger').click()" style="font-size:1.5rem; background:none; border:none; color:var(--text-primary);">✕</button>
            </div>
            <div class="sidebar-menu" style="padding: 0 20px;">
              <a href="#" class="sidebar-link" onclick="event.preventDefault(); navigateTo('home')">🏠 Home</a>
              <a href="#" class="sidebar-link" onclick="event.preventDefault(); navigateTo('video')">📺 Video</a>
              <a href="#" class="sidebar-link" onclick="event.preventDefault(); navigateTo('pools')">📊 Pools</a>
              <a href="#" class="sidebar-link" onclick="event.preventDefault(); navigateTo('magazine')">📖 Magazine</a>
              <hr style="border:none; border-top:1px solid var(--border); margin: 20px 0;">
              <div style="font-weight:700; font-size:0.9rem; color:var(--text-muted); margin-bottom:12px; text-transform:uppercase;">Categories</div>
              ${DEK360_DATA.categories.map(cat => `
                <a href="#" class="sidebar-link" onclick="event.preventDefault(); navigateTo('category', {category:'${cat}'})">${cat}</a>
              `).join('')}
            </div>
          `;
        }
        backdrop?.classList.toggle('active', state.sidebarOpen);
      };
    }

    if (backdrop) {
      backdrop.onclick = () => {
        state.sidebarOpen = false;
        hamburger?.classList.remove('active');
        sidebar?.classList.remove('mobile-open');
        backdrop.classList.remove('active');
      };
    }
  }

  /* ==========================================
     SEARCH
     ========================================== */
  function openSearch() {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) {
      overlay.classList.add('active');
      document.getElementById('searchInput')?.focus();
      state.searchOpen = true;
    }
  }

  function closeSearch() {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) {
      overlay.classList.remove('active');
      state.searchOpen = false;
    }
  }

  function handleSearch(query) {
    const results = document.getElementById('searchResults');
    if (!results) return;
    if (!query.trim()) { results.innerHTML = ''; return; }

    const matches = DEK360_DATA.articles.filter(a =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.headline.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6);

    if (matches.length === 0) {
      results.innerHTML = `<p style="padding:12px; color:var(--text-muted); font-size:0.85rem;">No results found for "${query}"</p>`;
      return;
    }

    results.innerHTML = matches.map(a => `
      <div class="search-result-item" onclick="closeSearch(); navigateTo('article', {slug:'${a.slug}'})">
        <img class="search-result-img" src="${a.thumbnail || a.image}" alt="${a.title}" />
        <div>
          <p class="search-result-title">${a.title}</p>
          <p class="search-result-cat">${a.category} · ${a.date}</p>
        </div>
      </div>
    `).join('');
  }

  /* ==========================================
     UTILITIES
     ========================================== */
  function showToast(msg) {
    let toast = document.getElementById('globalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'globalToast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast('🔗 Link copied to clipboard!');
    }).catch(() => {
      showToast('📋 Copy failed — please copy manually.');
    });
  }

  function shareArticle(slug) {
    const article = getArticleBySlug(slug);
    if (navigator.share && article) {
      navigator.share({ title: article.title, text: article.headline, url: window.location.href });
    } else {
      showToast('📤 Use the share buttons to share this story!');
    }
  }

  /* ==========================================
     GLOBAL EXPORTS
     ========================================== */
  window.navigateTo = function (page, params = {}) {
    navigate(page, params);
  };

  window.closeSearch = closeSearch;
  window.openSearch = openSearch;
  window.handleSearch = handleSearch;
  window.shareArticle = shareArticle;
  window.copyLink = copyLink;
  window.toggleTheme = toggleTheme;

  /* ==========================================
     INIT
     ========================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // Sort categories alphabetically for consistency across all views
    if (typeof DEK360_DATA !== 'undefined' && DEK360_DATA.categories) {
      DEK360_DATA.categories.sort((a, b) => a.localeCompare(b));
    }

    // Apply saved theme
    applyTheme(state.theme);

    // Inject mobile components
    if (isMobile()) {
      // Bottom nav removed as per request
    }

    // Search overlay events
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn) searchBtn.addEventListener('click', openSearch);

    // Fix: Re-attach mobile specific navbar handlers
    attachMobileNavbarHandlers();

    if (searchOverlay) {
      searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) closeSearch();
      });
    }
    if (searchInput) {
      searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSearch();
      });
    }

    // Theme toggle
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    // Keyboard shortcut: Ctrl+K for search
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape' && state.searchOpen) closeSearch();
    });

    // Re-render on viewport resize (mobile <-> desktop transition)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        renderPage();
      }, 200);
    });

    // Render initial page
    renderPage();

    // Fade out loader
    const loader = document.querySelector('.logo-loader-wrap');
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }, 10000); // User requested 10 seconds
    }
  });

  function attachMobileNavbarHandlers() {
    if (!isMobile()) return;

    const burgerBtn = document.getElementById('burgerBtn');
    const mobile = document.getElementById('mobile');

    if (burgerBtn && mobile) {
      burgerBtn.onclick = () => {
        mobile.classList.toggle('navigation');
      };
    }

    // Add search icon to mobile navbar (Notification removed)
    const navInner = document.querySelector('.nav-inner');
    if (navInner && !navInner.querySelector('.mob-nav-right')) {
      const right = document.createElement('div');
      right.className = 'mob-nav-right';
      right.innerHTML = `
        <div class="mob-nav-icon" onclick="openSearch()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
      `;
      navInner.appendChild(right);
    }

    // Sidebar/Menu content
    const sidebar = document.getElementById('sidebar');
    if (sidebar) renderSidebarContent(sidebar);
  }

  function renderSidebarContent(container) {
    container.innerHTML = `
      <div class="sidebar-header" style="justify-content: space-between; align-items: center; display: flex; padding: 20px;">
        <span style="font-weight:700; font-size:1.2rem;">Navigation</span>
        <button onclick="document.getElementById('burgerBtn').click()" style="font-size:1.5rem; background:none; border:none; color:var(--text-primary);">✕</button>
      </div>
      <div class="sidebar-menu" style="padding: 0 20px;">
        <a href="#" id="demo1" class="sidebar-link ${state.mobileTab === 'home' ? 'active' : ''}" onclick="event.preventDefault(); switchNavTab('home', 'demo1')">🏠 Home</a>
        <a href="#" id="demo2" class="sidebar-link ${state.mobileTab === 'discover' ? 'active' : ''}" onclick="event.preventDefault(); switchNavTab('discover', 'demo2')">🔍 Discover</a>
        <a href="#" id="demo3" class="sidebar-link ${state.mobileTab === 'magazine' ? 'active' : ''}" onclick="event.preventDefault(); switchNavTab('magazine', 'demo3')">📖 Magazine</a>
        
        <hr style="border:none; border-top:1px solid var(--border); margin: 20px 0;">
        <div style="font-weight:700; font-size:0.9rem; color:var(--text-muted); margin-bottom:12px; text-transform:uppercase;">Categories</div>
        ${DEK360_DATA.categories.map(cat => `
          <a href="#" class="sidebar-link" onclick="event.preventDefault(); navigateTo('category', {category:'${cat}'})">${cat}</a>
        `).join('')}
      </div>
    `;
  }

  function switchNavTab(tab, demoId) {
    const mobile = document.getElementById('mobile');
    const demoButtons = ['demo1', 'demo2', 'demo3'];

    // Remove active from all demo buttons
    demoButtons.forEach(id => {
      document.getElementById(id)?.classList.remove('active');
    });

    // Add active to clicked one
    document.getElementById(demoId)?.classList.add('active');

    // Update mobile container classes
    mobile.classList.add(demoId);
    demoButtons.filter(id => id !== demoId).forEach(id => mobile.classList.remove(id));
    mobile.classList.remove('navigation');

    // Page state logic
    if (tab === 'magazine') {
      navigateTo('magazine');
    } else {
      setMobileTab(tab);
    }
  }

  function setMobileTab(tab) {
    state.mobileTab = tab;
    state.mobileArticle = null;
    document.getElementById('mob-article-overlay')?.remove();
    document.body.style.overflow = '';

    renderPage();
  }

  window.setMobileTab = setMobileTab;
  window.switchNavTab = switchNavTab;

})();
