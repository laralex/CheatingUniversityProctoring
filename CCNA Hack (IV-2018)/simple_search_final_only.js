let quiz;

jQuery.get( "https://raw.githubusercontent.com/laralex/UniversitySmallStuff/master/CCNA%20Hack%20(IV-2018)/quiz_final_only.json", function( data ) {
	quiz = JSON.parse(data); 
});

jQuery(window).bind('selectionEnd', function () {
			selectionEndTimeout = null;
			let selectedText = getSelectionText();
			if(selectedText != ''){
			   let returnedStr = q(selectedText);
			   document.getElementById('hdr').title =  returnedStr ? returnedStr : ' ' ;
			}
		});

function q(word) {
	if (word == '' || word == ' ' || word == null) return null;
	let printSet = new Set();
	for (let question in quiz) {
		if (question.indexOf(word) >= 0) {
			printSet.add([quiz[question][0], question]);
		}
	}
	
	let vals = Object.values(quiz); 
	for (let answers_i = 0; answers_i < vals.length; ++answers_i) {
		let flag = false;
		let answers = vals[answers_i][1];
		if (answers == null) continue;
		for (let answ_i = 0; answ_i < answers.length; ++answ_i) {
			let answ = answers[answ_i];
			if (answ.toLowerCase().indexOf(word.toLowerCase()) >= 0) {
				if (!flag) {
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
		returnStr += JSON.stringify({[str.trim()] : el[1].substring(0,100)}) + '\n';
	} );
	return returnStr;
};

let selectionEndTimeout = null;

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

    if (selectionEndTimeout) {
        clearTimeout(selectionEndTimeout);
    }

    selectionEndTimeout = setTimeout(function () {
        jQuery(window).trigger('selectionEnd');
    }, 700);
	
};
}



