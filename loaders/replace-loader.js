const {getOptions} = require('loader-utils')

module.exports = function(source){
    let options = getOptions(this)
    console.log(options)
    return source.replace(options.name, options.name.toUpperCase());
}
