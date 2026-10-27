/* ==========================================================================
   SMKN 1 KRAS - XI TKJ 1 (CYBER CLASS)
   Main Interactive Logic & Real-time Schedule Widget
   Inspired by https://smknegeri1kras.sch.id
   ========================================================================== */

(() => {
  'use strict';

  /* ==========================================================================
     1. DATA ANGGOTA KELAS XI TKJ 1 (36 Siswa)
     ========================================================================== */
  const members = [
    {
      name: "Ach Yudi Cahyono",
      role: "Member",
      category: "member",
      image: "assets/yudi.jpg",
      skills: "Hardware, Network Troubleshooting",
      nisn: "0078129011",
      bio: "Fokus mendalami teknik perakitan komputer dan konfigurasi LAN."
    },
    {
      name: "Alfi Roisatul Falia",
      role: "Member",
      category: "member",
      image: "assets/alfi.jpg",
      skills: "Administrasi Sistem, Desain UI",
      nisn: "0078129012",
      bio: "Tertarik pada tata kelola administrasi server dan desain antarmuka."
    },
    {
      name: "Alvino Adityas Pratama P",
      role: "Member",
      category: "member",
      image: "assets/alvino.jpg",
      skills: "Routing Switching, MikroTik",
      nisn: "0078129013",
      bio: "Siswa aktif dalam konfigurasi routerboard dan hotspot lab."
    },
    {
      name: "Alya Nur Fadilah",
      role: "Member",
      category: "member",
      image: "assets/alya.jpg",
      skills: "Jaringan Komputer, Office",
      nisn: "0078129014",
      bio: "Berkomitmen menjaga kekompakan dan ketelitian praktikum jaringan."
    },
    {
      name: "Azkya Viorentina Faradita",
      role: "Member",
      category: "member",
      image: "assets/azkya.jpg",
      skills: "Network Cable Crimping, Linux",
      nisn: "0078129015",
      bio: "Ahli dalam crimping kabel straight/cross dan manajemen instalasi OS."
    },
    {
      name: "Aurelia Siva Ayasha",
      role: "Member",
      category: "member",
      image: "assets/aurelia.jpg",
      skills: "Dokumentasi Teknis, Web Basics",
      nisn: "0078129016",
      bio: "Menyukai eksplorasi teknologi informasi dan jaringan nirkabel."
    },
    {
      name: "Aringga Rheza Pratama",
      role: "Member",
      category: "member",
      image: "assets/aringga.jpg",
      skills: "Fiber Optic, Splicing",
      nisn: "0078129017",
      bio: "Fokus pada pengoperasian fusions splicer dan kabel serat optik."
    },
    {
      name: "Cika Ul Umaha",
      role: "Member",
      category: "member",
      image: "assets/cika.jpg",
      skills: "Keamanan Komputer, Web",
      nisn: "0078129018",
      bio: "Mempelajari fundamental keamanan siber dan perlindungan data."
    },
    {
      name: "Desvita Ayu Sania",
      role: "Member",
      category: "member",
      image: "assets/despita.jpg",
      skills: "Jaringan Nirkabel, Troubleshooting",
      nisn: "0078129019",
      bio: "Siap mengaplikasikan kompetensi kejuruan TKJ di dunia industri."
    },
    {
      name: "Dina Otaviana",
      role: "Sekretaris",
      category: "lead",
      image: "assets/dina.jpg",
      skills: "Administrasi Kelas, Dokumentasi",
      nisn: "0078129020",
      bio: "Mengelola persuratan, agenda kelas, dan arsip kegiatan XI TKJ 1."
    },
    {
      name: "Feriska Aulia Mayda",
      role: "Member",
      category: "member",
      image: "assets/feriska.jpg",
      skills: "Server Debian, Routing",
      nisn: "0078129021",
      bio: "Antusias dalam praktikum instalasi server lokal dan hosting."
    },
    {
      name: "Enisa Vita Agustin",
      role: "Member",
      category: "member",
      image: "assets/enisa.jpg",
      skills: "Jaringan LAN, Cisco Packet Tracer",
      nisn: "0078129022",
      bio: "Menguasai simulasi topologi jaringan pada Cisco Packet Tracer."
    },
    {
      name: "Elis Nurdiyana Putri",
      role: "Member",
      category: "member",
      image: "assets/elis.jpg",
      skills: "Administrasi Jaringan, Mikrotik",
      nisn: "0078129023",
      bio: "Berdedikasi untuk meningkatkan skill teknologi jaringan masa depan."
    },
    {
      name: "Fita Dwi Anggraini",
      role: "Member",
      category: "member",
      image: "assets/fita.jpg",
      skills: "Jaringan Komputer, Server",
      nisn: "0078129024",
      bio: "Tekun dan teliti dalam konfigurasi IP Address dan subnetting."
    },
    {
      name: "Ines Alfina Rahma",
      role: "Member",
      category: "member",
      image: "assets/ines.jpg",
      skills: "Troubleshooting Komputer, Web",
      nisn: "0078129025",
      bio: "Selalu bersemangat mempelajari hal-hal baru di lab TKJ."
    },
    {
      name: "Irfan Wahyu Prasetio",
      role: "Ketua Kelas",
      category: "lead",
      image: "assets/irfan.jpg",
      skills: "Kepemimpinan, Network Engineer",
      nisn: "0078129026",
      bio: "Memimpin keluarga besar XI TKJ 1 dengan integritas dan semangat kekeluargaan."
    },
    {
      name: "Lucky Akbar Al Fitroh",
      role: "Wakil Ketua Kelas",
      category: "lead",
      image: "assets/lucky.jpg",
      skills: "Koordinasi, Wireless Network",
      nisn: "0078129027",
      bio: "Mendampingi ketua kelas dalam menjaga ketertiban dan kemajuan kelas."
    },
    {
      name: "Kirania Putri Shahanaz",
      role: "Member",
      category: "member",
      image: "assets/kiran.jpg",
      skills: "Computer Maintenance, Graphic",
      nisn: "0078129028",
      bio: "Senang menggabungkan pemahaman teknis dengan visual kreatif."
    },
    {
      name: "Kharizma Aiya Anatasya",
      role: "Member",
      category: "member",
      image: "assets/kharizma.jpg",
      skills: "Jaringan Kabel, Sistem Operasi",
      nisn: "0078129029",
      bio: "Fokus belajar instalasi OS jaringan dan pemeliharaan PC."
    },
    {
      name: "Marsya Aufa Nur Salsabila",
      role: "Member",
      category: "member",
      image: "assets/marsya.jpg",
      skills: "Subnetting, Mikrotik MTCNA",
      nisn: "0078129030",
      bio: "Bertekad menguasai sertifikasi kompetensi jaringan komputer."
    },
    {
      name: "Miftakhul Huda",
      role: "Member",
      category: "member",
      image: "assets/huda.jpg",
      skills: "Hardware, Crimping & Splicing",
      nisn: "0078129031",
      bio: "Ahli di bidang teknis perangkat keras dan perbaikan jalur jaringan."
    },
    {
      name: "Moh Dzul Fiqri A.B",
      role: "Programmer",
      category: "tech",
      image: "assets/dzul.jpg",
      skills: "Full-Stack Web Dev, Cyber Security, Network Automation",
      nisn: "0078129032",
      bio: "Pengembang utama arsitektur website resmi kelas XI TKJ 1 SMKN 1 Kras."
    },
    {
      name: "Mohammad Indra Suwardana P",
      role: "Wakil Programmer",
      category: "tech",
      image: "assets/indra.jpg",
      skills: "Frontend Development, Scripting",
      nisn: "0078129033",
      bio: "Membantu pengembangan kode, logika interaktif, dan pemeliharaan website."
    },
    {
      name: "Muhamad Farhan Daffa",
      role: "Member",
      category: "member",
      image: "assets/farhan.jpg",
      skills: "Routing, Switching, Mikrotik",
      nisn: "0078129034",
      bio: "Aktif dalam uji coba router dan implementasi VLAN pada switch."
    },
    {
      name: "Muhammad Ezar Maulana Malik",
      role: "Member",
      category: "member",
      image: "assets/ezar.jpg",
      skills: "Perakitan Komputer, Linux Server",
      nisn: "0078129035",
      bio: "Tertarik pada sistem operasi open source dan server Linux."
    },
    {
      name: "Muhammad Imam Vahrurrozi",
      role: "Member",
      category: "member",
      image: "assets/imam.jpg",
      skills: "Infrastruktur Jaringan, Wi-Fi Setup",
      nisn: "0078129036",
      bio: "Berpengalaman mengatur access point dan optimasi sinyal Wi-Fi."
    },
    {
      name: "Naila Naswa Dzahabiyyah",
      role: "Member",
      category: "member",
      image: "assets/naila.jpg",
      skills: "Administrasi Sistem, Desain",
      nisn: "0078129037",
      bio: "Mengutamakan kerapian dokumen dan kebersihan laboratorium komputer."
    },
    {
      name: "Neneng Anjarwati",
      role: "Member",
      category: "member",
      image: "assets/neneng.jpg",
      skills: "Jaringan Dasar, Software",
      nisn: "0078129038",
      bio: "Konsisten belajar dan mengasah keterampilan teknologi informasi."
    },
    {
      name: "Noval Dwi Alvino",
      role: "Member",
      category: "member",
      image: "assets/noval.jpg",
      skills: "MikroTik, Network Security",
      nisn: "0078129039",
      bio: "Mendalami firewall, NAT, dan proteksi jaringan dari serangan luar."
    },
    {
      name: "Nurrisadiyah Ika Fadliana",
      role: "Member",
      category: "member",
      image: "assets/nuris.jpg",
      skills: "Kabel Jaringan, Administrasi",
      nisn: "0078129040",
      bio: "Disiplin dan aktif mengikuti seluruh pembelajaran vokasi TKJ."
    },
    {
      name: "Putri Ridia Artika Sari",
      role: "Member",
      category: "member",
      image: "assets/putri.jpg",
      skills: "Office, Desain Web",
      nisn: "0078129041",
      bio: "Mendukung kelancaran publikasi dan dokumentasi kelas."
    },
    {
      name: "Reyhana Zema Zahira",
      role: "Bendahara",
      category: "lead",
      image: "assets/zema.jpg",
      skills: "Keuangan Kelas, Administrasi",
      nisn: "0078129042",
      bio: "Mengelola transparansi kas kelas dan anggaran kebutuhan praktikum."
    },
    {
      name: "Risma Fitri Amelia",
      role: "Member",
      category: "member",
      image: "assets/risma.jpg",
      skills: "Jaringan Komputer, Troubleshooting",
      nisn: "0078129043",
      bio: "Siap menjadi lulusan vokasi SMKN 1 Kras yang kompeten dan berkarakter."
    },
    {
      name: "Savira Aulia Dias Avria",
      role: "Bendahara",
      category: "lead",
      image: "assets/savira.jpg",
      skills: "Keuangan Kelas, Perencanaan",
      nisn: "0078129044",
      bio: "Bersama mengelola perbendaharaan kelas secara akuntabel dan tertib."
    },
    {
      name: "Shela Febriyanti",
      role: "Member",
      category: "member",
      image: "assets/shela.jpg",
      skills: "Manajemen Jaringan, Server",
      nisn: "0078129045",
      bio: "Fokus pada penguatan kompetensi produktif TKJ menghadapi PKL."
    },
    {
      name: "Vega Aulia Renata",
      role: "Member",
      category: "member",
      image: "assets/vega.jpg",
      skills: "Komputer & Jaringan, Kreatif",
      nisn: "0078129046",
      bio: "Senantiasa berkolaborasi demi prestasi dan kemajuan kelas XI TKJ 1."
    }
  ];

  /* ==========================================================================
     2. RENDER ANGGOTA KELAS & FILTER
     ========================================================================== */
  const membersGrid = document.getElementById('membersGrid');
  const studentSearchInput = document.getElementById('studentSearchInput');
  const studentCountBadge = document.getElementById('studentCountBadge');
  const filterPills = document.querySelectorAll('.filter-pill');
  let currentCategory = 'all';
  let searchQuery = '';

  function renderMembers() {
    if (!membersGrid) return;
    membersGrid.innerHTML = '';

    const filtered = members.filter(member => {
      const matchCat = currentCategory === 'all' || member.category === currentCategory;
      const matchSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.skills.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (studentCountBadge) {
      studentCountBadge.textContent = `${filtered.length} Siswa`;
    }

    if (filtered.length === 0) {
      membersGrid.innerHTML = `
        <div class="col-12 text-center py-5" style="grid-column: 1 / -1;">
          <i class="fa-solid fa-user-slash text-muted mb-2" style="font-size: 2.5rem;"></i>
          <h5 class="fw-bold text-secondary">Tidak ada siswa ditemukan</h5>
          <p class="text-muted small">Coba ubah kata kunci pencarian atau kategori filter.</p>
        </div>
      `;
      return;
    }

    filtered.forEach((member) => {
      const globalIndex = members.indexOf(member);
      const card = document.createElement('div');
      card.className = 'member-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Lihat profil ${member.name}`);
      card.dataset.index = globalIndex;

      let roleClass = '';
      if (member.category === 'lead') roleClass = 'lead';
      else if (member.category === 'tech') roleClass = 'tech';

      card.innerHTML = `
        <span class="member-num-badge">${String(globalIndex + 1).padStart(2, '0')}</span>
        <div class="member-photo-wrap">
          <img src="${member.image}" alt="${member.name}" class="member-photo" loading="lazy" decoding="async" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0ea5e9&color=fff'">
        </div>
        <h4 class="member-name">${member.name}</h4>
        <span class="member-role-badge ${roleClass}">${member.role}</span>
        <p class="member-class-tag"><i class="fa-solid fa-graduation-cap me-1"></i>XI TKJ 1</p>
        <div class="member-view-btn">
          <span>Detail Profil</span>
          <i class="fa-solid fa-arrow-right-long"></i>
        </div>
      `;

      card.addEventListener('click', () => openMemberProfile(globalIndex));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openMemberProfile(globalIndex);
        }
      });

      membersGrid.appendChild(card);
    });
  }

  // Search input handler
  if (studentSearchInput) {
    studentSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderMembers();
    });
  }

  // Filter pills handler
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.filter || 'all';
      renderMembers();
    });
  });

  /* ==========================================================================
     3. MEMBER PROFILE MODAL
     ========================================================================== */
  const memberModal = document.getElementById('memberModal');
  const memberModalClose = document.getElementById('memberModalClose');
  const modalPhoto = document.getElementById('modalPhoto');
  const modalName = document.getElementById('modalName');
  const modalRole = document.getElementById('modalRole');
  const modalNumber = document.getElementById('modalNumber');
  const modalNisn = document.getElementById('modalNisn');
  const modalSkills = document.getElementById('modalSkills');
  const modalBio = document.getElementById('modalBio');

  function openMemberProfile(index) {
    const member = members[index];
    if (!member || !memberModal) return;

    // Check if user is logged in
    const auth = window.TKJAuth;
    const canView = auth && auth.canViewProfiles();

    if (!canView) {
      const confirmLogin = confirm(
        `Bio & profil lengkap siswa (${member.name}) dilindungi autentikasi sekolah.\n\nApakah Anda ingin membuka Portal Login untuk masuk sebagai Siswa atau Admin?`
      );
      if (confirmLogin) {
        window.location.href = 'portal.html?role=student';
      }
      return;
    }

    if (modalPhoto) {
      modalPhoto.src = member.image;
      modalPhoto.onerror = function() {
        this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0ea5e9&color=fff`;
      };
    }
    if (modalName) modalName.textContent = member.name;
    if (modalRole) modalRole.textContent = member.role;
    if (modalNumber) modalNumber.textContent = String(index + 1).padStart(2, '0');
    if (modalNisn) modalNisn.textContent = member.nisn || '-';
    if (modalSkills) modalSkills.textContent = member.skills || 'Teknik Komputer dan Jaringan';
    if (modalBio) modalBio.textContent = member.bio || 'Siswa aktif kompetensi keahlian TKJ SMKN 1 Kras.';

    memberModal.classList.add('show');
    memberModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (memberModalClose) memberModalClose.focus();
  }

  function closeMemberProfile() {
    if (!memberModal) return;
    memberModal.classList.remove('show');
    memberModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (memberModalClose) memberModalClose.addEventListener('click', closeMemberProfile);
  if (memberModal) {
    memberModal.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-close-member') || e.target === memberModal) {
        closeMemberProfile();
      }
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && memberModal?.classList.contains('show')) {
      closeMemberProfile();
    }
  });

  /* ==========================================================================
     4. REALTIME JAM PELAJARAN WIDGET (Exact SMKN 1 Kras Schedule Engine)
     ========================================================================== */
  function t(h, m) { return h * 60 + m; }

  const JADWAL = {
    // SENIN - ADA UPACARA
    '1_upacara': [
      { label: 'Upacara Bendera',               mulai: t(7,0),  akhir: t(7,50), istirahat: true },
      { label: 'Jam ke-2: B. Indonesia',        mulai: t(8,0),  akhir: t(8,40) },
      { label: 'Jam ke-3: B. Indonesia',        mulai: t(8,40), akhir: t(9,20) },
      { label: 'Jam ke-4: B. Indonesia',        mulai: t(9,20), akhir: t(10,0) },
      { label: 'Istirahat 1',                   mulai: t(10,0), akhir: t(10,15), istirahat: true },
      { label: 'Jam ke-5: Jaringan Komputer',   mulai: t(10,15),akhir: t(10,55) },
      { label: 'Jam ke-6: Jaringan Komputer',   mulai: t(10,55),akhir: t(11,35) },
      { label: 'Jam ke-7: Jaringan Komputer',   mulai: t(11,35),akhir: t(12,15) },
      { label: 'Istirahat 2 / Sholat Dzuhur',   mulai: t(12,15),akhir: t(12,45), istirahat: true },
      { label: 'Jam ke-8: Praktikum Kabel/Lab', mulai: t(12,45),akhir: t(13,25) },
      { label: 'Jam ke-9: Praktikum Kabel/Lab', mulai: t(13,25),akhir: t(14,5) },
      { label: 'Jam ke-10: Evaluasi Harian',    mulai: t(14,5), akhir: t(14,45) }
    ],
    // SENIN - TANPA UPACARA
    '1_biasa': [
      { label: 'Jam ke-1: B. Indonesia',        mulai: t(7,0),  akhir: t(7,40) },
      { label: 'Jam ke-2: B. Indonesia',        mulai: t(7,40), akhir: t(8,20) },
      { label: 'Jam ke-3: B. Indonesia',        mulai: t(8,20), akhir: t(9,0) },
      { label: 'Istirahat 1',                   mulai: t(9,0),  akhir: t(9,15), istirahat: true },
      { label: 'Jam ke-4: Jaringan Komputer',   mulai: t(9,15), akhir: t(9,55) },
      { label: 'Jam ke-5: Jaringan Komputer',   mulai: t(9,55), akhir: t(10,35) },
      { label: 'Jam ke-6: Jaringan Komputer',   mulai: t(10,35),akhir: t(11,15) },
      { label: 'Istirahat 2 / Sholat Dzuhur',   mulai: t(11,15),akhir: t(11,45), istirahat: true },
      { label: 'Jam ke-7: Praktikum Lab',       mulai: t(11,45),akhir: t(12,25) },
      { label: 'Jam ke-8: Praktikum Lab',       mulai: t(12,25),akhir: t(13,5) },
      { label: 'Jam ke-9: Praktikum Lab',       mulai: t(13,5), akhir: t(13,45) }
    ],
    // SELASA
    '2': [
      { label: 'Jam ke-1: Matematika',          mulai: t(7,0),  akhir: t(7,45) },
      { label: 'Jam ke-2: Matematika',          mulai: t(7,45), akhir: t(8,30) },
      { label: 'Jam ke-3: B. Inggris',          mulai: t(8,30), akhir: t(9,15) },
      { label: 'Jam ke-4: B. Inggris',          mulai: t(9,15), akhir: t(10,0) },
      { label: 'Istirahat 1',                   mulai: t(10,0), akhir: t(10,15), istirahat: true },
      { label: 'Jam ke-5: Sistem Operasi Jaringan', mulai: t(10,15),akhir: t(11,0) },
      { label: 'Jam ke-6: Sistem Operasi Jaringan', mulai: t(11,0), akhir: t(11,45) },
      { label: 'Istirahat 2 / Sholat Dzuhur',   mulai: t(11,45),akhir: t(12,30), istirahat: true },
      { label: 'Jam ke-7: Konfigurasi Server',  mulai: t(12,30),akhir: t(13,15) },
      { label: 'Jam ke-8: Konfigurasi Server',  mulai: t(13,15),akhir: t(14,0) },
      { label: 'Jam ke-9: Pemrograman Dasar',   mulai: t(14,0), akhir: t(14,45) }
    ],
    // RABU
    '3': [
      { label: 'Jam ke-1: Pemrograman Web',     mulai: t(7,0),  akhir: t(7,45) },
      { label: 'Jam ke-2: Pemrograman Web',     mulai: t(7,45), akhir: t(8,30) },
      { label: 'Jam ke-3: Routing Dinamis',     mulai: t(8,30), akhir: t(9,15) },
      { label: 'Jam ke-4: Routing Dinamis',     mulai: t(9,15), akhir: t(10,0) },
      { label: 'Istirahat 1',                   mulai: t(10,0), akhir: t(10,15), istirahat: true },
      { label: 'Jam ke-5: Keamanan Jaringan',   mulai: t(10,15),akhir: t(11,0) },
      { label: 'Jam ke-6: Keamanan Jaringan',   mulai: t(11,0), akhir: t(11,45) },
      { label: 'Istirahat 2 / Sholat Dzuhur',   mulai: t(11,45),akhir: t(12,30), istirahat: true },
      { label: 'Jam ke-7: MikroTik RouterOS',   mulai: t(12,30),akhir: t(13,15) },
      { label: 'Jam ke-8: MikroTik RouterOS',   mulai: t(13,15),akhir: t(14,0) },
      { label: 'Jam ke-9: Praktikum Lab 1',     mulai: t(14,0), akhir: t(14,45) }
    ],
    // KAMIS
    '4': [
      { label: 'Jam ke-1: Pendidikan Agama',    mulai: t(7,0),  akhir: t(7,45) },
      { label: 'Jam ke-2: Pendidikan Agama',    mulai: t(7,45), akhir: t(8,30) },
      { label: 'Jam ke-3: PPKn',                mulai: t(8,30), akhir: t(9,15) },
      { label: 'Jam ke-4: PPKn',                mulai: t(9,15), akhir: t(10,0) },
      { label: 'Istirahat 1',                   mulai: t(10,0), akhir: t(10,15), istirahat: true },
      { label: 'Jam ke-5: Fiber Optic & Splicing', mulai: t(10,15),akhir: t(11,0) },
      { label: 'Jam ke-6: Fiber Optic & Splicing', mulai: t(11,0), akhir: t(11,45) },
      { label: 'Istirahat 2 / Sholat Dzuhur',   mulai: t(11,45),akhir: t(12,30), istirahat: true },
      { label: 'Jam ke-7: Kewirausahaan (PKK)', mulai: t(12,30),akhir: t(13,15) },
      { label: 'Jam ke-8: Kewirausahaan (PKK)', mulai: t(13,15),akhir: t(14,0) },
      { label: 'Jam ke-9: B. Jawa',             mulai: t(14,0), akhir: t(14,45) }
    ],
    // JUMAT
    '5': [
      { label: 'Jam ke-1: Senam & Pembiasaan',  mulai: t(7,0),  akhir: t(7,40), istirahat: true },
      { label: 'Jam ke-2: Pendidikan Jasmani',  mulai: t(7,40), akhir: t(8,20) },
      { label: 'Jam ke-3: Pendidikan Jasmani',  mulai: t(8,20), akhir: t(9,0) },
      { label: 'Istirahat 1',                   mulai: t(9,0),  akhir: t(9,20), istirahat: true },
      { label: 'Jam ke-4: Proyek Kreatif TKJ',  mulai: t(9,20), akhir: t(10,0) },
      { label: 'Jam ke-5: Proyek Kreatif TKJ',  mulai: t(10,0), akhir: t(10,40) },
      { label: 'Persiapan Sholat Jumat & Pulang', mulai: t(10,40), akhir: t(11,30), istirahat: true }
    ]
  };

  const NAMA_HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  let adaUpacara = true;

  function initJamPelajaran() {
    const clockEl = document.getElementById('jp-jam-sekarang');
    const dayLabel = document.getElementById('jp-hari-label');
    const statusText = document.getElementById('jp-status-text');
    const detailText = document.getElementById('jp-detail-text');
    const countdownEl = document.getElementById('jp-countdown');
    const progressBar = document.getElementById('jp-progress');
    const toggleSeninWrap = document.getElementById('jp-senin-toggle');
    const toggleLabel = document.getElementById('jp-toggle-label');

    if (!clockEl) return;

    window.jpToggleSenin = function() {
      adaUpacara = !adaUpacara;
      if (toggleLabel) {
        toggleLabel.textContent = adaUpacara ? 'Ada Upacara' : 'Tanpa Upacara';
      }
      tick();
    };

    function tick() {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();
      const curM = h * 60 + m;
      const day = now.getDay();

      clockEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
      if (dayLabel) {
        dayLabel.textContent = `${NAMA_HARI[day]}, ${now.getDate()} ${now.toLocaleString('id-ID', { month: 'short' })} ${now.getFullYear()}`;
      }

      // Toggle Senin
      if (toggleSeninWrap) {
        toggleSeninWrap.style.display = day === 1 ? 'block' : 'none';
      }

      if (day === 0 || day === 6) {
        if (statusText) statusText.textContent = 'HARI LIBUR AKHIR PEKAN';
        if (detailText) detailText.textContent = 'Tidak ada kegiatan belajar mengajar aktif hari ini.';
        if (countdownEl) countdownEl.textContent = '--:--';
        if (progressBar) progressBar.style.width = '0%';
        return;
      }

      let key = String(day);
      if (day === 1) key = adaUpacara ? '1_upacara' : '1_biasa';
      const list = JADWAL[key] || [];

      if (!list.length) return;

      const firstStart = list[0].mulai;
      const lastEnd = list[list.length - 1].akhir;

      if (curM < firstStart) {
        const sisaM = firstStart - curM - 1;
        const sisaS = 60 - s;
        if (statusText) statusText.textContent = 'BELUM MASUK SEKOLAH';
        if (detailText) detailText.textContent = `Pelajaran dimulai pukul ${formatHM(firstStart)} (${list[0].label})`;
        if (countdownEl) countdownEl.textContent = `${String(sisaM).padStart(2,'0')}:${String(sisaS).padStart(2,'0')}`;
        if (progressBar) progressBar.style.width = '0%';
        return;
      }

      if (curM >= lastEnd) {
        if (statusText) statusText.textContent = 'KEGIATAN SEKOLAH SELESAI';
        if (detailText) detailText.textContent = 'Semua jam pelajaran hari ini telah berakhir. Selamat beristirahat!';
        if (countdownEl) countdownEl.textContent = '00:00';
        if (progressBar) progressBar.style.width = '100%';
        return;
      }

      // Sedang dalam jam pelajaran
      let currentItem = null;
      for (let i = 0; i < list.length; i++) {
        if (curM >= list[i].mulai && curM < list[i].akhir) {
          currentItem = list[i];
          break;
        }
      }

      if (currentItem) {
        const durasiTotal = (currentItem.akhir - currentItem.mulai) * 60;
        const detikBerjalan = (curM - currentItem.mulai) * 60 + s;
        const sisaDetik = durasiTotal - detikBerjalan;
        const sisaM = Math.floor(sisaDetik / 60);
        const sisaS = sisaDetik % 60;
        const pct = Math.min(100, Math.max(0, (detikBerjalan / durasiTotal) * 100));

        if (statusText) {
          statusText.textContent = currentItem.istirahat ? `WAKTU: ${currentItem.label.toUpperCase()}` : `AKTIF: ${currentItem.label.toUpperCase()}`;
        }
        if (detailText) {
          detailText.textContent = `Pukul ${formatHM(currentItem.mulai)} - ${formatHM(currentItem.akhir)} WIB`;
        }
        if (countdownEl) {
          countdownEl.textContent = `${String(sisaM).padStart(2,'0')}:${String(sisaS).padStart(2,'0')}`;
        }
        if (progressBar) {
          progressBar.style.width = `${pct}%`;
        }
      }
    }

    function formatHM(totalMinutes) {
      const h = Math.floor(totalMinutes / 60);
      const m = totalMinutes % 60;
      return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
    }

    tick();
    setInterval(tick, 1000);
  }

  /* ==========================================================================
     5. HERO SLIDER LOGIC
     ========================================================================== */
  function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-nav-prev');
    const nextBtn = document.querySelector('.hero-nav-next');
    let currentIndex = 0;
    let timer = null;

    if (!slides.length) return;

    function showSlide(index) {
      slides.forEach((s, i) => s.classList.toggle('active', i === index));
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      currentIndex = index;
    }

    function nextSlide() {
      const next = (currentIndex + 1) % slides.length;
      showSlide(next);
    }

    function prevSlide() {
      const prev = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(prev);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { resetTimer(); nextSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { resetTimer(); prevSlide(); });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        resetTimer();
        showSlide(idx);
      });
    });

    function resetTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(nextSlide, 5000);
    }

    resetTimer();
  }

  /* ==========================================================================
     6. JADWAL PELAJARAN TAB SWITCHER
     ========================================================================== */
  function initScheduleTabs() {
    const navBtns = document.querySelectorAll('.schedule-nav-btn');
    const panels = document.querySelectorAll('.schedule-day-panel');

    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetId = `schedule-${btn.dataset.day}`;
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });

    // Auto select today's day on load
    const today = new Date().getDay(); // 0 is Sunday, 1 is Monday...
    const dayMap = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
    const activeDay = dayMap[today] || 'senin';
    const activeBtn = document.querySelector(`.schedule-nav-btn[data-day="${activeDay}"]`);
    if (activeBtn) activeBtn.click();
  }

  /* ==========================================================================
     7. NAVBAR SCROLL EFFECT & BACK TO TOP
     ========================================================================== */
  function initScrollFeatures() {
    const navbar = document.querySelector('.navbar-modern');
    const topBtn = document.getElementById('topBtn');

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (navbar) {
        navbar.classList.toggle('scrolled', y > 40);
      }
      if (topBtn) {
        topBtn.classList.toggle('show', y > 400);
      }
    });

    if (topBtn) {
      topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ==========================================================================
     8. STATS COUNTER ANIMATION
     ========================================================================== */
  function initStatsCounters() {
    const statElements = document.querySelectorAll('[data-counter-target]');
    if (!statElements.length) return;

    let started = false;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting) && !started) {
        started = true;
        statElements.forEach(el => {
          const target = parseInt(el.dataset.counterTarget, 10);
          const suffix = el.dataset.counterSuffix || '';
          let count = 0;
          const step = Math.max(1, Math.ceil(target / 40));
          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            el.textContent = `${count}${suffix}`;
          }, 35);
        });
      }
    }, { threshold: 0.2 });

    statElements.forEach(el => observer.observe(el));
  }

  /* ==========================================================================
     BOOTSTRAP INITIALIZATION
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    renderMembers();
    initJamPelajaran();
    initHeroSlider();
    initScheduleTabs();
    initScrollFeatures();
    initStatsCounters();
  });
})();
