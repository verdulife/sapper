<script>
  import { content } from "./content";

  const ui = content["es"];

  function getApi() {
    fetch("api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: "hi" }),
    });
  }
</script>

<svelte:head>
  <title>{ui.page}</title>
</svelte:head>

<h1>{ui.title}</h1>
<button class="pri semi" on:click={getApi}>get from api</button>

<style lang="scss">
</style>
