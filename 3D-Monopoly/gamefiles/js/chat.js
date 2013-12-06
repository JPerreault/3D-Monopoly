function initChat()
{
    $(document).on("keypress", "#message", function(e) {
               if (e.which == 13) {
                   chatMessage(document.getElementById("message").value, username);
                   postMessage(document.getElementById("message").value);
                   document.getElementById("message").value = "";
               }
               });
}

function chatMessage(string, sender)
{
    if (string == "/dance")
    {
        string = "&nbsp;&nbsp;<i><font color=D3D3D3>"+sender+" did a little dance!</font></i>";
        for (var x=0; x<players.length; x++)
            if (players[x].username == sender)
                dance(players[x].piece);
    }
    else if (sender == username)
        string = "&nbsp;&nbsp;<b><font color=pink>"+sender+":</font></b> "+string;
    else if (sender!= null && sender!="null")
        string = "&nbsp;&nbsp;<b><font color=yellow>"+sender+":</font></b> "+string;
    else
        string = "&nbsp;&nbsp;<i><font color=D3D3D3>"+string+"</font></i>";
    
    document.getElementById("chatbox").innerHTML += "<br>"+string;
    
    var chatboxobj = document.getElementById("chatbox");
    chatboxobj.scrollTop = chatboxobj.scrollHeight;
}