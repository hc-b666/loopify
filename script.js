const musicInput = document.getElementById("musicInput");
const playPauseBtn = document.getElementById("playPauseBtn");
const audioPlayer = document.getElementById("audioPlayer");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");
const progressBar = document.getElementById("progressBar");

let isPlaying = false;

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

musicInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    audioPlayer.src = url;

    audioPlayer.addEventListener("loadedmetadata", () => {
      durationDisplay.textContent = formatTime(audioPlayer.duration);
      progressBar.max = Math.floor(audioPlayer.duration);
    });
  }
});

playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.src) {
    if (isPlaying) {
      audioPlayer.pause();
      playPauseBtn.textContent = "Play";
    } else {
      audioPlayer.play();
      playPauseBtn.textContent = "Pause";
    }
    isPlaying = !isPlaying;
  } else {
    alert("Please upload a music first!");
  }
});

audioPlayer.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audioPlayer.currentTime);
  currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
});

progressBar.addEventListener("input", (event) => {
  audioPlayer.currentTime = event.target.value;
});
