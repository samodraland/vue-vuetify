<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-container class="max-width">
          <v-pagination
            :model-value="page"
            :length="totalPages"
            class="my-4"
            @update:model-value="emit('update:page', $event)"
          />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
defineOptions({ name: "Pagination" });
interface Props {
  page: number;
  totalPages: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:page", value: number): void;
}>();
</script>
