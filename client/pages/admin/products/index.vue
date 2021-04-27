<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <h2 class="text-center mt-3">Add a new product</h2>
            <form>
              <div class="a-spacing-top-medium">
                <label for="category">Category</label>
                <select id="category" class="a-select-option" v-model="categoryID">
                  <option v-for="category in categories" :value="category._id" :key="category._id">{{ category.type }}</option>
                </select>
              </div>

              <div class="mt-3">
                <label for="owner">Owner</label>
                <select id="owner" class="a-select-option" v-model="ownerID">
                  <option v-for="owner in owners" :value="owner._id" :key="owner._id">{{ owner.name }}</option>
                </select>
              </div>

              <div class="mt-3">
                <label for="category-title">Title</label>
                <input id="category-title" type="text" class="a-input-text w-100" v-model="title">
              </div>

              <div class="mt-3">
                <label for="price">Price</label>
                <input id="price" type="number" min="0" class="a-input-text w-100" v-model="price">
              </div>

              <div class="mt-3">
                <label for="stockQuantity">Stock Quantity</label>
                <input id="stockQuantity" type="number" min="0" class="a-input-text w-100" v-model="stockQuantity">
              </div>

              <div class="mt-3">
                <label for="description">Description</label>
                <textarea id="description" type="number" style="min-height: 70px" class="a-input-text w-100" maxlength="512" v-model="description" />
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
                        <span class="a-button-text" @click="onAddProduct">Add product</span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "product",
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (!store.state.auth.user.isAdmin) {
      return redirect('/')
    }
  },
  async asyncData({ $axios }) {
    try {
      let categories = $axios.$get('/api/categories')
      let owners = $axios.$get('/api/owners')

      const [ categoryRes, ownerRes ] = await Promise.all([
        categories,
        owners
      ])
      let sortedCategories = categoryRes.categories.sort((a, b) => (a.type > b.type) ? 1 : -1)
      let sortedOwners = ownerRes.owners.sort((a, b) => (a.name > b.name) ? 1 : -1)
      return {
        categories: sortedCategories,
        owners: sortedOwners
      }
    } catch (e) {
      console.log (e.message)
    }
  },

  data() {
    return {
      categoryID: null,
      ownerID: null,
      title: '',
      price: 0,
      description: '',
      selectedFile: null,
      stockQuantity: 1,
      fileName: ''
    }
  },
  methods: {
    onFileSelect(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },
    async onAddProduct() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("price", this.price);
      data.append("description", this.description);
      data.append("ownerID", this.ownerID);
      data.append("categoryID", this.categoryID);
      data.append("stockQuantity", this.stockQuantity);
      data.append("photo", this.selectedFile, this.selectedFile.name);

      let res = await this.$axios.$post('/api/products', data);
      this.$router.push("/")
    }
  }
}
</script>
