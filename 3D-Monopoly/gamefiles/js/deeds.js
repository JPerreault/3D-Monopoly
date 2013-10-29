var deeds = [["Mediterranean Avenue","#700000",60,30,2,10,30,90,160,250,50,50],["Baltic Avenue","#700000",60,30,4,20,60,180,320,450,50,50],["Oriental Avenue","#33CCFF",100,50,6,30,90,270,400,550,50,50],["Vermont Avenue","#33CCFF",100,50,6,30,90,270,400,550,50,50],["Connecticut Avenue","#33CCFF",120,60,8,40,100,300,450,600,50,50],["St. Charles Place","Pink",140,70,10,50,150,450,625,750,100,100],["States Avenue","Pink",140,70,10,50,150,450,625,750,100,100],["Virginia Avenue","Pink",160,80,12,60,180,500,700,900,100,100],["St. James Place","Orange",180,90,14,70,200,550,750,950,100,100],["Tennessee Avenue","Orange",180,90,14,70,200,550,750,950,100,100],["New York Avenue","Orange",200,100,16,80,220,600,800,1000,100,100],["Kentucky Avenue","Red",220,110,18,90,250,700,875,1050,150,150],["Indiana Avenue","Red",220,110,18,90,250,700,875,1050,150,150],["Illinois Avenue","Red",240,120,20,100,300,750,925,1100,150,150],["Atlantic Avenue","Yellow",260,130,22,110,330,800,975,1150,150,150],["Ventnor Avenue","Yellow",260,130,22,110,330,800,975,1150,150,150],["Marvin Gardens","Yellow",280,140,24,120,360,850,1025,1200,150,150],["Pacific Avenue","Green",300,150,26,130,390,900,1100,1275,200,200],["North Carolina Avenue","Green",300,150,26,130,390,900,1100,1275,200,200],["Pennsylvania Avenue","Green",320,160,28,150,450,1000,1200,1400,200,200],["Park Place","#000099",350,175,35,175,500,1100,1300,1500,200,200],["Boardwalk","#000099",400,200,50,200,600,1400,1700,2000,200,200],["Reading Railroad","Railroad",200,100,25],["Pennsylvania Railroad","Railroad",200,100,25],["B. & O. Railroad","Railroad",200,100,25],["Short Line","Railroad",200,100,25],["Electric Company","Utility",150,75,0],["Water Works","Utility",150,75,0]]

function createDeed(deed_value)
{
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
    
    deed.getInfo = getInfo;
    deed.getPrettyDeed = getPrettyDeed;
    
    return deed;
}

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

function getPrettyDeed()
{
    var output = "<div class='deed'><div class='inner_deed' style='background-color: "+this.color+"'><span class='titleHead'>TITLE DEED</span><br /><b>"+this.title.toUpperCase().replace("AVENUE", "AVE")+"</b></div>";
    
    output += "<div class='outer_deed'>RENT $"+this.rent+"<br /><table class='deed_tab' cellpadding='0' border='0' align='center' cellspacing='0'><tr><td>";
    
    output += "With 1 House</td><td>$"+this.house1+"</td></tr><tr><td>";
    output += "With 2 Houses</td><td>$"+this.house2+"</td></tr><tr><td>";
    output += "With 3 Houses</td><td>$"+this.house3+"</td></tr><tr><td>";
    output += "With 4 Houses</td><td>$"+this.house4+"</td></tr></table>";
    
    output += "With HOTEL $"+this.hotel+"<br />";
    
    output += "Mortgage Value $"+this.mortgage+"<br />";
    output += "Houses cost $"+this.buy_house+" each<br />";
    output += "Hotels, $"+this.buy_hotel+" plus 4 houses<br />";

    output += "</div></div>";
    
    return output;
}

function sortNumber(a,b) {
    return a - b;
}

function updateDeedCards(deed_list)
{
    var output = "";
    var lastColor = "-1";
    var lastCount = 15;
    
    deed_list.sort(sortNumber);

    for (var x=0; x<deed_list.length; x++)
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
}

function populateListing()
{
    var select = document.getElementById('deedValue');
    
    var output = "<option>-- select property --</option>";
    
    for (var x=0; x<deeds.length; x++)
        output += "<option value="+x+">"+deeds[x][0]+"</option>";
    
    select.innerHTML = output;
}