<template>
  <b-container fluid class="start-container">
    <b-row>
      <div class="backdrop-container" align-self="center">
        <b-container fluid>
          <b-row>
            <div sm="12" class="mb-5">
              <h1 class="intro-headline">Drive growth through sales plays</h1>
              <b-row class="column-text-row">
                <b-col sm="12" class="column-text">
                  Tyler Bryson, Corporate Vice President of Global Partner
                  Solutions, introduces Play-in-a-Box (PiB) resources. PiBs are
                  sales play packages that bring together capacity and
                  enablement, go-to-market, and co-selling resources—all by
                  solution area. Learn more from Tyler in the following video.
                </b-col>
              </b-row>
            </div>
            <vimeo-player
              ref="player"
              video-id="216979518"
              player-height="387"
              player-width="738"
            />
            <div class="mt-4 mb-5">
              <b-row class="column-text-row ">
                <b-col sm="12" class="column-text">
                  Up next is a 10-question knowledge check on PiB solution
                  areas.
                </b-col>
              </b-row>
            </div>
            <b-col sm="12" class="button-row">
              <b-row>
                <b-button sm="4" class="go-back-button">
                  <NuxtLink to="/instructions">Back</NuxtLink>
                </b-button>
                <b-button sm="4" class="get-started-button">
                  <NuxtLink to="/quiz">Start Quiz</NuxtLink>
                </b-button>
                <PrivacyNotice class="mt-5" />
              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-row>
  </b-container>
</template>

<script>
export default {
  methods: {
    checkForm: function(e) {
      this.$router.push("/challenges");
    }
  }
};
</script>

<style lang="scss" scoped>
.start-container {
  max-width: 880px;
}

.column-text-row {
  .column-text {
    font-size: 18px;
    font-style: normal;
    font-weight: lighter;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    color: #ffffff;

    span {
      position: absolute;
      min-width: 3px;
      height: 20px;
      left: 5px;
      background: #5ec3ef;
    }
  }
}

.button-row {
  @media screen and (max-width: 767px) {
    > .row {
      justify-content: center;
    }
  }

  .get-started-button {
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 27px;
    letter-spacing: 0em;
    background: #0078d4;
    color: #ffffff;
    width: 197px;
    height: 55.36px;
    padding: 0;
    border: none;

    a {
      color: #ffffff;
      width: 100%;
      height: 100%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
