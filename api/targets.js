const api = require('../helpers/request-helper')('targets')

/**
 *
 * @param model {
 *    'type': 'leads',
 *    'user': 'sales-agent@y-dff.com',
 *    'value' : 1
 *   }
 * @param context
 */
exports.achieved = async (model, context) => {
    return api.create(model, { path: 'achieved' }, context)
}

exports.create = async (model, context) => {
    return api.create(model, null, context)
}

exports.update = async (id, model, context) => {
    return api.create(id, model, null, context)
}

exports.search = async (query, context) => {
    return api.search(query, null, context)
}

exports.get = async (id, context) => {
    return api.get(id, null, context)
}
