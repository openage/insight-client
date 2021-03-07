const api = require('../helpers/request-helper')('tags')

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
