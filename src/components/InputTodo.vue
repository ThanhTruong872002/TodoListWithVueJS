<script setup>
import { ref, computed } from "vue";

const input_content = ref("");
const emit = defineEmits(["inputTodoSubmitted"]);

const onSubmit = () => {
  if (input_content.value.trim() === "") {
    return;
  }
  const todoData = input_content.value;

  emit("inputTodoSubmitted", todoData);
  input_content.value = "";
};
</script>
<template>
  <form @submit.prevent="onSubmit" class="my-20 flex gap-12">
    <div class="flex relative">
      <input
        v-model="input_content"
        type="text"
        name="content"
        class="text-[16px] bg-white p-[10px] w-[405px] h-[53px] outline-none rounded-md"
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
