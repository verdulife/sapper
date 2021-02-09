<script>
  import Nav from "../components/Nav.svelte";

  let lang = "es";
  export let segment;
</script>

<svelte:head>
  <html {lang} />
</svelte:head>

<main>
  <Nav {segment} />

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
