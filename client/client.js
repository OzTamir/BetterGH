Template.content.helpers({
  showUser: function () {
    return Session.get("showUser");
  }
});

Template.repos.repos = function(){
  if(Session.get('repos'))
    return EJSON.parse(Session.get('repos').content)
};

Template.repo.created = function () {
  var self = this.data
    Meteor.call('getLang', this.data.languages_url, function(err, res){
      if(err)
        console.log('ERROR');
      else {
        Session.set(self.id, res.content)
        console.log(res)
      }
    })
};

Template.repo.lang = function(){
  if(Session.get(this.id)){
    console.log(this)
    lang = EJSON.parse(Session.get(this.id));
    total = 0
    for (var key in lang) {
      total += lang[key]
    }
    types = ['warning', 'info', 'success', 'danger']
    new_lang = [];
    for (var key in lang){
      prec = Math.round(lang[key] * 100 / total);
      type = types[Math.floor(Math.random() * types.length)];
      if prec > 0:
        new_lang.push({'lang_name' : key, 'lang_prec' : prec, 'type' : type});
    }
    return new_lang;
  }
}

Template.user.user = function(){
  if(Session.get('repos'))
    return EJSON.parse(Session.get('user').content)
};

Template.hero.events({
  'click #goBtn' : function(e){
    e.preventDefault();
    var username = document.getElementById("username").value;
      if(username != ""){
        Meteor.call('getUser', username, function(err, result){
          if(err)
            console.log('ERROR');
          else {
            console.log(result)
            Session.set('user', result);
            Session.set('showUser', true);
          }
        })
        Meteor.call('getRepos', username, function(err, result){
          if(err)
            console.log('ERROR');
          else
            Session.set('repos', result);
        })
    }
    else{
      $('.noName').modal('show');
    }
  }
});