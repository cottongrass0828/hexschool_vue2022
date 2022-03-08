<template>
  <nav>
    <router-link to="/">首頁</router-link> |
    <router-link to="/products">前台產品列表</router-link> |
    <router-link to="/cart">前台購物車</router-link> |
    <router-link to="/admin/">登入</router-link>
  </nav>
  <router-view />
</template>
<style lang="scss" >
@import 'bootstrap/scss/bootstrap';
</style>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
