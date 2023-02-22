<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-warning">
      <div class="d-flex flex-column align-items-center w-100">
        <marquee scrollamount="10">
          <img alt="logo" src="https://biz.prlog.org/TeamGIFTED/logo.png" height="45" />
        </marquee>
      </div>
  </nav>
</template>

<script>
import Login from './Login.vue'
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

</style>
