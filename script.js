// SELECTORS
const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $game = document.querySelector('#game');
const $start = document.querySelector('#start');
const $timer = document.querySelector('#timer');

const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'orange', 'purple', 'brown'];
let score = 0;


// EVENT LISTENERS
$start.addEventListener('click', startGameFunc);
$timer.addEventListener('change', changeTimeFunc);
$game.addEventListener('click', clickGameFunc);



// FUNCIONS

function startGameFunc(){
    $game.style.backgroundColor = 'white';
    $start.style.display = 'none';
    $timer.setAttribute('disabled', 'true');

    score=0;
    $result.textContent = score;
   

    const interval = setInterval(()=>{
        const t = +$time.textContent - 0.1;
        $time.textContent = t.toFixed(1);

        if(t === 0){
            clearInterval(interval);
            endGameFunc();
        }

    }, 100);
 
    renderBox();
}


function endGameFunc(){
    $game.style.backgroundColor = 'gray';
    $start.style.display = 'initial'; 
    $time.textContent = (+$timer.value).toFixed(1);
    $timer.removeAttribute('disabled');
    $game.textContent = '';
}


function changeTimeFunc(){
    $time.textContent = (+$timer.value).toFixed(1);
}

function renderBox(){

    $game.textContent = ''

    const gameSize = $game.getBoundingClientRect(); // {x: , y: , width: , heigth: }    
    const boxSize = random(30, 70);
    const colorIndex = random(0, colors.length-1);
    const top = random(0, gameSize.width - boxSize - 5);
    const left = random(0, gameSize.width - boxSize - 5);
    
    const $box = document.createElement('div');
    $box.style.width = $box.style.height = boxSize+'px';
    $box.style.backgroundColor = colors[ colorIndex ];
    $box.style.position = 'absolute';
    $box.style.top = top + 'px';
    $box.style.left = left + 'px';
    $box.style.cursor = 'pointer';
    $box.dataset.box = 'true';

    $game.append($box);
}


function clickGameFunc(e){
    if(e.target.dataset.box){
        score++;
        $result.textContent = score;
        renderBox();
    }
}


function random(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

