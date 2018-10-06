
var listParticipant;
var listDate ;
	  
fetch("http://127.0.0.1:8080/cal-data.json")
  .then(function(response) { return response.json(); })
  .then(function(data) {

	  listParticipant = data["Participants"];
	  listDate = data["Calendrier"];
	  
	  createDates(listDate);
	  createConfirmedParticipant(listParticipant);
	  createParticipants(listParticipant); 
  });

function showPen(e) {
  document.getElementById(e).style.visibility="visible";
}
function hidePen(e) {
  document.getElementById(e).style.visibility="hidden";
}


//Creates a row of dates from the Json file 
function createDates(listDate)
{
	
	var weekDays = [ "DIM.","LUN.","MAR.", "MER.", "JEU.", "VEN.", "SAM."];
	var month = ["janvier","fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
	
	var dateRow = document.createElement('div');
	dateRow.setAttribute("class", "dateRow");
	
	var dateFirstBox = document.createElement('div');
	dateFirstBox.setAttribute("class", "firstBox");
	dateRow.appendChild(dateFirstBox);
	document.getElementById("1234").appendChild(dateRow);

	for(var i = 0; i<listDate.length; i++)
	{
		var dateBox = document.createElement('div');
		dateBox.setAttribute("class", "dateBox");
		dateBox.setAttribute("id", "dateBox"+i);
		dateRow.appendChild(dateBox);
		
		var date = new Date(listDate[i][0]);
		var timeStart = date.getHours();
		var minutesStart;
		if (date.getMinutes() < 10)
			minutesStart = "0"+date.getMinutes();
		else
			minutesStart = date.getMinutes();
			
			date.setMinutes(date.getMinutes()+ listDate[i][1]);
		var minutesEnd;
		if (date.getMinutes() < 10)
			minutesEnd = "0"+date.getMinutes();
		else
			minutesEnd = date.getMinutes();
			
		document.getElementById("dateBox"+i).innerHTML = month[date.getMonth()]+"<br><p>"+date.getDate()+"</p>"+ weekDays[date.getDay()]+"<br>"+timeStart+":"+minutesStart+"<br>"+date.getHours()+":"+minutesEnd;
		

	}

}

//Creates a row that verifies the amount of confirmed Participants each day.
function createConfirmedParticipant(listParticipant)
{
	var confirmedParticipantRow = document.createElement('div');
	confirmedParticipantRow.setAttribute("class", "confirmedParticipantRow")
	
	var confirmedParticipantFirstBox = document.createElement('div');
	confirmedParticipantFirstBox.setAttribute("class", "firstBox");
	
	var numberCompletedParticipant = 0;
	for (var i = 0; i < listParticipant.length; i++)
	{
		if (listParticipant[i]["Statut"] != "EnCours")
		{
			numberCompletedParticipant++;
		}
	}
	
	var confirmedParticipantFirstBoxText = document.createTextNode(numberCompletedParticipant+"Participants");
	confirmedParticipantFirstBox.appendChild(confirmedParticipantFirstBoxText);
	
	confirmedParticipantRow.appendChild(confirmedParticipantFirstBox);
	
	document.getElementById("1234").appendChild(confirmedParticipantRow);
	
	for (var i = 0; i < listParticipant[0]["Disponibilités"].length; i++)
	{
		console.log(listParticipant[0]["Disponibilités"].length);
		var confirmedParticipantBox = document.createElement('div');
		confirmedParticipantBox.setAttribute("class", "confirmedBox");
		
		var confirmedParticipantTickImg = document.createElement('img');
		confirmedParticipantTickImg.setAttribute("src", "/Images/tick2.png");
		
		confirmedParticipantBox.appendChild(confirmedParticipantTickImg);
		
		var confirmedParticipantDate = 0;
		for (var j = 0; j < listParticipant.length; j++)
		{
			if (listParticipant[j]["Disponibilités"][i])
			{
				confirmedParticipantDate++;
			}
		}
		var confirmedParticipantNumberText = document.createTextNode(confirmedParticipantDate);
		confirmedParticipantBox.appendChild(confirmedParticipantNumberText);
		confirmedParticipantRow.appendChild(confirmedParticipantBox);

	}	
}


//Create the rows of Participants that have completed the schedule as well as those that are in the process of completing it. 
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
	  var Participantrow = createCompletedParticipantRow(i, listParticipants);
	  
	  document.getElementById("1234").appendChild(Participantrow);
	  
	  var disp = listParticipants[i]["Disponibilités"];
	  
	  for(var j = 0; j<disp.length; j++)
	  {
		  var choicebox = createCompletedParticipantChoiceBox();
	
		  if(disp[j] == 1)
		  {
			  var tickImage = createCompletedParticipantTickImage();
			  choicebox.appendChild(tickImage);
		  } 
		  Participantrow.appendChild(choicebox);
	  }
}

function createCompletedParticipantRow(i, listParticipants)
{
	  var Participantrow = document.createElement('div');
	  setAttributes(Participantrow,{"class": "ParticipantRow","id": "ParticipantRowId"+i });
	  var participantFirstBox = createCompletedParticipantFirstBox(i);
	  Participantrow.appendChild(participantFirstBox);
	  
	  var participantImg = document.createElement('img');
	  participantImg.setAttribute("src","./Images/particip2.png");
	  participantFirstBox.appendChild(participantImg);
	  
	  var completedParticipantName = document.createTextNode(listParticipants[i]["Nom"]);
	  participantFirstBox.appendChild(completedParticipantName);
	  
	  var participantPenImg = createCompletedParticipantPenImg(i);
	  participantFirstBox.appendChild(participantPenImg);
	  
	  return Participantrow;
}

function createCompletedParticipantPenImg(i)
{
	var penImg = document.createElement('img');
	setAttributes(penImg,{"class": "pen","id":"pen"+i,"onClick": "replaceRow('"+i+"')","src":"./Images/pen.png"});
	
	return penImg;
}
function replaceRow(i)
{
	var row1 = document.getElementById("ParticipantRowId"+i);
	createNewParticipant(i, listParticipant);
	var editRow = document.getElementById("newParticipantRow"+i);
	var fullboard = document.getElementById("1234");
	fullboard.replaceChild(editRow, row1);
	
}
function createCompletedParticipantFirstBox(i)
{
	var participantFirstBox = document.createElement('div');
	setAttributes(participantFirstBox,{"class": "firstBox","onmouseover" :"showPen('pen"+i+"')","onmouseout" :"hidePen('pen"+i+"')"});
	  
	return participantFirstBox;
}

function createCompletedParticipantChoiceBox()
{
	var choicebox = document.createElement('div');
	choicebox.setAttribute("class", "choiceBox");
	
	return choicebox;
}

function createCompletedParticipantTickImage()
{
	  var tickImage = document.createElement('img');
	  setAttributes(tickImage,{"class": "tickImage","src": "./Images/tick1.png"});

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
  		var checkboxClass = createNewParticipantCheckbox(i, j, disp)		
		newParticipantRow.appendChild(checkboxClass);
	}
}

function createNewParticipantRow(i, listParticipants)
{
	var newParticipantRow = document.createElement('div');
	setAttributes(newParticipantRow,{"class": "newParticipantRow","id": "newParticipantRow"+i });

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

function createNewParticipantCheckbox(i, j, disp)
{
	var checkboxClass = document.createElement('div');
	checkboxClass.setAttribute("class", "checkBox");
	
	var checkboxInput = document.createElement('input');
	checkboxInput.checkes
	setAttributes(checkboxInput,{"type": "checkbox","id": "checkbox"+i+""+j });
	
	if(disp[j] == 1)
	{
		checkboxInput.setAttribute("checked", true);
	}
	
	checkboxClass.appendChild(checkboxInput);
	
	var temp = checkboxInput.checked;
	checkboxInput.setAttribute("onclick", "updateData('"+i+"', '"+j+"' ,'checkbox"+i+""+j+"')" );
	return checkboxClass;
}
function updateData(i, j,id){
	
	var temp = document.getElementById(id).checked;
	if(temp)
		listParticipant[i]["Disponibilités"][j] = 1;
	else
		listParticipant[i]["Disponibilités"][j] = 0;
		
	console.log(listParticipant[i]);
}
function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
