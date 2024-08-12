

document.addEventListener('DOMContentLoaded', function () {

    // 各画面の要素を取得
    const titleScreen = document.getElementById('title-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const tapImage = document.getElementById('tap-image');
    const countdown = document.getElementById('countdown');
    const timeLeftDisplay = document.getElementById('time-left');

    const ketteiSound = document.getElementById('kettei-sound'); // 音声要素を取得
    const syukuSound = document.getElementById('syuku-sound'); // 音声要素を取得
    const kaunntoSound = document.getElementById('kaunnto-sound'); // 音声要素を取得
    const bgmSound = document.getElementById('bgm-sound'); // 音声要素を取得
    const upSound = document.getElementById('up-sound'); // 音声要素を取得

    // ゲームの状態を管理する変数
    let timeLeft = 20; // 残り時間
    let tapCount = 0;  // タップ回数
    let countdownInterval; // カウントダウンのインターバルID
    let gameInterval; // ゲーム時間のインターバルID

    // ゲーム開始ボタンのクリックイベントを設定
    startButton.addEventListener('click', startGame);

    // リスタートボタンのクリックイベントを設定
    restartButton.addEventListener('click', restartGame);

    // 画像のクリックイベントを設定
    tapImage.addEventListener('click', tapImageHandler);

    // ゲーム開始関数
    function startGame() {
        // 音声を再生
        ketteiSound.play();
        kaunntoSound.play();

        // タイトル画面を隠してゲーム画面を表示
        titleScreen.style.display = 'none';
        gameScreen.style.display = 'block';

        // カウントダウンを表示
        countdown.style.display = 'block';
        countdown.textContent = '3';
        tapImage.style.width = '20vh'; // 画像のサイズを初期化
        gameScreen.style.backgroundImage = 'url("img/h1.png")'; // 初期背景画像を設定

        resultScreen.style.backgroundImage = 'url("img/r1.png")'; // 初期背景画像を設定

        tapImage.removeEventListener('click', tapImageHandler); // カウントダウン中は画像のクリックイベントを無効化

        // カウントダウンのインターバルを設定
        countdownInterval = setInterval(() => {
            let currentCount = parseInt(countdown.textContent);
            if (currentCount > 1) {
                // カウントダウンを1減らす
                countdown.textContent = currentCount - 1;
            } else {
                // カウントダウン終了後、ゲームを開始
                clearInterval(countdownInterval);
                startPlay();
            }
        }, 1000);
    }

    // ゲームプレイ開始関数
    function startPlay() {
        bgmSound.play();
        countdown.style.display = 'none'; // カウントダウンを隠す
        tapImage.style.display = 'block'; // 画像を表示
        tapCount = 0; // タップカウントを初期化
        timeLeft = 20; // 残り時間を初期化
        timeLeftDisplay.textContent = timeLeft; // 残り時間を表示

        tapImage.addEventListener('click', tapImageHandler); // 画像のクリックイベントを有効化

        // ゲーム時間のインターバルを設定
        gameInterval = setInterval(() => {
            if (timeLeft > 0) {
                // 残り時間を1秒ずつ減らす
                timeLeft--;
                timeLeftDisplay.textContent = timeLeft;
            } else {
                // ゲーム時間が終了したらゲームを終了
                clearInterval(gameInterval);
                endGame();
            }
        }, 1000);
    }

    // 画像タップ時の処理関数
    function tapImageHandler() {
        tapCount++; // タップカウントを増やす
        const newSize = 20 + tapCount * 0.8; // 新しい画像サイズを計算
        tapImage.style.width = newSize + 'vh'; // 画像のサイズを変更


        // 背景画像を更新
        updateGameBackgroundImage(tapCount);
        upSound.play();
    }

    // ゲーム画面の背景画像を更新する関数
    function updateGameBackgroundImage(tapCount) {
        if (tapCount >= 120) {
            gameScreen.style.backgroundImage = 'url("img/h5.png")';
        } else if (tapCount >= 90) {
            gameScreen.style.backgroundImage = 'url("img/h4.png")';
        } else if (tapCount >= 60) {
            gameScreen.style.backgroundImage = 'url("img/h3.png")';
        } else if (tapCount >= 30) {
            gameScreen.style.backgroundImage = 'url("img/h2.png")';
        } else {
            gameScreen.style.backgroundImage = 'url("img/h1.png")';
        }
    }

    // リザルト画面の背景画像を更新する関数
    function updateResultBackgroundImage(tapCount) {
        if (tapCount >= 120) {
            resultScreen.style.backgroundImage = 'url("img/r5.png")';
        } else if (tapCount >= 90) {
            resultScreen.style.backgroundImage = 'url("img/r4.png")';
        } else if (tapCount >= 60) {
            resultScreen.style.backgroundImage = 'url("img/r3.png")';
        } else if (tapCount >= 30) {
            resultScreen.style.backgroundImage = 'url("img/r2.png")';
        } else {
            resultScreen.style.backgroundImage = 'url("img/r1.png")';
        }
    }

    // ゲーム終了関数
    function endGame() {
        syukuSound.play();
        tapImage.removeEventListener('click', tapImageHandler); // ゲーム終了時に画像のクリックイベントを無効化
        updateResultBackgroundImage(tapCount); // リザルト画面の背景画像を更新
        gameScreen.style.display = 'none'; // ゲーム画面を隠す
        resultScreen.style.display = 'block'; // リザルト画面を表示

        // リスタートボタンを3秒後に表示
        setTimeout(() => {
            restartButton.style.display = 'block';
        }, 3000);
    }

    // リスタート関数
    function restartGame() {
        ketteiSound.play();
        resultScreen.style.display = 'none'; // リザルト画面を隠す
        titleScreen.style.display = 'block'; // タイトル画面を表示
        countdown.style.display = 'block'; // カウントダウンを再表示
        countdown.textContent = '3'; // カウントダウンをリセット
        restartButton.style.display = 'none'; // リスタートボタンを隠す
    }
});
