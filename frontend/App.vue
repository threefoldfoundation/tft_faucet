<template>
  <v-app id="inspire">
    <div>
      <v-img class="logo1" src="./assets/3logo.png" />
    </div>
    <v-main fill-height>
      <v-layout justify-center fill-height>
        <v-layout column align-center justify-center>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="3" sm="4" md="6" lg="12">
                <!-- <v-img class="logo" src="./assets/faucet-logo.png" /> -->
                <div class="header">
                  <h1>Get TFT's</h1>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <div class="content">
              <div class>
                <v-text-field
                  v-model="address"
                  label="Enter Stellar address here"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
                <p
                  v-if="error"
                  id="errortext"
                >This address probably does not exist or does not have a trustline with the issuer of our Stellar TFT. Or this address might already have requested tokens before!</p>
              </div>
              <br />
              <br />
              <p>Enter a valid Stellar address to receive TFT, this address must have a trustline to the TFT issuer! You will only be able to receive tokens once.</p>
              <br />
              <br />
              <v-btn
                outlined
                color="#333333"
                class="ma-2"
                :loading="loading"
                :disabled="loading || address === ''"
                v-on:click="fundAddress()"
              >Receive your TFT</v-btn>
            </div>
          </v-container>
        </v-layout>
      </v-layout>
    </v-main>
  </v-app>
</template>

<script>
module.exports = {
  data() {
    return {
      error: false,
      address: "",
      loading: false,
      rules: [],
    };
  },

  methods: {
    fundAddress() {
      this.loading = true;
      this.error = false;

      this.$api
        .fundAccount(this.address)
        .then((res) => {
          if (res.status == 200) {
            this.loading = false;
            // this.$toasted.success("Address funded successfully")
          } else {
            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err.meta);
          this.error = true;
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped>
#errortext {
  color: red;
}
#inspire {
  width: 1200px;
}
h1 {
  font-family: "Bebas Neue", cursive;
  color: #333333;
  font-size: 100px;
}
p {
  font-family: "Lato", sans-serif;
}
.title {
  font-family: "Lato", sans-serif;
}

.header {
  margin: auto;
  width: 50%;
  height: 50%;
  text-align: center;
}

.content {
  margin: auto;
  width: 43%;
  height: 80%;
  text-align: center;
}

.logo {
  width: 30%;
  height: 30%;
  margin: auto;
}

.logo1 {
  width: 40px;
  height: 40px;
  margin-left: 50px;
  margin-top: 20px;
}

@media screen and (max-width: 400px) {
  .logo {
    width: 60%;
    height: 60%;
    margin: auto;
  }
  .content {
    margin: auto;
    width: 80%;
    height: 80%;
    text-align: center;
  }
  h1 {
    font-size: 50px;
  }
}

@media screen and (max-width: 800px) {
  .logo {
    width: 60%;
    height: 60%;
    margin: auto;
  }
  .content {
    margin: auto;
    width: 80%;
    height: 80%;
    text-align: center;
  }
  h1 {
    font-size: 50px;
  }
}
</style>