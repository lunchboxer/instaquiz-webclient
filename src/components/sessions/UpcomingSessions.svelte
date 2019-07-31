<script>
  import { formatRelative } from 'date-fns'
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import { GET_MY_SESSIONS } from '../../data/queries'
  import { auth } from '../../data/auth'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import Warning from '../Warning.svelte'

  const hours = 24

  const now = new Date()
  const latest = new Date(now.getTime() + hours * 3.6e+6)

  const sessions = query(client, {
    query: GET_MY_SESSIONS,
    variables: { id: $auth.id, now, latest }
  })

  const formatDate = (date) => {
    const string = formatRelative(new Date(date), new Date())
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
</script>

{#await $sessions}
  <Loading what="Your upcoming sessions"/>
{:then result}
  {#if result.data.sessions.length > 0}
  <Warning title="{result.data.sessions.length} classes in the next {hours} hours">
    <div class="upcoming-sessions">
      {#each result.data.sessions as session (session.id) }
        <li>{session.course.name} - {formatDate(session.startsAt)}</li>
      {/each}
    </div>
  </Warning>
  {/if}
{:catch errors}
  <Error {errors}/>
{/await}