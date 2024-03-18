<template>
  <div
    v-for="(todo, index) in todoStore.filteredTodos"
    :key="index"
    class="flex mt-4 flex-col items-center"
  >
    <div class="flex relative">
      <div
        :class="{
          'line-through text-[#ccc]': todo.category === 'Completed',
        }"
        class="w-[350px] lg:w-[500px] min-h-[50px] px-4 py-3 bg-white rounded-md truncate line-clamp-1 overflow-hidden"
      >
        {{ todo.content }}
      </div>
      <div class="absolute right-0">
        <button
          @click="todoStore.successTodo(todo.id)"
          class="w-[48px] h-[50px] bg-[#0bd4a2]"
        >
          <i class="fa-solid fa-check text-white"></i>
        </button>
        <button
          @click="todoStore.removeTodo(todo.id)"
          class="w-[48px] h-[50px] bg-[#ff6f47]"
        >
          <i class="fa-solid fa-trash text-white"></i>
        </button>
        <button
          @click="todoStore.startEditing(todo)"
          class="w-[48px] h-[50px] bg-[#ece451]"
        >
          <i class="fa-solid fa-edit text-white"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useTodoStore } from "../stores/TodoStores.js";
export default {
  setup() {
    const todoStore = useTodoStore();

    todoStore.filterTodos("All");

    const filteredTodos = todoStore.filteredTodos;

    return { todoStore, filteredTodos };
  },
};
</script>
