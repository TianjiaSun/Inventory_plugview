'use strict';

var store = angular.module('store',['ngRoute','webcam'])
  .controller('StoreListCtrl', function($scope, $http, $route, $routeParams, $sce, $timeout) {

    $scope.LargeCards_flag = false;
    $scope.MediumCards_flag = true;
    $scope.SmallCards_flag = false;

    $scope.full_screen_edit = false;
    $scope.full_screen_camera = false;
    $scope.full_screen_vendor = false;
    $scope.full_screen_packaging = false;

    $scope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
      $scope.productId = $routeParams.productId
      $scope.data;
      var req = {
        method: 'POST',
        url: 'http://asa.gausian.com',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param({user_app_id:'app_id', service_app_name:'Product', request_string: "get on id=" + $scope.productId})
      };

      // get product info from ASA
      $http(req).success(function(data) {
        $scope.products = angular.fromJson(data.response);
      });
    });

    // to avoid flashing during page loading
    $scope.init = function () {
      $("#list_container").fadeIn(1000);
      $("#scan_top").fadeIn(1000);
    };

    // change to large cards
    $scope.LargeCards = function () {
      $scope.LargeCards_flag = true;
      $scope.MediumCards_flag = false;
      $scope.SmallCards_flag = false;
    }

    // change to large cards
    $scope.MediumCards = function () {
      $scope.LargeCards_flag = false;
      $scope.MediumCards_flag = true;
      $scope.SmallCards_flag = false;
    }

    // change to large cards
    $scope.SmallCards = function () {
      $scope.LargeCards_flag = false;
      $scope.MediumCards_flag = false;
      $scope.SmallCards_flag = true;
    }

    // toggle product enalbe
    $scope.enableToggle = function(product) {
      if(product.enable==="true") {
        product.enable="false";
      }
      else {
        product.enable="true";
      }
    }

    $scope.full_edit = function() {
      $scope.full_screen_edit = true;
      $scope.full_screen_vendor = false;
      $scope.full_screen_precise = false;
      $("#full_screen_overlay").fadeIn(400);
    }

    $scope.full_vendor = function() {
      $scope.full_screen_edit = false;
      $scope.full_screen_vendor = true;
      $scope.full_screen_precise = false;
      $("#full_screen_overlay").fadeIn(400);
    }

    $scope.full_precise = function() {
      $scope.full_screen_edit = false;
      $scope.full_screen_vendor = false;
      $scope.full_screen_precise = true;
      $("#full_screen_overlay").fadeIn(400);
    }

    $scope.switch_to_edit = function () {
      $scope.full_screen_edit = true;
      $scope.full_screen_vendor = false;
      $scope.full_screen_precise = false;
    }

    $scope.switch_to_vendor = function () {
      $scope.full_screen_edit = false;
      $scope.full_screen_vendor = true;
      $scope.full_screen_precise = false;
    }

    $scope.switch_to_precise = function () {
      $scope.full_screen_edit = false;
      $scope.full_screen_vendor = false;
      $scope.full_screen_precise = true;
    }    

    $scope.close_full_screen = function() {
      $("#full_screen_overlay").hide();
      $("#barcode_scanner").hide();
      $scope.full_screen_edit = false;
      $scope.full_screen_vendor = false;
      $scope.full_screen_precise = false;
    }

    $scope.scanner = function() {
      $("#barcode_scanner").fadeIn(400);
    }

  })

  .config(function ($routeProvider){
    $routeProvider.
    when('/open=:productId',{
      action: 'open'
    })
  });