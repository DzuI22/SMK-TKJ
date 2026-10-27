# XI TKJ 1 — YouTube Music Search

Sistem music sekarang memakai dua API resmi YouTube:

- **YouTube Data API v3** → mencari video musik berdasarkan kata kunci.
- **YouTube IFrame Player API** → memutar hasil pencarian di dalam web.

## 1. Masukkan API Key

Buka:

`youtube-api/youtube-config.js`

Kemudian isi:

```js
apiKey: 'PASTE_API_KEY_DI_SINI',
```

## 2. Jalankan dengan Live Server

Buka folder project di VS Code lalu klik kanan `index.html` → **Open with Live Server**.

Gunakan:

`http://localhost:5500/`

bukan `file:///...`.

## 3. Cara memakai music

Klik tombol music/search di bagian atas tengah.

1. Papan pencarian terbuka.
2. Ketik judul lagu atau nama artis.
3. Tekan **Cari**.
4. Klik salah satu hasil.
5. Video diputar melalui YouTube.

Shortcut:

`/` → buka pencarian music.

`Esc` → tutup pencarian.

## 4. Membatasi API Key

Karena website statis memakai API key di browser, gunakan pembatasan di Google Cloud Console. Batasi:

- API: **YouTube Data API v3**
- Application restriction: **HTTP referrers** saat website sudah online

Jangan membagikan API key mentah ke orang lain atau memasukkannya ke repository publik tanpa restriction.

## 5. Jika pencarian tidak bekerja

Periksa:

- API key sudah diisi.
- **YouTube Data API v3** sudah enabled pada project Google Cloud.
- Komputer terhubung internet.
- Website dibuka melalui Live Server.
- Console browser (`F12` → Console) tidak menunjukkan error quota atau API key.

Catatan: beberapa video YouTube dapat menolak embed. UI akan menampilkan pesan bahwa video tersebut tidak mengizinkan pemutaran di website; coba hasil pencarian lain.
