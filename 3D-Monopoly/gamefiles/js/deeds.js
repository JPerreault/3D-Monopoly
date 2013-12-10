/* Author: Richard Ayoub
   Creates and controls how the property display works, and provides the fields for each property. */

var deeds = [["Mediterranean Avenue","#700000",60,30,2,10,30,90,160,250,50,50],["Baltic Avenue","#700000",60,30,4,20,60,180,320,450,50,50],["Oriental Avenue","#33CCFF",100,50,6,30,90,270,400,550,50,50],["Vermont Avenue","#33CCFF",100,50,6,30,90,270,400,550,50,50],["Connecticut Avenue","#33CCFF",120,60,8,40,100,300,450,600,50,50],["St. Charles Place","Pink",140,70,10,50,150,450,625,750,100,100],["States Avenue","Pink",140,70,10,50,150,450,625,750,100,100],["Virginia Avenue","Pink",160,80,12,60,180,500,700,900,100,100],["St. James Place","Orange",180,90,14,70,200,550,750,950,100,100],["Tennessee Avenue","Orange",180,90,14,70,200,550,750,950,100,100],["New York Avenue","Orange",200,100,16,80,220,600,800,1000,100,100],["Kentucky Avenue","Red",220,110,18,90,250,700,875,1050,150,150],["Indiana Avenue","Red",220,110,18,90,250,700,875,1050,150,150],["Illinois Avenue","Red",240,120,20,100,300,750,925,1100,150,150],["Atlantic Avenue","Yellow",260,130,22,110,330,800,975,1150,150,150],["Ventnor Avenue","Yellow",260,130,22,110,330,800,975,1150,150,150],["Marvin Gardens","Yellow",280,140,24,120,360,850,1025,1200,150,150],["Pacific Avenue","Green",300,150,26,130,390,900,1100,1275,200,200],["North Carolina Avenue","Green",300,150,26,130,390,900,1100,1275,200,200],["Pennsylvania Avenue","Green",320,160,28,150,450,1000,1200,1400,200,200],["Park Place","#000099",350,175,35,175,500,1100,1300,1500,200,200],["Boardwalk","#000099",400,200,50,200,600,1400,1700,2000,200,200],["Reading Railroad","Railroad",200,100,25],["Pennsylvania Railroad","Railroad",200,100,25],["B. & O. Railroad","Railroad",200,100,25],["Short Line","Railroad",200,100,25],["Electric Company","Utility",150,75,0],["Water Works","Utility",150,75,0]]

/*
 This function is used as a sort of API to easily access the big ole jumbled mess up there.
 */
function createDeed(deed_value)
{
    if (deed_value == -1)
        return deed_value;
    
    var loaded = deeds[deed_value];
    var deed = {};
    
    deed.title = loaded[0];
    deed.color = loaded[1];
    deed.cost = loaded[2];
    deed.mortgage = loaded[3];
    deed.rent = loaded[4];
    deed.house1 = loaded[5];
    deed.house2 = loaded[6];
    deed.house3 = loaded[7];
    deed.house4 = loaded[8];
    deed.hotel = loaded[9];
    deed.buy_house = loaded[10];
    deed.buy_hotel = loaded[11];
    
    deed.index = deed_value;
    
    deed.getInfo = getInfo;
    deed.getPrettyDeed = getPrettyDeed;
    
    return deed;
}

/*
 And this uses the above function to return a pretty string for debug purposes.
 */
function getInfo()
{
    var output = "";
    
    output += "Title: "+ this.title;
    output += "\nColor: "+ this.color;
    output += "\nCost: "+ this.cost;
    output += "\nMortgage: "+ this.mortgage;
    output += "\nRent: "+ this.rent;
    output += "\nWith 1 House: "+ this.house1;
    output += "\nWith 2 Houses: "+ this.house2;
    output += "\nWith 3 Houses: "+ this.house3;
    output += "\nWith 4 Houses: "+ this.house4;
    output += "\nWith Hotel: "+ this.hotel;
    output += "\nHouse Price: "+ this.buy_house;
    output += "\nHotel Price: "+ this.buy_hotel;
    
    return output;
}

/*
 This does a similar thing to getInfo(), but this time formats the HTML for displaying
 in the bottom right hand corner in the card stack.
 */
function getPrettyDeed()
{
    var output = "<div class='deed'>";

    if (this.index <= 21)
    {
        output += "<div class='inner_deed' style='background-color: "+this.color+"'><span class='titleHead'>TITLE DEED</span><br /><b>"+this.title.toUpperCase().replace("AVENUE", "AVE")+"</b></div>";
        
        output += "<div class='outer_deed'>RENT $"+this.rent+"<br /><table class='deed_tab' cellpadding='0' border='0' align='center' cellspacing='0'><tr><td>";
        
        output += "With 1 House</td><td>$"+this.house1+"</td></tr><tr><td>";
        output += "With 2 Houses</td><td>$"+this.house2+"</td></tr><tr><td>";
        output += "With 3 Houses</td><td>$"+this.house3+"</td></tr><tr><td>";
        output += "With 4 Houses</td><td>$"+this.house4+"</td></tr></table>";
        
        output += "With HOTEL $"+this.hotel+"<br />";
        
        output += "Mortgage Value $"+this.mortgage+"<br />";
        output += "Houses cost $"+this.buy_house+" each<br />";
        output += "Hotels, $"+this.buy_hotel+" plus 4 houses<br />";
    }
    
    else if (this.index <= 25)
    {
        output+= "<div class='outer_deed'><img src='img/train.gif' height=50 /><br />";
        var title = this.title.toUpperCase();
        
        if (title.length > 17)
            title = title.replace("RAILROAD", "R.R.");
        output += "<div class='inner_deed'><b>"+title+"</b></div><table class='deed_tab' cellpadding='0' border='0' align='center' cellspacing='0' style='margin-top: -20px'><tr><td>";
        
        output += "With 1 Railroad</td><td>$"+(this.rent*1)+"</td></tr><tr><td>";
        output += "With 2 Railroads</td><td>$"+(this.rent*2)+"</td></tr><tr><td>";
        output += "With 3 Railroads</td><td>$"+(this.rent*4)+"</td></tr><tr><td>";
        output += "With 4 Railroads</td><td>$"+(this.rent*8)+"</td></tr></table>";
        
        output += "Mortgage Value $"+this.mortgage+"<br />";

    }
    else
    {
        var image;
        if (this.index == 26)
            image = "img/electric.gif";
        else
            image = "img/water.gif";
        
        output+= "<div class='outer_deed'><img src='"+image+"' height=50 /><br />";
        
        output += "<div class='inner_deed'><b>"+this.title.toUpperCase()+"</b><br /></div>";
        
        output += "<table class='deed_tab' cellpadding='0' border='0' align='center' style='margin-top: -20px; padding-right: 20px'><tr><td>"
        
        output += "&nbsp;&nbsp;&nbsp;&nbsp;If one \"Utility\" is owned rent is 4x dice roll.</td></tr><tr><td>&nbsp;&nbsp;&nbsp;&nbsp;If both \"Utilities\" are owned rent is 10x dice roll.</td></tr></table>";
        
        output += "Mortgage Value $"+this.mortgage+"<br />";
        
    }

    output += "</div></div>";
    
    return output;
}

function sortNumber(a,b) {
    return a - b;
}

/*
    Updates the stack of title deed cards in the bottom right corner.
 */
function updateDeedCards(deed_list)
{
    var output = "";
    var lastColor = "-1";
    var lastCount = 15;
    
    deed_list.sort(sortNumber);

    for (var x=deed_list.length-1; x>=0; x--)
    {
        var d1 = createDeed(deed_list[x]);
        
        var pushMe = "";
        
        if (lastColor == d1.color)
        {
            pushMe = " style='margin-left: -"+lastCount+"px'";
            lastCount += 15;
        }
        else if (lastColor != "-1")
        {
            output += "<br /><br /><br />";
            lastCount = 15;
        }
    
        output += "<div"+pushMe+">" + d1.getPrettyDeed() + "</div>";
        
        lastColor = d1.color;
    }
    
    document.getElementById('land_box').innerHTML = output;
    $(".deed").hover(bringToFront, undoBringToFront);
    $(".deed").mousedown(undoBringToFront);
}

function populateBuild()
{
    var select = document.getElementById('deedValueThing');
    var output = "<option>-- select property --</option>";
    
    for (var x=0; x<deeds.length; x++)
    {
        if (selfMonopoly(deeds[x][1]))
            output += "<option value="+x+">"+x+" "+deeds[x][0]+"</option>";
    }
    
    select.innerHTML = output;
}

/*
 These next two functions populate the property selecting dropdowns
 */
function populateListing()
{
    var select = document.getElementById('deedValue');
    
    var output = "<option>-- select property --</option>";
    
    for (var x=0; x<deeds.length; x++)
    {
        var alreadyOwned = false;

        for(var i=0; i<players.length; i++)
        {
            for(var y=0; y<players[i].properties.length; y++)
            {
                if(players[i].properties[y] == x)
                {
                    alreadyOwned = true;
                }
            }
        }
        
        if (!alreadyOwned)
            output += "<option value="+x+">"+x+" "+deeds[x][0]+"</option>";
    }
    
    select.innerHTML = output;
    
    if (output == "<option>-- select property --</option>")
    {
        select.innerHTML = "<option>no more properties</option>";
        //select.disabled = true;
    }
}

function bringToFront()
{
    $(".deed").css({'z-index' : '10'});
    this.style.zIndex = 100000;
}

function undoBringToFront()
{
    this.style.zIndex = 10;
}