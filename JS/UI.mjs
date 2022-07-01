/*
*	User interface module
*	
*	We keep here several common dialog-windows
*
*/

// Creates modal wrap with content and returns it as element
function modal(content) {
	$("body").append("<div id='modalWrapper' class='modal'></div>");
	return $("#modalWrapper");
}

// Modal dialog like 'prompt' in JavaScript, returns the requested text
function modalPrompt(text, placeholder) {
	// ToDo
}

export { modal }