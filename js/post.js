/* ===== DEK360 — Single Post Renderer ===== */

document.addEventListener('DOMContentLoaded', () => {
    injectNav('blog');
    injectFooter();

    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if (!postId) {
        document.getElementById('postContent').innerHTML = '<p style="text-align:center; color:var(--clr-text-muted); padding:var(--sp-3xl);">Post not found. <a href="blog.html">Back to blog</a></p>';
        return;
    }

    const post = getPostById(postId);
    if (!post) {
        document.getElementById('postContent').innerHTML = '<p style="text-align:center; color:var(--clr-text-muted); padding:var(--sp-3xl);">Post not found. <a href="blog.html">Back to blog</a></p>';
        return;
    }

    document.title = `${post.title} — DEK360 Ghana`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', post.excerpt);

    document.getElementById('postContent').innerHTML = `
    <span class="post-category">${post.category}</span>
    <h1>${post.title}</h1>
    <div class="post-meta">
      <span>${ICONS.calendar} ${formatDate(post.date)}</span>
      <span>${ICONS.clock} 5 min read</span>
    </div>
    ${post.image ? `<img src="${post.image}" alt="${post.title}" style="width:100%; border-radius:var(--radius-lg); margin-bottom:var(--sp-2xl);">` : ''}
    <div class="post-body">${post.body}</div>
    <div style="margin-top:var(--sp-2xl); padding-top:var(--sp-xl); border-top:1px solid var(--clr-border); display:flex; align-items:center; justify-content:space-between;">
      <a href="blog.html" class="btn btn-secondary">← Back to Blog</a>
      <div style="display:flex; gap:var(--sp-sm);">
        ${SOCIAL_LINKS.slice(0, 3).map(s => `<a href="${s.url}" target="_blank" rel="noopener" class="social-link">${s.icon}</a>`).join('')}
      </div>
    </div>
  `;

    // Related posts
    const posts = JSON.parse(localStorage.getItem('dek360_posts') || '[]')
        .filter(p => p.published && p.id !== postId && p.category === post.category)
        .slice(0, 3);

    if (posts.length > 0) {
        const related = document.getElementById('relatedPosts');
        related.innerHTML = `
      <div class="section-header"><h2>Related Posts</h2></div>
      <div class="grid-3">
        ${posts.map(p => `
          <a href="post.html?id=${p.id}" class="card" style="text-decoration:none; color:inherit;">
            <div class="card-image">
              <img src="${p.image}" alt="${p.title}" loading="lazy">
              <span class="card-category">${p.category}</span>
            </div>
            <div class="card-body">
              <h3>${p.title}</h3>
              <p>${truncate(p.excerpt, 80)}</p>
            </div>
          </a>
        `).join('')}
      </div>
    `;
    }
});
