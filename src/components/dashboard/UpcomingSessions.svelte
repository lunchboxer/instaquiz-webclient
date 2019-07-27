<script>
  import { onMount } from 'svelte'
  import { normalize } from '../../data/normalizer'
  import { request } from '../../data/fetch-client'
  import { GET_MY_SESSIONS } from '../../data/queries'
  import { auth } from '../../data/auth'
  import { sessions } from '../../data/sessions'
  import { courses } from '../../data/courses'
  import { extend } from '../../data/dispatcher'

  let myUpcomingSessions = []

  onMount(async () => {
    const response = await request(GET_MY_SESSIONS, { id: $auth.id, now: new Date().toJSON() })
    if (response && response.sessions && response.sessions.length > 0) {
      myUpcomingSessions = response.sessions.map(s => s.id)
      const normalized = normalize(response.sessions, 'sessions', { entities: {} })
      sessions.update(previous => extend(previous, normalized.entities.sessions))
      courses.update(previous => extend(previous, normalized.entities.course))
    }
  })
</script>

{#if myUpcomingSessions.length > 0}
  <div class="upcoming-sessions">
    <p>You have {myUpcomingSessions.length} class sessions coming up</p>
    {#each myUpcomingSessions as session (session) }
      <li>{$courses[$sessions[session].course].name} at {$sessions[session].startsAt}</li>
    {/each}
  </div>
{/if}