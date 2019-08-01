<script>
  import { formatRelative } from 'date-fns'
  import { nowSession, every15Seconds } from './stores'

  const formatDate = (date) => {
    const string = formatRelative(new Date(date), new Date())
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const exit = () => {
    $nowSession.set()
  }
  $: classIsOver = $nowSession.endsAt < $every15Seconds.toJSON()
</script>

<h1 class="title">{$nowSession.course.name}</h1>
<p class="subtitle">Lesson {$nowSession.order}</p>
<p>Started {formatDate(new Date($nowSession.startsAt), { addSuffix: true })}</p>
{#if classIsOver}
<p>This class was scheduled to end {formatDate(new Date($nowSession.endsAt))}.</p>
<button class="button is-primary" on:click={exit}>Exit class</button>
{/if}