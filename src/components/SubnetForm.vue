<script setup lang="ts">
import { IP, Subnet } from '../store';
import { syncSubnetFormWithCount, syncSubnetFormWithHosts, syncSubnetFormWithMask } from '../utils';
import { computed } from 'vue';
const possibleMaskBits = computed(() => {
    switch (IP.range) {
        case 'A':
            return Array.from({ length: 31 - 8 }, (_, index) => 8 + index);
        case 'B':
            return Array.from({ length: 31 - 16 }, (_, index) => 16 + index);
        case 'C':
            return Array.from({ length: 31 - 24 }, (_, index) => 24 + index);
    }
    return [0]
})

const possibleHosts = computed(() => {
    switch (IP.range) {
        case 'A':
            return Array.from({ length: 23 }, (_, i) => Math.pow(2, i + 2) - 2)
        case 'B':
            return Array.from({ length: 15 }, (_, i) => Math.pow(2, i + 2) - 2)
        case 'C':
            return Array.from({ length: 7 }, (_, i) => Math.pow(2, i + 2) - 2)
    }
    return [0]
})

const possibleSubnetCount = computed(() => {
    switch (IP.range) {
        case 'A':
            return Array.from({ length: 23 }, (_, i) => Math.pow(2, i))
        case 'B':
            return Array.from({ length: 15 }, (_, i) => Math.pow(2, i))
        case 'C':
            return Array.from({ length: 7 }, (_, i) => Math.pow(2, i))
    }
    return [1]
})

const handleMaskChange = () => {
    const { count, hosts } = syncSubnetFormWithMask(Subnet.maskBits, IP.range)
    Subnet.count = count
    Subnet.hosts = hosts
}

const handleHostChange = () => {
    const { count, mask } = syncSubnetFormWithHosts(Subnet.hosts, IP.range)
    Subnet.count = count
    Subnet.maskBits = mask
}

const handleCountChange = () => {
    const { hosts, mask } = syncSubnetFormWithCount(Subnet.count, IP.range)
    Subnet.hosts = hosts
    Subnet.maskBits = mask
}
</script>

<template>
    <input name="ip_address" id="ip_address" v-model="IP.address" autocomplete="off" type="text">
    <select @change="handleMaskChange" name="mask_bits" id="mask_bits" v-model="Subnet.maskBits"
        :disabled="!IP.isValid">
        <option v-for="n in possibleMaskBits" :key="n" :value="n">{{ n }}</option>
    </select>
    <br>
    <span>Hosts:</span>
    <select @change="handleHostChange" name="subnet_hosts" id="subnet_hosts" v-model="Subnet.hosts"
        :disabled="!IP.isValid">
        <option v-for="n in possibleHosts" :key="n" :value="n">{{ n }}</option>
    </select>
    <span>Subnets:</span>
    <select @change="handleCountChange" name="subnet_count" id="subnet_count" v-model="Subnet.count"
        :disabled="!IP.isValid">
        <option v-for="n in possibleSubnetCount" :key="n" :value="n">{{ n }}</option>
    </select>
</template>
