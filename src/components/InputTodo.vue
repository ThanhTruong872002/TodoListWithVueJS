<template>
  <form @submit.prevent="handleSubmit" class="my-20 flex gap-12">
    <div class="flex relative">
      <input
        v-model="input_content"
        type="text"
        name="content"
        placeholder="I need to..."
        class="text-[16px] bg-white p-[10px] w-[300px] lg:w-[405px] h-[53px] outline-none rounded-md"
      />
      <div
        class="absolute right-0 hover:bg-[#ff6f47] h-[53px] w-[45px] flex justify-center items-center cursor-pointer"
      >
        <button
          type="submit"
          class="bg-[#ff6f47] transition-all ease-linear w-[34px] h-[36px]"
        >
          <i
            class="fa-solid fa-square-plus text-white text-[26px] hover:bg-[#ff6f47]"
          ></i>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useTodoStore } from "../stores/TodoStores.js";
import { useToast } from "vue-toastification";
import { v4 as uuidv4 } from "uuid";

export default {
  setup() {
    const todoStore = useTodoStore();

    const toast = useToast();

    const input_content = ref("");

    const handleSubmit = () => {
      if (input_content.value.length > 0) {
        todoStore.addTodo({
          id: uuidv4(),
          content: input_content.value,
          category: "Uncompleted",
        });
        input_content.value = "";
      } else {
        toast.error("Todo is required");
      }
    };

    return { handleSubmit, input_content };
  },
};
</script>
