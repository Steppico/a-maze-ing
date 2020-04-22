window.onload = () => {
	const arrow = "./arrow.png";
	const moveForward = document.getElementsByClassName('moveForward')[0];
	const rotate = document.getElementsByClassName('rotate')[0];
	const executeCommands = document.getElementsByClassName('execute')[0];
	const element = document.createElement('canvas');
	const pattern = document.getElementsByClassName('pattern')[0];
	const movements = [];

	element.id = "canvas"
	element.width = 500;
	element.height = 500;
	element.tabIndex = '1';

	document.body.insertBefore(element, moveForward);

	const canvas = element;
	const ctx = canvas.getContext('2d');
	let x = (canvas.width / 2) - 50;
	let y = 0;
	let pointing = "down";
	const theArrow = canvas.getContext('2d');

	image = new Image();
	image.src = arrow;

	image.onload = function () {
		theArrow.drawImage(image, x, y, 100, 100);
	}

	const directions = move => {
		switch (move) {
			case 'forward': {
				if (y < element.height) {
					switch (pointing) {
						case "down": {
							y += 100;
							break;
						};
						case "top": {
							y -= 100;
							break;
						};
						case "left": {
							x -= 100;
							break;
						};
						default: {
							x += 100;
						}
					}
					console.log("x: ", x, "y: ", y);
					theArrow.drawImage(image, x, y, 100, 100);
				};
				break;
			};
			case 'rotate': {
				switch (pointing) {
					case "down": {
						pointing = "left";
						break;
					};
					case "left": {
						pointing = "top";
						break;
					};
					case "top": {
						pointing = "right";
						break;
					};
					default: {
						pointing = "down";
						break;
					}
				}
				console.log(pointing);
				ctx.save();
				theArrow.translate(x + 50, y + 50);
				theArrow.rotate(90 * Math.PI / 180);
				theArrow.translate(-(x + 50), -(y + 50));
				theArrow.save();
				theArrow.drawImage(image, x, y, 100, 100);
				theArrow.restore();
				ctx.restore();
				break;
			}
		}
	}

	const addMovement = direction => {
		movements.push(direction);
		pattern.append(movements.length + ". " + direction + " ");
	}
	const executeAll = (moves) => {
		let i = 0;
		let intervalId = setInterval(() => {
			if (i > moves.length - 1) {
				clearInterval(intervalId);
				movements.length = 0;
			} else {
				theArrow.clearRect(0, 0, 500, 500)
				directions(moves[i]);
			}
			i++;
		}, 1000);
	}

	moveForward.addEventListener('click', () => { addMovement('forward') });
	rotate.addEventListener('click', () => { addMovement('rotate') });
	executeCommands.addEventListener('click', () => { executeAll(movements) })

};
