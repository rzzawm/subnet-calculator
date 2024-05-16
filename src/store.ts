import { reactive, watch } from 'vue'
import { validateIP, getIPClass } from './utils'

export const IP = reactive({
    address: '',
    range: '',
    isValid: false,
    errorMsg: ''
})

export const Subnet = reactive({
    maskBits: 0,
    hosts: 0,
    count: 1
})

// validate ip address and get ip class (range)
watch(
    () => IP.address,
    (ip) => {
        const { isValid, errorMsg } = validateIP(ip)
        if (isValid) {
            const range = getIPClass(ip) as string
            IP.isValid = true
            IP.range = range
            IP.errorMsg = ''
        } else {
            IP.isValid = false
            IP.range = ''
            IP.errorMsg = errorMsg ?? 'Something bad happend!'
        }
    }
)

// Check values for each range to be correct
watch(
    () => IP.range,
    (range) => {
        switch (range) {
            case 'A':
                Subnet.maskBits < 8 ? (Subnet.maskBits = 8) : null

                !Subnet.hosts ? (Subnet.hosts = Math.pow(2, 24) - 2) : null

                Subnet.count = Math.pow(2, Subnet.maskBits - 8)
                break
            case 'B':
                Subnet.maskBits < 16 ? (Subnet.maskBits = 16) : null

                Subnet.hosts > Math.pow(2, 16) || !Subnet.hosts
                    ? (Subnet.hosts = Math.pow(2, 16) - 2)
                    : null

                Subnet.count > Math.pow(2, 14)
                    ? (Subnet.count = Math.pow(2, Subnet.maskBits - 16))
                    : null
                break
            case 'C':
                Subnet.maskBits < 24 ? (Subnet.maskBits = 24) : null

                Subnet.hosts > Math.pow(2, 8) || !Subnet.hosts
                    ? (Subnet.hosts = Math.pow(2, 8) - 2)
                    : null

                Subnet.count > Math.pow(2, 6)
                    ? (Subnet.count = Math.pow(2, Subnet.maskBits - 24))
                    : null
                break
            default:
                Subnet.maskBits = 0
                Subnet.hosts = 0
                Subnet.count = 1
                break
        }
    }
)
