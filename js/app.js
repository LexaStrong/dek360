/* ===== DEK360 GHANA — Shared App Logic ===== */

// ——— SVG Icons ———
const ICONS = {
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5v14"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16M4 6h16M4 18h16"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  arrow_right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>',
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
  posts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/></svg>',
  videos_icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/></svg>'
};

const SOCIAL_LINKS = [
  { name: 'YouTube', url: 'https://www.youtube.com/@DEK360GHANA', icon: ICONS.youtube },
  { name: 'Instagram', url: 'https://www.instagram.com/dek360ghana', icon: ICONS.instagram },
  { name: 'Twitter / X', url: 'https://twitter.com/dek360ghana', icon: ICONS.twitter },
  { name: 'Facebook', url: 'https://www.facebook.com/dek360ghana', icon: ICONS.facebook },
  { name: 'TikTok', url: 'https://www.tiktok.com/@dek360ghana', icon: ICONS.tiktok }
];

// ——— Demo Data Seeding ———
function seedDemoData() {
  if (!localStorage.getItem('dek360_posts')) {
    const posts = [
      {
        id: '1', title: 'The Rise of Afrobeats: How Ghana Is Leading the Charge',
        excerpt: 'From highlife to hiplife to Afrobeats — Ghana\'s music scene continues to shake the world stage with genre-defining artists.',
        body: '<p>Ghana has long been at the forefront of African music innovation. From the golden era of highlife music pioneered by legends like E.T. Mensah, to the revolutionary hiplife movement sparked by Reggie Rockstone in the 1990s, the country\'s musical DNA has always been about evolution and boundary-pushing.</p><p>Today, a new generation of Ghanaian artists is carrying that torch on the global stage. Acts like Sarkodie, Stonebwoy, and Black Sherif have not only dominated African charts but have made significant inroads into Western music markets. The fusion of traditional rhythms with modern production techniques has created a sound that is uniquely Ghanaian yet universally appealing.</p><p>The infrastructure supporting this growth has also expanded dramatically. Recording studios, music festivals, and digital distribution platforms have all proliferated, making it easier than ever for Ghanaian artists to reach global audiences. Social media platforms, particularly TikTok and YouTube, have become launching pads for viral hits that cross continental boundaries.</p>',
        category: 'Culture', date: '2026-02-18', published: true,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600'
      },
      {
        id: '2', title: 'Year of Return 2.0: Ghana Tourism Hits Record Numbers',
        excerpt: 'Following the massive success of the Year of Return, Ghana continues to attract diasporans and tourists from around the world.',
        body: '<p>Ghana\'s tourism sector has experienced unprecedented growth following the success of the Year of Return initiative launched in 2019. The campaign, which invited African diasporans to return to their ancestral homeland, attracted over 1.5 million visitors and generated an estimated $3.8 billion in revenue.</p><p>Building on this momentum, the Beyond the Return initiative has continued to draw visitors, with record numbers being recorded year after year. Key attractions include the Cape Coast Castle, Kakum National Park, Lake Volta, and the vibrant Accra nightlife scene.</p><p>The government has invested heavily in tourism infrastructure, with new hotels, improved roads, and enhanced airport facilities making the country more accessible than ever. Cultural festivals like Afrochella and Detty December have become annual must-attend events on the global calendar.</p>',
        category: 'News', date: '2026-02-15', published: true,
        image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600'
      },
      {
        id: '3', title: 'Inside Accra\'s Booming Tech Scene',
        excerpt: 'From startups to tech hubs, Accra is fast becoming the Silicon Valley of West Africa with innovative solutions for Africa.',
        body: '<p>Accra\'s technology ecosystem has exploded in recent years, earning the city recognition as one of Africa\'s most dynamic tech hubs. With spaces like iSpace, MEST, and the Ghana Innovation Hub fostering the next generation of tech entrepreneurs, the city has become a magnet for talent and investment.</p><p>Homegrown startups are tackling some of Africa\'s most pressing challenges — from fintech solutions making banking accessible to millions, to agritech platforms connecting farmers with markets, to healthtech innovations bringing quality healthcare to underserved communities.</p><p>International tech giants have also taken notice. Google, Twitter, and Microsoft have all established significant presences in Accra, attracted by the city\'s young, educated workforce and favorable business environment. The AfCFTA headquarters being located in Accra has further cemented the city\'s position as a gateway for business in Africa.</p>',
        category: 'News', date: '2026-02-12', published: true,
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600'
      },
      {
        id: '4', title: 'Ghanaian Cuisine Goes Global: Jollof Wars and Beyond',
        excerpt: 'From street food stalls in Accra to Michelin-starred restaurants in London, Ghanaian food is having its moment.',
        body: '<p>The global food scene has warmly embraced Ghanaian cuisine, with dishes like jollof rice, waakye, and kelewele finding fans far beyond West Africa\'s borders. Celebrity chefs and food influencers have played a significant role in popularizing these dishes on social media.</p><p>Ghanaian restaurants are popping up in major cities worldwide, from New York to London to Dubai. These establishments are not just serving traditional dishes but reimagining them with modern culinary techniques, creating a new fusion cuisine that honors tradition while embracing innovation.</p><p>The annual "Jollof Wars" between Ghana and Nigeria continue to generate playful rivalry and massive social media engagement, bringing even more attention to the rich culinary traditions of both countries.</p>',
        category: 'Culture', date: '2026-02-08', published: true,
        image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600'
      },
      {
        id: '5', title: 'Ghana Fashion Week 2026: Trends and Highlights',
        excerpt: 'The latest edition of Ghana Fashion Week showcased stunning designs blending traditional kente with contemporary fashion.',
        body: '<p>Ghana Fashion Week 2026 delivered yet another spectacular showcase of African creativity and design excellence. This year\'s edition featured over 40 designers from across the continent, with a strong emphasis on sustainable fashion and traditional textile innovation.</p><p>Kente cloth, Ghana\'s most iconic textile, was reimagined in ways never seen before — from avant-garde evening wear to streetwear-inspired collections. Young designers pushed boundaries while paying homage to the rich weaving traditions of the Ashanti and Ewe peoples.</p><p>International fashion media covered the event extensively, with Vogue, Harper\'s Bazaar, and other major publications featuring Ghanaian designers in their coverage. The event has firmly established Accra as a fashion capital alongside Lagos, Johannesburg, and Nairobi.</p>',
        category: 'Events', date: '2026-02-05', published: true,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600'
      },
      {
        id: '6', title: 'Black Stars: Road to the World Cup 2026',
        excerpt: 'The Black Stars are preparing for an exciting World Cup campaign. Here\'s everything you need to know about Ghana\'s journey.',
        body: '<p>The Black Stars of Ghana are gearing up for what promises to be a thrilling World Cup 2026 campaign. With a blend of experienced veterans and exciting young talent, the team is looking to improve on their previous tournament performances and make a deep run.</p><p>Key players to watch include emerging stars who have been making waves in Europe\'s top leagues, alongside established names who bring invaluable tournament experience. The coaching staff has been working tirelessly on tactical preparations, with a focus on playing attractive, attacking football.</p><p>Fan excitement is at fever pitch, with supporters planning elaborate travel arrangements to follow the team. The unity between the diaspora and home-based fans has created a powerful support base that the team can draw energy from.</p>',
        category: 'News', date: '2026-02-01', published: true,
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600'
      }
    ];
    localStorage.setItem('dek360_posts', JSON.stringify(posts));
  }

  if (!localStorage.getItem('dek360_videos')) {
    const videos = [
      { id: 'v1', title: 'Made In Taadi Goes Wild as Samini, Sarkodie, Medikal & Top Acts Storm Takoradi 🔥', youtubeId: '7A2S7vN2myM', category: 'Culture', date: '2026-02-18' },
      { id: 'v2', title: 'Odo Broni And Abusuapanin Tupuc Reunite Again After Daddy Lumba\'s Funeral 🔥', youtubeId: 'ZLTtyefOzs4', category: 'Culture', date: '2026-02-15' },
      { id: 'v3', title: 'Unstoppable Energy! Kweku Smoke\'s Massive Entrance Shakes Revival Concert 🔥🔥🔥', youtubeId: 'kic2U6gw3L8', category: 'Music', date: '2026-02-12' },
      { id: 'v4', title: 'Daddy Lumba\'s Children Surprises Their Father as They Read His Tribute 😭💔', youtubeId: 'v_JlYUbW-SY', category: 'Culture', date: '2026-02-10' },
      { id: 'v5', title: 'Nana Acheampong Performs His Song With Daddy Lumba At His Funeral to Say GoodBye 😭💔', youtubeId: 'd2MxEm9yUyA', category: 'Music', date: '2026-02-07' },
      { id: 'v6', title: 'Watch How Daddy Lumba\'s Body Was Transported From Accra To Kumasi For Burial', youtubeId: 'F4WOegWNGtE', category: 'Culture', date: '2026-02-04' },
      { id: 'v7', title: 'Final Goodbye to Yvonne Amoateng: Emotional Farewell After Elwak Stadium Tragedy 💔🙏', youtubeId: '2OyszOK20Xo', category: 'Lifestyle', date: '2026-02-01' },
      { id: 'v8', title: 'Akosua Bempomaa & Papa Shee Storm Accra High Court After Daddy Lumba\'s Final Funeral Date', youtubeId: 'GS6CdjCsNio', category: 'Culture', date: '2026-01-28' }
    ];
    localStorage.setItem('dek360_videos', JSON.stringify(videos));
  }
}

// ——— Navigation ———
function injectNav(activePage) {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'navbar';
  nav.innerHTML = `
    <div class="container">
      <a href="index.html" class="nav-logo">
        <img src="assets/logo.jpg" alt="DEK360 Logo" style="width:36px; height:36px; border-radius:50%; object-fit:cover; border:2px solid var(--clr-primary);">
        <span>DEK360</span>
      </a>
      <div class="nav-links" id="navLinks">
        <a href="index.html" class="${activePage === 'home' ? 'active' : ''}">Home</a>
        <a href="blog.html" class="${activePage === 'blog' ? 'active' : ''}">Blog</a>
        <a href="videos.html" class="${activePage === 'videos' ? 'active' : ''}">Videos</a>
        <a href="about.html" class="${activePage === 'about' ? 'active' : ''}">About</a>
        <a href="contact.html" class="${activePage === 'contact' ? 'active' : ''}">Contact</a>
      </div>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;
  document.body.prepend(nav);

  // Mobile toggle
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
  });

  // Close on link click (mobile)
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('active');
    });
  });

  // Scroll effect
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ——— Footer ———
function injectFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo" style="margin-bottom: 0;">
            <img src="assets/logo.jpg" alt="DEK360 Logo" style="width:32px; height:32px; border-radius:50%; object-fit:cover; border:2px solid var(--clr-primary);">
            <span>DEK360</span>
          </a>
          <p>Bringing Ghana's culture, entertainment, and stories to the world. Your one-stop platform for everything Ghanaian.</p>
          <div class="social-links">
            ${SOCIAL_LINKS.map(s => `<a href="${s.url}" class="social-link" target="_blank" rel="noopener" title="${s.name}">${s.icon}</a>`).join('')}
          </div>
        </div>
        <div class="footer-col">
          <h4>Pages</h4>
          <a href="index.html">Home</a>
          <a href="blog.html">Blog</a>
          <a href="videos.html">Videos</a>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Categories</h4>
          <a href="blog.html?cat=News">News</a>
          <a href="blog.html?cat=Culture">Culture</a>
          <a href="blog.html?cat=Events">Events</a>
          <a href="videos.html">Videos</a>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          ${SOCIAL_LINKS.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.name}</a>`).join('')}
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} DEK360 Ghana. All rights reserved.</span>
        <span>Made with ❤️ in Accra</span>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

// ——— Toast Notifications ———
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ——— Fade-in Observer ———
function initFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ——— Helpers ———
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getPostById(id) {
  const posts = JSON.parse(localStorage.getItem('dek360_posts') || '[]');
  return posts.find(p => p.id === id);
}

function truncate(str, len = 120) {
  if (str.length <= len) return str;
  return str.substring(0, len).trim() + '…';
}

// ——— YouTube Automation ———
const CHANNEL_ID = 'UCRJ2_AM0BGRR3X7QbkjRBWA';
const RSS_TO_JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3D${CHANNEL_ID}`;

async function syncYouTubeVideos() {
  try {
    const response = await fetch(RSS_TO_JSON_URL);
    const data = await response.json();

    if (data.status === 'ok' && data.items) {
      const feedVideos = data.items.map(item => ({
        id: 'yt_' + item.guid.split(':')[2],
        title: item.title,
        youtubeId: item.guid.split(':')[2],
        category: 'YouTube',
        date: item.pubDate.split(' ')[0],
        isAuto: true
      }));

      // Merge with local videos (manual additions via admin)
      const localVideos = JSON.parse(localStorage.getItem('dek360_videos') || '[]');
      const manualVideos = localVideos.filter(v => !v.isAuto);

      // Combine and sort by date
      const combined = [...feedVideos, ...manualVideos].sort((a, b) => new Date(b.date) - new Date(a.date));
      localStorage.setItem('dek360_videos', JSON.stringify(combined));

      // Trigger custom event so pages can re-render if needed
      document.dispatchEvent(new CustomEvent('videosSynced'));
      return combined;
    }
  } catch (error) {
    console.error('YouTube sync failed:', error);
  }
}

// ——— Scroll-to-Top Button ———
function injectScrollToTop() {
  const btn = document.createElement('button');
  btn.id = 'scrollTopBtn';
  btn.className = 'scroll-top-btn';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ——— Count-Up Animation ———
function initCountUp() {
  const els = document.querySelectorAll('.stat-number, .hero-stat .number');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.dataset.counted) return;
      el.dataset.counted = '1';

      const raw = el.textContent.trim();
      const suffix = raw.match(/[^\d.,]+$/)?.[0] || '';
      const numStr = raw.replace(/[^\d.]/g, '');
      const target = parseFloat(numStr);
      if (isNaN(target)) return;

      const duration = 1800;
      const start = performance.now();
      const isFloat = numStr.includes('.');

      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = target * ease;
        el.textContent = (isFloat ? current.toFixed(1) : Math.round(current).toLocaleString()) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  els.forEach(el => observer.observe(el));
}

// ——— Init ———
document.addEventListener('DOMContentLoaded', () => {
  seedDemoData();
  syncYouTubeVideos();
  setTimeout(initFadeIn, 100);
  setTimeout(initCountUp, 200);
  injectScrollToTop();
});
