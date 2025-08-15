<template>
  <v-row>
    <v-col v-for="index in 10" :key="index" cols="12" sm="6" md="6" lg="6">
      <v-skeleton-loader type="card"></v-skeleton-loader>
    </v-col>
  </v-row>
</template>
