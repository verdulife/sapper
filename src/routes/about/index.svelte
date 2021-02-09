<script>
  import { content } from "./content";
  import { User } from "../../database";

  const user = new User({
    name: "Verdu",
    age: 33,
    prime: true,
    list: ["hello", "bye"],
  });
  
  user.save().then(() => console.log("User added"));

  const ui = content["es"];
</script>

<svelte:head>
  <title>{ui.page}</title>
</svelte:head>

<h1>{ui.title}</h1>

<style lang="scss">
</style>
