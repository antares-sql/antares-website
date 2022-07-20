<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <div>
    <Head>
      <Title>Antares SQL - Free and Open Source Client</Title>
    </Head>
    <div class="flex items-center justify-center">
      <BasePageContent>
        <div class="space-y-20 pb-40" data-aos="fade-in" data-aos-duration="1500">
          <div class="space-y-10 pt-44 text-center">
            <h1 class="text-7xl font-bold dark:text-gray-50">
              Open source SQL client<br>
              made to be simple.
            </h1>
            <div class="text-2xl dark:text-gray-50">
              A modern, fast and productivity driven, <strong class="font-bold">forever 100% free</strong> solution with a focus in UX.
            </div>
            <NuxtLink
              to="/downloads"
              class="
                inline-flex
                items-center
                justify-center
                whitespace-nowrap
                rounded-2xl
                bg-gradient-to-tr
                from-orange-700
                to-orange-500
                py-3
                px-5
                text-2xl
                font-semibold
                text-white
                hover:opacity-80
                focus:ring-2
                focus:ring-blue-400
              "
            >
              <DownloadIcon class="mr-2" /> Download Antares
            </NuxtLink>
          </div>
          <div
            class="
              gradient-animate
              flex
              justify-center
              rounded-3xl
              bg-gradient-to-tl
              from-rose-400
              via-orange-500
              to-purple-500
              px-28
              dark:text-gray-50
            "
          >
            <img src="~/assets/images/screen1.png" alt="Antares screenshot" class="-mb-32 mt-20 rounded-2xl">
          </div>
        </div>

        <div class="space-y-20 pb-40" data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500">
          <div class="space-y-5 pt-24 text-center">
            <h2 class="text-5xl font-bold dark:text-gray-50">
              About Antares Project
            </h2>
            <div class="text-2xl dark:text-gray-50">
              A new star is born, and is growing fast.
            </div>
            <div class="text-lg dark:text-gray-50">
              <a class="font-bold text-orange-500" href="https://en.wikipedia.org/wiki/Antares" target="_blank" rel="nofollow">Antares</a> is an SQL client that aims to become an useful and complete tool, especially for developers.<br>
              The target is to support as many databases as possible, and all major operating systems, including the ARM versions.<br>
              At the moment this application is in development state, many features will come in future updates, and actually supports <b>MySQL/MariaDB</b>, <b>PostgreSQL</b> and <b>SQLite</b>.<br>
              Most of its current features are enough to have a pleasant user experience with MySQL/MariaDB, PostgreSQL and SQLite, so give it a chance and <a class="font-bold text-orange-500" href="https://github.com/Fabio286/antares/discussions" target="_blank">send us your feedback</a>,
              we would really appreciate it.
            </div>
          </div>
        </div>
        <div
          class="
            mb-20
            max-w-none
            rounded-3xl
            bg-slate-800
            dark:text-gray-50
          "
          data-aos="fade-in"
          data-aos-duration="1500"
          data-aos-delay="500"
        >
          <div class="flex">
            <div
              class="flex flex-1 flex-col justify-center space-y-5 p-12"
            >
              <h2 class="text-3xl font-bold dark:text-gray-50">
                Simple, but complete
              </h2>
              <div class="text-xl dark:text-gray-50">
                Features in the right places,<br>
                not hundreds of tiny buttons or submenu.
              </div>
              <div class="text-lg dark:text-gray-50">
                Antares SQL development is driven by the idea to create a full featured tool,
                fast and with a modern and intuitive UI.<br>
                All features are accessible with a few clicks, without having to search for them in dozens of drop-down menus; productivity comes first.
              </div>
            </div>
            <div
              class="
                gradient-animate
                flex
                flex-1
                justify-center
                rounded-r-3xl
                bg-gradient-to-tl
                from-rose-400
                via-orange-500
                to-purple-500
                pl-16
                pt-16
                text-left
                dark:text-gray-50
              "
            >
              <img src="~/assets/images/screen2.png" alt="Context menu" class="rounded-tl-2xl rounded-br-2xl">
            </div>
          </div>
        </div>
      </BasePageContent>
    </div>
  </div>
</template>
<script setup>
import { DownloadIcon } from 'vue-tabler-icons'
</script>
