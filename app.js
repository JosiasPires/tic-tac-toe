const game = (
    () => {
        const reset = function() {
            for (let i = 0; i < gameBoard.board.length; i++) {
                gameBoard.board[i] = '';
            }
            displayBoard();
            state = 0;
        };
        let players, p1, p2;
        const start = (player1, player2) => {
            if (player1 === undefined && player2 === undefined) {
                p1 = Player('Player 1', 'X');
                p2 = Player('Player 2', 'O');
            }
            else if (player1 === undefined) {
                p1 = Player('Player 1', 'X');
                p2 = Player(player2, 'O');
            }
            else if (player2 === undefined) {
                p1 = Player(player1, 'X');
                p2 = Player('Player 2', 'O');
            }
            else {
                p1 = Player(player1, 'X');
                p2 = Player(player2, 'O');
            }
            players = [p1, p2];
        };
        const displayBoard = () => {
            for (let i = 0; i < 9; i++) {
                gameBoard.cells[i].textContent = gameBoard.board[i];
            }
        };
        let state = 0;
        let winner;
        let tie;
        const mark = function() {
            if (this.textContent === '') {
                if (state == 0) {
                    p1.mark(this);
                    state = 1;
                }
                else {
                    p2.mark(this);
                    state = 0;
                }
            }
            checkWinner();
        };
        const checkWinner = () => {
            winner = false;
            let board = gameBoard.board;
            for (let player of players) {
                let marker = player.marker;
                // Horizontal check
                for (let i = 0; i < 9; i++) {
                    if (board[i] == marker && board[i+1] == marker && board[i+2] == marker) {
                        winner = player;
                    }
                }
                // Vertical check
                for (let i = 0; i < 3; i++) {
                    if (board[i] == marker && board[i+3] == marker && board[i+6] == marker) {
                        winner = player;
                    }
                }
                // Backslash check
                if (board[0] == marker && board[4] == marker && board[8] == marker) {
                    winner = player;
                }
                // Slash check
                else if (board[2] == marker && board[4] == marker && board[6] == marker) {
                    winner = player;
                }
            }
            if (winner) displayResult(winner.name);
            else {
                // Check tie
                tie = true;
                for (let cell of board) {
                    if (cell == '') tie = false;
                }
                if (tie) displayResult();
            }
        }
        const displayResult = (result) => {
            if (result === undefined) {
                dialog.congratMessage.textContent = "It's a tie!";
                dialog.congratBox.showModal();
            }
            else {
                dialog.congratMessage.textContent = `Congrats! The winner is ${result}`
                dialog.congratBox.showModal();
            }
        };
        return {reset, start, displayBoard, mark, checkWinner, players};
    }
)();

const restart = (
    () => {
        const restartBtn = document.querySelector('.restart');
        restartBtn.addEventListener('click', () => {
            game.reset();
            dialog.startBox.showModal();
        })
    }
)();

const dialog = (
    () => {
        const congratBox = document.querySelector('.congratBox');
        const startBox = document.querySelector('.startBox');
        const againBtn = document.querySelector('.againBtn')
        const cancelStart = document.querySelector('#cancel');
        const winnerSpan = document.querySelector('.winner');
        const congratMessage = document.querySelector('.congratMessage');
        const player1 = document.querySelector('#player1');
        const player2 = document.querySelector('#player2');
        const startBtn = document.querySelector('#start');
        startBtn.addEventListener('click', e => {
            e.preventDefault();
            game.reset();
            game.start(player1.value, player2.value);
            console.log(player1.value, player2.value);
            startBox.close();
        });
        cancelStart.addEventListener('click', e => {
            e.preventDefault();
            if (!(game.players)) game.start();
            else {
                game.start(player1.value, player2.value);
                console.log(player1.value, player2.value);
            }
            startBox.close();
        });
        againBtn.addEventListener('click', () => {
            startBox.showModal();
        });
        return {congratBox, startBox, winnerSpan, congratMessage};
    }
)();

const gameBoard = (
    () => {
        const board = ['', '', '', '', '', '', '', '', ''];
        const grid = document.querySelector('.grid');
        const cells = Array.from(document.querySelectorAll('.cell'));
        for (let cell of cells) {
            cell.addEventListener('click', () => {
                if (game.winner || game.tie) {
                    grid.setAttribute('class', 'grid disabled');
                }
            })
            cell.addEventListener('click', game.mark);
        }
        return {board, cells}
    }
)();

const Player = function(name, marker) {
    const mark = function(cell) {
        cell.textContent = marker;
        gameBoard.board[Number(cell.getAttribute('data-position'))] = marker;
    }
    return {name, marker, mark};
}

game.displayBoard();