<template>
  <div class="login">
    <h1>Login</h1>
    <div class="links">
      <router-link to="/user/login"><a class="active">Login</a></router-link>
      <!-- <router-link to="/user/register"><a>Register</a></router-link> -->
    </div>
    <form class="ajax-form" action="/" method="post">
      <label for="username">
        <i class="fas fa-user"></i>
      </label>
      <input
        type="text"
        name="username"
        placeholder="Username"
        id="username"
        v-model="username"
        required
      /> 
      <label for="password">
        <i class="fas fa-lock"></i>
      </label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        id="password"
        v-model="password"
        required
      />
      <label id="rememberme">
        <input type="checkbox" name="rememberme" v-model="rememberme" />Remember me
      </label>
      <div class="msg">{{ msg }}</div>
      <input type="button" value="Login" @click="login" />
    </form>
    <div>
      <b-alert
        id="b-alert"
        style="background-color: #1bb240; width: 15%"
        :show="dismissCountDown"
        dismissible
        variant="info"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        <h5 style="color: white">{{ alertTitle }}</h5>
        <p style="color: white; font-size: 15px">{{ alertContent }}</p>
      </b-alert>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import Vue from 'vue'
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);


export default {
  name: "app",
  components: {},

  data() {
    return {
      dismissSecs: 2,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      alertTitle: "",
      alertContent: "",
      username : "",
      password : "",
      rememberme : false,
      msg : "",
    };
  },

  methods: {
    login() {
      
      if(this.username == "")
      {
        this.alertTitle = "Invalid input";
        this.alertContent = "Please input user name";
        this.showAlert();
        return;
      }else if(this.password == ""){
        this.alertTitle = "Invalid input";
        this.alertContent = "Please input password";
        this.showAlert();
        return;
      }

      const formData = new FormData();
      formData.append("username", this.username);
      formData.append("password", this.password);
      formData.append('rememberme', this.rememberme)

      axios.post(this.store + "/login", formData).then((res) => {
        if(res['data']['state'] == "success")
        {
          localStorage.setItem('user', res['data'])
          window.location.href = "/";
        }
        else{
          this.msg = res['data'];
        }
      });
      
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },

  metaInfo: {
    title: "Login",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
};
</script>

<style scoped>
@import url("https://use.fontawesome.com/releases/v5.7.1/css/all.css");
@import "../assets/css/style.css";
</style>