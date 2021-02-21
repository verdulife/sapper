<script>
  async function logIn() {}
</script>

<h1 class="xfill">Signup</h1>

<form class="box round col" on:submit|preventDefault={logIn}>
  <input class="out semi xfill" type="email" placeholder="Email" required />
  <input class="out semi xfill" type="text" placeholder="Username" required />
  <input class="out semi xfill" type="password" placeholder="Password" required />
  <input class="out semi xfill" type="password" placeholder="Confirm password" required />
  <button class="pri semi xfill">Send</button>
</form>

<a class="xfill" href=".">Already have a user? Login now</a>

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
</style>
