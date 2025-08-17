<template>
  <div>
    <ErrorHandler
      message="Can't find any data"
      icon="not-found.svg"
      v-if="!paginatedFavorites.length && !favorites.length"
    />
    <v-row>
      <v-col
        v-for="movie in paginatedFavorites || []"
        :key="movie.imdbID"
        cols="6"
      >
        <Movie v-bind="movie" />
      </v-col>
      <Pagination
        v-if="favorites.length"
        v-model:page="page"
        :totalPages="totalPage"
      />
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import { ref, computed, watch } from "vue";

defineOptions({ name: "FavoritesList" });

const page = ref<number>(1);
const itemsPerPage: number = 10;
const appStore = useAppStore();
const { favorites } = storeToRefs(appStore);

const paginatedFavorites = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const current = favorites.value.slice(start, end);
  if (current <= itemsPerPage) page.value = 1;
  return current;
});

const totalPage = computed<number>(() =>
  Math.ceil(favorites.value.length / itemsPerPage)
);
</script>
