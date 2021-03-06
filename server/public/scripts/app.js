$(document).ready(function() {
  //storage of json Data
	var muArray = [];
  //used to determine the index of muArray we want to show in later functions
	var count = 0;

	$.ajax({
		type: "GET",
		url: "/data",
		success: function(data) {

			muArray = data.mu;
			addDots();
			showSelected();
			displayPerson(count);

		}
	});
  //checks to see if next or previous was clicked then changes count with changeCount displays result  changes the indicator. This is all wrapped in an animate function which works as a callback and runs my code after my initial animation is complete. After my code is ran and my person is changed I use clearInterval to reset the timer of the function that automatically changes the person every ten seconds.
	$('.button-container').on('click', 'button', function() {
		if ($(this).hasClass('next')) {
			$('.person-container').fadeOut('slow', function() {
				changeCount(1);
				displayPerson(count);
				$(this).fadeIn('slow');
				showSelected();
			})
		} else {
			$('.person-container').fadeOut('slow', function() {
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

	function changeCount(numchange) {
		count += numchange;
		if (count == -1) {
			count = muArray.length - 1;
		} else if (count >= muArray.length) {
			count = 0;
		}
	}



	function displayPerson(count) {

		$('.name').text('Name: ' + muArray[count].name);
		$('.git_username').text('Github: ' + muArray[count].git_username);
		$('.shoutout').text('shoutout: ' + muArray[count].shoutout);
	}

	function addDots() {
		for (var i = 0; i < muArray.length; ++i) {
			$('.index-points').append('<span class="dot">.</span>');
		}
	}

	function showSelected() {
		$('.selected').removeClass('selected')
		$('span:nth-of-type(' + (count + 1) + ')').addClass('selected');
	}

	function autoChange() {
		$('.person-container').fadeOut('slow', function() {
			changeCount(1);
			displayPerson(count);
			$(this).fadeIn('slow');
			showSelected();
		})
	}

});
