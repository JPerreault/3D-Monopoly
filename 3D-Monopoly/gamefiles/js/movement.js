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
    
    if (firstDie === secondDie)
    {
        if (players[currentPlayer].jailed === true)
        {
            move(piece, pos, roll);
            players[currentPlayer].jailed = false;
        }
        else
        {
            players[currentPlayer].doublesRolled += 1;
            if (players[currentPlayer].doublesRolled === 3)
                getJailed();
            else
                move(piece, pos, roll);
        }
    }
    else if (players[currentPlayer].jailed === false)
    {
        move(piece, pos, roll);
        players[currentPlayer].doublesRolled = 0;
    }
}

function getJailed()
{
    players[currentPlayer].jailed = true;
    move(players[currentPlayer].piece, 0, 10);
}

function move(piece, currentSpace, spaces)
{
    var id = piece.id;
	var scale = piece.scale.x;
	var invscale = 1/scale;
    var geometry = getRealPiece(id);
    var subt = 97;
    var offset = 0;
    var xoffset = 0;
    var offSide = 500;
    var sidePush = 390;
	var jaily = 0;
    var destSquare = (currentSpace + spaces) % 40;
    
    if (currentSpace + spaces >= 40)
    {
        passedGo();
    }

	offset = 70 * Math.floor(id/2);
	xoffset = -20 + (45 * (id%2));
	
    

    if (destSquare === 0)
         geometry.applyMatrix(new THREE.Matrix4().makeTranslation((475 + (75*(id%2))) * invscale, objHeight, (420 + step/2 + 70 * (Math.floor((id)/2))) * invscale));
    else if (destSquare < 10)
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation((sidePush-(((currentSpace+spaces)%10)-1)*subt + xoffset) * invscale, objHeight, (offSide + offset) * invscale));
    else if (destSquare === 10)
    {
		offset -= 20 * Math.floor(id/2);
		offSide += 25;
        if (players[currentPlayer].jailed === true)
            geometry.applyMatrix(new THREE.Matrix4().makeTranslation((-offSide + 60*(id%2)) * invscale, objHeight, (offSide - 50 + 60 * (Math.floor((id)/2))) * invscale));
        else
		{
			if (id === 0)
				jaily = -50;
			if (id === 3)
				offset += 50;
		
            geometry.applyMatrix(new THREE.Matrix4().makeTranslation((-offSide - 45 + offset) * invscale, objHeight, (offSide + 55 + jaily) * invscale));
		}
    }
    else if (destSquare < 20)
	{
		geometry.applyMatrix(new THREE.Matrix4().makeRotationY(3*Math.PI/2));
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation((-offSide - offset) * invscale, objHeight, (sidePush-(((currentSpace+spaces)%10)-1)*subt + xoffset) * invscale));
	}
    else if (destSquare === 20)
	{
		geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI));
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation((-475 - (75*(id%2))) * invscale, objHeight, (-420 - step/2 - 70 * (Math.floor((id)/2))) * invscale));
	}
    else if (destSquare < 30)
	{
		geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI));
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation((-sidePush+(((currentSpace+spaces)%10)-1)*subt - xoffset) * invscale, objHeight, (-offSide - offset) * invscale));
	}
    else if (destSquare === 30)
    {
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation((-offSide + 60*(id%2)) * invscale, objHeight,(offSide - 50 + 60 * (Math.floor((id)/2))) * invscale));
        players[currentPlayer].jailed = true;
        destSquare = 10;
    }
    else if (destSquare < 40)
	{
		geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI/2));
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation((offSide + offset) * invscale, objHeight, (-sidePush+(((currentSpace+spaces)%10)-1)*subt - xoffset) * invscale));
	}
        
    var xrot = piece.rotation.x;
    var yrot = piece.rotation.y;
    scene.remove(piece);
    
    piece = new THREE.Mesh(geometry, redmat);
    piece.rotation.x = xrot;
    piece.rotation.y = yrot;
	piece.scale.set(scale, scale, scale);
    
    console.log('Destination Square: ',destSquare);
    
    
    var currentProp;
    if (id == currentPlayer)
    {
        currentProp = tileBoard[destSquare].activate();
        
        if (currentProp.cost && !alreadyOwned(destSquare))
        {
            if (currentProp.cost <= players[id].money)
            {
                //console.log(currentProp.getInfo());
                
                players[currentPlayer].addPropertyIndex(currentProp.index);
                players[currentPlayer].money -= currentProp.cost;
                updateDisplay();
            }
        }
        else
            console.log('Current prop: ', currentProp);
    }
    
    
    players[id].piece = piece;
    players[id].playerPosition = destSquare;
    players[id].piece.id = id;
    scene.add(piece);
    
    if(currentProp === "Call chance function"){
    drawCard("chance");
    }
    else if(currentProp === "Call comunity chest function"){
    drawCard("comchest");
    } 
	
	if (cameralock)
		updateLockedCamera();
}