(function() {
	'use strict';
	angular.module('tagInput', [])
		.directive('tagInputElement', TagInputElement);
  
	TagInputElement.$inject = [];
	function TagInputElement() {
		return {
			restrict : 'E',
			scope : {
				tags : '=ngModel'
			},
			replace : true,
			template : function()  {
				var html = "";
       
		        html += '<div>';
		        html += ' <div class="element-input-btn">';
		        html += '   <div class="element-input"><input ng-enter="add()" type="text" id="item-keyword" class="" placeholder="Item tags" /></div>';
		        html += '   <div class="element-btn"><div class="btn-gray keyword-add" ng-click="add()">+</div></div>';
		        html += ' </div>';
		        html += ' <div class="element-tag-container">';
		        html += '   <div class="tag-msg" ng-show="tags.length === 0">Currently no tags added to this item.</div>';
		        html += '   <span class="tag" ng-repeat="tag in tags">{{tag}}<span class="tag-x" ng-click="remove(tag)">X</span></span>';
		        html += ' </div>';
		        html += '</div>';
       
		        return html;
			},
			link: function(scope, element) {
       
				scope.tags = [];
       
				scope.add = function() {
					var value = element.find('input').val().trim();
					if(value !== "" || angular.isUndefined(value)) {
			        	if(scope.tags.indexOf(value) === -1) {
			            	scope.tags.push(value);
			            	element.find('input').val(""); //find better way to clear and focus after add.
			          } else {
			            	element.find('input').val("");
			          }
					}
				};
       
				scope.remove = function(tag) {
					var index = scope.tags.indexOf(tag);
					scope.tags.splice(index, 1);
				};
			}
		};
	}
	
	angular.module('tagInput')
		.directive('ngEnter', NgEnter);
  
	NgEnter.$inject = [];
	function NgEnter() {
		return function(scope, element, attrs) {
			element.bind("keydown keypress", function(event) {
				if(event.which === 13) {
					scope.$apply(function(){
						scope.$eval(attrs.ngEnter);
					});
                       
					event.preventDefault();
				}
			});
		};
	}
})();
