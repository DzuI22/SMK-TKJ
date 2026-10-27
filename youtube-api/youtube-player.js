/* =========================================================
   SMKN 1 KRAS - XI TKJ 1 - YOUTUBE MUSIC ENGINE v2.0
   Universal Music Station + Cyber UI + Full YouTube Player
   ========================================================= */
(() => {
    'use strict';

    const CONFIG = window.XI_TKJ_YOUTUBE_CONFIG;
    const SEARCH = window.XI_TKJ_YOUTUBE_SEARCH;
    if (!CONFIG || !SEARCH) return;

    // State Aplikasi
    const state = {
        open: false,
        videoMode: false,
        volume: parseFloat(localStorage.getItem('xi_tkj_music_vol') || '0.7'),
        isMuted: false,
        prevVolume: 0.7,
        shuffle: localStorage.getItem('xi_tkj_music_shuffle') === 'true',
        repeat: localStorage.getItem('xi_tkj_music_repeat') || 'all', // 'none' | 'all' | 'one'
        player: null,
        ready: false,
        isPlaying: false,
        timer: null,
        apiLoading: false,
        searchBusy: false,
        currentGenre: 'all',
        currentTrack: null,
        results: [],
        queue: Array.isArray(CONFIG.curatedTracks) ? [...CONFIG.curatedTracks] : [],
        queueIndex: 0
    };

    const $ = id => document.getElementById(id);
    const els = {};
    const ids = [
        'musicPlayer', 'youtubePlayer', 'musicVideoWrapper', 'musicTopBar', 'musicDisc',
        'musicTitle', 'musicArtist', 'musicMiniEq', 'musicMiniPlayBtn', 'musicToggle',
        'musicSearchPanel', 'musicClose', 'musicToggleVideo', 'musicSearchForm',
        'musicSearchInput', 'musicSearchClear', 'musicSearchSubmit', 'musicGenreTabs',
        'musicSearchStatus', 'musicStatusText', 'musicNowPlaying', 'musicNowThumb',
        'musicCardEq', 'musicQualityPill', 'musicNowTitle', 'musicNowArtist',
        'musicProgress', 'musicProgressFill', 'musicCurrent', 'musicDuration',
        'musicShuffle', 'musicPrev', 'musicPlay', 'musicNext', 'musicRepeat',
        'repeatIndicator', 'volumeMuteBtn', 'volumeIcon', 'musicVolume',
        'musicVolumeText', 'musicResultCount', 'musicSearchResults', 'musicListSubtitle',
        'musicLiveDot', 'musicStatusBadge'
    ];

    const cache = () => ids.forEach(id => { els[id] = $(id); });
    const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

    const formatTime = s => {
        if (!Number.isFinite(s) || s < 0) return '00:00';
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    const escapeHtml = value => String(value || '').replace(/[&<>'"]/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;'
    }[c]));

    // Drawer Buka/Tutup
    function setOpen(open) {
        state.open = Boolean(open);
        els.musicPlayer.classList.toggle('is-open', state.open);
        els.musicSearchPanel.style.display = state.open ? 'flex' : 'none';
        els.musicToggle.setAttribute('aria-expanded', String(state.open));
        els.musicToggle.title = state.open ? 'Tutup stasiun musik' : 'Buka stasiun musik';
        els.musicToggle.innerHTML = state.open ? '<i class="fa-solid fa-chevron-down"></i>' : '<i class="fa-solid fa-chevron-up"></i>';

        if (state.open) {
            setTimeout(() => {
                if (!els.musicSearchInput.value) {
                    els.musicSearchInput?.focus();
                }
            }, 150);
        }
    }

    // Toggle Mode Video
    function setVideoMode(active) {
        state.videoMode = Boolean(active);
        els.musicVideoWrapper.classList.toggle('video-active', state.videoMode);
        els.musicToggleVideo.classList.toggle('active', state.videoMode);
        els.musicToggleVideo.title = state.videoMode ? 'Sembunyikan layar video' : 'Tampilkan layar video';
        const icon = state.videoMode ? '<i class="fa-solid fa-tv"></i> <span>Tutup Video</span>' : '<i class="fa-solid fa-tv"></i> <span>Video</span>';
        els.musicToggleVideo.innerHTML = icon;
    }

    // Status Notifikasi
    function setStatus(text, type = 'info') {
        if (!els.musicSearchStatus || !els.musicStatusText) return;
        els.musicStatusText.textContent = text;
        els.musicSearchStatus.dataset.type = type;

        let iconHtml = '<i class="fa-solid fa-circle-info"></i>';
        if (type === 'loading') iconHtml = '<i class="fa-solid fa-spinner fa-spin"></i>';
        else if (type === 'success') iconHtml = '<i class="fa-solid fa-circle-check"></i>';
        else if (type === 'warn') iconHtml = '<i class="fa-solid fa-triangle-exclamation"></i>';
        else if (type === 'error') iconHtml = '<i class="fa-solid fa-circle-exclamation"></i>';

        const existingIcon = els.musicSearchStatus.querySelector('i');
        if (existingIcon) {
            existingIcon.outerHTML = iconHtml;
        }
    }

    // Update Status Tombol Play/Pause & Animasi Visualizer
    function updatePlayState(playing) {
        state.isPlaying = Boolean(playing);

        // Tombol Main di Card
        if (els.musicPlay) {
            els.musicPlay.innerHTML = playing ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
            els.musicPlay.setAttribute('aria-label', playing ? 'Jeda lagu' : 'Putar lagu');
            els.musicPlay.classList.toggle('is-playing', playing);
        }

        // Tombol Cepat di Mini Floating Bar
        if (els.musicMiniPlayBtn) {
            els.musicMiniPlayBtn.innerHTML = playing ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
            els.musicMiniPlayBtn.setAttribute('aria-label', playing ? 'Jeda lagu' : 'Putar lagu');
        }

        // Piringan Hitam (Disc)
        if (els.musicDisc) {
            els.musicDisc.classList.toggle('playing', playing);
        }

        // Equalizer Bars Mini & Card
        if (els.musicMiniEq) els.musicMiniEq.classList.toggle('playing', playing);
        if (els.musicCardEq) els.musicCardEq.classList.toggle('playing', playing);

        // Dot Live Pulsing
        if (els.musicLiveDot) {
            els.musicLiveDot.classList.toggle('pulsing', playing);
        }

        // Highlight lagu yang sedang aktif di daftar hasil
        highlightActiveTrackInList();
    }

    // Update Icon & Nilai Volume
    function updateVolumeDisplay() {
        const v = state.isMuted ? 0 : state.volume;
        if (els.volumeIcon) {
            els.volumeIcon.className = v <= 0 ? 'fa-solid fa-volume-xmark' : v < 0.4 ? 'fa-solid fa-volume-low' : 'fa-solid fa-volume-high';
        }
        if (els.musicVolume) {
            els.musicVolume.value = String(v);
        }
        if (els.musicVolumeText) {
            els.musicVolumeText.textContent = `${Math.round(v * 100)}%`;
        }
    }

    // Terapkan Volume ke Player
    function applyVolume() {
        if (!state.player || !state.ready) return;
        try {
            const currentVol = state.isMuted ? 0 : state.volume;
            const value = Math.round(currentVol * 100);
            state.player.setVolume(value);
            if (value === 0) state.player.mute();
            else state.player.unMute();
        } catch (_) {}
    }

    // Sinkronisasi Bar Progress Lagu
    function stopTimer() {
        if (state.timer) clearInterval(state.timer);
        state.timer = null;
    }

    function syncProgress() {
        if (!state.player || !state.ready) return;
        try {
            const current = Number(state.player.getCurrentTime());
            const total = Number(state.player.getDuration());
            if (total > 0 && Number.isFinite(total)) {
                const percent = (current / total) * 100;
                els.musicProgress.value = String(percent);
                if (els.musicProgressFill) {
                    els.musicProgressFill.style.width = `${percent}%`;
                }
                els.musicCurrent.textContent = formatTime(current);
                els.musicDuration.textContent = formatTime(total);
            }
        } catch (_) {}
    }

    function startTimer() {
        stopTimer();
        state.timer = setInterval(syncProgress, 300);
    }

    // Set Tampilan Track Yang Sedang Diputar
    function setNowPlaying(item) {
        if (!item) return;
        state.currentTrack = item;

        // Mini bar info
        els.musicTitle.textContent = item.title;
        els.musicTitle.title = item.title;
        els.musicArtist.textContent = item.channel || 'YouTube';

        // Expanded card info
        els.musicNowTitle.textContent = item.title;
        els.musicNowArtist.textContent = item.channel || 'YouTube';
        els.musicNowThumb.innerHTML = item.thumb ? `<img src="${escapeHtml(item.thumb)}" alt="${escapeHtml(item.title)}">` : '<i class="fa-solid fa-music"></i>';

        // Quality / Genre badge
        if (els.musicQualityPill) {
            const genreBadge = item.genre ? item.genre.toUpperCase() : (item.duration === 'LIVE' ? '🔴 LIVE' : 'HQ AUDIO');
            els.musicQualityPill.textContent = genreBadge;
        }

        // Reset progress
        els.musicCurrent.textContent = '00:00';
        els.musicDuration.textContent = item.duration || '00:00';
        els.musicProgress.value = '0';
        if (els.musicProgressFill) els.musicProgressFill.style.width = '0%';

        highlightActiveTrackInList();
    }

    // Highlight Track di List Hasil
    function highlightActiveTrackInList() {
        if (!els.musicSearchResults) return;
        const currentVideoId = state.currentTrack?.videoId;

        els.musicSearchResults.querySelectorAll('.music-result-card').forEach(card => {
            const isCurrent = card.dataset.videoid === currentVideoId;
            card.classList.toggle('active-playing', isCurrent);
            const playIcon = card.querySelector('.music-result-play-icon');
            if (playIcon) {
                if (isCurrent && state.isPlaying) {
                    playIcon.innerHTML = '<span class="list-eq"><span></span><span></span><span></span></span>';
                } else if (isCurrent) {
                    playIcon.innerHTML = '<i class="fa-solid fa-pause"></i>';
                } else {
                    playIcon.innerHTML = '<i class="fa-solid fa-play"></i>';
                }
            }
        });
    }

    // Render Hasil Pencarian / Playlist
    function renderResults(items) {
        state.results = Array.isArray(items) ? items : [];

        if (els.musicResultCount) {
            els.musicResultCount.textContent = `${state.results.length} lagu`;
        }

        if (!state.results.length) {
            els.musicSearchResults.innerHTML = `
                <div class="music-empty-state">
                    <i class="fa-solid fa-music-slash mb-2"></i>
                    <strong>Lagu tidak ditemukan</strong>
                    <p>Coba kata kunci lain atau langsung paste link YouTube (watch/shorts).</p>
                </div>
            `;
            return;
        }

        els.musicSearchResults.innerHTML = state.results.map((item, index) => {
            const isPlayingThis = state.currentTrack?.videoId === item.videoId;
            const thumbUrl = item.thumb || `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`;
            const durationBadge = item.duration ? `<span class="track-badge-pill">${escapeHtml(item.duration)}</span>` : '';

            return `
                <div class="music-result-card ${isPlayingThis ? 'active-playing' : ''}" data-index="${index}" data-videoid="${escapeHtml(item.videoId)}" role="button" tabindex="0">
                    <div class="music-result-thumb-wrap">
                        <img src="${escapeHtml(thumbUrl)}" alt="" loading="lazy">
                        <span class="music-result-play-icon">
                            ${isPlayingThis && state.isPlaying ? '<span class="list-eq"><span></span><span></span><span></span></span>' : '<i class="fa-solid fa-play"></i>'}
                        </span>
                    </div>
                    <div class="music-result-details">
                        <strong class="music-result-title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</strong>
                        <div class="music-result-meta">
                            <span class="music-result-artist">${escapeHtml(item.channel || 'YouTube')}</span>
                            ${durationBadge}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        els.musicSearchResults.querySelectorAll('.music-result-card').forEach(card => {
            card.addEventListener('click', () => {
                const index = Number(card.dataset.index);
                playResult(index);
            });
            card.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    playResult(Number(card.dataset.index));
                }
            });
        });
    }

    // Eksekusi Pencarian
    async function doSearch(query) {
        if (state.searchBusy) return;
        const q = String(query || '').trim();

        state.searchBusy = true;
        els.musicSearchSubmit.disabled = true;
        els.musicSearchSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        setStatus(`Mencari "${q}" di YouTube...`, 'loading');

        try {
            const items = await SEARCH.search(q, state.currentGenre);
            state.queue = items.slice();
            state.queueIndex = 0;
            renderResults(items);

            if (SEARCH.extractVideoId(q)) {
                setStatus('Link YouTube terdeteksi! Memutar lagu...', 'success');
                playResult(0);
            } else if (items.length) {
                setStatus(`Menemukan ${items.length} hasil untuk "${q}".`, 'success');
                if (els.musicListSubtitle) {
                    els.musicListSubtitle.textContent = `Hasil pencarian: "${q}"`;
                }
            } else {
                setStatus('Tidak ada lagu yang cocok.', 'warn');
            }
        } catch (error) {
            console.error('[SMKN 1 Kras Music Error]', error);
            setStatus('Pencarian gagal. Menampilkan lagu pilihan.', 'error');
            const fallback = SEARCH.getByGenre(state.currentGenre);
            renderResults(fallback);
        } finally {
            state.searchBusy = false;
            els.musicSearchSubmit.disabled = false;
            els.musicSearchSubmit.innerHTML = '<span>Cari</span><i class="fa-solid fa-arrow-right"></i>';
        }
    }

    // Memutar lagu dari indeks hasil
    function playResult(index) {
        const item = state.results[index] || state.queue[index];
        if (!item) return;

        if (!state.player || !state.ready) {
            setStatus('Menyiapkan pemutar YouTube, mohon tunggu sebentar...', 'warn');
            return;
        }

        state.queueIndex = index;
        setNowPlaying(item);
        updatePlayState(true);

        try {
            state.player.loadVideoById({
                videoId: item.videoId,
                startSeconds: 0
            });
            applyVolume();
            setStatus(`Memutar: ${item.title}`, 'success');
        } catch (error) {
            console.error(error);
            setStatus('Gagal memuat video YouTube.', 'error');
            updatePlayState(false);
        }
    }

    // Play & Pause
    function play() {
        if (!state.player || !state.ready) {
            if (state.queue.length) playResult(state.queueIndex >= 0 ? state.queueIndex : 0);
            return;
        }
        try {
            state.player.playVideo();
        } catch (_) {}
    }

    function pause() {
        if (!state.player || !state.ready) return;
        try {
            state.player.pauseVideo();
        } catch (_) {}
    }

    function togglePlay() {
        if (!state.player || !state.ready) {
            play();
            return;
        }
        const ps = state.player.getPlayerState?.();
        const PS = window.YT?.PlayerState;
        if (PS && ps === PS.PLAYING) {
            pause();
        } else {
            play();
        }
    }

    // Lagu Berikutnya
    function next() {
        if (!state.queue.length) return;

        if (state.shuffle && state.queue.length > 1) {
            let nextIndex = state.queueIndex;
            while (nextIndex === state.queueIndex) {
                nextIndex = Math.floor(Math.random() * state.queue.length);
            }
            state.queueIndex = nextIndex;
        } else {
            state.queueIndex = (state.queueIndex + 1) % state.queue.length;
        }

        playResult(state.queueIndex);
    }

    // Lagu Sebelumnya
    function previous() {
        if (!state.queue.length) return;

        // Jika lagu sudah berjalan lebih dari 4 detik, ulangi dari awal lagu ini
        try {
            const curTime = state.player?.getCurrentTime?.() || 0;
            if (curTime > 4) {
                state.player.seekTo(0, true);
                return;
            }
        } catch (_) {}

        state.queueIndex = (state.queueIndex - 1 + state.queue.length) % state.queue.length;
        playResult(state.queueIndex);
    }

    // Event Handler Player YouTube Ready
    function onReady(event) {
        state.player = event.target;
        state.ready = true;
        els.musicPlayer.classList.remove('yt-loading', 'yt-error');
        applyVolume();
        updatePlayState(false);

        if (state.queue.length && state.queue[0]) {
            setNowPlaying(state.queue[0]);
            setStatus('Pilih lagu atau cari judul apapun di YouTube.', 'success');
        }
    }

    // Event Handler State Change YouTube
    function onStateChange(event) {
        const PS = window.YT?.PlayerState;
        if (!PS) return;

        if (event.data === PS.PLAYING) {
            updatePlayState(true);
            startTimer();
        } else if (event.data === PS.PAUSED) {
            updatePlayState(false);
            syncProgress();
            stopTimer();
        } else if (event.data === PS.ENDED) {
            updatePlayState(false);
            stopTimer();

            if (state.repeat === 'one') {
                playResult(state.queueIndex);
            } else if (state.repeat === 'all' || state.queueIndex < state.queue.length - 1) {
                next();
            }
        } else if (event.data === PS.BUFFERING) {
            syncProgress();
        }
    }

    // Event Handler Error YouTube
    function onError(event) {
        updatePlayState(false);
        stopTimer();
        const code = event?.data;
        let msg = 'Lagu tidak dapat diputar. Mencoba lagu berikutnya...';

        if (code === 101 || code === 150) {
            msg = 'Video ini membatasi pemutaran embedded. Beralih ke lagu selanjutnya...';
        }

        setStatus(msg, 'error');
        setTimeout(() => next(), 1800);
    }

    // Inisialisasi YouTube Player
    function createPlayer() {
        if (state.player || !window.YT?.Player) return;
        try {
            state.player = new window.YT.Player('youtubePlayer', {
                ...CONFIG.player,
                events: { onReady, onStateChange, onError }
            });
        } catch (error) {
            console.error('[YouTube Player Init Error]', error);
            els.musicPlayer.classList.add('yt-error');
        }
    }

    // Load Script YouTube IFrame API
    function loadPlayerAPI() {
        if (window.YT?.Player) return createPlayer();
        if (state.apiLoading) return;

        state.apiLoading = true;
        els.musicPlayer.classList.add('yt-loading');

        const prevOnReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            if (typeof prevOnReady === 'function') {
                try { prevOnReady(); } catch (_) {}
            }
            createPlayer();
        };

        if (document.querySelector('script[data-xi-youtube-api]')) return;

        const script = document.createElement('script');
        script.src = CONFIG.playerApiUrl;
        script.async = true;
        script.dataset.xiYoutubeApi = 'true';
        script.onerror = () => {
            state.apiLoading = false;
            els.musicPlayer.classList.remove('yt-loading');
            els.musicPlayer.classList.add('yt-error');
            setStatus('Gagal memuat API YouTube. Cek koneksi internet.', 'error');
        };
        document.head.appendChild(script);
    }

    // Setup Genre Filter Pills
    function setupGenrePills() {
        if (!els.musicGenreTabs) return;

        els.musicGenreTabs.querySelectorAll('.genre-pill').forEach(btn => {
            btn.addEventListener('click', () => {
                const genre = btn.dataset.genre || 'all';
                state.currentGenre = genre;

                els.musicGenreTabs.querySelectorAll('.genre-pill').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Kosongkan search box & cari berdasarkan genre
                if (els.musicSearchInput) {
                    els.musicSearchInput.value = '';
                    if (els.musicSearchClear) els.musicSearchClear.style.display = 'none';
                }

                const list = SEARCH.getByGenre(genre);
                state.queue = list.slice();
                state.queueIndex = 0;
                renderResults(list);

                const genreLabel = btn.textContent.trim();
                setStatus(`Menampilkan koleksi genre: ${genreLabel}`, 'info');
                if (els.musicListSubtitle) {
                    els.musicListSubtitle.textContent = `Genre: ${genreLabel}`;
                }
            });
        });
    }

    // Toggle Shuffle
    function toggleShuffle() {
        state.shuffle = !state.shuffle;
        localStorage.setItem('xi_tkj_music_shuffle', String(state.shuffle));
        if (els.musicShuffle) {
            els.musicShuffle.classList.toggle('active', state.shuffle);
            els.musicShuffle.title = state.shuffle ? 'Acak Lagu (Aktif)' : 'Acak Lagu (Nonaktif)';
        }
        setStatus(state.shuffle ? 'Mode acak (shuffle) diaktifkan' : 'Mode acak dinonaktifkan', 'info');
    }

    // Toggle Repeat
    function toggleRepeat() {
        const modes = ['none', 'all', 'one'];
        const currentIdx = modes.indexOf(state.repeat);
        state.repeat = modes[(currentIdx + 1) % modes.length];
        localStorage.setItem('xi_tkj_music_repeat', state.repeat);

        updateRepeatDisplay();

        const label = state.repeat === 'one' ? 'Ulangi 1 Lagu' : state.repeat === 'all' ? 'Ulangi Semua Lagu' : 'Tidak Mengulang';
        setStatus(`Mode pengulangan: ${label}`, 'info');
    }

    function updateRepeatDisplay() {
        if (!els.musicRepeat) return;
        els.musicRepeat.classList.toggle('active', state.repeat !== 'none');

        if (els.repeatIndicator) {
            els.repeatIndicator.style.display = state.repeat === 'one' ? 'flex' : 'none';
        }
    }

    // Toggle Mute
    function toggleMute() {
        state.isMuted = !state.isMuted;
        if (state.isMuted) {
            state.prevVolume = state.volume > 0 ? state.volume : 0.7;
        }
        updateVolumeDisplay();
        applyVolume();
    }

    // Pasang Event Listeners
    function bind() {
        // Buka / Tutup panel utama
        els.musicToggle.addEventListener('click', e => {
            e.stopPropagation();
            setOpen(!state.open);
        });

        els.musicTopBar.addEventListener('click', e => {
            // Hindari memicu drawer jika yang ditekan adalah tombol play langsung
            if (e.target.closest('#musicMiniPlayBtn') || e.target.closest('#musicToggle')) return;
            setOpen(!state.open);
        });

        els.musicClose.addEventListener('click', () => setOpen(false));

        // Tombol Play Mini di Top Bar
        if (els.musicMiniPlayBtn) {
            els.musicMiniPlayBtn.addEventListener('click', e => {
                e.stopPropagation();
                togglePlay();
            });
        }

        // Toggle Video Mode
        if (els.musicToggleVideo) {
            els.musicToggleVideo.addEventListener('click', () => setVideoMode(!state.videoMode));
        }

        // Input Form Search
        els.musicSearchInput.addEventListener('input', () => {
            if (els.musicSearchClear) {
                els.musicSearchClear.style.display = els.musicSearchInput.value ? 'flex' : 'none';
            }
        });

        if (els.musicSearchClear) {
            els.musicSearchClear.addEventListener('click', () => {
                els.musicSearchInput.value = '';
                els.musicSearchClear.style.display = 'none';
                els.musicSearchInput.focus();
                const list = SEARCH.getByGenre(state.currentGenre);
                state.queue = list.slice();
                renderResults(list);
            });
        }

        els.musicSearchForm.addEventListener('submit', e => {
            e.preventDefault();
            doSearch(els.musicSearchInput.value);
        });

        // Kontrol Play / Pause
        els.musicPlay.addEventListener('click', togglePlay);
        els.musicPrev.addEventListener('click', previous);
        els.musicNext.addEventListener('click', next);

        // Kontrol Progress Slider
        els.musicProgress.addEventListener('input', () => {
            if (!state.player || !state.ready) return;
            try {
                const total = Number(state.player.getDuration());
                const percent = Number(els.musicProgress.value);
                if (els.musicProgressFill) els.musicProgressFill.style.width = `${percent}%`;
                if (total > 0) {
                    els.musicCurrent.textContent = formatTime((percent / 100) * total);
                }
            } catch (_) {}
        });

        els.musicProgress.addEventListener('change', () => {
            if (!state.player || !state.ready) return;
            try {
                const total = Number(state.player.getDuration());
                if (total > 0) {
                    state.player.seekTo((Number(els.musicProgress.value) / 100) * total, true);
                }
            } catch (_) {}
        });

        // Kontrol Volume
        els.musicVolume.addEventListener('input', () => {
            state.volume = clamp(Number(els.musicVolume.value), 0, 1);
            state.isMuted = state.volume === 0;
            localStorage.setItem('xi_tkj_music_vol', String(state.volume));
            updateVolumeDisplay();
            applyVolume();
        });

        if (els.volumeMuteBtn) {
            els.volumeMuteBtn.addEventListener('click', toggleMute);
        }

        // Shuffle & Repeat
        if (els.musicShuffle) {
            els.musicShuffle.classList.toggle('active', state.shuffle);
            els.musicShuffle.addEventListener('click', toggleShuffle);
        }

        if (els.musicRepeat) {
            updateRepeatDisplay();
            els.musicRepeat.addEventListener('click', toggleRepeat);
        }

        // Shortcut Keyboard: Escape menutup drawer
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && state.open) {
                setOpen(false);
            }
        });

        // Genre Tabs
        setupGenrePills();
    }

    // Booting Engine
    function boot() {
        cache();
        if (!els.musicPlayer || !els.musicTopBar) {
            console.warn('[SMKN 1 Kras Music] Inisialisasi dibatalkan: elemen player tidak ditemukan.');
            return;
        }

        bind();
        renderResults(state.queue);
        updateVolumeDisplay();
        updatePlayState(false);
        setOpen(false);
        setVideoMode(false);
        loadPlayerAPI();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
        boot();
    }
})();
