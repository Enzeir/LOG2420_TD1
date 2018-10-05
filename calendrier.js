

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



function createDates(listDate)
{
	
	var weekDays = ["LUN.","MAR.", "MER.", "JEU.", "VEN.", "SAM.", "DIM."];
	var month = ["janvier","fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
	
	var dateRow = document.createElement('div');
	dateRow.setAttribute("class", "dateRow");
	
	var dateFirstBox = document.createElement('div');
	dateFirstBox.setAttribute("class", "firstBox");
	dateRow.appendChild(dateFirstBox);
	
	for(var i = 0; i<listDate.length; i++)
	{
		var dateBox = document.createElement('div');
		dateBox.setAttribute("class", "dateBox");
		dateBox.setAttribute("id", "dateBox"+i);
		dateRow.appendChild(dateBox);
		
		var date = new Date(listDate[i][0]);
		
		//document.getElementById("dateBox"+i).innerHTML = month[date.getMonth()]+"<br><p>"+date.getDate()+"</p>"+ weekDays[date.getDay()]+"<br>"+date.getHours()+":"+ date.getMinutes()+"<br>";
		
		

		
		
		
		/*date.setMinutes(date.getMinutes()+ listDate[i][1]);
		document.
		*/

		
		
	}
	document.getElementById("1234").appendChild(dateRow);

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
	  var Participantrow = createParticipantRow(i, listParticipants);
	  
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

function createParticipantRow(i, listParticipants)
{
	  var Participantrow = document.createElement('div');
	  Participantrow.setAttribute("class", "ParticipantRow");
	  
	  var participantFirstBox = createParticipantFirstBox(i);
	  Participantrow.appendChild(participantFirstBox);
	  
	  var participantImg = document.createElement('img');
	  participantImg.setAttribute("src","./Images/particip2.png");
	  participantFirstBox.appendChild(participantImg);
	  
	  var t = document.createTextNode(listParticipants[i]["Nom"]);
	  participantFirstBox.appendChild(t);
	  
	  var participantPenImg = createParticipantPenImg(i);
	  participantFirstBox.appendChild(participantPenImg);
	  
	  return Participantrow;
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
	var newParticipantRow = createNewParticipantRow(i, listParticipants);
	
  	document.getElementById("1234").appendChild(newParticipantRow);
  	
  	var disp = listParticipants[i]["Disponibilités"];
  	
  	for(var j = 0; j < disp.length; j++)
	{
  		var checkboxClass = createNewParticipantCheckbox(j, disp)
  				
		newParticipantRow.appendChild(checkboxClass);
	}
}

function createNewParticipantRow(i, listParticipants)
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

  	return newParticipantRow;
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

function createNewParticipantCheckbox(j, disp)
{
	var checkboxClass = document.createElement('div');
	checkboxClass.setAttribute("class", "checkBox");
	
	var checkboxInput = document.createElement('input');
	checkboxInput.setAttribute("type", "checkbox");
	checkboxInput.setAttribute("id", "checkbox"+j);
	
	if(disp[j] == 1)
	{
		checkboxInput.setAttribute("checked", true);
	}
	
	checkboxClass.appendChild(checkboxInput);
	
	return checkboxClass;
}

