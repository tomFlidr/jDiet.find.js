/**
 * jDiet find plugin
 * @author Tom Flidr | tomflidr(at)gmail(dot)com
 * @version 0.1
 * @ussage
 *		var $elm = jDiet("#selector");
 *		
 *		// select result nodes by selector with nodeName, .class or both
 *		// this return only first ocurance of the element
 *		var $resultElms = $elm.find("a.class-string"); 
 *		
 *		// this return all ocurances in all $elm childNodes
 *		var $resultElms = $elm.find("a.class-string", true);
 */
jDiet['fn']['find'] = function (selector, onlyOneOccurrence)
{
	if (typeof(onlyOneOccurrence) == 'undefined') onlyOneOccurrence = true; // you must directly say false to find all ocurances
	var result = new jDiet();
	var elms = [];
	this['each']['call'](this, function() {
		var localResult = [];
		var explSel = [];
		var rootNodeChecks = [];
		var rootNodeChecksRes = [];
		if (typeof(this) == 'object' && String(this.nodeName).toLowerCase() !== '#text') {
			explSel = selector.split('.');
			rootNodeChecks = selector.indexOf('.') > -1 ? [1,1] : [1,0];
			if (rootNodeChecks[0]) rootNodeChecksRes[0] = String(this.nodeName).toLowerCase() == explSel[0].toLowerCase();
			if (rootNodeChecks[1]) rootNodeChecksRes[1] = String(' ' + this.className + ' ').indexOf(' ' + selector[0] + ' ') > -1;
			if (
				(rootNodeChecks[0] && !rootNodeChecks[1] && rootNodeChecksRes[0]) ||
				rootNodeChecks[0] && rootNodeChecks[1] && rootNodeChecksRes[0] && rootNodeChecksRes[1]
			) {
				localResult = [this];
			}
			if (!onlyOneOccurrence || (onlyOneOccurrence && localResult.length === 0)) {
				// try to find result in childNodes
				localResult = jDiet['fn']['find']['fn'].findInOneContainer(this, selector, onlyOneOccurrence, 0);
			}
		}
		if (localResult.length) {
			elms = elms.concat(localResult);
		}
	});
	for (var e in elms) result[e] = elms[e];
	result['length'] = elms['length'];
	result['selector'] = this['selector'] + ' ~> ' + selector;
	return result;
};
jDiet['fn']['find']['fn'] = {
	findInOneContainer: function (elementsContainer, selector, onlyOneOccurrence, recursion)
	{
		var result = [];
		var $childs = jDiet(elementsContainer).children(selector);
		if ($childs.length > 0) {
			// some of current childs is the result element
			if (onlyOneOccurrence) {
				result = [$childs[0]];
			} else {
				result = this.iterateResult(result, $childs);
			}
		}
		if (!onlyOneOccurrence || (onlyOneOccurrence && result.length === 0)) {
			// be sure and try to find result in all elementsContainer childs
			var subResult = this.findInAllContainerChilds(elementsContainer,selector, onlyOneOccurrence, result, recursion + 1);
			if (subResult.length > 0) {
				result = this.iterateResult(result, subResult);
			}
		}
		return result;
	},
	findInAllContainerChilds: function (elementsContainer, selector, onlyOneOccurrence, result, recursion)
	{
		var itemResult = [];
		var subResult = [];
		// be sure and try to find result in all elementsContainer childs
		var	$childs = jDiet(elementsContainer).children();
		if ($childs.length > 0) {
			// get childs again, without class selector, go throw a loop and try to get result on subnodes
			for (var i = 0, l = $childs.length; i < l; i += 1) {
				itemResult = this.findInOneContainer($childs[i], selector, onlyOneOccurrence, recursion);
				if (itemResult.length > 0) {
					subResult = this.iterateResult(subResult, itemResult);
				}
				if (onlyOneOccurrence) {
					subResult = [subResult[0]];
					break;
				}
			}
		}
		return subResult;	
	},
	iterateResult: function (arr1, arr2)
	{
		var arr3 = [];
		for (var i1 = 0, l1 = arr1.length; i1 < l1; i1 += 1) {
			arr3.push(arr1[i1]);
		}
		for (var i2 = 0, l2 = arr2.length; i2 < l2; i2 += 1) {
			arr3.push(arr2[i2]);
		}
		return arr3;
	}
}
