let video = document.querySelector('.player-video');
let playPauseButton = document.querySelector('.play-pause-button');


//#region PlayPause
const playPause = () => {
   if (video.paused || video.ended){
      video.play(),
      playPauseButton.querySelector("i").classList.remove("fa-play"),
        playPauseButton.querySelector("i").classList.add("fa-pause")
}
      else {
          video.pause(),
      playPauseButton.querySelector("i").classList.remove("fa-pause"),
      playPauseButton.querySelector("i").classList.add("fa-play")
  }
};
  
  playPauseButton.addEventListener("click", (e) => {
    e.preventDefault();
    playPause();
  });
  //#endregion
  