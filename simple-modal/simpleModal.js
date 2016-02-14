angular.module("simpleModal", [])
	.directive("simpleModalWindow", [function() {
  	return {
    	restrict: 'E',
      scope: {
      	show : '=',
        src : '@',
        hasHeader : '=',
        headerTitle : '@',
        isDraggable : '@'
      },
      replace: true,
      template: function(elem, attr) {
        var html = '';
        html += '<div class="smw-overlay" ng-show="show">';
       	html += '<div class="smw-window" id="window" ';
        html += attr.isDraggable === 'true' ? 'draggable-modal>': '>';  // TODO: fix to check boolean not string.
        html += '<div class="smw-header" ng-show="hasHeader"><h2>{{headerTitle}}</h2></div>';
        html += '<span class="smw-btn-close" ng-click="close()">X</span>';
       	html += '<div class="smw-content">';
       	//html += '{{dynamTemp}}';//dynamic src template added.
        html += '<div ng-include="src"></div>';
        html += '</div></div></div>';
        return html;
      },
      link : function(scope, elem, attr) {
      	//scope.watch dynamicTemplate -> $compile new html
        scope.close = function() {
        	scope.show = false;
        }
      }
    }
  }])
	.directive('draggableModal', ['$document', function($document) {
  	return {
    	link : function(scope, elem, attr) {
      	var startx = 0;
        var starty = 0;
        var x = elem.prop('offsetLeft');
        var y = elem.prop('offsetTop');
        
        elem.css({
        	position: 'relative'
        });
        
        elem.on('mousedown', function(event) {
        	event.preventDefault();
          startX = event.pageX - x;
          startY = event.pageY - y;
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        });
        
        function mousemove(event) {
        	console.log ("x" + x + " y" + y);
        	y = event.pageY - startY;
          x = event.pageX - startX;
          elem.css({
          	top: y + 'px',
            left: x + 'px'
          });
        }
        
        function mouseup() {
        	$document.off('mousemove', mousemove);
          $document.off('mouseup', mouseup);
        }
      }
    };
  }]);
