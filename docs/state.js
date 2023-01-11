const path = require('path')
const fs = require('fs')

const template = function (_) {
  return {
    isDev: _,
  }
}
const type = process.argv[2]
const _path = path.resolve(__dirname, '.vitepress/Env.json')

function init() {
  let state = false
  if (type == 'dev') state = true
  fs.writeFile(_path, JSON.stringify(template(state)), () => {
    //
  })
}

init()
