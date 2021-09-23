<template>
  <b-container fluid class="start-container">
    <b-row>
      <div class="backdrop-container" align-self="center">
        <b-container fluid>
          <b-row>
            <!-- Title -->
            <div sm="12" class="mb-4 quiz-title">
              <h1>Take it to the next level!</h1>
            </div>

            <!-- Subtitle -->
            <p v-if="isUser" class="mb-5">
              Keep playing to learn more about PiB and take a deep dive into
              specific solution areas. Race to the top of the leaderboard for an
              opportunity to speak one-on-one with a Microsoft Executive.
            </p>
            <p v-else>
              Download your badge and Microsoft Teams background and use your
              PiB knowledge to help your customers drive digital transformation.
            </p>

            <b-col sm="12" class="button-row">
              <b-row>
                <div class="text-center m-auto">
                  <img :src="image" alt="" ref="swapImg" />
                  <div class="welcome-btn-box mt-5">
                    <b-button
                      sm="4"
                      class="go-back-button"
                      @click="downloadSwap"
                    >
                      Download digital swap
                    </b-button>
                    <b-button
                      v-if="isUser"
                      sm="4"
                      class="get-started-button"
                      @click="submit"
                    >
                      Continue
                    </b-button>
                    <b-button
                      v-else
                      sm="4"
                      class="get-started-button"
                      @click="submit"
                    >
                      Learn more
                    </b-button>
                  </div>
                </div>
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
import img from "../assets/images/badges/Partner_Prodigy_Badge.png";

export default {
  data() {
    return {
      isUser: true,
      image: img,
      openLink: "https://bootstrap-vue.org/docs/components/progress"
    };
  },
  methods: {
    submit: function() {
      if (!this.isUser) window.open(this.openLink, "_blank");
      else this.$router.push("/challenges");
    },
    downloadSwap: function() {
      const swapImg = this.$refs.swapImg;
      // Create an empty canvas element
      var canvas = document.createElement("canvas");
      canvas.width = swapImg.width;
      canvas.height = swapImg.height;

      // Copy the image contents to the canvas
      var ctx = canvas.getContext("2d");
      ctx.drawImage(swapImg, 0, 0);
      const url = canvas.toDataURL("image/png", 1.0);
      const imageName = `swap.png`;
      this.download(url, imageName);
    },
    download: function(url, imageName) {
      const link = document.createElement("a");
      document.body.appendChild(link);

      link.target = "_blank";
      link.download = imageName;
      link.href = url;

      link.click();
      link.remove();
    }
  }
};
</script>

<style lang="scss" scoped>
.start-container {
  max-width: 880px;
}

.backdrop-container {
  color: white;

  p {
    font-family: Segoe UI;
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 33px;
    color: #ffffff;
  }
}

.quiz-checkout {
  margin-bottom: 20px;
}

.quiz-progress {
  width: 100%;
  margin-top: 30px;

  label {
    font-size: 30px;
    line-height: 30px;
  }
}

.button-row {
  @media screen and (max-width: 767px) {
    > .row {
      justify-content: center;
    }
  }

  .go-back-button {
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 27px;
    letter-spacing: 0em;
    color: #ffffff;
    width: 240px;
    height: 55.36px;
    padding: 0;
  }

  .get-started-button {
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 27px;
    letter-spacing: 0em;
    background: #0078d4;
    color: #ffffff;
    width: 240px;
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
      text-decoration: unset;
    }
  }
}

.quiz-title h1 {
  font-family: Segoe UI;
  font-style: normal;
  font-weight: 600;
  font-size: 42px;
  line-height: 48px;
  color: #ffffff;
}

.welcome-btn-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
