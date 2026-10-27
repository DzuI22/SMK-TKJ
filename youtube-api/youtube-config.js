/* =========================================================
   SMKN 1 KRAS - XI TKJ 1 - YOUTUBE MUSIC CONFIG
   ---------------------------------------------------------
   Mendukung:
   1. Koleksi Semua Genre Musik (Hits Indo, Global, Cyber, Anime, Rock, Lo-Fi)
   2. Mesin Pencarian YouTube Bebas (Cari artis/lagu apapun di dunia)
   3. Pemutaran via Link YouTube / Video ID / Shorts / Direct URL
   4. Mode Video Player & Background Audio
   ========================================================= */
window.XI_TKJ_YOUTUBE_CONFIG = {
    apiKey: '', // Opsional jika punya YouTube Data API v3 key
    regionCode: 'ID',
    relevanceLanguage: 'id',
    searchMaxResults: 15,
    apiBaseUrl: 'https://www.googleapis.com/youtube/v3/search',
    playerApiUrl: 'https://www.youtube.com/iframe_api',

    // Kategori Genre Musik
    genres: [
        { id: 'all', label: 'Semua Lagu', icon: 'fa-fire' },
        { id: 'indo', label: 'Hits Indo', icon: 'fa-flag' },
        { id: 'global', label: 'Top Global', icon: 'fa-globe' },
        { id: 'cyber', label: 'Cyber & EDM', icon: 'fa-bolt' },
        { id: 'anime', label: 'Anime & J-Pop', icon: 'fa-sparkles' },
        { id: 'rock', label: 'Rock Band', icon: 'fa-guitar' },
        { id: 'lofi', label: 'Lo-Fi Santai', icon: 'fa-mug-hot' }
    ],

    // Koleksi Pilihan Lagu Siap Putar Langsung Tanpa Perlu API Key
    curatedTracks: [
        // --- HITS INDONESIA ---
        {
            videoId: '2u7t7u1H_20',
            title: 'Satu Bulan',
            channel: 'Bernadya',
            genre: 'indo',
            duration: '03:12',
            thumb: 'https://i.ytimg.com/vi/2u7t7u1H_20/hqdefault.jpg'
        },
        {
            videoId: 'b73BI9eUkjM',
            title: 'Dan...',
            channel: 'Sheila On 7',
            genre: 'indo',
            duration: '04:47',
            thumb: 'https://i.ytimg.com/vi/b73BI9eUkjM/hqdefault.jpg'
        },
        {
            videoId: 'mAKsZ26SabQ',
            title: 'Sial',
            channel: 'Mahalini',
            genre: 'indo',
            duration: '04:03',
            thumb: 'https://i.ytimg.com/vi/mAKsZ26SabQ/hqdefault.jpg'
        },
        {
            videoId: 'Qj0f0eH45n0',
            title: 'Kangen (Ku Akan Datang)',
            channel: 'Dewa 19',
            genre: 'indo',
            duration: '05:31',
            thumb: 'https://i.ytimg.com/vi/Qj0f0eH45n0/hqdefault.jpg'
        },
        {
            videoId: 'gNi_6U5Pm_o',
            title: 'Hati-Hati di Jalan',
            channel: 'Tulus',
            genre: 'indo',
            duration: '04:02',
            thumb: 'https://i.ytimg.com/vi/gNi_6U5Pm_o/hqdefault.jpg'
        },
        {
            videoId: 'U1P_2kG61E8',
            title: 'Rayuan Perempuan Gila',
            channel: 'Nadin Amizah',
            genre: 'indo',
            duration: '05:08',
            thumb: 'https://i.ytimg.com/vi/U1P_2kG61E8/hqdefault.jpg'
        },

        // --- TOP GLOBAL ---
        {
            videoId: 'dvgZkm1xWPE',
            title: 'Viva La Vida',
            channel: 'Coldplay',
            genre: 'global',
            duration: '04:02',
            thumb: 'https://i.ytimg.com/vi/dvgZkm1xWPE/hqdefault.jpg'
        },
        {
            videoId: 'LjhCEhWiKXk',
            title: 'Just The Way You Are',
            channel: 'Bruno Mars',
            genre: 'global',
            duration: '03:57',
            thumb: 'https://i.ytimg.com/vi/LjhCEhWiKXk/hqdefault.jpg'
        },
        {
            videoId: '4NRXx6U8ABQ',
            title: 'Blinding Lights',
            channel: 'The Weeknd',
            genre: 'global',
            duration: '03:20',
            thumb: 'https://i.ytimg.com/vi/4NRXx6U8ABQ/hqdefault.jpg'
        },
        {
            videoId: 'e-ORhEE9VVg',
            title: 'Blank Space',
            channel: 'Taylor Swift',
            genre: 'global',
            duration: '04:32',
            thumb: 'https://i.ytimg.com/vi/e-ORhEE9VVg/hqdefault.jpg'
        },
        {
            videoId: 'JGwWNGJdvx8',
            title: 'Shape of You',
            channel: 'Ed Sheeran',
            genre: 'global',
            duration: '04:23',
            thumb: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg'
        },
        {
            videoId: 'SlPhMPnQ58k',
            title: 'Memories',
            channel: 'Maroon 5',
            genre: 'global',
            duration: '03:15',
            thumb: 'https://i.ytimg.com/vi/SlPhMPnQ58k/hqdefault.jpg'
        },

        // --- CYBER & EDM ---
        {
            videoId: '60ItHLz5WEA',
            title: 'Faded',
            channel: 'Alan Walker',
            genre: 'cyber',
            duration: '03:32',
            thumb: 'https://i.ytimg.com/vi/60ItHLz5WEA/hqdefault.jpg'
        },
        {
            videoId: '5NV6Rdv1a3I',
            title: 'Get Lucky',
            channel: 'Daft Punk ft. Pharrell Williams',
            genre: 'cyber',
            duration: '04:08',
            thumb: 'https://i.ytimg.com/vi/5NV6Rdv1a3I/hqdefault.jpg'
        },
        {
            videoId: 'R2SfZL_z94s',
            title: 'Sunset',
            channel: 'The Midnight',
            genre: 'cyber',
            duration: '05:26',
            thumb: 'https://i.ytimg.com/vi/R2SfZL_z94s/hqdefault.jpg'
        },
        {
            videoId: '4xDzrJKXOOY',
            title: 'synthwave radio - chill synth / cyber study beats',
            channel: 'Lofi Girl - Synthwave',
            genre: 'cyber',
            duration: 'LIVE',
            thumb: 'https://i.ytimg.com/vi/4xDzrJKXOOY/hqdefault.jpg'
        },
        {
            videoId: '7NOSDKb0HlU',
            title: 'Coding in The Matrix - Ambient Cyber Music',
            channel: 'Cyberpunk Soundscapes',
            genre: 'cyber',
            duration: '03:10:00',
            thumb: 'https://i.ytimg.com/vi/7NOSDKb0HlU/hqdefault.jpg'
        },

        // --- ANIME & J-POP ---
        {
            videoId: 'ZRtdQ81jPUQ',
            title: 'アイドル (Idol)',
            channel: 'YOASOBI',
            genre: 'anime',
            duration: '03:48',
            thumb: 'https://i.ytimg.com/vi/ZRtdQ81jPUQ/hqdefault.jpg'
        },
        {
            videoId: 'M2cckDmNLMI',
            title: 'KICK BACK (Chainsaw Man OP)',
            channel: 'Kenshi Yonezu',
            genre: 'anime',
            duration: '03:19',
            thumb: 'https://i.ytimg.com/vi/M2cckDmNLMI/hqdefault.jpg'
        },
        {
            videoId: '1tk1PEMWmrM',
            title: 'Kaikai Kitan (Jujutsu Kaisen OP)',
            channel: 'Eve',
            genre: 'anime',
            duration: '03:43',
            thumb: 'https://i.ytimg.com/vi/1tk1PEMWmrM/hqdefault.jpg'
        },
        {
            videoId: 'mpCOnQ5zPfg',
            title: 'Gurenge (Demon Slayer OP)',
            channel: 'LiSA',
            genre: 'anime',
            duration: '04:00',
            thumb: 'https://i.ytimg.com/vi/mpCOnQ5zPfg/hqdefault.jpg'
        },

        // --- ROCK & BAND ---
        {
            videoId: 'fJ9rUzIMcZQ',
            title: 'Bohemian Rhapsody',
            channel: 'Queen',
            genre: 'rock',
            duration: '05:59',
            thumb: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg'
        },
        {
            videoId: 'eVTXPUF4Oz4',
            title: 'In The End',
            channel: 'Linkin Park',
            genre: 'rock',
            duration: '03:36',
            thumb: 'https://i.ytimg.com/vi/eVTXPUF4Oz4/hqdefault.jpg'
        },
        {
            videoId: 'mzX0rhF8buo',
            title: 'Dear God',
            channel: 'Avenged Sevenfold',
            genre: 'rock',
            duration: '06:33',
            thumb: 'https://i.ytimg.com/vi/mzX0rhF8buo/hqdefault.jpg'
        },
        {
            videoId: 'Soa3gO7tL-c',
            title: 'Boulevard Of Broken Dreams',
            channel: 'Green Day',
            genre: 'rock',
            duration: '04:47',
            thumb: 'https://i.ytimg.com/vi/Soa3gO7tL-c/hqdefault.jpg'
        },

        // --- LO-FI & BELAJAR ---
        {
            videoId: 'jfKfPfyJRdk',
            title: 'Lofi Hip Hop Radio - Beats to Relax/Study to',
            channel: 'Lofi Girl',
            genre: 'lofi',
            duration: 'LIVE',
            thumb: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg'
        },
        {
            videoId: '5qap5aO4i9A',
            title: 'Lofi Hip Hop Radio - Beats to Sleep/Chill to',
            channel: 'Lofi Girl',
            genre: 'lofi',
            duration: 'LIVE',
            thumb: 'https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg'
        },
        {
            videoId: 'BMuknBtKtCQ',
            title: 'Code Radio - 24/7 Music for Coding & Programming',
            channel: 'freeCodeCamp',
            genre: 'lofi',
            duration: 'LIVE',
            thumb: 'https://i.ytimg.com/vi/BMuknBtKtCQ/hqdefault.jpg'
        },
        {
            videoId: 'n61ULEU7SU0',
            title: 'Relaxing Piano Music for Studying & Concentration',
            channel: 'Study Music',
            genre: 'lofi',
            duration: '03:00:00',
            thumb: 'https://i.ytimg.com/vi/n61ULEU7SU0/hqdefault.jpg'
        }
    ],

    player: {
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: 0,
            controls: 1,
            disablekb: 0,
            fs: 1,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0
        }
    }
};
