const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#lives"),
        retry: document.querySelector("#button"),
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0, 
        currentTime: 60,
        life: 3,
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000), 
    }
};

function toggleButton() {
    document.getElementById("button").className = 'show'; 
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0 || state.values.life <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("GAME OVER! Your hi-score was: " + state.values.result);
        toggleButton();
    }
}

function playSound(sound) {
    let audio = new Audio(`./assets/sounds/${sound}`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquare() { 
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() * 9); 
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function retry(){
        state.view.retry.addEventListener ('click', () => {
        location.reload();
    });
}

function addListenerHitBox() {
    state.view.squares.forEach((square) =>{
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) { 
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit.m4a");
            } else if (square.id !== state.values.hitPosition && state.values.hitPosition !== null) {
                if(state.values.life > 0){
                    state.values.life--;
                    state.view.life.textContent = 'x' + state.values.life;
                }
            }
        });
    });
}

function initialize() {
    addListenerHitBox();
    retry();
}

initialize();

