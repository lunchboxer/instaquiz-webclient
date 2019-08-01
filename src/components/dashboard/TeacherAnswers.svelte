<script>
  import { query } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import { RESPONSES } from '../../data/queries'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'
  import TeacherAnswerRow from './TeacherAnswerRow.svelte'

  export let question

  const responsesCache = query(client, {
    query: RESPONSES,
    variables: { questionId: question.id }
  })

  const filter = (answerId, responses) => responses.filter(r => r.answer.id === answerId)
</script>

{#await $responsesCache}
  <Loading what="Answers and responses"/>
{:then result}
  {#if result.data.responses}
    <p>{result.data.responses.length} responses total:</p>
    {#each question.answers as answer (answer.id)}
      <TeacherAnswerRow 
      {answer} 
      responses={filter(answer.id, result.data.responses)}
      totalResponses={result.data.responses.length}
      />
    {/each}
  {/if}
{:catch errors}
  <Error {errors} />
{/await}