var backgroundImage = document.getElementById('backgroundImage');
backgroundImage.crossOrigin = 'anonymous';
backgroundImage.src = 'assets/images/bg.jpg';

backgroundImage.onload = function() {
	var engine = new RainyDay({
		image: this,
		blur: 6,
		fps: 8,
		gravityThreshold: 3,
		gravityAngle: Math.PI * 2
	});

	engine.rain([ [1, 1, 2000] ]);
	engine.rain([ [2, 2, 0.88], [2, 5, 0.9], [3, 2, 1] ], 100);
};
