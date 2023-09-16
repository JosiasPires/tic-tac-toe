const game = (
    () => {
        console.log('hey')
        const reset = '--';
        const start = () => {
            for (let i = 0; i < 9; i++) {
                gameBoard.cells[i].textContent = gameBoard.board[i];
            }
        };
        const state = 0;
        const mark = '--';
        const displayWinner = (winner) => {
            document.querySelector('winner').textContent = winner;
        };
        return {reset, start, mark, displayWinner}
    }
)();

const gameBoard = (
    () => {
        const board = ['X', 'O', 'X', 'X', 'O', 'O', 'X', 'X', 'O'];
        const cells = Array.from(document.querySelectorAll('.cell'));
        for (let cell of cells) {
            // cell.addEventListener('click', game.mark);
        }
        return {board, cells}
    }
)();

const Player = function(name, marker) {
    const mark = function(cell) {
        if (cell.textContent == '') {
            cell.textContent = marker;
            gameBoard.board[Number(cell.getAttribute('data-position'))] = marker;
        }
    }
    return {name, marker, mark};
}

game.start();