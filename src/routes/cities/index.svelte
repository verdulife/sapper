<script context="module">
  export async function preload(page, session) {
    const req = await this.fetch("cities/get.db");
    const cities = await req.json();

    return { cities };
  }
</script>

<script>
  import { locale } from "../../locale";
  import { content } from "./_content";

  const ui = content[locale];
  export let cities;

  let search = "";
  $: filtered = cities.filter(
    (item) => item.nm.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );
</script>

<svelte:head>
  <title>{ui.page}</title>
</svelte:head>

<h1>{ui.title}</h1>

<input
  bind:value={search}
  class="out semi xfill"
  type="text"
  placeholder="Buscar"
/>

<h-div />

<ul class="col xfill">
  {#each filtered as city}
    <li class="xfill">
      <a
        class="box round row jbetween xfill"
        href="cities/{city.nm.replaceAll(' ', '-').replaceAll('/', '_')}"
      >
        <h4>{city.nm}</h4>
        <pre>{city.id}</pre>
      </a>
    </li>
  {/each}
</ul>

<style lang="scss">
  h-div {
    margin: 2em 0;
  }

  li {
    margin-bottom: 0.25em;
  }

  a,
  a * {
    cursor: pointer;
    color: $black;
    transition: 200ms;
  }

  a:hover {
    background: $border;
  }

  pre {
    color: $grey;
  }
</style>
