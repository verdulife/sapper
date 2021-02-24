<script context="module">
  export async function preload({ params }, session) {
    const req = await this.fetch(`cities/${params.slug}.db`);
    const city = await req.json();

    return { city };
  }
</script>

<script>
  import { getContext } from "svelte";
  import { content } from "./_content";

  const locale = getContext("locale");

  const ui = content[locale];
  export let city;
</script>

<svelte:head>
  <title>{ui.page}</title>
</svelte:head>

<div class="city">
  <div class="box round col xfill">
    <h1>{city.nm}</h1>
    <p>{ui.city_id}: {city.id}</p>
  </div>

  <a class="btn pri semi" href="/cities">{ui.back_link}</a>
</div>

<style lang="scss">
  .city {
    max-width: 600px;
    margin: 0 auto;
  }

  .box {
    margin-bottom: 1em;
  }
</style>
