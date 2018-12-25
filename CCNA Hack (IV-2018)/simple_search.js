// Removed all unnecessary words
(function() {
    // Load the script
    var script = document.createElement("script");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        var $ = window.jQuery;
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();

var quiz;

// load external html source with answers
jQuery.get( "https://raw.githubusercontent.com/laralex/UniversitySmallStuff/master/CCNA%20Hack%20(IV-2018)/quiz_full.json", function( data ) {
	quiz = JSON.parse(data); //entire page in html string
});

function q(word) {
	var printMe = new Set();
	for (var question in quiz) {
		if (question.indexOf(word) >= 0) {
			printMe.add([quiz[question][0], question]);
		}
	}
	var vals = Object.values(quiz); //.map((el) => {return el[1]})
	//console.log(vals);
	for (var answers_i = 0; answers_i < vals.length; ++answers_i) {
		var flag = false;
		var answers = vals[answers_i][1];
		//console.log(answers);
		if (answers == null) continue;
		for (var answ_i = 0; answ_i < answers.length; ++answ_i) {
			var ans = answers[answ_i];
			//console.log(ans);
			//console.log(ans.toLowerCase().indexOf(word.toLowerCase()) >= 0);
			if (ans.toLowerCase().indexOf(word.toLowerCase()) >= 0) {
				if (!flag) {
					//console.log(vals[answers_i][0]);
					printMe.add([vals[answers_i][0], Object.keys(quiz).find(key => quiz[key][0] === vals[answers_i][0])]);
					flag = true;
				}
			}
		}
		flag = false;
	}
	printMe.forEach((el) => {
		if (el == null || el[0] == null || el[1] == null) return; 
		var str = '';		
		for (var a in el[0]) {
			str += el[0][a] + (a < el[0].length - 1 ? '\t@@\t' : '');
		}
		console.log({[str.trim()] : el[1]});
	} );
	console.log('-----------------------------------------------------');
}

var selectionEndTimeout = null;

// bind selection change event to my function
document.onselectionchange = userSelectionChanged;

function userSelectionChanged() {

    // wait 500 ms after the last selection change event
    if (selectionEndTimeout) {
        clearTimeout(selectionEndTimeout);
    }

    selectionEndTimeout = setTimeout(function () {
        $(window).trigger('selectionEnd');
    }, 500);
	
}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

jQuery(window).bind('selectionEnd', function () {

    // reset selection timeout
    selectionEndTimeout = null;

    // get user selection
    var selectedText = getSelectionText();

    // if the selection is not empty show it :)
	console.log('ВЫДЕЛЕНО: ' + selectedText);
    if(selectedText != ''){
       q(selectedText);
    }
});