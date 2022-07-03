//adding animation in banners
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
  
};

//open and close search button 

function openSearch() {
 document.getElementById("myOverlay").style.display = "block";

}
  
  function closeSearch() {
	document.getElementById("myOverlay").style.display = "none";
  }



//Validate form


$(window).on("hashchange", function () {
	if (location.hash.slice(1) == "signup") {
		$(".page").addClass("extend");
		$("#login").removeClass("active");
		$("#signup").addClass("active");
	} else {
		$(".page").removeClass("extend");
		$("#login").addClass("active");
		$("#signup").removeClass("active");
	}
});
$(window).trigger("hashchange");

function validateLoginForm() {
	var name = document.getElementById("logName").value;
	var password = document.getElementById("logPassword").value;

	if (name == "" || password == "") {
		document.getElementById("errorMsg").innerHTML = "Please fill the required fields"
		return false;
	}

	else if (password.length < 8) {
		document.getElementById("errorMsg").innerHTML = "Your password must include atleast 8 characters"
		return false;
	}

	else{
		alert("Successfully logged in");
		return true;
	}
}

//popup for meaning

function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}


function validateSignupForm() {
	var mail = document.getElementById("signEmail").value;
	var name = document.getElementById("signName").value;
	var password = document.getElementById("signPassword").value;

	if (mail == "" || name == "" || password == "") {
		document.getElementById("errorMsg").innerHTML = "Please fill the required fields"
		return false;
	}

	else if (password.length < 8) {
		document.getElementById("errorMsg").innerHTML = "Your password must include atleast 8 characters"
		return false;
	}
	else {
		alert("Successfully signed up");
		return true;
	}
}

$(document).ready(function(){
  $("#searchbtn").click(function(){
     str = $("#searching").val();
     loadDictionary(str);
  });
});


//API check condition and getting data from it.
function loadDictionary(str)
{
    $.ajax({
        url : "http://localhost:3000/api/product",
        method : "GET",
        error: function(response)
        {
            var shirts = $("#recipes");
            shirts.html("An error has occured");
        },
        success : function(response)
        {

               for(var i=0 ; i < response.length ; i++){
                var rec = response[i];
                  if(str===rec.word)
                  {
                    console.log("found");
                    $("#myPopup").append(rec.meaning);
                  }
                  else
                  {
                    console.log("not found");
                  }
              } 
    }
    }); 
 }