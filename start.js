"use strict";

//html側にいれても良
const gamestart = document.getElementById("gamestart");
const popup = document.getElementById("popup");
const doui = document.getElementById("doui");

gamestart.addEventListener("click", () => {
  popup.style.display = "block";
  gamestart.style.display = "none";
  doui.style.display = "block";
});
