var IndexView = require('views/index');

module.exports = Frame.Controller.extend({
  el: '#container',
  actions: {
    index: function() {
      var indexView = new IndexView();

      this.append(indexView);
    }
  }
});
