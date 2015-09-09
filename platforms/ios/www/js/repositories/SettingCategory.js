tigoApp.factory('CategoryRepository', function($cordovaSQLite, DBA) {
  var self = this;
  
  self.all = function() {
    return DBA.query("SELECT key,value FROM settings")
      .then(function(result){
        return DBA.getAll(result);
      });
  }

  self.get = function(key) {
    var parameters = [key];
        return DBA.query("SELECT key,value FROM  settings WHERE key = (?)", parameters)
                  .then(function(result) {
                    return DBA.getById(result);
                  });
  }
  self.countAll = function(){
    return DBA.query("SELECT COALESCE(count(id), 0) as count from settings;")
              .then(function(result){
                  return result.rows.item(0).count;
              });
  }
  self.add = function(key,value) {
    var parameters = [key,value];
    return DBA.query("INSERT INTO settings (key,value ) VALUES (?,?)", parameters);
  }

  self.remove = function(key) {
    var parameters = [key];
    return DBA.query("DELETE FROM settings WHERE key = (?)", parameters);
  }
  self.update = function(key,value) {
    var parameters = [value,key];
    return DBA.query("UPDATE settings SET value = (?), WHERE key = (?)", parameters);
  }
  return self;
})