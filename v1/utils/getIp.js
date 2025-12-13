export default function getIp(req) {
    let ip = req.socket.remoteAddress
    ip = ip.replaceAll(':', '').replaceAll('f', '')
    return ip
}