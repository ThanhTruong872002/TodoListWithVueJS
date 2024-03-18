<template>
  <div
    class="flex flex-col items-center bg-[#0093e9] min-h-[100vh] bg-gradient-to-br from-sky-500 to-teal-400"
  >
    <header>
      <h1 class="text-[40px] lg:text-[64px] text-white poppins-semibold pt-16">
        To-Do List
      </h1>
    </header>
    <main>
      <div
        class="flex flex-col mb-10 lg:mb-0 lg:flex-row lg:gap-12 items-center"
      >
        <InputTodo />
        <FilterTodo :todos="todos" />
      </div>
      <!-- loading  -->
      <div class="loading" v-if="todoStore.isLoading">Loading tasks...</div>
      <!-- List todo  -->
      <ListTodo />
    </main>
  </div>
</template>
<script>
import { ref, computed, watch, onMounted } from "vue";
import InputTodo from "./components/InputTodo.vue";
import FilterTodo from "./components/FilterTodo.vue";
import ListTodo from "./components/ListTodo.vue";
import { storeToRefs } from "pinia";
import { useTodoStore } from "./stores/TodoStores.js";

export default {
  components: { InputTodo, FilterTodo, ListTodo },
  setup() {
    const todoStore = useTodoStore();
    const { todos, isLoading } = storeToRefs(todoStore);

    // Call API Todos
    todoStore.getTodos();

    // Save localStorage
    watch(
      todos,
      (newVal) => {
        localStorage.setItem("todos", JSON.stringify(newVal));
      },
      {
        deep: true,
      }
    );
    onMounted(() => {
      todos.value = JSON.parse(localStorage.getItem("todos")) || [];
    });
    return { todoStore, todos, isLoading };
  },
};
</script>
