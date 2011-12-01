class GithubSiesta extends Siesta
	host : "api.github.com"
	cors : false

	orgRepos: (org, data, callback) ->
		if (callback is undefined) 
      		callback = options;
      		options = {};
		path = "/orgs/#{org}/repos"
		@request path, options, callback

	userRepos: (user, data, callback) ->
		if (callback is undefined) 
      		callback = options;
      		options = {};
		path = "/users/#{user}/repos"
		@request path, options, callback

	getRepo: (user, repo, data, callback) ->
		if (callback is undefined) 
      		callback = options;
      		options = {};
		path = "/repos/#{user}/#{repo}"
		@request path, options, callback


@GithubSiesta = GithubSiesta