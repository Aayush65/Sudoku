import { formatSudoku } from "./formatSudoku";

// Solve the sudoku
function solveSudoku(sudoku: number[][]): number[][] {
  sudoku = formatSudoku(sudoku);

  function totalEle(i: number, j: number, allEle: boolean[]) {
    for (let b: number = 0; b < 9; b++) {
      if (sudoku[i][b])
        allEle[sudoku[i][b] - 1] = false;
      if (sudoku[b][j])
        allEle[sudoku[b][j] - 1] = false;
      let boxI: number = Math.floor(i / 3) * 3 + Math.floor(b / 3);
      let boxJ: number = Math.floor(j / 3) * 3 + b % 3;
      if (sudoku[boxI][boxJ])
        allEle[sudoku[boxI][boxJ] - 1] = false;
    }
  }

  function solver(i: number, j: number): boolean {
    if (!sudoku[i][j]) {
      let cannotBe: boolean[] = Array(9).fill(true);
      totalEle(i, j, cannotBe);
      for (let k = 1; k <= 9; k++) {
        if (cannotBe[k - 1]) {
          sudoku[i][j] = k;
          if (j < 8) {
            if (solver(i, j + 1))
              return true;
          } else if (i < 8) {
            if (solver(i + 1, 0))
              return true;
          } else
            return true;
          sudoku[i][j] = 0;
        }
      }
    } else {
      if (j < 8) {
        if (solver(i, j + 1))
          return true;
      } else if (i < 8) {
        if (solver(i + 1, 0))
          return true;
      } else
        return true;
    }
    return false;
  }

  solver(0, 0);

  sudoku = formatSudoku(sudoku);
  return sudoku
};

export default solveSudoku;