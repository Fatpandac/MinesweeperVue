<template>
  <div
    @click="handle('scan')"
    @contextmenu.prevent="handle('tag')"
    class="w-full h-full flex justify-center items-center select-none bg-cyan-300"
    :class="scaned && 'bg-red-300'"
  >
    <span
      v-if="scaned || sign"
      class="absolute text-sm"
      :class="type == 0 && 'text-white'"
      >{{ processTypeToString() }}</span
    >
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: Number,
    Request: true
  },
  col: {
    type: Number,
    Request: true
  },
  row: {
    type: Number,
    Request: true
  },
  scaned: {
    type: Boolean,
    Request: true
  },
  sign: {
    type: Boolean,
    Request: true
  }
});

const emit = defineEmits(['scan', 'tag']);

const handle = name => {
  emit(name, props.col, props.row);
};

function processTypeToString() {
  if (props.sign) return '🚩';

  if (props.type === -1) {
    return '💣';
  }
  if (props.type === 0) {
    return '';
  } else {
    return props.type;
  }
}
</script>
