function updatedPosition(current, desired, player, currentPos){
  if (currentPos[current.row][current.col] === player || currentPos[current.row][current.col] === (player + 'k')){
    if ((currentPos[current.row][current.col] === 'wk' || currentPos[current.row][current.col] === 'bk') || (current.row - desired.row > 0) ? player === 'w' : player === 'b'){
      let empty = currentPos[desired.row][desired.col] === 'e';
      let jumpNotPossible = !(jumpPossible(player, currentPos));
      let byOne = (Math.abs(current.row - desired.row) === 1) && (Math.abs(current.col - desired.col) === 1);
      let byTwo = (byOne) ? false : (Math.abs(current.row - desired.row) === 2) && (Math.abs(current.col - desired.col) === 2);
      if (empty && byOne && jumpNotPossible){
        return executeMove(current, desired, currentPos);
      } else if (byTwo && empty){
        let enemyPiece = (player === 'w') ? 'b' : 'w';
        let jumpRow = (current.row + desired.row) / 2;
        let jumpCol = (current.col + desired.col) / 2;
        let capture = (currentPos[jumpRow][jumpCol] === enemyPiece) || (currentPos[jumpRow][jumpCol] === enemyPiece + 'k');
        if (capture){
          return executeJump(current, desired, currentPos);
        }
      }
    }
  }
  return currentPos;
}

function jumpPossible(player, currentPos){
  for (let row = 0; row < 8; row++){
    for (let col = 0; col < 8; col++){
      try {
        let p1 = (currentPos[row + (player === 'w' ? -1 : 1)][col + 1] === (player === 'b' ? 'w' : 'b'));
        let p2 = (currentPos[row + (player === 'w' ? -1 : 1)][col - 1] === (player === 'b' ? 'w' : 'b'));
        let e1 = (currentPos[row + (player === 'w' ? -2 : 2)][col + 2] === 'e');
        let e2 = (currentPos[row + (player === 'w' ? -2 : 2)][col - 2] === 'e');
        if (((p1 && e1) || (p2 && e2)) && (currentPos[row][col] === player || currentPos[row][col] === player + 'k')){
          return true;
        } 
      } catch {}
    }
  }
  return false;
}

function executeMove(current, desired, currentPos){
  let newPos = currentPos.slice();
  newPos[desired.row][desired.col] = ((desired.row === 7) || (desired.row === 0)) ? (currentPos[current.row][current.col] + 'k') : currentPos[current.row][current.col];
  newPos[current.row][current.col] = 'e';
  return newPos;
}

function executeJump(current, desired, currentPos){
  let newPos = currentPos.slice();
  newPos[desired.row][desired.col] = ((desired.row === 7) || (desired.row === 0)) ? (currentPos[current.row][current.col] + 'k') : currentPos[current.row][current.col];
  newPos[current.row][current.col] = 'e';
  newPos[(current.row + desired.row) / 2][(current.col + desired.col) / 2] = 'e';
  return newPos;
}

function jumpHappend(pos1, pos2, player){
  let pieceCount1 = 0;
  let pieceCount2 = 0;
  for (let i = 0; i < 8; i++){
    for (let j = 0; j < 8; j++){
    pieceCount1 = (pos1[i][j] !== 'e') ? (pieceCount1 + 1) : (pieceCount1);
    }
  }
  console.log(pieceCount1);
  for (let i = 0; i < 8; i++){
    for (let j = 0; j < 8; j++){
    pieceCount2 = (pos2[i][j] !== 'e') ? (pieceCount2 + 1) : (pieceCount2);
    }
  }
  console.log(pieceCount1);
  return ((pieceCount1 !== pieceCount2) && jumpPossible(player, pos2));
}

export {updatedPosition, jumpHappend};