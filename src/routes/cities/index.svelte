<script context="module">
  export async function preload(page, session) {
    const req = await this.fetch("/cities.db");
    const cities = await req.json();

    return { cities };
  }
</script>

<script>
  import { getContext } from "svelte";
  import { content } from "./_content";

  const locale = getContext("locale");

  const ui = content[locale];
  export let cities;

  let search = "";
  $: filtered = cities.filter((item) => item.nm.toLowerCase().indexOf(search.toLowerCase()) !== -1);
</script>

<svelte:head>
  <title>{ui.page}</title>
</svelte:head>

<h1>{ui.title}</h1>

<input bind:value={search} class="out semi xfill" type="text" placeholder={ui.search} />

<h-div />

<ul class="col xfill">
  {#each filtered as city}
    <li class="xfill">
      <a rel="preload" class="box round row jbetween xfill" href="cities/{city.nm.split(' ').join('-').split('/').join('_')}">
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
