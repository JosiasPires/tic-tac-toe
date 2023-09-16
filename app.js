const gameBoard = (
    () => {
        const board = Array.from(document.querySelectorAll('.cell'));
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

