angular.module('myApp').factory('Client', function($resource) {
   var resource =  $resource('/api/v1/clients/:id', { id: '@_id' }, {
      port:":3000",
      id:'@id'
    }, {
      update: {method: 'POST'}
    });
    return resource;
});
