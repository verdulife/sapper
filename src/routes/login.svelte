<script>
  import { goto } from "@sapper/app";
  import { slide } from "svelte/transition";
  import { ADD } from "./_helpers/methods";

  let login_form = {};
  let errorMessage;

  async function logIn() {
    try {
      const req = await fetch("/auth.login", ADD("post", login_form));

      if (!req.ok) throw await req.text();

      const res = await req.json();

      goto(`/?logged=${res}`);
    } catch (error) {
      errorMessage = error;
    }
  }
</script>

<h1 class="xfill">Login</h1>

<form class="box round col" on:submit|preventDefault={logIn}>
  <input bind:value={login_form.username} class="out semi xfill" type="text" placeholder="Username" required />
  <input bind:value={login_form.password} class="out semi xfill" type="password" placeholder="Password" required />

  <button class="pri semi xfill">Send</button>

  {#if errorMessage}
    <div class="error-box box round xfill" in:slide>{errorMessage}</div>
  {/if}
</form>

<a class="xfill" href="/signup">Not have a user yet? Get one now</a>

<style lang="scss">
  h1 {
    text-align: center;
  }

  form {
    max-width: 600px;
    margin: 0 auto;

    input {
      margin-bottom: 1em;
    }
  }

  a {
    cursor: pointer;
    display: block;
    text-align: center;
    margin-top: 2em;
    text-decoration: underline;
  }

  .error-box {
    background: rgba($error, 0.1);
    border-color: rgba($error, 0.4);
    border-width: 2px;
    font-weight: bold;
    color: $error;
    text-align: center;
    font-size: 14px;
    margin-top: 1em;
  }
</style>
