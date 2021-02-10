<script>
  import { content } from "./_content";
  import { PRINT } from "./_api";

  const ui = content["es"];
  let value;

  async function print() {
    const req = await PRINT({ msg: value });
    console.log(req);

    if (req.status === 200) {
      const res = await req.blob();
      const file = window.URL.createObjectURL(res);
      const link = document.createElement("a");

      link.href = file;
      link.download = "file.pdf";
      link.click();
    }
  }
</script>

<svelte:head>
  <title>{ui.page}</title>
</svelte:head>

<h1>{ui.title}</h1>

<input type="text" class="out semi" bind:value />
<button class="pri semi" on:click={print}>GET</button>

<style lang="scss">
</style>
