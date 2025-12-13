export default  function error(err, res) {
    err.mess ? null : console.error(err)
    res.writeHead(err.statusCode ? err.statusCode : 500)
    res.end(`{"error": "${err.mess ? err.mess : 'Internal server error'}"}`)
}