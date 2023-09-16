const game = (
    () => {
        console.log('hey')
        const reset = '--';
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
        };
        
        const displayWinner = (winner) => {
            document.querySelector('winner').textContent = winner;
        };
        return {reset, displayBoard, mark, displayWinner};
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