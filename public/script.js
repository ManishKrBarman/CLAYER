const songs = [
    { title: "Agar Tum Saath Ho", artist: "Arijit Singh, Alka Yagnik", src: "/assets/music/m1.mp3", cover: "/assets/images/m1.png" },
    { title: "Abhi Na Jao Chhod Kar", artist: "Pritam", src: "/assets/music/m2.mp3", cover: "/assets/images/m2.png" },
    { title: "Tor Pirite", artist: "Zubeen Garg, Jeet Gannguli, Priyo Chatterjee", src: "/assets/music/m3.mp3", cover: "/assets/images/m3.png" },
    { title: "Ami Je Tomar 3.0", artist: "PritaAmaal Mallik, Shreya Ghoshal, Sameer, Pritam", src: "/assets/music/m4.mp3", cover: "/assets/images/m4.png" },
    { title: "Teri Baaton Mein Aisa Uljha Jiya", artist: "Tanishk Bagchi, Mitraz, Raghav, Sachin-Jigar", src: "/assets/music/m5.mp3", cover: "/assets/images/m5.png" },
    { title: "Akon - Lonely ", artist: "Akon", src: "/assets/music/m6.mp3", cover: "/assets/images/m6.png" },
    { title: "Dekha Ek Khwab Song", artist: "Kishore Kumar, Lata Mangeshkar, Shiv-Hari", src: "/assets/music/m7.mp3", cover: "/assets/images/m7.png" },
    { title: "Ishq Hai", artist: "", src: "/assets/music/m8.mp3", cover: "/assets/images/m8.png" },
    { title: "Koi Mil Gaya", artist: "Udit Narayan, Chitra", src: "/assets/music/m9.mp3", cover: "/assets/images/m9.png" },
    { title: "Tere Mast Mast Do Nain", artist: "", src: "/assets/music/m10.mp3", cover: "/assets/images/m10.png" },
    { title: "Je Deshe Chena Jana Manush Kono Nai", artist: "", src: "/assets/music/m11.mp3", cover: "/assets/images/m11.png" },
    { title: "Aha Ki Anando", artist: "", src: "/assets/music/m12.mp3", cover: "/assets/images/m12.png" },
];

let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex].src);

const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");
const albumArt = document.getElementById("album-art");
const shuffleIcon = document.getElementById("shuffle-icon");
const repeatIcon = document.getElementById("repeat-icon");
const volumeBtn = document.getElementById("volume-btn");

// Handle volume toggle (Mute/Unmute)
volumeBtn.addEventListener("click", () => {
    if (audio.volume > 0) {
        audio.volume = 0; // Mute
        volumeBtn.textContent = "🔇"; // Mute icon
    } else {
        audio.volume = 1; // Max volume
        volumeBtn.textContent = "🔊"; // Volume icon
    }
});

// Shuffle songs randomly
shuffleIcon.addEventListener("click", () => {
    currentSongIndex = Math.floor(Math.random() * songs.length);
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.textContent = "⏸";
});

// Enable or disable repeat mode
repeatIcon.addEventListener("click", () => {
    audio.loop = !audio.loop;
    repeatIcon.textContent = audio.loop ? "🔁" : "🔂";
});

function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    albumArt.src = song.cover;
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶️";
    }
}

function updateProgress() {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
}

function skip(step) {
    currentSongIndex = (currentSongIndex + step + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.textContent = "⏸";
}

playPauseBtn.addEventListener("click", playPause);
prevBtn.addEventListener("click", () => skip(-1));
nextBtn.addEventListener("click", () => skip(1));
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Initialize player
loadSong(currentSongIndex);

// Set initial volume
audio.volume = 1; // Set default volume to full
volumeBtn.textContent = "🔊"; // Default volume icon
