<template style="width:100%">
  <div class="loggedin">
		<nav class="navtop">
			<div>
				<h1>Kunal Website</h1>
        <a href="/home"><i class="fas fa-home"></i>Home</a>
				<!-- <a href="/profile"><i class="fas fa-user-circle"></i>Profile</a> -->
				<a href="" @click="logout"><i class="fas fa-sign-out-alt"></i>Logout</a>
			</div>
		</nav>
		<div class="content" style="width:100%;margin-top: -20px;background-color: white;">
    <div style="margin-left: 6%; margin-right: 6%">
      <h1 style="color: #28a745" align="center">
        PWA Builder
        <button
          type="button"
          id="hideModal"
          class="col-md-6 btn btn-success btn-lg waves-effect waves-light"
          style="max-width: 16% !important; height: 50px !important"
          @click="$bvModal.hide('bv-modal-example')"
          hidden
        >
          {{ buildPWA }}
        </button>
      </h1>

      <div class="help">
        <div class="question">?</div>

        <div class="popup">
          <h3>Manifest Elements?</h3>
          <p>
            <strong>Name and Short name</strong><br />
            You must provide at least the short_name or name property. If both are
            provided, short_name is used on the user's home screen, launcher, or
            other places where space may be limited. name is used when the app is
            installed.
          </p>

          <p>
            <strong>Theme color and Background color</strong><br />
            The theme_color sets the color of the tool bar, and may be reflected
            in the app's preview in task switchers.<br />
            The background_color should be the same color as the load page, to
            provide a smooth transition from the splash screen to your app.
          </p>
          <p>
            <strong>Display and Description</strong><br />
            Web apps can choose how they are displayed by setting a display mode
            in their manifest. <br>Browsers are not required to support all display
            modes, but they are required to support the spec-defined fallback
            chain ("fullscreen" → "standalone" → "minimal-ui" → "browser"). <br>If
            they don't support a given mode, they fall back to the next display
            mode in the chain.
            <br>
            The description property describes the purpose of your app.
          </p>

          <p>
            <strong>Scope and Start url</strong><br />
            The scope url defines the set of URLs that the browser considers to be
            within your app, and is used to decide when the user has left the
            app.<br />
            The scope controls the URL structure that encompasses all the entry
            and exit points in your web app. <br />Your start_url must reside
            within the scope. <br />The start_url is required and tells the
            browser where your application should start when it is launched, and
            prevents the app from starting on whatever page the user was on when
            they added your app to their home screen.
          </p>
        </div>
      </div>

      <br /><br />
      <div class="row">
        <div class="col m6 s12">
          <dashboard
            id="dashboard"
            :uppy="uppy"
            :props="{ inline: true }"
            :plugins="['GoogleDrive', 'Dropbox', 'Instagram', 'Url', 'OneDrive']"
          />
          <br /><br />
          <div>
            <h5>manifest.json Preview</h5>
            <div style="background-color: #f2f2f2; width: 85%">
              <pre>{{
                Object.fromEntries(
                  Object.entries({
                    name,
                    short_name,
                    theme_color,
                    background_color,
                    display,
                    description,
                    scope,
                    start_url,
                  }).filter(([key, value]) => !!value),
                  null,
                  4
                )
              }}</pre>
            </div>
          </div>
        </div>
        <div class="col m6 s12 row">
          <div class="row">
            <h4 class="col-md-12 col-sm-12" align="center">Building Status</h4>
          </div>
          <br /><br /><br />
          <form id="form">
            <b-form-group style="margin-bottom: 0px">
              <div
                class="container row"
                id="progressbar"
                style="margin-bottom: 0px"
              >
                <label
                  class="col-md-3"
                  style="margin-bottom: 0px; color: #ff0000; font-size: 15px"
                  align="center"
                  >Checking Files</label
                >
                <label
                  class="col-md-3"
                  style="margin-bottom: 0px; color: #ae00ff; font-size: 15px"
                  align="center"
                  >Integrating Files</label
                >
                <label
                  class="col-md-3"
                  style="margin-bottom: 0px; color: #0062ff; font-size: 15px"
                  align="right"
                  >Building Icons</label
                >
                <label
                  class="col-md-3"
                  style="margin-bottom: 0px; color: #04ff00; font-size: 15px"
                  align="right"
                  >Building Manifest</label
                >
              </div>
            </b-form-group>
            <b-form-group>
              <div class="container" id="progressbar">
                <b-progress
                  :value="progress"
                  variant="success"
                  striped
                  :animated="animate"
                  style="background-color: #d1e0e0"
                ></b-progress>
              </div>
            </b-form-group>
            <b-form-group>
              <div class="input-field col s12 l6">
                <b-form-input
                  v-model="name"
                  name="short_name"
                  type="text"
                  class="validate"
                  style="width: 335px"
                ></b-form-input>
                <label for="name" autofocus="" class="active">*Name</label>
              </div>
              <div class="input-field col s12 l6">
                <b-form-input
                  v-model="short_name"
                  name="short_name"
                  type="text"
                  class="validate"
                  style="width: 335px"
                ></b-form-input>
                <label for="short_name" class="active">*Short Name</label>
              </div>
            </b-form-group>

            <b-form-group>
              <div class="input-field col s12 l6" style="margin-top: 30px">
                <label class="active" style="padding-bottom: 10px !important"
                  >Theme Color</label
                >
                <div class="input-group color-picker">
                  <span class="input-group-addon color-picker-container"
                    ><input
                      type="color"
                      v-model="theme_color"
                      style="width: 30px; margin-right: 10px"
                    />
                    <!----></span
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="theme_color"
                    style="height: 25px"
                  />
                </div>
              </div>
              <div class="input-field col s12 l6" style="margin-top: 30px">
                <label class="active" style="padding-bottom: 10px !important"
                  >*Background Color</label
                >
                <div class="input-group color-picker">
                  <span class="input-group-addon color-picker-container"
                    ><input
                      type="color"
                      v-model="background_color"
                      style="width: 30px; margin-right: 10px"
                    />
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="background_color"
                    style="height: 25px"
                  />
                </div>
              </div>
            </b-form-group>

            <b-form-group>
              <div class="input-field col s12 l6">
                <label for="display" style="font-color: black; font-size: 13px"
                  >Display Mode</label
                >
                <b-form-select
                  id="display"
                  name="display"
                  style="margin-top: 70px"
                  v-model="display"
                  :options="DisplayOptions"
                  class="form-control"
                ></b-form-select>
              </div>

              <div class="input-field col s12 l6">
                <label
                  for="description"
                  style="font-color: black; font-size: 13px"
                  >Description</label
                ><br /><br />
                <b-form-input
                  v-model="description"
                  name="description"
                  type="text"
                  style="width: 335px"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group>
              <div class="input-field col s12 l6 mono">
                <input
                  id="scope"
                  v-model="scope"
                  name="scope"
                  type="text"
                  class="validate"
                  style="width: 335px"
                  disabled
                />
                <label for="scope" class="active">Application Scope</label>
              </div>

              <div class="input-field col s12 l6 mono">
                <input
                  id="start_url"
                  v-model="start_url"
                  name="start_url"
                  type="text"
                  class="validate"
                  style="width: 335px"
                />
                <label for="start_url" class="active">*Start URL</label>
              </div>
            </b-form-group>
            <b-form-group>
              <section class="row padding:10px !important">
                <div class="col-md-6"></div>

                <button
                  type="button"
                  class="col-md-6 btn btn-info btn-lg waves-effect waves-light"
                  style="
                    margin-top: 20px;
                    max-width: 46% !important;
                    height: 50px !important;
                  "
                  v-if="resetState"
                  @click="resetAll"
                >
                  Reset
                </button>

                <button
                  type="button"
                  class="col-md-6 btn btn-success btn-lg waves-effect waves-light"
                  style="
                    margin-top: 20px;
                    max-width: 46% !important;
                    height: 50px !important;
                  "
                  v-if="buttonState && !resetState"
                  @click="$bvModal.show('bv-modal-example')"
                >
                  {{ buildPWA }}
                </button>

                <button
                  type="button"
                  class="col-md-6 btn btn-primary btn-lg waves-effect waves-light"
                  style="
                    margin-top: 20px;
                    max-width: 46% !important;
                    height: 50px !important;
                  "
                  v-if="!buttonState && !resetState"
                  @click="onUploadFile"
                >
                  <div v-if="!isHidden">
                    <b-spinner
                      v-for="variant in variants"
                      :variant="variant"
                      :key="variant"
                    ></b-spinner>
                  </div>
                  {{ buildPWA }}
                </button>
              </section>
            </b-form-group>
            <div>
              <b-modal id="bv-modal-example" hide-footer>
                <template #modal-title> INSTALL OPTION </template>
                <div class="row d-block text-center" style="margin-top: 5%">
                  <b-button
                    class="col-md-5 col-sm-5 btn btn-success"
                    @click="download"
                    style="margin-right: 5%; margin-bottom: 10px"
                    >Download</b-button
                  >
                  <b-button
                    class="col-md-5 col-sm-5 btn btn-success"
                    @click="installPWA"
                    style="margin-bottom: 10px"
                    >Install</b-button
                  >
                </div>
              </b-modal>
            </div>
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
      </div>
    </div>
  </div>
  </div>
</template>

<script src="https://unpkg.com/vue"></script>
<script src="../assets/js/progressBar.js"></script>
<script>
import Vue from "vue";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/vue";
import GoogleDrive from "@uppy/google-drive";
import Dropbox from "@uppy/dropbox";
import Instagram from "@uppy/instagram";
import Link from "@uppy/url";
import OneDrive from "@uppy/onedrive";
import axios from "axios";

import VModal from "vue-js-modal";
Vue.use(VModal, { componentName: "InstallOption" });

export default {
  name: "App",
  components: {
    Dashboard,
  },
  beforeMount() {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    global.page_key = result;
    // global.page_key = Math.ceil(Math.random() * 10000) + 9999;
    // global.API_path = "http://localhost:3000";
    global.API_path = "https://insytdev.com";
    // global.API_path = "https://188.166.156.243";
  },
  computed: {
    uppy: () =>
      new Uppy()
        .use(Dropbox, { companionUrl: "https://companion.uppy.io" })
        .use(GoogleDrive, { companionUrl: "https://companion.uppy.io" })
        .use(Link, { companionUrl: "https://companion.uppy.io" })
        .use(OneDrive, { companionUrl: "https://companion.uppy.io" })
        .use(Tus, {
          endpoint: global.API_path + `/api/file_upload`,
          headers: { page_key: global.page_key },
        }),
  },
  beforeDestroy() {
    this.uppy.close();
  },
  data() {
    return {
      variants: ["light"],
      isHidden: true,

      dismissSecs: 2,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      alertTitle: "",
      alertContent: "",

      progress: 0,
      completed: false,
      tempo: 80,

      animate: true,
      resetState: false,
      buttonState: false,
      buildPWA: "START BUILDING",
      name: "",
      short_name: "",
      display: "standalone",
      description: "",
      scope: "",
      start_url: "",
      theme_color: "#5cb85c",
      background_color: "#5cb85c",
      DisplayOptions: [
        { value: "browser", text: "browser" },
        { value: "standalone", text: "standalone" },
        { value: "minimal UI", text: "minimal UI" },
        { value: "fullscreen", text: "fullscreen" },
      ],
      progress: 0,
      open: false,
    };
  },
  mounted() {},
  methods: {
    logout()
    {
          localStorage.removeItem('user');
          window.location.href = "/user/login";
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    handleClose() {
      this.open = false;
    },
    onFileChange(e) {
      const selectedFile = e.target.files[0]; // accessing file
      this.selectedFile = selectedFile;
    },
    timer(tempo) {
      this.setIntervalRef = setInterval(() => {
        this.progress++;
        if (this.progress == 100) {
          clearInterval(this.setIntervalRef);
          this.completed = true;
        }
      }, tempo);
    },
    resetAll() {
      window.location.reload();
    },
    onUploadFile() {
      if (this.name == "") {
        this.alertTitle = "Invalid input";
        this.alertContent = "Please input name";
        this.showAlert();
        return;
      } else if (this.short_name == "") {
        this.alertTitle = "Invalid input";
        this.alertContent = "Please input short name";
        this.showAlert();
        return;
      } else if (this.start_url == "" || this.start_url != "index.html") {
        this.alertTitle = "Invalid input";
        this.alertContent = "Please input 'index.html' as start url";
        this.showAlert();
        return;
      }

      const formData = new FormData();
      formData.append("file", this.selectedFile); // appending file

      formData.append("name", this.name);
      formData.append("short_name", this.short_name);
      formData.append("theme_color", this.theme_color);
      formData.append("background_color", this.background_color);
      formData.append("display", this.display);
      formData.append("description", this.description);
      formData.append("scope", this.scope);
      formData.append("start_url", this.start_url);
      formData.append("page_key", global.page_key);

      axios.post(global.API_path + "/api/check_state", formData).then((res) => {
        if (res.data["name"] == "success") {
          this.timer(this.tempo);
          this.buildPWA = "";
          this.isHidden = false;
          axios
            .post(global.API_path + "/api/upload", formData)
            .then((res) => {
              if (res.data["name"] == "success") {
                this.progress = 100;

                this.progressTimer = setInterval(() => {
                  this.buttonState = true;
                  this.buildPWA = "Install PWA";
                  this.isHidden = true;

                  this.alertTitle = "Building Success";
                  this.alertContent = "PWA builded for " + this.name;
                  this.showAlert();
                  clearInterval(this.progressTimer);
                }, 1300);
              } else {
                this.alertTitle = "Building Error";
                this.alertContent = res.data["name"];
                this.showAlert();
                return;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.alertTitle = "File Missing";
          this.alertContent = "Please upload " + res.data["name"];
          this.showAlert();
          return;
        }
      });
      // sending file to the backend
    },
    download() {
      const formData = new FormData();
      formData.append("name", this.short_name);
      formData.append("page_key", global.page_key);
      axios
        .post(global.API_path + "/api/download", formData)
        .then((res) => {
          console.log(res.data["name"]);
          const link = document.createElement("a");
          link.href = global.API_path + res.data["path"];
          link.download = res.data["name"] + `.zip`;
          link.click();
          URL.revokeObjectURL(link.href);

          //////////button state set default//////////////
          this.buttonState = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    installPWA() {
      this.resetState = true;
      document.getElementById("hideModal").click();

      const link = document.createElement("a");
      link.href = global.API_path + `/public/${global.page_key}/index.html`;
      link.target = "_blank";
      link.click();
      URL.revokeObjectURL(link.href);
    },
  },
};
</script> 
<style scoped>
@import url("https://use.fontawesome.com/releases/v5.7.1/css/all.css");
@import "../assets/css/style.css";
/* @import url('https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.css'); */

 
/**
 * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`
 *    and `video` controls.
 * 2. Correct inability to style clickable `input` types in iOS.
 * 3. Improve usability and consistency of cursor style between image-type
 *    `input` and others.
 */
/* 1 */
html input[type="button"],
button,
input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button;
  /* 2 */
  cursor: pointer;
  /* 3 */
}

#b-alert {
  z-index: 100;
}

/**
 * Re-set default cursor for disabled elements.
 */
button[disabled],
html input[disabled] {
  cursor: default;
}

/**
 * Remove inner padding and border in Firefox 4+.
 */
button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}

/**
 * Address Firefox 4+ setting `line-height` on `input` using `!important` in
 * the UA stylesheet.
 */
input {
  line-height: normal;
}

/**
 * It's recommended that you don't attempt to style these elements.
 * Firefox's implementation doesn't respect box-sizing, padding, or width.
 *
 * 1. Address box sizing set to `content-box` in IE 8/9/10.
 * 2. Remove excess padding in IE 8/9/10.
 */
input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  /* 1 */
  padding: 0;
  /* 2 */
}

/**
 * Fix the cursor style for Chrome's increment/decrement buttons. For certain
 * `font-size` values of the `input`, it causes the cursor style of the
 * decrement button to change from `default` to `text`.
 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Address `appearance` set to `searchfield` in Safari and Chrome.
 * 2. Address `box-sizing` set to `border-box` in Safari and Chrome
 *    (include `-moz` to future-proof).
 */
input[type="search"] {
  -webkit-appearance: textfield;
  /* 1 */
  /* 2 */
  box-sizing: content-box;
}

/**
 * Remove inner padding and search cancel button in Safari and Chrome on OS X.
 * Safari (but not Chrome) clips the cancel button when the search input has
 * padding (and `textfield` appearance).
 */
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

.no-select, input[type=range], input[type=range] + .thumb {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.no-select, input[type=range], input[type=range] + .thumb {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}


.mdi-action-settings-input-antenna:before {
  content: "\e668";
}

.mdi-action-settings-input-component:before {
  content: "\e669";
}

.mdi-action-settings-input-composite:before {
  content: "\e66a";
}

.mdi-action-settings-input-hdmi:before {
  content: "\e66b";
}

.mdi-action-settings-input-svideo:before {
  content: "\e66c";
}


nav .input-field {
  margin: 0;
}

nav .input-field input {
  height: 100%;
  font-size: 1.2rem;
  border: none;
  padding-left: 2rem;
}

nav .input-field input:focus, nav .input-field input[type=text]:valid, nav .input-field input[type=password]:valid, nav .input-field input[type=email]:valid, nav .input-field input[type=url]:valid, nav .input-field input[type=date]:valid {
  border: none;
  box-shadow: none;
}

nav .input-field label {
  top: 0;
  left: 0;
}

nav .input-field label i {
  color: rgba(255, 255, 255, 0.7);
  transition: color .3s;
}

nav .input-field label.active i {
  color: #fff;
}

nav .input-field label.active {
  -webkit-transform: translateY(0);
          transform: translateY(0);
}


.waves-effect input[type="button"], .waves-effect input[type="reset"], .waves-effect input[type="submit"] {
  border: 0;
  font-style: normal;
  font-size: inherit;
  text-transform: inherit;
  background: none;
}

.waves-notransition {
  transition: none !important;
}

.waves-circle {
  -webkit-transform: translateZ(0);
          transform: translateZ(0);
  -webkit-mask-image: -webkit-radial-gradient(circle, white 100%, black 100%);
}

.waves-input-wrapper {
  border-radius: 0.2em;
  vertical-align: bottom;
}

.waves-input-wrapper .waves-button-input {
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
}


/***************************
   Text Inputs + Textarea
****************************/
::-webkit-input-placeholder {
  color: #d1d1d1;
}

:-moz-placeholder {
  /* Firefox 18- */
  color: #d1d1d1;
}

::-moz-placeholder {
  /* Firefox 19+ */
  color: #d1d1d1;
}

:-ms-input-placeholder {
  color: #d1d1d1;
}

input:not([type]),
input[type=text],
input[type=password],
input[type=email],
input[type=url],
input[type=time],
input[type=date],
input[type=datetime-local],
input[type=tel],
input[type=number],
input[type=search],
textarea.materialize-textarea {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #9e9e9e;
  border-radius: 0;
  outline: none;
  height: 3rem;
  width: 100%;
  font-size: 1rem;
  margin: 0 0 15px 0;
  padding: 0;
  box-shadow: none;
  box-sizing: content-box;
  transition: all .3s;
}

input:not([type]):disabled, input:not([type])[readonly="readonly"],
input[type=text]:disabled,
input[type=text][readonly="readonly"],
input[type=password]:disabled,
input[type=password][readonly="readonly"],
input[type=email]:disabled,
input[type=email][readonly="readonly"],
input[type=url]:disabled,
input[type=url][readonly="readonly"],
input[type=time]:disabled,
input[type=time][readonly="readonly"],
input[type=date]:disabled,
input[type=date][readonly="readonly"],
input[type=datetime-local]:disabled,
input[type=datetime-local][readonly="readonly"],
input[type=tel]:disabled,
input[type=tel][readonly="readonly"],
input[type=number]:disabled,
input[type=number][readonly="readonly"],
input[type=search]:disabled,
input[type=search][readonly="readonly"],
textarea.materialize-textarea:disabled,
textarea.materialize-textarea[readonly="readonly"] {
  color: rgba(0, 0, 0, 0.26);
  border-bottom: 1px dotted rgba(0, 0, 0, 0.26);
}

input:not([type]):disabled + label, input:not([type])[readonly="readonly"] + label,
input[type=text]:disabled + label,
input[type=text][readonly="readonly"] + label,
input[type=password]:disabled + label,
input[type=password][readonly="readonly"] + label,
input[type=email]:disabled + label,
input[type=email][readonly="readonly"] + label,
input[type=url]:disabled + label,
input[type=url][readonly="readonly"] + label,
input[type=time]:disabled + label,
input[type=time][readonly="readonly"] + label,
input[type=date]:disabled + label,
input[type=date][readonly="readonly"] + label,
input[type=datetime-local]:disabled + label,
input[type=datetime-local][readonly="readonly"] + label,
input[type=tel]:disabled + label,
input[type=tel][readonly="readonly"] + label,
input[type=number]:disabled + label,
input[type=number][readonly="readonly"] + label,
input[type=search]:disabled + label,
input[type=search][readonly="readonly"] + label,
textarea.materialize-textarea:disabled + label,
textarea.materialize-textarea[readonly="readonly"] + label {
  color: rgba(0, 0, 0, 0.26);
}

input:not([type]):focus:not([readonly]),
input[type=text]:focus:not([readonly]),
input[type=password]:focus:not([readonly]),
input[type=email]:focus:not([readonly]),
input[type=url]:focus:not([readonly]),
input[type=time]:focus:not([readonly]),
input[type=date]:focus:not([readonly]),
input[type=datetime-local]:focus:not([readonly]),
input[type=tel]:focus:not([readonly]),
input[type=number]:focus:not([readonly]),
input[type=search]:focus:not([readonly]),
textarea.materialize-textarea:focus:not([readonly]) {
  border-bottom: 1px solid #26a69a;
  box-shadow: 0 1px 0 0 #26a69a;
}

input:not([type]):focus:not([readonly]) + label,
input[type=text]:focus:not([readonly]) + label,
input[type=password]:focus:not([readonly]) + label,
input[type=email]:focus:not([readonly]) + label,
input[type=url]:focus:not([readonly]) + label,
input[type=time]:focus:not([readonly]) + label,
input[type=date]:focus:not([readonly]) + label,
input[type=datetime-local]:focus:not([readonly]) + label,
input[type=tel]:focus:not([readonly]) + label,
input[type=number]:focus:not([readonly]) + label,
input[type=search]:focus:not([readonly]) + label,
textarea.materialize-textarea:focus:not([readonly]) + label {
  color: #26a69a;
}

input:not([type]).valid, input:not([type]):focus.valid,
input[type=text].valid,
input[type=text]:focus.valid,
input[type=password].valid,
input[type=password]:focus.valid,
input[type=email].valid,
input[type=email]:focus.valid,
input[type=url].valid,
input[type=url]:focus.valid,
input[type=time].valid,
input[type=time]:focus.valid,
input[type=date].valid,
input[type=date]:focus.valid,
input[type=datetime-local].valid,
input[type=datetime-local]:focus.valid,
input[type=tel].valid,
input[type=tel]:focus.valid,
input[type=number].valid,
input[type=number]:focus.valid,
input[type=search].valid,
input[type=search]:focus.valid,
textarea.materialize-textarea.valid,
textarea.materialize-textarea:focus.valid {
  border-bottom: 1px solid #4CAF50;
  box-shadow: 0 1px 0 0 #4CAF50;
}

input:not([type]).valid + label:after,
input:not([type]):focus.valid + label:after,
input[type=text].valid + label:after,
input[type=text]:focus.valid + label:after,
input[type=password].valid + label:after,
input[type=password]:focus.valid + label:after,
input[type=email].valid + label:after,
input[type=email]:focus.valid + label:after,
input[type=url].valid + label:after,
input[type=url]:focus.valid + label:after,
input[type=time].valid + label:after,
input[type=time]:focus.valid + label:after,
input[type=date].valid + label:after,
input[type=date]:focus.valid + label:after,
input[type=datetime-local].valid + label:after,
input[type=datetime-local]:focus.valid + label:after,
input[type=tel].valid + label:after,
input[type=tel]:focus.valid + label:after,
input[type=number].valid + label:after,
input[type=number]:focus.valid + label:after,
input[type=search].valid + label:after,
input[type=search]:focus.valid + label:after,
textarea.materialize-textarea.valid + label:after,
textarea.materialize-textarea:focus.valid + label:after {
  content: attr(data-success);
  color: #4CAF50;
  opacity: 1;
}

input:not([type]).invalid, input:not([type]):focus.invalid,
input[type=text].invalid,
input[type=text]:focus.invalid,
input[type=password].invalid,
input[type=password]:focus.invalid,
input[type=email].invalid,
input[type=email]:focus.invalid,
input[type=url].invalid,
input[type=url]:focus.invalid,
input[type=time].invalid,
input[type=time]:focus.invalid,
input[type=date].invalid,
input[type=date]:focus.invalid,
input[type=datetime-local].invalid,
input[type=datetime-local]:focus.invalid,
input[type=tel].invalid,
input[type=tel]:focus.invalid,
input[type=number].invalid,
input[type=number]:focus.invalid,
input[type=search].invalid,
input[type=search]:focus.invalid,
textarea.materialize-textarea.invalid,
textarea.materialize-textarea:focus.invalid {
  border-bottom: 1px solid #F44336;
  box-shadow: 0 1px 0 0 #F44336;
}

input:not([type]).invalid + label:after,
input:not([type]):focus.invalid + label:after,
input[type=text].invalid + label:after,
input[type=text]:focus.invalid + label:after,
input[type=password].invalid + label:after,
input[type=password]:focus.invalid + label:after,
input[type=email].invalid + label:after,
input[type=email]:focus.invalid + label:after,
input[type=url].invalid + label:after,
input[type=url]:focus.invalid + label:after,
input[type=time].invalid + label:after,
input[type=time]:focus.invalid + label:after,
input[type=date].invalid + label:after,
input[type=date]:focus.invalid + label:after,
input[type=datetime-local].invalid + label:after,
input[type=datetime-local]:focus.invalid + label:after,
input[type=tel].invalid + label:after,
input[type=tel]:focus.invalid + label:after,
input[type=number].invalid + label:after,
input[type=number]:focus.invalid + label:after,
input[type=search].invalid + label:after,
input[type=search]:focus.invalid + label:after,
textarea.materialize-textarea.invalid + label:after,
textarea.materialize-textarea:focus.invalid + label:after {
  content: attr(data-error);
  color: #F44336;
  opacity: 1;
}

input:not([type]) + label:after,
input[type=text] + label:after,
input[type=password] + label:after,
input[type=email] + label:after,
input[type=url] + label:after,
input[type=time] + label:after,
input[type=date] + label:after,
input[type=datetime-local] + label:after,
input[type=tel] + label:after,
input[type=number] + label:after,
input[type=search] + label:after,
textarea.materialize-textarea + label:after {
  display: block;
  content: "";
  position: absolute;
  top: 65px;
  opacity: 0;
  transition: .2s opacity ease-out, .2s color ease-out;
}

.input-field {
  position: relative;
  margin-top: 1rem;
}

.input-field label {
  color: #9e9e9e;
  position: absolute;
  top: 0.8rem;
  left: 0.75rem;
  font-size: 1rem;
  cursor: text;
  transition: .2s ease-out;
}


.switch label input[type=checkbox] {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch label input[type=checkbox]:checked + .lever {
  background-color: #84c7c1;
}

.switch label input[type=checkbox]:checked + .lever:after {
  background-color: #26a69a;
}

.switch label .lever {
  content: "";
  display: inline-block;
  position: relative;
  width: 40px;
  height: 15px;
  background-color: #818181;
  border-radius: 15px;
  margin-right: 10px;
  transition: background 0.3s ease;
  vertical-align: middle;
  margin: 0 16px;
}

.switch label .lever:after {
  content: "";
  position: absolute;
  display: inline-block;
  width: 21px;
  height: 21px;
  background-color: #F1F1F1;
  border-radius: 21px;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.4);
  left: -5px;
  top: -3px;
  transition: left 0.3s ease, background .3s ease, box-shadow 0.1s ease;
}

input[type=checkbox]:checked:not(:disabled) ~ .lever:active:after {
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.4), 0 0 0 15px rgba(38, 166, 154, 0.1);
}

input[type=checkbox]:not(:disabled) ~ .lever:active:after {
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.4), 0 0 0 15px rgba(0, 0, 0, 0.08);
}

.switch label input[type=checkbox]:checked + .lever:after {
  left: 24px;
}

.switch input[type=checkbox][disabled] + .lever {
  cursor: default;
}

.switch label input[type=checkbox][disabled] + .lever:after,
.switch label input[type=checkbox][disabled]:checked + .lever:after {
  background-color: #BDBDBD;
}

/***************
  Select Field
***************/
.select-label {
  position: absolute;
}

.select-wrapper {
  position: relative;
}

.select-wrapper input.select-dropdown {
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #9e9e9e;
  outline: none;
  height: 3rem;
  line-height: 3rem;
  width: 100%;
  font-size: 1rem;
  margin: 0 0 15px 0;
  padding: 0;
  display: block;
}

.select-wrapper span.caret {
  color: initial;
  position: absolute;
  right: 0;
  top: 16px;
  font-size: 10px;
}

.select-wrapper span.caret.disabled {
  color: rgba(0, 0, 0, 0.26);
}

.select-wrapper + label {
  position: absolute;
  top: -14px;
  font-size: 0.8rem;
}



select.browser-default {
  display: block;
}

select:disabled {
  color: rgba(0, 0, 0, 0.3);
}

.select-wrapper input.select-dropdown:disabled {
  color: rgba(0, 0, 0, 0.3);
  cursor: default;
  -webkit-user-select: none;
  /* webkit (safari, chrome) browsers */
  -moz-user-select: none;
  /* mozilla browsers */
  -ms-user-select: none;
  /* IE10+ */
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}

.select-wrapper i {
  color: rgba(0, 0, 0, 0.3);
}

.select-dropdown li.disabled,
.select-dropdown li.disabled > span,
.select-dropdown li.optgroup {
  color: rgba(0, 0, 0, 0.3);
  background-color: transparent;
}

.select-dropdown li img {
  height: 40px;
  width: 40px;
  margin: 5px 15px;
  float: right;
}

.select-dropdown li.optgroup {
  border-top: 1px solid #eee;
}

.select-dropdown li.optgroup.selected > span {
  color: rgba(0, 0, 0, 0.7);
}

.select-dropdown li.optgroup > span {
  color: rgba(0, 0, 0, 0.4);
}

.select-dropdown li.optgroup ~ li:not(.optgroup) {
  padding-left: 1rem;
}

/*********************
      File Input
**********************/
.file-field {
  position: relative;
}

.file-field .file-path-wrapper {
  overflow: hidden;
  padding-left: 10px;
}

.file-field input.file-path {
  width: 100%;
}

.file-field .btn, .file-field .btn-large {
  float: left;
  height: 3rem;
  line-height: 3rem;
}

.file-field span {
  cursor: pointer;
}

.file-field input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  filter: alpha(opacity=0);
}

/***************
      Range
***************/
.range-field {
  position: relative;
}

input[type=range], input[type=range] + .thumb {
  cursor: pointer;
}

input[type=range] {
  position: relative;
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  margin: 15px 0px;
  padding: 0;
}

input[type=range] + .thumb {
  position: absolute;
  border: none;
  height: 0;
  width: 0;
  border-radius: 50%;
  background-color: #26a69a;
  top: 10px;
  margin-left: -6px;
  -webkit-transform-origin: 50% 50%;
          transform-origin: 50% 50%;
  -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
}

input[type=range] + .thumb .value {
  display: block;
  width: 30px;
  text-align: center;
  color: #26a69a;
  font-size: 0;
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
}

input[type=range] + .thumb.active {
  border-radius: 50% 50% 50% 0;
}

input[type=range] + .thumb.active .value {
  color: #fff;
  margin-left: -1px;
  margin-top: 8px;
  font-size: 10px;
}

input[type=range]:focus {
  outline: none;
}

input[type=range] {
  -webkit-appearance: none;
}

input[type=range]::-webkit-slider-runnable-track {
  height: 3px;
  background: #c2c0c2;
  border: none;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background-color: #26a69a;
  -webkit-transform-origin: 50% 50%;
          transform-origin: 50% 50%;
  margin: -5px 0 0 0;
  transition: .3s;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: #ccc;
}

input[type=range] {
  /* fix for FF unable to apply focus style bug  */
  border: 1px solid white;
  /*required for proper track sizing in FF*/
}

input[type=range]::-moz-range-track {
  height: 3px;
  background: #ddd;
  border: none;
}

input[type=range]::-moz-range-thumb {
  border: none;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background: #26a69a;
  margin-top: -5px;
}

/*hide the outline behind the border*/
input[type=range]:-moz-focusring {
  outline: 1px solid white;
  outline-offset: -1px;
}

input[type=range]:focus::-moz-range-track {
  background: #ccc;
}

input[type=range]::-ms-track {
  height: 3px;
  /*remove bg colour from the track, we'll use ms-fill-lower and ms-fill-upper instead */
  background: transparent;
  /*leave room for the larger thumb to overflow with a transparent border */
  border-color: transparent;
  border-width: 6px 0;
  /*remove default tick marks*/
  color: transparent;
}

input[type=range]::-ms-fill-lower {
  background: #777;
}

input[type=range]::-ms-fill-upper {
  background: #ddd;
}

input[type=range]::-ms-thumb {
  border: none;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background: #26a69a;
}

input[type=range]:focus::-ms-fill-lower {
  background: #888;
}

input[type=range]:focus::-ms-fill-upper {
  background: #ccc;
}

/**
 * The picker input element.
 */
.picker__input {
  cursor: default;
}

/**
 * When the picker is opened, the input element is "activated".
 */
.picker__input.picker__input--active {
  border-color: #0089ec;
}

.picker__input.picker__input--active {
  border-color: #E3F2FD;
}


nav .input-field {
  margin: 0;
}

nav .input-field input {
  height: 100%;
  font-size: 1.2rem;
  border: none;
  padding-left: 2rem;
}

nav .input-field input:focus, nav .input-field input[type=text]:valid, nav .input-field input[type=password]:valid, nav .input-field input[type=email]:valid, nav .input-field input[type=url]:valid, nav .input-field input[type=date]:valid {
  border: none;
  box-shadow: none;
}

nav .input-field label {
  top: 0;
  left: 0;
}

nav .input-field label i {
  color: rgba(255, 255, 255, 0.7);
  transition: color .3s;
}

nav .input-field label.active i {
  color: #fff;
}

nav .input-field label.active {
  -webkit-transform: translateY(0);
          transform: translateY(0);
}


.input-field {
  position: relative;
  margin-top: 1rem;
}

.input-field label {
  color: #9e9e9e;
  position: absolute;
  top: 0.8rem;
  left: 0.75rem;
  font-size: 1rem;
  cursor: text;
  transition: .2s ease-out;
}

.input-field label.active {
  font-size: 0.8rem;
  -webkit-transform: translateY(-140%);
          transform: translateY(-140%);
}

.input-field .prefix {
  position: absolute;
  width: 3rem;
  font-size: 2rem;
  transition: color .2s;
}

.input-field .prefix.active {
  color: #26a69a;
}

.input-field .prefix ~ input,
.input-field .prefix ~ textarea {
  margin-left: 3rem;
  width: 92%;
  width: calc(100% - 3rem);
}

.input-field .prefix ~ textarea {
  padding-top: .8rem;
}

.input-field .prefix ~ label {
  margin-left: 3rem;
}

@media only screen and (max-width: 992px) {
  .input-field .prefix ~ input {
    width: 86%;
    width: calc(100% - 3rem);
  }
}

@media only screen and (max-width: 600px) {
  .input-field .prefix ~ input {
    width: 80%;
    width: calc(100% - 3rem);
  }
}

.input-field input[type=search] {
  display: block;
  line-height: inherit;
  padding-left: 4rem;
  width: calc(100% - 4rem);
}

.input-field input[type=search]:focus {
  background-color: #fff;
  border: 0;
  box-shadow: none;
  color: #444;
}

.input-field input[type=search]:focus + label i,
.input-field input[type=search]:focus ~ .mdi-navigation-close,
.input-field input[type=search]:focus ~ .material-icons {
  color: #444;
}

.input-field input[type=search] + label {
  left: 1rem;
}

.input-field input[type=search] ~ .mdi-navigation-close,
.input-field input[type=search] ~ .material-icons {
  position: absolute;
  top: 0;
  right: 1rem;
  color: transparent;
  cursor: pointer;
  font-size: 2rem;
  transition: .3s color;
}


.container .row {
  margin-left: -0.75rem;
  margin-right: -0.75rem;
}

.section {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.section.no-pad {
  padding: 0;
}

.section.no-pad-bot {
  padding-bottom: 0;
}

.section.no-pad-top {
  padding-top: 0;
}

.row {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.row .col {
  float: left;
  box-sizing: border-box;
  padding: 0 0.75rem;
}

.row .col[class*="push-"], .row .col[class*="pull-"] {
  position: relative;
}

.row .col.s1 {
  width: 8.3333333333%;
  margin-left: auto;
  left: auto;
  right: auto;
}

.row .col.s2 {
  width: 16.6666666667%;
  margin-left: auto;
  left: auto;
  right: auto;
}

.row .col.s3 {
  width: 25%;
  margin-left: auto;
  left: auto;
  right: auto;
}

.row .col.s4 {
  width: 33.3333333333%;
  margin-left: auto;
  left: auto;
  right: auto;
}

.row .col.s5 {
  width: 41.6666666667%;
  margin-left: auto;
  left: auto;
  right: auto;
}

.row .col.s6 {
  width: 50%;
  margin-left: auto;
  left: auto;
  right: auto;
}

.row .col.s7 {
  width: 58.3333333333%;
  margin-left: auto;
  left: auto;
  right: auto;
}

.row .col.s8 {
  width: 66.6666666667%;
  margin-left: auto;
  left: auto;
  right: auto;
}

.row .col.s9 {
  width: 75%;
  margin-left: auto;
  left: auto;
  right: auto;
}

.row .col.s10 {
  width: 83.3333333333%;
  margin-left: auto;
  left: auto;
  right: auto;
}

.row .col.s11 {
  width: 91.6666666667%;
  margin-left: auto;
  left: auto;
  right: auto;
}

.row .col.s12 {
  width: 100%;
  margin-left: auto;
  left: auto;
  right: auto;
}

.row .col.offset-s1 {
  margin-left: 8.3333333333%;
}

.row .col.pull-s1 {
  right: 8.3333333333%;
}

.row .col.push-s1 {
  left: 8.3333333333%;
}

.row .col.offset-s2 {
  margin-left: 16.6666666667%;
}

.row .col.pull-s2 {
  right: 16.6666666667%;
}

.row .col.push-s2 {
  left: 16.6666666667%;
}

.row .col.offset-s3 {
  margin-left: 25%;
}

.row .col.pull-s3 {
  right: 25%;
}

.row .col.push-s3 {
  left: 25%;
}

.row .col.offset-s4 {
  margin-left: 33.3333333333%;
}

.row .col.pull-s4 {
  right: 33.3333333333%;
}

.row .col.push-s4 {
  left: 33.3333333333%;
}

.row .col.offset-s5 {
  margin-left: 41.6666666667%;
}

.row .col.pull-s5 {
  right: 41.6666666667%;
}

.row .col.push-s5 {
  left: 41.6666666667%;
}

.row .col.offset-s6 {
  margin-left: 50%;
}

.row .col.pull-s6 {
  right: 50%;
}

.row .col.push-s6 {
  left: 50%;
}

.row .col.offset-s7 {
  margin-left: 58.3333333333%;
}

.row .col.pull-s7 {
  right: 58.3333333333%;
}

.row .col.push-s7 {
  left: 58.3333333333%;
}

.row .col.offset-s8 {
  margin-left: 66.6666666667%;
}

.row .col.pull-s8 {
  right: 66.6666666667%;
}

.row .col.push-s8 {
  left: 66.6666666667%;
}

.row .col.offset-s9 {
  margin-left: 75%;
}

.row .col.pull-s9 {
  right: 75%;
}

.row .col.push-s9 {
  left: 75%;
}

.row .col.offset-s10 {
  margin-left: 83.3333333333%;
}

.row .col.pull-s10 {
  right: 83.3333333333%;
}

.row .col.push-s10 {
  left: 83.3333333333%;
}

.row .col.offset-s11 {
  margin-left: 91.6666666667%;
}

.row .col.pull-s11 {
  right: 91.6666666667%;
}

.row .col.push-s11 {
  left: 91.6666666667%;
}

.row .col.offset-s12 {
  margin-left: 100%;
}

.row .col.pull-s12 {
  right: 100%;
}

.row .col.push-s12 {
  left: 100%;
}

@media only screen and (min-width: 601px) {
  .row .col.m1 {
    width: 8.3333333333%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.m2 {
    width: 16.6666666667%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.m3 {
    width: 25%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.m4 {
    width: 33.3333333333%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.m5 {
    width: 41.6666666667%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.m6 {
    width: 50%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.m7 {
    width: 58.3333333333%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.m8 {
    width: 66.6666666667%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.m9 {
    width: 75%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.m10 {
    width: 83.3333333333%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.m11 {
    width: 91.6666666667%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.m12 {
    width: 100%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.offset-m1 {
    margin-left: 8.3333333333%;
  }
  .row .col.pull-m1 {
    right: 8.3333333333%;
  }
  .row .col.push-m1 {
    left: 8.3333333333%;
  }
  .row .col.offset-m2 {
    margin-left: 16.6666666667%;
  }
  .row .col.pull-m2 {
    right: 16.6666666667%;
  }
  .row .col.push-m2 {
    left: 16.6666666667%;
  }
  .row .col.offset-m3 {
    margin-left: 25%;
  }
  .row .col.pull-m3 {
    right: 25%;
  }
  .row .col.push-m3 {
    left: 25%;
  }
  .row .col.offset-m4 {
    margin-left: 33.3333333333%;
  }
  .row .col.pull-m4 {
    right: 33.3333333333%;
  }
  .row .col.push-m4 {
    left: 33.3333333333%;
  }
  .row .col.offset-m5 {
    margin-left: 41.6666666667%;
  }
  .row .col.pull-m5 {
    right: 41.6666666667%;
  }
  .row .col.push-m5 {
    left: 41.6666666667%;
  }
  .row .col.offset-m6 {
    margin-left: 50%;
  }
  .row .col.pull-m6 {
    right: 50%;
  }
  .row .col.push-m6 {
    left: 50%;
  }
  .row .col.offset-m7 {
    margin-left: 58.3333333333%;
  }
  .row .col.pull-m7 {
    right: 58.3333333333%;
  }
  .row .col.push-m7 {
    left: 58.3333333333%;
  }
  .row .col.offset-m8 {
    margin-left: 66.6666666667%;
  }
  .row .col.pull-m8 {
    right: 66.6666666667%;
  }
  .row .col.push-m8 {
    left: 66.6666666667%;
  }
  .row .col.offset-m9 {
    margin-left: 75%;
  }
  .row .col.pull-m9 {
    right: 75%;
  }
  .row .col.push-m9 {
    left: 75%;
  }
  .row .col.offset-m10 {
    margin-left: 83.3333333333%;
  }
  .row .col.pull-m10 {
    right: 83.3333333333%;
  }
  .row .col.push-m10 {
    left: 83.3333333333%;
  }
  .row .col.offset-m11 {
    margin-left: 91.6666666667%;
  }
  .row .col.pull-m11 {
    right: 91.6666666667%;
  }
  .row .col.push-m11 {
    left: 91.6666666667%;
  }
  .row .col.offset-m12 {
    margin-left: 100%;
  }
  .row .col.pull-m12 {
    right: 100%;
  }
  .row .col.push-m12 {
    left: 100%;
  }
}

@media only screen and (min-width: 993px) {
  .row .col.l1 {
    width: 8.3333333333%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.l2 {
    width: 16.6666666667%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.l3 {
    width: 25%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.l4 {
    width: 33.3333333333%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.l5 {
    width: 41.6666666667%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.l6 {
    width: 50%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.l7 {
    width: 58.3333333333%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.l8 {
    width: 66.6666666667%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.l9 {
    width: 75%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.l10 {
    width: 83.3333333333%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.l11 {
    width: 91.6666666667%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.l12 {
    width: 100%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
  .row .col.offset-l1 {
    margin-left: 8.3333333333%;
  }
  .row .col.pull-l1 {
    right: 8.3333333333%;
  }
  .row .col.push-l1 {
    left: 8.3333333333%;
  }
  .row .col.offset-l2 {
    margin-left: 16.6666666667%;
  }
  .row .col.pull-l2 {
    right: 16.6666666667%;
  }
  .row .col.push-l2 {
    left: 16.6666666667%;
  }
  .row .col.offset-l3 {
    margin-left: 25%;
  }
  .row .col.pull-l3 {
    right: 25%;
  }
  .row .col.push-l3 {
    left: 25%;
  }
  .row .col.offset-l4 {
    margin-left: 33.3333333333%;
  }
  .row .col.pull-l4 {
    right: 33.3333333333%;
  }
  .row .col.push-l4 {
    left: 33.3333333333%;
  }
  .row .col.offset-l5 {
    margin-left: 41.6666666667%;
  }
  .row .col.pull-l5 {
    right: 41.6666666667%;
  }
  .row .col.push-l5 {
    left: 41.6666666667%;
  }
  .row .col.offset-l6 {
    margin-left: 50%;
  }
  .row .col.pull-l6 {
    right: 50%;
  }
  .row .col.push-l6 {
    left: 50%;
  }
  .row .col.offset-l7 {
    margin-left: 58.3333333333%;
  }
  .row .col.pull-l7 {
    right: 58.3333333333%;
  }
  .row .col.push-l7 {
    left: 58.3333333333%;
  }
  .row .col.offset-l8 {
    margin-left: 66.6666666667%;
  }
  .row .col.pull-l8 {
    right: 66.6666666667%;
  }
  .row .col.push-l8 {
    left: 66.6666666667%;
  }
  .row .col.offset-l9 {
    margin-left: 75%;
  }
  .row .col.pull-l9 {
    right: 75%;
  }
  .row .col.push-l9 {
    left: 75%;
  }
  .row .col.offset-l10 {
    margin-left: 83.3333333333%;
  }
  .row .col.pull-l10 {
    right: 83.3333333333%;
  }
  .row .col.push-l10 {
    left: 83.3333333333%;
  }
  .row .col.offset-l11 {
    margin-left: 91.6666666667%;
  }
  .row .col.pull-l11 {
    right: 91.6666666667%;
  }
  .row .col.push-l11 {
    left: 91.6666666667%;
  }
  .row .col.offset-l12 {
    margin-left: 100%;
  }
  .row .col.pull-l12 {
    right: 100%;
  }
  .row .col.push-l12 {
    left: 100%;
  }
}


.input-field {
  position: relative;
  margin-top: 1rem;
}

.input-field label {
  color: #9e9e9e;
  position: absolute;
  top: 0.8rem;
  left: 0.75rem;
  font-size: 1rem;
  cursor: text;
  transition: .2s ease-out;
}

.input-field label.active {
  font-size: 0.8rem;
  -webkit-transform: translateY(-140%);
          transform: translateY(-140%);
}

.input-field .prefix {
  position: absolute;
  width: 3rem;
  font-size: 2rem;
  transition: color .2s;
}

.input-field .prefix.active {
  color: #26a69a;
}

.input-field .prefix ~ input,
.input-field .prefix ~ textarea {
  margin-left: 3rem;
  width: 92%;
  width: calc(100% - 3rem);
}

.input-field .prefix ~ textarea {
  padding-top: .8rem;
}

.input-field .prefix ~ label {
  margin-left: 3rem;
}

@media only screen and (max-width: 992px) {
  .input-field .prefix ~ input {
    width: 86%;
    width: calc(100% - 3rem);
  }
}

@media only screen and (max-width: 600px) {
  .input-field .prefix ~ input {
    width: 80%;
    width: calc(100% - 3rem);
  }
}

.input-field input[type=search] {
  display: block;
  line-height: inherit;
  padding-left: 4rem;
  width: calc(100% - 4rem);
}

.input-field input[type=search]:focus {
  background-color: #fff;
  border: 0;
  box-shadow: none;
  color: #444;
}

.input-field input[type=search]:focus + label i,
.input-field input[type=search]:focus ~ .mdi-navigation-close,
.input-field input[type=search]:focus ~ .material-icons {
  color: #444;
}

.input-field input[type=search] + label {
  left: 1rem;
}

.input-field input[type=search] ~ .mdi-navigation-close,
.input-field input[type=search] ~ .material-icons {
  position: absolute;
  top: 0;
  right: 1rem;
  color: transparent;
  cursor: pointer;
  font-size: 2rem;
  transition: .3s color;
}
body {
  background-color: white;
  margin: 0;
}

</style>
<style src='@uppy/core/dist/style.css'></style> 
<style src='@uppy/dashboard/dist/style.css'></style> 
<style src='@uppy/drag-drop/dist/style.css'></style> 
<style src='@uppy/progress-bar/dist/style.css'></style> 