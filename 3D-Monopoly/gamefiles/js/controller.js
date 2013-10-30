window.onload = function()
{
	var renderer, container, camera, scene;
	var line, test, geometry;
	var mouseXOnMouseDown = mouseYOnMouseDown = 0;
	var	targetXRotationOnMouseDown = targetXRotationOnMouseDown = 0;
	var	mouseX = mouseY = targetX = targetY = 0;
	this.currentWindowX = window.innerWidth ;
	this.currentWindowY = window.innerHeight;
	var that = this;
	var material = new THREE.MeshLambertMaterial({color: 0xD9E8FF, map: THREE.ImageUtils.loadTexture('textures/lighttexture.png'), shininess: 200, reflectivity: .85});
	var selMaterial = new THREE.MeshLambertMaterial( { color: 0x666666, emissive: 0x000000, ambient: 0x000000, shading: THREE.SmoothShading } );
    var rectmesh, underMesh;
	
    var main;
    var playerPosition = board = turnCount = reRollCount = 0;
    var gameOver = reRoll = false;
    var firstDie;
    var tileBoard = new Array();
    var players = new Array();
    var numberOfPlayers = 4; //TODO enable more players
    var testCount = 1; //4 full turns
	var playersAtBoard = new Array();
	for (var i = 0; i <40; i++)
		playersAtBoard[i] = 0;
	playersAtBoard[0] = 4;
	var currentPlayer = 0;

	init();
	animate();
	
    expandMoneys(1500);
    populateListing();

    
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

		
		var linematerial = new THREE.LineBasicMaterial({color: 0x000000, opacity: 0.5});
		line = new THREE.Line(geometry, linematerial);
		line.type = THREE.LinePieces;
		line.position.z -= 10;
		scene.add(line);
		
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
		
		initializePlayers();
		initializePieces(step);
		
		var recttest = new THREE.CubeGeometry(1200, 1, 1200);
		angelTexture = THREE.ImageUtils.loadTexture("textures/board.jpg");
		var rm = new THREE.MeshBasicMaterial( { map: angelTexture, wireframe: false } )
		rectmesh = new THREE.Mesh(recttest, rm);
		scene.add(rectmesh);

		
		var newgeo = new THREE.Geometry();
		newgeo.vertices.push((new THREE.Vector3(600, 1, 600)));
		newgeo.vertices.push((new THREE.Vector3(600, 1, -600)));
		newgeo.vertices.push((new THREE.Vector3(-600, 1, -600)));
		newgeo.vertices.push((new THREE.Vector3(-600, 1, 600)));
		newgeo.faces.push( new THREE.Face4( 0, 1, 2, 3));
		newgeo.applyMatrix(new THREE.Matrix4().makeTranslation(0, -5, 0));
		newgeo.applyMatrix(new THREE.Matrix4().makeScale( -1, 1, 1 ) );
		underMesh = new THREE.Mesh(newgeo, selMaterial);
		scene.add(underMesh);
	}
	
	function initializePieces(step)
	{
		for (var i = 0; i < numberOfPlayers; i++)
		{
			var geometry = getPiece(i);
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(450 + (100*(i%2)), 30 - 2, 400 + step/2 + 70 * (Math.floor((i)/2))));
			test = new THREE.Mesh(geometry, selMaterial);
			test = new THREE.Mesh(geometry, material);

			test.id = i;
			scene.add(test);
			players[i].piece = test;
		}
	}
	
	function getPiece(playerNumber)
	{
		if (playerNumber === 0)
			var geometry = new THREE.SphereGeometry(30, 20, 18);
		else if (playerNumber === 1)
			var geometry = new THREE.CubeGeometry(40, 40, 40);
		else if (playerNumber === 2)
			var geometry = new THREE.IcosahedronGeometry(30);
		else if (playerNumber === 3)
			var geometry = new THREE.TorusGeometry(30, 10, 100, 100)
		return geometry;
	}
	
    function initializePlayers()
    {
		for (var i = 0; i < numberOfPlayers; i++)
			players.push(new Player(0, test, 1500));
    }
    
    function rollDice(twodice)
    {
		var piece = players[currentPlayer].piece;
		var pos = players[currentPlayer].playerPosition;
		
        firstDie = Math.floor((Math.random()*6)+1);
		if (twodice)
			secondDie = firstDie;
		else
			secondDie = Math.floor((Math.random()*6)+1);
		var roll = firstDie + secondDie;
        
		document.getElementById('move').value = roll;
		move(piece, pos, roll);
    }
    
	function move(piece, currentSpace, spaces)
	{
		var id = piece.id;
		var geometry = getPiece(id);
		var subt = 87.5;
		var offset = 0;
		var destSquare = (currentSpace + spaces) % 40;
		
		if (currentSpace + spaces >= 40)
		{
			passedGo();
		}
		
		playersAtBoard[destSquare] += 1;
		playersAtBoard[currentSpace] -= 1;
		if (playersAtBoard[destSquare] > 1)
			offset = 70;

		if (destSquare === 0)
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(500, 30 - 2, 500));
		else if (destSquare < 10)
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(350-(((currentSpace+spaces)%10)-1)*subt, 30 - 2, 500 + offset));
		else if (destSquare === 10)
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-500, 30 - 2, 500));
		else if (destSquare < 20)
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-500 - offset, 30 - 2, 350-(((currentSpace+spaces)%10)-1)*subt));
		else if (destSquare === 20)
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-500, 30 - 2, -500));
		else if (destSquare < 30)
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-350+(((currentSpace+spaces)%10)-1)*subt, 30 - 2, -500 - offset));
		else if (destSquare === 30)
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(500, 30 - 2, -500));
		else if (destSquare < 40)
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(500 + offset, 30 - 2, -350+(((currentSpace+spaces)%10)-1)*subt));
			
		var xrot = piece.rotation.x;
		var yrot = piece.rotation.y;
		scene.remove(piece);
		
		piece = new THREE.Mesh(geometry, material);
		piece.rotation.x = xrot;
		piece.rotation.y = yrot;
		
		players[id].piece = piece;
		players[id].playerPosition = destSquare;
		players[id].piece.id = id;
		scene.add(piece);
	}
	
	function moveToGo()
	{
		move(players[currentPlayer].piece, 0, 0);
	}
	
	function passedGo()
	{
		players[currentPlayer].money = parseInt(players[currentPlayer].money)+200;
		expandMoneys(players[currentPlayer].money);
		document.getElementById("money").value = parseInt(document.getElementById("money").value) + 200;
	}
	
	document.getElementById('rolldice').onclick = function()
	{
		rollDice();
	}
	
	document.getElementById('doubles').onclick = function()
	{
		rollDice(true);
	}
	
	document.getElementById('switchplayer').onclick = function()
	{
		currentPlayer = (currentPlayer + 1) % numberOfPlayers;
		$('#money')[0].value = players[currentPlayer].money;
		expandMoneys(players[currentPlayer].money);
        updateDeedCards(players[currentPlayer].properties);
	}
	
	document.getElementById('realmove').onclick = function()
	{
		move(players[currentPlayer].piece, players[currentPlayer].playerPosition, parseInt(document.getElementById('move').value));
	}
	
	document.getElementById('go').onclick = function()
	{
		expandMoneys(parseInt(document.getElementById("money").value));
		players[currentPlayer].money = document.getElementById("money").value;
	}
    
    document.getElementById('addDeed').onclick = function()
	{
        players[currentPlayer].addPropertyIndex(parseInt(document.getElementById("deedValue").value));
        console.log(players[currentPlayer]);

        updateDeedCards(players[currentPlayer].properties);
	}
    
    document.getElementById('addCurrentDeed').onclick = function()
	{
    players[currentPlayer].addPropertyIndex(parseInt(document.getElementById("deedValue").value));
        
        updateDeedCards(players[currentPlayer].properties);
	}
	
	document.getElementById('jail').onclick = function()
	{
		move(players[currentPlayer].piece, 0, 10);
	}
	
	document.getElementById('moveToGo').onclick = function()
	{
		moveToGo();
	}
	
	document.getElementById('passgo').onclick = function()
	{
		moveToGo();
		passedGo();
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

        if ( event.target.tagName == 'DIV')
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
		
		for (var i = 0; i < numberOfPlayers; i++)
		{
			var piece = players[i].piece;
			piece.rotation.x += ( targetX - piece.rotation.x ) * 0.05;
			piece.rotation.y += ( targetY - piece.rotation.y ) * 0.05;
		}
		
		rectmesh.rotation.x += ( targetX - rectmesh.rotation.x ) * 0.05;
		rectmesh.rotation.y += ( targetY - rectmesh.rotation.y ) * 0.05;
		
		underMesh.rotation.x += ( targetX - underMesh.rotation.x ) * 0.05;
		underMesh.rotation.y += ( targetY - underMesh.rotation.y ) * 0.05;
			
		camera.lookAt(scene.position);
		renderer.render(scene, camera);
	}	
}