tigoApp.factory('ServiceRepository', function($cordovaSQLite, DBA) {
  var self = this;

  self.all = function() {
    return DBA.query("SELECT id,name,logo,description ,slug,category_id,type FROM services")
      .then(function(result){
        return DBA.getAll(result);
      });
  }

  self.get = function(serviceId) {
    var parameters = [parseInt(serviceId)];
    return DBA.query("SELECT id,name,logo,description,slug,category_id,type FROM  services  WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  }

  self.countAll = function(){
    return DBA.query("SELECT COALESCE(count(id), 0) as count FROM services;").
    then(function(result){
      return result.rows.item(0).count;
    });
  }
  
  self.getByCategory = function(categoryId){
   var parameters = [categoryId];
      return DBA.query("SELECT id,name,logo,description,slug,category_id,type FROM  services WHERE category_id = (?)", parameters)
        .then(function(result) {
          return DBA.getAll(result);
        });
  }

  self.add = function(service) {
    var parameters = [service.id, service.name,service.logo,service.description,service.slug,service.category_id,service.type];
    return DBA.query("INSERT INTO services (id,name,logo,description,slug,category_id ,type) VALUES (?,?,?,?,?,?,?)", parameters);
  }

  self.remove = function(service) {
    var parameters = [service.id];
    return DBA.query("DELETE FROM services WHERE id = (?)", parameters);
  }

  self.update = function(originalService, editService) {
    var parameters = [editService.id, editService.name,editService.logo,editService.description,editService.slug,editService.category_id,editService.type,originalService.id];
    return DBA.query("UPDATE services SET id = (?), name = (?),logo =(?),description =(?),slug=(?),category_id =(?),type =(?) WHERE id = (?)", parameters);
  }

  return self;
})