(function() {
  var Siesta;

  Siesta = (function() {

    function Siesta(options) {
      var host, port, proto;
      if (options == null) options = {};
      proto = options.proto || "https";
      host = options.host || this.host;
      port = options.port || (proto === "https" ? "443" : "80");
      this.cors = options.cors || this.cors;
      this.apiUrl = proto + "://" + host + ":" + port;
    }

    Siesta.prototype.request = function(path, data, callback) {
      if (this.cors) {
        return this.requestCORS(path, data, callback);
      } else {
        return this.requestJSONP(path, data, callback);
      }
    };

    Siesta.prototype.requestCORS = function(path, data, callback) {
      var self;
      if (data == null) data = {};
      self = this;
      try {
        return $.ajax({
          url: this.apiUrl + path,
          dataType: 'json',
          data: data,
          traditional: true,
          success: function(response) {
            return callback(null, response);
          },
          error: function(xhr, textStatus, err) {
            if (!(err != null)) {
              err = {
                error: true,
                code: xhr.status
              };
              try {
                err.message = JSON.parse(responseText).message;
              } catch (e) {
                err.message = xhr.statusText;
              }
              return callback(err);
            } else {
              if (window.console) console.error(path, xhr, textStatus, err);
              if (self.cors === "auto") {
                self.cors = false;
                return self.requestJSONP(path, data, callback);
              } else {
                return callback(err);
              }
            }
          }
        });
      } catch (err) {
        if (self.cors === "auto") {
          self.cors = false;
          return self.requestJSONP(path, data, callback);
        } else {
          throw err;
        }
      }
    };

    Siesta.prototype.requestJSONP = function(path, data, callback) {
      if (data == null) data = {};
      data = $.param(data, true) + '&callback=?';
      return $.ajax({
        url: this.apiUrl + path,
        dataType: 'json',
        data: data,
        success: function(response) {
          var error;
          if (response.error) {
            error = new Error(response.message);
            error.code = response.code;
            return callback(error);
          } else {
            return callback(null, response.data);
          }
        },
        error: function(xhr, ajaxOptions, err) {
          return callback(err);
        }
      });
    };

    return Siesta;

  })();

  this.Siesta = Siesta;

}).call(this);
