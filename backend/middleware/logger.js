const logger = require('../logger')

const logPostRequests = (req, res, next) => {
    if (req.method === 'POST') {
        logger.info(`POST request to ${req.originalUrl} with body: ${JSON.stringify(req.body)}`)
    }
    next()
}

module.exports = logPostRequests