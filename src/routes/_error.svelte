<script>
  import { getContext } from "svelte";
  import { content } from "./_content";

  const locale = getContext("locale");

  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
  const ui = content[locale];
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="view col acenter">
  <img src="/404.jpg" alt={status} />

  <a href="." class="btn pri semi">{ui.error}</a>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</div>

<style lang="scss">
  img {
    width: 100%;
    max-width: 500px;
    mix-blend-mode: multiply;
    border-radius: 2em;
  }

  a.btn {
    color: $white;
    margin-top: 3em;
  }
</style>
