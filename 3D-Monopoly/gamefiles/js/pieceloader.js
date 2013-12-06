function pieceLoader()
{
	hatLoader = new THREE.STLLoader();
	thimbleLoader = new THREE.STLLoader();
	shipLoader = new THREE.STLLoader();
	flatironLoader = new THREE.STLLoader();
	
	hatLoader.addEventListener('load', function (event){
		var geometry = event.content;
		var test = new THREE.Mesh( geometry,  new THREE.MeshPhongMaterial( { ambient: 0xff5533, color: 0xff5533, specular: 0x111111, shininess: 200 } ) );
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
		var test = new THREE.Mesh( geometry,  new THREE.MeshPhongMaterial( { ambient: 0xff5533, color: 0xff5533, specular: 0x111111, shininess: 200 } ) );
		thimblegeo = test.geometry.clone();
		
		var i = 1;
		var scale = .85;
		var invscale = 1/scale;
		test.scale.set(scale, scale, scale);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation((475 + (75*(i%2))) * invscale, objHeight, (420 + step/2 + 70 * (Math.floor((i)/2))) * invscale));

        test.id = i;
        scene.add(test);
        players[i].piece = test;
	});
	thimbleLoader.load('textures/thimble.stl');
	
	shipLoader.addEventListener('load', function (event){
		var geometry = event.content;
		var test = new THREE.Mesh( geometry,  new THREE.MeshPhongMaterial( { ambient: 0xff5533, color: 0xff5533, specular: 0x111111, shininess: 200 } ) );
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
		var test = new THREE.Mesh( geometry,  new THREE.MeshPhongMaterial( { ambient: 0xff5533, color: 0xff5533, specular: 0x111111, shininess: 200 } ) );
		flatirongeo = test.geometry.clone();
		
		var i = 3;
		var scale = .65;
		var invscale = 1/scale;
		test.scale.set(scale, scale, scale);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation((475 + (75*(i%2))) * invscale, objHeight, (420 + step/2 + 70 * (Math.floor((i)/2))) * invscale));

        test.id = i;
        scene.add(test);
        players[i].piece = test;
	});
	flatironLoader.load('textures/flatiron.stl');
}