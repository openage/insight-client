const logsApi = require('../helpers/request-helper')('logs')
const config = require('config').get('providers')['insight']
const client = new (require('node-rest-client-promise')).Client()

const buildUrl = require('build-url')

exports.create = async (model, context) => {
    const args = {
        headers: {
            'Content-Type': 'application/json'
        },
        data: model
    }

    if (context.role) {
        if (context.role.key) {
            args.headers['x-role-key'] = context.role.key
        } else if (context.role.id) {
            args.headers['x-role-id'] = context.role.id
        }
    } else if (context.user && context.user.role) {
        if (context.user.role.key) {
            args.headers['x-role-key'] = context.user.role.key
        } else if (context.user.role.id) {
            args.headers['x-role-id'] = context.user.role.id
        }
    } else if (context.tenant) {
        if (context.tenant.code) {
            args.headers['x-tenant-code'] = context.tenant.code
        }
    }

    if (context.session) {
        args.headers['x-session-id'] = context.session.id
    }

    if (context.id) {
        args.headers['x-context-id'] = context.id
    }

    let url = buildUrl(config.url, { path: 'logs' })

    let response = await client.postPromise(url, args)
    if (!response.data.isSuccess) {
        throw new Error(`invalid response from insight`)
    }

    return response.data.data
}

exports.search = async (query, context) => {
    return logsApi.search(query, null, context)
}

exports.get = async (id, context) => {
    return logsApi.get(id, null, context)
}
