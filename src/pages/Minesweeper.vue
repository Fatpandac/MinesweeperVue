<template>
  <main-layout>
    <choose-level
      :chooseLevel="level"
      :disable="gameStatus"
      @updateLevel="updateLevel"
    ></choose-level>
    <ground :chooseLevel="level" @updateGameStatus="updateGameStatus"></ground>
  </main-layout>
</template>

<script setup>
import MainLayout from '@/components/layouts/MainLayout.vue';
import Ground from '@/components/molecules/Ground.vue';
import { ref } from 'vue';
import ChooseLevel from '../components/atoms/ChooseLevel.vue';

const level = ref(0);
const gameStatus = ref(false);

const updateGameStatus = change => {
  gameStatus.value = change;
};
const updateLevel = chooseLevel => {
  level.value = chooseLevel;
};
</script>
