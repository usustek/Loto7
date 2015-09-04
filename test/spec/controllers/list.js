'use strict';

describe('Controller: ListCtrl', function () {

  // load the controller's module
  beforeEach(module('lotoApp'));

  var ListCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    ListCtrl = $controller('ListCtrl', {
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ListCtrl.awesomeThings.length).toBe(3);
  });
});
