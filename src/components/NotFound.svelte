<script>
  import { link } from 'svelte-routing'
</script>
<style>
  .container {
    margin: 4rem;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .primary {
    color: #cb2d6f;
  }

  .button {
    margin-top: 1rem;
  }
</style>

<div class="container">
  <section>
    <h1 class="title is-1 primary">
      <i class="fas fa-frown-open"></i>&nbsp;404
    </h1>
    <h2 class="subtitle is-3">resource not found</h2>

    <p>This path leads nowhere</p>
    <p>It might be wise to return to the <a href="/" use:link>main page</a>.</p>
  </section>
</div>