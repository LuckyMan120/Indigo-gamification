 <template>
  <b-container fluid class="start-container">
    <b-row>
       <div class="backdrop-container" align-self="center">
        <h1 class="intro-headline">Registration</h1>
        <h2 class="box-headline mt-2">
          Please fill in the following fields:
        </h2>
        <p class="notice-text">*Indicated required field</p>
        <b-container fluid>
          <b-row>
            <b-col sm="12">
              <b-row class="form" :class="this.errors ? 'errors' : false">
                <b-form-input
                  v-model="name"
                  placeholder="Full name*"
                  required
                  type="text"
                ></b-form-input>
                <b-form-input
                  v-model="company"
                  placeholder="Company*"
                  required
                  type="text"
                ></b-form-input>

                <b-form-input
                  v-model="email"
                  placeholder="Company email:* "
                  required
                  type="email"
                ></b-form-input>
                <b-form-input
                  v-model="partnerId"
                  placeholder="Microsoft Partner Network ID:* "
                  type="text"
                ></b-form-input>
              </b-row>
            </b-col>
             <p v-if="errors.length" class="validation-text">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                </p>
            <b-col sm="12" class="button-row">
              <b-row>
                <b-button sm="4" class="go-back-button">
                  <NuxtLink to="/instructions">Back</NuxtLink>
                </b-button>
                <b-button sm="4" class="get-started-button" @click="checkForm" v-if="canMoveForward"
>
                  Register
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
  data() {
    return {
      errors: [],
      name: null,
      company: null,
      email: null,
      businessPhone: null,
      partnerId: null,
    };
  },
  computed: {
    canMoveForward: function() {
      return (
        this.name &&
        this.company &&
        this.email &&
        this.partnerId
      );
    }
  },
  methods: {
    checkForm: function(e) {
      this.errors = [];

      if (!this.name) {
        this.errors.push("Name required.");
      } else if (!this.validString(this.name)) {
        this.errors.push("Valid name required.");
      }


      if (!this.company) {
        this.errors.push("Company required.");
      } else if (!this.validString(this.company)) {
        this.errors.push("Valid company required.");
      }

      if (!this.email) {
        this.errors.push("Email required.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("Valid email required.");
      }

      if (!this.partnerId) {
        this.errors.push("Microsoft Partner Network ID.");
      } 


      if (!this.errors.length) {
        this.saveUser();
      }

      e.preventDefault();
    },
    validEmail: function(email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validString: function(aString) {
      let re = /(.|\s)*\S(.|\s)*/;
      return re.test(aString);
    },
    saveUser() {
      this.$axios
        .$post("/api/Register", {
          full_name: this.name,
          company: this.company,
          partnerId: this.partnerId,
          email: this.email,
        })
        .then(response => {
          this.$router.push("/instructions");
        })
        .catch(error => {
          this.$router.push("/instructions");
          //TODO: Until register is ready only redirect to instructions
          // if (error.response) {
          //   alert(error.response.data.message);
          // }
        });
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (navigator.platform.indexOf("Win") > -1) {
        const optionArray = Array.from(document.querySelectorAll("option"));
        optionArray.map(option => {
          option.style.color = "#3f1a9a";
        });
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.start-container {
  max-width: 880px;
}
.form {
  .form-control {
    background: transparent;
    border: none;
    border-bottom: 1px solid #ffffff;
    color: #ffffff;
    font-weight: lighter !important;
    font-size: 16px;
    line-height: 21px;
    margin: 20px 0;
    padding: 0;
    border-radius: 0;

    &::placeholder {
      color: #ffffff;
      font-family: "Segoe UI", sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: 0em;
      text-align: left;
    }
  }

  .errors {
    :invalid {
      outline: 2px solid red;
    }
  }
}

.custom-select {
  background: transparent url("../static/svgs/arrow-down.svg") right 0.75rem
    center/8px 10px no-repeat;
  border: none;
  border-bottom: 1px solid #ffffff;
  color: #ffffff;
  margin: 20px 0;
}



  .validation-text {
    font-family: "Segoe UI-semibold", sans-serif;
    font-size: 14px;
    font-style: normal;

    font-weight: lighter;
    line-height: 27px;
    color: #ffffff;
    padding: 0;
  }


.notice-text {
  font-family: "Segoe UI", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: lighter;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;

  a {
    color: #ffffff;
    text-decoration: underline;
  }
}
.button-row {
  margin-top: 40px;
  @media screen and (max-width: 831px) {
    > .row {
      display: grid;
      justify-content: center;
    }
  }
}
</style>
