<template>
  <div class="registerPage m-0 p-0">
    <div class="container">
      <div class="row justify-content-center align-items-center vh-100">
        <div class="col-sm-4">
          <div class="text-center">
            <nuxt-link to="/">
              <img src="/img/logo-black.png" alt="logo">
            </nuxt-link>
          </div>
          <form class="mt-4">
            <div class="a-box a-spacing-extra-large">
              <div class="a-box-inner">
                <h1 class="a-spacing-small">Create account</h1>
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="ap_customer_name"
                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                    v-model="name"
                  >
                </div>

                <div class="a-row a-spacing-base">
                  <label for="ap_customer_email" class="a-form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="ap_customer_email"
                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                    v-model="email"
                  >
                </div>

                <div class="a-row a-spacing-base">
                  <label for="ap_customer_password" class="a-form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="ap_customer_password"
                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                    v-model="password"
                  >
                  <div class="a-alert-container">
                    <div class="a-alert-content">Password must be at least 6 characters</div>
                  </div>
                </div>

                <div class="a-row a-spacing-extra-large mb-4">
                  <span class="a-button-primary">
                    <span class="a-button-inner">
                      <span class="a-button-text" @click="onSignUp">Create your amazon account</span>
                    </span>
                  </span>
                  <div class="a-row a-spacing-top-medium a-size-small">
                    <strong>
                      By creating account you agree to Amazon's
                      <a href="/">Conditions of use</a>
                      <a href="/">Privacy Notice</a>
                    </strong>
                  </div>
                </div>
                <hr>
                <div class="a-row text-center">
                  <strong>Already have an account?</strong>
                  <br>
                  <nuxt-link to="/login" class="a-link-emphasis">Log in</nuxt-link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "signup",
  middleware: "auth",
  auth: "guest",
  layout: "hide",

  data() {
    return {
      name: "",
      email: "",
      password: ""
    }
  },
  methods: {
    async onSignUp() {
      try {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password
        }

        let response = await this.$axios.$post("/api/auth/signup", data)

        console.log (response)

        if ( response.success ) {
          this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password
            }
          });

          this.$router.push('/');
        }

      } catch (e) {
        console.log (e)
      }
    }
  }
}
</script>

<style scoped>

</style>
