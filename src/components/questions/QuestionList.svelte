<script>
  import DeleteQuestion from './DeleteQuestion.svelte'
  import CreateAnswer from './CreateAnswer.svelte'

  export let questions
</script>

<style>
  li {
    list-style-type: none;
    margin: 1rem 0;
  }

  .answers {
    padding-left: 1rem;
  }
</style>

{#if questions && questions.length > 0}
  {#each questions as question (question.id)}
    <li>
      {question.order + 1}. {question.text}
      <!-- {#if question.answers.length === 0}
        <DeleteQuestion id={question.id} sessionId={question.session.id} />
      {/if}
      <div class="answers">
        {#if question.answers.length > 0}
          <ul>
            {#each question.answers as answer (answer.id)}
              <li>{answer.text}</li>
            {/each}
          </ul>
        {/if}
        <CreateAnswer questionId={question.id} />
      </div> -->
    </li>
  {/each}
{/if}