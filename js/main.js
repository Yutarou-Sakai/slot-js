'use strict';

{
  // ===Start Panel Class ===
  class Panel {
    // === Start constructor ===
    constructor() {
      // <section>を作ってpanelクラスを追加しする
      const section = document.createElement('section');
      section.classList.add('panel');

      // <img>を作ってランダムなＵＲＬを与える
      this.img = document.createElement('img');
      this.img.src = this.getRandomImage();

      // とりあえず代入
      this.timeoutId = undefined;

      // <div>を作る
      this.stop = document.createElement('div');
      // <div>にSTOPを表示させる
      this.stop.textContent = 'STOP';
      // <div>にstopクラスとinactiveクラスを追加する
      this.stop.classList.add('stop', 'inactive');


      // STOPボタン<div>をクリックしたときの動作 START
      this.stop.addEventListener('click', () => {
        // <div>にinactiveクラスがついていたら終了
        if (this.stop.classList.contains('inactive')) {
          return;
        }
        // <div>にinactiveクラスがついていなかったら追加
        this.stop.classList.add('inactive');
        // パネルのスピンを止める
        clearTimeout(this.timeoutId);
        // パネルの残り枚数を１枚ずつ減らす
        panelsLeft--;
        // パネルの残り枚数が０なら
        if (panelsLeft === 0) {
          // checkResultを実行
          checkResult();
          // スピンボタンからinactiveクラスを外す
          spin.classList.remove('inactive');
          // パネルの残り枚数を０にする
          panelsLeft = 3;
        }
      });
      // STOPボタン<div>をクリックしたときの動作 STOP


      // <section>の子要素に<img>と<div>を追加する
      section.appendChild(this.img);
      section.appendChild(this.stop);


      // <main>を取得して
      const main = document.querySelector('main');
      // 子要素に<section>を追加する
      main.appendChild(section);
    }
    // === Finish constructor ===

    // 画像のＵＲＬをランダムに取得する
    getRandomImage() {
      const images = [
        '../img/seven.png',
        '../img/bell.png',
        '../img/cherry.png',
      ];
      return images[Math.floor(Math.random() * images.length)];
    }

    // 画像をランダムに表示させる
    spin() {
      // <img>のsrcにランダムなＵＲＬを代入
      this.img.src = this.getRandomImage();
      // 上記を0.02秒ごとに繰り返す
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 20);
    }

    // 画像の正誤判定
    isUnmatched(p1, p2) {
      if (this.img.src !== p1.img.src && this.img.src !== p2.img.src) {
        return true;
      } else {
        return false;
      }
    }

    // unmatchedクラスを追加する
    unmatch() {
      this.img.classList.add('unmatched');
    }

    // unmatchedクラスとinactiveクラスを外す
    activate() {
      this.img.classList.remove('unmatched');
      this.stop.classList.remove('inactive');
    }
  }
  //===Finish Panel Class ===






  // とあるパネルと残り二つのパネルのＵＲＬが一致しなければunmatchedクラスを追加する
  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[2])) {
      panels[2].unmatch();
    }
  }


  // パネルの要素を配列に格納
  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];


  // パネルの残り枚数の初期値は３枚
  let panelsLeft = 3;


  // spinクラスを取得
  const spin = document.getElementById('spin');
  // スピンボタンをクリックしたときのイベントを追加
  spin.addEventListener('click', () => {
    // もしスピンにinactiveクラスがあれば動作を終了
    if (spin.classList.contains('inactive')) {
      return;
    }
    // スピンにinactiveクラスがなければ追加
    spin.classList.add('inactive');

    // パネルの要素一つ一つに対して
    panels.forEach(panel => {
      // unmatchedクラスとinactiveクラスを外す
      panel.activate();
      // 画像をランダムに表示させる
      panel.spin();
    });
  });
}