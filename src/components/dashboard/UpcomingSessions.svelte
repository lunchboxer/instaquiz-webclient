<script>
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import { GET_MY_SESSIONS } from '../../data/queries'
  import { auth } from '../../data/auth'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'

  const sessions = query(client, {
    query: GET_MY_SESSIONS,
    variables: { id: $auth.id, now: new Date().toJSON() }
  })
</script>

{#await $sessions}
  <Loading what="Your upcoming sessions"/>
{:then result}
  {#if result.data.sessions.length > 0}
    <div class="upcoming-sessions">
        <p>You have {result.data.sessions.length} class sessions coming up</p>
        {#each result.data.sessions as session (session.id) }
          <li>{session.course.name} at {session.startsAt}</li>
        {/each}
    </div>
  {/if}
{:catch errors}
  <Error {errors}/>
{/await}