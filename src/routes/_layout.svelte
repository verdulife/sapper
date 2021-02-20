<script>
  import { locale } from "../locale";
  import { slide } from "svelte/transition";
  import { stores } from "@sapper/app";
  import Nav from "../components/Nav.svelte";

  const { preloading } = stores();

  export let segment;
</script>

<svelte:head>
  <html lang={locale} />
</svelte:head>

<main>
  <Nav {segment} />

  {#key segment}
    <div class="scroll" transition:slide>
      <slot />
    </div>
  {/key}

  {#if $preloading}
    <div class="preloading row fcenter xfill">
      <img src="load.gif" alt="Loading..." />
    </div>
  {/if}
</main>

<style lang="scss" global>
  @import "../../reset";
  @import "../../node_modules/verdu/verdu";

  .scroll {
    height: calc(100% - 70px) !important;
    padding: 1.5em;
  }

  .preloading {
    position: fixed;
    top: 70px;
    left: 0;
    height: calc(100% - 70px) !important;
    background: rgba($white, 0.5);
    backdrop-filter: blur(10px);

    img {
      width: 100px;
    }
  }
</style>
