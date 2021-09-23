<template>
  <b-container fluid class="challenge-container backdrop-card">
    <b-row>
      <b-col sm="12" style="zIndex: 2">
        <b-row class="link-nav">
          <NuxtLink class="challenge-button" to="/challenges"
            >Challenge list <BIconList
          /></NuxtLink>
        </b-row>
        <h2 class="intro-headline">
          Leaderboard
        </h2>

        <div class="description-row">
          <p>
            Scores are refreshed every hour. Ranking is determined by total
            points value and speed.
          </p>
        </div>

        <div class="rank-row">
          <p class="intro-subtext">Your rank: {{ userRank }}</p>
          <p class="intro-subtext">{{ userPoints }} / {{ allPoints }}</p>
        </div>

        <b-table
          hover
          bordered
          dark
          :items="users"
          :tbody-tr-class="getRowClass"
        >
        </b-table>
      </b-col>
    </b-row>

    <b-row class="privacy-notice-footer">
      <privacy-notice />
    </b-row>
  </b-container>
</template>

<script>
import { BIcon, BIconList } from "bootstrap-vue";
import { mapState } from "vuex";
import MockAdapter from "axios-mock-adapter";
import PrivacyNotice from "./Privacy-Notice.vue";

export default {
  components: {
    BIcon,
    BIconList,
    PrivacyNotice
  },

  data() {
    return {
      limit: 10,
      allPoints: 500,
      mockUsers: [
        { position: 40, name: "Dickerson", points: 400 },
        { position: 21, name: "Larsen", points: 200 },
        { position: 89, name: "Geneva", points: 500 },
        { position: 38, name: "Jami", points: 300 },
        { position: 22, name: "Test User", points: 100 }
      ],
      users: [],
      //Axios mock adapter
      mock: null
    };
  },

  mounted() {
    this.setupMock();
    this.getLeaderboard();
  },

  computed: {
    name() {
      return `${this.firstName} ${this.lastName}`;
    },

    ...mapState("userinfo", ["userRank", "userPoints", "firstName", "lastName"])
  },

  methods: {
    setupMock() {
      this.mock = new MockAdapter(this.$axios);
      this.mock.onGet(`/api/Leaderboard/${this.limit}`).reply(200, {
        users: this.mockUsers
      });
    },

    getLeaderboard() {
      this.$axios
        .$get(`/api/Leaderboard/${this.limit}`)
        .then(response => {
          this.users = response.users;
        })
        .catch(error => {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    },

    getRowClass(item, type) {
      let returnClass = "";

      if (item && type === "row" && item.name === this.name) {
        returnClass = "light-row-highlight";
      }
      return returnClass;
    }
  }
};
</script>

<style lang="scss" scoped>
.challenge-container {
  max-width: 800px;
}

.link-nav {
  justify-content: flex-end;
  display: flex;

  @media screen and (min-width: 768px) {
    margin-right: 0;
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
}

.intro-headline {
  font-family: "Segoe UI-semibold", sans-serif;
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
  margin: 30px 0;
}

.rank-row {
  display: flex;
  justify-content: space-between;

  .intro-subtext {
    font-family: Segoe UI;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
    color: #ffffff;
  }
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

.description-row {
  color: white;
  font-size: 16px;
  margin-bottom: 50px;
}
</style>
