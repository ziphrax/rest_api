module.exports = {
    return404: function(req, res, next) {
      res.status(404).sendFile(path.resolve('views/404.htm'));
    }
}
