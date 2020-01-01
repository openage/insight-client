const journalsApi = require('../helpers/request-helper')('journals')

exports.start = (entity, action, context) => {
    const changes = []

    let builder = {
        add: (field, value, oldValue) => {
            if (value === oldValue) {
                return builder
            }
            changes.push({
                field: field,
                value: value,
                oldValue: oldValue,
                type: value ? typeof value : typeof oldValue
            })
            return builder
        },
        end: async (message) => {
            return journalsApi.create({
                type: action,
                entity: typeof entity === 'function' ? entity() : entity,
                message: message,
                changes: changes
            }, null, context)
        }
    }

    return builder
}

exports.create = (model, context) => {
    return journalsApi.create(model, context)
}

exports.search = async (query, context) => {
    return journalsApi.search(query, null, context)
}

exports.get = async (id, context) => {
    return journalsApi.get(id, null, context)
}
