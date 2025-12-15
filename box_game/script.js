const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $game = document.querySelector('#game');
const $start = document.querySelector('#start');
const $changeTime = document.querySelector('#change-time');


let score = 0;
let colors = ['blue', 'brown', 'green', 'yellow', 'purple', 'red', 'pink'];

$start.addEventListener('click', startGame);
$changeTime.addEventListener('input', changeTime);
$game.addEventListener('click', clickHandler);

function startGame() {
    $start.style.display = "none";
    $game.style.backgroundColor = "white";
    $changeTime.setAttribute('disabled', 'true');
    $changeTime.style.backgroundColor = 'rgba(240, 201, 227, 1)';

    score = 0;
    $result.textContent = score;

    const interval = setInterval(() => {
        const time = Number($time.textContent) - 0.1;
        $time.textContent = time.toFixed(1);

        if (time === 0) {
            clearInterval(interval);
            endGame();
        }
    }, 100);

    renderBox();
}

function renderBox() {
    $game.textContent = '';

    const boxSize = random(30, 100);
    const colorIdx = random(0, colors.length - 1);
    const gameSize = $game.getBoundingClientRect().width;
    const top = random(5, gameSize - boxSize - 5);
    const left = random(5, gameSize - boxSize - 5);

    const $box = document.createElement('div');
    $box.classList.add('box');
    $box.style.width = $box.style.height = boxSize + 'px';
    $box.style.backgroundColor = colors[colorIdx];
    $box.style.boxShadow='2px 4px 8px rgba(67, 67, 69, 0.227)'
    $box.style.borderRadius = '5px';
    $box.style.position = 'absolute';
    $box.style.top = top + 'px';
    $box.style.left = left + 'px';
    $box.style.cursor = 'pointer';
    $box.dataset.box = 'true';

    $game.append($box);
}

function endGame() {
    $game.textContent = '';
    $start.style.display = 'initial';
    $game.style.backgroundColor = 'rgb(246, 207, 226)';
    $time.textContent = Number($changeTime.value).toFixed(1);
    $changeTime.removeAttribute('disabled');
    $changeTime.style.backgroundColor = 'white';
}

function clickHandler(e) {
    if (e.target.dataset.box) {
        score++;
        $result.textContent = score;
        renderBox();
    }
}

function changeTime() {
    const time = Number($changeTime.value);
    $time.textContent = time.toFixed(1);
}

function random(min, max) {
    const diff = max - min + 1;
    return Math.floor(Math.random() * diff) + min;
}