<script>
  import { content } from "./content";
  import { GET, POST, PUT, DELETE } from "./_api";

  const ui = content["es"];
  let input;

  async function getApi() {
    const res = await GET();
  }

  async function postApi() {
    const res = await POST({ name: input });
  }

  async function postApi() {
    const res = await PUT({ name: input });
  }

  async function postApi() {
    const res = await DELETE({ name: input });
  }
</script>

<svelte:head>
  <title>{ui.page}</title>
</svelte:head>

<h1>{ui.title}</h1>
<input class="out semi xfill" type="text" bind:value={input} />
<div class="row">
  <button class="pri semi" on:click={getApi}>GET</button>
  <button class="pri semi" on:click={postApi}>POST</button>
  <button class="pri semi" on:click={putApi}>PUT</button>
  <button class="pri semi" on:click={delApi}>DELETE</button>
</div>

<style lang="scss">
  input {
    margin-bottom: 1em;
  }

  button {
    margin-right: 1em;
    color: $white;
  }
</style>
