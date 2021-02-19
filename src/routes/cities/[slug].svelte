<script context="module">
  export async function preload(page, session) {
    const req = await this.fetch(`cities/${page.params.slug}.db`);
    const city = await req.json();

    return { city };
  }
</script>

<script>
  import { locale } from "../../locale";
  import Index from "../index.svelte";
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

<a class="btn pri semi" href="javascript:history.back()">Back to cities</a>

<style lang="scss">
  .box {
    margin-bottom: 1em;
  }
</style>
