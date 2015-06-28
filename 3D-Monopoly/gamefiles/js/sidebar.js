/* Author: Ricky Ayoub
   Controls the money sidebar. */

var moneys = 703; // placeholder, will be dynamically loaded from current player's money value.

// This function gets the moneys in the smallest amount of bills possible
function getBills(moneys)
{
    var cur_cash = moneys;    
    var cash_array = [0, 0, 0, 0, 0, 0];
    var money_types = [500, 100, 50, 10, 5, 1];

    
    while (cur_cash > 0)
    {
        for (var x=0; x<money_types.length; x++)
        {
            if (cur_cash >= money_types[x])
            {
                cur_cash -= money_types[x];
                cash_array[x]++;
                x--;
            }
        }
    }
    
    return cash_array;
}

/*
 This function updates the display of the cards
 */
function expandMoneys(moneys)
{
    var cashbox = document.getElementById("cash");
    var money_output = "";
    
    var linebreaks = "<br><br><br><br>";
    
    var cash_array = getBills(moneys);
    cash_array.reverse();
    
    var money_types = [1, 5, 10, 50, 100, 500];

    
    for (var x=0; x<cash_array.length; x++)
    {
        var bills_output = "";
        
        for (var y=0; y<cash_array[x]; y++)
        {
            bills_output += "<img class='money' src='img/money/monopoly_money_"+ money_types[x] +".jpg' style='margin-left: -"+ (y*10) + "px' />";
        }
        
        if (cash_array[x] != 0)
        {
            money_output += "<div class='bill_box' style='left: "+10*(cash_array[x]-1)+"px'>"+ bills_output +"</div>"+linebreaks;
        }
    }
    
    money_output = money_output.substring(0, money_output.length - linebreaks.length)
    cashbox.innerHTML = money_output;
}