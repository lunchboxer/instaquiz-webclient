<script context="module">
  import { TERMS_AND_ALL } from '../../data/queries'
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'

  export const termsCache = query(client, { query: TERMS_AND_ALL })
</script>

<script>
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'

  let terms
  let errors = ''
  let loading = true

  $termsCache.then(cache => {
    if (cache && cache.data && cache.data.terms) {
      terms = cache.data.terms
    }
  }).catch(error => { errors = error })
    .finally(() => { loading = false })
</script>

{#if loading}
  <Loading what="terms and courses" />
{:else if terms}
  <slot {terms}></slot>
{:else if errors}
  <Error {errors} />
{/if}
      