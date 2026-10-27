/* =========================================================
   SMKN 1 KRAS - XI TKJ 1 - AUTHENTICATION STATE & UI
   ========================================================= */
(function() {
  'use strict';
  const key = 'tkj1_session';

  window.TKJAuth = {
    get() {
      try {
        return JSON.parse(localStorage.getItem(key) || 'null');
      } catch (_) {
        return null;
      }
    },
    set(data) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (_) {}
      updateUI();
    },
    clear() {
      localStorage.removeItem(key);
      updateUI();
    },
    isLoggedIn() {
      return !!this.get();
    },
    canViewProfiles() {
      const s = this.get();
      return !!s && (s.role === 'student' || s.role === 'admin');
    }
  };

  function updateUI() {
    const session = window.TKJAuth.get();
    const nameEl = document.getElementById('authUserName');
    const badgeEl = document.getElementById('authUserRoleBadge');
    const loginLink = document.getElementById('authLoginLink');
    const logoutBtn = document.getElementById('logoutBtn');
    const accountStatusNotice = document.getElementById('accountStatusNotice');

    if (nameEl) {
      if (session) {
        nameEl.textContent = session.name || session.username || (session.role === 'admin' ? 'Admin' : 'Siswa');
      } else {
        nameEl.textContent = 'Portal Login';
      }
    }

    if (badgeEl) {
      if (session) {
        badgeEl.textContent = session.role === 'admin' ? 'ADMIN' : 'SISWA';
        badgeEl.style.display = 'inline-block';
      } else {
        badgeEl.style.display = 'none';
      }
    }

    if (logoutBtn) {
      logoutBtn.hidden = !session;
    }

    if (loginLink) {
      loginLink.hidden = !!session;
    }

    if (accountStatusNotice) {
      if (session) {
        accountStatusNotice.innerHTML = `<i class="fa-solid fa-circle-check text-success me-1"></i> Anda telah login sebagai <b>${session.name || session.username}</b> (${session.role.toUpperCase()}). Akses profil anggota terbuka.`;
        accountStatusNotice.className = 'alert alert-success py-2 px-3 mb-4 rounded-3 small';
      } else {
        accountStatusNotice.innerHTML = `<i class="fa-solid fa-circle-info text-primary me-1"></i> Mode Pengunjung: Silakan <a href="portal.html?role=student" class="alert-link fw-bold">Login Siswa</a> atau <a href="portal.html?role=admin" class="alert-link fw-bold">Admin</a> untuk membuka bio profil lengkap siswa.`;
        accountStatusNotice.className = 'alert alert-info py-2 px-3 mb-4 rounded-3 small';
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateUI();

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.TKJAuth.clear();
        alert('Anda telah keluar dari akun.');
      });
    }
  });
})();
