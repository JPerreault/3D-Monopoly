var lookUps = [-1, 0, -2, 1, -4, 22, 2, -3, 3, 4, -1, 5, 26, 6, 7, 23, 8, -2, 9, 10, -1, 11, -3, 12, 13, 24, 14, 15, 27, 16, -1, 17, 18, -2, 19, 25, -3, 20, -4, 21];

function createTile(x)
{
    var tile = {};
    
    if(lookUps[x] == -2)//comunity chest
        tile.activate = communityChest;
    
    else if(lookUps[x] == -3) //chance
        tile.activate = chance;
    
    else if(lookUps[x] == -4) //income tax
       tile.activate = incomeTax
    
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
    return "Call comunity chest function";
}

function chance()
{
    return "Call chance function";
    
}

function incomeTax()
{
    return "Call imcome tax function";
}