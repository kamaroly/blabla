tigoApp.factory('CategoryRepository', function($cordovaSQLite, DBA) {
  var self = this;
  
  self.all = function() {
    return DBA.query("SELECT id, name,logo,description,slug FROM categories")
      .then(function(result){
        return DBA.getAll(result);
      });
  }

  self.get = function(categoryId) {
    var parameters = [parseInt(categoryId)];
        return DBA.query("SELECT id, name,logo,description,slug FROM  categories WHERE id = (?)", parameters)
                  .then(function(result) {
                    return DBA.getById(result);
                  });
  }
  self.countAll = function(){
    return DBA.query("SELECT COALESCE(count(id), 0) as count from categories;")
              .then(function(result){
                  return result.rows.item(0).count;
              });
  }
  self.add = function(category) {
    var parameters = [category.id, category.name,category.logo,category.description,category.slug];
    return DBA.query("INSERT INTO categories (id, name,logo,description,slug ) VALUES (?,?,?,?,?)", parameters);
  }

  self.remove = function(category) {
    var parameters = [category.id];
    return DBA.query("DELETE FROM categories WHERE id = (?)", parameters);
  }
  self.update = function(originalCategory, editCategory) {
    var parameters = [editCategory.id, editCategory.name,editCategory.logo,editCategory.description,editCategory.slug,originalCategory.id];
    return DBA.query("UPDATE categories SET id = (?), name = (?),logo =(?),description =(?),slug=(?) WHERE id = (?)", parameters);
  }
  return self;
})