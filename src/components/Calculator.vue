<script setup lang="ts">
import { IP } from '../store';
import SubnetStatus from './SubnetStatus.vue';
import SubnetForm from './SubnetForm.vue';
</script>

<template>
    <SubnetForm />
    <SubnetStatus v-if="IP.isValid" />
</template>