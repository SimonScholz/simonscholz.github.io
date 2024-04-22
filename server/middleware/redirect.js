import redirectSSL from 'redirect-ssl'

export default fromNodeMiddleware(redirectSSL.create({
    enabled: process.env.NODE_ENV === 'production'
}))
