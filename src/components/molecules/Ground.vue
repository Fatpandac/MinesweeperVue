<template>
  <!-- <div @click="show">Show All</div> -->
  <div class="grid gap-1" :class="[`grid-cols-${groundCol}`]">
    <template v-for="(list, index) of feildsList" :key="index">
      <feild
        v-bind="{ type, col, row, scaned, sign }"
        @scan="scan"
        @tag="tag"
        v-for="({ type, col, row, scaned, sign }, index) of list"
        :key="index"
      ></feild>
    </template>
  </div>
</template>

<script setup>
import Feild from '../atoms/Feild.vue';

import { level } from '@/data/Minesweeper.js';
import { onMounted, ref } from '@vue/runtime-core';

const chooseLevel = 1;

const groundCol = level[chooseLevel].col;
const groundRow = level[chooseLevel].row;
const groundMines = level[chooseLevel].mines;
const groundFeildSum = groundCol * groundRow;

const random = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

function loopGround(feildsList, func) {
  for (var i = 0; i < feildsList.length; i++) {
    for (var j = 0; j < feildsList[i].length; j++) {
      func(i, j);
    }
  }
}

const initFeildsList = (col, row, mines) => {
  const feildsList = Array.from(Array(groundRow), () => new Array(groundCol));
  const minesList = [];

  // init minesList
  while (minesList.length !== mines) {
    const colPos = random(col);
    const rowPos = random(row);

    if (minesList.find(value => value?.col === colPos && value?.row === rowPos))
      continue;

    minesList.push({
      col: colPos,
      row: rowPos
    });
  }

  loopGround(feildsList, (i, j) => {
    feildsList[i][j] = {
      col: i,
      row: j,
      type: 0,
      scaned: false,
      sign: false
    };
  });

  // set mines
  minesList.map(item => {
    feildsList[item.row][item.col].type = -1;
  });

  // count mines
  loopGround(feildsList, (i, j) => {
    if (feildsList[i][j].type !== -1) {
      var countAroundMines = 0;
      for (var k = -1; k < 2; k++) {
        for (var h = -1; h < 2; h++) {
          if (k === 0 && h === 0) continue;
          if (i + k < 0 || i + k >= groundCol) continue;
          if (j + h < 0 || j + h >= groundRow) continue;
          countAroundMines += feildsList[i + k][j + h].type === -1;
        }
      }

      feildsList[i][j].type = countAroundMines;
    }
  });

  return feildsList;
};

const feildsList = ref(initFeildsList(groundCol, groundRow, groundMines));

const gameOver = () => {
  loopGround(feildsList.value, (i, j) => {
    feildsList.value[i][j].scaned = true;
    feildsList.value[i][j].sign = false;
  });
};

const scanWhiteFeild = (col, row) => {
  var whiteFeildStack = [];
  whiteFeildStack.push([col, row]);
  while (whiteFeildStack.length !== 0) {
    const whiteFeildPos = whiteFeildStack.pop();
    const col = whiteFeildPos[0];
    const row = whiteFeildPos[1];
    for (var k = -1; k < 2; k++) {
      for (var h = -1; h < 2; h++) {
        if (k === 0 && h === 0) continue;
        if (col + k < 0 || col + k >= groundCol) continue;
        if (row + h < 0 || row + h >= groundRow) continue;

        if (
          feildsList.value[col + k][row + h].type === 0 &&
          !feildsList.value[col + k][row + h].scaned
        ) {
          whiteFeildStack.push([col + k, row + h]);
          feildsList.value[col + k][row + h].scaned = true;
        } else if (feildsList.value[col + k][row + h].type > 0) {
          feildsList.value[col + k][row + h].scaned = true;
        }
      }
    }
  }
};

const scan = (col, row) => {
  if (feildsList.value[col][row].type === -1) gameOver();
  if (feildsList.value[col][row].type === 0) scanWhiteFeild(col, row);
  feildsList.value[col][row].scaned = true;
};

const tag = (col, row) => {
  feildsList.value[col][row].sign = !feildsList.value[col][row].sign;
};

const show = () => {
  loopGround(feildsList.value, (i, j) => {
    feildsList.value[i][j].scaned = !feildsList.value[i][j].scaned;
  });
};
</script>
