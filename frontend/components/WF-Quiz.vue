<template>
  <b-container fluid class="start-container">
    <b-row>
      <div class="backdrop-container" align-self="center">
        <b-container fluid>
          <b-row>
            <!-- Title -->
            <div
              sm="12"
              class="mb-4 w-100 d-flex justify-content-between align-items-center"
            >
              <h1>
                Azure Play-in-a-Box challenge
              </h1>
              <p class="w-auto mb-0">1/10</p>
            </div>
            <p class="mb-5">
              How many Microsoft solutions areas are there?
            </p>
            <!-- select section -->
            <b-form-group class="mb-4" v-slot="{ ariaDescribedby }">
              <b-form-radio
                class="quiz-checkout"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                value="6"
                size="lg"
                stacked
                >6</b-form-radio
              >
              <b-form-radio
                class="quiz-checkout"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                value="3"
                size="lg"
                stacked
                >3</b-form-radio
              >
              <b-form-radio
                class="quiz-checkout"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                value="4"
                size="lg"
                stacked
                >4</b-form-radio
              >
              <b-form-radio
                class="quiz-checkout"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                value="5"
                size="lg"
                stacked
                >5</b-form-radio
              >
            </b-form-group>

            <b-col sm="12" class="button-row">
              <b-row>
                <b-button sm="4" class="go-back-button">
                  <NuxtLink to="/instructions">Back</NuxtLink>
                </b-button>
                <b-button sm="4" class="get-started-button" @click="submit">
                  Submit
                </b-button>
                <!-- Progress bar -->
                <div class="quiz-progress">
                  <b-progress :value="progress" :max="max"></b-progress>
                  <label for="progress" class="mt-4">{{ progress }}%</label>
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
export default {
  data() {
    return {
      selected: "",
      max: 100,
      progress: 40,
      isSubmit: false
    };
  },
  methods: {
    submit: function() {
      if (this.isSubmit) this.$router.push("/prize");
      else window.alert("No correct!");
    }
  },
  watch: {
    selected: function(value) {
      this.isSubmit = value === "6" ? true : false;
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
    font-size: 27px;
    width: 100%;
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
