<template>
  <div>
    <v-img class="mb-4" height="150" :src="theicon" />
    <div class="text-center mb-10">
      <h2 class="text-body font-weight-light">{{ message }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import networkErrorIcon from "@/assets/network-error.svg";
import { computed } from "vue";

defineOptions({ name: "ErrorHandler" });

interface Props {
  message?: string;
  icon: string;
}

const props = defineProps<Props>();

const theicon = computed(() => {
  if (props.message?.toLowerCase() === "network error") return networkErrorIcon;
  return new URL(`../assets/${props.icon}`, import.meta.url).href;
});
</script>
