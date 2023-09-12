const player = document.getElementById('player');
const gameContainer = document.querySelector('.game-container');
const startButton = document.getElementById('start-button');
const healthCounter = document.getElementById('health');
let isMovingLeft = false;
let isMovingRight = false;
let isGameRunning = false;
let playerHealth = 3;
let isInvincible = false; // 無敵状態のフラグ
const invincibleDuration = 500; // 無敵状態の持続時間（ミリ秒）

startButton.addEventListener('click', () => {
    if (!isGameRunning) {
        startGame();
    }
});

document.addEventListener('keydown', (e) => {
    if (isGameRunning) {
        if (e.key === 'ArrowLeft') {
            isMovingLeft = true;
        }
        if (e.key === 'ArrowRight') {
            isMovingRight = true;
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (isGameRunning) {
        if (e.key === 'ArrowLeft') {
            isMovingLeft = false;
        }
        if (e.key === 'ArrowRight') {
            isMovingRight = false;
        }
    }
});

function movePlayer() {
    if (isMovingLeft) {
        const currentPosition = parseInt(getComputedStyle(player).left);
        if (currentPosition > 0) {
            player.style.left = `${currentPosition - 5}px`;
        }
    }
    if (isMovingRight) {
        const currentPosition = parseInt(getComputedStyle(player).left);
        if (currentPosition < gameContainer.clientWidth - player.clientWidth) {
            player.style.left = `${currentPosition + 5}px`;
        }
    }
}

function createEnemy() {
    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    gameContainer.appendChild(enemy);
    const randomPosition = Math.floor(Math.random() * (gameContainer.clientWidth - 60));
    enemy.style.left = `${randomPosition}px`;

    function moveEnemy() {
        const currentPosition = parseInt(getComputedStyle(enemy).top);
        if (currentPosition < gameContainer.clientHeight - 60) {
            enemy.style.top = `${currentPosition + 3}px`;
            requestAnimationFrame(moveEnemy);
        } else {
            enemy.remove();
        }
    }

    requestAnimationFrame(moveEnemy);
}

// プレイヤーが敵と衝突したときの処理
function handlePlayerCollision() {
    if (!isInvincible) {
        playerHealth--;
        healthCounter.textContent = playerHealth;

        if (playerHealth <= 0) {
            endGame();
        } else {
            isInvincible = true;
            player.src = 'invincible.gif'; // GIF画像に切り替え

            setTimeout(() => {
                isInvincible = false;
                player.src = 'player.png'; // 通常の画像に戻す
            }, invincibleDuration);
        }
    }
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const enemies = document.querySelectorAll('.enemy');

    enemies.forEach((enemy) => {
        const enemyRect = enemy.getBoundingClientRect();
        if (
            playerRect.left < enemyRect.right &&
            playerRect.right > enemyRect.left &&
            playerRect.top < enemyRect.bottom &&
            playerRect.bottom > enemyRect.top
        ) {
            handlePlayerCollision();
            enemy.remove();
        }
    });
}

function startGame() {
    resetGame();
    isGameRunning = true;
    startButton.disabled = true;
    startButton.innerText = 'Game Running';
    setInterval(() => {
        if (isGameRunning) {
            createEnemy();
        }
    }, 500);
}

function gameLoop() {
    if (isGameRunning) {
        movePlayer();
        checkCollision();
    }
    requestAnimationFrame(gameLoop);
}

startButton.addEventListener('click', () => {
    if (!isGameRunning) {
        startGame();
    }
});

document.addEventListener('keydown', (e) => {
    if (isGameRunning) {
        if (e.key === 'ArrowLeft') {
            isMovingLeft = true;
        }
        if (e.key === 'ArrowRight') {
            isMovingRight = true;
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (isGameRunning) {
        if (e.key === 'ArrowLeft') {
            isMovingLeft = false;
        }
        if (e.key === 'ArrowRight') {
            isMovingRight = false;
        }
    }
});

function movePlayer() {
    if (isMovingLeft) {
        const currentPosition = parseInt(getComputedStyle(player).left);
        if (currentPosition > 0) {
            player.style.left = `${currentPosition - 5}px`;
        }
    }
    if (isMovingRight) {
        const currentPosition = parseInt(getComputedStyle(player).left);
        if (currentPosition < gameContainer.clientWidth - player.clientWidth) {
            player.style.left = `${currentPosition + 5}px`;
        }
    }
}

function createEnemy() {
    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    gameContainer.appendChild(enemy);
    const randomPosition = Math.floor(Math.random() * (gameContainer.clientWidth - 60)); // 幅を3倍に変更したので60にする
    enemy.style.left = `${randomPosition}px`;

    function moveEnemy() {
        const currentPosition = parseInt(getComputedStyle(enemy).top);
        if (currentPosition < gameContainer.clientHeight - 60) { // 高さを3倍に変更したので60にする
            enemy.style.top = `${currentPosition + 3}px`; // 移動距離を調整
            requestAnimationFrame(moveEnemy);
        } else {
            enemy.remove();
        }
    }

    requestAnimationFrame(moveEnemy);
}

function handlePlayerCollision() {
    if (!isInvincible) { // 無敵でない場合のみ処理を実行
        playerHealth--;
        healthCounter.textContent = playerHealth;

        if (playerHealth <= 0) {
            endGame();
        } else {
            isInvincible = true; // 無敵状態に設定
            player.src = 'invincible.gif'; // GIF画像に切り替え

            setTimeout(() => {
                isInvincible = false; // 無敵状態を解除
                player.src = 'player.png'; // 通常の画像に戻す
            }, invincibleDuration);
        }
    }
}


function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const enemies = document.querySelectorAll('.enemy');

    enemies.forEach((enemy) => {
        const enemyRect = enemy.getBoundingClientRect();
        if (
            playerRect.left < enemyRect.right &&
            playerRect.right > enemyRect.left &&
            playerRect.top < enemyRect.bottom &&
            playerRect.bottom > enemyRect.top
        ) {
            // プレイヤーと敵の当たり判定
            playerHealth--;
            healthCounter.innerText = playerHealth; // カウンターを更新
            if (playerHealth <= 0) {
                alert('You got hit too many times! Game Over.');
                resetGame();
            } else {
                enemy.remove();
            }
        }
    });
}

function resetGame() {
    player.style.left = `${(gameContainer.clientWidth - player.clientWidth) / 2}px`; // プレイヤーを水平中央に配置
    isGameRunning = false;
    startButton.disabled = false;
    startButton.innerText = 'Start Game';
    playerHealth = 3;
    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach((enemy) => {
        enemy.remove();
    });
    healthCounter.innerText = playerHealth; // カウンターをリセット
}

function endGame() {
    isGameRunning = false;
    player.src = 'game_over.gif'; // ゲームオーバー時にGIFに切り替え
    alert('Game Over');
    // ここでゲームオーバー時の追加の処理を行うこともできます
}

gameLoop();

const backButton = document.getElementById('back-button');

backButton.addEventListener('click', () => {
    window.history.back(); // ブラウザの戻る機能を呼び出す
});