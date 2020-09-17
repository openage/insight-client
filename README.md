# insight-client

## journals

```javascript
let insight = require('@open-age/insight-client')

let journal = insight.start('user', 'update', 'context')

journal.add('alias', 'Iron Man', 'Robert Downey')

await journal.end('Iron Man is born')

```

## logs

Push the logs to insight api

In `package.json`

```json
"dependencies": {
    "@open-age/logger": "^1.3.6",
    "@open-age/logger-insight": "^1.0.0"
}
```

In `config.json`

```json
{
    "logger": {
        "@open-age/logger-insight": {
            "level": "silly"
        }
    },
    "providers": {
        "insight": {
            "url": "https://dev.openage.in/insight/api"
        }
    }
}
```

Usage

```javascript
let log = context.logger.start('services/users')
log.info('Tony Stark has become Iron Man')
```
