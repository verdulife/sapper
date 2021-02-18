<script context="module">
  export async function preload(page, session) {
    const req = await this.fetch("/messages.db");
    const messages = await req.json();
    messages.reverse();

    return { messages };
  }
</script>

<script>
  import { content } from "./_content";
  import { locale } from "../locale";
  import { ADD } from "../api";

  const ui = content[locale];
  export let messages;

  async function postMessage() {
    const form = new FormData(this);
    const message = form.get("message");

    const req = await fetch("/messages.db", ADD("post", { message }));
    const res = await req.json();

    if (res) {
      messages = [res, ...messages];
      this.reset();
    }
  }
</script>

<svelte:head>
  <title>{ui.page}</title>
</svelte:head>

<h1>{ui.title}</h1>

<form class="box round col xfill" on:submit|preventDefault={postMessage}>
  <label for="message">{ui.form_label}</label>
  <input
    class="out semi xfill"
    type="text"
    name="message"
    placeholder={ui.form_label}
    required
  />

  <button class="pri semi xfill">{ui.form_btn}</button>
</form>

<ul class="col xfill">
  {#each messages as message}
    <li class="box round xfill">
      <h4>{message.message}</h4>
      <small class="row jend">
        {new Date(message._created).toLocaleDateString()}
      </small>
    </li>
  {/each}
</ul>

<style lang="scss">
  h1 {
    margin-bottom: 1em;
  }

  form {
    margin-bottom: 1em;

    label {
      font-size: 10px;
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 0.5em;
    }

    input {
      margin-bottom: 1em;
    }

    button {
      color: $white;
    }
  }

  ul {
    li {
      margin-bottom: 0.25em;

      small {
        color: $grey;
        font-size: 10px;
      }
    }
  }
</style>
