<template>
  <b-container fluid class="question-container">
    <b-row>
      <b-col sm="12">
        <NuxtLink class="challenge-button" to="/challenges"
          >Challenge list <BIconList
        /></NuxtLink>
        <div class="backdrop-container">
          <p v-if="!linkText" class="question-text">{{ question }}</p>
          <p class="question-text" v-else>
            {{ question }}
            <a :href="link" target="_blank">{{ linkText }}</a>
            {{ question2 }}
          </p>
          <form
            v-if="questionType === 'radio'"
            action=""
            class="radio-answer-block"
          >
            <div
              class="button-and-label"
              v-for="(answer, index) in answers"
              :key="index"
            >
              <input
                type="radio"
                :id="answer"
                name="answer-radios"
                class="radio-custom"
                :value="index"
                v-model="radioChoice"
              />
              <label class="radio-custom-label" :for="answer">{{
                answer
              }}</label>
            </div>
          </form>
          <b-form-textarea
            v-if="questionType === 'text'"
            id="textarea"
            v-model="text"
            placeholder="Write your answer"
            rows="6"
            max-rows="6"
          ></b-form-textarea>
          <b-col sm="12" class="button-row">
            <b-row>
              <b-button sm="4" class="submit-button">
                <Button @click="answerCheck()">Submit</Button>
              </b-button>
            </b-row>
          </b-col>

          <b-modal
            v-model="correctModal"
            id="correct-modal"
            size="sm"
            ok-only
            ok-title="Next"
            centered
            no-close-on-esc
            no-close-on-backdrop
            @ok="completed"
          >
            <b-col sm="12">
              <span
                class="correct-icon"
                :style="{
                  backgroundImage: `url(/svgs/correct.svg)`
                }"
              ></span>
              <p class="headline">Correct!</p>
              <p class="pointsMessage">
                You just earned {{ pointValue }} points.
              </p>
            </b-col>
          </b-modal>

          <b-modal
            v-model="incorrectModal"
            id="incorrect-modal"
            size="sm"
            ok-only
            ok-title="Go back"
            centered
            no-close-on-esc
            no-close-on-backdrop
          >
            <b-col sm="12">
              <span
                class="incorrect-icon"
                :style="{
                  backgroundImage: `url(/svgs/try-again.svg)`
                }"
              ></span>
              <p class="headline">Try again!</p>
            </b-col>
          </b-modal>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { BIcon, BIconList } from "bootstrap-vue";
export default {
  components: {
    BIcon,
    BIconList
  },
  props: {
    questionType: {
      type: String,
      default: ""
    },
    question: {
      type: String,
      default: ""
    },
    answers: {
      type: Array,
      default: []
    },
    pointValue: {
      type: Number,
      default: 0
    },
    correctAnswer: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: ""
    },
    linkText: {
      type: String,
      default: ""
    },
    question2: {
      type: String,
      default: ""
    },
    day: {
      type: String,
      default: 0
    }
  },
  data() {
    return {
      text: "",
      radioChoice: null,
      correctModal: false,
      incorrectModal: false
    };
  },
  methods: {
    answerCheck() {
      if (String(this.radioChoice) === this.correctAnswer) {
        this.correctModal = true;
      } else if (this.questionType === "text" && this.text !== "") {
        this.correctModal = true;
      } else {
        this.incorrectModal = true;
      }
    },
    completed() {
      this.$router.push("/challenges");
    }
  }
};
</script>

<style lang="scss" scoped>
.question-container {
  max-width: 700px;
}

.challenge-button {
  font-family: "Segoe UI-semibold", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
  z-index: 2;
  position: relative;

  svg {
    width: 15px;
    height: 15px;
    padding: 0 15px;
  }
}

.backdrop-container {
  background: rgba(3, 11, 17, 0.5);
  backdrop-filter: blur(50px);
  border-radius: 5px;
  width: 100%;
  min-height: 380px;
  z-index: 2;
  position: relative;
  padding: 20px;
  margin: 15px auto;

  @media screen and (min-width: 768px) {
    padding: 50px;
  }

  .question-text {
    font-family: "Segoe UI-semibold", sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
    letter-spacing: 0em;
    text-align: left;
    color: #ffffff;
  }

  .radio-answer-block {
    display: block;

    .button-and-label {
      display: flex;
      align-items: center;
    }

    .radio-custom {
      opacity: 0;
      position: absolute;
    }

    .radio-custom,
    .radio-custom-label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .radio-custom-label {
      position: relative;
      font-family: "Segoe UI-semibold", sans-serif;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 32px;
      letter-spacing: 0em;
      text-align: left;
      color: #ffffff;
      grid-template-columns: 1fr 90%;
      display: grid;
      margin-bottom: 1rem;

      @media screen and (min-width: 550px) {
        grid-template-columns: 1fr 100%;
      }
    }

    .radio-custom + .radio-custom-label:before {
      content: "";
      background-image: url("../static/svgs/question-radio.svg");
      width: 30px;
      height: 30px;
      background-repeat: no-repeat;
      background-position: center;
      display: block;
      margin: 5px 10px 5px 0px;
    }

    .radio-custom + .radio-custom-label:before {
      border-radius: 50%;
    }

    .radio-custom:checked + .radio-custom-label:before {
      content: "";
      background-image: url("../static/svgs/completed-radio.svg");
      width: 30px;
      height: 30px;
      background-repeat: no-repeat;
      background-position: center;
      display: block;
      margin: 5px 10px 5px 0px;
      background-size: contain;
    }

    .radio-custom:focus + .radio-custom-label {
      outline: 1px solid #ddd; /* focus style */
    }
  }

  textarea {
    background: transparent !important;
    margin-bottom: 30px;
    font-family: "Segoe UI", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 27px;
    letter-spacing: 0em;
    text-align: left;
    color: #ffffff;

    &::placeholder {
      font-family: "Segoe UI", sans-serif;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 27px;
      letter-spacing: 0em;
      text-align: left;
      color: #ffffff;
    }
  }

  .button-row {
    display: flex;
    justify-content: center;

    @media screen and (min-width: 768px) {
      justify-content: flex-end;
    }

    .submit-button {
      font-family: "Segoe UI-semibold", sans-serif;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 27px;
      letter-spacing: 0em;
      width: 197px;
      height: 55.36px;
      padding: 0;

      button {
        color: #000000;
        background: #ffb900;
        width: 100%;
        height: 100%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border: 0;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>

<style lang="scss">
#correct-modal {
  .col-sm-12 {
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    display: none;
  }

  .correct-icon {
    min-width: 200px;
    min-height: 190px;
    background-size: contain;
    background-position: center;
    display: inline-block;
    background-repeat: no-repeat;
    margin-top: -100px;
  }

  .headline {
    font-family: "Segoe UI-semibold", sans-serif;
    font-size: 27px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
    letter-spacing: 0em;
    text-align: center;
    color: #000000;
  }

  .pointsMessage {
    font-family: "Segoe UI-semibold", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;
    color: #000000;
  }

  button.btn-primary {
    color: #000000;
    background-color: #ffb900;
    border: none;
    margin: auto;
    width: 80%;
  }
}

#incorrect-modal {
  .col-sm-12 {
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    display: none;
  }

  .incorrect-icon {
    min-width: 200px;
    min-height: 170px;
    background-size: contain;
    background-position: center;
    display: inline-block;
    background-repeat: no-repeat;
    margin-top: -90px;
    margin-bottom: 30px;
  }

  .headline {
    font-family: "Segoe UI-semibold", sans-serif;
    font-size: 27px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
    letter-spacing: 0em;
    text-align: center;
    color: #000000;
  }

  .pointsMessage {
    font-family: "Segoe UI-semibold", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;
    color: #000000;
  }

  button.btn-primary {
    color: #000000;
    background-color: #ffb900;
    border: none;
    margin: auto;
    width: 80%;
  }
}
</style>
