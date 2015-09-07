'use strict';

describe('Controller: ForecastCtrl', function () {

  // load the controller's module
  beforeEach(module('lotoApp'));

  var ForecastCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    ForecastCtrl = $controller('ForecastCtrl', {
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ForecastCtrl.awesomeThings.length).toBe(3);
  });
});
