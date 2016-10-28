//启动入口
// require('angular-ui-router');
var app = angular.module('myApp', ["ngRoute", "ui.router"])

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/personal");
    $stateProvider
        .state('personal', {
            url: "/personal",
            templateUrl: "../../html/personal.html",
            controller: "personalCtrl"
        })
        .state('basicSituation', {
            url: "/basicSituation",
            templateUrl: "../../html/basicSituation.html",
            controller: "basicSituationCtrl"
        })
});

// 初始化 swiper
function makeSwiper() {
    var swiperObj = {
        direction: 'horizontal',
        touchMoveStopPropagation: true, //阻止冒泡
        paginationClickable: true,
        pagination: '.swiper-pagination',
        iOSEdgeSwipeDetection: true,
        flip: {
            slideShadows: false
        },
    };
    return new Swiper('.swiper-container', swiperObj);
}

// 1个人信息
app.controller('personalCtrl', function ($scope, $rootScope, $http) {
    console.log("personalCtrl  p1");
    $(".icon-gerenxinxi").addClass("active")
    $rootScope.swiper = makeSwiper()
    $(".swiper-slide").height($(window).height() - 50);

});

// 2基本情况
app.controller('basicSituationCtrl', function ($scope, $rootScope, $http) {
    console.log("basicSituationCtrl  p2");
    $(".icon-xinyongqingkuang-copy").addClass("active")
    $rootScope.swiper = makeSwiper()
    $(".swiper-slide").height($(window).height() - 50);

});

// 上一页下一页
app.directive('changePage', function () {
    return {
        restrict: 'EA',
        replace: true,
        template: '<div class="btn-group btn-group-md"><button type="button" ng-click="prev()" class="btn btn-default">上一页</button><button type="button" ng-click="next()" class="btn btn-default">下一页</button></div>',
        controller: function ($scope, $rootScope) {
            $scope.prev = function () {
                $rootScope.swiper.slidePrev();
            }
            $scope.next = function () {
                $rootScope.swiper.slideNext();
            }
        }
    }
})

// 上一章下一页
app.directive('prevMode', function ($state) {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            pageUrl: '&infoMode'
        },
        template: '<div class="btn-group btn-group-md"><button type="button" ng-click="prev()" class="btn btn-default">上一章</button><button type="button" ng-click="next()" class="btn btn-default">下一页</button></div>',
        controller: function ($scope, $rootScope, $state) {
            $scope.prev = function () {
                $state.go($scope.pageUrl, {}, {
                        reload: true
                    })
                    // $location.path("/" + $scope.pageUrl);
            }
            $scope.next = function () {
                $rootScope.swiper.slideNext();
            }
        }
    }
})

// 上一页下一章
app.directive('nextMode', function ($state) {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            pageUrl: '@infoMode'
        },
        template: '<div class="btn-group btn-group-md"><button type="button" ng-click="prev()" class="btn btn-default">上一页</button><button type="button" ng-click="next()" class="btn btn-default">下一章</button></div>',
        controller: function ($scope, $rootScope, $state) {
            $scope.prev = function () {
                $rootScope.swiper.slidePrev();
            }
            $scope.next = function () {
                $state.go($scope.pageUrl, {}, {
                        reload: true
                    })
                    // $location.path("/" + $scope.pageUrl);
            }
        }
    }
})