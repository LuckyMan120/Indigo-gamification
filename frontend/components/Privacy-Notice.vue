<template>
  <b-container fluid>
    <b-row>
      <div class="privacy-container">
        <p class="primary">
          Microsoft privacy notice
        </p>
        <p class="secondary">
          Microsoft collects data from you via this conference app that may be
          posted on Microsoft Teams and on social media. You provide some of
          this data directly, and we get some of it by collecting data about
          your interactions, use, and experiences. Please see the
          <a href="https://privacy.microsoft.com/privacystatement"
            >Microsoft Privacy Statement</a
          >
          for full details and information.
        </p>
      </div>
    </b-row>
  </b-container>
</template>

<style lang="scss" scoped>
.privacy-container {
  position: relative;
  z-index: 2;
}

.primary {
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  margin-bottom: 12.7px;
}

.secondary {
  font-weight: lighter;
  font-size: 16px;
  font-style: normal;
  line-height: 21px;
  color: #ffffff;

  a {
    color: #ffffff;
    text-decoration: underline;

    &:hover {
      color: #ffb900;
    }
  }
}
</style>
