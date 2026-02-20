/* ===== DEK360 — Admin Panel Logic ===== */

const ADMIN_PASSWORD = '@Dek360ghana';

document.addEventListener('DOMContentLoaded', () => {
  const isAuth = sessionStorage.getItem('dek360_admin_auth');

  if (!isAuth) {
    showAuthGate();
  } else {
    showDashboard();
  }
});

function showAuthGate() {
  document.getElementById('adminApp').innerHTML = `
    <div class="auth-gate">
      <div class="auth-box">
        <div style="font-size:2rem; margin-bottom:var(--sp-md);">🔒</div>
        <h2>Admin Portal</h2>
        <p>Enter the admin password to access the dashboard.</p>
        <div class="form-group">
          <input type="password" id="adminPass" placeholder="Enter password" onkeydown="if(event.key==='Enter')attemptLogin()">
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="attemptLogin()">Sign In</button>
        <p id="authError" style="color:var(--clr-danger); font-size:var(--fs-xs); margin-top:var(--sp-md); display:none;">Incorrect password. Try again.</p>
      </div>
    </div>
  `;
  document.getElementById('adminPass').focus();
}

window.attemptLogin = function () {
  const pass = document.getElementById('adminPass').value;
  if (pass === ADMIN_PASSWORD) {
    sessionStorage.setItem('dek360_admin_auth', 'true');
    showDashboard();
  } else {
    document.getElementById('authError').style.display = 'block';
    document.getElementById('adminPass').value = '';
    document.getElementById('adminPass').focus();
  }
};

function showDashboard() {
  const app = document.getElementById('adminApp');
  app.innerHTML = '';

  // Inject nav
  injectNav('admin');

  app.innerHTML = `
    <div class="admin-layout">
      <button class="admin-sidebar-toggle" id="adminSidebarToggle" onclick="toggleAdminSidebar()" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <aside class="admin-sidebar" id="adminSidebar">
        <h3>Admin Panel</h3>
        <nav class="admin-nav">
          <a href="#" class="active" onclick="showSection('dashboard'); closeSidebarMobile(); return false;">${ICONS.dashboard} Dashboard</a>
          <a href="#" onclick="showSection('posts'); closeSidebarMobile(); return false;">${ICONS.posts} Posts</a>
          <a href="#" onclick="showSection('videos_section'); closeSidebarMobile(); return false;">${ICONS.videos_icon} Videos</a>
          <a href="#" onclick="adminLogout(); return false;" style="margin-top:var(--sp-xl); color:var(--clr-danger);">Logout</a>
        </nav>
      </aside>
      <main class="admin-main" id="adminMain">
        <!-- Sections loaded here -->
      </main>
    </div>

    <!-- Post Modal -->
    <div class="modal-overlay" id="postModal">
      <div class="modal">
        <div class="modal-header">
          <h2 id="modalTitle">Create Post</h2>
          <button class="modal-close" onclick="closeModal()">✕</button>
        </div>
        <form id="postForm" onsubmit="savePost(event)">
          <input type="hidden" id="postId">
          <div class="form-group">
            <label>Title</label>
            <input type="text" id="postTitleInput" required placeholder="Enter post title">
          </div>
          <div class="form-group">
            <label>Excerpt</label>
            <input type="text" id="postExcerpt" required placeholder="Short description">
          </div>
          <div class="form-group">
            <label>Category</label>
            <select id="postCategory">
              <option value="News">News</option>
              <option value="Culture">Culture</option>
              <option value="Events">Events</option>
            </select>
          </div>
          <div class="form-group">
            <label>Image URL</label>
            <input type="url" id="postImage" placeholder="https://example.com/image.jpg">
          </div>
          <div class="form-group">
            <label>Body (HTML)</label>
            <textarea id="postBody" placeholder="<p>Your post content here...</p>"></textarea>
          </div>
          <div class="form-group" style="display:flex; align-items:center; gap:var(--sp-sm);">
            <input type="checkbox" id="postPublished" checked style="width:auto;">
            <label for="postPublished" style="margin:0;">Published</label>
          </div>
          <div class="btn-group" style="justify-content:flex-end;">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Post</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Video Modal -->
    <div class="modal-overlay" id="videoModal">
      <div class="modal">
        <div class="modal-header">
          <h2 id="videoModalTitle">Add Video</h2>
          <button class="modal-close" onclick="closeVideoModal()">✕</button>
        </div>
        <form id="videoForm" onsubmit="saveVideo(event)">
          <input type="hidden" id="videoId">
          <div class="form-group">
            <label>Title</label>
            <input type="text" id="videoTitleInput" required placeholder="Video title">
          </div>
          <div class="form-group">
            <label>YouTube Video ID</label>
            <input type="text" id="videoYoutubeId" required placeholder="e.g. dQw4w9WgXcQ">
          </div>
          <div class="form-group">
            <label>Category</label>
            <select id="videoCategory">
              <option value="Culture">Culture</option>
              <option value="Travel">Travel</option>
              <option value="Music">Music</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>
          <div class="btn-group" style="justify-content:flex-end;">
            <button type="button" class="btn btn-secondary" onclick="closeVideoModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Video</button>
          </div>
        </form>
      </div>
    </div>
  `;

  injectFooter();
  showSection('dashboard');
}

window.showSection = function (section) {
  // Update sidebar active state
  document.querySelectorAll('.admin-nav a').forEach(a => a.classList.remove('active'));
  const links = document.querySelectorAll('.admin-nav a');
  if (section === 'dashboard') links[0]?.classList.add('active');
  if (section === 'posts') links[1]?.classList.add('active');
  if (section === 'videos_section') links[2]?.classList.add('active');

  const main = document.getElementById('adminMain');

  if (section === 'dashboard') {
    const posts = JSON.parse(localStorage.getItem('dek360_posts') || '[]');
    const videos = JSON.parse(localStorage.getItem('dek360_videos') || '[]');
    const published = posts.filter(p => p.published).length;

    // Sync status
    const lastSync = localStorage.getItem('dek360_lastSync');
    const syncStatusHTML = `
          <div class="admin-sync-status">
            <span class="sync-dot ${lastSync ? 'synced' : 'unsynced'}"></span>
            <span>${lastSync ? 'YouTube synced: ' + formatDate(lastSync) : 'Not yet synced'}</span>
            <button class="btn btn-sm btn-secondary" onclick="manualSync()">Sync Now</button>
          </div>
        `;

    main.innerHTML = `
      <div class="admin-header">
        <h1>Dashboard</h1>
        <span style="color:var(--clr-text-muted); font-size:var(--fs-sm);">Welcome back, Admin</span>
      </div>
      ${syncStatusHTML}
      <div class="admin-stats">
        <div class="admin-stat-card">
          <h3>Total Posts</h3>
          <div class="stat-value">${posts.length}</div>
        </div>
        <div class="admin-stat-card">
          <h3>Published</h3>
          <div class="stat-value">${published}</div>
        </div>
        <div class="admin-stat-card">
          <h3>Videos</h3>
          <div class="stat-value">${videos.length}</div>
        </div>
      </div>
      <h2 style="font-size:var(--fs-lg); margin-bottom:var(--sp-lg);">Recent Posts</h2>
      <table class="admin-table">
        <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Status</th></tr></thead>
        <tbody>
          ${posts.slice(0, 5).map(p => `
            <tr>
              <td>${p.title}</td>
              <td>${p.category}</td>
              <td>${formatDate(p.date)}</td>
              <td><span class="badge ${p.published ? 'badge-published' : 'badge-draft'}">${p.published ? 'Published' : 'Draft'}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  if (section === 'posts') {
    const posts = JSON.parse(localStorage.getItem('dek360_posts') || '[]');
    main.innerHTML = `
      <div class="admin-header">
        <h1>Manage Posts</h1>
        <button class="btn btn-primary" onclick="openCreatePost()">${ICONS.plus} New Post</button>
      </div>
      <div class="admin-search-bar">
        <input type="search" id="adminPostSearch" placeholder="Search posts by title..." oninput="filterAdminPosts(this.value)">
      </div>
      <table class="admin-table" id="adminPostsTable">
        <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody id="adminPostsBody">
          ${renderAdminPostRows(posts)}
        </tbody>
      </table>
    `;
  }

  if (section === 'videos_section') {
    const videos = JSON.parse(localStorage.getItem('dek360_videos') || '[]');
    main.innerHTML = `
      <div class="admin-header">
        <h1>Manage Videos</h1>
        <button class="btn btn-primary" onclick="openCreateVideo()">${ICONS.plus} Add Video</button>
      </div>
      <table class="admin-table">
        <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>
          ${videos.map(v => `
            <tr>
              <td>${v.title}</td>
              <td>${v.category}</td>
              <td>${formatDate(v.date)}</td>
              <td>
                <div style="display:flex; gap:var(--sp-sm);">
                  <button class="btn btn-sm btn-secondary" onclick="editVideo('${v.id}')">${ICONS.edit}</button>
                  <button class="btn btn-sm btn-danger" onclick="deleteVideo('${v.id}')">${ICONS.trash}</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
};

// ——— Post CRUD ———
window.openCreatePost = function () {
  document.getElementById('modalTitle').textContent = 'Create Post';
  document.getElementById('postForm').reset();
  document.getElementById('postId').value = '';
  document.getElementById('postPublished').checked = true;
  document.getElementById('postModal').classList.add('active');
};

window.editPost = function (id) {
  const post = getPostById(id);
  if (!post) return;
  document.getElementById('modalTitle').textContent = 'Edit Post';
  document.getElementById('postId').value = post.id;
  document.getElementById('postTitleInput').value = post.title;
  document.getElementById('postExcerpt').value = post.excerpt;
  document.getElementById('postCategory').value = post.category;
  document.getElementById('postImage').value = post.image || '';
  document.getElementById('postBody').value = post.body || '';
  document.getElementById('postPublished').checked = post.published;
  document.getElementById('postModal').classList.add('active');
};

window.savePost = function (e) {
  e.preventDefault();
  const posts = JSON.parse(localStorage.getItem('dek360_posts') || '[]');
  const id = document.getElementById('postId').value;
  const data = {
    title: document.getElementById('postTitleInput').value,
    excerpt: document.getElementById('postExcerpt').value,
    category: document.getElementById('postCategory').value,
    image: document.getElementById('postImage').value,
    body: document.getElementById('postBody').value,
    published: document.getElementById('postPublished').checked,
    date: new Date().toISOString().split('T')[0]
  };

  if (id) {
    const idx = posts.findIndex(p => p.id === id);
    if (idx !== -1) {
      posts[idx] = { ...posts[idx], ...data };
      showToast('Post updated successfully');
    }
  } else {
    data.id = generateId();
    posts.unshift(data);
    showToast('Post created successfully');
  }

  localStorage.setItem('dek360_posts', JSON.stringify(posts));
  closeModal();
  showSection('posts');
};

window.deletePost = function (id) {
  if (!confirm('Are you sure you want to delete this post?')) return;
  let posts = JSON.parse(localStorage.getItem('dek360_posts') || '[]');
  posts = posts.filter(p => p.id !== id);
  localStorage.setItem('dek360_posts', JSON.stringify(posts));
  showToast('Post deleted', 'warning');
  showSection('posts');
};

window.closeModal = function () {
  document.getElementById('postModal').classList.remove('active');
};

// ——— Video CRUD ———
window.openCreateVideo = function () {
  document.getElementById('videoModalTitle').textContent = 'Add Video';
  document.getElementById('videoForm').reset();
  document.getElementById('videoId').value = '';
  document.getElementById('videoModal').classList.add('active');
};

window.editVideo = function (id) {
  const videos = JSON.parse(localStorage.getItem('dek360_videos') || '[]');
  const video = videos.find(v => v.id === id);
  if (!video) return;
  document.getElementById('videoModalTitle').textContent = 'Edit Video';
  document.getElementById('videoId').value = video.id;
  document.getElementById('videoTitleInput').value = video.title;
  document.getElementById('videoYoutubeId').value = video.youtubeId;
  document.getElementById('videoCategory').value = video.category;
  document.getElementById('videoModal').classList.add('active');
};

window.saveVideo = function (e) {
  e.preventDefault();
  let videos = JSON.parse(localStorage.getItem('dek360_videos') || '[]');
  const id = document.getElementById('videoId').value;
  const data = {
    title: document.getElementById('videoTitleInput').value,
    youtubeId: document.getElementById('videoYoutubeId').value,
    category: document.getElementById('videoCategory').value,
    date: new Date().toISOString().split('T')[0]
  };

  if (id) {
    const idx = videos.findIndex(v => v.id === id);
    if (idx !== -1) {
      videos[idx] = { ...videos[idx], ...data };
      showToast('Video updated successfully');
    }
  } else {
    data.id = generateId();
    videos.unshift(data);
    showToast('Video added successfully');
  }

  localStorage.setItem('dek360_videos', JSON.stringify(videos));
  closeVideoModal();
  showSection('videos_section');
};

window.deleteVideo = function (id) {
  if (!confirm('Are you sure you want to delete this video?')) return;
  let videos = JSON.parse(localStorage.getItem('dek360_videos') || '[]');
  videos = videos.filter(v => v.id !== id);
  localStorage.setItem('dek360_videos', JSON.stringify(videos));
  showToast('Video deleted', 'warning');
  showSection('videos_section');
};

window.closeVideoModal = function () {
  document.getElementById('videoModal').classList.remove('active');
};

window.adminLogout = function () {
  sessionStorage.removeItem('dek360_admin_auth');
  location.reload();
};

// ——— Helper: render post rows ———
function renderAdminPostRows(posts) {
  if (!posts || posts.length === 0) {
    return '<tr><td colspan="5" style="text-align:center; color:var(--clr-text-muted); padding:var(--sp-xl);">No posts found.</td></tr>';
  }
  return posts.map(p => `
    <tr>
      <td style="max-width:300px;">${p.title}</td>
      <td>${p.category}</td>
      <td>${formatDate(p.date)}</td>
      <td><span class="badge ${p.published ? 'badge-published' : 'badge-draft'}">${p.published ? 'Published' : 'Draft'}</span></td>
      <td>
        <div style="display:flex; gap:var(--sp-sm);">
          <button class="btn btn-sm btn-secondary" onclick="editPost('${p.id}')">${ICONS.edit}</button>
          <button class="btn btn-sm btn-danger" onclick="deletePost('${p.id}')">${ICONS.trash}</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ——— Admin Posts Live Search ———
window.filterAdminPosts = function (query) {
  const posts = JSON.parse(localStorage.getItem('dek360_posts') || '[]');
  const q = query.toLowerCase().trim();
  const filtered = q ? posts.filter(p => p.title.toLowerCase().includes(q) || (p.excerpt || '').toLowerCase().includes(q)) : posts;
  const tbody = document.getElementById('adminPostsBody');
  if (tbody) tbody.innerHTML = renderAdminPostRows(filtered);
};

// ——— Manual YouTube Sync ———
window.manualSync = async function () {
  showToast('Syncing YouTube feed...', 'success');
  await syncYouTubeVideos();
  const now = new Date().toISOString().split('T')[0];
  localStorage.setItem('dek360_lastSync', now);
  showToast('YouTube synced successfully!', 'success');
  showSection('dashboard');
};

// ——— Admin Mobile Sidebar ———
window.toggleAdminSidebar = function () {
  const sidebar = document.getElementById('adminSidebar');
  const btn = document.getElementById('adminSidebarToggle');
  if (sidebar) sidebar.classList.toggle('open');
  if (btn) btn.classList.toggle('active');
};

window.closeSidebarMobile = function () {
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById('adminSidebar');
    const btn = document.getElementById('adminSidebarToggle');
    if (sidebar) sidebar.classList.remove('open');
    if (btn) btn.classList.remove('active');
  }
};
