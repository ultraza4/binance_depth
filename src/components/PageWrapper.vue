<template>
  <div class="page_wrapper">
    <v-card>
      <slot></slot>
    </v-card>
  </div>
</template>

<style scoped>
.page_wrapper {
  padding: 3rem 5rem;
}

@media (max-width: 600px) {
  .page_wrapper {
    padding: 2rem 1rem;
  }
}
</style>
