Discourse.Utilities.avatarUrl = function(template, size) {
  if (!template) { return ""; }
  if (size <= 50 && size != 45) {
    template = template.replace(/\.[a-zA-Z]+\?/, '.jpg?');
  }
  if (size === 45) {
    // Post template
    return template.replace(/\{size\}/g, 'thumb');
  } else if (size <= 25) {
    return template.replace(/\{size\}/g, 'small');
  } else if (size <= 50) {
    return template.replace(/\{size\}/g, 'thumb_small');
  } else {
    return template.replace(/\{size\}/g, 'thumb');
  }
}

Ember.Handlebars.registerBoundHelper('avatar', function(user, options) {
  if (user) {
    var username = Em.get(user, 'username');
    if (!username) username = Em.get(user, options.hash.usernamePath);

    var title;
    if (!options.hash.ignoreTitle) {
      title = Em.get(user, 'title');
      if (!title) {
        var description = Em.get(user, 'description');
        if (description && description.length > 0) {
          title = username + " - " + description;
        }
      }
    }

    var avatarTemplate = Em.get(user, 'avatar_template') || Em.get(user, 'user.avatar_template');

    return new Handlebars.SafeString(Discourse.Utilities.avatarImg({
      size: options.hash.imageSize,
      extraClasses: Em.get(user, 'extras') || options.hash.extraClasses,
      title: title || username,
      avatarTemplate: Handlebars.Utils.escapeExpression(avatarTemplate)
    }));
  } else {
    return '';
  }
});

Em.Handlebars.helper('bound-avatar', function(user, size, uploadId) {
  var avatarTemplate = Em.get(user, 'avatar_template');

  return new Handlebars.SafeString(Discourse.Utilities.avatarImg({
    size: size,
    avatarTemplate: Handlebars.Utils.escapeExpression(avatarTemplate)
  }));
}, 'avatar_template');

