import formatSudoku from "./formatSudoku";

// Check if the sudoku is valid
function isValid(grid: number[][]): boolean {
  const sudoku = formatSudoku(grid);

  // checking row
  for (let i = 0; i < 9; i ++) {
    const row = new Set();
    for (let j = 0; j < 9; j ++) {
      if (!sudoku[i][j])
        continue;
      if (row.has(sudoku[i][j]))
        return false;
      row.add(sudoku[i][j]);
    }    
  }

  // checking col
  for (let i = 0; i < 9; i ++) {
    const col = new Set();
    for (let j = 0; j < 9; j ++) {
      if (!sudoku[j][i])
        continue;
      if (col.has(sudoku[j][i]))
        return false;
      col.add(sudoku[j][i]);
    }    
  }

  // checking box
  for (let i = 0; i < 9; i += 3) {
    const box = new Set();
    for (let j = 0; j < 9; j += 3) {
      // correct x and y
      const x = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      const y = (i % 3) * 3 + j % 3;
      if (!sudoku[x][y])
        continue;
      if (box.has(sudoku[x][y]))
        return false;
      box.add(sudoku[x][y]);
    }
  }

  return true;
};

export default isValid