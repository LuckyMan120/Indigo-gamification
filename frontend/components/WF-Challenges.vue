<template>
  <b-container fluid class="challenge-container">
    <b-row>
      <b-col sm="12" style="zIndex: 2">
        <div class="link-nav">
          <div class="rules">
            <span><a href="/instructions"></a></span>
            <NuxtLink to="/instructions">Rules</NuxtLink>
          </div>
          <div class="leaderboard">
            <NuxtLink to="/leaderboard">See the leaderboard</NuxtLink>
            <span><a href="/leaderboard"></a></span>
          </div>
        </div>
        <h2 class="intro-headline">
          Your challenge list
        </h2>
        <p class="intro-subtext">
          Complete the following questions and tasks in any order you choose to
          earn points and win prizes!
        </p>
        <b-col sm="12" class="badge-container">
          <b-row class="badge-block">
            <b-col sm="12" md="4" class="button-col">
              <button v-b-modal.badge-modal class="badge-modal-launch-button">
                See all badges <span />
              </button>
            </b-col>
            <b-col sm="12" md="5" v-if="badges.length > 0" class="badge-column">
              <img
                v-for="(badge, index) in badges"
                :key="index"
                class="badge-icon"
                :src="`/svgs/badges/${badge.badgeName}.svg`"
                alt=""
              />
            </b-col>
            <b-modal id="badge-modal" size="lg" hide-footer>
              <b-col
                v-for="(badge, index) in modalBadges"
                :key="index"
                sm="6"
                md="4"
                class="modal-badge-section"
              >
                <img
                  v-if="earnedBadges !== null"
                  class="modal-badge-icon"
                  :class="{ earned: earnedBadges.includes(badge.icon) }"
                  :src="`/svgs/badges/${badge.icon}.svg`"
                  alt=""
                />
                <p class="badge-name">{{ badge.name }}</p>
                <p class="badge-description">{{ badge.description }}</p>
              </b-col>
            </b-modal>
            <b-col sm="12" md="3" class="score-col">
              <p class="scoreTally">{{ score }}/{{ scoreTotal }}</p>
            </b-col>
          </b-row>
        </b-col>
        <div class="accordion daily-challenges" role="tablist">
          <!-- Day 1 -->
          <b-card no-body>
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button block v-b-toggle.accordion-1 variant="info">
                Day 1
                <span class="when-opened" />
                <span class="when-closed" />
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-1"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <ChallengesBoardQuestion
                  v-for="(question, index) in day1"
                  :key="index"
                  :text="question.question"
                  :points="question.points"
                  :link="question.questionID"
                />
              </b-card-body>
            </b-collapse>
          </b-card>
          <!-- Day 2 -->
          <b-card no-body>
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button
                v-if="!locked"
                block
                v-b-toggle.accordion-2
                variant="info"
              >
                Day 2
                <span class="when-opened" />
                <span class="when-closed" />
              </b-button>
              <b-button
                v-else
                block
                v-b-toggle.accordion-2
                disabled
                variant="info"
              >
                Day 2
                <span class="locked" />
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <ChallengesBoardQuestion
                  v-for="(question, index) in day2"
                  :key="index"
                  :text="question.question"
                  :points="question.points"
                  :link="question.questionID"
                />
              </b-card-body>
            </b-collapse>
          </b-card>
          <!-- PostEvent -->
          <b-card no-body>
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-button
                v-if="!postEventLocked"
                block
                v-b-toggle.accordion-3
                variant="info"
              >
                Post event
                <span class="when-opened" />
                <span class="when-closed" />
              </b-button>
              <b-button
                v-else
                block
                v-b-toggle.accordion-3
                disabled
                variant="info"
              >
                Post event
                <span class="locked" />
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-3"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <ChallengesBoardQuestion
                  v-for="(question, index) in postEvent"
                  :key="index"
                  :text="question.question"
                  :points="question.points"
                  :link="question.questionID"
                />
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import data from "../assets/data/data.json";
import allBadges from "../assets/data/badges.json";

export default {
  data() {
    return {
      badges: [
        { badgeName: "partner-prodigy" },
        { badgeName: "data-dynamo" }
        // { badgeName: "infrastructure-intellectual" }
      ],
      earnedBadges: null,
      modalBadges: allBadges.badges,
      score: 20,
      scoreTotal: 500,
      locked: true,
      postEventLocked: true,
      questions: data.questions,
      day1: null,
      day2: null,
      postEvent: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      (this.earnedBadges = this.badges.map(badge => badge.badgeName)),
        (this.day1 = this.questions.filter(function(question) {
          return question.day === "1";
        }));

      this.day2 = this.questions.filter(function(question) {
        return question.day === "2";
      });

      this.postEvent = this.questions.filter(function(question) {
        return question.day === "postEvent";
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.challenge-container {
  max-width: 700px;
}

.link-nav {
  justify-content: space-between;
  display: flex;

  .rules {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      background-image: url("../static/svgs/arrow-back.svg");
      background-size: contain;
      height: 12px;
      width: 25px;
      content: "";
      background-position: left;
      background-repeat: no-repeat;

      a {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
  }

  .leaderboard {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      background-image: url("../static/svgs/arrow-next.svg");
      background-size: contain;
      height: 12px;
      width: 25px;
      content: "";
      background-position: right;
      background-repeat: no-repeat;

      a {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
  }

  a {
    font-family: "Segoe UI-semibold", sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0em;
    color: #ffffff;
  }
}

.intro-headline {
  font-family: "Segoe UI-semibold", sans-serif;
  font-size: 42px;
  font-style: normal;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
  margin: 30px 0;

  @media screen and (min-width: 768px) {
    max-width: 600px;
  }

  span {
    color: #ffb900;
    display: block;
  }
}

.intro-subtext {
  font-family: "Segoe UI", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
}

.badge-container {
  @media screen and (min-width: 767px) {
    padding: 0;

    .button-col {
      padding: 0;

      button {
        padding: 0;
      }
    }

    .badge-column {
      padding: 0;
    }

    .score-col {
      text-align: right;
      padding: 0;
    }
  }

  .badge-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 40px 0;

    @media screen and (max-width: 767px) {
      > div {
        margin: 0.5rem 0;
      }

      .badge-column {
        display: flex;
        justify-content: flex-start;
      }
    }

    .badge-icon {
      width: 50px;
      height: 50px;
      margin: 0 5px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      display: inline-block;
    }

    button,
    p {
      font-family: "Segoe UI-semibold", sans-serif;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 32px;
      letter-spacing: 0em;
      text-align: left;
      color: #ffffff;
      display: inline-flex;
      align-items: center;
      margin-bottom: 0;

      span {
        background-image: url("../static/svgs/arrow-next.svg");
        background-size: contain;
        height: 12px;
        width: 25px;
        content: "";
        background-position: right;
        background-repeat: no-repeat;
        margin-top: 6px;
      }
    }

    button {
      background: transparent;
      border: none;

      @media screen and (max-width: 767px) {
        padding: 0;
      }
    }
  }
}

.badge-modal-launch-button {
  &:hover {
    text-decoration: underline;
  }
}

.modal-badge-section {
  display: inline-grid;

  .modal-badge-icon {
    min-width: 80px;
    min-height: 90px;
    background-size: contain;
    background-position: center;
    margin: 0 10px;
    display: inline-block;
    background-repeat: no-repeat;
    filter: grayscale(1);
    margin: auto;

    &.earned {
      filter: none;
    }
  }

  .badge-name {
    font-family: "Segoe UI-semibold", sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: center;
    color: #000000;
    margin: 1rem 0;
  }

  .badge-description {
    font-family: "Segoe UI", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;
    color: #000000;
    margin-bottom: 30px;
  }
}

.notice-text {
  font-family: "Segoe UI", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
  margin: 50px 0;
}

.daily-challenges {
  margin-bottom: 2rem;

  .btn-info {
    background-color: #000000;
    border: none;
    border-radius: 0;
    font-family: "Segoe UI-semibold", sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
    padding: 30px 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:disabled {
      opacity: 1;
    }

    .locked {
      background-image: url("../static/svgs/locked.svg");
      background-size: contain;
      height: 40px;
      width: 40px;
      content: "";
      background-position: right;
      background-repeat: no-repeat;
    }

    &:focus {
      outline: 0;
      box-shadow: none;
    }
  }

  .card {
    border: none;
    border-radius: 0;
    background: transparent;
  }

  .card-body {
    background: rgba(3, 11, 17, 0.5);
    backdrop-filter: blur(50px);
  }
}

// The following code is to handle the separate carats for the accordion
.when-closed,
.when-opened {
  background-image: url("../static/svgs/arrow-next.svg");
  background-size: contain;
  height: 20px;
  width: 20px;
  content: "";
  background-position: right;
  background-repeat: no-repeat;
  margin-right: 8px;
}

.when-opened {
  transform: rotate(-90deg);
}

.when-closed {
  transform: rotate(90deg);
}

.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
