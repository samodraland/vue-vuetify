<template>
  <v-row>
    <v-col v-for="index in 10" :key="index" cols="6">
      <v-skeleton-loader type="card, actions"></v-skeleton-loader>
    </v-col>
  </v-row>
</template>
