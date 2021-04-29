<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <h2 class="text-center mt-3">Profile page</h2>
          <form @keydown.enter="onUpdateProfile">

            <div class="mt-3">
              <label for="name">Name</label>
              <input
                type="text"
                class="a-input-text w-100"
                id="name"
                v-model="name"
                :placeholder="$auth.$state.user.name"
              >
            </div>

            <div class="mt-3">
              <label for="email">Email</label>
              <input
                type="email"
                class="a-input-text w-100"
                id="email"
                v-model="email"
                :placeholder="$auth.$state.user.email"
              >
            </div>

            <div class="mt-3">
              <label for="password">Password</label>
              <input
                type="password"
                class="a-input-text w-100"
                id="password"
                v-model="password"
              >
            </div>

            <div class="mt-3">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onUpdateProfile">Update and Save</span>
                </span>
              </span>
              <span class="a-button-history h-100">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onLogout">Log out</span>
                </span>
              </span>
            </div>
          </form>

        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (store.state.auth.loggedIn === false) {
      return redirect('/login')
    }
  },
  name: "category",

  data() {
    return {
      name: "",
      email: "",
      password: ""
    }
  },
  methods: {
    async onUpdateProfile() {
      try {

        let data = {
          name: this.name,
          email: this.email,
          password: this.password
        }

        console.log (data)

        let response = await this.$axios.$put('/api/auth/user', data);

        if ( response.success ) {
          this.name = "";
          this.email = "";
          this.password = ""

          await this.$auth.fetchUser();
        }

      } catch (e) {
        console.log (e.message)
      }
    },

    async onLogout() {
      await this.$auth.logout();
      await this.$router.push ( '/' )
    }
  }

}
</script>

<style scoped>

</style>
