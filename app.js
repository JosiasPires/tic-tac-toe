const gameBoard = (
    () => {
        const board = Array.from(document.querySelectorAll('.cell'));
        for (let cell of board) {
            cell.addEventListener('click', game.mark);
        }
        return {board}
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

const game = (
    () => {
        const reset = '--';
        const start = '--';
        const state = 0;
        const mark = '--';
        const displayWinner = (winner) => {
            document.querySelector('winner').textContent = winner;
        };
        return {reset, start, mark, displayWinner}
    }
)();