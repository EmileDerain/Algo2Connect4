const EvalWithoutBasic = require('./EvalWithoutBasic2.js')

class ai1V2 {

    constructor() {
    }

    play(board) {
        const evaluation = new EvalWithoutBasic(board)
        evaluation.tryAll();

        for (let i = 0; i < 7; i++) {
            //Si il peut gagné
            if (evaluation.res[i].evalBoard.isThereAWinner) {
                for (let j = 0; j <= 6; j++) {
                    if (board[i][j] === 0) {
                        // console.log("aiV2plays: ", [i, j]);
                        return [i, j];
                    }
                }
            }
        }

        const bestOne = this.choiceBest(1, evaluation.res);

        for (let j = 0; j <= 6; j++) {
            if (board[bestOne][j] === 0) {
                // console.log("aiV2plays: ", [bestOne, j]);
                return [bestOne, j];
            }
        }
    }

    choiceBest(numberPlayer, tab) {

        const min = [0, 0, 0, 0, 0, 0, 0];

        //console.log('tab: ', tab);

        let iMaxMe = 3;
        let iMinEnemy = 0;
        if (numberPlayer === 1) {

            for (let i = 1; i < 7; i++) {
                if (tab[iMinEnemy].evalBoard.j1Points > tab[i].evalBoard.j1Points && tab[i].canIPlay) {
                    iMinEnemy = i;
                }
            }

            //console.log('1Min -> ', tab[iMinEnemy], '--indexMin : ', iMinEnemy);

            for (let i = 0; i < 7; i++) {
                if (tab[iMinEnemy].evalBoard.j1Points === tab[i].evalBoard.j1Points && tab[i].canIPlay) {
                    min[i] = 1;
                }
            }

            if (min[3] === 1) {
                iMaxMe = 3;
            } else if (min[4] === 1) {
                iMaxMe = 4;
            } else if (min[2] === 1) {
                iMaxMe = 2;
            } else if (min[5] === 1) {
                iMaxMe = 5;
            } else if (min[1] === 1) {
                iMaxMe = 1;
            } else if (min[6] === 1) {
                iMaxMe = 6;
            } else {
                iMaxMe = 0;
            }

            //console.log('1minTab -> ', min, '--indexMax : ', iMaxMe);


            for (let i = 0; i < 7; i++) {
                if (min[i] === 1) {
                    if (tab[iMaxMe].evalBoard.j2Points< tab[i].evalBoard.j2Points && tab[i].canIPlay) {
                        iMaxMe = i;
                    }
                }
            }

            //console.log('1Better: ', iMaxMe);

            return iMaxMe;

        } else {
            for (let i = 1; i < 7; i++) {
                if (tab[iMinEnemy].evalBoard.j2Points > tab[i].evalBoard.j2Points && tab[i].canIPlay) {
                    iMinEnemy = i;
                }
            }

            //console.log('2Min -> ', tab[iMinEnemy], '--index : ', iMinEnemy);


            for (let i = 0; i < 7; i++) {
                if (tab[iMinEnemy].evalBoard.j2Points === tab[i].evalBoard.j2Points && tab[i].canIPlay) {
                    min[i] = 1;
                    iMaxMe = i;
                }
            }

            if (min[3] === 1) {
                iMaxMe = 3;
            } else if (min[4] === 1) {
                iMaxMe = 4;
            } else if (min[2] === 1) {
                iMaxMe = 2;
            } else if (min[5] === 1) {
                iMaxMe = 5;
            } else if (min[1] === 1) {
                iMaxMe = 1;
            } else if (min[6] === 1) {
                iMaxMe = 6;
            } else {
                iMaxMe = 0;
            }

            //console.log('2minTab -> ', min, '--indexMax : ', iMaxMe);


            for (let i = 0; i < 7; i++) {
                if (min[i] === 1) {
                    if (tab[iMaxMe].evalBoard.j1Points < tab[i].evalBoard.j1Points && tab[i].canIPlay) {
                        iMaxMe = i;
                    }
                }
            }
            //console.log('2Better: ', iMaxMe);
            return iMaxMe;

        }
    }


}

module.exports = ai1V2;