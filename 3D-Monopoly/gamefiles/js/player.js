var Player = function(playerPosition, piece, money)
{
    this.playerPosition = playerPosition;
    this.piece = piece;
	this.money = money;
    this.properties = [];
	this.jailed = false;
	this.doublesRolled = 0;
    
    this.addPropertyIndex = addPropertyIndex;
    
    //These should only be Get Out Of Jail Free Cards
    this.cardsHeld = [];
}

function addPropertyIndex(property)
{
    if (isNaN(property))
        return;
    // need to check if property is currently owned by another player
    this.properties.push(property);
    
    // for debug controls
    populateListing();
}

