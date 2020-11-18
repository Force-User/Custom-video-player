"use strict";
//variables
const player = document.querySelector(".player");
const playerControlPanel = player.querySelector(".player-panel");
const playButton = playerControlPanel.querySelector(".player-control__button--toggle");
const video = player.querySelector(".player__video");
const playIcon = playButton.querySelector(".player-control__play");
const inputRange = playerControlPanel.querySelector(".player-volume__range");
const playerSkip = playerControlPanel.querySelector(".player-skip");
const playerSpeed = playerControlPanel.querySelector(".player-speed");
const speedSelect = playerSpeed.querySelector(".speed-select");
const speedOptions = playerSpeed.querySelector(".speed-options");
const playerFilld = playerControlPanel.querySelector(".player-filld");
const playerProgress = playerFilld.querySelector(".player-filld__progress");
const fullscreenButton = playerControlPanel.querySelector(".fullscreen");

//events

playButton.addEventListener("click", toggleVideo);
video.addEventListener("click", toggleVideo);
video.addEventListener("play", toggleButton);
video.addEventListener("pause", toggleButton);
video.addEventListener("timeupdate", handlerProgress);
inputRange.addEventListener("mousemove", handlerRange);
inputRange.addEventListener("change", handlerRange);
playerSkip.addEventListener("click", (e) => {
  const selectedButton = e.target.closest("button");
  if (selectedButton) skipVideo(selectedButton);
});
playerSpeed.addEventListener("click", (e) => {
  const selectedElement = e.target.closest("button");
  if (selectedElement) toggleSelect(selectedElement);
});
playerFilld.addEventListener("click", rewind);
fullscreenButton.addEventListener("click", (e) => {
  console.log(document.webkitCancelFullScreen());
  if (player.webkitRequestFullScreen) {
    player.webkitRequestFullScreen();
  } else {
    document.exitFullScreen();
  }
});
player.addEventListener("mouseover", showPanel);
player.addEventListener("mouseout", showPanel);

//functions

function toggleVideo() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}
function toggleButton() {
  playIcon.src = video.paused ? "/image/play.svg" : "/image/pause.svg";
}
function handlerRange() {
  video[this.name] = this.value;
}
function skipVideo(btn) {
  video.currentTime += parseFloat(btn.dataset.skip);
}
function toggleSelect(btn) {
  const speedValue = parseFloat(btn.dataset.speed);
  speedOptions.classList.toggle("select-show");
  if (speedValue) {
    speedSelect.textContent = btn.textContent;
    setVideoSpeed(speedValue);
  }
}
function setVideoSpeed(speed) {
  console.log(speed);
  video.playbackRate = parseFloat(speed);
}
function handlerProgress() {
  const procent = (video.currentTime / video.duration) * 100;
  playerProgress.style.flexBasis = `${procent}%`;
  setTimeVideo();
}
function rewind(e) {
  const time = (e.offsetX / playerFilld.clientWidth) * video.duration;
  video.currentTime = time;
}
function showPanel() {
  playerControlPanel.classList.toggle("show-panel");
}
function setTimeVideo() {
  const sec = video.currentTime.toFixed() % 60;
  const min = Math.floor(sec / 60 % 60);
  const timeElement = document.querySelector(".time");
  timeElement.textContent = `${checkZero(min)}:${checkZero(sec)}`;
}
function checkZero(numb) {
  return numb > 9 ? numb : `0${numb}`;
}
