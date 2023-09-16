const gameBoard = (
    () => {
        const board = [];
        for (let i = 0; i < 9; i++) {
            board.push(null);
        }
        return {board}
    }
)();

