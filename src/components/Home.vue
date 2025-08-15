<template>
  <v-container fluid class="pa-0">
    <!-- <v-row> -->
    <v-container
      fluid
      class="position-absolute bg-light-blue-lighten-3 ornament"
      height="220"
    >
      <v-row> </v-row>
    </v-container>
    <v-container
      max-width="900"
      class="bg-grey-lighten-5 pa-5 position-relative mt-15 rounded-lg"
    >
      <div>
        <v-img class="mb-2 mt-n15" height="80" src="@/assets/logo.svg" />
        <v-container class="px-0">
          <v-row no-gutters class="ga-2 px-0">
            <v-col cols="12" sm="2" md="2" lg="2">
              <v-select
                bg-color="white"
                label="Search by"
                :items="['Title', 'Year']"
                variant="outlined"
                hide-details
                v-model="searchBy"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                bg-color="white"
                class="inputfield"
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

        <v-container class="my-5 px-0">
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
    <!-- </v-row> -->
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

function searchMovie() {
  tab.value = "list";
  movieListChild.value?.searchMovie(true);
}

function onClear() {
  keyword.value = "";
  setTimeout(() => {
    searchMovie();
  }, 100);
}
</script>

<style>
.ornament {
  z-index: 0;
  top: 0;
}
.inputfield .v-field__append-inner {
  width: 60px;
  background: #eaeaea;
  justify-content: center;
}

.inputfield,
.inputfield .v-input__control .v-field {
  padding-inline-end: 0;
}
</style>
