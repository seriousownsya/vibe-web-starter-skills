<template>
  <main class="min-h-screen px-5 py-8 sm:px-8">
    <section class="mx-auto grid max-w-6xl gap-8">
      <header class="grid max-w-3xl gap-4">
        <p class="text-sm font-semibold text-[var(--accent)]">Full-stack starter</p>
        <h1 class="text-4xl font-semibold leading-tight text-[var(--foreground)] sm:text-5xl">
          Project workspace
        </h1>
        <p class="max-w-2xl text-base leading-7 text-[var(--muted)]">
          Track the first release, test a server request, and keep the launch surface simple.
        </p>
      </header>

      <section class="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <AppCard class="grid gap-5">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="text-xl font-semibold">API connection</h2>
              <p class="mt-1 text-sm text-[var(--muted)]">
                Status from <code class="rounded bg-[var(--surface-muted)] px-1.5 py-0.5">/api/health</code>
              </p>
            </div>
            <span class="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1 text-sm font-medium">
              {{ apiStatus }}
            </span>
          </div>

          <form class="grid gap-3" @submit.prevent="sendMessage">
            <TextField
              v-model="draft"
              label="Message"
              maxlength="120"
              placeholder="A small message for the API"
            />
            <div class="flex flex-wrap items-center gap-3">
              <AppButton type="submit" :disabled="sending || draft.trim().length === 0">
                {{ sending ? 'Sending' : 'Send message' }}
              </AppButton>
              <p v-if="errorMessage" class="text-sm font-medium text-red-700">
                {{ errorMessage }}
              </p>
            </div>
          </form>
        </AppCard>

        <AppCard class="grid content-start gap-4">
          <div>
            <h2 class="text-xl font-semibold">Latest response</h2>
            <p class="mt-1 text-sm text-[var(--muted)]">
              Typed JSON returned from <code class="rounded bg-[var(--surface-muted)] px-1.5 py-0.5">/api/message</code>
            </p>
          </div>

          <div class="rounded-md border border-[var(--border)] bg-[var(--surface-muted)] p-4">
            <p class="text-lg font-medium">
              {{ reply?.message ?? 'No message sent yet' }}
            </p>
            <p class="mt-2 text-sm text-[var(--muted)]">
              {{ responseTime }}
            </p>
          </div>
        </AppCard>
      </section>

      <section class="grid gap-4 md:grid-cols-3">
        <AppCard>
          <h2 class="text-lg font-semibold">Public pages</h2>
          <p class="mt-2 text-sm leading-6 text-[var(--muted)]">Landing pages, service pages, and customer-facing content.</p>
        </AppCard>
        <AppCard>
          <h2 class="text-lg font-semibold">Server actions</h2>
          <p class="mt-2 text-sm leading-6 text-[var(--muted)]">Validated requests for forms, leads, and dashboards.</p>
        </AppCard>
        <AppCard>
          <h2 class="text-lg font-semibold">Release health</h2>
          <p class="mt-2 text-sm leading-6 text-[var(--muted)]">Secrets, types, tests, and builds stay part of every change.</p>
        </AppCard>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
type HealthResponse = {
  ok: boolean
  service: string
}

type MessageResponse = {
  message: string
  receivedAt: string
}

const draft = ref('Launch the first useful version')
const reply = ref<MessageResponse | null>(null)
const errorMessage = ref('')
const sending = ref(false)

const { data: health } = await useFetch<HealthResponse>('/api/health')

const apiStatus = computed(() => (health.value?.ok ? 'Connected' : 'Checking'))
const responseTime = computed(() => {
  if (!reply.value) {
    return 'Responses will appear here.'
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(reply.value.receivedAt))
})

async function sendMessage() {
  const message = draft.value.trim()
  if (!message) {
    return
  }

  sending.value = true
  errorMessage.value = ''

  try {
    reply.value = await $fetch<MessageResponse>('/api/message', {
      method: 'post',
      body: { message },
    })
  } catch {
    errorMessage.value = 'The API request failed.'
  } finally {
    sending.value = false
  }
}
</script>
