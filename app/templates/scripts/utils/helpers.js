Handlebars.registerHelper('outlet', function(name) {
  return new Handlebars.SafeString('<div id="outlet-' + name + '"></div>');
});

Handlebars.registerHelper('debug', function(optionalValue) {
  console.log('\nCurrent Context');
  console.log('====================');
  console.log(this);

  if (arguments.length > 1) {
    console.log('Value');
    console.log('====================');
    console.log(optionalValue);
  }
});

Handlebars.registerHelper('empty', function(val, options) {
  if(_.isEmpty(val)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('in', function(val, options) {
  if(val in this) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('notIn', function(val, options) {
  if(!(val in this)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

//  return the first item of a list only
// usage: {{#first items}}{{name}}{{/first}}
Handlebars.registerHelper('first', function(val, options) {
  return options.fn(val[0]);
});

//  format an ISO date using Moment.js
//  http://momentjs.com/
//  moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
//  usage: {{dateFormat creation_date format="MMMM YYYY"}}
Handlebars.registerHelper('dateFormat', function(context, block) {
  if (window.moment) {
    var f = block.hash.format || "MMM Do, YYYY";
    return moment(new Date(context)).format(f);
  } else {
    return context;   //  moment plugin not available. return data as is.
  }
});

Handlebars.registerHelper('fromNow', function(context, block) {
  if (window.moment) {
    moment.lang('en');
    if (block.hash.short) {
      moment.lang('en-short');
    }
    return moment((new Date(context))).fromNow();
  } else {
    return context;   //  moment plugin not available. return data as is.
  }
});

// {{pluralCount dogCount 'dog'}} {{pluralize dogCount 'has' 'have'}} gone for a walk
Handlebars.registerHelper('pluralize', function(number, singular, plural) {
    if (number === 1)
        return singular;
    else
        return (typeof plural === 'string' ? plural : singular + 's');
});

Handlebars.registerHelper('pluralCount', function(number, singular, plural) {
    return number+' '+Handlebars.helpers.pluralize.apply(this, arguments);
});

Handlebars.registerHelper('truncate', function(str, length, omission) {
  var omissionLength = 3;
  if (!_.isString(omission)) {
    omission = '&hellip;';
  } else {
    omissionLength = omission.length;
  }
  if (str.length > length) {
    str = str.substring(0, length - omissionLength) + omission;
  }
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('breaklines', function(text) {
  if (!text) {
    return '';
  }
  // text = Handlebars.Utils.escapeExpression(text);
  text = text.toString();
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
  return new Handlebars.SafeString(text);
});

Handlebars.registerHelper('breaklinesWithLinks', function(text) {
  if (!text) {
    return '';
  }
  // text = Handlebars.Utils.escapeExpression(text);
  text = text.toString();
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
  return new Handlebars.SafeString(linkify(text));
});

/**
 * If Equals
 * if_eq this compare=that
 */
Handlebars.registerHelper('if_eq', function(context, options) {
    if (context == options.hash.compare)
        return options.fn(this);
    return options.inverse(this);
});

/**
 * Unless Equals
 * unless_eq this compare=that
 */
Handlebars.registerHelper('unless_eq', function(context, options) {
    if (context == options.hash.compare)
        return options.inverse(this);
    return options.fn(this);
});

/**
 * If Greater Than
 * if_gt this compare=that
 */
Handlebars.registerHelper('if_gt', function(context, options) {
    if (context > options.hash.compare)
        return options.fn(this);
    return options.inverse(this);
});

/**
 * Unless Greater Than
 * unless_gt this compare=that
 */
Handlebars.registerHelper('unless_gt', function(context, options) {
    if (context > options.hash.compare)
        return options.inverse(this);
    return options.fn(this);
});

/**
 * If Less Than
 * if_lt this compare=that
 */
Handlebars.registerHelper('if_lt', function(context, options) {
    if (context < options.hash.compare)
        return options.fn(this);
    return options.inverse(this);
});

/**
 * Unless Less Than
 * unless_lt this compare=that
 */
Handlebars.registerHelper('unless_lt', function(context, options) {
    if (context < options.hash.compare)
        return options.inverse(this);
    return options.fn(this);
});

/**
 * If Greater Than or Equal To
 * if_gteq this compare=that
 */
Handlebars.registerHelper('if_gteq', function(context, options) {
    if (context >= options.hash.compare)
        return options.fn(this);
    return options.inverse(this);
});

/**
 * Unless Greater Than or Equal To
 * unless_gteq this compare=that
 */
Handlebars.registerHelper('unless_gteq', function(context, options) {
    if (context >= options.hash.compare)
        return options.inverse(this);
    return options.fn(this);
});

/**
 * If Less Than or Equal To
 * if_lteq this compare=that
 */
Handlebars.registerHelper('if_lteq', function(context, options) {
    if (context <= options.hash.compare)
        return options.fn(this);
    return options.inverse(this);
});

/**
 * Unless Less Than or Equal To
 * unless_lteq this compare=that
 */
Handlebars.registerHelper('unless_lteq', function(context, options) {
    if (context <= options.hash.compare)
        return options.inverse(this);
    return options.fn(this);
});

/**
 * Convert new line (\n\r) to <br>
 * from http://phpjs.org/functions/nl2br:480
 */
Handlebars.registerHelper('nl2br', function(text) {
    text = Handlebars.Utils.escapeExpression(text);
    var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
    return new Handlebars.SafeString(nl2br);
});
