<script>
  import { formatRelative } from 'date-fns'

  export let session

  const formatDate = (date) => {
    const string = formatRelative(new Date(date), new Date())
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
</script>

<h1 class="title is-3">{session.course.name} - Lesson {session.order}</h1>
<p class="subtitle">{formatDate(session.startsAt)} to {formatDate(session.endsAt)}</p>