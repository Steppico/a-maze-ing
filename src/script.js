/*
TODO:
1.move MISSION CONTROL title towards the borders of the buttons.
2.make it look pretty! I would like the pixel style border.
*/

window.onload = () => {
	const arrow = "./arrow.png";
	const missionControl = document.getElementsByClassName('missionControl-title')[0];
	const moveForward = document.getElementsByClassName('moveForward')[0];
	const rotate = document.getElementsByClassName('rotate')[0];
	const executeCommands = document.getElementsByClassName('execute')[0];
	const element = document.createElement('canvas');
	const pattern = document.getElementsByClassName('pattern')[0];
	const clear = document.getElementsByClassName('clear')[0];
	const movements = [];


	element.id = "canvas"
	element.width = 1100;
	element.height = 700;
	element.tabIndex = '1';

	document.body.insertBefore(element, missionControl);

	const canvas = element;
	const ctx = canvas.getContext('2d');

	const movingArrow = {
		x: (canvas.width / 2) - 50,
		y: 0,
		pointing: "down",
		spin: null
	}

	const canvasCoords = {
		done: false,
	}

	image = new Image();
	image.src = arrow;

	image.onload = function () {
		ctx.drawImage(image, movingArrow.x, movingArrow.y, 100, 100);
	}

	function shakeIt(element, input) {
		if (input === 'add') {
			element.classList.add('shakeit');
		} else {
			element.classList.remove('shakeit');
		}
	}

	const directions = move => {
		if (move === 'forward') {
			switch (movingArrow.pointing) {
				case "down": {
					// movingArrow.y + 200 <= element.height ? movingArrow.y += 100 : shakeIt(canvas, 'add');
					console.log(movingArrow.y + 100);
					console.log(movingArrow.x);
					// console.log(canvasCoords[`${movingArrow.x} ${movingArrow.y + 200}`]);
					canvasCoords[`${movingArrow.x} ${movingArrow.y + 100}`] ? shakeIt(canvas, 'add') : movingArrow.y += 100;
					break;
				};
				case "top": {
					console.log(movingArrow.y);
					console.log(movingArrow.x);
					canvasCoords[`${movingArrow.x} ${movingArrow.y}`] ? shakeIt(canvas, 'add') : movingArrow.y -= 100;
					// movingArrow.y > 0 ? movingArrow.y -= 100 : shakeIt(canvas, 'add');
					break;
				};
				case "left": {
					console.log(movingArrow.y);
					console.log(movingArrow.x);
					console.log(canvasCoords[`${movingArrow.x} ${movingArrow.y}`]);
					// movingArrow.x > 0 ? movingArrow.x -= 100 : shakeIt(canvas, 'add');
					canvasCoords[`${movingArrow.x} ${movingArrow.y}`] ? shakeIt(canvas, 'add') : movingArrow.x -= 100;
					break;
				};
				default: {
					console.log(movingArrow.y);
					console.log(movingArrow.x + 100);
					console.log(canvasCoords[`${movingArrow.x + 100} ${movingArrow.y}`]);
					// movingArrow.x + 200 <= element.width ? movingArrow.x += 100 : shakeIt(canvas, 'add');
					canvasCoords[`${movingArrow.x + 100} ${movingArrow.y}`] ? shakeIt(canvas, 'add') : movingArrow.x += 100;
				}
			}

		} else if (move === 'rotate') {
			switch (movingArrow.pointing) {
				case "down": {
					movingArrow.pointing = "left";
					movingArrow.spin = 90 * Math.PI / 180;
					break;
				};
				case "left": {
					movingArrow.pointing = "top";
					movingArrow.spin = 180 * Math.PI / 180;
					break;
				};
				case "top": {
					movingArrow.pointing = "right";
					movingArrow.spin = 270 * Math.PI / 180;
					break;
				};
				default: {
					movingArrow.pointing = "down";
					movingArrow.spin = 0;
					break;
				}
			}
		}
		ctx.translate(movingArrow.x + 50, movingArrow.y + 50);
		ctx.rotate(movingArrow.spin);
		ctx.translate(-(movingArrow.x + 50), -(movingArrow.y + 50));
		ctx.drawImage(image, movingArrow.x, movingArrow.y, 100, 100);
	}

	const addMovement = direction => {
		movements.push(direction);
		pattern.append(movements.length + ". " + direction + " ");
	}

	const executeAll = (moves) => {
		const canvas = document.getElementById('canvas');
		let i = 0;
		let intervalId = setInterval(() => {
			shakeIt(canvas, 'remove');
			if (i > moves.length - 1) {
				clearInterval(intervalId);
				movements.length = 0;
				console.log(canvasCoords);
			} else {
				ctx.clearRect(0, 0, element.width, element.height);
				draw();
				ctx.save();
				directions(moves[i]);
				ctx.restore();
			}
			i++;
		}, 400);
	}

	function addCanvasCoords(begin, end) {
		console.log(begin, end);
		if (begin[0] === end[0]) { // this means we are moving on Y axis
			if (begin[1] > end[1]) {
				console.log("Y Axis, bottom to top");
				for (let i = end[1]; i <= begin[1]; i = i + 100) {
					canvasCoords[`${begin[0]} ${i}`] = [begin[0], i];
				}
			} else {
				console.log("Y axis, top to bottom");
				for (let i = begin[1]; i <= end[1]; i = i + 100) {
					canvasCoords[`${begin[0]} ${i}`] = [begin[0], i];
				}
			}
		} else if (begin[1] === end[1]) { // this means we are moving on X axis
			if (begin[0] > end[0]) {
				console.log("X Axis, rtl");
				for (let j = end[0]; j <= begin[0]; j = j + 100) {
					canvasCoords[`${j} ${end[1]}`] = [j, end[1]];
				}
			} else {
				console.log("X Axis, ltr")
				for (let j = begin[0]; j <= end[0]; j = j + 100) {
					canvasCoords[`${j} ${end[1]}`] = [j, end[1]];
				}
			}
		}
	}

	function draw() {
		// PoC with canvas borders
		addCanvasCoords([0, 0], [element.width, 0]);
		addCanvasCoords([element.width, 0], [element.width, element.height]);
		addCanvasCoords([element.width, element.height], [0, element.height]);
		addCanvasCoords([0, element.height], [0, 0]);
		console.log(canvasCoords);
		ctx.lineWidth = 5;
		ctx.beginPath();

		// top (entrance from 500 to 600)
		ctx.moveTo(100, 100);
		ctx.lineTo(500, 100);
		// canvasCoords.done ? "" : addCanvasCoords([100, 100], [500, 100]);
		ctx.moveTo(600, 100);
		ctx.lineTo(1000, 100);

		// left side
		ctx.moveTo(100, 97.5);
		ctx.lineTo(100, element.height - 100);

		// bottom (exit from 500 to 600)
		ctx.lineTo(500, element.height - 100);
		ctx.moveTo(600, element.height - 100);
		ctx.lineTo(1000, element.height - 100);

		// right side
		ctx.lineTo(1000, 97.5);

		// inside pattern
		//// horizontal lines
		ctx.moveTo(100, 200);
		ctx.lineTo(200, 200);
		ctx.moveTo(300, 200);
		ctx.lineTo(700, 200);
		ctx.moveTo(800, 200);
		ctx.lineTo(900, 200);
		ctx.moveTo(400, 300);
		ctx.lineTo(500, 300);
		ctx.moveTo(700, 300);
		ctx.lineTo(800, 300);
		ctx.moveTo(900, 300);
		ctx.lineTo(1000, 300);
		ctx.moveTo(200, 400);
		ctx.lineTo(400, 400);
		ctx.moveTo(500, 400);
		ctx.lineTo(700, 400);
		ctx.moveTo(900, 400);
		ctx.lineTo(1000, 400);
		ctx.moveTo(100, 500);
		ctx.lineTo(300, 500);
		ctx.moveTo(500, 500);
		ctx.lineTo(600, 500);
		ctx.moveTo(700, 500);
		ctx.lineTo(900, 500);

		//// vertical lines
		ctx.moveTo(200, 300);
		ctx.lineTo(200, 402.5);
		ctx.moveTo(300, 197.5);
		ctx.lineTo(300, 300);
		ctx.moveTo(400, 297.5);
		ctx.lineTo(400, 600);
		ctx.moveTo(500, 397.5);
		ctx.lineTo(500, 502.5);
		ctx.moveTo(600, 200);
		ctx.lineTo(600, 400);
		ctx.moveTo(600, 497.5);
		ctx.lineTo(600, 602.5);
		ctx.moveTo(700, 397.5);
		ctx.lineTo(700, 502.5);
		ctx.moveTo(800, 100);
		ctx.lineTo(800, 400);
		// drawing
		ctx.stroke();
	}

	function resetStatus() {
		ctx.clearRect(0, 0, element.width, element.height);
		movingArrow.x = element.width / 2 - 50;
		movingArrow.y = 0;
		movingArrow.pointing = "down";
		movingArrow.spin = null;
		ctx.drawImage(image, movingArrow.x, movingArrow.y, 100, 100);
		movements.length = 0;
		draw();
		pattern.innerText = "";
	}

	draw();
	moveForward.addEventListener('click', () => { addMovement('forward') });
	rotate.addEventListener('click', () => { addMovement('rotate') });
	executeCommands.addEventListener('click', () => { executeAll(movements) })
	clear.addEventListener('click', () => { resetStatus() })
};
