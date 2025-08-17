<template>
  <div>
    <ErrorHandler
      message="Can't find any data"
      icon="not-found.svg"
      v-if="!moviesData?.data.length && !isLoading && !error"
    />
    <Loader v-if="isLoading && !error" />
    <ErrorHandler
      v-if="!isLoading && error"
      :message="errorMessage || ''"
      icon="error.svg"
    />
    <v-row v-if="!isLoading">
      <v-col
        v-for="movie in moviesData?.data || []"
        :key="movie.imdbID"
        cols="12"
        sm="6"
        md="6"
        lg="6"
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

defineOptions({ name: "MovieList" });

interface Props {
  searchBy: string;
  keyword: string;
}

const appStore = useAppStore();
const { moviesData, isLoading, error, errorMessage } = storeToRefs(appStore);

const props = defineProps<Props>();
const page = ref<number>(1);

async function searchMovie(resetPage = false) {
  if (resetPage) page.value = 1;
  await appStore.fetchData(props.searchBy, props.keyword?.trim(), page.value);
}

onMounted(() => {
  searchMovie();
  appStore.loadFavorites();
});

defineExpose({
  searchMovie,
});
</script>
