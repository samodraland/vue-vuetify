<template>
  <v-card class="mx-auto" rounded="lg">
    <v-card-subtitle class="px-2">
      <v-chip
        size="sm"
        class="ma-2 pa-1"
        prepend-icon="mdi-calendar-month"
        color="primary"
        label
      >
        {{ props.Year }}
      </v-chip>
      <v-chip
        size="sm"
        class="pa-1"
        color="deep-purple"
        append-icon="mdi-open-in-new"
        label
        @click="goto(props.imdbID)"
      >
        IMDB: {{ props.imdbID }}
      </v-chip>
    </v-card-subtitle>
    <template v-slot:title>
      <span class="font-weight-black">{{ props.Title }}</span>
    </template>
    <v-card-actions class="bg-grey-lighten-4">
      <v-spacer></v-spacer>
      <v-btn rounded="xl" size="lg" @click="fav(props)">
        <v-icon :color="isFav(props.imdbID) ? 'red' : ''">
          {{ isFav(props.imdbID) ? "mdi-star" : "mdi-star-outline" }}
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { MovieList } from "@/types/movie";
import { useAppStore } from "@/stores/app";

const props = defineProps<MovieList>();
const appStore = useAppStore();

function fav(theMovie: MovieList) {
  appStore.toggleFavorite(theMovie);
}

function isFav(id: string) {
  return appStore.isFavorite(id);
}

function goto(imdbID: string) {
  window.open(`https://www.imdb.com/title/${imdbID}`, "_blank");
}
</script>
