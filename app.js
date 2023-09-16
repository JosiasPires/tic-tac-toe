const game = (
    () => {
        const congratBox = document.querySelector('.congratBox');
        const winnerSpan = document.querySelector('.winner');
        const congratMessage = document.querySelector('.congratMessage');
        const reset = () => {
            for (let i = 0; i < gameBoard.board.length; i++) {
                gameBoard.board[i] = '';
            }
            displayBoard();
        };
        const displayBoard = () => {
            for (let i = 0; i < 9; i++) {
                gameBoard.cells[i].textContent = gameBoard.board[i];
            }
        };
        let state = 0;
        const mark = function() {
            if (this.textContent === '') {
                if (state == 0) {
                    player1.mark(this);
                    state = 1;
                }
                else {
                    player2.mark(this);
                    state = 0;
                }
            }
            checkWinner();
        };
        const checkWinner = () => {
            let winner = false;
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
            if (winner) {
                winnerSpan.textContent = winner.name;
                congratBox.showModal();
            }
            else {
                // Check tie
                let tie = true;
                for (let cell of board) {
                    if (cell == '') tie = false;
                }
                if (tie) {
                    congratMessage.textContent = "It's a tie!";
                    congratBox.showModal();
                }
            }
        }
        const displayWinner = (winner) => {
            document.querySelector('winner').textContent = winner;
        };
        return {reset, displayBoard, mark, displayWinner, checkWinner};
    }
)();

const gameBoard = (
    () => {
        const board = ['', '', '', '', '', '', '', '', ''];
        const cells = Array.from(document.querySelectorAll('.cell'));
        for (let cell of cells) {
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

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');
const players = [player1, player2];

game.displayBoard();