const MiniBoard = ({ board, onCellClick, boardIndex, active }) => {
  return (
    <div className={`mini-board ${active ? 'active' : 'inactive'}`}>
      {board.map((cell, cellIndex) => (
        <button
          key={cellIndex}
          className="cell"
          onClick={() => onCellClick(boardIndex, cellIndex)}
          disabled={!active || cell !== null}
        >
          {cell}
        </button>
      ))}
    </div>
  );
};

export default MiniBoard;