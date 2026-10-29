import {
createInitialState,
makeMove,
checkWinner,
isBoardFull,
} from './gameLogic.js';

let state = createInitialState();

// Test 1: Initial state
console.log('Initial player:', state.currentPlayer);
console.log('Number of boards:', state.boards.length);
console.assert(state.currentPlayer === 'X', 'Initial player should be X');
console.assert(state.boards.length === 9, 'Should have 9 mini-boards');

// Test 2: Winner detection
console.log('Winner test:', checkWinner(['X', 'X', 'X', null, null, null, null, null, null]));
console.assert(
checkWinner(['X', 'X', 'X', null, null, null, null, null, null]) === 'X',
'Winner detection failed'
);

// Test 3: Full board detection
console.assert(
isBoardFull(['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O']),
'Full board detection failed'
);

// Test 4: Make a move
state = makeMove(state, 0, 4);

console.log('Player after move:', state.currentPlayer);
console.log('Mark placed:', state.boards[0][4]);

console.assert(state.boards[0][4] === 'X', 'Move failed');
console.assert(state.currentPlayer === 'O', 'Player did not switch');

console.log('Tests completed!');

// Test 5: Reject a move in the wrong mini-board
const oldState = state;
const rejectedMove = makeMove(state, 0, 3);

console.assert(
  rejectedMove === oldState,
  'Illegal move should be rejected'
);

console.log('Illegal move test completed!');