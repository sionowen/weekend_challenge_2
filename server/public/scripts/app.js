$(document).ready(function(){
  var muArray = [];
  var count = 0;

    console.log("Document loaded");
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){

        muArray = data.mu;
        addDots();
        showSelected();
        displayPerson(count);

      }
    });

    $('.button-container').on('click', 'button', function(){


      if($(this).hasClass('next')){
        $('.person-container').fadeOut('slow', function(){
          changeCount(1);
          displayPerson(count);
          $(this).fadeIn('slow');
          showSelected();
        })
      }else{
        $('.person-container').fadeOut('slow', function(){
          changeCount(-1);
          displayPerson(count);
          $(this).fadeIn('slow');
          showSelected();
        })
      }
      clearInterval(changeTimer);
      changeTimer = window.setInterval(autoChange, 10000)
    })

    var changeTimer = window.setInterval(autoChange, 10000);

    function changeCount(numchange){
      count += numchange;
      if (count == -1){
        count = muArray.length - 1;
      } else if (count >= muArray.length) {
        count = 0;
      }


    }



    function displayPerson(count){

      $('.name').text('Name: ' + muArray[count].name);
      $('.git_username').text('Github: ' + muArray[count].git_username);
      $('.shoutout').text('shoutout: ' + muArray[count].shoutout);
    }
    function addDots(){
      for (var i = 0; i < muArray.length; ++i){
        $('.index-points').append('<span class="dot">.</span>');
      }
    }
    function showSelected(){
      $('.selected').removeClass('selected')
      $('span:nth-of-type(' + (count + 1) + ')').addClass('selected');
    }

    function autoChange(){
      $('.person-container').fadeOut('slow', function(){
        changeCount(1);
        displayPerson(count);
        $(this).fadeIn('slow');
        showSelected();
        })
      }

});
