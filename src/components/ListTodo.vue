<template>
  <div
    v-for="(todo, index) in todos"
    :key="index"
    class="flex mt-4 flex-col items-center relative"
  >
    <div class="flex">
      <div
        :class="{
          'line-through text-[#ccc]': todo.category === 'Completed',
        }"
        class="w-[500px] h-[50px] px-4 py-3 bg-white rounded-md"
      >
        {{ todo.content }}
      </div>
      <div class="absolute right-[11%]">
        <button
          @click="successTodo(todo.id)"
          class="w-[48px] h-[50px] bg-[#0bd4a2]"
        >
          <i class="fa-solid fa-check text-white"></i>
        </button>
        <button
          @click="removeTodo(todo)"
          class="w-[48px] h-[50px] bg-[#ff6f47]"
        >
          <i class="fa-solid fa-trash text-white"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["todoRemove", "todoSuccess"]);

const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
});

const removeTodo = (todo) => {
  emit("todoRemove", todo);
};

const successTodo = (id) => {
  emit("todoSuccess", id);
};
</script>
