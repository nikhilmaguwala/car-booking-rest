const logger  = (req, res, next) => {
  console.log(req.url, req.params, req.query)
  next()
}

module.exports = [logger]