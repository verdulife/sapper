<script context="module">
  export async function preload(page, session) {
    try {
      const { token } = session;
      if (!token) throw "Not logged";

      const req = await this.fetch("/index.db", { headers: { authorization: `Bearer ${token}` } });
      if (!req.ok) throw "Session expired";

      const res = await req.json();
      const { user, messages } = res;
      messages.reverse();

      return { user, messages };
    } catch (error) {
      console.log(error);
      session.token = undefined;
      this.redirect(302, "/login");
    }
  }
</script>

<script>
  import { getContext } from "svelte";
  import { content } from "./_content";
  import { ADD, DEL } from "./_helpers/methods";

  export let user = { username: "fake" };
  export let messages;

  const locale = getContext("locale");
  const ui = content[locale];

  async function postMessage() {
    const form = new FormData(this);
    const message = form.get("message");

    const req = await fetch("/index.db", ADD("post", { message }));
    const res = await req.json();

    if (res) {
      messages = [res, ...messages];
      this.reset();
    }
  }

  async function delMessage(id, i) {
    const check = confirm("¿Borrar?");

    if (check) {
      const req = await fetch(`/${id}.db`, DEL());
      const res = await req.json();

      if (res) {
        messages.splice(i, 1);
        messages = messages;
      }
    }
  }
</script>

<svelte:head>
  <title>{ui.page}</title>
</svelte:head>

<div class="home">
  <h1>{ui.title} <span>{user.username}</span></h1>

  <form class="box round col xfill" on:submit|preventDefault={postMessage}>
    <label for="message">{ui.form_label}</label>
    <input class="out semi xfill" type="text" name="message" placeholder={ui.form_label} required />

    <button class="pri semi xfill">{ui.form_btn}</button>
  </form>

  <ul class="col xfill">
    {#each messages as message, i}
      <li class="box round xfill">
        <div class="row jbetween xfill">
          <h4>{message.message}</h4>
          <div class="del-btn" on:click={delMessage(message._id, i)}>[x]</div>
        </div>
        <small class="row jend">
          {new Date(message._created).toLocaleTimeString()} - {new Date(message._created).toLocaleDateString()}
        </small>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .home {
    max-width: 600px;
    margin: 0 auto;
  }

  h1 {
    margin-bottom: 1em;

    span {
      text-transform: capitalize;
    }
  }

  .box {
    background: $white;
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
      margin-bottom: 0.5em;
    }
  }

  ul {
    li {
      margin-bottom: 0.25em;

      .del-btn {
        cursor: pointer;
        font-family: "Operator Mono Lig";
        color: $sec;
        margin-bottom: 0.5em;
      }

      small {
        color: $grey;
        font-size: 10px;
      }
    }
  }
</style>
