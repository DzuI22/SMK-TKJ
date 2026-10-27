/* =========================================================
   SMKN 1 KRAS - XI TKJ 1 - PORTAL AUTHENTICATION
   ========================================================= */
const adminAccount = { username: 'admin', password: 'admin123', label: 'ADMIN', name: 'Administrator Kelas' };
const studentAccounts = Array.isArray(window.TKJStudentAccounts) ? window.TKJStudentAccounts : [];
const params = new URLSearchParams(location.search);
let selectedRole = params.get('role') === 'admin' ? 'admin' : 'student';

const form = document.getElementById('loginForm');
const message = document.getElementById('loginMessage');
const username = document.getElementById('username');
const password = document.getElementById('password');
const demoText = document.getElementById('demoText');
const roleHint = document.getElementById('roleHint');
const demoStudentBtn = document.getElementById('demoStudentBtn');
const demoAdminBtn = document.getElementById('demoAdminBtn');

function roleLabel() { 
  return selectedRole === 'admin' ? 'ADMIN' : 'SISWA'; 
}

function updateHint() {
  if (demoText) {
    demoText.textContent = selectedRole === 'admin'
      ? 'Mode ADMIN aktif (Akses pengelolaan)'
      : `Mode SISWA aktif • ${studentAccounts.length} akun tersedia`;
  }
  if (roleHint) {
    roleHint.textContent = selectedRole === 'admin'
      ? 'Gunakan akun admin untuk akses pengelolaan website dan bio profil anggota.'
      : 'Masukkan username & password siswa Anda (misal: siswa001 / password001) untuk membuka bio profil.';
  }
}

document.querySelectorAll('.role').forEach(btn => {
  btn.classList.toggle('active', btn.dataset.role === selectedRole);
  btn.addEventListener('click', () => {
    selectedRole = btn.dataset.role;
    document.querySelectorAll('.role').forEach(x => x.classList.toggle('active', x === btn));
    if (message) {
      message.textContent = '';
      message.className = 'message';
    }
    updateHint();
    if (username) username.focus();
  });
});
updateHint();

// Show/Hide password toggle
const showPasswordBtn = document.getElementById('showPassword');
if (showPasswordBtn && password) {
  showPasswordBtn.addEventListener('click', () => {
    const visible = password.type === 'text';
    password.type = visible ? 'password' : 'text';
    showPasswordBtn.innerHTML = `<i class="fa-solid fa-${visible ? 'eye' : 'eye-slash'}"></i>`;
  });
}

// Quick demo buttons
if (demoStudentBtn) {
  demoStudentBtn.addEventListener('click', () => {
    // Switch to student tab
    selectedRole = 'student';
    document.querySelectorAll('.role').forEach(x => x.classList.toggle('active', x.dataset.role === 'student'));
    updateHint();
    if (username) username.value = 'siswa001';
    if (password) password.value = 'password001';
    if (message) { message.textContent = ''; message.className = 'message'; }
  });
}

if (demoAdminBtn) {
  demoAdminBtn.addEventListener('click', () => {
    // Switch to admin tab
    selectedRole = 'admin';
    document.querySelectorAll('.role').forEach(x => x.classList.toggle('active', x.dataset.role === 'admin'));
    updateHint();
    if (username) username.value = 'admin';
    if (password) password.value = 'admin123';
    if (message) { message.textContent = ''; message.className = 'message'; }
  });
}

// Form submission
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const u = username.value.trim();
    const pass = password.value;
    let account = null;

    if (selectedRole === 'admin') {
      if (u === adminAccount.username && pass === adminAccount.password) {
        account = adminAccount;
      }
    } else {
      account = studentAccounts.find(a => a.username === u && a.password === pass) || null;
    }

    if (account) {
      localStorage.setItem('tkj1_session', JSON.stringify({
        username: account.username,
        name: account.name || account.username,
        role: selectedRole,
        loginAt: Date.now()
      }));
      message.textContent = `Login ${roleLabel()} berhasil! Mengalihkan ke website...`;
      message.className = 'message success';
      setTimeout(() => location.replace('index.html'), 400);
    } else {
      message.textContent = 'Username atau password tidak sesuai. Silakan periksa kembali.';
      message.className = 'message error';
      password.select();
    }
  });
}
