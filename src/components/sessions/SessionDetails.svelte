<script>
  import { formatRelative } from 'date-fns'
  import CreateQuestion from '../questions/CreateQuestion.svelte'
  import { link } from 'svelte-routing'

  export let session

  const formatDate = (date) => {
    const string = formatRelative(new Date(date), new Date())
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
</script>

<style>
  section {
    margin: 1rem;
  }

  li {
    list-style-type: none;
  }
</style>

<h1 class="title is-3">Lesson {session.order}</h1>
<p class="subtitle">{formatDate(session.startsAt)} to {formatDate(session.endsAt)}</p>

<br>

<h2 class="title is-4">{session.questions.length} Questions</h2>

<CreateQuestion sessionId={session.id} />

<section class="question-list">
  {#if session.questions && session.questions.length > 0}
    {#each session.questions as question (question.id)}
      <li>
        {question.order + 1}. <a href="/question/{question.id}" use:link>{question.text}</a>
      </li>
    {/each}
  {/if}
</section>