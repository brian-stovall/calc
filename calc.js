document.addEventListener('DOMContentLoaded', function() {
	var grab = document.getElementById.bind(document);
	var screen = grab('screen');
	var buttons = document.getElementsByClassName('btn');

	//the register stores the state of the calculator
	var register;

	//stores the last operation for chaining
	var lastOp;

	//a switch for tracking whether or not the screen needs to refresh
	var refresh = false;

	//assign a click handler to all buttons
	for (var i=0; i < buttons.length; i++) {
		var instruction = buttons[i].textContent;
		if (instruction.match(/[\d.]/)) {
				buttons[i].onclick = function() {
					if (refresh) {
						screen.textContent = '';
						refresh = false;
					}
					//use if this.textContent to make '.' rules.
					screen.textContent = screen.textContent + this.textContent;
				}			
		}
		else if (instruction === 'CE') {
			buttons[i].onclick = function() {
				screen.textContent = ' ';
			}
		}
		else buttons[i].onclick = function() {
				if (!register) register = screen.textContent;
				if (lastOp)
					register = calc(register, lastOp, screen.textContent);
				lastOp = this.textContent;
			  screen.textContent = register;
				refresh = true;
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

