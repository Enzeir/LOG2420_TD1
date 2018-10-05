

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


function createDates(datesList)
{
	
}



function createParticipants(listParticipants)
{
	  for(var i = 0; i < listParticipants.length; i++)
	  {
		  if(listParticipants[i]["Statut"] != "EnCours")
		  {
			  createCompletedParticipant(i, listParticipants);
		  }
		  else
		  {
			  createNewParticipant(i, listParticipants);
		  
		  }
	  }
}

//Creates the row of a participant that has confirmed its schedule
function createCompletedParticipant(i, listParticipants)
{
	  var Participantrow = document.createElement('div');
	  Participantrow.setAttribute("class", "ParticipantRow");
	  
	  var participantFirstBox = createParticipantFirstBox(i);
	  Participantrow.appendChild(participantFirstBox);
	  
	  var participantimg = document.createElement('img');
	  participantimg.setAttribute("src","./Images/particip2.png");
	  participantFirstBox.appendChild(participantimg);
	  
	  var t = document.createTextNode(listParticipants[i]["Nom"]);
	  participantFirstBox.appendChild(t);
	  
	  var participantPenImg = createParticipantPenImg(i);
	  participantFirstBox.appendChild(participantPenImg);
	  
	  document.getElementById("1234").appendChild(Participantrow);
	  
	  var disp = listParticipants[i]["Disponibilités"];
	  
	  for(var j = 0; j<disp.length; j++)
	  {
		  var choicebox = createParticipantChoiceBox();
	
		  if(disp[j] == 1)
		  {
			  var tickImage = createParticipantTickImage();
			  choicebox.appendChild(tickImage);
		  } 
		  Participantrow.appendChild(choicebox);
	  }
}

function createParticipantPenImg(i)
{
	var penImg = document.createElement('img');
	penImg.setAttribute("class", "pen");
	penImg.setAttribute("id", "pen"+i);
	penImg.setAttribute("onClick", "fsuyf('participant"+i+"')");
	penImg.setAttribute("src","./Images/pen.png");
	
	return penImg;
}

function createParticipantFirstBox(i)
{
	var participantFirstBox = document.createElement('div');
	participantFirstBox.setAttribute("onmouseover" ,"showPen('pen"+i+"')");
	participantFirstBox.setAttribute("onmouseout" ,"hidePen('pen"+i+"')");
	participantFirstBox.setAttribute("class", "firstBox");
	  
	return participantFirstBox;
}

function createParticipantChoiceBox()
{
	var choicebox = document.createElement('div');
	choicebox.setAttribute("class", "choiceBox");
	
	return choicebox;
}

function createParticipantTickImage()
{
	  var tickImage = document.createElement('img');
	  tickImage.setAttribute("class", "tickImage");
	  tickImage.setAttribute("src", "./Images/tick1.png");
	  
	  return tickImage;
}


//create a row for a participant that has not confirmed his schedule
function createNewParticipant(i, listParticipants)
{
	var newParticipantRow = document.createElement('div');
  	newParticipantRow.setAttribute("class", "newParticipantRow");

  	
  	var newParticipantFirstBox = createNewParticipantFirstBox()
  	newParticipantRow.appendChild(newParticipantFirstBox);
  	
  	var newParticipantImg = createNewParticipantImg();
  	newParticipantFirstBox.appendChild(newParticipantImg);
  	
  	var newParticipantName = listParticipants[i]["Nom"];
	
  	var newParticipantInput  = createNewParticipantNameInput(newParticipantName);
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

function createNewParticipantFirstBox()
{
  	var newParticipantFirstBox = document.createElement('div');
  	newParticipantFirstBox.setAttribute("class", "firstBox");
  	
  	return newParticipantFirstBox;
}

function createNewParticipantImg()
{
	  var participantimg = document.createElement('img');
	  participantimg.setAttribute("src","./Images/particip1.png");
	  
	  return participantimg;
}

function createNewParticipantNameInput(newParticipantName)
{
  	var newParticipantNameInput = document.createElement('input');
  	newParticipantNameInput.setAttribute("type", "text");
  	newParticipantNameInput.setAttribute("value", newParticipantName);
  	
  	return newParticipantNameInput;
}

