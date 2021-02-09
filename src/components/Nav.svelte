<script>
  export let segment;
</script>

<nav class="row jbetween acenter xfill">
  <a class="logo" href="."> verdu </a>

  <ul class="row">
    <li>
      <a class={segment === undefined ? "active" : ""} href=".">home</a>
    </li>
    <li>
      <a class={segment === "about" ? "active" : ""} href="about">about</a>
    </li>
  </ul>
</nav>

<style lang="scss">
  nav {
    padding: 1em 2em;
    border-bottom: 1px solid $border;

    .logo {
      font-weight: bold;
      color: $black;
    }

    a {
      margin-left: 1em;
    }

    .active {
      border-bottom: 2px solid $pri;
    }
  }
</style>
