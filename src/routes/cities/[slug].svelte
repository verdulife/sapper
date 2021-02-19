<script context="module">
  export async function preload(page, session) {
    const req = await this.fetch(
      "https://mp-establecimientos.vercel.app/assets/data/municipios.json"
    );
    const cities = await req.json();
    const city = await cities.filter(
      (c) => c.nm.replaceAll(" ", "-") === page.params.slug
    )[0];

    return { city };
  }
</script>

<script>
  import { locale } from "../../locale";
  import { content } from "./_content";

  const ui = content[locale];
  export let city;
</script>

<svelte:head>
  <title>{ui.page}</title>
</svelte:head>

<div class="box round col xfill">
  <h1>{city.nm}</h1>
  <p>city id: {city.id}</p>
</div>

<style lang="scss">
  li {
    margin-bottom: 0.25em;
  }

  a,
  a span {
    cursor: pointer;
  }
</style>
