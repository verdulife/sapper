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
        <a class:active={segment === (page.slug === "." ? undefined : page.slug)} href={page.slug}>{page.title}</a>
      </li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  nav {
    background: $white;
    border-bottom: 1px solid $border;

    .logo {
      font-weight: bold;
      color: $black;
    }

    a {
      padding: 1.5em;
      margin-bottom: -1px;
    }

    .active {
      border-bottom: 2px solid $pri;
    }
  }
</style>
