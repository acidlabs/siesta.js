(function() {
  var GithubSiesta;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  GithubSiesta = (function() {

    __extends(GithubSiesta, Siesta);

    function GithubSiesta() {
      GithubSiesta.__super__.constructor.apply(this, arguments);
    }

    GithubSiesta.prototype.host = "api.github.com";

    GithubSiesta.prototype.cors = false;

    GithubSiesta.prototype.orgRepos = function(org, data, callback) {
      var options, path;
      if (callback === void 0) {
        callback = options;
        options = {};
      }
      path = "/orgs/" + org + "/repos";
      return this.request(path, options, callback);
    };

    GithubSiesta.prototype.userRepos = function(user, data, callback) {
      var options, path;
      if (callback === void 0) {
        callback = options;
        options = {};
      }
      path = "/users/" + user + "/repos";
      return this.request(path, options, callback);
    };

    GithubSiesta.prototype.getRepo = function(user, repo, data, callback) {
      var options, path;
      if (callback === void 0) {
        callback = options;
        options = {};
      }
      path = "/repos/" + user + "/" + repo;
      return this.request(path, options, callback);
    };

    return GithubSiesta;

  })();

  this.GithubSiesta = GithubSiesta;

}).call(this);
