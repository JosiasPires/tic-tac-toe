const gameBoard = (
    () => {
        const board = [];
        for (let i = 0; i < 9; i++) {
            board.push(null);
        }
        return {board}
    }
)();

const Player = function(name, marker) {
    const mark = function(cell) {
        if (cell.textContent == '') {
            cell.textContent = marker;
            cell.setAttribute(cl)
            gameBoard.board[Number(cell.getAttribute('data-position'))] = marker;
        }
    }
    return {name, marker, mark};
}

