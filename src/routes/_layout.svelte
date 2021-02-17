<script>
  import { locale } from "../locale";
  import { fly } from "svelte/transition";
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<svelte:head>
  <html lang={locale} />
</svelte:head>

<main>
  <Nav {segment} />

  {#key segment}
    <div class="scroll" in:fly out:fly>
      <slot />
    </div>
  {/key}
</main>

<style lang="scss" global>
  @import "../../reset";
  @import "../../node_modules/verdu/verdu";

  .scroll {
    height: calc(100% - 70px) !important;
    padding: 1.5em;
  }
</style>
