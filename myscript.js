//array of IDs of the cards that correspond to a selected button
var buttonState = [];

//array of which check boxes are checked
var checkState = [];

//FUNCTION change buttonState based on value passed
var filterCard = function(newButtonState){
//    //if user chooses filter, pass in value to filter for
//    var filter = value;
//    //put all cards into an array
//    var cards = document.getElementsByClassName("card");
//    var arr = jQuery.makeArray(cards);
//    console.log("made cards into array!");
//    //loop thru all cards
//    for (i = 0; i < arr.length; i++){
//        //if it has a value that matches the filter, change status to visible
//        if (arr[i].value == filter){
//            arr[i].style.borderColor="red";
//        }
//        //if none of values match the filter, change status to hidden 
//    }  

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

//FUNCTION changes which cards are visible based on button and check states
var updateView = function(){
    //when button state is empty, show all cards
    if (buttonState.length===0){
        $("div.card").show();
    }
    //filter out the cards not applicable to the selected phase/button
    else{
        $("div.card").hide();
        for(var i=0; i<buttonState.length; i++){
            var cardId=buttonState[i];
            $('#' + cardId).show();
        }
    }
    
    //filtering by checkboxes
    if (checkState.length>0){
        var checkStateSelector = checkState.map(function(name){
            return "." + name;
        }).join('');

        $(".card").not(checkStateSelector).hide();
    }
    
};

//FUNCTION-helper remove card
    //animate card minimizing
    //change status to hidden

//FUNCTION resetting results
    //change buttonState to empty array
    //select each checkbox and make sure it is unchecked
    $("#user").attr('checked',false);
    //same as above with trigger change
    ////$("#user").attr('checked',false).trigger('change');

//EXTRA adding banner to return to site above any linked external page?