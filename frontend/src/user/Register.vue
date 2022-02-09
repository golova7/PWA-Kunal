<template>
  <div class="register">
			<h1>Register</h1>
			<div class="links">
				<router-link to="/user/login"><a>Login</a></router-link>
				<router-link to="/user/register"><a class="active">Register</a></router-link>
			</div>
			<form class="ajax-form" action="/register" method="post" autocomplete="off">
				<label for="username">
					<i class="fas fa-user"></i>
				</label>
				<input type="text" name="username" placeholder="Username" id="username" v-model="username" required>
				<label for="password">
					<i class="fas fa-lock"></i>
				</label>
				<input type="password" name="password" placeholder="Password" id="password" v-model="password" required>
				<label for="email">
					<i class="fas fa-envelope"></i>
				</label> 
				<input type="email" name="email" placeholder="Email" id="email" v-model="email" required>
				<div class="msg">{{ msg }}</div>
				<input type="button" value="Register" @click="register">
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
      email : "",
      msg : "",
    };
  },
  methods: {
    register() {
      
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
      }else if(this.email == ""){
        this.alertTitle = "Invalid email";
        this.alertContent = "Please input email";
        this.showAlert();
        return;
      }

      const formData = new FormData();
      formData.append("file", this.selectedFile); // appending file

      formData.append("username", this.username);
      formData.append("password", this.password);
      formData.append("email", this.email);

      axios.post(this.store + "/register", formData).then((res) => {
        this.msg = res['data'];
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
    title: "Sign up",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
};
</script>

<style scoped>
 .container-btns{
   height: 65px;
 }
</style>


