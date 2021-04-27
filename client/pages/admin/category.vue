<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <h2 class="text-center mt-3">Add a new category</h2>
          <form @keydown.enter="onAddCategory">
            <div class="mt-3">
              <label for="type">Type</label>
              <input type="text" class="a-input-text w-100" id="type" v-model="type">
            </div>

            <div class="mt-3">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onAddCategory">Add Category</span>
                </span>
              </span>
            </div>
          </form>

          <ul class="ml-0 mt-4">
            <li v-for="category in categories" :key="category._id" class="list-group-item">{{ category.type }}</li>
          </ul>
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
    if (!store.state.auth.user.isAdmin) {
      return redirect('/')
    }
  },
  name: "category",
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get('http://localhost:1010/api/categories')
      return {
        categories: response.categories
      }

    } catch (e) {
      console.log (e.message)
    }
  },

  data() {
    return {
      type: ""
    }
  },

  methods: {
    async onAddCategory() {
      try {
        let data = { type: this.type }
        let response = await this.$axios.$post('/api/categories', data);

        this.categories.push(data);
        this.type = ""
      } catch (e) {
        console.log (e.message)
      }
    }
  }
}
</script>

<style scoped>

</style>
