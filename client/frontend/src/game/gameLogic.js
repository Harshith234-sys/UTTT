const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
export function checkWinner(board){
    for(const combiantions of winningCombinations){
        const[a,b,c] = combiantions;
        if((board[a] === 'X' || board[a] === 'O' )&& board[a] === board[b] && board[b] === board[c]  ){
            return board[a];
        }
        return null;
    }
}
export function isBoardFull(board){
    for(const cell of board){
        if(cell === null){
            return false;
        }
    }
    return true;
}
export function makeMove(state,boardIndex,cellIndex){
    if(state.winner !== null || state.isDraw){
        return state;
    }
    if(boardIndex < 0 || boardIndex>8 ||cellIndex < 0 || cellIndex > 8){
        return state;
    }
    if(state.activeBoard !== null && state.activeBoard !== boardIndex){
        return state;
    }
    if(state.miniBoardWinners[boardIndex]!== null){
        return state;
    }
    if(state.boards[boardIndex][cellIndex] !==null){
        return state;
    }
    const newBoards = state.boards.map(board => [...board]);
    newBoards[boardIndex][cellIndex] = state.currentPlayer;
    const board = newBoards[boardIndex];
    const miniWinner = checkWinner(board);
    const boardFull = isBoardFull(board);
    const newMiniBoardWinners = [...state.miniBoardWinners];
    if(miniWinner !== null){
        newMiniBoardWinners[boardIndex] = miniWinner;
    }else if(boardFull){
        newMiniBoardWinners[boardIndex] = 'D';
    }
    const nextBoard = cellIndex;
    const activeBoard = newMiniBoardWinners[nextBoard] !== null || isBoardFull(newBoards[nextBoard]) ? null : nextBoard;
    const gameWinner = checkWinner(newMiniBoardWinners);
    const gameDraw = gameWinner === null && newMiniBoardWinners.every(result => result!==null);
    return{
        ...state,
        boards: newBoards,
        miniBoardWinners: newMiniBoardWinners,
        activeBoard,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
        winner: gameWinner,
        isDraw: gameDraw
    };
}
export function createInitialState(){
    return{
        boards:Array(9).fill(null).map(() => Array(9).fill(null)),
        miniBoardWinners: Array(9).fill(null),
        currentPlayer: 'X',
        activeBoard: null,
        winner: null,
        isDraw: false
    };
}