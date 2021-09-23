<template>
  <div class="background-div">
    <Questions
      :questionType="question.type"
      :question="question.question"
      :answers="question.answers"
      :pointValue="question.points"
      :correctAnswer="question.correctAnswer"
      :linkText="question.linkText"
      :question2="question.question2"
      :link="question.link"
      :day="question.day"
    />
  </div>
</template>

<script>
import data from "../assets/data/data.json";
export default {
  props: {
    questionID: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      question: data.questions[this.$route.query.questionID]
    };
  }
};
</script>

<style lang="scss" scoped>

</style>
