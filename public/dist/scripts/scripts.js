"use strict";angular.module("weatherAnalytics",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","mgcrea.ngStrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/apis",{templateUrl:"views/apis.html",controller:"ApisCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).when("/logs",{templateUrl:"views/product-logs.html",controller:"LogsCtrl"}).when("/history",{templateUrl:"views/history.html",controller:"HistoryCtrl"}).when("/forecast",{templateUrl:"views/forecast.html",controller:"ForecastCtrl"}).otherwise({templateUrl:"views/404.html",controller:"ErrorCtrl"})}]).run(["$rootScope","notificationsService",function(a,b){a.$on("$routeChangeStart",function(){b.stopLoading(),b.removeMessage()})}]),angular.module("weatherAnalytics").controller("IndexCtrl",["$scope","pageService","messagesService",function(a,b,c){b.setApplicationName(c.get("TITLE_APPLICATION")),a.page=b,a.tooltipGithub={title:c.get("MESSAGE_SOCIAL_GITHUB")},a.tooltipBitBucket={title:c.get("MESSAGE_SOCIAL_BITBUCKET")},a.tooltipYoutube={title:c.get("MESSAGE_SOCIAL_YOUTUBE")},a.tooltipLinkedin={title:c.get("MESSAGE_SOCIAL_LINKEDIN")},a.tooltipWebsite={title:c.get("MESSAGE_SOCIAL_WEBSITE")},a.headerIn=!1,a.headerClick=function(){a.headerIn=!a.headerIn}}]),angular.module("weatherAnalytics").controller("MainCtrl",["$scope","pageService","messagesService",function(a,b,c){b.setPageName(c.get("TITLE_PAGE_MAIN"))}]),angular.module("weatherAnalytics").controller("AboutCtrl",["$scope","pageService","messagesService",function(a,b,c){b.setPageName(c.get("TITLE_PAGE_ABOUT"))}]),angular.module("weatherAnalytics").controller("ApisCtrl",["$scope","pageService","messagesService",function(a,b,c){b.setPageName(c.get("TITLE_PAGE_APIS"))}]),angular.module("weatherAnalytics").controller("ContactCtrl",["$scope","pageService","messagesService",function(a,b,c){b.setPageName(c.get("TITLE_PAGE_CONTACT"))}]),angular.module("weatherAnalytics").controller("ErrorCtrl",["$scope","pageService","messagesService",function(a,b,c){b.setPageName(c.get("TITLE_PAGE_ERROR"))}]),angular.module("weatherAnalytics").controller("NotificationsCtrl",["$scope","notificationsService",function(a,b){a.notifications=b}]),angular.module("weatherAnalytics").controller("LogsCtrl",["$scope","pageService","exceptionLogger","messagesService",function(a,b,c,d){b.setPageName(d.get("TITLE_PAGE_LOGS")),a.content=d.get("MESSAGE_LOGS_EMPTY"),a.reload=function(){var b=c.getLogs();a.content=b&&""!==b?b:d.get("MESSAGE_LOGS_EMPTY")},a.clear=function(){c.clearLogs(),a.reload()},a.reload()}]),angular.module("weatherAnalytics").controller("HistoryCtrl",["$scope","$timeout","$location","$route","pageService","messagesService","apiCallerService","unitsService","notificationsService","datesService",function(a,b,c,d,e,f,g,h,i,j){a.cities=[],a.selectedCity=void 0,a.units=h.getUnits(),a.selectedUnit=void 0,a.fromDate=void 0,a.untilDate=void 0,a.history=void 0,a.consolidation=void 0;var k=function(){a.selectedCity&&c.search({city:a.selectedCity.name,country:a.selectedCity.country,unit:a.selectedUnit.type,from:j.getString(a.fromDate),until:j.getString(a.untilDate)})},l=function(){var b=c.search();a.selectedCity=void 0,a.cities.forEach(function(c){c.name===b.city&&c.country===b.country&&(a.selectedCity=c)}),a.selectedUnit=void 0;for(var d=0;d<a.units.length;d++)b.unit===a.units[d].type&&(a.selectedUnit=a.units[d]);return a.fromDate=j.getDate(b.from),a.untilDate=j.getDate(b.until),a.selectedCity||a.selectedUnit||a.fromDate||a.untilDate},m=function(){var c;return a.selectedCity?a.selectedUnit?(!a.fromDate||!a.untilDate||a.fromDate>a.untilDate)&&(c=f.get("MESSAGE_HISTORY_ERROR_RANGE")):c=f.get("MESSAGE_HISTORY_ERROR_UNIT"):c=f.get("MESSAGE_HISTORY_ERROR_CITY"),c?(i.addError(c),b(function(){i.removeMessage()},3e3),!1):!0},n=function(b){a.history=b.history,a.consolidation=b.consolidation,k()};a.fetchHistory=function(){m()&&g.get(a,"/api/history/"+a.selectedCity.name+"/"+a.selectedCity.country+"/from/"+a.fromDate+"/until/"+a.untilDate,g.API_CONSTANTS.SUCCESS,n)},a.getTemperatureMax=function(){return this.consolidation?h.getTemperature(this.consolidation.maxTemperature,a.selectedUnit):"?"},a.getTemperatureMin=function(){return this.consolidation?h.getTemperature(this.consolidation.minTemperature,a.selectedUnit):"?"},a.getTemperatureAvg=function(){var b;return this.consolidation&&this.consolidation.sumMaxTemperature&&(b={celsius:0,fahrenheit:0},this.consolidation.sumMaxTemperature.celsius&&this.consolidation.nbMaxTemperature&&(b.celsius=this.consolidation.sumMaxTemperature.celsius/this.consolidation.nbMaxTemperature),this.consolidation.sumMaxTemperature.fahrenheit&&this.consolidation.nbMaxTemperature&&(b.fahrenheit=this.consolidation.sumMaxTemperature.fahrenheit/this.consolidation.nbMaxTemperature)),h.getTemperature(b,a.selectedUnit)},a.getWindSpeedMax=function(){return this.consolidation?h.getSpeed(this.consolidation.maxWindSpeed,a.selectedUnit):"?"},a.getWindSpeedMin=function(){return this.consolidation?h.getSpeed(this.consolidation.minWindSpeed,a.selectedUnit):"?"},a.getWindSpeedAvg=function(){var b;return this.consolidation&&this.consolidation.sumWindSpeed&&(b={kmph:0,mph:0},this.consolidation.sumWindSpeed.kmph&&this.consolidation.nbWindSpeed&&(b.kmph=this.consolidation.sumWindSpeed.kmph/this.consolidation.nbWindSpeed),this.consolidation.sumWindSpeed.mph&&this.consolidation.nbMaxTemperature&&(b.mph=this.consolidation.sumWindSpeed.mph/this.consolidation.nbWindSpeed)),h.getSpeed(b,a.selectedUnit)},a.getPrecipitationMax=function(){return this.consolidation&&h.isDefined(this.consolidation.maxPrecipitation)?h.getNumericValue(this.consolidation.maxPrecipitation,!0)+" mm":"?"},a.getPrecipitationMin=function(){return this.consolidation&&h.isDefined(this.consolidation.minPrecipitation)?h.getNumericValue(this.consolidation.minPrecipitation,!0)+" mm":"?"},a.getPrecipitationAvg=function(){if(!this.consolidation||!h.isDefined(this.consolidation.sumPrecipitation))return"?";var a=0;return this.consolidation.nbPrecipitation&&(a=this.consolidation.sumPrecipitation/this.consolidation.nbPrecipitation),h.getNumericValue(a,!0)+" mm"};var o=function(){a.history=void 0,a.consolidation=void 0,l()&&a.fetchHistory()};e.setPageName(f.get("TITLE_PAGE_HISTORY"));var p=d.current;a.$on("$locationChangeSuccess",function(){d.current.$$route&&"HistoryCtrl"===d.current.$$route.controller&&(d.current=p,o())}),g.watchDestroyed(a),g.get(a,"/api/cities",g.API_CONSTANTS.SUCCESS,function(b){b&&b.cities&&(a.cities=b.cities,o())})}]),angular.module("weatherAnalytics").controller("ForecastCtrl",["$scope","$filter","$location","$route","pageService","messagesService","apiCallerService","unitsService",function(a,b,c,d,e,f,g,h){var i,j;a.cities=[],a.selectedCity=void 0,a.units=h.getUnits(),a.selectedUnit=void 0,a.forecast={};var k=function(){a.selectedCity&&c.search({city:a.selectedCity.name,country:a.selectedCity.country,unit:a.selectedUnit.type})},l=function(){var b=c.search();if(b.city&&b.country&&(i=b.city,j=b.country),b.unit)for(var d=0;d<a.units.length;d++)b.unit===a.units[d].type&&(a.selectedUnit=a.units[d]);a.selectedUnit||(a.selectedUnit=a.units[0])},m=function(b){b&&(a.cities=b.cities),a.cities.forEach(function(b){b.name===i&&b.country===j&&(a.selectedCity=b)})},n=function(){a.selectedCity&&a.selectedCity.name&&a.selectedCity.country&&(k(),g.get(a,"/api/forecast/"+a.selectedCity.name+"/"+a.selectedCity.country,g.API_CONSTANTS.SUCCESS,o))},o=function(b){a.forecast=b.forecast},p=function(){a.selectedUnit&&k()};a.getDayofWeek=function(a){return b("date")(new Date(a.date),"EEEE, dd")},a.getTemperatureMax=function(b){return h.getTemperature(b.temperatureMax,a.selectedUnit)},a.getTemperatureMin=function(b){return h.getTemperature(b.temperatureMin,a.selectedUnit)},a.getPrecipitation=function(a){return h.getNumericValue(a.precipitation,!0)},a.getWindSpeed=function(b){return h.getSpeed(b.windSpeed,a.selectedUnit)},a.getDirectionDay=function(a){return a.windDirection?Math.round(a.windDirection/45):0},e.setPageName(f.get("TITLE_PAGE_FORECAST")),l();var q=d.current;a.$on("$locationChangeSuccess",function(){d.current.$$route&&"ForecastCtrl"===d.current.$$route.controller&&(d.current=q,l(),m())}),g.watchDestroyed(a),a.$watch("selectedCity",n),a.$watch("selectedUnit",p),g.get(a,"/api/cities",g.API_CONSTANTS.SUCCESS,m)}]),angular.module("weatherAnalytics").service("pageService",function(){this.applicationName=void 0,this.pageName=void 0,this.loading=!1,this.setApplicationName=function(a){this.applicationName=a},this.setPageName=function(a){this.pageName=a},this.getTitle=function(){var a="";return this.pageName&&(a+=this.pageName),this.pageName&&this.applicationName&&(a+=" - "),this.applicationName&&(a+=this.applicationName),a}}),angular.module("weatherAnalytics").service("notificationsService",["$timeout",function(a){this.MESAGE_TYPE={NONE:0,INFO:1,ERROR:2},this.message=void 0,this.type=this.MESAGE_TYPE.NONE,this.loading=!1,this.stopLoadingPending=!1,this.isLoading=function(){return this.loading},this.startLoading=function(){this.loading=!0,this.stopLoadingPending=!1,this.message=void 0,this.type=this.MESAGE_TYPE.NONE},this.stopLoading=function(){if(this.stopLoadingPending=!0,this.loading){var b=this;a(function(){b.stopLoadingPending&&(b.loading=!1)},100)}},this.isInfo=function(){return this.type===this.MESAGE_TYPE.INFO},this.isError=function(){return this.type===this.MESAGE_TYPE.ERROR},this.getMessage=function(){return this.message},this.addInfo=function(a){this.message=a,this.type=this.MESAGE_TYPE.INFO,this.loading=!1},this.addError=function(a){this.message=a,this.type=this.MESAGE_TYPE.ERROR,this.loading=!1},this.removeMessage=function(){this.message=void 0,this.type=this.MESAGE_TYPE.NONE}}]),angular.module("weatherAnalytics").service("apiCallerService",["$http","notificationsService","exceptionLogger","messagesService",function(a,b,c,d){this.API_CONSTANTS={UNKNOWN:0,SUCCESS:1,PROCESSING:2,ERROR_UNKNOWN:100,ERROR_API_NOT_FOUND:110,ERROR_PARAMETER_MISSING:120,ERROR_PARAMETER_WRONG_VALUE:121},this.watchDestroyed=function(a){a.$on("$destroy",function(){a.destroyed=!0})},this.handleError=function(a){var e="";e=a.result&&a.message?d.get("MESSAGE_API_SPECIFIC_ERROR")+a.message:d.get("MESSAGE_API_UNKNOWN_ERROR"),b.addError(e),c.handleError(e)},this.get=function(e,f,g,h,i){var j=this;b.startLoading();try{a.get(f).success(function(a){if(!e.destroyed){if(!a.result||a.result!==g)return void i(a,200);b.stopLoading(),h&&h(a)}}).error(function(a,c){e.destroyed||(b.stopLoading(),i?i(a,c):j.handleError(a,c))})}catch(k){b.addError(d.get("MESSAGE_API_UNKNOWN_ERROR")),c.handleError(d.get("MESSAGE_API_UNKNOWN_ERROR_LOG"),k)}}}]),angular.module("weatherAnalytics").factory("$exceptionHandler",function(){return function(a){try{console.error("Uncatched exception"+a.stack)}catch(b){console.error("Uncatched exception"+a)}try{ErrorLogger.getInstance().handleError("Uncatched exception",a,!0)}catch(b){console.error("Cannot log error message: "+b.stack)}}}).service("exceptionLogger",function(){var a;try{a=ErrorLogger.getInstance()}catch(b){console.error("Cannot load error logger: "+b.stack)}return{handleError:function(b,c,d){a&&a.handleError(b,c,d)},getLogs:function(){return a?a.getLogs():void 0},clearLogs:function(){return a?a.clearLogs():void 0}}}),angular.module("weatherAnalytics").service("messagesService",[function(){var a={TITLE_APPLICATION:"Weather Analytics",TITLE_PAGE_ABOUT:"About",TITLE_PAGE_CONTACT:"Contact",TITLE_PAGE_ERROR:"Error",TITLE_PAGE_MAIN:"Main",TITLE_PAGE_LOGS:"Logs",TITLE_PAGE_HISTORY:"History",TITLE_PAGE_FORECAST:"Forecast",TITLE_PAGE_APIS:"APIs",MESSAGE_SOCIAL_GITHUB:"Visit my Github",MESSAGE_SOCIAL_BITBUCKET:"Visit my BitBucket",MESSAGE_SOCIAL_YOUTUBE:"Visit my Youtube channel",MESSAGE_SOCIAL_LINKEDIN:"Check me on Linkedin",MESSAGE_SOCIAL_WEBSITE:"Visit my website",MESSAGE_LOGS_EMPTY:"There are no errors to show",MESSAGE_API_UNKNOWN_ERROR:"An unknown error occurred during the current operation",MESSAGE_API_UNKNOWN_ERROR_LOG:"An unknown error occurred during an API request",MESSAGE_API_SPECIFIC_ERROR:"The following error occurred during the current operation: ",MESSAGE_FORECAST_UNIT_METRIC:"Metric",MESSAGE_FORECAST_UNIT_IMPERIAL:"Imperial",MESSAGE_HISTORY_ERROR_CITY:"You must select a valid city",MESSAGE_HISTORY_ERROR_UNIT:"You must select a valid unit",MESSAGE_HISTORY_ERROR_RANGE:"You must select a valid range"};this.get=function(b){var c=a[b];return c?c:b}}]),angular.module("weatherAnalytics").service("unitsService",["messagesService",function(a){var b="Metric",c="Imperial";this.units=[{type:b,name:a.get("MESSAGE_FORECAST_UNIT_METRIC")},{type:c,name:a.get("MESSAGE_FORECAST_UNIT_IMPERIAL")}],this.getUnits=function(){return this.units},this.isDefined=function(a){return a||0===a},this.getNumericValue=function(a,b){return this.isDefined(a)?b||Math.floor(a)!==a?a.toFixed(1):a:"?"},this.getSpeed=function(a,b){return a?b.type===c?this.getNumericValue(a.mph)+" mph":this.getNumericValue(a.kmph)+" km/h":"?"},this.getTemperature=function(a,b){return a?b.type===c?this.getNumericValue(a.fahrenheit)+"°F":this.getNumericValue(a.celsius)+"°C":"?"}}]),angular.module("weatherAnalytics").service("datesService",[function(){function a(a){return b(a.getFullYear())+"-"+b(1+a.getMonth())+"-"+b(a.getDate())}function b(a){return 10>a?"0"+a:""+a}this.getDate=function(a){return a?new Date(a):void 0},this.getString=function(b){return b?a(b):void 0}}]);