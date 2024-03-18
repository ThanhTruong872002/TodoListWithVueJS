import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: [],
    isLoading: false,
    filteredTodos: [],
    editingTodo: null,
  }),
  getters: {},
  actions: {
    async getTodos() {
      try {
        this.isLoading = true;
        const res = await axios.get(
          "https://6486a69cbeba6297278f00b8.mockapi.io/todos"
        );
        if (res.status === 200) {
          this.todos = res.data;
          this.filteredTodos = res.data;
          this.isLoading = false;
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },
    async addTodo(todo) {
      const checkTodo = this.todos.find((t) => t.content === todo.content);
      if (checkTodo) {
        toast.error("This task is already on your list");
        return;
      }
      this.todos.push(todo);
      this.filteredTodos = this.todos;

      const res = await axios.post(
        "https://6486a69cbeba6297278f00b8.mockapi.io/todos",
        todo
      );
      if (res.error) {
        console.log(res.error);
      }
    },
    async removeTodo(id) {
      this.filteredTodos = this.filteredTodos.filter((todo) => todo.id !== id);
      this.todos = this.todos.filter((todo) => todo.id !== id);

      const res = await axios.delete(
        `https://6486a69cbeba6297278f00b8.mockapi.io/todos/${id}`
      );
      if (res.error) {
        console.log(res.error);
      }
    },
    async successTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.category =
            todo.category === "Completed" ? "Uncompleted" : "Completed";
        }
      });
    },
    async filterTodos(category) {
      if (category === "All") {
        this.filteredTodos = this.todos;
      } else {
        this.filteredTodos = this.todos.filter(
          (todo) => todo.category === category
        );
      }
    },
    async startEditing(todo) {
      const userInput = prompt("Enter new content:", todo.content);
      if (userInput !== null) {
        this.editingTodo = { ...todo, content: userInput };
        await this.updateEditingTodo();
      }
    },
    cancelEditing() {
      this.editingTodo = null;
    },
    async updateEditingTodo() {
      try {
        const index = this.todos.findIndex(
          (todo) => todo.id === this.editingTodo.id
        );
        if (index !== -1) {
          this.todos[index] = { ...this.editingTodo };
          this.filteredTodos = [...this.todos];
          await axios.put(
            `https://6486a69cbeba6297278f00b8.mockapi.io/todos/${this.editingTodo.id}`,
            this.editingTodo
          );
          this.editingTodo = null;
        } else {
          console.error("Todo not found");
        }
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    },
  },
});
