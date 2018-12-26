let quiz;

// load external html source with answers
jQuery.get( "https://raw.githubusercontent.com/laralex/UniversitySmallStuff/master/CCNA%20Hack%20(IV-2018)/quiz_full.json", function( data ) {
	quiz = JSON.parse(data); //entire page in html string
});

jQuery(window).bind('selectionEnd', function () {
			// reset selection timeout
			selectionEndTimeout = null;

			// get user selection
			let selectedText = getSelectionText();

			// if the selection is not empty show it :)
			if(selectedText != ''){
			   let returnedStr = q(selectedText);
			   document.getElementById('questions').title =  returnedStr ? returnedStr : ' ' ;
			}
		});

function q(word) {
	let printSet = new Set();
	for (let question in quiz) {
		//console.log(question);
		if (question.indexOf(word) >= 0) {
			printSet.add([quiz[question][0], question]);
		}
	}
	
	let vals = Object.values(quiz); 
	//console.log(vals);
	for (let answers_i = 0; answers_i < vals.length; ++answers_i) {
		let flag = false;
		let answers = vals[answers_i][1];
		//console.log(answers);
		if (answers == null) continue;
		for (let answ_i = 0; answ_i < answers.length; ++answ_i) {
			let answ = answers[answ_i];
			//console.log(answ);
			//console.log(answ.toLowerCase().indexOf(word.toLowerCase()) >= 0);
			if (answ.toLowerCase().indexOf(word.toLowerCase()) >= 0) {
				if (!flag) {
					//console.log(vals[answers_i][0]);
					printSet.add([vals[answers_i][0], Object.keys(quiz).find(key => quiz[key][0] === vals[answers_i][0])]);
					flag = true;
				}
			}
		}
		flag = false;
	}
	let returnStr = '';
	printSet.forEach((el) => {
		if (el == null || el[0] == null || el[1] == null) return; 
		let str = '';		
		for (let a in el[0]) {
			str += el[0][a] + (a < el[0].length - 1 ? ' @@ ' : '');
		}
		returnStr += JSON.stringify({[str.trim()] : el[1].substring(0,60)}) + '\n';
	} );
	return returnStr;
};

let selectionEndTimeout = null;

// bind selection change event to my function
document.onselectionchange = userSelectionChanged;

function getSelectionText() {
    let text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
};


function userSelectionChanged() {

    // wait 500 ms after the last selection change event
    if (selectionEndTimeout) {
        clearTimeout(selectionEndTimeout);
    }

    selectionEndTimeout = setTimeout(function () {
        jQuery(window).trigger('selectionEnd');
    }, 700);
	
};
}



