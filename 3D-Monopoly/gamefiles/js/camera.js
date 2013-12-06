/* Author: Jason Perreault
   Contains the logic for both the locked and unlocked camera modes. */
   
   var camtarx = 0;
   var camtarz = 1000;

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
    
    if ( event.target.id == 'chatbox')
        return;
    
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
    for (var i = 0; i < numberOfPlayers; i++)
    {
        var piece = players[i].piece;
		if (typeof players[i].piece !== 'undefined')
		{
			piece.rotation.x += ( targetX - piece.rotation.x ) * 0.05;
			piece.rotation.y += ( targetY - piece.rotation.y ) * 0.05;
		}
    }
    
    rectmesh.rotation.x += ( targetX - rectmesh.rotation.x ) * 0.05;
    rectmesh.rotation.y += ( targetY - rectmesh.rotation.y ) * 0.05;
    
    underMesh.rotation.x += ( targetX - underMesh.rotation.x ) * 0.05;
    underMesh.rotation.y += ( targetY - underMesh.rotation.y ) * 0.05;
    
    chancecards.rotation.x += ( targetX - chancecards.rotation.x ) * 0.05;
    chancecards.rotation.y += ( targetY - chancecards.rotation.y ) * 0.05;
    
    comcards.rotation.x += ( targetX - comcards.rotation.x ) * 0.05;
    comcards.rotation.y += ( targetY - comcards.rotation.y ) * 0.05;
    
    comtop.rotation.x += ( targetX - comtop.rotation.x ) * 0.05;
    comtop.rotation.y += ( targetY - comtop.rotation.y ) * 0.05;
    
    chancetop.rotation.x += ( targetX - chancetop.rotation.x ) * 0.05;
    chancetop.rotation.y += ( targetY - chancetop.rotation.y ) * 0.05;
	
	for (var i = 0; i < tileBoard.length; i++)
	{
		for (var j = 0; j < tileBoard[i].hotels.length; j++)
		{
			var hotel = tileBoard[i].hotels[j];
			hotel.rotation.x += ( targetX - hotel.rotation.x ) * 0.05;
			hotel.rotation.y += ( targetY - hotel.rotation.y ) * 0.05;
		}
	}
	
	if (cameralock)
	{
		camera.position.x += (camtarx - camera.position.x) * .05;
		camera.position.z += (camtarz - camera.position.z) * .05;
	}
        
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

function lockCamera()
{
	cameralock = true;
	targetX = 0;
	targetY = 0;
	for (var i = 0; i < numberOfPlayers; i++)
    {
        var piece = players[i].piece;
		if (typeof players[i].piece !== 'undefined')
		{
			piece.rotation.x = 0;
			piece.rotation.y = 0;
		}
    }
    rectmesh.rotation.x = 0;
    rectmesh.rotation.y = 0;
    underMesh.rotation.x = 0;
    underMesh.rotation.y = 0;
    chancecards.rotation.x = 0;
    chancecards.rotation.y = 0;
    comcards.rotation.x = 0;
    comcards.rotation.y = 0;
    comtop.rotation.x = 0;
    comtop.rotation.y = 0;
    chancetop.rotation.x = 0;
    chancetop.rotation.y = 0;
	for (var i = 0; i < tileBoard.length; i++)
	{
		for (var j = 0; j < tileBoard[i].hotels.length; j++)
		{
			var hotel = tileBoard[i].hotels[j];
			hotel.rotation.x = 0;
			hotel.rotation.y = 0;
		}
	}
	
	 document.removeEventListener( 'mousedown', onMouseDown, false );
	 //window.removeEventListener( 'mousewheel', onMouseWheel, false);
	 //window.removeEventListener( 'DOMMouseScroll', onMouseWheel, false);
	
	updateLockedCamera();
}

function updateLockedCamera()
{
	if (players[currentPlayer].playerPosition < 10)
	{
		camtarx = 0;
		camtarz = 1000;
	}
	else if (players[currentPlayer].playerPosition < 20)
	{
		camtarx = -1000;
		camtarz = 0;
	}
	else if (players[currentPlayer].playerPosition < 30)
	{
		camtarx = 0;
		camtarz = -1000;
	}
	else
	{
		camtarx = 1000;
		camtarz = 0;
	}
}

function ulc(a)
{
	camtarx = -1000;
	camtarz = 0;
}

function unlockCamera()
{
	cameralock = false;
	document.addEventListener( 'mousedown', onMouseDown, false );
	
	camera.position.set(0, 1250, 1000);
	camtarx = 0;
	camtary = 0;
}