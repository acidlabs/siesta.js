describe("github", function(){
  	describe("github::repos", function() {
  		var github, container;

		beforeEach(function() {
	  		github = new GithubSiesta();
	  	});

	  	it("retrieves acid repos", function() {
	      	github.orgRepos('acidlabs', {}, console.info);
	  	});

	  	it("retrieves user repos", function() {
	      	github.userRepos('gertfindel', {}, console.info);
	  	});
  	});
});
