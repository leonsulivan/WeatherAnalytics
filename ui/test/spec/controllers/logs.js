'use strict';

describe('Controller: LogsCtrl', function () {

  // load the controller's module
  beforeEach(module('weatherAnalytics'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('LogsCtrl', {
      $scope: scope
    });
  }));

  it('There should be no logs', function () {
    expect(scope.content).toBe('There are no errors to show');
  });
});
