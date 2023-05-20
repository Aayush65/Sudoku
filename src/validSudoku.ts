import { formatSudoku, formatIndex } from "./formatSudoku";

// Check if the sudoku is valid
function isValid(grid: number[][]): number[][] {
  const sudoku = formatSudoku(grid);
  const invalidSet = new Set<string>();

  // checking row
  for (let i = 0; i < 9; i ++) {
    const row = new Set();
    for (let j = 0; j < 9; j ++) {
      if (!sudoku[i][j])
        continue;
      if (row.has(sudoku[i][j]))
        invalidSet.add(formatIndex(i, j)[0] + '' + formatIndex(i, j)[1]);
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
        invalidSet.add(formatIndex(j, i)[0] + '' + formatIndex(j, i)[1]);
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
        invalidSet.add(formatIndex(x, y)[0] + '' + formatIndex(x, y)[1]);
      box.add(sudoku[x][y]);
    }
  }

  const invalids: number[][] = [];
  for (let coord of invalidSet)
    invalids.push([parseInt(coord[0]), parseInt(coord[1])])
  return invalids;
};

export default isValid