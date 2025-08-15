<template>
  <div>
    <NotFound v-if="!favorites.length" />
    <v-row>
      <v-col v-for="movie in favorites || []" :key="movie.imdbID" cols="6">
        <Movie v-bind="movie" />
      </v-col>
      <Pagination
        v-if="favorites.length && totalPage > 1"
        v-model:page="page"
        :totalPages="totalPage"
      />
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { favorites } = storeToRefs(appStore);
const totalPage = computed<number>(() =>
  Math.ceil(favorites.value.length / 10)
);
const page = ref(1);
</script>
