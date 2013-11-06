var lookUps = [-1, 0, -1, 1, -1, 22, 2, -1, 3, 4, -1, 5, 26, 6, 7, 23, 8, -1, 9, 10, -1, 11, -1, 12, 13, 24, 14, 15, 27, 16, -1, 17, 18, -1, 19, 25, -1, 20, -1, 21];

function createTile(x)
{
    var tile = {};
    
    tile.activate = getProperty;
    tile.index = x;
    
    return tile;
}

function getProperty()
{
    return createDeed(lookUps[this.index]);
    
}


