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

  let newLine = false;
  let line = {};
  let dev;

  function addLine() {
    data.lines = [...data.lines, line];
    line = {};

    newLine = false;
  }

  async function print() {
    const req = await PRINT(data);
    if (req.status === 200) {
      const res = await req.blob();
      const file = window.URL.createObjectURL(res);
      /* const link = document.createElement("a");

      link.href = file;
      link.download = "file.pdf";
      link.click(); */

      dev = file;
      data = {
        lines: [],
      };
    }
  }
</script>

<svelte:head>
  <title>{ui.page}</title>
</svelte:head>

<div class="view row">
  <div class="form col xhalf yfill">
    <div class="cta row jbetween acenter xfill">
      <input type="text" class="out semi grow" bind:value={data.num} placeholder="numero" />
      <input type="text" class="out semi grow" bind:value={data.date} placeholder="fecha" />
    </div>

    <div class="cta row jbetween acenter xfill">
      <input type="text" class="out semi grow" bind:value={data.for} placeholder="para" />
      <input type="text" class="out semi grow" bind:value={data.id} placeholder="nif/cif" />
    </div>

    {#if newLine}
      <div class="newline box round col xfill">
        <div class="row xfill">
          <input type="number" class="out semi grow" bind:value={line.amount} placeholder="Cantidad" />
          <input type="number" class="out semi grow" bind:value={line.dto} placeholder="Descuento" />
          <input type="number" class="out semi grow" bind:value={line.price} placeholder="Precio" />
        </div>

        <input type="text" class="out semi xfill" bind:value={line.label} placeholder="Servicio / Producto" />
        <button class="pri semi" on:click={addLine}>AÑADIR LINEA</button>
      </div>
    {/if}

    {#if !newLine}
      <button class="pri semi" on:click={() => (newLine = true)}>AÑADIR LINEA</button>
    {/if}

    {#each data.lines as line}
      <div class="box round col xfill">
        <h3>{line.label}</h3>

        <h-div />

        <div class="row xfill">
          <p>Cantidad: {line.amount}</p>
          <p>Descuento: {line.dto}%</p>
          <p><b>Precio: {line.price.toFixed(2)}€</b></p>
        </div>
      </div>
    {/each}

    <button class="pri semi" on:click={print}>GET</button>
  </div>

  <div class="col xhalf yfill">
    <iframe src={dev} frameborder="0" />
  </div>
</div>

<style lang="scss">
  .form {
    padding: 1em;
  }

  .cta {
    margin-bottom: 1em;
  }

  input:nth-of-type(odd),
  button {
    margin-right: 1em;
  }

  .box {
    margin-bottom: 0.5em;

    h-div {
      margin: 0.5em 0;
    }

    p {
      margin-right: 1em;
    }
  }

  iframe {
    width: 100%;
    height: 100%;
    background: $black;
    display: flex;
  }
</style>
