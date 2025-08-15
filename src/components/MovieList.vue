<template>
  <div>
    <NotFound v-if="!moviesData?.data.length && !isLoading" />
    <Loader v-if="isLoading" />
    <v-row v-if="!isLoading">
      <v-col
        v-for="movie in moviesData?.data || []"
        :key="movie.imdbID"
        cols="6"
      >
        <Movie v-bind="movie" />
      </v-col>
      <Pagination
        v-if="moviesData?.data.length"
        v-model:page="page"
        :totalPages="moviesData.total_pages"
        @update:page="searchMovie(false)"
      />
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";

interface Props {
  searchBy: string;
  keyword: string;
}

const appStore = useAppStore();
const { moviesData } = storeToRefs(appStore);

const props = defineProps<Props>();
const page = ref<number>(1);
const isLoading = ref<boolean>(false);

async function searchMovie(resetPage = false) {
  if (resetPage) page.value = 1;
  isLoading.value = true;
  await appStore.fetchData(props.searchBy, props.keyword.trim(), page.value);
  isLoading.value = false;
}

onMounted(() => {
  searchMovie();
  appStore.loadFavorites();
});

defineExpose({
  searchMovie,
});
</script>
