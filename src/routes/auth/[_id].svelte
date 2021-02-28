<script context="module">
  export async function preload(page, session) {
    const { _id } = page.params;

    const req = await this.fetch(`auth/${_id}.verify`);
    if (!req.ok) return { verification: "invalid verification" };

    const verification = await req.json();

    session.token = verification;
    this.redirect(302, "/");
  }
</script>
