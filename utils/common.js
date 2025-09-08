function stringFormat(str) {
  var args = Array.prototype.slice.call(arguments, 1);
  return str.replace(/{(\d+)}/g, function(match, index) {
    return args[index] !== undefined ? args[index].toString() : "";
  });
}

module.exports = { stringFormat };