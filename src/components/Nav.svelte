<script>
  import { content } from "./Nav.content";
  import { locale } from "../locale";

  export let segment;
  const ui = content[locale];
</script>

<nav class="row jbetween acenter xfill">
  <a class="logo" href=".">{ui.logo}</a>

  <ul class="row">
    {#each ui.pages as page}
      <li>
        <a class={segment === (page.slug === "." ? undefined : page.slug) ? "active" : ""} href={page.slug}>{page.title}</a>
      </li>
    {/each}
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
