

fetch("http://127.0.0.1:8080/cal-data.json")
  .then(function(response) { return response.json(); })
  .then(function(data) {

	  var listParticipant = data["Participants"];
	  var listDate = data["Calendrier"];
	  
	  createDates(listDate);
	  createParticipants(listParticipant);
	  

  });

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

function myFunction() {
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("CLICK ME");
    btn.appendChild(t);
    document.getElementById("1234").appendChild(btn);
}


function createDates(datesList)
{
	
}



function createParticipants(listParticipants)
{
	  for(var i = 0; i < listParticipants.length; i++)
	  {
		  if(listParticipants[i]["Statut"] != "EnCours")
		  {
			  var Participantrow = document.createElement('div');
			  Participantrow.setAttribute("class", "ParticipantRow");
			  
			  var firstParticipantBox = document.createElement('div');
			  firstParticipantBox.setAttribute("onmouseover" ,"showPen('pen"+i+"')");
			  firstParticipantBox.setAttribute("onmouseout" ,"hidePen('pen"+i+"')");
			  firstParticipantBox.setAttribute("class", "firstBox");
			  Participantrow.appendChild(firstParticipantBox);
			  
			  var participantimg = document.createElement('img');
			  participantimg.setAttribute("src","./Images/particip2.png");
			  firstParticipantBox.appendChild(participantimg);
			  
			  var t = document.createTextNode(listParticipants[i]["Nom"]);
			  firstParticipantBox.appendChild(t);
			  
			  var penimg = document.createElement('img');
			  penimg.setAttribute("class", "pen");
			  penimg.setAttribute("id", "pen"+i);
			  penimg.setAttribute("onClick", "fsuyf('participant"+i+"')");
			  penimg.setAttribute("src","./Images/pen.png");
			  firstParticipantBox.appendChild(penimg);
			  
			  document.getElementById("1234").appendChild(Participantrow);
			  
			  var disp = listParticipants[i]["Disponibilités"];
			  
			  for(var j = 0; j<disp.length; j++)
			  {
				  var choicebox = document.createElement('div');
				  choicebox.setAttribute("class", "choiceBox");
		
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
		  else
		  {
		  	var newParticipantRow = document.createElement('div');
		  	newParticipantRow.setAttribute("class", "newParticipantRow");

		  	
		  	var newParticipantFirstBox = document.createElement('div');
		  	newParticipantFirstBox.setAttribute("class", "firstBox");
		  	newParticipantRow.appendChild(newParticipantFirstBox);
		  	
		  	var newParticipantImg = document.createElement('img');
		  	newParticipantImg.setAttribute("src", "./Images/particip1.png");
		  	newParticipantFirstBox.appendChild(newParticipantImg);
		  	
		  	var newParticipantName = document.createTextNode(listParticipants[i]["nom"]);
		  	newParticipantFirstBox.appendChild(newParticipantName);

		  	
		  	
		  	var newParticipantInput = document.createElement('input');
		  	newParticipantInput.setAttribute("type", "text");
		  	newParticipantInput.setAttribute("value", newParticipantName);
		  	newParticipantFirstBox.appendChild(newParticipantInput);
		  	
		  	document.getElementById("1234").appendChild(newParticipantRow);
		  	
		  	var disp = listParticipants[i]["Disponibilités"];
		  	
		  	for(var j = 0; j < disp.length; j++)
	  		{
		  		var checkboxClass = document.createElement('div');
		  		checkboxClass.setAttribute("class", "checkBox");
		  		
		  		var checkboxInput = document.createElement('input');
		  		checkboxInput.setAttribute("type", "checkbox");
		  		
		  		if(disp[j] == 1)
		  			{
		  			checkboxInput.setAttribute("checked", true);
		  			}
		  		checkboxClass.appendChild(checkboxInput);
		  		
		  		newParticipantRow.appendChild(checkboxClass);
	  		}
		  
		  }
	  }
}


