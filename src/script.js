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

	let movingArrow = {
		x: (canvas.width / 2) - 50,
		y: 0,
		pointing: "down"
	}

	const theArrow = canvas.getContext('2d');

	image = new Image();
	image.src = arrow;

	image.onload = function () {
		theArrow.drawImage(image, movingArrow.x, movingArrow.y, 100, 100);
	}

	const directions = move => {
		switch (move) {
			case 'forward': {
				if (movingArrow.y < element.height) {
					switch (movingArrow.pointing) {
						case "down": {
							movingArrow.y += 100;
							break;
						};
						case "top": {
							movingArrow.y -= 100;
							break;
						};
						case "left": {
							movingArrow.x -= 100;
							break;
						};
						default: {
							movingArrow.x += 100;
						}
					}
					console.log("x: ", movingArrow.x, "y: ", movingArrow.y);
					theArrow.drawImage(image, movingArrow.x, movingArrow.y, 100, 100);
				};
				break;
			};
			case 'rotate': {
				switch (movingArrow.pointing) {
					case "down": {
						movingArrow.pointing = "left";
						break;
					};
					case "left": {
						movingArrow.pointing = "top";
						break;
					};
					case "top": {
						movingArrow.pointing = "right";
						break;
					};
					default: {
						movingArrow.pointing = "down";
						break;
					}
				}
				console.log(movingArrow.pointing);
				ctx.save();
				theArrow.translate(movingArrow.x + 50, movingArrow.y + 50);
				theArrow.rotate(90 * Math.PI / 180);
				theArrow.save();
				theArrow.translate(-(movingArrow.x + 50), -(movingArrow.y + 50));
				ctx.restore();
				theArrow.restore();
				theArrow.drawImage(image, movingArrow.x, movingArrow.y, 100, 100);
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
				ctx.clearRect(0, 0, 500, 500)
				directions(moves[i]);
			}
			i++;
		}, 200);
	}

	moveForward.addEventListener('click', () => { addMovement('forward') });
	rotate.addEventListener('click', () => { addMovement('rotate') });
	executeCommands.addEventListener('click', () => { executeAll(movements) })

};
