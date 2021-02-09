<script>
  import { content } from "./content";
  import { GET, POST } from "./_api";

  const ui = content["es"];

  const user = {};

  async function addUser() {
    const req = await POST(user);
  }

  async function getUser() {
    const req = await GET();

    console.log(await req);
  }
</script>

<svelte:head>
  <title>{ui.page}</title>
</svelte:head>

<h1>{ui.title}</h1>

<form on:submit|preventDefault={addUser}>
  <input class="out semi" type="text" placeholder="User" bind:value={user.name} />
  <input class="out semi" type="number" placeholder="Age" bind:value={user.age} />
  <select class="out semi" bind:value={user.prime}>
    <option value={true}>true</option>
    <option value={false}>false</option>
  </select>

  <button class="pri semi" type="submit">send</button>
</form>

<button class="pri semi" on:click={getUser}>GET</button>

<style lang="scss">
</style>
