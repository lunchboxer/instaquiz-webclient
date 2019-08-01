<script>
  import { formatRelative } from 'date-fns'
  import Warning from '../Warning.svelte'
  import { every15Seconds } from '../../data/timer'

  export let sessions

  const formatDate = (date) => {
    const string = formatRelative(new Date(date), new Date())
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  // every 15 seconds check if there is a session currently on
  $: ongoing = sessions.filter(s => s.startsAt < $every15Seconds.toJSON() &&
    s.endsAt > $every15Seconds.toJSON())

  // Every 15 seconds check if there is a session starting in next 10 minutes
  $: soon = new Date($every15Seconds.getTime() + 10 * 6e+4)
  $: startsSoon = sessions.filter(s => s.startsAt < soon.toJSON())
</script>

<Warning title="{sessions.length} classes in the next 24 hours">
  <div class="upcoming-sessions">
    {#each sessions as session (session.id) }
      <li>{session.course.name} - {formatDate(session.startsAt)}</li>
    {/each}
  </div>
</Warning>