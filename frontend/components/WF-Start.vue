<template>
  <b-container fluid class="start-container">
    <b-row>
      <div class="backdrop-container" align-self="center">
        <b-container fluid>
          <b-row>
            <b-col sm="12" class="mb-5">
              <h1 class="intro-headline">Azure Play-in-a-Box Challenge</h1>
              <h2 class="box-headline mt-2">
                Helping your customers achieve more
              </h2>
              <b-row class="column-text-row">
                <b-col sm="12" class="column-text">
                  Participate in the Play-in-a-Box Challenge to learn more about
                  Microsoft Azure co-selling resources. Our go-to-market sales
                  play packages give you the tools you need to help your
                  customers reach their digital transformation goals. Watch
                  videos and prove your knowledge to earn points, badges, and
                  digital swag!
                </b-col>
              </b-row>
            </b-col>
            <b-col class="button-row mt-5">
              <b-button class="get-started-button mb-5">
                <NuxtLink to="/signup">Get started</NuxtLink>
              </b-button>
              <PrivacyNotice class="mt-5" />
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-row>
  </b-container>
</template>

<script>
export default {};
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
