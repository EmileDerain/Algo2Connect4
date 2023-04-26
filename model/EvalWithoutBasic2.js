const EvalBoard = require('./EvalBoard2')

class EvalWithoutBasic2 {

    res;
    currentBoard;

    constructor(currentBoard) {
        this.currentBoard = currentBoard;
        this.res = [0, 0, 0, 0, 0, 0, 0];
    }


    tryAll() {
        //console.log("Numéro IA: ", numberPlayer);
        for (let i = 0; i < 7; i++) {
            const aNewBoard = this.mockBoard(i);

            //Ne peut pas joué sur l colone i
            if (!aNewBoard[1]) {
                this.res[i] = [null, aNewBoard[1]];
                // console.log("Peut pas jouer sur: " + i)
                continue;
            }

            const evalBoard = new EvalBoard(aNewBoard[0]);
            evalBoard.evalCurrentBoard();
            //console.log("If EvalWithoutBasic2 IA play : ", i, " -> ptn[j1][j2] :" + evalBoard.j1Points + ", " + evalBoard.j2Points);
            this.res[i] = {"evalBoard": evalBoard, "canIPlay": aNewBoard[1]};

        }
        //console.log('res : ', res);
    }

    mockBoard(col) {
        const gameState2 = JSON.parse(JSON.stringify(this.currentBoard));
        for (let j = 0; j <= 5; j++) {
            if (gameState2[col][j] === 0) {
                gameState2[col][j] = -1;
                return [gameState2, true];
            }
        }
        return [gameState2, false];
    }
}

module.exports = EvalWithoutBasic2;