/*  
	<content_script.js>
	This script is executed on certain tab (i.e. separate script for every needed tab),
	it can read/modify DOM of page from this tab.
	
	Using this, we can download web-content of test and modify it, to provide
	answers on your test (or expell you from university lmao).
	
	As I said, this script is isolated from the rest of extension, thus it has to use
	Chrome API to communicate with 'popup' and 'background'
*/

chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		switch (message.action) {
			case "GetQuestion":
				let qtexts = document.getElementsByClassName("qtext");
				let question_text = 
				sendResponse({question_text: , question_html:})
				break;
		}
	}
);

(()=>{
	/*
	var qtexts = document.getElementsByClassName("qtext"); 

	for (let qtext = 0; qtext < qtexts.length; qtext++) {
		let tmp = qtexts[qtext];
		for (a in answers) {
			if (AreSimiliar(tmp.textContent, shpora[a]['q']) ) 
				tmp.title += shpora[a]['a'] + '\n'
		}
	};
	*/
})();

