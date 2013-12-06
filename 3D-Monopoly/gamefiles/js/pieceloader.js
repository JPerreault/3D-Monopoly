/* Author: Jason Perreault
   Loads in the real monopoly pieces. */

function pieceLoader()
{
	hatLoader = new THREE.STLLoader();
	thimbleLoader = new THREE.STLLoader();
	shipLoader = new THREE.STLLoader();
	flatironLoader = new THREE.STLLoader();
	
	hatLoader.addEventListener('load', function (event){
		var geometry = event.content;
		var test = new THREE.Mesh( geometry, redmat );
		hatgeo = test.geometry.clone();
		
		var i = 0;
		var scale = .32;
		var invscale = 1/scale;
		test.scale.set(scale, scale, scale);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation((475 + (75*(i%2))) * invscale, objHeight, (420 + step/2 + 70 * (Math.floor((i)/2))) * invscale));

        test.id = i;
        scene.add(test);
        players[i].piece = test;
	});
	hatLoader.load('textures/hat.stl');
	
	thimbleLoader.addEventListener('load', function (event){
		var geometry = event.content;
		geometry.applyMatrix(new THREE.Matrix4().makeRotationY(3*Math.PI/2));
		 geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -50, 0));
		var test = new THREE.Mesh( geometry,  redmat );
		thimblegeo = test.geometry.clone();
		
		var i = 1;
		var scale = .25;
		var invscale = 1/scale;
		test.scale.set(scale, scale, scale);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation((475 + (75*(i%2))) * invscale, objHeight, (420 + step/2 + 70 * (Math.floor((i)/2))) * invscale));

        test.id = i;
        scene.add(test);
        players[i].piece = test;
	});
	thimbleLoader.load('textures/car.stl');
	
	shipLoader.addEventListener('load', function (event){
		var geometry = event.content;
		var test = new THREE.Mesh( geometry,  redmat );
		shipgeo = test.geometry.clone();
		
		var i = 2;
		var scale = .3;
		var invscale = 1/scale;
		test.scale.set(scale, scale, scale);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation((475 + (75*(i%2))) * invscale, objHeight, (420 + step/2 + 70 * (Math.floor((i)/2))) * invscale));

        test.id = i;
        scene.add(test);
        players[i].piece = test;
	});
	shipLoader.load('textures/ship.stl');
	
	flatironLoader.addEventListener('load', function (event){
		var geometry = event.content;
		var test = new THREE.Mesh( geometry,  redmat );
		flatirongeo = test.geometry.clone();
		
		var i = 3;
		var scale = .55;
		var invscale = 1/scale;
		test.scale.set(scale, scale, scale);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation((475 + (75*(i%2))) * invscale, objHeight, (420 + step/2 + 70 * (Math.floor((i)/2))) * invscale));

        test.id = i;
        scene.add(test);
        players[i].piece = test;
	});
	flatironLoader.load('textures/flatiron.stl');
}