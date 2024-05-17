<script setup lang="ts">
import { IP } from '../store'
</script>

<template>
    <div class="max-md:-order-1 grid place-items-center">
        <div class="flex flex-col items-center gap-4">
            <img src="/warning.png" width="128px" alt="error">
            <p class="text-amber-900 dark:text-amber-600 text-sm italic font-semibold">{{ IP.errorMsg }}</p>
        </div>
    </div>
</template>