"use strict";angular.module("weatherAnalytics",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","mgcrea.ngStrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/apis",{templateUrl:"views/apis.html",controller:"ApisCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).when("/logs",{templateUrl:"views/product-logs.html",controller:"LogsCtrl"}).when("/history",{templateUrl:"views/history.html",controller:"HistoryCtrl"}).when("/forecast",{templateUrl:"views/forecast.html",controller:"ForecastCtrl"}).otherwise({templateUrl:"views/404.html",controller:"ErrorCtrl"})}]).run(["$rootScope","notificationsService",function(a,b){a.$on("$routeChangeStart",function(){b.stopLoading(),b.removeMessage()})}]),angular.module("weatherAnalytics").controller("IndexCtrl",["$scope","pageService","messagesService",function(a,b,c){b.setApplicationName(c.get("TITLE_APPLICATION")),a.page=b,a.tooltipGithub={title:c.get("MESSAGE_SOCIAL_GITHUB")},a.tooltipBitBucket={title:c.get("MESSAGE_SOCIAL_BITBUCKET")},a.tooltipYoutube={title:c.get("MESSAGE_SOCIAL_YOUTUBE")},a.tooltipLinkedin={title:c.get("MESSAGE_SOCIAL_LINKEDIN")},a.tooltipWebsite={title:c.get("MESSAGE_SOCIAL_WEBSITE")},a.headerIn=!1,a.headerClick=function(){a.headerIn=!a.headerIn}}]),angular.module("weatherAnalytics").controller("MainCtrl",["$scope","pageService","messagesService",function(a,b,c){b.setPageName(c.get("TITLE_PAGE_MAIN"))}]),angular.module("weatherAnalytics").controller("AboutCtrl",["$scope","pageService","messagesService",function(a,b,c){b.setPageName(c.get("TITLE_PAGE_ABOUT"))}]),angular.module("weatherAnalytics").controller("ApisCtrl",["$scope","pageService","messagesService",function(a,b,c){b.setPageName(c.get("TITLE_PAGE_APIS"))}]),angular.module("weatherAnalytics").controller("ContactCtrl",["$scope","pageService","messagesService",function(a,b,c){b.setPageName(c.get("TITLE_PAGE_CONTACT"))}]),angular.module("weatherAnalytics").controller("ErrorCtrl",["$scope","pageService","messagesService",function(a,b,c){b.setPageName(c.get("TITLE_PAGE_ERROR"))}]),angular.module("weatherAnalytics").controller("NotificationsCtrl",["$scope","notificationsService",function(a,b){a.notifications=b}]),angular.module("weatherAnalytics").controller("LogsCtrl",["$scope","pageService","exceptionLogger","messagesService",function(a,b,c,d){b.setPageName(d.get("TITLE_PAGE_LOGS")),a.content=d.get("MESSAGE_LOGS_EMPTY"),a.reload=function(){var b=c.getLogs();a.content=b&&""!==b?b:d.get("MESSAGE_LOGS_EMPTY")},a.clear=function(){c.clearLogs(),a.reload()},a.reload()}]),angular.module("weatherAnalytics").controller("HistoryCtrl",["$scope","$timeout","$location","$route","pageService","messagesService","apiCallerService","unitsService","notificationsService","datesService",function(a,b,c,d,e,f,g,h,i,j){a.cities=[],a.selectedCity=void 0,a.units=h.getUnits(),a.selectedUnit=void 0,a.currentSearchUnit=void 0,a.fromDate=void 0,a.untilDate=void 0,a.history=void 0,a.consolidation=void 0,a.tabs=[{title:f.get("MESSAGE_HISTORY_TABS_TEMPERATURE_MIN")},{title:f.get("MESSAGE_HISTORY_TABS_TEMPERATURE_MAX")},{title:f.get("MESSAGE_HISTORY_TABS_WIND_SPEED")},{title:f.get("MESSAGE_HISTORY_TABS_PRECIPITATION")}],a.tabs.activeTab=0;var k=function(){a.selectedCity&&c.search({city:a.selectedCity.name,country:a.selectedCity.country,unit:a.selectedUnit.type,from:j.getString(a.fromDate),until:j.getString(a.untilDate)}),a.currentSearchUnit=a.selectedUnit},l=function(){var b=c.search();a.selectedCity=void 0,a.cities.forEach(function(c){c.name===b.city&&c.country===b.country&&(a.selectedCity=c)}),a.selectedUnit=void 0;for(var d=0;d<a.units.length;d++)b.unit===a.units[d].type&&(a.selectedUnit=a.units[d],a.currentSearchUnit=a.units[d]);return a.fromDate=j.getDate(b.from),a.untilDate=j.getDate(b.until),a.selectedCity||a.selectedUnit||a.fromDate||a.untilDate},m=function(){var c;return a.selectedCity?a.selectedUnit?(!a.fromDate||!a.untilDate||a.fromDate>a.untilDate)&&(c=f.get("MESSAGE_HISTORY_ERROR_RANGE")):c=f.get("MESSAGE_HISTORY_ERROR_UNIT"):c=f.get("MESSAGE_HISTORY_ERROR_CITY"),c?(i.addError(c),b(function(){i.removeMessage()},3e3),!1):!0},n=function(b){a.history=b.history,a.consolidation=b.consolidation,k()};a.fetchHistory=function(){m()&&g.get(a,"/api/history/"+a.selectedCity.name+"/"+a.selectedCity.country+"/from/"+j.getString(a.fromDate)+"/until/"+j.getString(a.untilDate),g.API_CONSTANTS.SUCCESS,n)},a.getTemperatureMax=function(){return this.consolidation?h.getTemperature(this.consolidation.maxTemperature,a.currentSearchUnit):"?"},a.getTemperatureMin=function(){return this.consolidation?h.getTemperature(this.consolidation.minTemperature,a.currentSearchUnit):"?"},a.getTemperatureAvg=function(){var b;return this.consolidation&&this.consolidation.sumMaxTemperature&&(b={celsius:0,fahrenheit:0},this.consolidation.sumMaxTemperature.celsius&&this.consolidation.nbMaxTemperature&&(b.celsius=this.consolidation.sumMaxTemperature.celsius/this.consolidation.nbMaxTemperature),this.consolidation.sumMaxTemperature.fahrenheit&&this.consolidation.nbMaxTemperature&&(b.fahrenheit=this.consolidation.sumMaxTemperature.fahrenheit/this.consolidation.nbMaxTemperature)),h.getTemperature(b,a.currentSearchUnit)},a.getWindSpeedMax=function(){return this.consolidation?h.getSpeed(this.consolidation.maxWindSpeed,a.currentSearchUnit):"?"},a.getWindSpeedMin=function(){return this.consolidation?h.getSpeed(this.consolidation.minWindSpeed,a.currentSearchUnit):"?"},a.getWindSpeedAvg=function(){var b;return this.consolidation&&this.consolidation.sumWindSpeed&&(b={kmph:0,mph:0},this.consolidation.sumWindSpeed.kmph&&this.consolidation.nbWindSpeed&&(b.kmph=this.consolidation.sumWindSpeed.kmph/this.consolidation.nbWindSpeed),this.consolidation.sumWindSpeed.mph&&this.consolidation.nbMaxTemperature&&(b.mph=this.consolidation.sumWindSpeed.mph/this.consolidation.nbWindSpeed)),h.getSpeed(b,a.currentSearchUnit)},a.getPrecipitationMax=function(){return this.consolidation&&h.isDefined(this.consolidation.maxPrecipitation)?h.getNumericValue(this.consolidation.maxPrecipitation,!0)+" "+h.getLengthUnit():"?"},a.getPrecipitationMin=function(){return this.consolidation&&h.isDefined(this.consolidation.minPrecipitation)?h.getNumericValue(this.consolidation.minPrecipitation,!0)+" "+h.getLengthUnit():"?"},a.getPrecipitationAvg=function(){if(!this.consolidation||!h.isDefined(this.consolidation.sumPrecipitation))return"?";var a=0;return this.consolidation.nbPrecipitation&&(a=this.consolidation.sumPrecipitation/this.consolidation.nbPrecipitation),h.getNumericValue(a,!0)+" mm"},a.getSunnyDays=function(){return this.consolidation&&h.isDefined(this.consolidation.nbSunnyDays)?h.getNumericValue(this.consolidation.nbSunnyDays):"?"},a.getRainyDays=function(){return this.consolidation&&h.isDefined(this.consolidation.nbRainyDays)?h.getNumericValue(this.consolidation.nbRainyDays):"?"},a.getSnowyDays=function(){return this.consolidation&&h.isDefined(this.consolidation.nbSnowyDays)?h.getNumericValue(this.consolidation.nbSnowyDays):"?"};var o=function(){a.history=void 0,a.consolidation=void 0,l()&&a.fetchHistory()};e.setPageName(f.get("TITLE_PAGE_HISTORY"));var p=d.current;a.$on("$locationChangeSuccess",function(){d.current.$$route&&"HistoryCtrl"===d.current.$$route.controller&&(d.current=p,o())}),g.watchDestroyed(a),g.get(a,"/api/cities",g.API_CONSTANTS.SUCCESS,function(b){b&&b.cities&&(a.cities=b.cities,o())})}]),angular.module("weatherAnalytics").controller("ForecastCtrl",["$scope","$filter","$location","$route","pageService","messagesService","apiCallerService","unitsService",function(a,b,c,d,e,f,g,h){var i,j;a.cities=[],a.selectedCity=void 0,a.units=h.getUnits(),a.selectedUnit=void 0,a.forecast={};var k=function(){a.selectedCity&&c.search({city:a.selectedCity.name,country:a.selectedCity.country,unit:a.selectedUnit.type})},l=function(){var b=c.search();if(b.city&&b.country&&(i=b.city,j=b.country),b.unit)for(var d=0;d<a.units.length;d++)b.unit===a.units[d].type&&(a.selectedUnit=a.units[d]);a.selectedUnit||(a.selectedUnit=a.units[0])},m=function(b){b&&(a.cities=b.cities),a.cities.forEach(function(b){b.name===i&&b.country===j&&(a.selectedCity=b)})},n=function(){a.selectedCity&&a.selectedCity.name&&a.selectedCity.country&&(k(),g.get(a,"/api/forecast/"+a.selectedCity.name+"/"+a.selectedCity.country,g.API_CONSTANTS.SUCCESS,o))},o=function(b){a.forecast=b.forecast},p=function(){a.selectedUnit&&k()};a.getDayofWeek=function(a){return b("date")(new Date(a.date),"EEEE, dd")},a.getTemperatureMax=function(b){return h.getTemperature(b.temperatureMax,a.selectedUnit)},a.getTemperatureMin=function(b){return h.getTemperature(b.temperatureMin,a.selectedUnit)},a.getPrecipitation=function(a){return h.getNumericValue(a.precipitation,!0)+" "+h.getLengthUnit()},a.getWindSpeed=function(b){return h.getSpeed(b.windSpeed,a.selectedUnit)},a.getDirectionDay=function(a){return a.windDirection?Math.round(a.windDirection/45):0},e.setPageName(f.get("TITLE_PAGE_FORECAST")),l();var q=d.current;a.$on("$locationChangeSuccess",function(){d.current.$$route&&"ForecastCtrl"===d.current.$$route.controller&&(d.current=q,l(),m())}),g.watchDestroyed(a),a.$watch("selectedCity",n),a.$watch("selectedUnit",p),g.get(a,"/api/cities",g.API_CONSTANTS.SUCCESS,m)}]),angular.module("weatherAnalytics").directive("graphmetrics",["$timeout","unitsService","messagesService",function(a,b,c){return{restrict:"E",scope:{history:"=",metric:"=",unit:"="},template:'<div class="alert alert-info metric-graph-tooltip" ng-show="hover.data" style="left: {{hover.x}}px; top: {{hover.y}}px">  <div class="panel-body">	<dib class="metric-graph-tooltip-content">		<div class="metric-graph-tooltip-label">Date:</div>		<div class="metric-graph-tooltip-value">{{hover.data.date}}</div>		<div class="metric-graph-tooltip-label">Value:</div>		<div class="metric-graph-tooltip-value">{{hover.data.value}} {{getCurrentUnit()}}</div>	</dl>  </div></div><svg class="metric-graph"></svg>',link:function(a,b){a.savedHitory=void 0,a.hover={data:void 0,x:0,y:0},a.svgRaw=d3.select(b[0]).select(".metric-graph").attr("class","metric-graph"),a.axisGroup=a.svgRaw.append("svg:g").attr("class","metric-graph-axis"),a.dataGroup=a.svgRaw.append("svg:g").attr("class","metric-graph-data"),a.selectionGroup=a.svgRaw.append("svg:g").attr("class","metric-graph-selection"),a.svgElement=$(".metric-graph")},controller:["$scope",function(a){function d(){return{data:[],min:100,max:-100,axis:[],title:""}}function e(c){return c?a.unit.type===b.UNIT_IMPERIAL?c.mph:c.kmph:void 0}function f(c){return c?a.unit.type===b.UNIT_IMPERIAL?c.fahrenheit:c.celsius:void 0}function g(b,c){switch(a.metric){case 0:return f(b[c].temperatureMax);case 1:return f(b[c].temperatureMin);case 2:return e(b[c].windSpeed);case 3:if(b[c].precipitation||0===b[c].precipitation)return b[c].precipitation}}function h(){switch(a.metric){case 0:return c.get("MESSAGE_HISTORY_TABS_TEMPERATURE_MIN")+c.get("MESSAGE_HISTORY_TABS_UNIT",[a.getCurrentUnit()]);case 1:return c.get("MESSAGE_HISTORY_TABS_TEMPERATURE_MAX")+c.get("MESSAGE_HISTORY_TABS_UNIT",[a.getCurrentUnit()]);case 2:return c.get("MESSAGE_HISTORY_TABS_WIND_SPEED")+c.get("MESSAGE_HISTORY_TABS_UNIT",[a.getCurrentUnit()]);case 3:return c.get("MESSAGE_HISTORY_TABS_PRECIPITATION")+c.get("MESSAGE_HISTORY_TABS_UNIT",[a.getCurrentUnit()])}}function i(){var b=d();if(a.history){var c,e;for(c=0;c<a.history.length;c++){var f=g(a.history,c);void 0!==f&&(b.max=Math.max(b.max,Math.ceil(f)),b.min=Math.min(b.min,Math.floor(f))),b.data.push({date:a.history[c].date,value:f,previous:e}),e=f}if(b.title=h(),b.max===b.min)b.axis.push(b.min);else if(b.max>b.min){var i=5,j=(b.max-b.min)/i;for(3!==a.metric&&(j=Math.ceil(j)),c=0;i>=c;c++){var k=b.min+c*j;k<=b.max+1&&(b.axis.push(k),b.max=Math.max(b.max,k))}}}return b}function j(){function b(){return 120}function d(b){return v([{x:f()+g()/2,y:n(b)},{x:a.width,y:n(b)}])}function e(b){return 3===a.metric?b.toFixed(1):b}function f(){return 35}function g(){return 20}function h(){return 5}function i(){return 13}function k(){return"#1967be"}function l(){return"#ddd"}function m(b,c){return a.savedHitory.length<1?a.width/2:c*((a.width-2*g()-f())/(a.savedHitory.data.length-1))+g()+f()}function n(b){return void 0===b?a.height+10:a.savedHitory.max-a.savedHitory.min===0?a.height/2:a.height-2*g()-(b-a.savedHitory.min)*((a.height-4*g())/(a.savedHitory.max-a.savedHitory.min))}function o(a,b){b.append("path").attr("stroke",l).attr("stroke-width",1).attr("fill","none").attr("d",d),a.select("path").attr("d",d)}function p(a,b){b.append("text").attr("text-anchor","end").attr("font-size",i).attr("x",f).attr("y",function(a){return n(a)+i()/3}).text(e),a.select("text").attr("y",function(a){return n(a)+i()/3}).text(e)}function q(c,d){d.append("text").attr("text-anchor",function(b,c){return 0===c?"start":c===a.savedHitory.data.length-1?"end":"middle"}).attr("font-size",i).attr("x",m).attr("y",a.height).attr("opacity",0),c.select("text").transition().duration(1e3).attr("x",m).attr("opacity",1).text(function(c,d){return 0===a.width?"":d%Math.ceil(b()/(a.width/a.savedHitory.data.length))!==0?"":c.date})}function r(b,c){c.append("circle").attr("cx",m).attr("cy",a.height+10).attr("r",h).attr("fill",k).attr("opacity",0),b.select("circle").transition().duration(1e3).attr("cx",m).attr("cy",function(a){return n(a.value)}).attr("opacity",1),b.select("circle").attr("r",function(b){return a.hoverData===b?2*h():h()})}function s(b,c){c.append("circle").attr("r",2*h()).attr("opacity",0).on("mouseover",function(b,c){a.hover.data=b,a.hover.x=d3.event.pageX,a.hover.y=d3.event.pageY+10,c>a.savedHitory.data.length/2&&(a.hover.x-=180),n(b.value)>a.height/2&&(a.hover.y-=90),j(),a.$apply()}).on("mouseout",function(){a.hover.data=void 0,j(),a.$apply()}),b.select("circle").attr("cx",m).attr("cy",function(a){return n(a.value)})}function t(b,c){var d=d3.svg.line().x(function(a){return a.x}).y(function(a){return a.y}).interpolate("linear");c.append("path").attr("stroke",k).attr("stroke-width",4).attr("fill","none").attr("opacity",0).attr("d",function(b,c){return d([{x:m(b,c-1),y:a.height+10},{x:m(b,c),y:a.height+10}])}),b.select("path").transition().duration(1e3).attr("opacity",1).attr("d",function(b,c){return d(0===c||void 0===b.value||void 0===b.previous?[{x:m(b,c-1),y:a.height+10},{x:m(b,c),y:a.height+10}]:[{x:m(b,c-1),y:n(b.previous)},{x:m(b,c),y:n(b.value)}])})}function u(){var b=a.svgRaw.selectAll(".title").data([a.savedHitory.title]);b.enter().append("text").attr("class","title").attr("text-anchor","middle"),b.attr("opacity",1).attr("x",a.width/2).text(function(b){return a.savedHitory.min>a.savedHitory.max?c.get("MESSAGE_HISTORY_NO_DATA"):b}).attr("y",function(){return a.savedHitory.min>a.savedHitory.max?a.height/2:g()-i()/2}),b.exit().remove()}var v=d3.svg.line().x(function(a){return a.x}).y(function(a){return a.y}).interpolate("linear");a.width=a.svgElement.width(),a.height=a.svgElement.height(),a.width&&a.height||(a.width=800,a.height=300);var w=a.axisGroup.selectAll(".metric-graph-axis-y").data(a.savedHitory.axis),x=w.enter().append("svg:g").attr("class","metric-graph-axis-y"),y=w.exit(),z=a.dataGroup.selectAll(".metric-graph-data-day-group").data(a.savedHitory.data),A=z.enter().append("svg:g").attr("class","metric-graph-data-day-group"),B=z.exit(),C=a.selectionGroup.selectAll(".metric-graph-data-day-group").data(a.savedHitory.data),D=C.enter().append("svg:g").attr("class","metric-graph-data-day-group"),E=C.exit();o(w,x),p(w,x),q(z,A),t(z,A),r(z,z),s(C,D),u(),y.remove(),B.remove(),E.remove()}function k(){a.savedHitory=i(),j()}a.getCurrentUnit=function(){if(a.unit)switch(a.metric){case 0:case 1:return b.getTemperatureUnit(a.unit);case 2:return b.getSpeedUnit(a.unit);case 3:return b.getLengthUnit(a.unit)}},a.savedHitory=i(),a.$watch("history",k),a.$watch("metric",k),a.$watch("unit",k),window.addEventListener("resize",function(){j()})}]}}]),angular.module("weatherAnalytics").service("pageService",function(){this.applicationName=void 0,this.pageName=void 0,this.loading=!1,this.setApplicationName=function(a){this.applicationName=a},this.setPageName=function(a){this.pageName=a},this.getTitle=function(){var a="";return this.pageName&&(a+=this.pageName),this.pageName&&this.applicationName&&(a+=" - "),this.applicationName&&(a+=this.applicationName),a}}),angular.module("weatherAnalytics").service("notificationsService",["$timeout",function(a){this.MESAGE_TYPE={NONE:0,INFO:1,ERROR:2},this.message=void 0,this.type=this.MESAGE_TYPE.NONE,this.loading=!1,this.stopLoadingPending=!1,this.isLoading=function(){return this.loading},this.startLoading=function(){this.loading=!0,this.stopLoadingPending=!1,this.message=void 0,this.type=this.MESAGE_TYPE.NONE},this.stopLoading=function(){if(this.stopLoadingPending=!0,this.loading){var b=this;a(function(){b.stopLoadingPending&&(b.loading=!1)},100)}},this.isInfo=function(){return this.type===this.MESAGE_TYPE.INFO},this.isError=function(){return this.type===this.MESAGE_TYPE.ERROR},this.getMessage=function(){return this.message},this.addInfo=function(a){this.message=a,this.type=this.MESAGE_TYPE.INFO,this.loading=!1},this.addError=function(a){this.message=a,this.type=this.MESAGE_TYPE.ERROR,this.loading=!1},this.removeMessage=function(){this.message=void 0,this.type=this.MESAGE_TYPE.NONE}}]),angular.module("weatherAnalytics").service("apiCallerService",["$http","notificationsService","exceptionLogger","messagesService",function(a,b,c,d){this.API_CONSTANTS={UNKNOWN:0,SUCCESS:1,PROCESSING:2,ERROR_UNKNOWN:100,ERROR_API_NOT_FOUND:110,ERROR_PARAMETER_MISSING:120,ERROR_PARAMETER_WRONG_VALUE:121},this.watchDestroyed=function(a){a.$on("$destroy",function(){a.destroyed=!0})},this.handleError=function(a){var e="";e=a.result&&a.message?d.get("MESSAGE_API_SPECIFIC_ERROR")+a.message:d.get("MESSAGE_API_UNKNOWN_ERROR"),b.addError(e),c.handleError(e)},this.get=function(e,f,g,h,i){var j=this;b.startLoading();try{a.get(f).success(function(a){if(!e.destroyed){if(!a.result||a.result!==g)return void i(a,200);b.stopLoading(),h&&h(a)}}).error(function(a,c){e.destroyed||(b.stopLoading(),i?i(a,c):j.handleError(a,c))})}catch(k){b.addError(d.get("MESSAGE_API_UNKNOWN_ERROR")),c.handleError(d.get("MESSAGE_API_UNKNOWN_ERROR_LOG"),k)}}}]),angular.module("weatherAnalytics").factory("$exceptionHandler",function(){return function(a){try{console.error("Uncatched exception"+a.stack)}catch(b){console.error("Uncatched exception"+a)}try{ErrorLogger.getInstance().handleError("Uncatched exception",a,!0)}catch(b){console.error("Cannot log error message: "+b.stack)}}}).service("exceptionLogger",function(){var a;try{a=ErrorLogger.getInstance()}catch(b){console.error("Cannot load error logger: "+b.stack)}return{handleError:function(b,c,d){a&&a.handleError(b,c,d)},getLogs:function(){return a?a.getLogs():void 0},clearLogs:function(){return a?a.clearLogs():void 0}}}),angular.module("weatherAnalytics").service("messagesService",[function(){var a={TITLE_APPLICATION:"Weather Analytics",TITLE_PAGE_ABOUT:"About",TITLE_PAGE_CONTACT:"Contact",TITLE_PAGE_ERROR:"Error",TITLE_PAGE_MAIN:"Main",TITLE_PAGE_LOGS:"Logs",TITLE_PAGE_HISTORY:"History",TITLE_PAGE_FORECAST:"Forecast",TITLE_PAGE_APIS:"APIs",MESSAGE_SOCIAL_GITHUB:"Visit my Github",MESSAGE_SOCIAL_BITBUCKET:"Visit my BitBucket",MESSAGE_SOCIAL_YOUTUBE:"Visit my Youtube channel",MESSAGE_SOCIAL_LINKEDIN:"Check me on Linkedin",MESSAGE_SOCIAL_WEBSITE:"Visit my website",MESSAGE_LOGS_EMPTY:"There are no errors to show",MESSAGE_API_UNKNOWN_ERROR:"An unknown error occurred during the current operation",MESSAGE_API_UNKNOWN_ERROR_LOG:"An unknown error occurred during an API request",MESSAGE_API_SPECIFIC_ERROR:"The following error occurred during the current operation: ",MESSAGE_FORECAST_UNIT_METRIC:"Metric",MESSAGE_FORECAST_UNIT_IMPERIAL:"Imperial",MESSAGE_HISTORY_ERROR_CITY:"You must select a valid city",MESSAGE_HISTORY_ERROR_UNIT:"You must select a valid unit",MESSAGE_HISTORY_ERROR_RANGE:"You must select a valid range",MESSAGE_HISTORY_TABS_TEMPERATURE_MIN:"Max Temperatures",MESSAGE_HISTORY_TABS_TEMPERATURE_MAX:"Min Temperatures",MESSAGE_HISTORY_TABS_WIND_SPEED:"Wind speed",MESSAGE_HISTORY_TABS_PRECIPITATION:"Precipirations",MESSAGE_HISTORY_TABS_UNIT:" in {0}",MESSAGE_HISTORY_NO_DATA:"No data found for this period"};this.get=function(b,c){var d=a[b];if(!d)return b;if(c)for(var e=0;e<c.length;e++)d=d.replace("{"+e+"}",c[e]);return d}}]),angular.module("weatherAnalytics").service("unitsService",["messagesService",function(a){this.UNIT_METRIC="Metric",this.UNIT_IMPERIAL="Imperial",this.units=[{type:this.UNIT_METRIC,name:a.get("MESSAGE_FORECAST_UNIT_METRIC")},{type:this.UNIT_IMPERIAL,name:a.get("MESSAGE_FORECAST_UNIT_IMPERIAL")}],this.getUnits=function(){return this.units},this.isDefined=function(a){return a||0===a},this.getNumericValue=function(a,b){return this.isDefined(a)?b||Math.floor(a)!==a?a.toFixed(1):a:"?"},this.getSpeedUnit=function(a){return a.type===this.UNIT_IMPERIAL?"mph":"km/h"},this.getSpeed=function(a,b){return a?b.type===this.UNIT_IMPERIAL?this.getNumericValue(a.mph)+" "+this.getSpeedUnit(b):this.getNumericValue(a.kmph)+" "+this.getSpeedUnit(b):"?"},this.getTemperatureUnit=function(a){return a.type===this.UNIT_IMPERIAL?"°F":"°C"},this.getTemperature=function(a,b){return a?b.type===this.UNIT_IMPERIAL?this.getNumericValue(a.fahrenheit)+""+this.getTemperatureUnit(b):this.getNumericValue(a.celsius)+""+this.getTemperatureUnit(b):"?"},this.getLengthUnit=function(a){return"mm"}}]),angular.module("weatherAnalytics").service("datesService",[function(){function a(a){return b(a.getFullYear())+"-"+b(1+a.getMonth())+"-"+b(a.getDate())}function b(a){return 10>a?"0"+a:""+a}this.getDate=function(a){return a?new Date(a):void 0},this.getString=function(b){return b?a(b):void 0}}]);