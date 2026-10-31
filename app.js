const DEMO_AUDIO = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
];

const songs = [
  { id: 1, title: "Tum Hi Ho", album: "Aashiqui 2", year: 2013, duration: 262, color: "linear-gradient(135deg,#8b1e3f,#f07a9b)" },
  { id: 2, title: "Channa Mereya", album: "Ae Dil Hai Mushkil", year: 2016, duration: 289, color: "linear-gradient(135deg,#1a2a6c,#b21f1f)" },
  { id: 3, title: "Kesariya", album: "Brahmastra", year: 2022, duration: 268, color: "linear-gradient(135deg,#c2410c,#fbbf24)" },
  { id: 4, title: "Agar Tum Saath Ho", album: "Tamasha", year: 2015, duration: 341, color: "linear-gradient(135deg,#0f766e,#99f6e4)" },
  { id: 5, title: "Gerua", album: "Dilwale", year: 2015, duration: 345, color: "linear-gradient(135deg,#7c2d12,#fb923c)" },
  { id: 6, title: "Ae Dil Hai Mushkil", album: "Ae Dil Hai Mushkil", year: 2016, duration: 267, color: "linear-gradient(135deg,#312e81,#c4b5fd)" },
  { id: 7, title: "Tera Ban Jaunga", album: "Kabir Singh", year: 2019, duration: 237, color: "linear-gradient(135deg,#881337,#fda4af)" },
  { id: 8, title: "Raabta", album: "Agent Vinod", year: 2012, duration: 244, color: "linear-gradient(135deg,#164e63,#67e8f9)" },
  { id: 9, title: "Phir Le Aaya Dil", album: "Barfi!", year: 2012, duration: 298, color: "linear-gradient(135deg,#365314,#bef264)" },
  { id: 10, title: "Samjhawan", album: "Humpty Sharma Ki Dulhania", year: 2014, duration: 269, color: "linear-gradient(135deg,#9a3412,#fdba74)" },
  { id: 11, title: "Humari Adhuri Kahani", album: "Humari Adhuri Kahani", year: 2015, duration: 386, color: "linear-gradient(135deg,#1e3a8a,#93c5fd)" },
  { id: 12, title: "Kabira", album: "Yeh Jawaani Hai Deewani", year: 2013, duration: 226, color: "linear-gradient(135deg,#854d0e,#fde047)" },
  {
    id: 13,
    title: "Ik Vaari Aa",
    album: "Raabta",
    year: 2017,
    duration: 260,
    color: "linear-gradient(135deg,#4c1d95,#f0abfc)",
    file: "music/ik-vaari-aa.mp3",
    cover: "music/covers/ik-vaari-aa.svg",
  },
].map((song, i) => ({
  ...song,
  artist: song.artist || "Arijit Singh",
  src: song.file || DEMO_AUDIO[i % DEMO_AUDIO.length],
  art: song.cover || song.color,
}));

const playlists = [
  {
    id: "arijit-hits",
    name: "Arijit Singh Hits",
    description: "The most loved tracks from the voice of a generation.",
    cover: "linear-gradient(145deg,#5a3d2b,#c47a4a 55%,#1ed760)",
    tracks: songs.map((s) => s.id),
  },
  {
    id: "romantic-night",
    name: "Romantic Night",
    description: "Soft Arijit ballads for late evenings.",
    cover: "linear-gradient(145deg,#3b0764,#db2777)",
    tracks: [1, 4, 7, 8, 10, 13],
  },
  {
    id: "bollywood-gold",
    name: "Bollywood Gold",
    description: "Chart toppers that never get old.",
    cover: "linear-gradient(145deg,#7f1d1d,#f59e0b)",
    tracks: [2, 3, 5, 6, 12, 13],
  },
  {
    id: "daily-mix",
    name: "Daily Mix 1",
    description: "Made for you · Arijit Singh and more",
    cover: "linear-gradient(145deg,#0e7490,#a7f3d0)",
    tracks: [3, 1, 6, 9, 11, 13],
  },
  {
    id: "focus-flow",
    name: "Focus Flow",
    description: "Calm vocals to keep you in the zone.",
    cover: "linear-gradient(145deg,#14532d,#86efac)",
    tracks: [4, 9, 11, 8, 13],
  },
  {
    id: "liked",
    name: "Liked Songs",
    description: "Songs you love on Shaswat.",
    cover: "linear-gradient(145deg,#450af5,#c4efd9)",
    tracks: [1, 2, 3, 4, 7, 13],
  },
];

const state = {
  view: "home",
  playlistId: "arijit-hits",
  queue: songs,
  history: ["home"],
  historyIndex: 0,
  currentIndex: -1,
  queueSource: "Arijit Singh Hits",
  isPlaying: false,
  shuffle: false,
  repeat: 0,
  liked: new Set([1, 2, 3]),
};

const audio = document.getElementById("audio");
const content = document.getElementById("content");
const searchWrap = document.getElementById("search-wrap");
const searchInput = document.getElementById("search-input");
const toastEl = document.getElementById("toast");

function artStyle(value) {
  if (!value) return "";
  if (
    value.startsWith("linear-gradient") ||
    value.startsWith("radial-gradient") ||
    value.startsWith("url(")
  ) {
    return `background-image:${value}`;
  }
  return `background-image:url("${value}")`;
}

function formatTime(sec) {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

function songById(id) {
  return songs.find((s) => s.id === id);
}

function toast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

function setRangeFill(el) {
  const min = Number(el.min) || 0;
  const max = Number(el.max) || 100;
  const val = Number(el.value) || 0;
  const pct = ((val - min) / (max - min)) * 100;
  el.style.background = `linear-gradient(90deg, #fff ${pct}%, #4d4d4d ${pct}%)`;
}

function renderSidebarPlaylists() {
  const host = document.getElementById("sidebar-playlists");
  host.innerHTML = playlists
    .filter((p) => p.id !== "liked")
    .map(
      (p) =>
        `<button type="button" class="playlist-link ${state.playlistId === p.id && state.view === "playlist" ? "active" : ""}" data-playlist="${p.id}">${p.name}</button>`
    )
    .join("");
}

function renderHome() {
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  const quick = [
    playlists[0],
    playlists[1],
    playlists[5],
    playlists[2],
    playlists[3],
    playlists[4],
  ];

  content.innerHTML = `
    <section class="hero">
      <div class="hero-kicker">Music for everyone</div>
      <h1>Shaswat</h1>
      <p>Stream millions of songs with the same polish you know — curated Arijit Singh favourites, playlists, and a full player experience.</p>
      <div class="hero-actions">
        <button type="button" class="btn-green" data-play-playlist="arijit-hits">Play Arijit Hits</button>
        <button type="button" class="btn-outline" data-playlist="arijit-hits">Open playlist</button>
      </div>
    </section>

    <h2 style="margin:0 0 14px;font-size:1.5rem;font-weight:800;">${greeting}</h2>
    <div class="quick-grid">
      ${quick
        .map(
          (p) => `
        <button type="button" class="quick" data-playlist="${p.id}">
          <div class="quick-art" style="${artStyle(p.cover)}"></div>
          <span class="quick-title">${p.name}</span>
          <span class="play-fab" data-play-playlist="${p.id}" aria-label="Play">▶</span>
        </button>`
        )
        .join("")}
    </div>

    <section class="section">
      <div class="section-head">
        <h2>Featuring Arijit Singh</h2>
        <button type="button" class="show-all" data-playlist="arijit-hits">Show all</button>
      </div>
      <div class="card-grid">
        ${[songById(13), ...songs.filter((s) => s.id !== 13)]
          .slice(0, 6)
          .map(
            (s) => `
          <button type="button" class="card" data-play-song="${s.id}">
            <div class="card-art" style="${artStyle(s.art)}">
              <span class="play-fab" aria-hidden="true">▶</span>
            </div>
            <h3 class="card-title">${s.title}</h3>
            <p class="card-sub">${s.artist} · ${s.album}</p>
          </button>`
          )
          .join("")}
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Made for you</h2>
        <button type="button" class="show-all" data-view="library">Show all</button>
      </div>
      <div class="card-grid">
        ${playlists
          .filter((p) => p.id !== "liked")
          .map(
            (p) => `
          <button type="button" class="card" data-playlist="${p.id}">
            <div class="card-art" style="${artStyle(p.cover)}">
              <span class="play-fab" data-play-playlist="${p.id}" aria-hidden="true">▶</span>
            </div>
            <h3 class="card-title">${p.name}</h3>
            <p class="card-sub">${p.description}</p>
          </button>`
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderPlaylist(id) {
  const playlist = playlists.find((p) => p.id === id) || playlists[0];
  state.playlistId = playlist.id;
  const tracks = playlist.tracks.map(songById).filter(Boolean);

  content.innerHTML = `
    <div class="playlist-hero">
      <div class="playlist-cover" style="${artStyle(playlist.cover)}"></div>
      <div class="playlist-meta">
        <div class="type">Playlist</div>
        <h1>${playlist.name}</h1>
        <p>${playlist.description}<br /><strong>Shaswat</strong> · ${tracks.length} songs</p>
      </div>
    </div>
    <div class="playlist-actions">
      <button type="button" class="btn-green" data-play-playlist="${playlist.id}" aria-label="Play">▶</button>
      <button type="button" class="icon-btn" style="font-size:1.6rem;color:var(--text-muted)" title="More">⋯</button>
    </div>
    <table class="track-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Album</th>
          <th>⏱</th>
        </tr>
      </thead>
      <tbody>
        ${tracks
          .map((s, i) => {
            const playing = state.queue[state.currentIndex]?.id === s.id && state.isPlaying;
            return `
            <tr class="track-row ${playing ? "playing" : ""}" data-play-song="${s.id}" data-playlist-context="${playlist.id}">
              <td class="track-index"><span class="num">${i + 1}</span><span class="play-cell">▶</span></td>
              <td>
                <div class="track-main">
                  <div class="track-mini" style="${artStyle(s.art)}"></div>
                  <div>
                    <div class="track-name">${s.title}</div>
                    <div>${s.artist}</div>
                  </div>
                </div>
              </td>
              <td>${s.album}</td>
              <td>${formatTime(s.duration)}</td>
            </tr>`;
          })
          .join("")}
      </tbody>
    </table>
  `;
  renderSidebarPlaylists();
}

function renderSearch(query = "") {
  const q = query.trim().toLowerCase();
  const results = !q
    ? songs
    : songs.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.album.toLowerCase().includes(q) ||
          s.artist.toLowerCase().includes(q)
      );

  content.innerHTML = `
    <section class="section" style="padding-top:12px">
      <div class="section-head">
        <h2>${q ? `Results for “${query.trim()}”` : "Browse all Arijit tracks"}</h2>
      </div>
      ${
        results.length === 0
          ? `<div class="search-empty"><h3>No results found</h3><p>Try another song, album, or artist name.</p></div>`
          : `<table class="track-table">
              <thead><tr><th>#</th><th>Title</th><th>Album</th><th>⏱</th></tr></thead>
              <tbody>
                ${results
                  .map(
                    (s, i) => `
                  <tr class="track-row" data-play-song="${s.id}">
                    <td class="track-index"><span class="num">${i + 1}</span><span class="play-cell">▶</span></td>
                    <td>
                      <div class="track-main">
                        <div class="track-mini" style="${artStyle(s.art)}"></div>
                        <div>
                          <div class="track-name">${s.title}</div>
                          <div>${s.artist}</div>
                        </div>
                      </div>
                    </td>
                    <td>${s.album}</td>
                    <td>${formatTime(s.duration)}</td>
                  </tr>`
                  )
                  .join("")}
              </tbody>
            </table>`
      }
    </section>
  `;
}

function renderLibrary() {
  content.innerHTML = `
    <section class="section" style="padding-top:16px">
      <div class="section-head"><h2>Your Library</h2></div>
      <div class="card-grid">
        ${playlists
          .map(
            (p) => `
          <button type="button" class="card" data-playlist="${p.id}">
            <div class="card-art" style="${artStyle(p.cover)}">
              <span class="play-fab" data-play-playlist="${p.id}" aria-hidden="true">▶</span>
            </div>
            <h3 class="card-title">${p.name}</h3>
            <p class="card-sub">Playlist · ${p.tracks.length} songs</p>
          </button>`
          )
          .join("")}
      </div>
    </section>
  `;
}


function renderDiscover() {
  content.innerHTML = `
    <section style="padding:24px 0;">
      <div class="hero-kicker">CURATED VOCAL MUSIC</div>
      <h1 style="font-size:2rem;margin:8px 0;">Discover Music</h1>
      <p style="color:var(--muted,#aaa);margin-bottom:24px;">Hindi melodies and English stories, all in one place.</p>

      <h2 style="margin:22px 0 12px;">Hindi Soul ❤️</h2>
      <iframe title="Best Hindi Love Songs" style="border-radius:14px;width:100%;height:352px;border:0;"
        src="https://open.spotify.com/embed/playlist/1UwKGWCjUhEfnKubOo7mHD?utm_source=generator&theme=0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"></iframe>
      <p><a href="https://open.spotify.com/playlist/1UwKGWCjUhEfnKubOo7mHD" target="_blank" rel="noopener">Open Hindi playlist in Spotify ↗</a></p>

      <h2 style="margin:30px 0 12px;">English Stories 🌌</h2>
      <iframe title="English Singer Songwriter Playlist" style="border-radius:14px;width:100%;height:352px;border:0;"
        src="https://open.spotify.com/embed/playlist/2QT68Q0egPz7uYqcwkmNTL?utm_source=generator&theme=0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"></iframe>
      <p><a href="https://open.spotify.com/playlist/2QT68Q0egPz7uYqcwkmNTL" target="_blank" rel="noopener">Open English playlist in Spotify ↗</a></p>
    </section>
  `;
}

function navigate(view, opts = {}) {
  if (!opts.silent) {
    if (state.history[state.historyIndex] !== view + (opts.playlistId || "")) {
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(view + (opts.playlistId ? `:${opts.playlistId}` : ""));
      state.historyIndex = state.history.length - 1;
    }
  }

  state.view = view;
  if (opts.playlistId) state.playlistId = opts.playlistId;

  document.querySelectorAll(".nav-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.view === view || (view === "liked" && el.dataset.view === "library"));
  });

  searchWrap.hidden = view !== "search";
  if (view === "search") searchInput.focus();

  if (view === "home") renderHome();
  else if (view === "discover") renderDiscover();
  else if (view === "search") renderSearch(searchInput.value);
  else if (view === "library") renderLibrary();
  else if (view === "liked") renderPlaylist("liked");
  else if (view === "playlist") renderPlaylist(opts.playlistId || state.playlistId);

  renderSidebarPlaylists();
}

function updatePlayerUI() {
  const song = state.queue[state.currentIndex];
  const playIcon = document.querySelector("#play-btn .icon-play");
  const pauseIcon = document.querySelector("#play-btn .icon-pause");

  if (!song) {
    document.getElementById("np-title").textContent = "Select a song";
    document.getElementById("np-artist").textContent = "Shaswat";
    document.getElementById("np-art").style.backgroundImage = "";
    playIcon.hidden = false;
    pauseIcon.hidden = true;
    return;
  }

  document.getElementById("np-title").textContent = song.title;
  document.getElementById("np-artist").textContent = song.artist;
  const art = document.getElementById("np-art");
  art.style.background = "";
  art.style.backgroundSize = "cover";
  art.style.backgroundPosition = "center";
  if (
    song.art.startsWith("linear-gradient") ||
    song.art.startsWith("radial-gradient")
  ) {
    art.style.backgroundImage = song.art;
  } else {
    art.style.backgroundImage = `url("${song.art}")`;
  }

  playIcon.hidden = state.isPlaying;
  pauseIcon.hidden = !state.isPlaying;
  document.getElementById("play-btn").setAttribute("aria-label", state.isPlaying ? "Pause" : "Play");

  const liked = state.liked.has(song.id);
  const likeBtn = document.getElementById("like-btn");
  likeBtn.textContent = liked ? "♥" : "♡";
  likeBtn.classList.toggle("liked", liked);

  document.getElementById("shuffle-btn").classList.toggle("active", state.shuffle);
  document.getElementById("repeat-btn").classList.toggle("active", state.repeat > 0);

  document.querySelectorAll(".track-row").forEach((row) => {
    const id = Number(row.dataset.playSong);
    row.classList.toggle("playing", id === song.id && state.isPlaying);
  });
}

async function loadAndPlay(index) {
  if (index < 0 || index >= state.queue.length) return;
  state.currentIndex = index;
  const song = state.queue[index];
  audio.src = song.src;
  audio.load();
  try {
    await audio.play();
    state.isPlaying = true;
  } catch (err) {
    state.isPlaying = false;
    toast(
      song.file
        ? `Could not play ${song.title} — check ${song.file}`
        : "Preview audio blocked — click Play again"
    );
    console.warn("Playback failed", err);
  }
  updatePlayerUI();
  document.title = `${song.title} · ${song.artist} | Shaswat`;
}

function playPlaylist(id, startSongId) {
  const playlist = playlists.find((p) => p.id === id) || playlists[0];
  state.queue = playlist.tracks.map(songById).filter(Boolean);
  state.queueSource = playlist.name;
  let index = 0;
  if (startSongId) {
    const found = state.queue.findIndex((s) => s.id === startSongId);
    if (found >= 0) index = found;
  }
  loadAndPlay(index);
  toast(`Playing ${playlist.name}`);
}

function playSong(id, playlistContext) {
  if (playlistContext) {
    playPlaylist(playlistContext, id);
    return;
  }
  state.queue = [...songs];
  state.queueSource = "Arijit Singh";
  const index = state.queue.findIndex((s) => s.id === id);
  loadAndPlay(index >= 0 ? index : 0);
}

function togglePlay() {
  if (state.currentIndex < 0) {
    playPlaylist("arijit-hits");
    return;
  }
  if (state.isPlaying) {
    audio.pause();
    state.isPlaying = false;
  } else {
    audio.play().then(() => {
      state.isPlaying = true;
      updatePlayerUI();
    });
    return;
  }
  updatePlayerUI();
}

function nextTrack() {
  if (!state.queue.length) return;
  if (state.shuffle) {
    let next = Math.floor(Math.random() * state.queue.length);
    if (state.queue.length > 1 && next === state.currentIndex) {
      next = (next + 1) % state.queue.length;
    }
    loadAndPlay(next);
    return;
  }
  const next = state.currentIndex + 1;
  if (next >= state.queue.length) {
    if (state.repeat === 1) loadAndPlay(0);
    else {
      state.isPlaying = false;
      updatePlayerUI();
    }
    return;
  }
  loadAndPlay(next);
}

function prevTrack() {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  if (!state.queue.length) return;
  const prev = state.currentIndex - 1;
  loadAndPlay(prev < 0 ? 0 : prev);
}

function bindUI() {
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      if (view === "liked") navigate("liked");
      else navigate(view);
    });
  });

  document.getElementById("create-playlist").addEventListener("click", () => {
    toast("Playlist created in Your Library");
  });

  document.querySelector('.chip.liked').addEventListener("click", () => navigate("liked"));

  content.addEventListener("click", (e) => {
    const playSongBtn = e.target.closest("[data-play-song]");
    const playPl = e.target.closest("[data-play-playlist]");
    const openPl = e.target.closest("[data-playlist]");
    const viewBtn = e.target.closest("[data-view]");

    if (playPl) {
      e.preventDefault();
      e.stopPropagation();
      playPlaylist(playPl.dataset.playPlaylist);
      return;
    }
    if (playSongBtn) {
      playSong(Number(playSongBtn.dataset.playSong), playSongBtn.dataset.playlistContext);
      return;
    }
    if (openPl) {
      navigate("playlist", { playlistId: openPl.dataset.playlist });
      return;
    }
    if (viewBtn) {
      navigate(viewBtn.dataset.view);
    }
  });

  document.getElementById("sidebar-playlists").addEventListener("click", (e) => {
    const link = e.target.closest("[data-playlist]");
    if (link) navigate("playlist", { playlistId: link.dataset.playlist });
  });

  searchInput.addEventListener("input", () => {
    if (state.view === "search") renderSearch(searchInput.value);
  });

  document.getElementById("play-btn").addEventListener("click", togglePlay);
  document.getElementById("next-btn").addEventListener("click", nextTrack);
  document.getElementById("prev-btn").addEventListener("click", prevTrack);

  document.getElementById("shuffle-btn").addEventListener("click", () => {
    state.shuffle = !state.shuffle;
    updatePlayerUI();
    toast(state.shuffle ? "Shuffle on" : "Shuffle off");
  });

  document.getElementById("repeat-btn").addEventListener("click", () => {
    state.repeat = (state.repeat + 1) % 3;
    updatePlayerUI();
    toast(state.repeat === 0 ? "Repeat off" : state.repeat === 1 ? "Repeat playlist" : "Repeat track");
  });

  document.getElementById("like-btn").addEventListener("click", () => {
    const song = state.queue[state.currentIndex];
    if (!song) return;
    if (state.liked.has(song.id)) {
      state.liked.delete(song.id);
      toast("Removed from Liked Songs");
    } else {
      state.liked.add(song.id);
      toast("Added to Liked Songs");
    }
    const likedPl = playlists.find((p) => p.id === "liked");
    likedPl.tracks = [...state.liked];
    updatePlayerUI();
  });

  const seek = document.getElementById("seek");
  const volume = document.getElementById("volume");

  seek.addEventListener("input", () => {
    if (!audio.duration) return;
    audio.currentTime = (Number(seek.value) / 100) * audio.duration;
    setRangeFill(seek);
  });

  volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
    setRangeFill(volume);
  });

  document.getElementById("mute-btn").addEventListener("click", () => {
    audio.muted = !audio.muted;
    toast(audio.muted ? "Muted" : "Unmuted");
  });

  document.getElementById("back-btn").addEventListener("click", () => {
    if (state.historyIndex <= 0) return;
    state.historyIndex -= 1;
    const entry = state.history[state.historyIndex];
    const [view, playlistId] = entry.split(":");
    navigate(view, { playlistId, silent: true });
  });

  document.getElementById("fwd-btn").addEventListener("click", () => {
    if (state.historyIndex >= state.history.length - 1) return;
    state.historyIndex += 1;
    const entry = state.history[state.historyIndex];
    const [view, playlistId] = entry.split(":");
    navigate(view, { playlistId, silent: true });
  });

  document.getElementById("queue-btn").addEventListener("click", () => {
    toast(state.queueSource ? `Queue · ${state.queueSource}` : "Queue is empty");
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    seek.value = String((audio.currentTime / audio.duration) * 100);
    document.getElementById("time-elapsed").textContent = formatTime(audio.currentTime);
    document.getElementById("time-total").textContent = formatTime(audio.duration);
    setRangeFill(seek);
  });

  audio.addEventListener("ended", () => {
    if (state.repeat === 2) {
      audio.currentTime = 0;
      audio.play();
      return;
    }
    nextTrack();
  });

  audio.addEventListener("play", () => {
    state.isPlaying = true;
    updatePlayerUI();
  });

  audio.addEventListener("pause", () => {
    if (!audio.ended) {
      state.isPlaying = false;
      updatePlayerUI();
    }
  });

  setRangeFill(seek);
  setRangeFill(volume);
  audio.volume = Number(volume.value);
}

renderSidebarPlaylists();
bindUI();
navigate("home", { silent: true });
updatePlayerUI();
