<template>
  <footer
    id="app-footer"
    class="
      flex
      justify-between
      bg-gray-50
      py-2
      px-4
      dark:bg-slate-800
      dark:text-gray-50
    "
  >
    <div class="text-center">
      <span class="font-bold">Fabio Di Stasio</span> <span style="font-family: NimbusMono">&copy;</span> {{ new Date().getFullYear() }}
    </div>
    <div class="text-center">
      <a href="https://github.com/Fabio286/antares/blob/master/LICENSE" target="_blank">
        License
      </a> •
      <NuxtLink to="/_privacy">
        Privacy
      </NuxtLink>
    </div>
  </footer>
</template>
