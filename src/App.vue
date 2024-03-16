<template>
  <div
    class="flex flex-col items-center bg-[#0093e9] min-h-[100vh] bg-gradient-to-br from-sky-500 to-teal-400"
  >
    <header>
      <h1 class="text-[64px] text-white poppins-semibold pt-20">To-Do List</h1>
    </header>
    <main>
      <div class="flex gap-12 items-center">
        <InputTodo @inputTodoSubmitted="handleAddTodo" />
        <FilterTodo @categoryInput="filterTodos" />
      </div>
      <ListTodo
        :todos="filteredTodos"
        @todoRemove="removeTodo"
        @todoSuccess="successTodo"
      />
    </main>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import InputTodo from "./components/InputTodo.vue";
import FilterTodo from "./components/FilterTodo.vue";
import ListTodo from "./components/ListTodo.vue";

const todos = ref([]);

// Add Todo
const handleAddTodo = (todoData) => {
  todos.value.push({
    id: uuidv4(),
    content: todoData,
    category: "Uncompleted",
  });
};

// Remove Todo
const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};

// Success Todo
const successTodo = (id) => {
  todos.value.forEach((todo) => {
    if (todo.id === id) {
      todo.category =
        todo.category === "Completed" ? "Uncompleted" : "Completed";
    }
    return todo;
  });
};

// Filter Todo
const filterCategory = ref("All");

const filterTodos = (categoryData) => {
  filterCategory.value = categoryData;
};

const filteredTodos = computed(() => {
  if (filterCategory.value === "All") {
    return todos.value;
  } else {
    return todos.value.filter((todo) => todo.category === filterCategory.value);
  }
});
</script>
