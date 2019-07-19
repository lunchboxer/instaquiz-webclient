<script>
  import Navaid from "navaid";
  import { onMount, onDestroy } from "svelte";

  let Route, params;
  export let active;
  export let uri = location.pathname;

  $: active = uri.split("/")[1] || "/";

  function draw(m, obj) {
    params = obj || {};
    if (m.preload) {
      m.preload({ params }).then(() => {
        Route = m.default;
      });
    } else {
      Route = m.default;
    }
  }
  function track(obj) {
    uri = obj.state || obj.uri;
    if (window.ga) ga.send("pageview", { dp: uri });
  }
  addEventListener("replacestate", track);
  addEventListener("pushstate", track);
  addEventListener("popstate", track);
  const router = Navaid("/", () => import("./NotFound.svelte").then(draw))
    .on("/", () => import("./dashboard/Dashboard.svelte").then(draw))
    .on("/signup", () => import("./Signup.svelte").then(draw))
    .on("/join-course", () => import("./AddToCourse.svelte").then(draw))
    .on("/login", () => import("./Login.svelte").then(draw))
    .listen();
  onDestroy(router.unlisten);
</script>

<svelte:component this="{Route}" {params} />
