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
    <section class="grid items-center max-md:-order-1">
        <div class="grid gap-2">
            <p class="text-4xl border-b pb-2 border-base-300 font-black">{{ IP.address }}/{{ Subnet.maskBits }}</p>
            <p>Class of IP: <strong>{{ IP.range }}</strong></p>
            <p>Subnet mask: <strong>{{ subnetmask }}</strong></p>
            <p>Wildcard mask: <strong>{{ wildcardMask }}</strong></p>
            <p>Network Address: <strong>{{ networkStatus.networkAddress }}</strong></p>
            <p>Broadcast Address: <strong>{{ networkStatus.broadcastAddress }}</strong></p>
            <p>Host range: <strong>{{ hostRange.from }} - {{ hostRange.to }}</strong></p>
        </div>
    </section>
</template>