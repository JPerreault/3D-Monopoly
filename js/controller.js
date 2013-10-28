var test, scene;
window.onload = function()
{
	var renderer, container, camera;
	var line, geometry;
	var mouseXOnMouseDown = mouseYOnMouseDown = 0;
	var	targetXRotationOnMouseDown = targetXRotationOnMouseDown = 0;
	var	mouseX = mouseY = targetX = targetY = 0;
	this.currentWindowX = window.innerWidth ;
	this.currentWindowY = window.innerHeight;
	var that = this;
	var tileid = 0;
	var pieces = [];
	
	init();
	animate();
	
	function init()
	{
		container = document.createElement('div');
		document.body.appendChild(container);
		
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
		camera.position.set(0, 1250, 1000);
		
		scene = new THREE.Scene();
		
		var geometry = new THREE.Geometry();
		
		var size = 600,
			step = 200;
		
		for (var i = 0; i < 2; i++)
		{
			geometry.vertices.push(new THREE.Vector3(-size + step*i, 0, -size  + step*i));
			geometry.vertices.push(new THREE.Vector3(-size  + step*i, 0, size  - step*i));
			geometry.vertices.push(new THREE.Vector3(size  - step*i, 0, size  - step*i));
			geometry.vertices.push(new THREE.Vector3(size  - step*i, 0, -size  + step*i));
			geometry.vertices.push(new THREE.Vector3(size  - step*i, 0, -size  + step*i));
			geometry.vertices.push(new THREE.Vector3(-size  + step*i, 0, -size  + step*i));
			geometry.vertices.push(new THREE.Vector3(size  - step*i, 0, size  - step*i));
			geometry.vertices.push(new THREE.Vector3(-size  + step*i, 0, size  - step*i));
		}
		
		for (var i = 0; i < 10; i++)
		{
			geometry.vertices.push(new THREE.Vector3(-size + step + (i * ((2*size - 2*step) / 9)), 0, -size));
			geometry.vertices.push(new THREE.Vector3(-size + step + (i * ((2*size - 2*step) / 9)), 0, -size + step));
			
			geometry.vertices.push(new THREE.Vector3(size - step - (i * ((2*size - 2*step) / 9)), 0, size));
			geometry.vertices.push(new THREE.Vector3(size - step - (i * ((2*size - 2*step) / 9)), 0, size - step));
			
			geometry.vertices.push(new THREE.Vector3(-size, 0, -size + step + (i * ((2*size - 2*step) / 9))));
			geometry.vertices.push(new THREE.Vector3(-size + step, 0, -size + step + (i * ((2*size - 2*step) / 9))));
			
			geometry.vertices.push(new THREE.Vector3(size, 0, -size + step + (i * ((2*size - 2*step) / 9))));
			geometry.vertices.push(new THREE.Vector3(size - step, 0, -size + step + (i * ((2*size - 2*step) / 9))));
		}

		
		var material = new THREE.LineBasicMaterial({color: 0x000000, opacity: 0.5});
		line = new THREE.Line(geometry, material);
		line.type = THREE.LinePieces;
		scene.add(line);
		
		var material = new THREE.MeshLambertMaterial({color: 0xD9E8FF, map: THREE.ImageUtils.loadTexture('textures/lighttexture.png'), shininess: 200, reflectivity: .85});
		var geometry = new THREE.SphereGeometry(30, 20, 18);
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(500, 30 - 2, 400 + step/2));
		test = new THREE.Mesh(geometry, material);
		scene.add(test);
		
		var ambientLight = new THREE.AmbientLight(0x202020);
		scene.add( ambientLight );

		var directionalLight = new THREE.DirectionalLight(0xffffff);
		directionalLight.position.set(0, 1, 0);
		scene.add(directionalLight);
		
		renderer = new THREE.WebGLRenderer();
		renderer.setSize(this.currentWindowX, this.currentWindowY);
		renderer.setFaceCulling( THREE.CullFaceNone );
		renderer.autoClear = false;	
		container.appendChild(renderer.domElement);
		
		
		window.addEventListener('resize', onWindowResize, false);
		window.addEventListener( 'mousewheel', onMouseWheel, false);
		window.addEventListener( 'DOMMouseScroll', onMouseWheel, false);
		document.addEventListener( 'mousedown', onMouseDown, false );
	}

	function onWindowResize() 
	{
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	
	function onMouseWheel()
	{
		var fovMAX = 160;
		var fovMIN = 5;

		camera.fov -= event.wheelDeltaY * 0.05;
		camera.fov = Math.max(Math.min(camera.fov, fovMAX), fovMIN);
		camera.projectionMatrix = new THREE.Matrix4().makePerspective(camera.fov, window.innerWidth / window.innerHeight, camera.near, camera.far);
	}
	
	function onMouseDown(event)
	{
		event.preventDefault();

		document.addEventListener( 'mousemove', onMouseMoveCam, false );
		document.addEventListener( 'mouseup', onMouseUpCam, false );
		document.addEventListener( 'mouseout', onMouseUpCam, false );

		mouseXOnMouseDown = event.clientX - that.currentWindowX;
		mouseYOnMouseDown = event.clientY - that.currentWindowY;
		targetYRotationOnMouseDown = that.targetY;
		targetXRotationOnMouseDown = that.targetX;
	}
	
	function onMouseMoveCam(event)
	{
		mouseX = event.clientX - that.currentWindowX;
		mouseY = event.clientY - that.currentWindowY;

		that.targetY = targetYRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.015;
		that.targetX = targetXRotationOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.015;
	}
	
	function onMouseUpCam(event)
	{
		document.removeEventListener( 'mousemove', onMouseMoveCam, false );
		document.removeEventListener( 'mouseup', onMouseUpCam, false );
		document.removeEventListener( 'mouseout', onMouseUpCam, false );
	}
	
	function animate()
	{
		requestAnimationFrame(animate);
		render();
	}
	
	function render()
	{
		line.rotation.x += ( targetX - line.rotation.x ) * 0.05;
		line.rotation.y += ( targetY - line.rotation.y ) * 0.05;
		
		test.rotation.x += ( targetX - test.rotation.x ) * 0.05;
		test.rotation.y += ( targetY - test.rotation.y ) * 0.05;
		
		if (typeof test2 !== 'undefined')
		{
			test2.rotation.x += ( targetX - test2.rotation.x ) * 0.05;
			test2.rotation.y += ( targetY - test2.rotation.y ) * 0.05;
		}
		
		
		camera.lookAt(scene.position);
		renderer.render(scene, camera);
	}	
}
	function move(currentSpace, spaces)
	{
		var material = new THREE.MeshLambertMaterial({color: 0xD9E8FF, map: THREE.ImageUtils.loadTexture('textures/lighttexture.png'), shininess: 200, reflectivity: .85});
		var geometry = new THREE.SphereGeometry(30, 20, 18);
		var subt = 87.5;
		var destSquare = (currentSpace + spaces) % 40;
		//geometry.applyMatrix(new THREE.Matrix4().makeTranslation(350-8*subt-150, 30 - 2, 500));
		
		if (destSquare === 0)
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(500, 30 - 2, 500));
		else if (destSquare < 10)
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(350-(currentSpace+spaces-1)*subt, 30 - 2, 500));
		else if (destSquare === 10)
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-500, 30 - 2, 500));
		else if (destSquare < 20)
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-500, 30 - 2, 350-(((currentSpace+spaces)%10)-1)*subt));
		else if (destSquare === 20)
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-500, 30 - 2, -500));
		else if (destSquare < 30)
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-350+(((currentSpace+spaces)%10)-1)*subt, 30 - 2, -500));
		else if (destSquare === 30)
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(500, 30 - 2, -500));
		else if (destSquare < 40)
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(500, 30 - 2, -350+(((currentSpace+spaces)%10)-1)*subt));
			
		var xrot = test.rotation.x;
		var yrot = test.rotation.y;
		scene.remove(test);
		
		test = new THREE.Mesh(geometry, material);
		test.rotation.x = xrot;
		test.rotation.y = yrot
		scene.add(test);
	}