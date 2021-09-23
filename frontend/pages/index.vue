<template>
  <div class="background-div">
    <WFStart />
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenSize: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.screenSize = window.innerWidth;
      window.addEventListener("resize", this.screenSizer);
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.screenSizer);
  },
  methods: {
    screenSizer() {
      if (process.client) {
        this.screenSize = window.innerWidth;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
