<template>
  <b-container fluid>
    <b-row
      :class="{
        'completed-question': completed,
        'not-completed-question': !completed
      }"
      @click="!completed ? goToQuestion(link) : false"
    >
      <b-col sm="12" class="mb-4">
        <b-row align-v="center">
          <b-col v-if="completed" sm="1" class="completed-radio"> </b-col>
          <b-col v-else sm="1" class="not-completed-radio"> </b-col>
          <b-col sm="10">
            <p class="question-text" :class="{ completed: completed }">
              {{ text }}
            </p>
          </b-col>
          <b-col sm="1" class="p-0">
            <p v-if="completed" class="question-points">
              {{ points }} / {{ points }}
            </p>
            <p v-else class="question-points">0 / {{ points }}</p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    },
    points: {
      type: Number,
      default: ""
    },
    completed: {
      type: Boolean,
      default: false
    },
    link: {
      type: Number,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    goToQuestion(link) {
      this.$router.push({ path: "/questions", query: { questionID: link } });
    }
  }
};
</script>

<style lang="scss" scoped>
.completed-question {
  &:hover {
    pointer-events: none;
    cursor: none;
  }
}

.not-completed-question {
  &:hover {
    pointer-events: all;
    cursor: pointer;
  }
}

.completed-radio {
  background-image: url("../static/svgs/completed-radio.svg");
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
}

.not-completed-radio {
  background-image: url("../static/svgs/open-radio.svg");
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
}

@media screen and (max-width: 767px) {
  .align-items-center {
    flex-wrap: nowrap;
  }
}

.question-text {
  font-family: "Segoe UI-semibold", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
  margin-bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 75ch;

  &.completed {
    opacity: 0.6;
  }
}

.question-points {
  font-family: "Segoe UI-semibold", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffb900;
  margin-bottom: 0;

  @media screen and (max-width: 767px) {
    display: none;
  }
}
</style>
