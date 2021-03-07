/* eslint-disable no-undef */
const api = require('../helpers/request-helper')('journals')

exports.start = () => {
    const item = {
        changes: []
    }

    if (arguments.length === 3) {
        item.entity = arguments[0]
        item.action = arguments[1]
        item.context = arguments[2]
    } else if (arguments.length === 2) {
        item.action = arguments[0]
        item.context = arguments[1]
    } else if (arguments.length === 1) {
        item.context = arguments[0]
    }

    let builder = {
        message: (message) => {
            item.message = message
        },
        action: (action) => {
            item.action = action
        },
        entity: (entity) => {
            item.entity = entity
        },
        add: (field, value, oldValue) => {
            if (value === oldValue) {
                return builder
            }
            item.changes.push({
                field: field,
                value: value,
                oldValue: oldValue,
                type: value ? typeof value : typeof oldValue
            })
            return builder
        },
        end: async (message) => {
            item.message = message
            return api.create({
                type: item.action,
                entity: typeof item.entity === 'function' ? item.entity() : item.entity,
                message: item.message,
                changes: item.changes
            }, null, item.context)
        }
    }

    return builder
}

exports.create = async (model, context) => {
    return api.create(model, null, context)
}

exports.search = async (query, context) => {
    return api.search(query, null, context)
}

exports.get = async (id, context) => {
    return api.get(id, null, context)
}
