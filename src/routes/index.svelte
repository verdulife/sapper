<script>
  import { content } from "./_content";
  import { PRINT } from "./_api";

  const ui = content["es"];
  let data = {
    num: "21000015",
    date: "11/02/21",
    for: "Pepito SL",
    id: "46376977V",
    address: "Caller Gabriel Pallarès, 6, 08870 Sitges (BCN)",
    contact: "687.754.345",
    lines: [
      {
        amount: 10,
        label: "Impresion A4 1cara color 90gr.",
        dto: 0,
        price: 0.15,
      },
      {
        amount: 5,
        label: "Impresion A4 2cara color 90gr.",
        dto: 10,
        price: 0.3,
      },
    ],
  };
  let dev;

  async function print() {
    const req = await PRINT(data);
    console.log(req);

    if (req.status === 200) {
      const res = await req.blob();
      const file = window.URL.createObjectURL(res);
      /* const link = document.createElement("a");

      link.href = file;
      link.download = "file.pdf";
      link.click(); */

      dev = file;
    }
  }
</script>

<svelte:head>
  <title>{ui.page}</title>
</svelte:head>

<div class="cta row jbetween acenter xfill">
  <input
    type="text"
    class="out semi grow"
    bind:value={data.num}
    placeholder="numero"
  />
  <input
    type="text"
    class="out semi grow"
    bind:value={data.date}
    placeholder="fecha"
  />
</div>

<div class="cta row jbetween acenter xfill">
  <input
    type="text"
    class="out semi grow"
    bind:value={data.for}
    placeholder="para"
  />
  <input
    type="text"
    class="out semi grow"
    bind:value={data.id}
    placeholder="nif/cif"
  />
</div>

<button class="pri semi" on:click={print}>GET</button>

<iframe src={dev} frameborder="0" />

<style lang="scss">
  .cta {
    margin-bottom: 1em;
  }

  input {
    margin-right: 1em;
  }

  iframe {
    width: 100%;
    height: 100%;
    background: $black;
    display: flex;
  }
</style>
