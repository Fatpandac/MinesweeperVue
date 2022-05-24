<template>
  <div
    class="absolute flex-col justify-center items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] transition-all duration-300 select-none"
    :class="[disable ? 'flex' : 'hidden']"
  >
    <span class="text-5xl text-red-600">Game Over</span>
    <button
      @click="emits('initGame')"
      class="transition duration-300 ease-in-out mr-1 mb-1 py-2 px-4 border-current bg-yellow-200 rounded text-black hover:bg-yellow-400"
    >
      Restart
    </button>
  </div>
</template>

<script setup>
defineProps({
  disable: {
    type: Boolean,
    Request: true
  }
});

const emits = defineEmits(['initGame']);
</script>
