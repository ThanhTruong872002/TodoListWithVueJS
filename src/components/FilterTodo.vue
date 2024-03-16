<template>
  <Dropdown
    v-model="input_category"
    @change="filterTodos"
    :options="selectOptions"
    optionLabel="name"
    class="md:w-14rem w-[192px] h-[51px] flex justify-center items-center"
  />
</template>

<script setup>
import { ref, computed } from "vue";
import Dropdown from "primevue/dropdown";

const emit = defineEmits(["categoryInput"]);

const input_category = ref({ name: "All" });

const selectOptions = ref([
  { name: "All" },
  { name: "Completed" },
  { name: "Uncompleted" },
]);

const filterTodos = () => {
  const categoryData = input_category.value.name;

  emit("categoryInput", categoryData);
};
</script>
