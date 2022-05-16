<template>
  <main-layout>
    <choose-level
      :chooseLevel="level"
      @updateLevel="updateLevel"
    ></choose-level>
    <ground :chooseLevel="level"></ground>
  </main-layout>
</template>

<script setup>
import MainLayout from '@/components/layouts/MainLayout.vue';
import Ground from '@/components/molecules/Ground.vue';
import { ref, watch } from 'vue';
import ChooseLevel from '../components/atoms/ChooseLevel.vue';

const level = ref(0);

const updateLevel = chooseLevel => {
  level.value = chooseLevel;
};
</script>
