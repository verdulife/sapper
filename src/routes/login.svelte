<script context="module">
  export function preload(page, session) {
    if (session.user) this.redirect(302, "/");
  }
</script>

<script>
  import { goto, stores } from "@sapper/app";
  import { slide } from "svelte/transition";
  import { ADD } from "./_helpers/methods";
  const { session } = stores();

  export let verification_message;
  let login_form = {};
  let errorMessage;

  async function logIn() {
    try {
      const req = await fetch("/auth.login", ADD("post", login_form));
      if (!req.ok) throw await req.text();

      const res = await req.json();
      $session.token = res.token;

      goto("/");
    } catch (error) {
      errorMessage = error;
    }
  }
</script>

<div class="login">
  {#if verification_message === "ok"}
    <div class="success-box box round xfill" in:slide>Your account was verified. Now you can login</div>
  {/if}

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
</div>

<style lang="scss">
  .login {
    max-width: 600px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
  }

  form {
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

  .success-box,
  .error-box {
    background: rgba($error, 0.1);
    border-color: rgba($error, 0.4);
    color: $error;
    border-width: 2px;
    font-weight: bold;
    text-align: center;
    font-size: 14px;
    margin-top: 1em;
  }

  .success-box {
    background: rgba($success, 0.1);
    border-color: rgba($success, 0.4);
    color: $success;
    margin-bottom: 2em;
  }
</style>
