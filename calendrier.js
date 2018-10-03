
function showPen(e) {
  document.getElementById(e).style.visibility="visible";
}
function hidePen(e) {
  document.getElementById(e).style.visibility="hidden";
}
function clickedCheck(e) {
	console.log(document.getElementById(e).src);
	if (document.getElementById(e).src == "./Images/check.png") {
        document.getElementById(e).src = "./Images/tick-check.png";
    }
    else{
        document.getElementById(e).src = "./Images/check.png";
    }
    
}
fetch("http://127.0.0.1:8080/cal-data.json")
  .then(function(response) { return response.json(); })
  .then(function(data) {
	  
	  var participants = data["Participants"];

	  for(var i = 1; i < participants.length; i++)
		  {
		  var Participantrow = document.createElement('div');
		  Participantrow.setAttribute("class", "ParticipantRow");
		  
		  var firstBox = document.createElement('div');
		  firstBox.setAttribute("onmouseover" ,"showPen('pen"+i+"')");
		  firstBox.setAttribute("onmouseout" ,"hidePen('pen"+i+"')");
		  firstBox.setAttribute("class", "firstBox");
		  Participantrow.appendChild(firstBox);
		  
		  var participantimg = document.createElement('img');
		  participantimg.setAttribute("src","./Images/particip2.png");
		  firstBox.appendChild(participantimg);
		  
		  var t = document.createTextNode(data["Participants"][i]["Nom"]);
		  firstBox.appendChild(t);
		  
		  var penimg = document.createElement('img');
		  penimg.setAttribute("class", "pen");
		  penimg.setAttribute("id", "pen"+i);
		  penimg.setAttribute("onClick", "fsuyf('participant"+i+"')");
		  penimg.setAttribute("src","./Images/pen.png");
		  firstBox.appendChild(penimg);
		  
		  document.getElementById("1234").appendChild(Participantrow);
		  
		  var disp = data["Participants"][i]["Disponibilités"];
		  
		  for(var j = 0; j<disp.length; j++)
			  {
			  var choicebox = document.createElement('div');
			  choicebox.setAttribute("class", "choiceBox");
			  var tickImage = document.createElement('img');
			  tickImage.setAttribute("class", "tickImage");
			  tickImage.setAttribute("src", "./Images/tick1.png");

			  if(disp[j] == 1)
				  {
				  var tickImage = document.createElement('img');
				  tickImage.setAttribute("class", "tickImage");
				  tickImage.setAttribute("src", "./Images/tick1.png");
				  choicebox.appendChild(tickImage);
				  } 
			  Participantrow.appendChild(choicebox);
		  
			  }
		  }

  });

function myFunction() {
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("CLICK ME");
    btn.appendChild(t);
    document.getElementById("1234").appendChild(btn);
}