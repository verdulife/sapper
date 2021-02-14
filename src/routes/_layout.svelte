<script>
  import { locale } from "../locale";
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<svelte:head>
  <html lang={locale} />
</svelte:head>

<main>
  <Nav {segment} {locale} />

  <div class="scroll">
    <slot />
  </div>
</main>

<style lang="scss" global>
  @import "../../reset";
  @import "../../node_modules/verdu/verdu";

  .scroll {
    padding: 2em;
  }
</style>
