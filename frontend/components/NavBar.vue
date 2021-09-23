<template>
  <div>
    <b-navbar toggleable="md" type="dark">
      <b-navbar-brand href="https://www.microsoft.com/">
        <img src="../assets/images/microsoft-logo.png" alt="Microsoft logo" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            class="stand-alone"
            target="_blank"
            href="https://myinspire.microsoft.com/home"
            >Microsoft Inspire</b-nav-item
          >
          <b-nav-item
            target="_blank"
            href="https://myinspire.microsoft.com/get-help"
            >FAQs</b-nav-item
          >
          <!-- <button class="register-button">
            <a target="_blank" href="https://register.inspire.microsoft.com/"
              >Register now</a
            >
          </button> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div v-if="this.$route.path !== '/'" class="topGradient" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.navbar {
  background: #000000;
  z-index: 2;

  @media screen and (min-width: 768px) {
    align-items: flex-end;
    .navbar-nav {
      align-items: center;
    }
  }

  .navbar-brand img {
    max-height: 25px;
  }

  .stand-alone {
    a {
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
    }

    @media screen and (min-width: 768px) {
      &:before {
        border-left: 2px solid #000;
        height: 24px;
        content: " ";
        margin-left: 7px;
        position: absolute;
        top: 18px;
        border-color: white;
      }

      a {
        padding-left: 25px !important;
      }
    }
  }

  .nav-link {
    font-family: "Segoe UI", sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #ffffff !important;
  }

  .register-button {
    background: #ffffff;
    border: 0;
    max-height: 30px;
    border-radius: 5px;
    max-width: 100px;

    @media screen and (min-width: 768px) {
      margin-right: 0.5rem;
      margin-left: 0.5rem;
    }

    a {
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 19px;
      letter-spacing: 0em;
      text-align: center;
      color: #000000;
    }
  }
}

.topGradient {
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1;
  height: 70vh;
}
</style>
