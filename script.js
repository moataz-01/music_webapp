document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio");
    const playlist = document.getElementById("playlist");
    const playlistItems = playlist.getElementsByTagName("li");
    const playBtn = document.getElementById("playBtn");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const seekBar = document.getElementById("seekBar");
    const currentSongDisplay = document.querySelector(".current-song");
    const songImage = document.getElementById("song-image");

    let currentSongIndex = 0;

    function playPause() {
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = `<i class="fa-solid fa-pause fa-2xl" style="color: #deddda;"></i>`;
        } else {
            audio.pause();
            playBtn.innerHTML = `<i class="fa-solid fa-play" style="color: #deddda;"></i>`;
        }
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
        loadSong(currentSongIndex);
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlistItems.length) % playlistItems.length;
        loadSong(currentSongIndex);
    }

    function loadSong(index) {
        const song = playlistItems[index].getAttribute("data-src");
        const img = playlistItems[index].getAttribute("data-img");
        audio.src = song;
        audio.play();
        playBtn.innerHTML = `<i class="fa-solid fa-pause fa-2xl" style="color: #deddda;"></i>`;
        currentSongDisplay.textContent = "Now Playing: " + playlistItems[index].textContent;
        songImage.src = img;
    }

    function updateSeekBar() {
        seekBar.value = (audio.currentTime / audio.duration) * 100;
    }

    function seekSong() {
        const seekTo = audio.duration * (seekBar.value / 100);
        audio.currentTime = seekTo;
    }

    playBtn.addEventListener("click", playPause);
    nextBtn.addEventListener("click", nextSong);
    prevBtn.addEventListener("click", prevSong);
    seekBar.addEventListener("input", seekSong);

    audio.addEventListener("ended", function () {
        nextSong();
    });

    audio.addEventListener("timeupdate", function () {
        updateSeekBar();
    });

    // Event listeners for playlist items
    for (let i = 0; i < playlistItems.length; i++) {
        playlistItems[i].addEventListener("click", function () {
            currentSongIndex = i;
            loadSong(currentSongIndex);
        });
    }
});
