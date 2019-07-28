<script>
  import CourseDetails from './CourseDetails.svelte'
  import IconButton from '../IconButton.svelte'

  export let course
  let show = false
</script>

<style>
  li {
    list-style: none;
    margin: 0.5rem;
    padding: 0.5rem;
  }

  li:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  .item-header {
    cursor: pointer;
  }
</style>

<li>
  <div class="item-header" on:click={() => { show = !show }}>
    <span>{course.name}</span>
    <IconButton name="angle-{show ? 'up' : 'down'}" />
  </div>

  {#if show}
    <CourseDetails {course}/>
  {/if}
</li>