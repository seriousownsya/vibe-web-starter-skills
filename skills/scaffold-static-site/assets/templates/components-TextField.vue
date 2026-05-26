<template>
  <label class="grid gap-1.5 text-sm font-medium text-[var(--foreground)]">
    <span v-if="label">{{ label }}</span>
    <input
      class="min-h-10 rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
      v-bind="$attrs"
    >
  </label>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
}>();
</script>
