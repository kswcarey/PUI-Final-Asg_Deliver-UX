//array of IDs of the cards that correspond to a selected button
var buttonState = [];

//array of which check boxes are checked
var checkState = [];

//Array with progress buttons in order for fill() function
var buttonArray = ['#interview-btn', '#behavior-btn', '#pain-btn', '#analysis-btn', '#scope-btn', '#feedback-btn'];

//animation duration universal variable
var animationDuration = 500;

//FUNCTION change buttonState based on value passed
var filterCard = function(newButtonState){
    buttonState=newButtonState;
    updateView();
};

//FUNCTION change checkState contents based on value passed
var checkBox = function(event,checkBoxId){
    var isChecked = event.target.checked;
    if (isChecked){
        checkState.push(checkBoxId);
    }
    else{
        var index = checkState.indexOf(checkBoxId);
        checkState.splice(index, 1);
    }
    updateView();
};

//////TODO write FUNCTION to add "filled" class to buttons up to clicked button in array\\\\\\
var fill = function(arrPointer){
    //set all the button classes to filter
    $("button.filter").removeClass('filled');
    //loop through button array up to the passed button
    for (i=0; i<=arrPointer; i++){
        //delay each loop until previous button animates
        (function(i){
           setTimeout(function(){
               //add "filled" class to buttons up to and including that button
               var changeBtnId = buttonArray[i];
               $(changeBtnId).addClass('filled');
            },700*i); 
        })(i);
        
    }
}


//FUNCTION changes which cards are visible based on button and check states
var updateView = function(){
    //when button state is empty, show all cards
    if (buttonState.length===0){
        $("div.card").finish().slideDown(animationDuration);
    }
    //filter out the cards not applicable to the selected phase/button
    else{
        $("div.card").finish().hide();
        for(var i=0; i<buttonState.length; i++){
            var cardId=buttonState[i];
            $('#' + cardId).finish().slideDown(animationDuration);
        }
    }
    //filtering by checkboxes
    if (checkState.length>0){
        var checkStateSelector = checkState.map(function(name){
            return "." + name;
        }).join('');

        $("div.card").not(checkStateSelector).finish().slideUp(animationDuration);
    }
    // visible count
    setTimeout(function(){
        var count = $("div.card").filter(':visible').length;
        // set text 
        $("#count").text(count);
    },animationDuration+10);
};

//FUNCTION resetting results
var reset = function(){
    //change buttonState to empty array
    buttonState = [];
    //select each checkbox and make sure it is unchecked
    $("#user").attr('checked',false).trigger('change');
    $("#client").attr('checked',false).trigger('change');
    $("#internal").attr('checked',false).trigger('change');
    $("#dev").attr('checked',false).trigger('change');
    //reset all button classes to just "filter"
    $("button.filter").removeClass('filled');
    
    updateView();
}


//Make sure counter is set on page load
$(document).ready(function(){
   updateView(); 
});