<script>
  import CourseDetails from './CourseDetails.svelte'
  import IconButton from '../IconButton.svelte'

  export let course
  const show = false
</script>

<style>
  li {
    list-style: none;
  }
</style>

<!-- <li>
  <div class="item-header" on:click={() => { show = !show }}>
    <span>{course.name}</span>
    <IconButton name="angle-{show ? 'up' : 'down'}" />
  </div>

  {#if show}
    <CourseDetails {course}/>
  {/if}
</li> -->
<li><a href="#/course/{course.id}">{course.name}</a></li>