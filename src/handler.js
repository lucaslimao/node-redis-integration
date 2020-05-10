const Redis = require("ioredis")

const client = new Redis({
    port: 6379,
    host: '127.0.0.1',
    db: 0
})

const start = fn => async (event, context, callback) => {

    try {

        console.log('Entrou no Start')

        return fn(event,context, callback)

    } catch (err) {

        const error = {
            message: err.message
        }

        console.log('Erro no start')

        return callback(null, {
            statusCode: 500,
            body: JSON.stringify(error)
        })

    }

}

const find = async (event, context, callback) => {

    try {

        context.callbackWaitsForEmptyEventLoop = false

        console.log('Entrou no find')

        console.log(event)

        const reply = await client.get('foo')

        return callback(null, {
            statusCode: 200,
            body: reply
        })

    } catch (err) {

        console.log('Erro no find')

        throw err

    }

}

const geoAdd = async (event, context, callback) => {

    try {

        context.callbackWaitsForEmptyEventLoop = false

        console.log('Entrou no find')

        const longitude = parseFloat(event.queryStringParameters.lng)
        const latitude = parseFloat(event.queryStringParameters.lat)

        const item = {
            id: '2',
            name: 'joao',
            email: 'joao@'
        }
        // -22.3401804,-49.0651815
        const reply = await client.geoadd('usuarios', longitude, latitude, JSON.stringify(item))

        return callback(null, {
            statusCode: 200,
            body: reply
        })

    } catch (err) {

        console.log('Erro no find')

        throw err

    }

}

module.exports = {
    find: start(find),
    geoAdd: start(geoAdd)
}
