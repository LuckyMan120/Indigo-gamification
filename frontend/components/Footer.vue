<template>
  <div>
    <footer class="footer">
      <div class="links">
        <a class="footer-links" href="mailto:mailto:inspireu@microsoft.com"
          >Contact</a
        >
        <a
          class="footer-links"
          href="http://go.microsoft.com/fwlink/?LinkId=521839"
          >Privacy and cookies</a
        >
        <a class="footer-links" href="#">Terms of use</a>
        <p class="footer-links">© Microsoft 2021</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer {
  background: #000000;
  width: 100vw;
  max-width: 100%;
  position: relative;
  bottom: 0;
  z-index: 2;

  @media screen and (min-height: 800px) and (min-width: 992px) {
    position: fixed;
  }

  .links {
    display: flex;
    justify-content: flex-end;
    align-content: center;
    margin: auto;

    .footer-links {
      color: #ffffff;
      font-size: 11px;
      font-family: "Segoe UI", sans-serif;
      padding: 10px;
      margin-bottom: 0;
    }
  }
}
</style>
