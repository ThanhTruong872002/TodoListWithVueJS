<template>
  <Dropdown
    v-model="input_category"
    @change="filterTodos"
    :options="selectOptions"
    optionLabel="name"
    class="md:w-14rem w-[192px] h-[51px] flex justify-center items-center"
  />
</template>

<script>
import { ref, computed, defineProps } from "vue";
import Dropdown from "primevue/dropdown";
import { useTodoStore } from "../stores/TodoStores.js";
export default {
  components: {
    Dropdown,
  },
  setup() {
    const todoStore = useTodoStore();

    const input_category = ref({ name: "All" });

    const selectOptions = ref([
      { name: "All" },
      { name: "Completed" },
      { name: "Uncompleted" },
    ]);

    const filterTodos = () => {
      todoStore.filterTodos(input_category.value.name);
    };

    return { input_category, selectOptions, filterTodos };
  },
};
</script>
