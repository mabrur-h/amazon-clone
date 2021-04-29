<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <h2 class="text-center mt-3">Add a new owner</h2>
          <form @keydown.enter="onAddOwner">
            <div class="mt-3">
              <label for="name">Name</label>
              <input type="text" class="a-input-text w-100" id="name" v-model="name">
            </div>

            <div class="mt-3">
              <label for="about">About</label>
              <input type="text" class="a-input-text w-100" id="about" v-model="about">
            </div>

            <div class="mt-3">
              <label>Add Photo</label>
              <div class="d-flex justify-content-between w-100">
                <div>
                  <label for="photo" class="choosefile-button">
                    <i class="fa fa-plus"></i>
                    <input type="file" id="photo" @change="onFileSelect">
                  </label>
                  <p class="font-weight-bold">Photo name: <span class="text-muted">{{ fileName }}</span></p>
                </div>

                <div class="justify-content-end">
                    <span class="a-button-register">
                      <span class="a-button-inner">
                        <span class="a-button-text" @click="onAddOwner">Add owner</span>
                      </span>
                    </span>
                </div>
              </div>
            </div>
          </form>

          <ul class="ml-0 mt-4">
            <li v-for="owner in owners" :key="owner._id" class="list-group-item">{{ owner.name }}</li>
          </ul>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "category",
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (!store.state.auth.user.isAdmin) {
      return redirect('/')
    }
  },
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get('/api/owners')
      return {
        owners: response.owners
      }

    } catch (e) {
      console.log (e.message)
    }
  },

  data() {
    return {
      name: "",
      about: "",
      selectedFile: null,
      fileName: ""
    }
  },

  methods: {
    onFileSelect(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },

    async onAddOwner() {
      try {
        let data = new FormData();
        data.append("name", this.name);
        data.append("about", this.about);
        data.append("photo", this.selectedFile, this.selectedFile.name);
        let response = await this.$axios.$post('/api/owners', data);

        this.owners.push( { name: this.name });
        this.name = "";
        this.about = "";
        this.fileName = "";
        this.selectedFile = null;

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
