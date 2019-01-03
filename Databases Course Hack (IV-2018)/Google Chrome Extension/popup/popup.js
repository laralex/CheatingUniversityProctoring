/*
	<popup.js>
	This script extends popup.html to provide you cool functionality using extension icon
*/

/*  Extra actions on popup load 
	Note that popup load EVERY time you press extension icon, 
	so we need to reload visual data every time aswell */
window.onload=()=>{
	LoadAppDataFromStorage(function() {
		/* When data has been loaded, this callback function is called */
		BindFunctionalityWithUI();
		AddToStatus(1);
		VisualizeAppData();
	});
};

/* Aliased document.getElementById(...) stuff */
let ui_div_reload_hack, ui_div_save_page, ui_div_enable_extension, ui_div_status,ui_span_status, ui_textarea_search, ui_btn_clear, ui_btn_copy, ui_btn_paste, ui_div_result, ui_span_result, ui_span_result_size, ui_table_result;

/* Extension data */
let app_data;

/* Fill aliases from above and bind popup UI with JavaScript functionality */
function BindFunctionalityWithUI(){
	ui_div_reload_hack			= document.getElementById("popup_action_reload");
	ui_div_save_page			= document.getElementById("popup_action_save");
	ui_div_enable_extension 	= document.getElementById("popup_action_enable");
	ui_div_status 				= document.getElementById("status");
	ui_span_status 				= document.getElementById("status_text");
	ui_textarea_search 			= document.getElementById("manual_search");
	ui_btn_clear 				= document.getElementById("clear_button");
	ui_btn_copy 				= document.getElementById("copy_button");
	ui_btn_paste 				= document.getElementById("paste_button");
	ui_div_result 				= document.getElementById("manual_search_result");
	ui_span_result 				= document.getElementById("result_label");
	ui_span_result_size 		= document.getElementById("result_size");
	ui_table_result 			= document.getElementById("result_table");
	ui_textarea_search.oninput 	= OnTextareaInput;
	ui_btn_clear.onclick		= OnClearSearchPressed;
	//ui_btn_copy.onclick 		= OnCopySearchPressed;
	//ui_btn_paste.onclick		= OnPasteSearchPressed;
	ui_div_reload_hack.onclick	= OnReloadHackScriptPressed;
	//ui_div_enable_extension.onclick 	= OnEnablePressed;
	
	/*
	ui_textarea_search.addEventListener('paste', function handlePaste(e){
		e.stopPropagation();
		e.preventDefault();
		let clipboard_data = e.clipboardData || window.clipboardData;
		let pastedData = clipboardData.getData('Text');
		let cursor_start = ui_textarea_search.selectionStart, 
			cursor_end = ui_textarea_search.selectionStart;
		ui_textarea_search.value = ui_textarea_search.value.substr(0, cursor_start) + pastedData + ui_textarea_search.value.substr(cursor_start + 1, cursor_end - cursor_start - 1); 
	});
	*/
};

/* Calls the background script. Retrieves relevant state of app_data object
   (the object contains all data needed to process within popup)
   After load is done, allows to callback */
function LoadAppDataFromStorage(callback) {
	chrome.runtime.sendMessage({action:"LoadData"}, function(response){
		app_data = response['data'];
		console.log("Loaded data: <" + app_data['search_request'] + ">");
		callback();
	});
}

/* Saves local app_data object in background script */
function SaveAppData(){
	if (app_data) {
		chrome.runtime.sendMessage({action:"SaveData", data:app_data});
	}
}	


/*  Fill <table> element with answers.
	Input format: [ { "q":"question", "a":"answer" }, { ... } ] 
	Other keys than "q" and "a" are ignored */
function FillSearchTable(quiz){
	ui_table_result.innerHTML = "";
	let content = "";
	for(let q_i in quiz){
		let question = quiz[q_i]['q'], answer = quiz[q_i]['a'];
		let num = parseInt(q_i) + 1;
		content += '<tr><td class="number">' + num + '</td><td>' + question + '</td></tr><tr class="answer"><td></td><td>' + answer + '</td></tr></tr>';
	}
	ui_table_result.innerHTML = content;
}

/* Computes relevant status code of application. 
   If all extension's work is being done successfully, returns 0
   If one or more errors (bad effects) occured, returns code of max bad effect (1 to 4) */
function GetStatus(){
	let max = 0;
	let err_codes = app_data['err_codes'];
	Object.keys(app_data['err_codes']).forEach((e) => {if (err_codes[e] && parseInt(e) > max) max = parseInt(e);});
	return max;
}

/* Add status effect from 0 to 4. Adding 0 means delete all bad effects. */
function AddToStatus(status_code){
	if (status_code === 0) {
		app_data['err_codes'].map((e)=>{e = false;});
	} else {
		app_data['err_codes'][status_code] = true;
	}	
	VisualizeStatus();
}


/* Remove status effect from 0 to 4. Removing 0 means delete all bad effects. */
function RemoveFromStatus(status_code){
	if (status_code === 0) {
		app_data['err_codes'].map((e)=>{e = false;});
	} else {
		app_data['err_codes'][status_code] = false;;
	}
	VisualizeStatus();
}

/* Apply visual effects on popup DOM, based on current app's status*/
function VisualizeStatus(){
	let status = GetStatus();
	if (status == 0) {
		ui_div_status.classList.remove("red");
		ui_div_status.classList.add("green");
	} else {
		ui_div_status.classList.remove("green");
		ui_div_status.classList.add("red");
	}
	switch(status){
		case 0: // works
			ui_span_status.innerText = "вроде работает";
			break;
		case 1: // haven't launched yet
			ui_span_status.innerText = "скрипт не запущен на странице";
			break;
		case 2: // page parse error
			ui_span_status.innerText = "скрипт запущен, не смог спарсить страницу с вопросом";
			break;
		case 3: // answers cannot be found
			ui_span_status.innerText = "скрипт запущен, не смог найти ответы на вопрос (их нет / ошибка поиска)";
			break;
		case 4: // extension error
			ui_span_status.innerText = "это расширение сломалось";
			break;
	}
}

/* Apply visual effects for popup DOM, based on current app's data */
function VisualizeAppData(){
	VisualizeStatus();
	ui_textarea_search.value = app_data['search_request'];
	VisualizeManualSearch();
}

/* Apply visual effects for popup DOM, 
   based on current app's data of manual JSON search subsystem */
function VisualizeManualSearch(){
	if (app_data['search_result_size'] > 0) {
		ui_span_result.classList.add("green");
		ui_span_result.classList.remove("red"); 				
	} else {
		ui_span_result.classList.add("red");
		ui_span_result.classList.remove("green"); 	
	}
	ui_span_result_size.innerText = app_data['search_result_size'];
	FillSearchTable(app_data['search_result']);
}

/* Call content script (it's sitting on Databases test web-page) 
   to apply hack activity once again (if it somehow didn't)
   Changes status effects of application */
function ReloadHackScript(){
	/*
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
	chrome.tabs.sendMessage(tabs[0].id, {action:"ReloadHack"}, function(response){
	*/
	chrome.tabs.sendMessage({action:"ReloadHack"}, function(response){
		switch (response['result']){
			case 'ok':
				console.log('ok');
				AddToStatus(0);
				break;
			case 'cant_load':
				AddToStatus(1);
				break;
			case 'cant_parse_question':
				AddToStatus(2);
				break;
			case 'cant_find_answers':
				AddToStatus(3);
				break;
		}
	});
}

/*
// Make content script to download current html page
function DownloadHtmlPage(){
	
}
*/		

/* Enable or Disable&Clear application activities */
/*
function SetAppEnabled(bool){
	app_data['isEnabled'] = bool;
	if (bool) {
		RemoveFromStatus(1);
	} else {
		AddToStatus(1);
	}
}
*/

/* UI events */	
function OnReloadHackScriptPressed(){
	ReloadHackScript();
	SaveAppData();
}

function OnDownloadPagePressed(){
	DownloadHtmlPage();
}

function OnEnablePressed(){
	SetAppEnabled(!app_data['isEnabled']);
	SaveAppData();
}	

function OnClearSearchPressed(){
	ui_textarea_search.value = '';
	OnTextareaInput();
}

/*
function OnCopySearchPressed(){
	let selected = window.getSelection();
	CopyTextToClipboard(selected);
}

function OnPasteSearchPressed(){
	
}
*/

function OnTextareaInput(){
	console.log("Textarea changed");
	app_data['search_request'] = ui_textarea_search.value;
	if (app_data['search_request'].length < 3) {
		app_data['search_result_size'] = 0;
		app_data['search_result'] = [];
		VisualizeManualSearch();
		return;
	} 
	chrome.runtime.sendMessage({action:"Search", search_str:app_data['search_request']}, function(response){
			console.log("Popup receives reply");
			app_data['search_result_size'] = response.length;
			app_data['search_result'] = response;
			VisualizeManualSearch();
			SaveAppData();
	});
}

/*
function CopyTextToClipboard(text) {
	  var copy_from = document.createElement("textarea");
	  copy_from.textContent = text;
	  document.body.appendChild(copy_from);
	  copy_from.select();
	  document.execCommand('copy');
	  copy_from.blur();
	  document.body.removeChild(copy_from);
} */
