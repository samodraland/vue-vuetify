<template>
  <v-container max-width="900">
    <div>
      <v-img class="mb-4" height="80" src="@/assets/logo.png" />
      <div class="text-center mb-5">
        <h2 class="text-body font-weight-light mb-n1">Movie list</h2>
      </div>
      <v-container class="px-0">
        <v-row no-gutters class="ga-2 px-0">
          <v-col cols="2">
            <v-select
              label="Search by"
              :items="['Title', 'Year']"
              variant="outlined"
              hide-details
              v-model="searchBy"
            ></v-select>
          </v-col>
          <v-col>
            <v-text-field
              v-model="keyword"
              clearable
              label="Keyword"
              variant="outlined"
              hide-details
              append-inner-icon="mdi-magnify"
              @click:append-inner="searchMovie"
              @click:clear="onClear"
              @keydown.enter="searchMovie"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="my-5">
        <v-tabs v-model="tab" color="deep-purple-accent-4">
          <v-tab value="list">Movie list</v-tab>
          <v-tab value="fav">Favorites ({{ favorites.length }})</v-tab>
        </v-tabs>
      </v-container>

      <v-container class="ma-0 pa-0">
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="list">
            <MovieList
              ref="movieListChild"
              :searchBy="searchBy"
              :keyword="keyword"
            />
          </v-tabs-window-item>
          <v-tabs-window-item value="fav">
            <FavoritesList />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-container>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MovieList from "./MovieList.vue";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";

const tab = ref<string>("list");
const searchBy = ref<"Title" | "Year">("Title");
const keyword = ref<string>("");
const movieListChild = ref<InstanceType<typeof MovieList> | null>(null);

const appStore = useAppStore();
const { favorites } = storeToRefs(appStore);

// const page = ref<number>(1);

function searchMovie() {
  movieListChild.value?.searchMovie();
}

function onClear() {
  keyword.value = "";
  setTimeout(() => {
    searchMovie();
  }, 100);
}
</script>
