const game = 
[[1, 1, 1],
[2, 1, 2],
[2, 2, 1]];

function checkWinner(gameBoard) {    
    const results = [];

    if( gameBoard.map( el => el.includes(0) ? true : false).includes(true) ) {
        return -1;
    } else {

        for (let i = 0; i < gameBoard.length; i++) {
            results.push(gameBoard[i].reduce((acc, cur) => acc += cur, 0))
            results.push(gameBoard[0][i] + gameBoard[1][i] + gameBoard[2][i]);
        }
        results.push(gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2]);
        results.push(gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0])
    }

    if (results.includes(3) && results.includes(6) || !results.includes(3) && !results.includes(6)) {
        return 0;
    } else {
        return results.includes(3) ? 1 : 2;
    }

}

console.log(checkWinner(game));