<script context="module">
  export async function preload(page, session) {
    const { _id } = page.params;

    const req = await this.fetch(`auth/${_id}.verify`);
    const res = await req.json();

    return { res };
  }
</script>

<script>
  export let res;
  console.log(res);
</script>

<pre>{JSON.stringify(res, null, 2)}</pre>
