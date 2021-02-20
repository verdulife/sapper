<script context="module">
  import { data } from "./_mp-user";

  export async function preload(page, session) {
    let demo = JSON.parse(data);
    return { demo };
  }
</script>

<script>
  import { locale } from "../../locale";
  import { content } from "./_content";

  const ui = content[locale];

  export let demo;
</script>

<svelte:head>
  <title>{ui.page}</title>
</svelte:head>

<h1>{ui.title}</h1>
<img src={demo.cover} alt="">

<style lang="scss">
</style>
