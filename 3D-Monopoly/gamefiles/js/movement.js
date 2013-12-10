/* Authors: Jason Perreault and Philip Donlon.
   Controls the movement of the gameplay pieces. */

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
    
    postMessage(username+" rolled ("+firstDie+","+secondDie+") = "+roll, true);
    chatMessage("You rolled ("+firstDie+","+secondDie+") = "+roll, null);

 
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

/* This function is honestly too complex to detail. It takes in the piece to move, the current
   square the that piece is on and the number of spaces to move, and moves the piece accordingly.
   Built into this function is a lot of the jailing logic, the logic that ensures that multiple
   pieces on the same square don't overlap, and the logic for activating the tile you landed on
   (buying it, paying rent, etc).
*/
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
                
                postMessage(username+" purchased "+currentProp.title+" for $"+currentProp.cost, true);
                chatMessage("You purchased "+currentProp.title+" for $"+currentProp.cost, null);
            }
        }
        else if(alreadyOwned(destSquare) && players[currentPlayer].properties.indexOf(lookUps[destSquare]) == -1)
        {
            var moneyDue = parseInt(currentProp.rent);
            
            if( monopoly(currentProp.color) && houses[destSquare] == 0)
                moneyDue *= 2;
            else if(houses[destSquare] == 1)
                moneyDue = currentProp.house1;
            else if(houses[destSquare] == 2)
                moneyDue = currentProp.house2;
            else if(houses[destSquare] == 3)
                moneyDue = currentProp.house3;
            else if(houses[destSquare] == 4)
                moneyDue = currentProp.house4;
            else if(houses[destSquare] == 5)
                moneyDue = currentProp.house5;
            
            players[currentPlayer].money -= moneyDue;
            
            players[findOwner(destSquare)].money += moneyDue;
            
            updateDisplay();
        }
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

function slideRoll()
{
    var piece = players[0].piece;
    var pos = players[0].playerPosition;
    
    firstDie = Math.floor((Math.random()*6)+1);
	secondDie = Math.floor((Math.random()*6)+1);
    var roll = firstDie + secondDie;

    document.getElementById('move').value = roll;
    
	if (players[0].playerPosition+ roll === 30)
	{
		roll--;
		document.getElementById('move').value--;
	}
    animove(piece, pos, roll+pos);
}

/* This function, and the one above it, were attempts to get the pieces to slide when they move
   rather than just jump to the next square. It got pretty close, but was fairly buggy and very
   sensitive. I was unable to get this completed in time.

*/
function animove(piece, currentSpace, destSquare)
{
	if (currentSpace === destSquare)
		return;
	var endresult = destSquare%40;
	destSquare = currentSpace + 1;
	if (destSquare === 0)
		piece.position.set(0, 0, 0);
	if (destSquare < 10)
	{
		for (var i = 1; i < 10000; i++)
			setTimeout(function(){piece.position.x -= .0097}, .1);
	}
	else if (destSquare === 10)
	{
		for (var i = 1; i < 10000; i++)
			setTimeout(function(){piece.position.x -= .018}, .1);
	}
	else if (destSquare < 20)
	{
		if (destSquare === 11)
		{
			piece.position.x += 80;
			piece.position.z -= 30;
		}
		for (var i = 1; i < 10000; i++)
			setTimeout(function(){piece.position.z -= .0097}, .1);
	}
	else if (destSquare === 20)
	{
		for (var i = 1; i < 10000; i++)
		{
			setTimeout(function(){piece.position.z -= .0095}, .1);
			setTimeout(function(){piece.position.x += .003}, .1);
		}
	}
	else if (destSquare < 30)
	{
		for (var i = 1; i < 10000; i++)
			setTimeout(function(){piece.position.x += .0098}, .1)
	}
	else if (destSquare === 30)
	{
		for (var i = 1; i < 10000; i++)
		{
			setTimeout(function(){piece.position.z += .003}, .1);
			setTimeout(function(){piece.position.x += .0085}, .1);
		}
	}
	else if (destSquare < 40)
	{
		for (var i = 1; i < 10000; i++)
			setTimeout(function(){piece.position.z += .0098}, .1)
	}
	else
	{
		piece.position.set(0, 0, 0);
		destSquare = 0;
		endresult = endresult%40;
	}
	players[piece.id].playerPosition = destSquare;
	updateLockedCamera();
	console.log(destSquare%40);
	console.log('endresult' + endresult);
	animove(piece, destSquare%40, endresult);
}

/* Used for the initial syncing, this moves pieces without updating anything about the
   game itself.
*/
function justMove(piece)
{
    var id = piece.id;
	var destSquare = players[id].playerPosition;
	var scale = piece.scale.x;
	var invscale = 1/scale;
    var geometry = getRealPiece(id);
    var subt = 97;
    var offset = 0;
    var xoffset = 0;
    var offSide = 500;
    var sidePush = 390;
	var jaily = 0;
	
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
}

function dance (piece)
{
		setTimeout(function(){piece.position.x += 10;}, 0);
		setTimeout(function(){piece.position.y += 40;}, 0);
		setTimeout(function(){piece.position.x -= 10;}, 100);
		setTimeout(function(){piece.position.y -= 40;}, 100);
		
		setTimeout(function(){piece.position.x -= 10;}, 200);
		setTimeout(function(){piece.position.y += 40;}, 200);
		setTimeout(function(){piece.position.x += 10;}, 300);
		setTimeout(function(){piece.position.y -= 40;}, 300);
		
		setTimeout(function(){piece.position.z += 10;}, 400);
		setTimeout(function(){piece.position.y += 40;}, 400);
		setTimeout(function(){piece.position.z -= 10;}, 500);
		setTimeout(function(){piece.position.y -= 40;}, 500);
		
		setTimeout(function(){piece.position.z -= 10;}, 600);
		setTimeout(function(){piece.position.y += 40;}, 600);
		setTimeout(function(){piece.position.z += 10;}, 700);
		setTimeout(function(){piece.position.y -= 40;}, 700);
}