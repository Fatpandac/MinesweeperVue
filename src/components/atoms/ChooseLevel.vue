<template>
  <ul class="m-4 flex flex-row p-0 lg:flex-col list-none">
    <li class="m-2">
      <input type="radio" id="1" :value="1" v-model="level" />
      <label for="1">1 Level</label>
    </li>
    <li class="m-2">
      <input type="radio" id="2" :value="2" v-model="level" />
      <label for="2">2 Level</label>
    </li>
    <li class="m-2">
      <input type="radio" id="3" :value="3" v-model="level" />
      <label for="3">3 Level</label>
    </li>
  </ul>
</template>

<script setup>
import { ref, watch } from 'vue';

defineProps({
  chooseLevel: {
    type: Number,
    Request: true
  }
});

const emits = defineEmits(['updateLevel']);

const level = ref('1');
watch(level, value => {
  emits('updateLevel', value);
});
</script>
