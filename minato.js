if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function() {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click #facebook-login': function(event) {
      Meteor.loginWithFacebook({ loginStyle: "redirect"}, function(err) {
        if (err) {
          throw new Meteor.Error("Facebook login failed");
        }
      });
    },

    'click #logout': function(event) {
      Meteor.logout(function(err) {
        if (err) {
          throw new Meteor.Error("Logout failed");
        }
      })
    }
  });
}

if (Meteor.isServer) {
  ServiceConfiguration.configurations.remove({
    service: 'facebook'
  });

  ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '466735446860010',
    secret: '3360659659b9cd5886b92038f2974410'
  });

  Meteor.startup(function() {
    // code to run on server at startup
  });
}
