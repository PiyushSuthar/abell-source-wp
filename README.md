# abell-source-wp
Wordpress source plugin for [Abell](https://abelljs.org)

## Usage

Installing this plugin.

`⚠ This plugin is not stable yet. There are some bugs in it`
```
npm install --save-dev abell-source-wp
```

```js
// In abell.config.js
module.exports = {
  plugins: ['abell-source-wp'],
  wp: {
    url: "https://innovativebeast.com",
    articleLimit: 10
  }
}
```

### Limitations
1. No Pagination.