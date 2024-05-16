<script setup lang="ts">
import { computed } from 'vue';
import { IP, Subnet } from '../store';
import { getHostRange, getNetworkStatus, getSubnetMask, getWildcardMask } from '../utils';

const subnetmask = computed(() => getSubnetMask(Subnet.maskBits))
const wildcardMask = computed(() => getWildcardMask(subnetmask.value))
const networkStatus = computed(() => getNetworkStatus(IP.address, subnetmask.value))
const hostRange = computed(() => getHostRange(networkStatus.value.networkAddress, networkStatus.value.broadcastAddress))
</script>

<template>
    <h1>{{ IP.address }}/{{ Subnet.maskBits }}</h1>
    <p>Class of IP: {{ IP.range }}</p>
    <p>Subnet mask: {{ subnetmask }}</p>
    <p>Wildcard mask: {{ wildcardMask }}</p>
    <p>Network Address: {{ networkStatus.networkAddress }}</p>
    <p>Broadcast Address: {{ networkStatus.broadcastAddress }}</p>
    <p>Host range: {{ hostRange.from }} - {{ hostRange.to }}</p>
</template>