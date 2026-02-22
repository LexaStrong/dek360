// DEK360 Admin — JavaScript
// Full admin panel: Dashboard, Posts, Editor, Categories, Videos

(function () {
  'use strict';

  /* =============================================
     STATE
     ============================================= */
  const admState = {
    theme: localStorage.getItem('dek360-adm-theme') || 'light',
    view: 'dashboard',
    editingSlug: null,    // null = new post
    posts: [],            // local working copy
    searchQuery: '',
    filterCat: 'all',
    filterStatus: 'all',
    history: [], // Simple history for back button
  };

  /* =============================================
     SETUP & HELPERS
     ============================================= */
  function admInit() {
    // Clone articles into local mutable state
    admState.posts = JSON.parse(JSON.stringify(DEK360_DATA.articles));
    // Load admin-saved posts from localStorage
    const saved = localStorage.getItem('dek360-adm-posts');
    if (saved) {
      try {
        const extra = JSON.parse(saved);
        // Merge: user-created posts come first
        admState.posts = [...extra, ...admState.posts.filter(
          p => !extra.some(e => e.slug === p.slug)
        )];
      } catch (_) { }
    }

    applyAdmTheme(admState.theme);
    updateBadges();
    showView('dashboard');

    // Initial loader in admin.html is simplified after first view
  }

  function savePosts() {
    // Only save posts that aren't in original data (or modified ones)
    localStorage.setItem('dek360-adm-posts', JSON.stringify(admState.posts));
  }

  function applyAdmTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    admState.theme = theme;
    localStorage.setItem('dek360-adm-theme', theme);
    const btn = document.getElementById('admThemeBtn');
    if (btn) btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }

  function updateBadges() {
    const badge = document.getElementById('postsBadge');
    if (badge) badge.textContent = admState.posts.length;
  }

  function admToast(msg, duration = 3000) {
    const toast = document.getElementById('admToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  }

  function setNavActive(viewId) {
    document.querySelectorAll('.adm-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.view === viewId);
    });
  }

  function slugify(str) {
    return str.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  }

  function getTagColor(category) {
    const m = {
      Politics: 'red', National: 'blue', International: 'purple',
      Business: 'gold', Finance: 'green', Health: 'red',
      Technology: 'blue', Entertainment: 'purple', Sports: 'green',
      Culture: 'gold', Defense: 'purple', Media: 'red',
      Jobs: 'green', Energy: 'gold', Kids: 'gold', Regulation: 'purple'
    };
    return m[category] || 'red';
  }

  function renderAdmBackButton(style = '') {
    return `
      <button class="adm-btn adm-btn-ghost adm-btn-sm" 
              onclick="admGoBack()" 
              style="margin-bottom:16px; display:inline-flex; align-items:center; gap:6px; ${style}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back
      </button>
    `;
  }

  function admGoBack() {
    if (admState.history.length > 1) {
      admState.history.pop(); // Current
      const prev = admState.history.pop();
      showView(prev.viewId, prev.slug, false, true);
    } else {
      showView('dashboard');
    }
  }
  window.admGoBack = admGoBack;

  /* =============================================
     VIEW ROUTER
     ============================================= */
  function showView(viewId, slug, isNew, isBack = false) {
    if (!isBack) {
      admState.history.push({ viewId, slug });
    }
    admState.view = viewId;
    admState.editingSlug = slug || null;
    setNavActive(viewId);

    const title = { dashboard: 'Dashboard', posts: 'All Posts', editor: isNew ? 'New Post' : 'Edit Post', categories: 'Categories', videos: 'Videos' };
    const topTitle = document.getElementById('topbarTitle');
    if (topTitle) topTitle.textContent = title[viewId] || viewId;

    const content = document.getElementById('admContent');
    if (!content) return;

    content.innerHTML = '<div class="adm-loading">Loading...</div>';

    // slight delay to let spinner show for UX feel
    setTimeout(() => {
      // Add back button to all views except dashboard
      const backBtnHtml = viewId !== 'dashboard' ? renderAdmBackButton() : '';
      const viewWrap = document.createElement('div');
      viewWrap.innerHTML = backBtnHtml;
      content.innerHTML = '';
      content.appendChild(viewWrap);

      switch (viewId) {
        case 'dashboard': renderDashboard(content); break; // Dashboard renders its own layout
        case 'posts': renderPosts(viewWrap); break;
        case 'editor': renderEditor(viewWrap, admState.editingSlug, isNew); break;
        case 'categories': renderCategories(viewWrap); break;
        case 'videos': renderVideos(viewWrap); break;
        default: renderDashboard(content);
      }
    }, 80);
  }

  /* =============================================
     DASHBOARD
     ============================================= */
  function renderDashboard(c) {
    const totalPosts = admState.posts.length;
    const catCounts = {};
    admState.posts.forEach(p => { catCounts[p.category] = (catCounts[p.category] || 0) + 1; });
    const topCats = Object.entries(catCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const maxCat = topCats[0]?.[1] || 1;

    const recent = [...admState.posts].slice(0, 5);
    const totalViews = 0; // Reset for launch as requested

    c.innerHTML = `
      <div class="adm-stats-grid">
        <div class="adm-stat-card">
          <div class="adm-stat-icon red">📰</div>
          <div>
            <div class="adm-stat-num">${totalPosts}</div>
            <div class="adm-stat-label">Total Posts</div>
          </div>
        </div>
        <div class="adm-stat-card">
          <div class="adm-stat-icon blue">👁</div>
          <div>
            <div class="adm-stat-num">${(totalViews / 1000).toFixed(1)}K</div>
            <div class="adm-stat-label">Total Views</div>
          </div>
        </div>
        <div class="adm-stat-card">
          <div class="adm-stat-icon green">🏷️</div>
          <div>
            <div class="adm-stat-num">${Object.keys(catCounts).length}</div>
            <div class="adm-stat-label">Categories</div>
          </div>
        </div>
        <div class="adm-stat-card">
          <div class="adm-stat-icon gold">🎬</div>
          <div>
            <div class="adm-stat-num">${DEK360_DATA.trendingVideos.length}</div>
            <div class="adm-stat-label">Videos</div>
          </div>
        </div>
      </div>

      <div class="adm-recent-grid">
        <!-- Recent posts -->
        <div class="adm-card">
          <div class="adm-card-header">
            <div class="adm-card-title">Recent Posts</div>
            <button class="adm-btn adm-btn-ghost adm-btn-sm" onclick="showView('posts')">View All</button>
          </div>
          <div class="adm-table-wrap">
            <table class="adm-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Views</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${recent.map(p => `
                  <tr>
                    <td>
                      <span class="adm-table-title">${p.title}</span>
                      <span class="adm-table-excerpt">${p.headline || ''}</span>
                    </td>
                    <td><span class="adm-tag adm-tag-${getTagColor(p.category)}">${p.category}</span></td>
                    <td>${p.views || '—'}</td>
                    <td style="white-space:nowrap; color:var(--adm-text-muted);">${p.date}</td>
                    <td>
                      <button class="adm-icon-btn" onclick="showView('editor', '${p.slug}')" title="Edit">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Category breakdown -->
        <div class="adm-card">
          <div class="adm-card-header">
            <div class="adm-card-title">By Category</div>
          </div>
          <div class="adm-card-body">
            ${topCats.map(([cat, count]) => `
              <div class="adm-cat-bar">
                <div class="adm-cat-bar-label">${cat}</div>
                <div class="adm-cat-bar-track">
                  <div class="adm-cat-bar-fill" style="width:${Math.round((count / maxCat) * 100)}%"></div>
                </div>
                <div class="adm-cat-bar-count">${count}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /* =============================================
     POSTS TABLE
     ============================================= */
  function renderPosts(c) {
    c.innerHTML = `
      <div class="adm-filter-bar">
        <div class="adm-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Search posts…" id="admPostSearch" value="${escHtml(admState.searchQuery)}" oninput="admFilterPosts(this.value)" />
        </div>
        <select class="adm-select" id="admCatFilter" onchange="admFilterCat(this.value)">
          <option value="all">All Categories</option>
          ${DEK360_DATA.categories.map(c => `<option value="${c}" ${admState.filterCat === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
        <button class="adm-btn adm-btn-primary" onclick="showView('editor', null, true)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Post
        </button>
      </div>

      <div class="adm-card">
        <div class="adm-card-header">
          <div class="adm-card-title" id="postsCountLabel">All Posts</div>
        </div>
        <div class="adm-table-wrap" id="postsTableWrap">
          ${buildPostsTable()}
        </div>
      </div>
    `;
  }

  function buildPostsTable() {
    let filtered = admState.posts;
    if (admState.searchQuery) {
      const q = admState.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.headline || '').toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (admState.filterCat !== 'all') {
      filtered = filtered.filter(p => p.category === admState.filterCat);
    }

    const label = document.getElementById('postsCountLabel');
    if (label) label.textContent = `${filtered.length} Post${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) return `
      <div class="adm-empty">
        <div class="adm-empty-icon">📭</div>
        <div class="adm-empty-title">No posts found</div>
        <div class="adm-empty-sub">Try a different search or category filter.</div>
      </div>`;

    return `
      <table class="adm-table" id="postsTable">
        <thead>
          <tr>
            <th width="50"></th>
            <th>Title</th>
            <th>Category</th>
            <th>Author</th>
            <th>Views</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(p => `
            <tr>
              <td>
                <img class="adm-table-thumb" 
                     src="${escHtml(p.thumbnail || p.image)}" 
                     alt="" 
                     onerror="this.src='https://placehold.co/52x38/e53935/ffffff?text=IMG'" />
              </td>
              <td>
                <span class="adm-table-title">${escHtml(p.title)}</span>
                <span class="adm-table-excerpt">${escHtml(p.headline || '')}</span>
              </td>
              <td><span class="adm-tag adm-tag-${getTagColor(p.category)}">${escHtml(p.category)}</span></td>
              <td style="color:var(--adm-text-secondary); font-size:0.78rem;">${escHtml(p.author || '—')}</td>
              <td style="color:var(--adm-text-muted); font-size:0.78rem;">${escHtml(p.views || '—')}</td>
              <td style="white-space:nowrap; color:var(--adm-text-muted); font-size:0.78rem;">${escHtml(p.date)}</td>
              <td>
                <div style="display:flex; gap:4px;">
                  <button class="adm-icon-btn" onclick="showView('editor', '${p.slug}')" title="Edit post" aria-label="Edit">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button class="adm-icon-btn" style="color:var(--adm-danger);" onclick="confirmDelete('${p.slug}')" title="Delete post" aria-label="Delete">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>`;
  }

  /* =============================================
     POST EDITOR
     ============================================= */
  function renderEditor(c, slug, isNew) {
    const post = isNew ? null : admState.posts.find(p => p.slug === slug);
    const cats = DEK360_DATA.categories;
    const existingImage = post?.image || post?.thumbnail || '';

    c.innerHTML = `
      <div class="adm-editor-layout">
        <!-- LEFT: Main form -->
        <div>
          <!-- Title -->
          <div class="adm-field">
            <label class="adm-label" for="edTitle">Title</label>
            <input class="adm-input" type="text" id="edTitle" 
              placeholder="Enter blog post title" 
              value="${escHtml(post?.title || '')}" 
              oninput="autoSlug(this.value)" />
          </div>

          <!-- Excerpt -->
          <div class="adm-field">
            <label class="adm-label" for="edExcerpt">Excerpt</label>
            <textarea class="adm-textarea" id="edExcerpt" 
              placeholder="Brief summary of the post" 
              rows="3">${escHtml(post?.headline || '')}</textarea>
          </div>

          <!-- Content -->
          <div class="adm-field">
            <label class="adm-label">Content</label>
            <!-- Toolbar matching reference image -->
            <div class="adm-toolbar">
              <button class="adm-toolbar-btn" onclick="edFormat('bold')" title="Bold"><b>B</b></button>
              <button class="adm-toolbar-btn" onclick="edFormat('italic')" title="Italic"><i>I</i></button>
              <button class="adm-toolbar-btn" onclick="edFormat('underline')" title="Underline"><u>U</u></button>
              <div class="adm-toolbar-divider"></div>
              <button class="adm-toolbar-btn" onclick="edInsert('\\n# ')" title="Heading 1">H1</button>
              <button class="adm-toolbar-btn" onclick="edInsert('\\n## ')" title="Heading 2">H2</button>
              <button class="adm-toolbar-btn" onclick="edInsert('\\n### ')" title="Heading 3">H3</button>
              <div class="adm-toolbar-divider"></div>
              <button class="adm-toolbar-btn" onclick="edInsert('\\n- ')" title="Bullet List">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              </button>
              <button class="adm-toolbar-btn" onclick="edInsert('\\n1. ')" title="Numbered List">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
              </button>
              <button class="adm-toolbar-btn" onclick="edInsert('\\n> ')" title="Quote">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12-4V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1 3 0 7-1 7-8z"/></svg>
              </button>
              <div class="adm-toolbar-divider"></div>
              <button class="adm-toolbar-btn" onclick="edInsert('\`\`')" title="Inline Code">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </button>
              <button class="adm-toolbar-btn" onclick="edInsert('\\n\`\`\`\\n\\n\`\`\`')" title="Code Block">Block</button>
              <div class="adm-toolbar-divider"></div>
              <button class="adm-toolbar-btn" onclick="edInsertImage()" title="Image URL">
                <svg width="13" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </button>
              <button class="adm-toolbar-btn" onclick="document.getElementById('edFileUpload').click()" title="Upload Local File">
                <svg width="13" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </button>
              <input type="file" id="edFileUpload" style="display:none;" onchange="edHandleFile(this)" accept="image/*,video/*,application/pdf,.doc,.docx" />
              <button class="adm-toolbar-btn" onclick="edInsertLink()" title="Link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </button>
            </div>
            <textarea class="adm-content-editor" id="edContent" 
              placeholder="Write your blog post content here... Use the toolbar for formatting or write Markdown directly.">${escHtml(post?.body || '')}</textarea>
          </div>

          <!-- Slug (read-only preview) -->
          <div class="adm-field" style="display:flex; align-items:center; gap:12px;">
            <label class="adm-label" style="margin:0; flex-shrink:0;">Slug</label>
            <input class="adm-input" type="text" id="edSlug" 
              placeholder="auto-generated-from-title" 
              value="${escHtml(post?.slug || '')}" 
              style="font-size:0.8rem; color:var(--adm-text-muted);" />
          </div>

          <!-- Actions -->
          <div class="adm-editor-actions">
            <button class="adm-btn adm-btn-ghost" onclick="showView('posts')">Cancel</button>
            <button class="adm-btn adm-btn-primary" onclick="savePost(${isNew ? 'true' : 'false'})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              ${isNew ? 'Publish Post' : 'Save Changes'}
            </button>
          </div>
        </div>

        <!-- RIGHT: Post Settings -->
        <div class="adm-settings-panel">
          <div class="adm-card">
            <div class="adm-card-header">
              <div class="adm-card-title">Post Settings</div>
            </div>
            <div class="adm-card-body">
              <!-- Category -->
              <div class="adm-field">
                <label class="adm-label" for="edCategory">Category</label>
                <select class="adm-select" id="edCategory">
                  ${cats.map(cat => `<option value="${cat}" ${post?.category === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                </select>
              </div>

              <!-- Author -->
              <div class="adm-field">
                <label class="adm-label" for="edAuthor">Author</label>
                <input class="adm-input" type="text" id="edAuthor" 
                  placeholder="Author name" 
                  value="${escHtml(post?.author || 'DEK360 Staff')}" />
              </div>

              <!-- Read Time -->
              <div class="adm-field">
                <label class="adm-label" for="edReadTime">Read Time</label>
                <input class="adm-input" type="text" id="edReadTime" 
                  placeholder="e.g. 5 min read" 
                  value="${escHtml(post?.readTime || '5 min read')}" />
              </div>

              <!-- Featured Image URL -->
              <div class="adm-field">
                <label class="adm-label" for="edImage">Featured Image URL</label>
                <div style="display:flex; gap:8px; margin-bottom:8px;">
                  <input class="adm-input" type="url" id="edImage" 
                    placeholder="https://…" 
                    value="${escHtml(existingImage)}"
                    oninput="previewImage(this.value)" />
                  <button class="adm-btn adm-btn-ghost adm-btn-sm" onclick="document.getElementById('edImageUpload').click()">Upload</button>
                  <input type="file" id="edImageUpload" style="display:none;" onchange="handleImageUpload(this)" accept="image/*" />
                </div>
                <div class="adm-img-preview-wrap" id="imgPreviewWrap">
                  <img id="imgPreview" class="adm-img-preview" 
                       src="${escHtml(existingImage)}" 
                       alt="Preview"
                       style="${existingImage ? 'display:block;' : ''}"
                       onerror="this.style.display='none'; document.getElementById('imgPlaceholder').style.display='flex';" />
                  <div class="adm-img-placeholder" id="imgPlaceholder" style="${existingImage ? 'display:none;' : ''}">
                    🖼️<br/>Image preview will appear here
                  </div>
                </div>
              </div>

              <!-- Status -->
              <div class="adm-field">
                <label class="adm-label" for="edStatus">Status</label>
                <select class="adm-select" id="edStatus">
                  <option value="published" selected>Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* =============================================
     CATEGORIES VIEW
     ============================================= */
  function renderCategories(c) {
    const catCounts = {};
    admState.posts.forEach(p => { catCounts[p.category] = (catCounts[p.category] || 0) + 1; });
    const cats = DEK360_DATA.categories;

    c.innerHTML = `
      <div style="margin-bottom:20px; display:flex; align-items:center; justify-content:space-between;">
        <div style="font-size:0.85rem; color:var(--adm-text-secondary);">${cats.length} categories total</div>
      </div>
      <div class="adm-cat-grid">
        ${cats.map(cat => `
          <div class="adm-cat-chip-card">
            <div>
              <div class="adm-cat-chip-name">${escHtml(cat)}</div>
              <div style="font-size:0.72rem; color:var(--adm-text-muted); margin-top:2px;">Category</div>
            </div>
            <div class="adm-cat-chip-count">${catCounts[cat] || 0}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* =============================================
     VIDEOS VIEW
     ============================================= */
  function renderVideos(c) {
    const videos = DEK360_DATA.trendingVideos;

    c.innerHTML = `
      <div style="margin-bottom:20px; display:flex; align-items:center; justify-content:space-between;">
        <div style="font-size:0.85rem; color:var(--adm-text-secondary);">${videos.length} videos from <a href="https://youtube.com/@DEK360GHANA" target="_blank" rel="noopener" style="color:var(--adm-accent); font-weight:600;">@DEK360GHANA</a></div>
        <a href="https://youtube.com/@DEK360GHANA" target="_blank" rel="noopener" class="adm-btn adm-btn-ghost adm-btn-sm">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Open Channel
        </a>
      </div>
      <div class="adm-video-grid">
        ${videos.map(v => `
          <div class="adm-video-card">
            <div class="adm-video-thumb">
              <img src="https://img.youtube.com/vi/${escHtml(v.videoId)}/mqdefault.jpg" alt="${escHtml(v.title)}" loading="lazy" />
              <div class="adm-video-thumb-overlay">
                <a href="https://youtube.com/watch?v=${escHtml(v.videoId)}" target="_blank" rel="noopener" class="adm-play-btn">▶</a>
              </div>
            </div>
            <div class="adm-video-info">
              <div class="adm-video-title">${escHtml(v.title)}</div>
              <div class="adm-video-meta">
                <span>👁 ${escHtml(v.views)}</span>
                <span>⏱ ${escHtml(v.duration)}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* =============================================
     EDITOR ACTIONS
     ============================================= */
  function savePost(isNew) {
    const title = document.getElementById('edTitle')?.value.trim();
    const excerpt = document.getElementById('edExcerpt')?.value.trim();
    const body = document.getElementById('edContent')?.value.trim();
    const category = document.getElementById('edCategory')?.value;
    const author = document.getElementById('edAuthor')?.value.trim();
    const readTime = document.getElementById('edReadTime')?.value.trim();
    const image = document.getElementById('edImage')?.value.trim();
    const slugInput = document.getElementById('edSlug')?.value.trim();

    if (!title) { admToast('⚠️ Title is required.'); return; }
    if (!body) { admToast('⚠️ Content is required.'); return; }

    const slug = slugInput || slugify(title);
    const now = new Date();
    const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    if (isNew) {
      const exists = admState.posts.find(p => p.slug === slug);
      if (exists) { admToast('⚠️ A post with this slug already exists.'); return; }

      const newPost = {
        slug,
        title,
        headline: excerpt,
        body,
        category,
        tag: category.toUpperCase(),
        author: author || 'DEK360 Staff',
        date,
        readTime: readTime || '5 min read',
        image: image || `https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80`,
        thumbnail: image || `https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=70`,
        views: '0',
        shares: '0',
        featured: false,
      };
      admState.posts.unshift(newPost);
      savePosts();
      updateBadges();
      admToast('✅ Post published successfully!');
      showView('posts');
    } else {
      const idx = admState.posts.findIndex(p => p.slug === admState.editingSlug);
      if (idx === -1) { admToast('❌ Post not found.'); return; }

      admState.posts[idx] = {
        ...admState.posts[idx],
        title, headline: excerpt, body, category,
        tag: category.toUpperCase(),
        author: author || 'DEK360 Staff',
        readTime: readTime || '5 min read',
        image: image || admState.posts[idx].image,
        thumbnail: image || admState.posts[idx].thumbnail,
      };
      savePosts();
      admToast('✅ Changes saved!');
      showView('posts');
    }
  }

  function autoSlug(title) {
    const slugEl = document.getElementById('edSlug');
    if (slugEl && (!admState.editingSlug)) {
      slugEl.value = slugify(title);
    }
  }

  function previewImage(url) {
    const img = document.getElementById('imgPreview');
    const placeholder = document.getElementById('imgPlaceholder');
    if (!img || !placeholder) return;
    if (url) {
      img.src = url;
      img.style.display = 'block';
      placeholder.style.display = 'none';
    } else {
      img.style.display = 'none';
      placeholder.style.display = 'flex';
    }
  }

  function edFormat(cmd) {
    const ta = document.getElementById('edContent');
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = ta.value.substring(start, end);
    const markers = { bold: '**', italic: '_', underline: '<u>' };
    const closeMap = { bold: '**', italic: '_', underline: '</u>' };
    const m = markers[cmd];
    const mc = closeMap[cmd];
    if (!m) return;
    const replacement = m + selected + mc;
    ta.setRangeText(replacement, start, end, 'end');
    ta.focus();
  }

  function edInsert(text) {
    const ta = document.getElementById('edContent');
    if (!ta) return;
    const pos = ta.selectionStart;
    ta.setRangeText(text, pos, pos, 'end');
    ta.focus();
  }

  function edInsertImage() {
    const url = prompt('Enter image URL:');
    if (url) edInsert(`\n![Image](${url})\n`);
  }

  function edInsertLink() {
    const url = prompt('Enter URL:');
    const text = prompt('Enter link text:') || url;
    if (url) edInsert(`[${text}](${url})`);
  }

  function handleImageUpload(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const url = e.target.result;
      const inputUrl = document.getElementById('edImage');
      if (inputUrl) {
        inputUrl.value = url;
        previewImage(url);
      }
    };
    reader.readAsDataURL(file);
  }

  function edHandleFile(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const url = e.target.result;
      const type = file.type;
      if (type.startsWith('image/')) {
        edInsert(`\n![${file.name}](${url})\n`);
      } else if (type.startsWith('video/')) {
        edInsert(`\n<video controls style="width:100%; border-radius:12px; margin:16px 0;"><source src="${url}" type="${type}"></video>\n`);
      } else {
        edInsert(`\n[📄 Download ${file.name}](${url})\n`);
      }
      admToast(`✅ File "${file.name}" ready`);
    };
    reader.readAsDataURL(file);
  }

  /* =============================================
     DELETE FLOW
     ============================================= */
  let pendingDeleteSlug = null;

  function confirmDelete(slug) {
    const post = admState.posts.find(p => p.slug === slug);
    if (!post) return;
    pendingDeleteSlug = slug;
    document.getElementById('admModalTitle').textContent = 'Delete Post?';
    document.getElementById('admModalText').textContent = `"${post.title}" will be permanently deleted.`;
    document.getElementById('admModalConfirm').onclick = doDelete;
    document.getElementById('admModal').classList.add('open');
  }

  function doDelete() {
    if (!pendingDeleteSlug) return;
    admState.posts = admState.posts.filter(p => p.slug !== pendingDeleteSlug);
    savePosts();
    updateBadges();
    closeModal();
    admToast('🗑 Post deleted.');
    showView('posts');
  }

  function closeModal() {
    document.getElementById('admModal').classList.remove('open');
    pendingDeleteSlug = null;
  }

  /* =============================================
     FILTER HANDLERS
     ============================================= */
  function admFilterPosts(query) {
    admState.searchQuery = query;
    const wrap = document.getElementById('postsTableWrap');
    if (wrap) wrap.innerHTML = buildPostsTable();
  }

  function admFilterCat(cat) {
    admState.filterCat = cat;
    const wrap = document.getElementById('postsTableWrap');
    if (wrap) wrap.innerHTML = buildPostsTable();
  }

  /* =============================================
     MOBILE SIDEBAR
     ============================================= */
  function openSidebar() {
    document.getElementById('admSidebar')?.classList.add('open');
    document.getElementById('admSidebarOverlay')?.classList.add('open');
  }

  function closeSidebar() {
    document.getElementById('admSidebar')?.classList.remove('open');
    document.getElementById('admSidebarOverlay')?.classList.remove('open');
  }

  /* =============================================
     UTILITIES
     ============================================= */
  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* =============================================
     GLOBAL EXPORTS
     ============================================= */
  window.showView = showView;
  window.admToggleTheme = () => applyAdmTheme(admState.theme === 'dark' ? 'light' : 'dark');
  window.openSidebar = openSidebar;
  window.closeSidebar = closeSidebar;
  window.confirmDelete = confirmDelete;
  window.doDelete = doDelete;
  window.closeModal = closeModal;
  window.savePost = savePost;
  window.autoSlug = autoSlug;
  window.previewImage = previewImage;
  window.edFormat = edFormat;
  window.edInsert = edInsert;
  window.edInsertImage = edInsertImage;
  window.edInsertLink = edInsertLink;
  window.handleImageUpload = handleImageUpload;
  window.edHandleFile = edHandleFile;
  window.admFilterPosts = admFilterPosts;
  window.admFilterCat = admFilterCat;

  /* =============================================
     INIT
     ============================================= */
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof DEK360_DATA === 'undefined') {
      document.getElementById('admContent').innerHTML = `
        <div class="adm-empty">
          <div class="adm-empty-icon">⚠️</div>
          <div class="adm-empty-title">Data not loaded</div>
          <div class="adm-empty-sub">Make sure data.js is present alongside admin.html.</div>
        </div>`;
      return;
    }
    admInit();
  });

})();
