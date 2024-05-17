<script setup lang="ts">
import { IP } from '../store'
</script>

<template>
    <div class="-order-1">
        <p>{{ IP.errorMsg }}</p>
    </div>
</template>