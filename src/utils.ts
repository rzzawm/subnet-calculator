const ipv4Regex =
    /^(1\d{2}|2[0-1]\d|22[0-3]|[1-9]\d|[1-9])\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){2}$/

export function validateIP(ip: string) {
    if (ip.length <= 0) return { isValid: false, errorMsg: 'Insert an IP Address' }
    if (!ipv4Regex.test(ip)) return { isValid: false, errorMsg: 'IP is not valid' }
    if (ip.split('.')[0] === '127') return { isValid: false, errorMsg: 'Loopback IP is not valid' }
    return { isValid: true, errorMsg: null }
}

export function getIPClass(ip: string) {
    if (validateIP(ip).isValid) {
        const octets = ip.split('.')
        const firstOctet = parseInt(octets[0])
        if (firstOctet >= 1 && firstOctet <= 126) return 'A'
        if (firstOctet >= 128 && firstOctet <= 191) return 'B'
        if (firstOctet >= 192 && firstOctet <= 223) return 'C'
    }
    return null
}

export function getSubnetMask(mask: number) {
    const octets = []
    for (let i = 0; i < 4; i++) {
        const octetValue = Math.min(mask, 8)
        octets.push(256 - Math.pow(2, 8 - octetValue))
        mask -= octetValue
    }
    return octets.join('.')
}

export function getWildcardMask(maskString: string) {
    const octets = maskString.split('.')
    return octets.map((octet) => 255 - Number(octet)).join('.')
}

export function getNetworkStatus(ip: string, mask: string) {
    const networkOctets = []
    const broadcastOctets = []

    const ipOctets = ip.split('.').map(Number)
    const maskOctets = mask.split('.').map(Number)

    for (let i = 0; i < 4; i++) {
        networkOctets.push(ipOctets[i] & maskOctets[i])
        broadcastOctets.push((ipOctets[i] & maskOctets[i]) | (~maskOctets[i] & 255))
    }

    const networkAddress = networkOctets.join('.')
    const broadcastAddress = broadcastOctets.join('.')

    return {
        networkAddress,
        broadcastAddress
    }
}

export function getHostRange(netAddress: string, bcAddress: string) {
    const netOctets = netAddress.split('.').map(Number)
    const bcOctets = bcAddress.split('.').map(Number)

    netOctets[3] += 1
    bcOctets[3] -= 1

    return {
        from: netOctets.join('.'),
        to: bcOctets.join('.')
    }
}

export function syncSubnetFormWithMask(mask: number, range: string) {
    const hosts = Math.pow(2, 32 - mask) - 2
    let count: number = 0
    switch (range) {
        case 'A':
            count = Math.pow(2, mask - 8)
            break
        case 'B':
            count = Math.pow(2, mask - 16)
            break
        case 'C':
            count = Math.pow(2, mask - 24)
            break
        default:
            break
    }
    return { hosts, count }
}

export function syncSubnetFormWithHosts(hosts: number, range: string) {
    const mask = 32 - Math.log2(hosts + 2)
    let count: number = 0
    switch (range) {
        case 'A':
            count = Math.pow(2, mask - 8)
            break
        case 'B':
            count = Math.pow(2, mask - 16)
            break
        case 'C':
            count = Math.pow(2, mask - 24)
            break
        default:
            break
    }
    return { mask, count }
}

export function syncSubnetFormWithCount(count: number, range: string) {
    let mask = 0
    switch (range) {
        case 'A':
            mask = 8 + Math.log2(count)
            break
        case 'B':
            mask = 16 + Math.log2(count)
            break
        case 'C':
            mask = 24 + Math.log2(count)
            break
        default:
            break
    }
    const hosts = Math.pow(2, 32 - mask) - 2
    return { hosts, mask }
}
