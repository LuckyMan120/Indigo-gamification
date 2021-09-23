<template>
  <div class="app">
    <NavBar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.modal-open {
  padding-right: 0 !important;
}

html {
  overflow-y: scroll !important;
}
</style>
