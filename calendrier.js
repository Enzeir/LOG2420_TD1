
var listParticipant;
var listDate ;
var indexParticipantEnCours;

fetch("http://127.0.0.1:8080/cal-data.json")
  .then(function(response) { return response.json(); })
  .then(function(data) {

	  listParticipant = data["Participants"];
	  listDate = data["Calendrier"];
	  //On creer la ligne des dates 
	  createDates();
	  //On creer la ligne des participant confirmer
	  createConfirmedParticipantRow();
	  //On creer les lignes de chaque participant
	  createParticipants(); 
});
       
function createDates()
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
		setAttributes(dateBox, {"class": "dateBox","id": "dateBox"+i} );
		dateRow.appendChild(dateBox);
		
		var date = new Date(listDate[i][0]);
		var timeStart = date.getHours();
		var minutesStart;
        if (date.getMinutes() < 10)
        {
            minutesStart = "0" + date.getMinutes();
        }
        else
        {
            minutesStart = date.getMinutes();
        }

		date.setMinutes(date.getMinutes()+ listDate[i][1]);
        var minutesEnd;

        if (date.getMinutes() < 10)
        {
            minutesEnd = "0" + date.getMinutes();
        }
        else
        {
            minutesEnd = date.getMinutes();
        }

        document.getElementById("dateBox" + i).innerHTML =
            month[date.getMonth()] + "<br><p><b>" + date.getDate() + "</b></p>" + weekDays[date.getDay()] + "<br>" + timeStart + ":" + minutesStart + "<br>" + date.getHours() + ":" + minutesEnd;
	}
}
//Creates a row that verifies the amount of confirmed Participants each day.
function createConfirmedParticipantRow()
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
	
	var confirmedParticipantFirstBoxText = document.createTextNode(numberCompletedParticipant+" Participants");
	confirmedParticipantFirstBox.appendChild(confirmedParticipantFirstBoxText);
	
	confirmedParticipantRow.appendChild(confirmedParticipantFirstBox);
	
	document.getElementById("1234").appendChild(confirmedParticipantRow);
	
	for (var i = 0; i < listParticipant[0]["Disponibilités"].length; i++)
	{

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
function createParticipants()
{
  for(var i = 0; i < listParticipant.length; i++)
  {
	  if(listParticipant[i]["Statut"] != "EnCours")
	  {
		  createCompletedParticipant(i);
	  }
	  else
	  {
		  createNewParticipant(i, listParticipant);
	  }
  }
}

//Creates the row of a participant that has confirmed its schedule
function createCompletedParticipant(i, listParticipants)
{
  var Participantrow = createCompletedParticipantRow(i);
  
  document.getElementById("1234").appendChild(Participantrow);
  
  var disp = listParticipant[i]["Disponibilités"];
  
  for(var j = 0; j<disp.length; j++)
  {
	  var choicebox = createCompletedParticipantChoiceBox(i, j);

	  if(disp[j] == 1)
	  {
		  var tickImage = createCompletedParticipantTickImage();
		  choicebox.appendChild(tickImage);
	  } 
	  Participantrow.appendChild(choicebox);
  }
}

/* Cette fonction creer un div row qui contient le firstBox(image + nom du participant) et le retourn*/
function createCompletedParticipantRow(i)
{
	  var Participantrow = document.createElement('div');
	  setAttributes(Participantrow,{"class": "ParticipantRow","id": "ParticipantRowId"+i });
	  var participantFirstBox = createCompletedParticipantFirstBox(i);
	  Participantrow.appendChild(participantFirstBox);
	  
	  var participantImg = document.createElement('img');
	  participantImg.setAttribute("src","./Images/particip2.png");
	  participantFirstBox.appendChild(participantImg);
	  
	  var completedParticipantName = document.createTextNode(listParticipant[i]["Nom"]);
	  participantFirstBox.appendChild(completedParticipantName);
	  
	  var participantPenImg = createCompletedParticipantPenImg(i);
	  participantFirstBox.appendChild(participantPenImg);
	  
	  return Participantrow;
}
/*cette fonction creer le tooltip pour chaque disponibilete pour un participant*/
function createToolTip(i,j){
	
	var nom = listParticipant[i]["Nom"];
	var weekDays = [ "DIM.","LUN.","MAR.", "MER.", "JEU.", "VEN.", "SAM."];
	var month = ["janvier","fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
	var date = new Date(listDate[j][0]);
	var timeStart = date.getHours();
		var minutesStart;
        if (date.getMinutes() < 10)
        {
            minutesStart = "0" + date.getMinutes();
        }
        else
        {
            minutesStart = date.getMinutes();
        }

		date.setMinutes(date.getMinutes()+ listDate[j][1]);
        var minutesEnd;

        if (date.getMinutes() < 10)
        {
            minutesEnd = "0" + date.getMinutes();
        }
        else
        {
            minutesEnd = date.getMinutes();
        }
	//create a tooltip for the choicebox
	var tooltipContainer = document.createElement('div');
	tooltipContainer.setAttribute("class", "tooltipContainer");
	
	var tootipDateContainer = document.createElement('div');
	tootipDateContainer.setAttribute("class", "tootipDateContainer");
	
	/*tooltipDateText1 pour la date*/
	var tooltipDateText1 = document.createElement('div');
	tooltipDateText1.setAttribute("class", "tooltipDateText");
	tooltipDateText1.setAttribute("id", "tooltipDateText"+i+j);
	tootipDateContainer.appendChild(tooltipDateText1);
	tooltipDateText1.innerHTML = month[date.getMonth()] + "<br><br>"+ date.getDate()+ "<br><br>"+ weekDays[date.getDay()]  ; 
		
	/*tooltipDateText2 pour les heures*/
	var tooltipDateText2 = document.createElement('div');
	tooltipDateText2.setAttribute("class", "tooltipDateText");
		tooltipDateText2.innerHTML = timeStart + ":" + minutesStart + "<br><br>" + date.getHours() + ":" + minutesEnd;
	tootipDateContainer.appendChild(tooltipDateText2);
	tooltipContainer.appendChild(tootipDateContainer);
	
	var tooltipParticipantStatus = document.createElement('div');
	tooltipParticipantStatus.setAttribute("class", "tooltipParticipantStatus");
	
	var disp = listParticipant[i]["Disponibilités"];
	var text ;
	
	if (disp[j] == 1)
		text = "A vote << oui >>";
	else
		text = " N'a pas voter pour cela";
		
	tooltipParticipantStatus.innerHTML= nom + "<br>" + text;
	tooltipContainer.appendChild(tooltipParticipantStatus);
	return tooltipContainer;
}
/*cette fonction creer la ligne d'un participant confirme avec ces disponibilite */
function createCompletedParticipantChoiceBox(i, j)
{

	var choicebox = document.createElement('div');
	choicebox.setAttribute("class", "choiceBox");
	
	tooltipContainer = createToolTip(i,j);

	choicebox.appendChild(tooltipContainer);
	
	return choicebox;
}
/* cette fonction creer l'image du crayon et la rettourne dans un div*/
function createCompletedParticipantPenImg(i)
{
	var penImg = document.createElement('img');
	setAttributes(penImg,{"class": "pen","id":"pen"+i,"onClick": "replaceRow('"+i+"')","src":"./Images/pen.png"});
	
	return penImg;
}
/*cette fonction creer le premier Box et le retourne dans un div*/
function createCompletedParticipantFirstBox(i)
{
	var participantFirstBox = document.createElement('div');
	setAttributes(participantFirstBox,{"class": "firstBox","onmouseover" :"showPen('pen"+i+"')","onmouseout" :"hidePen('pen"+i+"')"});
	  
	return participantFirstBox;
}
/*cette function creer le div qui va contenir l'image tick et le retourne*/
function createCompletedParticipantTickImage()
{
	  var tickImage = document.createElement('img');
	  setAttributes(tickImage,{"class": "tickImage","src": "./Images/tick1.png"});

	  return tickImage;
}

/*setIndexParticipantEnCours cette fonction est utilise pour set le 
 * index tu participant ayant un statut encours pour mettre a jours les checkboxes*/
function setIndexParticipantEnCours()
{
	for (var i = 0; i < listParticipant.length; i++)
	{
		if (listParticipant[i]["Statut"]=="EnCours")
		{
			indexParticipantEnCours = i;
			break;
		}
	}
}

//functions that controls the render of the pen image when hovering over a participant's name
function showPen(e) {
  document.getElementById(e).style.visibility="visible";
}
function hidePen(e) {
  document.getElementById(e).style.visibility="hidden";
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
/* Cette fonction creer un div row qui contient le firstBox(image + nom du participant) et le retourn*/
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
/*fonction qui creer un div contenant l'image partticip1*/
function createNewParticipantImg()
{
	  var participantimg = document.createElement('img');
	  participantimg.setAttribute("src","./Images/particip1.png");
	  
	  return participantimg;
}
function createNewParticipantFirstBox()
{
  	var newParticipantFirstBox = document.createElement('div');
  	newParticipantFirstBox.setAttribute("class", "firstBox");
  	
  	return newParticipantFirstBox;
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
	checkboxInput.setAttribute("onclick", "updateDataFromTable('"+i+"', '"+j+"' ,'checkbox"+i+""+j+"')" );
	return checkboxClass;
}



//functions that swiches the view we have when pressing the button at the top of the page
function switchViewToCalendar()
{
	setIndexParticipantEnCours();
	updateCalendarCheckbox();
	document.getElementById("1234").style.display ="none";
	document.getElementById("calendar").style.display = "flex";
}
function switchViewToTable()
{	
	updateTableCheckbox();
	document.getElementById("1234").style.display = "flex";
	document.getElementById("calendar").style.display = "none";
}
/*cette fonction est utiliser par le pen pour qu'on puisse modifier les disponibilite d'un participant
 * mais apres quelque verification, on a compris qu'il ne fallait pas implementet la fonctionalite du pen
 * alors on la laisser ca la completer. Mais si vous clicker sur le crayon vous pourais changer les disponibilite d'un participant 
 * sans les save*/
function replaceRow(i)
{
	var row1 = document.getElementById("ParticipantRowId"+i);
	createNewParticipant(i, listParticipant);
	var editRow = document.getElementById("newParticipantRow"+i);
	var fullboard = document.getElementById("1234");
	fullboard.replaceChild(editRow, row1);
	
}


//les deux fonction suivante update la structure de donnee lorsque un checkbox est clicker
function updateDataFromTable(i, j, id)
{
	
	var temp = document.getElementById(id).checked;
	if(temp)
		listParticipant[i]["Disponibilités"][j] = 1;
	else
		listParticipant[i]["Disponibilités"][j] = 0;		

}
function UpdateDataFromCalendar(j, id)
{
	var temp = document.getElementById(id).checked
	if (temp)
	{
		listParticipant[indexParticipantEnCours]["Disponibilités"][j] = 1;
	}
	else
	{
		listParticipant[indexParticipantEnCours]["Disponibilités"][j] = 0;
	}
}
/*cette fonction est utiliser pour mettre a jours de la base de donne apres quelle soit modifier par la vue table*/

function updateCalendarCheckbox()
{
	for (var i = 0; i < listParticipant[indexParticipantEnCours]["Disponibilités"].length; i++)
	{
		if (listParticipant[indexParticipantEnCours]["Disponibilités"][i] == 1)
			document.getElementById("calendarCheckbox"+i).checked = true;
		else
			document.getElementById("calendarCheckbox"+i).checked = false;
	}
}
/*cette fonction est utiliser pour mettre a jours de la base de donne apres quelle soit modifier par la vue calendar*/

function updateTableCheckbox()
{
	for (var i = 0; i < listParticipant[indexParticipantEnCours]["Disponibilités"].length; i++)
	{
		if (listParticipant[indexParticipantEnCours]["Disponibilités"][i] == 1)
			document.getElementById("checkbox"+indexParticipantEnCours+i).checked = true;
		else
			document.getElementById("checkbox"+indexParticipantEnCours+i).checked = false;
	}
}
/*cette fonction est utiliser pour set plusieur attribut en en un seul ligne. (elle a etait trouver sut internet*/
function setAttributes(el, attrs)
{
    for (var key in attrs)
    {
        el.setAttribute(key, attrs[key]);
    }
}
