<template>
  <main>
    <div class="a-spacing-large"></div>

    <div class="container-fluid browsing-history">
      <div class="row">
        <div class="col-sm-8 col-8">
          <h1 class="a-size-large a-spacing-none a-text-normal">All products</h1>
          <div class="a-spacing-large"></div>
          <nuxt-link to="/admin/products" class="a-button-buy-again">Add a new product</nuxt-link>
          <nuxt-link to="/admin/category" class="a-button-history margin-right-10">Add a new category</nuxt-link>
          <nuxt-link to="/admin/owner" class="a-button-history margin-right-10">Add a new owner</nuxt-link>
        </div>
      </div>
    </div>

    <div class="a-spacing-large"></div>

    <div class="container-fluid browsing-history">
      <div class="row">
        <div v-for="(product, index) in products" :key="product._id" class="col-xl-2 col-lg-2 col-md-3 col-sm-6 br bb">
          <div class="history-box">
            <div class="text-center">

              <a href="#" class="text-decoration-none">
                <img :src="product.photo" :alt="product.title" class="img-fluid">
              </a>

              <div class="mt-3 asin-title">
                <div class="a-text-normal">
                  <div class="p13n-sc-truncated">
                    {{ product.title }}
                  </div>
                </div>
              </div>

              <div class="a-row">
                <a href="#">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </a>
                <span class="a-letter-space"></span>
                <span class="a-color-tertiary a-size-small asin-reviews">(1732)</span>
              </div>


              <div class="a-row">
              <span class="a-size-base a-color-price">
                <span class="p13n-sc-price">
                  ${{ product.price }}
                </span>
              </span>
              </div>

              <div class="a-row">
                <nuxt-link :to="`/admin/products/${product._id}`" class="margin-right-10 a-button-history">
                  Update
                </nuxt-link>
                <button class="margin-right-10 a-button-history" @click="onDeleteProduct(product._id, index)">
                  Delete
                </button>
              </div>

            </div>
          </div>
        </div>
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
  async asyncData({ $axios }) {
    try {
      let response = await $axios.get ( "/api/products" );
      return {
        products: response.data.products
      }
    } catch (e) {
      console.log (e.message)
    }
  },
  methods: {
    async onDeleteProduct(id, index) {
      try {
        let response = await this.$axios.$delete(`/api/products/${id}`)

        if ( response.status ) {
          this.product.splice(index, 1)
        }

      } catch (e) {
        console.log (e.message)
      }
    }
  }

}
</script>

<style>

</style>
