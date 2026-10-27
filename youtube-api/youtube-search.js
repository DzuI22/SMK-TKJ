/* =========================================================
   SMKN 1 KRAS - XI TKJ 1 - YOUTUBE SMART SEARCH ENGINE
   ---------------------------------------------------------
   Mendukung:
   1. Live Search YouTube (Pencarian bebas lagu & musisi di dunia)
   2. Link & Video ID YouTube Parser (Auto-detect & Fetch Title oEmbed)
   3. Multi-instance Invidious & Piped fallback (Tanpa batas kuota)
   4. Kategori & Genre Filter Cepat
   ========================================================= */
(() => {
    'use strict';

    const config = window.XI_TKJ_YOUTUBE_CONFIG;
    if (!config) return;

    // Daftar server Invidious & Piped publik untuk search tanpa API key
    const SEARCH_MIRRORS = [
        { type: 'invidious', url: 'https://inv.tux.pizza' },
        { type: 'invidious', url: 'https://invidious.nerdvpn.de' },
        { type: 'invidious', url: 'https://yt.artemislena.eu' },
        { type: 'invidious', url: 'https://invidious.jing.rocks' },
        { type: 'invidious', url: 'https://vid.priv.au' },
        { type: 'piped', url: 'https://api.piped.private.coffee' }
    ];

    // Helper: ekstrak video ID dari URL YouTube atau string ID 11 karakter
    function extractVideoId(input) {
        if (!input) return null;
        const str = String(input).trim();

        // 1. Cek jika langsung berupa 11-char Video ID
        if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
            return str;
        }

        // 2. Format URL standar YouTube (watch?v=, youtu.be/, shorts/, embed/, music.youtube)
        const patterns = [
            /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([a-zA-Z0-9_-]{11})/i,
            /music\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/i
        ];

        for (const pattern of patterns) {
            const match = str.match(pattern);
            if (match && match[1]) return match[1];
        }

        return null;
    }

    // Helper: decode HTML entities
    function decodeHtml(value) {
        if (!value) return '';
        const el = document.createElement('textarea');
        el.innerHTML = value;
        return el.value;
    }

    // Helper: format durasi detik ke mm:ss
    function formatDurationSec(seconds) {
        if (!Number.isFinite(seconds) || seconds <= 0) return '';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    // Helper: ambil metadata judul & author langsung via oEmbed (resmi & cepat)
    async function fetchOEmbedMetadata(videoId) {
        const directThumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        const defaultTitle = `YouTube Video (${videoId})`;
        const defaultAuthor = 'Pemutaran Langsung YouTube';

        // Coba NoEmbed (CORS ramah)
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 3500);
            const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`, {
                signal: controller.signal
            });
            clearTimeout(timeout);
            if (res.ok) {
                const data = await res.json();
                if (data && data.title) {
                    return {
                        title: decodeHtml(data.title),
                        channel: decodeHtml(data.author_name || defaultAuthor),
                        thumb: data.thumbnail_url || directThumb
                    };
                }
            }
        } catch (_) {}

        // Fallback oEmbed resmi YouTube
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 3000);
            const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`, {
                signal: controller.signal
            });
            clearTimeout(timeout);
            if (res.ok) {
                const data = await res.json();
                if (data && data.title) {
                    return {
                        title: decodeHtml(data.title),
                        channel: decodeHtml(data.author_name || defaultAuthor),
                        thumb: data.thumbnail_url || directThumb
                    };
                }
            }
        } catch (_) {}

        return {
            title: defaultTitle,
            channel: defaultAuthor,
            thumb: directThumb
        };
    }

    // Cari via Invidious / Piped Mirrors
    async function searchViaMirrors(query) {
        for (const mirror of SEARCH_MIRRORS) {
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 4000);

                if (mirror.type === 'invidious') {
                    const searchUrl = `${mirror.url}/api/v1/search?q=${encodeURIComponent(query)}&type=video`;
                    const res = await fetch(searchUrl, {
                        signal: controller.signal,
                        headers: { 'Accept': 'application/json' }
                    });
                    clearTimeout(timeout);

                    if (!res.ok) continue;
                    const items = await res.json();
                    if (!Array.isArray(items) || !items.length) continue;

                    return items
                        .filter(item => (item.type === 'video' || item.videoId) && item.videoId)
                        .slice(0, config.searchMaxResults || 15)
                        .map(item => ({
                            videoId: item.videoId,
                            title: decodeHtml(item.title || 'Untitled Track'),
                            channel: decodeHtml(item.author || item.channelTitle || 'YouTube Artist'),
                            duration: item.lengthSeconds ? formatDurationSec(item.lengthSeconds) : (item.liveNow ? 'LIVE' : ''),
                            thumb: item.videoThumbnails?.[0]?.url || `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`,
                            source: 'web'
                        }));
                } else if (mirror.type === 'piped') {
                    const searchUrl = `${mirror.url}/search?q=${encodeURIComponent(query)}&filter=videos`;
                    const res = await fetch(searchUrl, {
                        signal: controller.signal,
                        headers: { 'Accept': 'application/json' }
                    });
                    clearTimeout(timeout);

                    if (!res.ok) continue;
                    const data = await res.json();
                    const items = data?.items;
                    if (!Array.isArray(items) || !items.length) continue;

                    return items
                        .filter(item => item && (item.url || item.videoId))
                        .slice(0, config.searchMaxResults || 15)
                        .map(item => {
                            const vId = item.videoId || extractVideoId(item.url);
                            return {
                                videoId: vId,
                                title: decodeHtml(item.title || 'Untitled Track'),
                                channel: decodeHtml(item.uploaderName || 'YouTube Artist'),
                                duration: item.duration ? formatDurationSec(item.duration) : '',
                                thumb: item.thumbnail || `https://i.ytimg.com/vi/${vId}/hqdefault.jpg`,
                                source: 'web'
                            };
                        });
                }
            } catch (_) {
                // Lanjut coba mirror berikutnya
                continue;
            }
        }
        return null;
    }

    // Filter daftar curated bawaan
    function filterCurated(query, genre = 'all') {
        const list = Array.isArray(config.curatedTracks) ? config.curatedTracks : [];
        let filtered = list;

        if (genre && genre !== 'all') {
            filtered = filtered.filter(item => item.genre === genre);
        }

        if (!query) return filtered;

        const q = query.toLowerCase().trim();
        const matches = filtered.filter(item =>
            (item.title && item.title.toLowerCase().includes(q)) ||
            (item.channel && item.channel.toLowerCase().includes(q)) ||
            (item.genre && item.genre.toLowerCase().includes(q))
        );

        return matches.length ? matches : filtered;
    }

    window.XI_TKJ_YOUTUBE_SEARCH = {
        extractVideoId,
        decodeHtml,
        fetchOEmbedMetadata,

        // Ambil lagu berdasarkan genre tab
        getByGenre(genreId = 'all') {
            const list = Array.isArray(config.curatedTracks) ? config.curatedTracks : [];
            if (!genreId || genreId === 'all') return [...list];
            return list.filter(item => item.genre === genreId);
        },

        // Cari lagu di YouTube atau pustaka lokal
        async search(query, genre = 'all') {
            const q = String(query || '').trim();
            const directId = extractVideoId(q);

            // 1. Jika query adalah link YouTube atau Video ID langsung
            if (directId) {
                const meta = await fetchOEmbedMetadata(directId);
                return [{
                    videoId: directId,
                    title: meta.title,
                    channel: meta.channel,
                    thumb: meta.thumb,
                    duration: 'YouTube Link',
                    source: 'direct'
                }];
            }

            // Jika query kosong, tampilkan daftar sesuai genre yang dipilih
            if (!q) {
                return this.getByGenre(genre);
            }

            // 2. Jika ada YouTube Data API v3 key resmi
            if (config.apiKey && config.apiKey.trim().length > 10) {
                try {
                    const params = new URLSearchParams({
                        part: 'snippet',
                        q: q,
                        type: 'video',
                        maxResults: String(config.searchMaxResults || 15),
                        regionCode: config.regionCode || 'ID',
                        relevanceLanguage: config.relevanceLanguage || 'id',
                        safeSearch: 'moderate',
                        videoEmbeddable: 'true',
                        key: config.apiKey
                    });

                    const response = await fetch(`${config.apiBaseUrl}?${params.toString()}`);
                    if (response.ok) {
                        const payload = await response.json();
                        const items = (payload.items || [])
                            .filter(i => i?.id?.videoId && i?.snippet)
                            .map(i => ({
                                videoId: i.id.videoId,
                                title: decodeHtml(i.snippet.title),
                                channel: decodeHtml(i.snippet.channelTitle),
                                description: decodeHtml(i.snippet.description || ''),
                                thumb: i.snippet.thumbnails?.high?.url || i.snippet.thumbnails?.medium?.url || `https://i.ytimg.com/vi/${i.id.videoId}/hqdefault.jpg`,
                                duration: '',
                                source: 'api'
                            }));

                        if (items.length) return items;
                    }
                } catch (err) {
                    console.warn('[YouTube API Key Error, switching to mirrors]', err);
                }
            }

            // 3. Pencarian bebas YouTube via Online Mirrors (Invidious / Piped)
            const mirrorResults = await searchViaMirrors(q);
            if (mirrorResults && mirrorResults.length) {
                return mirrorResults;
            }

            // 4. Fallback jika offline/mirror timeout: Filter pustaka curated lokal
            return filterCurated(q, genre);
        }
    };
})();
