tigoApp.factory('ServiceLinksRepository', function($cordovaSQLite, DBA) {
  var self = this;

  self.all = function() {
    return DBA.query("SELECT id,name,value,service_id FROM service_links")
      .then(function(result){
        return DBA.getAll(result);
      });
  }

  self.get = function(serviceId) {
    var parameters = [parseInt(serviceId)];
    return DBA.query("SELECT id,name,value,service_id FROM  service_links  WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  }

  self.getByService = function(serviceId){
    var parameters = [parseInt(serviceId)];
    return DBA.query("SELECT id,name,value,service_id FROM service_links WHERE service_id = (?)",parameters)
              .then(function(result){
                return DBA.getAll(result);
              });
  }

  self.countAll = function(){
    return DBA.query("SELECT COALESCE(count(id), 0) as count FROM service_links;").
    then(function(result){
      return result.rows.item(0).count;
    });
  }

  self.add = function(serviceLinks) {
    var parameters = [ serviceLinks.name,serviceLinks.value,serviceLinks.service_id];
    return DBA.query("INSERT INTO service_links (name,value,service_id) VALUES (?,?,?)", parameters);
  }

  self.remove = function(service) {
    var parameters = [service.id];
    return DBA.query("DELETE FROM service_links WHERE id = (?)", parameters);
  }

  self.update = function(originalServiceLinks, editServiceLinks) {
    var parameters = [editService.id, editService.name,editService.value,editService.service_id,originalServiceLinks.id];
    return DBA.query("UPDATE service_links SET id = (?), name = (?),value =(?),service_id = (?) WHERE id = (?)", parameters);
  }

  return self;
})