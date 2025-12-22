    import mailer from 'nodemailer'

    
export default    function sendEmail(email, html, callback) {
        const transporter = mailer.createTransport({
            'service': 'gmail',
            'auth': {
                'user': 'mohammedaminkhadir@gmail.com',
                'pass': 'pjjz akqm avca ijqn'
            }
        })

        const options = {
            'from': 'Firstore',
            'to': email,
            'subject': 'Netflix account',
            'html': html
        }
        transporter.sendMail(options, callback)
    }