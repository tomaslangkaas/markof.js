/*
markof.js - lightweight markup language & lightweight parser
*/

(function (root, factory) {
	if (typeof define === 'function' && define['amd']) {
		define(factory);
	} else if (typeof exports === 'object') {
		module['exports'] = factory;
	} else {
		root['markof'] = factory();
	}
})(this, function(){

	var html = /[<>&\"\'\/]/g;
	
	function htmlReplace(m){
		return '&#'+m.charCodeAt(0)+';';
	}
	
	function htmlSafe(str){
		return str.replace(html, htmlReplace);
	}

	var lookup = {
		'_':'sub',
		'^':'sup',
		'~':'small',
		'*': 'em',
		'!!': 'strong',
		'++': 'ins',
		'==': 'del',
		
		'-': 'ul',
		':': 'dt',
		
		'--': '&ndash;',
		'---': '&mdash;',
		'...': '&hellip;',
		
		"'": '&rsquo;'

	};
	
	var regex = /&\w*;|&#x?[\da-fA-F]*;|\\([\'\"\*!~\^_`\+\-=\.<>#\|\:\[])|(\])|(\s*\n)?(\{\{([^\}\s]*)\s?((?:\\\}|[^\}])*)\}\})|(\s*\n)(?:( *)(\-|(\d+)\.)|(#{1,6})|(\")|(```).*\n((?:[^\n]|\n[^`])*)\n```.*|(\|([\:;\.\,\'])?)|(\:\:?))?(?:\[(?:#([\w_]*))?(?:\.([\w ]*))?\])? *|( *\|([\:;\.\,\'])? *)|([_\^~\*]|!!|==|\+\+)|(<<|>>|``|\'\'|[<>&\"\'\/]|\-{2,3}|\.{3})|\{((?:#|https?|mailto|\.)[\!#\$&\=\]_~\(-;\?-\[a-z]*) ?([^\}]*)\}\[(\!([^\]]*)\])?|`((?:\\`|[^`])*)`/g;
	
	var formatState = {};
	var openBlocks = [];
	var indentSpace = '\n'+(new Array(99)).join(' ');
	var indent;
	var functionsObject;
	var isLink;
	var compact;
	
	function indentFunction(level){
		return indentSpace.slice(0, level + 1);
	}
	
	function blank(){
		return '';
	}
	
	function wrap(tag, string){
		return '<' + tag + '>' + string + 
		'</' + tag + '>';
	}
	
	function closeBlocks(level){	
		//close including level: level = 0 closes all blocks
		for(var s = ''; openBlocks.length > level; )
			s += indent(openBlocks.length - 1) + 
			'</' + openBlocks.pop() + '>';
		return s;
	}
	
	function addBlock(type, attr, level){
		level |= 0;
		return closeBlocks(level) +
		indent(level) +
		'<' + (openBlocks[level] = type) + 
		(attr || '') + '>';
	}
	
	function handleNestedBlock(parentblocktype, 
		newlines, item, level, attr){
		var s = '';
		if(openBlocks[level-1] != parentblocktype || newlines){
			s += addBlock(parentblocktype, 0, level-1);
		}
		s += addBlock(item, attr, level);
		return s;
	}
	
	function ifContains(str, chars, ifTrue, ifFalse){
		return chars.indexOf(str) < 0? ifFalse: ifTrue;
	}
	
	function addCell(tdType){
		return addBlock(
			ifContains(tdType, ";,'", 'th', 'td'),
			tdType && ' style="text-align:' + 
			ifContains(tdType, ",.", 'right', 
				ifContains(tdType, ";:", 'center', 'left')) 
			+ ';"', 2)
	}

	function handler(fullmatch, literal, closeLink, 
		bracesNewlines, bracesMatch, bracesName, bracesArgs, 
		newlines, listIndent, listMarker, listInteger, 
		heading, blockquote, pre, preBody, table, tdType, 
		dl, blockID, blockClasses, tableCell, tableCellType, 
		inlineFormat, replaceChar, hrefSrc, hrefTitle, 
		isImg, imgAltText, monospace, temp){
		
		if(newlines){
			newlines = newlines.split('\n').length - 2;
			temp = (blockID? ' id="'+blockID+'"': '')+(blockClasses? ' class="'+blockClasses+'"': '')
			return (
				listMarker?
					handleNestedBlock(lookup[listMarker] ||'ol',
						newlines, 'li', 
						(listIndent || '').length + 1, 
						lookup[listMarker]? 
							temp: 
							temp + ' value="' + listInteger + '"'
						):
				heading?
					addBlock('h' + heading.length, 
						temp):
				blockquote?
					addBlock('blockquote', temp):
				pre?
					closeBlocks(0) + indent(0) + wrap('pre', 
						wrap('code', 
							htmlSafe(preBody.replace(/\\`/g,'`')))):
				dl?
					handleNestedBlock('dl', newlines, 
						lookup[dl] || 'dd', 1, temp): 
				table?
					handleNestedBlock('table', newlines, 
						'tr', 1, temp) + 
						addCell(tdType):
				newlines || !openBlocks.length?
					addBlock('p', temp):
				'<br>'
				) + indent(openBlocks.length);
		}
		return tableCell && openBlocks[0] == 'table'?
				addCell(tableCellType) + indent(3):
			inlineFormat?
				((formatState[inlineFormat] ^= 1)? '<': '</') +
					lookup[inlineFormat] + '>':
			replaceChar?
				lookup[replaceChar] || htmlReplace(replaceChar):
			monospace?
				wrap('code', 
					htmlSafe(monospace.replace(/\\`/g,'`'))):
			hrefSrc?
				(isImg? '<img alt="' + htmlSafe(imgAltText) + 
					'" src="': ((isLink = 1),'<a href="')) +
				hrefSrc + '" title="' + htmlSafe(hrefTitle) + '">':
			closeLink?
				(isLink? ((isLink = 0),'</a>'): ']'):
			literal?
				htmlSafe(literal):
			bracesMatch?
				(bracesNewlines? closeBlocks(0) + indent(0): '') + 
				(functionsObject.hasOwnProperty(bracesName)? (
					functionsObject[bracesName].call?
					(temp = functionsObject[bracesName](bracesArgs),
					temp == void(0)? '': temp):
					functionsObject[bracesName]
				): htmlSafe(bracesMatch)):
			fullmatch;
	}
	
	function convert(str, functions){
		openBlocks = [];
		formatState = {};
		functionsObject = functions || {};
		isLink = 0;
		return ('\n\n'+str)
			.replace(/\s*$/, '')
			.replace(regex, handler)
			.slice(compact? 1: 0) +
			closeBlocks(0);
	}
	
	(convert['quotes'] = function(doubleLeft, doubleRight, singleLeft, singleRight){
		lookup['<<'] = doubleLeft || '&ldquo;';
		lookup['>>'] = doubleRight || '&rdquo;';
		lookup['``'] = singleLeft || '&lsquo;';
		lookup["''"] = singleRight || '&rsquo;';
		return convert;
	})();
	
	(convert['compact'] = function(enabled){
		indent = (compact = enabled)?
			blank:
			indentFunction;
		return convert;
	})();
	
	convert['safe'] = htmlSafe;

	return convert;
});
