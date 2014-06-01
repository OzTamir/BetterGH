Meteor.methods({
	getRepos: function (gh_username) {
		var url = "https://api.github.com/users/" + gh_username + "/repos"
		this.unblock();
        return HTTP.call("GET", url, {'headers' : {'user-agent': 'node.js'}});
	},
    getUser: function (gh_username) {
    	url = "https://api.github.com/users/" + gh_username;
        this.unblock();
        return HTTP.call("GET", url, {'headers' : {'user-agent': 'node.js'}});
    },
    getLang: function (url) {
    	this.unblock();
        return HTTP.call("GET", url, {'headers' : {'user-agent': 'node.js'}});
    }
});