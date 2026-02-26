/**
 * DEK360 Ghana — Main Application
 * Clean Slate Rebuild
 */

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
    articles: [], // Live articles from Supabase
    youtubeVideos: [], // Live videos from YouTube
    isInitialLoad: true,
    videoLimit: 12,
    homeArticleLimit: 5,
    sliderIndex: 0
  };

  /* ==========================================
     INITIALIZATION & SYNC
     ========================================== */
  async function init() {
    applyTheme(state.theme);

    // Set static data as fallback immediately so app renders
    state.articles = DEK360_DATA.articles;

    // Background Sync (Non-blocking init)
    syncSupabaseArticles().then(() => {
      console.log('Supabase sync complete');
      if (['home', 'category', 'article', 'search'].includes(state.currentPage)) render();
    });

    fetchLatestYouTubeVideos().then(() => {
      console.log('YouTube sync complete');
      if (state.currentPage === 'video') render();
    });

    state.isInitialLoad = false;

    // Initial Route
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page') || 'home';
    const slug = params.get('slug');
    const cat = params.get('cat');

    navigateTo(page, { slug, category: cat });
    initGlobalUI();

    // Start Hero Slider Auto-advance
    setInterval(() => {
      if (state.currentPage === 'home') {
        const featuredCount = Math.min(getFeaturedArticles().length, 5);
        if (featuredCount > 1) {
          moveSlider(1);
        }
      }
    }, 6000);

    // Handle Browser Back/Forward navigation
    window.addEventListener('popstate', () => {
      const p = new URLSearchParams(window.location.search);
      state.currentPage = p.get('page') || 'home';
      state.currentSlug = p.get('slug');
      state.currentCategory = p.get('cat');
      render();
    });
  }

  function initGlobalUI() {
    // Theme Toggle
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const next = state.theme === 'light' ? 'dark' : 'light';
        applyTheme(next);
        themeBtn.innerText = next === 'light' ? '🌙' : '☀️';
      });
      themeBtn.innerText = state.theme === 'light' ? '🌙' : '☀️';
    }

    // Hamburger Menu
    const burgerBtn = document.getElementById('burgerBtn');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');

    if (burgerBtn && sidebar && backdrop) {
      const toggleMenu = () => {
        const isActive = sidebar.classList.toggle('active');
        backdrop.classList.toggle('active');
        burgerBtn.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
      };

      burgerBtn.addEventListener('click', toggleMenu);
      backdrop.addEventListener('click', toggleMenu);

      // Close on nav
      document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') &&
          !sidebar.contains(e.target) &&
          !burgerBtn.contains(e.target)) {
          toggleMenu();
        }
      });
    }
  }

  async function syncSupabaseArticles() {
    try {
      if (!window.supabaseClient) throw new Error('Supabase client not found');
      const { data, error } = await window.supabaseClient
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        // Merge live articles with static articles, unique by slug
        const merged = [...data];
        DEK360_DATA.articles.forEach(a => {
          if (!merged.find(m => m.slug === a.slug)) {
            merged.push(a);
          }
        });
        state.articles = merged;
        return true;
      }
    } catch (err) {
      console.warn('Supabase sync failed, using static data:', err.message);
    }
    state.articles = DEK360_DATA.articles;
    return false;
  }

  async function fetchLatestYouTubeVideos() {
    try {
      const channelId = DEK360_DATA.channel.channelId;
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'ok' && data.items) {
        state.youtubeVideos = data.items.map(item => ({
          id: item.guid,
          videoId: item.guid.split(':')[2],
          title: item.title,
          headline: item.description.substring(0, 150) + '...',
          slug: `video-${item.guid.split(':')[2]}`,
          category: 'Video',
          author: item.author,
          date: new Date(item.pubDate).toLocaleDateString(),
          image: `https://i.ytimg.com/vi/${item.guid.split(':')[2]}/maxresdefault.jpg`,
          thumbnail: `https://i.ytimg.com/vi/${item.guid.split(':')[2]}/hqdefault.jpg`,
          views: 'Live',
          featured: false
        }));
        return true;
      }
    } catch (err) {
      console.warn('YouTube fetch failed:', err.message);
    }
    return false;
  }

  /* ==========================================
     HELPERS
     ========================================== */
  function getArticles() {
    return state.articles.length > 0 ? state.articles : DEK360_DATA.articles;
  }

  function getArticleBySlug(slug) {
    const news = getArticles().find(a => a.slug === slug);
    if (news) return news;
    return state.youtubeVideos.find(v => v.slug === slug);
  }

  function getFeaturedArticles() {
    return getArticles().filter(a => a.featured);
  }

  function getArticlesByCategory(cat) {
    if (!cat || cat === 'All') return getArticles();
    return getArticles().filter(a => a.category === cat);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    state.theme = theme;
    localStorage.setItem('dek360-theme', theme);
  }

  /* ==========================================
     ROUTER
     ========================================== */
  function navigateTo(page, params = {}) {
    state.currentPage = page;
    state.currentCategory = params.category || null;
    state.currentSlug = params.slug || null;

    // Reset limit on page change
    if (page === 'video') state.videoLimit = 12;
    if (page === 'home') state.homeArticleLimit = 7;

    // Reset slider on home
    if (page === 'home') state.sliderIndex = 0;

    // Update Browser URL (Simple Mock)
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    if (params.category) url.searchParams.set('cat', params.category);
    else url.searchParams.delete('cat');
    if (params.slug) url.searchParams.set('slug', params.slug);
    else url.searchParams.delete('slug');
    window.history.pushState({}, '', url);

    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.navigateTo = navigateTo;

  window.loadMoreVideos = () => {
    state.videoLimit += 12;
    render();
  };

  window.loadMoreHomeArticles = () => {
    state.homeArticleLimit += 5;
    render();
  };

  window.moveSlider = (dir) => {
    const featured = getFeaturedArticles().slice(0, 5);
    state.sliderIndex = (state.sliderIndex + dir + featured.length) % featured.length;
    updateSliderUI();
  };

  window.setSliderIndex = (idx) => {
    state.sliderIndex = idx;
    updateSliderUI();
  };

  function updateSliderUI() {
    const container = document.querySelector('.slider-container');
    const dots = document.querySelectorAll('.slider-dot');
    if (!container) return;

    container.style.transform = `translateX(-${state.sliderIndex * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === state.sliderIndex);
    });
  }

  /* ==========================================
     CORE RENDERING
     ========================================== */
  function render() {
    const app = document.getElementById('app');
    if (!app) return;

    // Loading State
    if (state.isInitialLoad) {
      app.innerHTML = '<div class="loader-wrap">Syncing News...</div>';
      return;
    }

    switch (state.currentPage) {
      case 'article':
        renderArticlePage(app);
        break;
      case 'video':
        renderVideoPage(app);
        break;
      case 'category':
        renderCategoryPage(app);
        break;
      case 'pools':
        renderPoolsPage(app);
        break;
      case 'search':
        renderSearchResults(app);
        break;
      default:
        renderHome(app);
        break;
    }

    updateNavLinks();
  }

  function updateNavLinks() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === state.currentPage);
    });

    // Back button visibility: Only show when NOT on home page
    const backBtn = document.querySelector('.nav-back-btn');
    if (backBtn) {
      backBtn.style.display = state.currentPage === 'home' ? 'none' : 'flex';
    }

    // Sync mobile sidebar
    renderMobileSidebar();
  }

  function renderMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const categories = DEK360_DATA.categories;
    sidebar.innerHTML = `
      <div style="margin-bottom: 32px; display:flex; align-items:center; gap:12px;">
        <img src="assets/logo.png" style="height:40px;" />
        <span style="font-weight:900; font-size:1.2rem;">DEK360</span>
      </div>
      <div class="category-nav">
        <p style="font-size:0.7rem; font-weight:800; color:var(--text-muted); margin-bottom:12px; letter-spacing:1px;">CATEGORIES</p>
        ${['All', ...categories].map(cat => `
          <button class="category-item ${state.currentCategory === cat || (!state.currentCategory && cat === 'All') ? 'active' : ''}" 
                  onclick="navigateTo('category', {category:'${cat}'}); closeMobileMenu();">
            ${cat}
          </button>
        `).join('')}
      </div>
      <div style="margin-top:40px;">
         <p style="font-size:0.7rem; font-weight:800; color:var(--text-muted); margin-bottom:12px; letter-spacing:1px;">PAGES</p>
         <a class="category-item" href="videos.html" style="margin-bottom:8px;">Videos</a>
         <a class="category-item" href="pools.html">Polls</a>
      </div>
    `;
  }

  window.closeMobileMenu = () => {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    const burgerBtn = document.getElementById('burgerBtn');
    if (sidebar) sidebar.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    if (burgerBtn) burgerBtn.classList.remove('active');
    document.body.style.overflow = '';
  };

  /* ==========================================
     COMPONENTS
     ========================================== */
  function renderSidebar() {
    const categories = DEK360_DATA.categories;
    const profileImg = `assets/logo.png`;

    return `
      <aside class="sidebar">
        <div class="sidebar-profile">
          <img class="profile-avatar" src="${profileImg}" alt="DEK360" />
          <div class="profile-name">DEK360 Ghana</div>
          <div class="profile-sub">Real-Time News</div>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-section-title">CATEGORIES</div>
          <div class="category-nav">
            ${['All', ...categories].map(cat => `
              <button class="category-item ${state.currentCategory === cat || (!state.currentCategory && cat === 'All') ? 'active' : ''}" 
                      onclick="navigateTo('category', {category:'${cat}'})">
                ${cat}
              </button>
            `).join('')}
          </div>
        </div>
      </aside>
    `;
  }

  function renderRightSidebar(articles) {
    return `
      <aside class="sidebar-right">
        <div class="section-header-compact">
          <h3 class="compact-title">Related News</h3>
          <a href="#" class="see-all-link" onclick="event.preventDefault(); navigateTo('category', {category:'All'})">See all</a>
        </div>
        <div class="related-list">
          ${articles.map(a => `
            <div class="related-item" onclick="navigateTo('article', {slug:'${a.slug}'})">
              <div class="related-item-img-wrap">
                <img class="related-item-img" src="${a.image}" alt="${a.title}" loading="lazy" />
              </div>
              <div class="related-item-content">
                <span class="related-item-tag">${a.category}</span>
                <p class="related-item-title">${a.title}</p>
                <div class="related-item-meta">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>${a.views || '1.2k'}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </aside>
    `;
  }

  function renderHeroSlider(featured) {
    return `
      <div class="hero-slider">
        <div class="slider-container" style="transform: translateX(-${state.sliderIndex * 100}%)">
          ${featured.map(f => `
            <div class="slider-slide" onclick="navigateTo('article', {slug:'${f.slug}'})">
              <img class="slider-img" src="${f.image}" alt="${f.title}" />
              <div class="slider-content">
                <span class="slider-tag">${f.category}</span>
                <h2 class="slider-title">${f.title}</h2>
                <div style="font-size: 0.9rem; font-weight: 700; opacity: 0.8;">
                   BY ${f.author || 'DEK360'} • ${f.date || 'Today'}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="slider-controls">
          <button class="slider-arrow" onclick="event.stopPropagation(); moveSlider(-1)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button class="slider-arrow" onclick="event.stopPropagation(); moveSlider(1)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div class="slider-dots">
          ${featured.map((_, i) => `
            <div class="slider-dot ${i === state.sliderIndex ? 'active' : ''}" onclick="event.stopPropagation(); setSliderIndex(${i})"></div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderStackedArticleCard(article) {
    return `
      <div class="article-stacked-card" onclick="navigateTo('article', {slug:'${article.slug}'})">
        <div class="stacked-img-wrap">
          <img class="stacked-img" src="${article.image}" alt="${article.title}" loading="lazy" />
        </div>
        <div class="stacked-content">
          <span class="stacked-tag">${article.category}</span>
          <h3 class="stacked-title">${article.title}</h3>
          <p class="stacked-headline">${article.headline || 'Read the full story on DEK360 Ghana.'}</p>
          <div class="stacked-meta">
            <div class="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>${article.date || 'Today'}</span>
            </div>
            <div class="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>${article.readTime || '3 min read'}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderFeaturedCard(article) {
    const isVideo = article.video_id || article.videoId;
    return `
      <div class="featured-article" onclick="navigateTo('article', {slug:'${article.slug}'})">
        <div class="featured-article-image-wrap">
          <img class="featured-article-image" src="${article.image}" alt="${article.title}" />
          ${isVideo ? `
            <div class="video-play-btn">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          ` : ''}
        </div>
        <div class="featured-article-body">
          <div class="article-header">
            <span class="article-tag">${article.category}</span>
            <div class="article-stats">
              <span>👁 ${article.views || '15k'}</span>
              <span>🔗 ${article.shares || '39k'}</span>
            </div>
          </div>
          <h2 class="featured-title">${article.title}</h2>
          <div class="article-author-meta">
            <div class="author-text">
              BY <span class="author-name">${article.author || 'DEK360 Editor'}</span>
              <div class="article-date">${article.date || 'Today'}</div>
            </div>
            <div class="article-actions">
              <button class="btn-action btn-action-secondary" onclick="event.stopPropagation();">Save</button>
              <button class="btn-action btn-action-primary" onclick="event.stopPropagation();">Share</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderVideoThumbnailCard(video) {
    const views = video.views || '15K views';
    const timeAgo = video.date || 'Today';
    const author = video.author || 'DEK360 Ghana';
    const defaultAvatar = 'assets/logo.png';

    return `
      <div class="video-card-compact" onclick="navigateTo('article', {slug:'${video.slug}'})">
        <div class="video-thumb-wrap">
          <img class="video-thumb-img" src="${video.image}" alt="${video.title}" loading="lazy" />
          <div class="video-play-icon-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div class="video-card-body yt-card-content">
          <div class="yt-channel-avatar">
            <img src="${defaultAvatar}" alt="${author}" />
          </div>
          <div class="yt-video-info">
            <h3 class="video-card-title">${video.title}</h3>
            <div class="video-card-meta">
              <span>${author}</span>
              <span>${views} • ${timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderFooter() {
    return `
      <footer class="global-footer">
        <div class="footer-inner">
          <div class="footer-brand">
            <img src="assets/logo.png" alt="DEK360" class="footer-logo" />
            <p>DEK360 Ghana is your premier source for real-time news, culture, sports, and entertainment across Africa and the globe.</p>
          </div>
          <div class="footer-links">
            <div class="footer-col">
              <h4>Pages</h4>
              <a href="index.html">Home</a>
              <a href="videos.html">Videos</a>
              <a href="magazine.html">Magazine</a>
              <a href="pools.html">Pools</a>
            </div>
            <div class="footer-col">
              <h4>Connect</h4>
              <a href="#">Facebook</a>
              <a href="#">Twitter/X</a>
              <a href="#">Instagram</a>
              <a href="#">YouTube</a>
            </div>
            <div class="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} DEK360 Ghana. All rights reserved.</p>
        </div>
      </footer>
    `;
  }

  function renderRelatedNewsSection(currentArticle) {
    // Get 5 articles that are not the current one
    const all = getArticles().filter(a => a.slug !== currentArticle.slug);
    // Try to get from same category first
    let related = all.filter(a => a.category === currentArticle.category);
    if (related.length < 5) {
      related = [...related, ...all.filter(a => a.category !== currentArticle.category)];
    }
    const displayArticles = related.slice(0, 5);

    if (displayArticles.length === 0) return '';

    return `
      <div class="related-news-section" style="margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--border);">
        <div class="section-header-compact" style="margin-bottom: 32px;">
          <h3 class="compact-title">Recommended for you</h3>
        </div>
        <div class="related-list">
          ${displayArticles.map(a => `
            <div class="related-item" onclick="navigateTo('article', {slug:'${a.slug}'})">
              <div class="related-item-img-wrap">
                <img class="related-item-img" src="${a.image}" alt="${a.title}" loading="lazy" />
              </div>
              <div class="related-item-content">
                <span class="related-item-tag">${a.category}</span>
                <p class="related-item-title">${a.title}</p>
                <div class="related-item-meta">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>${a.views || '1.2k'}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* ==========================================
     PAGES
     ========================================== */
  function renderHome(container) {
    const allArticles = getArticles();
    const featured = getFeaturedArticles().slice(0, 5);

    // Remaining articles (excluding the top 5 featured from the stacked list)
    const sliderSlugs = featured.map(f => f.slug);
    const remaining = allArticles.filter(a => !sliderSlugs.includes(a.slug));

    const visibleRemaining = remaining.slice(0, state.homeArticleLimit);
    const hasMore = remaining.length > state.homeArticleLimit;

    container.innerHTML = `
      <div class="page-wrapper">
        <div class="main-layout">
          ${renderSidebar()}
          <main class="content-main">
            ${renderHeroSlider(featured)}
            
            <div class="section-divider" style="margin-bottom: 32px; display:flex; align-items:center; gap:16px;">
               <h2 style="font-size: 1.5rem; font-weight: 900; white-space:nowrap;">Latest Feed</h2>
               <div style="height:1px; background:var(--border); flex-grow:1;"></div>
            </div>

            <div class="article-stacked-grid">
              ${visibleRemaining.map(a => renderStackedArticleCard(a)).join('')}
            </div>

            ${hasMore ? `
              <div style="margin-top: 40px; text-align: center;">
                <button class="btn-load-more" onclick="loadMoreHomeArticles()">
                  <span>Read More</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                  </svg>
                </button>
              </div>
            ` : ''}
          </main>
          ${renderRightSidebar(allArticles.slice(0, 5))}
        </div>
      </div>
      ${renderFooter()}
    `;
  }

  function renderCategoryPage(container) {
    const cat = state.currentCategory || 'All';
    const articles = getArticlesByCategory(cat);

    container.innerHTML = `
      <div class="page-wrapper">
        <div class="main-layout">
          ${renderSidebar()}
          <main class="content-main">
            <h1 style="font-size: 2rem; font-weight: 900; margin-bottom: 32px; letter-spacing: -1px;">${cat}</h1>
            <div class="article-stacked-grid">
              ${articles.map(a => renderStackedArticleCard(a)).join('')}
            </div>
          </main>
          ${renderRightSidebar(getArticles().slice(0, 3))}
        </div>
      </div>
      ${renderFooter()}
    `;
  }

  function renderArticlePage(container) {
    const article = getArticleBySlug(state.currentSlug);
    if (!article) {
      navigateTo('home');
      return;
    }

    const isVideo = article.video_id || article.videoId;

    container.innerHTML = `
      <div class="page-wrapper">
        <div class="main-layout">
          ${renderSidebar()}
          <main class="content-main">
            <div class="article-header" style="margin-bottom: 24px;">
              <span class="article-tag">${article.category}</span>
            </div>
            <h1 style="font-size: 2.5rem; font-weight: 900; line-height: 1.1; margin-bottom: 24px;">${article.title}</h1>
            
            <div class="share-toolbar" style="margin-bottom: 32px;">
              <span class="share-label">Share:</span>
              <div class="share-links">
                <button class="share-btn twitter" onclick="shareArticle('twitter', '${article.title.replace(/'/g, "\\'")}', '${article.slug}')" title="Share on Twitter/X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </button>
                <button class="share-btn facebook" onclick="shareArticle('facebook', '${article.title.replace(/'/g, "\\'")}', '${article.slug}')" title="Share on Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button class="share-btn whatsapp" onclick="shareArticle('whatsapp', '${article.title.replace(/'/g, "\\'")}', '${article.slug}')" title="Share on WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 8.39c-1.132 0-2.246-.304-3.221-.878l-.23-.137-2.396.628.64-2.336-.15-.239c-.63-.999-.962-2.158-.962-3.344 0-3.518 2.861-6.379 6.381-6.379 1.706 0 3.308.664 4.514 1.87 1.206 1.206 1.87 2.809 1.87 4.516 0 3.52-2.862 6.38-6.382 6.38m6.764-13.155c-1.808-1.807-4.214-2.803-6.763-2.803-5.266 0-9.554 4.288-9.554 9.554 0 1.683.439 3.326 1.275 4.773l-1.355 4.949 5.064-1.328c1.398.761 2.977 1.164 4.591 1.164h.004c5.267 0 9.556-4.288 9.556-9.556 0-2.553-.997-4.96-2.805-6.767"/></svg>
                </button>
                <button class="share-btn copy" onclick="shareArticle('copy', '${article.title.replace(/'/g, "\\'")}', '${article.slug}')" title="Copy Link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>
            </div>
            
            <div class="article-media-wrap" style="border-radius: var(--radius-lg); overflow:hidden; margin-bottom: 40px; box-shadow: var(--shadow-md); background: #000; aspect-ratio: 16/9;">
              ${isVideo ? `
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${article.video_id || article.videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>
              ` : `
                <img src="${article.image}" style="width:100%; height:100%; object-fit:cover;" />
              `}
            </div>

            <div class="article-body-text" style="font-size: 1.1rem; line-height: 1.8; color: var(--text-primary);">
              ${article.body ? article.body.split('\n\n').map(p => `<p style="margin-bottom: 24px;">${p}</p>`).join('') : '<p>Article content pending...</p>'}
            </div>
            
            ${renderRelatedNewsSection(article)}
          </main>
          ${renderRightSidebar(getArticles().slice(0, 3))}
        </div>
      </div>
      ${renderFooter()}
    `;
  }

  function renderVideoPage(container) {
    const liveVideos = state.youtubeVideos.length > 0 ? state.youtubeVideos : [];
    const staticVideos = DEK360_DATA.trendingVideos.map(v => ({
      ...v,
      slug: `video-${v.videoId}`,
      image: `https://i.ytimg.com/vi/${v.videoId}/maxresdefault.jpg`,
      headline: v.description,
      author: 'DEK360 Video'
    }));

    // Merge live with static, unique by videoId
    const allVideosMap = new Map();
    liveVideos.forEach(v => allVideosMap.set(v.videoId, v));
    staticVideos.forEach(v => {
      if (!allVideosMap.has(v.videoId)) allVideosMap.set(v.videoId, v);
    });

    const allVideos = Array.from(allVideosMap.values());
    const visibleVideos = allVideos.slice(0, state.videoLimit);
    const hasMore = allVideos.length > state.videoLimit;

    container.innerHTML = `
      <div class="page-wrapper">
        <div class="main-layout">
          ${renderSidebar()}
          <main class="content-main">
            <h1 style="font-size: 2.25rem; font-weight: 900; margin-bottom: 40px; letter-spacing: -1.5px;">Latest Videos</h1>
            <div class="video-grid">
              ${visibleVideos.map(v => renderVideoThumbnailCard(v)).join('')}
            </div>
            
            ${hasMore ? `
              <div style="margin-top: 60px; text-align: center;">
                <button class="btn-load-more" onclick="loadMoreVideos()">
                  <span>Load More Videos</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                  </svg>
                </button>
              </div>
            ` : ''}
          </main>
          ${renderRightSidebar(getArticles().slice(0, 3))}
        </div>
      </div>
      ${renderFooter()}
    `;
  }

  function renderPoolsPage(container) {
    const pools = DEK360_DATA.pools || [];

    container.innerHTML = `
      <div class="page-wrapper">
        <div class="main-layout">
          ${renderSidebar()}
          <main class="content-main">
            <div class="section-divider" style="margin-bottom: 32px; display:flex; align-items:center; gap:16px;">
               <h1 style="font-size: 2.25rem; font-weight: 900; white-space:nowrap; margin:0;">Public Pools</h1>
               <div style="height:1px; background:var(--border); flex-grow:1;"></div>
            </div>
            
            <div class="pools-grid" style="display:grid; grid-template-columns: 1fr; gap: 32px;">
              ${pools.map(poll => `
                <div class="poll-card" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm);">
                  <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 24px; color: var(--text-primary);">${poll.question}</h3>
                  <div class="poll-options" style="display:flex; flex-direction:column; gap:20px;">
                    ${poll.options.map(opt => {
      const percent = Math.round((opt.votes / Math.max(poll.totalVotes, 1)) * 100);
      return `
                        <div class="poll-option">
                          <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-weight:600; font-size:0.95rem; color: var(--text-secondary);">
                            <span>${opt.label}</span>
                            <span>${percent}%</span>
                          </div>
                          <div class="progress-bar-bg" style="width:100%; height:12px; background:var(--bg-page); border-radius:6px; overflow:hidden; border: 1px solid var(--border);">
                            <div class="progress-bar-fill" style="width:${percent}%; height:100%; background:${opt.color}; border-radius:6px; transition: width 1s ease-out;"></div>
                          </div>
                          <div style="text-align: right; font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">${opt.votes.toLocaleString()} votes</div>
                        </div>
                      `;
    }).join('')}
                  </div>
                  <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid var(--border); font-size: 0.85rem; color: var(--text-muted); font-weight: 700; display:flex; justify-content: space-between; align-items:center;">
                    <span>Total Votes: ${poll.totalVotes.toLocaleString()}</span>
                    <button class="btn-action" style="padding: 6px 16px; font-size: 0.85rem;" onclick="alert('Voting functionality is mock.')">Vote</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </main>
          ${renderRightSidebar(getArticles().slice(0, 3))}
        </div>
      </div>
      ${renderFooter()}
    `;
  }

  function renderSearchResults(container) {
    const query = state.currentCategory || ''; // We'll re-use currentCategory as the search query in state for simplicity
    const lowerQuery = query.toLowerCase();

    // Search both articles and videos
    const matchedArticles = getArticles().filter(a =>
      a.title.toLowerCase().includes(lowerQuery) ||
      (a.body && a.body.toLowerCase().includes(lowerQuery))
    );

    const matchedVideos = state.youtubeVideos.filter(v =>
      v.title.toLowerCase().includes(lowerQuery) ||
      (v.description && v.description.toLowerCase().includes(lowerQuery))
    );

    const hasResults = matchedArticles.length > 0 || matchedVideos.length > 0;

    container.innerHTML = `
      <div class="page-wrapper">
        <div class="main-layout">
          ${renderSidebar()}
          <main class="content-main">
            <h1 style="font-size: 2rem; font-weight: 900; margin-bottom: 32px; letter-spacing: -1px;">Search Results for "${query}"</h1>
            
            ${!hasResults ? `
              <div style="text-align:center; padding: 60px 20px; color: var(--text-muted);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:16px;">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <h3>No results found</h3>
                <p style="margin-top: 8px;">Try adjusting your search terms.</p>
              </div>
            ` : ''}

            ${matchedArticles.length > 0 ? `
              <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 24px; color: var(--text-primary);">News Articles</h2>
              <div class="article-stacked-grid" style="margin-bottom: 48px;">
                ${matchedArticles.map(a => renderStackedArticleCard(a)).join('')}
              </div>
            ` : ''}

            ${matchedVideos.length > 0 ? `
              <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 24px; color: var(--text-primary);">Videos</h2>
              <div class="video-grid">
                ${matchedVideos.map(v => renderVideoThumbnailCard(v)).join('')}
              </div>
            ` : ''}

          </main>
          ${renderRightSidebar(getArticles().slice(0, 3))}
        </div>
      </div>
      ${renderFooter()}
    `;
  }

  /* ==========================================
     GLOBAL HOOKS
     ========================================== */
  window.openSearch = () => {
    // Look for a search input in the DOM, or prompt if none exists.
    const searchInput = document.querySelector('.nav-search-input');
    let query;
    if (searchInput && searchInput.value.trim() !== '') {
      query = searchInput.value.trim();
    } else {
      query = prompt("Enter search keywords:");
    }

    if (query && query.trim() !== "") {
      navigateTo('search', { category: query.trim() });
    }
  };

  // Add event listeners to search inputs in nav if they exist
  document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.nav-search-wrap');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.openSearch();
      });
    }
  });

  init();

  // Expose for verification
  window.__APP_STATE__ = state;
  window.__RENDER__ = render;
})();
