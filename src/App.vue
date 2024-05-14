<template>
  <v-app>
    <v-main>
      <AppSidebar/>
      <RouterView/>
    </v-main>
  </v-app>
</template>

<script setup>
  //
import AppSidebar from "@/components/AppSidebar.vue";
</script>
