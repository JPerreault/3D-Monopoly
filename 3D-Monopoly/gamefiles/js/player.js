var Player = function(playerPosition, piece, money)
{
    this.playerPosition = playerPosition;
    this.piece = piece;
	this.money = money;
    this.properties = [];
    
    this.addPropertyIndex = addPropertyIndex;
}

function addPropertyIndex(property)
{
    // need to check if property is currently owned by another player
    this.properties.push(property);
}

