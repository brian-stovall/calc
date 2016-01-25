document.addEventListener('DOMContentLoaded', function() {
	var grab = document.getElementById.bind(document);
	var screen = grab('screen');
	var buttons = document.getElementsByClassName('btn');

	//the register stores the state of the calculator
	var register = screen.textContent;

	//assign a click handler to all buttons
	for (var i=0; i < buttons.length; i++) {
		if (buttons[i].textContent.match(/[\d\.]/))
				buttons[i].onclick = function() {screen.textContent = screen.textContent + this.textContent;};			
		else buttons[i].onclick = function() {
							 register = calc(register, this.textContent, screen.textContent);
							 screen.textContent = register;
							};
	}


	//calculation function - takes three strings: two numbers and an 
	//operand and returns the result
	function calc(n1, oper, n2) {
		//a table mapping characters to functions
		var optable = { '%': (m, n) => { return m % n; },
										'/': (m, n) => { return m / n; },
										'*': (m, n) => { return m * n; },
										'-': (m, n) => { return m - n; },
										'+': (m, n) => { return m + n; },
										'=': (m, n) => { return m = n; } };
		return optable[oper](parseFloat(n1), parseFloat(n2));
	}
							
});

