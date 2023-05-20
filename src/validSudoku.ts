import { formatSudoku } from "./formatSudoku";

// Check if the sudoku is valid
function isValid(grid: number[][]): boolean[][] {
  const sudoku = formatSudoku(grid);
  const invalids: boolean[][] = Array(9).fill(false).map(() => Array(9).fill(false));

  // checking row
  for (let i = 0; i < 9; i ++) {
    const row = new Set();
    for (let j = 0; j < 9; j ++) {
      if (!sudoku[i][j])
        continue;
      if (row.has(sudoku[i][j]))
        invalids[i][j] = true;
      row.add(sudoku[i][j]);
    }    
  }
  for (let i = 8; i > -1; i --) {
    const row = new Set();
    for (let j = 8; j > -1; j --) {
      if (!sudoku[i][j])
        continue;
      if (row.has(sudoku[i][j]))
        invalids[i][j] = true;
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
        invalids[j][i] = true;
      col.add(sudoku[j][i]);
    }    
  }
  for (let i = 8; i > -1; i --) {
    const col = new Set();
    for (let j = 8; j > -1; j --) {
      if (!sudoku[j][i])
        continue;
      if (col.has(sudoku[j][i]))
        invalids[j][i] = true;
      col.add(sudoku[j][i]);
    }    
  }

  // checking box
  for (let i = 0; i < 9; i ++) {
    const box = new Set();
    for (let j = 0; j < 9; j ++) {
      const x = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      const y = (i % 3) * 3 + j % 3;
      if (!sudoku[x][y])
        continue;
      if (box.has(sudoku[x][y]))
        invalids[x][y] = true;
      box.add(sudoku[x][y]);
    }
  }
  for (let i = 8; i > -1; i --) {
    const box = new Set();
    for (let j = 8; j > -1; j --) {
      const x = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      const y = (i % 3) * 3 + j % 3;
      if (!sudoku[x][y])
        continue;
      if (box.has(sudoku[x][y]))
        invalids[x][y] = true;
      box.add(sudoku[x][y]);
    }
  }

  return formatSudoku(invalids);
};

export default isValid