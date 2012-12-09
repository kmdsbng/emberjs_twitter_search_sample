
var App = Ember.Application.create();


var searchTweets = function(query) {
  return $.Deferred(function(defer) {
    return $.ajax({
      url: 'http://search.twitter.com/search.json',
      dataType: 'jsonp',
      data: {
        result_type: 'recent',
        rpp: 10,
        page: 1,
        q: query
      }
    }).done(function(res) {
      return defer.resolve(res.results);
    });
  }).promise();
};

//// Controllers
App.tweets = Ember.ArrayController.create({
  content: [],
  update: function(query) {
    var _this;
    _this = this;
    searchTweets(query).done(function(tweets) {
      _this.get('content').unshiftObjects(tweets);
    });
  }
});

//// Views
App.ApplicationView = Ember.View.extend({
  query: '#emberjs',
  search: function() {
    App.tweets.update(this.get('query'));
  }
});

App.TweetsView = Ember.View.extend({
  templateName: 'tweets-view',
  tweetsBinding: 'App.tweets.content'
});


