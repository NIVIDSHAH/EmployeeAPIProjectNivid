$.ajax({
  /// Make AJAX request to get 12 employee profiles in json format
  url: "https://randomuser.me/api/?results=12",
  dataType: "json",
  success: function (data) {
    let users = data.results;
    var i = 0;

    var cardsData = "";

    $.each(users, function (index, value) {
      //building cardsData to display information for employee
      cardsData =
        cardsData +
        `<div class="card" id="${i++}">
	  		 			
              <div class="card-img-container">
              <img class ="card-img" src="${
                users[index].picture.large
              }" alt="profile picture"> 
              </div>	
              <div class="card-info-container">
              <h3 id="name" class="card-name cap">${users[index].name.first} ${
          users[index].name.last
        }</h3>
			  		 		<p class="card-text">${users[index].email}</p>  
		  		 			<p class="card-text cap">${users[index].location.city}, ${
          users[index].nat
        }</p>
		  		 		 </div>
                            </div>`;
    });

    $("#gallery").html(cardsData);

    //Build and append overlay to dim screen when modal is displayed (hidden by default using css)
    var overlay = $('<div id="overlay">');
    $("body").append(overlay);

    //Function to run when employee card is clicked
    $(".card").on("click", function (e) {
      //Parse card's id attribute from string to number
      var thisEmployee = parseInt($(this).attr("id"));

      //Function to build modal
      function updateModal(cardToShow) {
        $("#gallery").html(`<div class="modal-container">
             <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                <img class="modal-img" src="${users[cardToShow].picture.large}" alt="profile picture">	
                
                <h3 id="name" class="modal-name cap">${users[cardToShow].name.first}  ${users[cardToShow].name.last}</h3>
                <p class="modal-text">${users[cardToShow].email}</p>
                <p class="modal-text cap">${users[cardToShow].location.city}</p>
                <hr>
                <p class="modal-text">${users[cardToShow].phone}</p>
                <p class="modal-text"> ${users[cardToShow].location.city} ${users[cardToShow].location.state}</p>
                <p class="modal-text">Birthday: ${users[cardToShow].dob.date}</p>
            </div>
        </div>`);
      }

      updateModal(thisEmployee);
      $("#gallery").slideDown();
      $(".modal-close-btn").on('click',function (e) {
        $(".modal-container").toggle();
        $("#gallery").html(cardsData);
      });
      
    });
  },
});


