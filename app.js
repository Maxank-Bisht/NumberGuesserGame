// GAME FUNCTIONS:
// - Player must guess a number between a min and max
// - Player gets a certain amount of guess 
// - Notify player of guesses remaining
// - Notify the player of the correct answer if loose
// - Let player choose to play again
 
//Game Values
let min = 1,
    max = 10,
    guessesLeft = 4,
    winningNum = getRandomNum(min,max);

//UI elements
const UIgame = document.querySelector('#game'),
    UIminNum = document.querySelector('.min-num'),
    UImaxNum = document.querySelector('.max-num'),
    UIguessInput = document.querySelector('#guess-input'),
    UIguessBtn = document.querySelector('#guess-btn'),
    UImessage = document.querySelector('.message');
    UIhintBtn = document.querySelector('#hint-btn');

//Assign UI min and max values
UIminNum.textContent = min;
UImaxNum.textContent = max;

//Play Again listener
game.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('play-again')) {
        window.location.reload();  
    }
});

//Hint
game.addEventListener('mouseover', function (e) {
    if (e.target.id === 'hint-btn') {
        UIhintBtn.textContent = 'Hint';
    }
})
game.addEventListener('mouseout', function (e) {
    if (e.target.id === 'hint-btn') {
        UIhintBtn.innerHTML ='<i class="fas fa-question"></i>';
    }
})

//Hint output
UIhintBtn.addEventListener('click', function () {
    if (winningNum % 2 === 0) {
        setMessage(`The correct number is even.`, 'blue');
    } else {
        setMessage('The correct number is odd.', 'blue');
    }
})

//Listen for guess
UIguessBtn.addEventListener('click', function (e) {
    if (e.target.value === 'Submit') {
        let guess = parseInt(UIguessInput.value);
    
        //validate input
        if (isNaN(guess) || guess < min || guess > max) {
            setMessage(`Please Enter a number between ${min} and ${max}.`, 'red');
        }
        else if (guess === winningNum) {
            //Game Over - won
            gameOver(true, `${winningNum} is correct. YOU WIN!!`);
        } else {
            //guessesLeft
            guessesLeft -= 1;

            if (guessesLeft === 0) {
                //Game over - lost
                gameOver(false, `GAME OVER!! You lost. ${winningNum} is the correct number!`);
            } else {
                //Game continues - wrong answer
                //clear the input
                UIguessInput.value = '';
                //change border color
                UIguessInput.style.borderColor = 'red';
                //set message
                setMessage(`${guess} is incorrect. ${guessesLeft} guesses left!`, 'red')
            }
        
        }
    }
});
function gameOver(won, msg) { 
    let color;
    won === true ? color = 'green' : color = 'red';
    
    //disable input
    UIguessInput.disabled = true;
    //change border color
    UIguessInput.style.borderColor = color; 
    setMessage(msg,color);

    //play again bttn
    UIguessBtn.value = 'PLAY AGAIN';
    //add class to bttn
    UIguessBtn.className = 'play-again btn btn-outline-dark';
    //hide hint btn
    UIhintBtn.style.display = 'none';
}
function getRandomNum(min, max) {
    
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function setMessage(msg,color) { 
    UImessage.textContent = msg;
    UImessage.style.color = color;
    if (color === 'green') {
        UImessage.className = `alert alert-success message mt-3`;
    } else if (color === 'blue') {
        UImessage.className = `alert alert-info message mt-3`;
    } else {
        UImessage.className = `alert alert-danger message mt-3`;
    }
}
