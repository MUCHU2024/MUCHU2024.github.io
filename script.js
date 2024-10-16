"use strict";
//startでのポップアップ表示↓
// const gamestart = document.getElementById("gamestart");
// const popup = document.getElementById("popup");

// gamestart.addEventListener("click", () => {
//   popup.style.display = "block";
// });
//ポップアップ表示↑

const kids = document.getElementById("kids");
const button = document.getElementById("start");
let mode = false;
button.addEventListener("click", () => {
  GAMESTART();
});
let kQuizNum = 1; //子供クイズ何問目か？
kids.addEventListener("click", () => {
  mode = true;
  GAMESTART();
}); //子供用はnextを変える

function GAMESTART() {
  //タイマー↓

  // setIntervalの基本
  var timer1 = null;
  var cnt = 120; //タイマーの秒数セット

  const hr = document.querySelector("hr");
  const STARTGR = document.getElementById("STARTGR");

  function event() {
    if (cnt > 0) {
      cnt--;
      if (21 > cnt) {
        //時間で色変化
        hr.style.backgroundColor = "red";
      }

      // 1000ミリ秒ごとにコンソールに表示
      console.log("this time number is: " + cnt);

      const TIMER = document.getElementById("default");
      TIMER.textContent = cnt;
      const line = document.getElementById("line");
      line.style.width = (cnt / 120) * 100 + "%";
    } else {
      //時間切れ
      //   window.alert("time up");
      window.location.href = "gameover.html";
    }
  }
  // タイマー開始
  timer1 = setInterval(event, 1000);
  flag = true;
  // button.style.display = "none";
  // kids.style.display = "none";
  STARTGR.style.display = "none";
  kaitoubtn.style.display = "inline";
  nextquestion(QuizNum);
  // nextquestion(k);
}
//タイマー↑

//問題と解答in
const Qimg = [
  "初級1.png",
  "初級2.png",
  "初級3.png",
  "初級4.png",
  "初級5.png",
  "初級6.png",
  "初級7.png",
  
  "中級.png",
  
  "上級1.png",
  "上級2.png",
  "上級3.png",
  "上級4.png",
  "上級5.png",
  "上級6.png",
  "上級7.png",
  "上級8.png",
  "上級9.png",
  "上級10.png",
  "上級11.png",
  "上級12.png",
  
]; //問題画像
const Corr = [
 "将棋",
  "かいすい",
  "心音", 
  "えべれすと",
  "いみ",
  "4",
  "8",

  "東京",

  "芋",
  "ぱんだ",
  "青赤",
  "しおひがり",
  "茶色",
  "ふぁみれす",
  "糸",
  "まうす",
  "さいふ",
  "しか",
  "みーと",
  "渋沢栄一"
  
]; //対応する正解
const kiQimg = [
  "子供用謎解き1.png",
  "子供用謎解き2.png",
  "子供用謎解き3.png",
];
const kiCorr = ["1", "うえ", "きつねのこども"]; //三問ずつ

let QuizNum = 1; //今何問目か？
let correctans;
//スタートするまで解答不可能↓
let flag = false;

//  = Corr[QuizNum - 1]; //現在の解答

const result = document.getElementById("result");
const quiz = document.getElementById("quiz");

//解答取得↓
const kaitoubtn = document.getElementById("kaitoubtn");
const kaitou = document.getElementById("kaitou");
kaitoubtn.addEventListener("click", () => {
  if (flag) {
    //タイマー進んでないと解答不可
    checkans();
  }
  kaitou.value = "";
});
//解答取得↑

//答え合わせ↓
let resultimg = document.getElementById("resultimg");

function checkans() {
  if (kaitou.value == correctans) {
    // 正解時
    result.style.display = "block";
    
    resultimg.src = "maruma-ku-illust3.png";
    setTimeout(function () {
      result.style.display = "none";
    }, 1000);
    
    if (mode) {
      //子供用true
      kQuizNum += 1;
      nextquestion(QuizNum);
    }
    QuizNum += 1;
    // quiz.textContent = QuizNum + "問目";
    nextquestion(QuizNum);
  } else {
    // 不正解時
    result.style.display = "block";
    resultimg.src = "batuma-ku-illust13.png";
    setTimeout(function () {
      result.style.display = "none";
    }, 1000);
  }
}
//答え合わせ↑

//問題をランダムに↓
let ranQ;
let ranA;
let ran;
function randomQ(qg) {
  //qgで一問目
  //最大値引く最小値＋最小値（フロア後）
  if (qg == 1) {
    ran = Math.floor(Math.random() * 7); // 0から6の整数を生成
  } else if (qg == 2) {
    /*ran = Math.floor(Math.random() * 3) + 3;*/
    ran = 7;
  } else {
    ran = Math.floor(Math.random() * 12) + 8; // 8から19の整数を生成
  }
  //ランダムにする

  ranQ = Qimg[ran];
  ranA = Corr[ran];
}

const quizsrc = document.getElementById("quizsrc");
//次出題↓
function nextquestion(Q) {
  if (mode) {
    if (kQuizNum == 4) {
      //子供クリア時
      window.location.href = "kidsclear.html";
    }

    //子供用
    // quiz.textContent = kQuizNum + "問目";
    quizsrc.src = kiQimg[kQuizNum - 1];
    correctans = kiCorr[kQuizNum - 1];
    console.log(kQuizNum - 1);
  } else {
    console.log(Q); //確認用
    randomQ(Q);
    // quiz.textContent = ranQ;
    // quiz.textContent = QuizNum + "問目";
    quizsrc.src = ranQ;

    correctans = ranA;
    console.log(ran);

    // quiz.textContent = Qimg[Q - 1];
    // quiz.textContent = Qimg[Math.floor(Math.random() * Qimg.length)];
    //↑のちにimgのurlを変えるものに変更 現在はid quiz
    // correctans = Corr[Q - 1];
    //問題解答配列のナンバーできめとく

    //問題imgと答え文字列を配列にいれてここで呼び出す?
    //QUiznumを引数Qにいれて管理。問題の難易度ごとに列用意、中でランダム出題？
    if (Q == 4) {
      //大人３問正解時
      window.location.href = "clear.html";
    }
  }
}
//子供用出題
// function kidsEv() {
//   quiz.textContent = kQuizNum;
//   quizsrc.src = kiQimg[kQuizNum];
//   correctans = kiCorr[kQuizNum];
//   console.log(kQuizNum);
// }
