let video = document.querySelector(".player-video");
let playPauseButton = document.querySelector(".play-pause-button");
let muteUnmuteButton = document.querySelector(".mute-unmute-button");
let progressSlider = document.querySelector(".volume-slider");
let time = document.querySelector(".time-range");
let controls = document.querySelector(".player-controls");
let currentTime = document.querySelector(".time-stamp");
let durationVideo = document.querySelector(".time-stamp-fulltime");
let progress = document.querySelector(".progress-slider");
let fullScreenButton = document.querySelector(".fullscreen");
let playBackRate = document
  .querySelector(".playback-modal")
  .querySelectorAll(".btn-rate");
let buttonSettings = document.querySelector(".playback-speed-button");
let playBackModal = document.querySelector(".playback-modal");
let nextVideo = document.querySelector(".forward-button");
let videos = [
  "video_clips/clip1.mp4",
  "video_clips/clip2.mp4",
  "video_clips/clip3.mp4",
  "video_clips/clip4.mp4",
];

//#region windowLoad
window.addEventListener("load", () => {
  if (!localStorage.getItem("volume")) {
    progressSlider.value = 50;
    progressSlider.style.backgroundSize = "50% 100%";
  } else {
    progressSlider.value = parseFloat(localStorage.getItem("volume")) * 100;
    progressSlider.style.backgroundSize =
      parseFloat(localStorage.getItem("volume")) * 100 + "% 100%";
  }
  video.volume = progressSlider.value * 0.01;
  time.value = 0;
  time.style.backgroundSize = 0 + "% 100%";
  let inter = setInterval(() => {
    time.max = video.duration;
    clearInterval(inter);
  }, 500);
  video.controls = false;
});
//#endregion

//#region playPause
const playPause = () => {
  if (video.paused || video.ended) {
    video.play(),
      playPauseButton.querySelector("i").classList.remove("fa-play"),
      playPauseButton.querySelector("i").classList.add("fa-pause");
  } else {
    video.pause(),
      playPauseButton.querySelector("i").classList.remove("fa-pause"),
      playPauseButton.querySelector("i").classList.add("fa-play");
  }
};

console.log(playPause);

video.onended = function () {
  playPauseButton.querySelector("i").classList.remove("fa-pause"),
    playPauseButton.querySelector("i").classList.add("fa-play");
  video.src = videos[i === 0 ? videos.length-- : i++];
  video.play();
};

playPauseButton.addEventListener("click", (e) => {
  e.preventDefault();
  playPause();
});
//#endregion

//#region nextButton
let i = 1;

const nextVideoFor = function () {
  //   // video.src = videos[1];
  //   if (video.src === `http://127.0.0.1:5501/video_clips/clip1.mp4`) {
  //     video.src = `http://127.0.0.1:5501/video_clips/clip${i + 2}.mp4`;
  //   } else if (video.src === `http://127.0.0.1:5501/video_clips/clip${i + 2}.mp4`)
  //     video.src = `http://127.0.0.1:5501/video_clips/clip${i + 3}.mp4`;
  //   else if (video.src === `http://127.0.0.1:5501/video_clips/clip${i + 3}.mp4`) {
  //     video.src = `http://127.0.0.1:5501/video_clips/clip${i + 4}.mp4`;
  //   } else {
  //     video.src = videos[0];
  //   }
  //   video.play();
  //   video.load();
  i++;
  if (i === 5) i = 1;
  let nextVideo = "video_clips/clip" + i + ".mp4";
  video.src = nextVideo;
};
//#endregion

nextVideo.addEventListener("click", (e) => {
  e.preventDefault();
  nextVideoFor();
  playPause();
});
//#endregion

//#region muteUnmute
const muteSound = () => {
  video.muted = !video.muted;
  video.muted
    ? (muteUnmuteButton.querySelector("i").classList.remove("fa-volume-up"),
      muteUnmuteButton.querySelector("i").classList.add("fa-volume-mute"),
      (progressSlider.value = 0),
      (progressSlider.style.backgroundSize = 0 + "% 100%"))
    : (muteUnmuteButton.querySelector("i").classList.remove("fa-volume-mute"),
      muteUnmuteButton.querySelector("i").classList.add("fa-volume-up"),
      (progressSlider.value = parseFloat(localStorage.getItem("volume")) * 100),
      (progressSlider.style.backgroundSize =
        parseFloat(localStorage.getItem("volume")) * 100 + "% 100%"));
};

muteUnmuteButton.addEventListener("click", (e) => {
  e.preventDefault();
  muteSound();
});
//#endregion

//#region progressSlider
progressSlider.addEventListener("wheel", (e) => {
  if (e.wheelDeltaY < 0) {
    video.volume -= 1 * 0.01;
    localStorage.setItem("volume", video.volume);
    progressSlider.value = parseFloat(localStorage.getItem("volume")) * 100;
  } else {
    video.volume += 1 * 0.01;
    localStorage.setItem("volume", video.volume);
    progressSlider.value = parseFloat(localStorage.getItem("volume")) * 100;
  }
  progressSlider.style.backgroundSize = video.volume * 100 + "% 100%";
  if (video.volume === 0) {
    muteUnmuteButton.querySelector("i").classList.remove("fa-volume-up"),
      muteUnmuteButton.querySelector("i").classList.add("fa-volume-mute");
  } else {
    muteUnmuteButton.querySelector("i").classList.remove("fa-volume-mute"),
      muteUnmuteButton.querySelector("i").classList.add("fa-volume-up");
  }
  if (video.muted) {
    muteSound();
  }
});

progressSlider.addEventListener("input", (e) => {
  video.volume = e.target.value * 0.01;
  localStorage.setItem("volume", video.volume);
  progressSlider.style.backgroundSize = e.target.value + "% 100%";
  if (video.volume === 0) {
    muteUnmuteButton.querySelector("i").classList.remove("fa-volume-up"),
      muteUnmuteButton.querySelector("i").classList.add("fa-volume-mute");
  } else {
    muteUnmuteButton.querySelector("i").classList.remove("fa-volume-mute"),
      muteUnmuteButton.querySelector("i").classList.add("fa-volume-up");
  }
  if (video.muted) {
    muteSound();
  }
});
//#endregion

//#region
video.addEventListener("click", (e) => {
  e.preventDefault();
  playPause();
});

video.addEventListener("timeupdate", (e) => {
  e.preventDefault();
  time.value = video.currentTime;
  time.style.backgroundSize = (time.value / time.max) * 100 + "% 100%";
});

console.log(time.currentTime);

time.addEventListener("input", (e) => {
  e.preventDefault();
  console.log(`${e.target.value}`);
  time.value = e.target.value;
  video.currentTime = time.value;
  time.style.backgroundSize = (time.value / time.max) * 100 + "% 100%";
});
//#endregion

//#region videTimeUpdate
function videoTime() {
  let currentMinutes = Math.floor(video.currentTime / 120);
  let currentSeconds = Math.floor(video.currentTime - currentMinutes * 120);
  let durationMinutes = Math.floor(video.duration / 120);
  let durationSeconds = Math.floor(video.duration - durationMinutes * 120);

  currentTime.innerHTML = `${currentMinutes}:${
    currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
  }`;

  durationVideo.innerHTML = `${durationMinutes}:${
    durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds
  }`;
}

video.addEventListener("timeupdate", () => {
  // video current time & video duration time
  videoTime();
});

video.addEventListener("loadedmetadata", () => {
  video.volume = 0.5;
  progressSlider.style.width = "50%";
});
//#endregion

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    playPause();
  } else if (e.code === "ArrowLeft") {
    time.value -= 1;
    video.currentTime = time.value;
    time.style.backgroundSize = (time.value / time.max) * 100 + "% 100%";
  }
});

//#region playbackRate
buttonSettings.addEventListener("click", function () {
  playBackModal.classList.toggle("playback-modal-visible");
});

playBackRate.forEach((option) =>
  option.addEventListener("click", (e) => {
    video.playbackRate = option.innerText;
    playBackModal.classList.remove("playback-modal-visible");
  })
);

//#endregion
//#region fullScreen
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    video.classList.add("full-screen-player");
    document.querySelector("body").classList.add("black");
    fullScreenButton.querySelector("i").classList.add("fa-compress");
    fullScreenButton.querySelector("i").classList.remove("fa-expand");
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock("landscape");
    }
  } else {
    document.exitFullscreen();
    video.classList.remove("full-screen-player");
    document.querySelector("body").classList.remove("black");
    fullScreenButton.querySelector("i").classList.add("fa-expand");
    fullScreenButton.querySelector("i").classList.remove("fa-compress");
  }
}

fullScreenButton.addEventListener("click", (e) => {
  e.preventDefault();
  toggleFullscreen();
});
//#endregion
