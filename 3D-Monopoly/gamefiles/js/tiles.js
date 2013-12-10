/* Author: Philip Donlon
   Deals with the tiles and activation logic. */


var lookUps = [-1, 0, -2, 1, -4, 22, 2, -3, 3, 4, -1, 5, 26, 6, 7, 23, 8, -2, 9, 10, -1, 11, -3, 12, 13, 24, 14, 15, 27, 16, -6, 17, 18, -2, 19, 25, -3, 20, -5, 21];


function createTile(x)
{
    var tile = {};
    
    if(lookUps[x] == -2)//comunity chest
        tile.activate = communityChest;
    
    else if(lookUps[x] == -3) //chance
        tile.activate = chance;
    
    else if(lookUps[x] == -4) //income tax
        tile.activate = incomeTax;
    
    else if(lookUps[x] == -5) //luxury tax
            tile.activate = luxuryTax;
    
    else if(lookUps[x] == -6) //go to jail
            tile.activate = goToJail;
    
    else
        tile.activate = getProperty;
    
    tile.index = x;
    return tile;

}

function getProperty()
{
    return createDeed(lookUps[this.index]);
    
}

function communityChest()
{
    //drawCard("comchest");
    updateDisplay();

    return "Call comunity chest function";
}

function chance()
{
    //drawCard("chance"); //not working right, cloning piece
    updateDisplay();

    return "Call chance function";
    
}

function incomeTax()
{
    if(players[currentPlayer].money >= 2000)
    players[currentPlayer].money = players[currentPlayer].money - 200;
    else{
        players[currentPlayer].money = players[currentPlayer].money -
        Math.round(players[currentPlayer].money*.1);
    }
    
    console.log(players[currentPlayer].money);
    updateDisplay();
    
    return "Call imcome tax function";
}

function luxuryTax()
{
    players[currentPlayer].money = players[currentPlayer].money - 75;
    updateDisplay();

    return "Call luxury tax function";
}

function goToJail()
{
    getJailed();
    
    return "Call go-to-jail function";
    
}




