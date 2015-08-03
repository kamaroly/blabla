tigoApp.factory('SettingRepository', function($cordovaSQLite, DBA) {
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
    return DBA.query("SELECT COALESCE(count(key), 0) as count from settings;")
              .then(function(result){
                  return result.rows.item(0).count;
              });
  }
  self.add = function(setting) {
    var parameters = [setting.key,setting.value];
    return DBA.query("INSERT INTO settings (key,value ) VALUES (?,?)", parameters);
  }

  self.remove = function(setting) {
    var parameters = [setting.id];
    return DBA.query("DELETE FROM settings WHERE id = (?)", parameters);
  }
  self.update = function(key, value) {
    var parameters = [value,key];
    return DBA.query("UPDATE settings SET value = (?),value = (?) WHERE key = (?)", parameters);
  }
  return self;
})