<template>
  <div
    class="w-90 md:w-150 lg:w-200 h-90 md:h-150 lg:h-200 grid gap-1 transition-all max-h-[98%] relative"
    :class="[`grid-cols-${groundCol}`]"
  >
    <template v-for="(list, index) of feildsList" :key="index">
      <feild
        v-bind="{ type, col, row, scaned, sign }"
        @scan="scan"
        @tag="tag"
        v-for="({ type, col, row, scaned, sign }, index) of list"
        :key="index"
      ></feild>
    </template>
    <game-over-cover
      :disable="disableGameOverCover"
      @initGame="initGame"
    ></game-over-cover>
  </div>
</template>

<script setup>
import Feild from '../atoms/Feild.vue';
import GameOverCover from '../atoms/GameOverCover.vue';

import { level } from '@/data/Minesweeper.js';
import { ref, watch } from '@vue/runtime-core';

const props = defineProps({
  chooseLevel: {
    type: Number,
    Request: true
  }
});

const disableGameOverCover = ref(false);

const random = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

function loopGround(feildsList, func) {
  for (var i = 0; i < feildsList.length; i++) {
    for (var j = 0; j < feildsList[i].length; j++) {
      func(i, j);
    }
  }
}

const initFeildsList = (col, row, mines) => {
  const feildsList = Array.from(
    Array(groundRow.value),
    () => new Array(groundCol.value)
  );
  const minesList = [];

  // init gameover cover
  disableGameOverCover.value = false;

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
          if (j + k < 0 || j + k >= groundCol.value) continue;
          if (i + h < 0 || i + h >= groundRow.value) continue;
          countAroundMines += feildsList[i + h][j + k].type === -1;
        }
      }

      feildsList[i][j].type = countAroundMines;
    }
  });

  return feildsList;
};

const groundCol = ref(level[props.chooseLevel].col);
const groundRow = ref(level[props.chooseLevel].row);
const groundMines = ref(level[props.chooseLevel].mines);
const feildsList = ref();

const initGame = () => {
  feildsList.value = initFeildsList(
    groundCol.value,
    groundRow.value,
    groundMines.value
  );
};

initGame();

watch(
  () => props.chooseLevel,
  value => {
    value--;
    groundCol.value = level[value].col;
    groundRow.value = level[value].row;
    groundMines.value = level[value].mines;

    feildsList.value = initFeildsList(
      groundCol.value,
      groundRow.value,
      groundMines.value
    );
  }
);

const emits = defineEmits(['updateGameStatus']);

const gameOver = () => {
  loopGround(feildsList.value, (i, j) => {
    feildsList.value[i][j].scaned = true;
    feildsList.value[i][j].sign = false;
  });
  disableGameOverCover.value = true;
  emits('updateGameStatus', false);
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
        if ((k === 0 && h === 0) || k === h) continue;
        if (col + k < 0 || col + k >= groundRow.value) continue;
        if (row + h < 0 || row + h >= groundCol.value) continue;

        if (
          feildsList.value[col + k][row + h].type === 0 &&
          !feildsList.value[col + k][row + h].scaned
        ) {
          whiteFeildStack.push([col + k, row + h]);
          feildsList.value[col][row].sign = false;
          feildsList.value[col + k][row + h].scaned = true;
        } else if (feildsList.value[col + k][row + h].type > 0) {
          feildsList.value[col][row].sign = false;
          feildsList.value[col + k][row + h].scaned = true;
        }
      }
    }
  }
};

const scan = (col, row) => {
  if (feildsList.value[col][row].type === -1) {
    gameOver();
    return;
  }
  if (feildsList.value[col][row].type === 0) scanWhiteFeild(col, row);
  feildsList.value[col][row].scaned = true;
  feildsList.value[col][row].sign = false;
  emits('updateGameStatus', true);
};

const tag = (col, row) => {
  if (feildsList.value[col][row].scaned) return;
  feildsList.value[col][row].sign = !feildsList.value[col][row].sign;
};

const show = () => {
  loopGround(feildsList.value, (i, j) => {
    feildsList.value[i][j].scaned = !feildsList.value[i][j].scaned;
  });
};
</script>
