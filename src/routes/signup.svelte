<script>
  import { slide } from "svelte/transition";
  import { ADD } from "./_helpers/methods";
  import Joi from "joi";

  const userSchema = Joi.object({
    username: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().alphanum().min(8).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  });

  let verifyState;
  let errorMessage;
  let signup_form = {};

  async function signUp() {
    try {
      if (signup_form.password !== signup_form.confirmPassword) throw "password not match";
      delete signup_form.confirmPassword;
      const isValid = await userSchema.validateAsync(signup_form);
      const req = await fetch("/auth.signup", ADD("post", isValid));

      if (!req.ok) throw await req.text();

      verifyState = signup_form.email;
    } catch (error) {
      errorMessage = error;
    }
  }
</script>

<div class="signup">
  <h1 class="xfill">Signup</h1>

  {#if !verifyState}
    <form class="box round col" on:submit|preventDefault={signUp}>
      <input bind:value={signup_form.email} class="out semi xfill" type="email" placeholder="Email" required />
      <input bind:value={signup_form.username} class="out semi xfill" type="text" placeholder="Username" required />
      <input bind:value={signup_form.password} class="out semi xfill" type="password" placeholder="Password" required />
      <input bind:value={signup_form.confirmPassword} class="out semi xfill" type="password" placeholder="Confirm password" required />
      <button class="pri semi xfill">Send</button>

      {#if errorMessage}
        <div class="error-box box round xfill" in:slide>{errorMessage}</div>
      {/if}
    </form>

    <a class="xfill" href=".">Already have a user? Login now</a>
  {:else}
    <div class="box round xfill">
      A verification email was send to {verifyState}. Please check your inbox to verify your account.
    </div>
  {/if}
</div>

<style lang="scss">
  .signup {
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
