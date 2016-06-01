function button1() {
    $(document).ready(function() {
        var link2project = './text/theProject.html';
        $("#content1").fadeToggle("slow");
        $("#innercontent1").load(link2project);
        $("#content2").fadeOut("slow");
        $("#content3").fadeOut("slow");
        $("#content4").fadeOut("slow");
        $("#filtermenu").fadeOut("slow");
        $("#plottab").fadeOut("slow");
        event.stopPropagation();
    });
    $(document).click(function() {
        $("#content1").fadeOut("slow");
        event.stopPropagation();
    });

    $('#content1').click(function() {
        return false;
    });

}

function button2() {
    $(document).ready(function() {
        var link2methodology = './text/Methodology.html';
        $("#content2").fadeToggle("slow");
        $("#innercontent2").load(link2methodology);
        $("#content1").fadeOut("slow");
        $("#content3").fadeOut("slow");
        $("#content4").fadeOut("slow");
        $("#filtermenu").fadeOut("slow");
        $("#plottab").fadeOut("slow");
        event.stopPropagation();
    });

    $(document).click(function() {
        $("#content2").fadeOut("slow");
        event.stopPropagation();
    });

    $('#content2').click(function() {
        return false;
    });
}

function button3() {
    $(document).ready(function() {
        var link2team = './text/theTeam.html';
        $("#content3").fadeToggle("slow");
        $("#innercontent3").load(link2team);
        $("#content1").fadeOut("slow");
        $("#content2").fadeOut("slow");
        $("#content4").fadeOut("slow");
        $("#filtermenu").fadeOut("slow");
        $("#plottab").fadeOut("slow");
        event.stopPropagation();
    });
    $(document).click(function() {
        $("#content3").fadeOut("slow");
        event.stopPropagation();
    });

    $('#content3').click(function() {
        return false;
    });
}




function button4() {
    $(document).ready(function() {
        var link2datasources = './text/DataSources.html';
        $("#content4").fadeToggle("slow");
        $("#innercontent4").load(link2datasources);
        $("#content1").fadeOut("slow");
        $("#content2").fadeOut("slow");
        $("#content3").fadeOut("slow");
        $("#filtermenu").fadeOut("slow");
        $("#plottab").fadeOut("slow");
        event.stopPropagation();
    });
    $(document).click(function() {
        $("#content4").fadeOut("slow");
        event.stopPropagation();
    });

    $('#content4').click(function() {
        return false;
    });
}


function filterclick() {
    $(document).ready(function() {
        $("#filtermenu").fadeToggle("slow");
        $("#plottab").fadeOut("slow");
        $("#content1").fadeOut("slow");
        $("#content2").fadeOut("slow");
        $("#content3").fadeOut("slow");
        $("#content4").fadeOut("slow");
        event.stopPropagation();
    });

    $(document).click(function() {
        $("#filtermenu").fadeOut("slow");
        event.stopPropagation();
    });

    $('#filtermenu').click(function() {
        return false;
    });
}

function plotclick() {
    $(document).ready(function() {
        $("#plottab").fadeToggle("slow");
        $("#filtermenu").fadeOut("slow");
        $("#content1").fadeOut("slow");
        $("#content2").fadeOut("slow");
        $("#content3").fadeOut("slow");
        $("#content4").fadeOut("slow");
        event.stopPropagation();
    });

    $(document).click(function() {
        $("#plottab").fadeOut("slow");
        event.stopPropagation();
    })

    $('#plottab').click(function() {
        return false;
    });
}


//legend function

function legendclick(number) {
    if (number == 1) {
        $("#legend").fadeIn("slow");
        $("#legendtitle").text("Income Levels");
        $("#textbox_1").text("Below £34k");
        $("#textbox_2").text("£34k - £43k");
        $("#textbox_3").text("£43k - £52k");
        $("#textbox_4").text("£52k - £61k");
        $("#textbox_5").text("£61k - £70k");
        $("#textbox_6").text("More than £70k");
        $("#textbox_7").text();
        document.getElementById("textbox_5").style.color = "white";
        document.getElementById("textbox_6").style.color = "white";
        document.getElementById("textbox_7").style.color = "#695F5F";
        document.getElementById("box_1").style.backgroundColor = "#e6e6ff";
        document.getElementById("box_2").style.backgroundColor = "#c7c7ff";
        document.getElementById("box_3").style.backgroundColor = "#a8a8ff";
        document.getElementById("box_4").style.backgroundColor = "#8989ff";
        document.getElementById("box_5").style.backgroundColor = "#6a6aff";
        document.getElementById("box_6").style.backgroundColor = "#2c2cff";
        document.getElementById("box_7").style.backgroundColor = "#695F5F";
    } else if (number == 2) {
        $("#legend").fadeIn("slow");
        $("#legendtitle").text("Location Quotients");
        $("#textbox_1").text("Strongly Under-represented");
        $("#textbox_2").text("Under-represented");
        $("#textbox_3").text("Average");
        $("#textbox_4").text("Over-represented");
        $("#textbox_5").text("Strongly Over-represented");
        $("#textbox_6").text();
        $("#textbox_7").text();
        document.getElementById("textbox_5").style.color = "white";
        document.getElementById("textbox_6").style.color = "#695F5F";
        document.getElementById("textbox_7").style.color = "#695F5F";
        document.getElementById("box_1").style.backgroundColor = "#0066ff";
        document.getElementById("box_2").style.backgroundColor = "#00FFFF";
        document.getElementById("box_3").style.backgroundColor = "#ffff3C";
        document.getElementById("box_4").style.backgroundColor = "#ff00ff";
        document.getElementById("box_5").style.backgroundColor = "#cc0099";
        document.getElementById("box_6").style.backgroundColor = "#695F5F";
        document.getElementById("box_7").style.backgroundColor = "#695F5F";
    } else if (number == 3) {
        $("#legend").fadeIn("slow");
        $("#legendtitle").text("Local Moran's I");
        $("#textbox_1").text("Highly Clustered");
        $("#textbox_2").text("Clustered");
        $("#textbox_3").text("Random Distribution");
        $("#textbox_4").text("Dispersed");
        $("#textbox_5").text("Highly Dispersed");
        $("#textbox_6").text();
        $("#textbox_7").text();
        document.getElementById("textbox_5").style.color = "white";
        document.getElementById("textbox_6").style.color = "#695F5F";
        document.getElementById("textbox_7").style.color = "#695F5F";
        document.getElementById("box_1").style.backgroundColor = "#cc0099";
        document.getElementById("box_2").style.backgroundColor = "#ff00ff";
        document.getElementById("box_3").style.backgroundColor = "#acacac";
        document.getElementById("box_4").style.backgroundColor = "#00FFFF";
        document.getElementById("box_5").style.backgroundColor = "#0066ff";
        document.getElementById("box_6").style.backgroundColor = "#695F5F";
        document.getElementById("box_7").style.backgroundColor = "#695F5F";
    } else if (number == 4) {
        $("#legend").fadeIn("slow");
        $("#legendtitle").text("Neighbourhoods");
        $("#textbox_1").text("Established Gentrified");
        $("#textbox_2").text("Emergent Gentrification");
        $("#textbox_3").text("Non-gentrified");
        $("#textbox_4").text("Balanced Diet");
        $("#textbox_5").text();
        $("#textbox_6").text();
        $("#textbox_7").text();
        document.getElementById("textbox_5").style.color = "#695F5F";
        document.getElementById("textbox_6").style.color = "#695F5F";
        document.getElementById("textbox_7").style.color = "#695F5F";

        document.getElementById("box_1").style.backgroundColor = "#ff5050";
        document.getElementById("box_2").style.backgroundColor = "#ffff66";
        document.getElementById("box_3").style.backgroundColor = "#33ccff";
        document.getElementById("box_4").style.backgroundColor = "#66ff66";
        document.getElementById("box_5").style.backgroundColor = "#695F5F";
        document.getElementById("box_6").style.backgroundColor = "#695F5F";
        document.getElementById("box_7").style.backgroundColor = "#695F5F";
    } else {
        $("#legend").hide("slow");

    }
}

function changecolorToken(num) {
    for (var i = 1; i <= 15; i++) {
        var token_btn = document.getElementById(i + '_btn');
        if (i == num) {
            token_btn.style.backgroundColor = "#383434";
        } else {
            token_btn.style.backgroundColor = "#695F5F";
        }
    }
}

function changecolorViz(order) {
    for (var j = 1; j <= 3; j++) {
        var viz_btn = document.getElementById(j + '_viz');
        if (j == order) {
            viz_btn.style.backgroundColor = "#383434";
        } else {
            viz_btn.style.backgroundColor = "#695F5F";
        }
    }
}

// Register Click events 
$("#resetLink").click(function(event) {
    event.preventDefault();
    location.reload();
});

$("#clearLink").click(function(event) {
    event.preventDefault();
    //Clear Markers
    setAllMap(null);
    google.maps.event.clearListeners(map, 'dragend');
    $("#photoNum").html("0");
});