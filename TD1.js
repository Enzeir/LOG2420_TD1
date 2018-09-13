
function showPen(e) {
  document.getElementById(e).style.visibility="visible";
}
function hidePen(e) {
  document.getElementById(e).style.visibility="hidden";
}
function clickedCheck(e) {

    if (document.getElementById(e).src == "./Images/check.png") {
        document.getElementById(e).src = "./Images/tick-check.png";
    }
    else{
        document.getElementById(e).src = "./Images/check.png";
    }
    
}
