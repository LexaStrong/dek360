// DEK360 Admin — Login Logic
(function () {
    'use strict';

    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const errorMsg = document.getElementById('errorMsg');

    // Check if already logged in
    async function checkSession() {
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        if (session) {
            window.location.href = 'admin.html';
        }
    }

    checkSession();

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Reset state
        errorMsg.style.display = 'none';
        loginBtn.disabled = true;
        loginBtn.textContent = 'Signing in...';

        try {
            const { data, error } = await window.supabaseClient.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            if (data.session) {
                window.location.href = 'admin.html';
            }
        } catch (err) {
            errorMsg.textContent = err.message || 'Invalid login credentials';
            errorMsg.style.display = 'block';
            loginBtn.disabled = false;
            loginBtn.textContent = 'Sign In';
        }
    });

    // Theme matching
    const currentTheme = localStorage.getItem('dek360-adm-theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

})();
