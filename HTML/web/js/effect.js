function button1()
{
     $(document).ready(function(){
	  var link2project ='./text/theProject.html' 
      $("#content1").fadeToggle("slow");
	  $("#innercontent1").load(link2project);
	  $("#content2").fadeOut("slow");
	  $("#content3").fadeOut("slow");
	  $("#content4").fadeOut("slow");
	  $("#filtermenu").fadeOut("slow");
	  $("#plottab").fadeOut("slow");
		event.stopPropagation();
        });
		$(document).click(function(){
        $("#content1").fadeOut("slow");
		event.stopPropagation();
        })
		
        $('#content1').click(function(){
        return false;
        });
		
}

function button2()
{
     $(document).ready(function(){
	  var link2methodology ='./text/Methodology.html' 
      $("#content2").fadeToggle("slow");
	   $("#innercontent2").load(link2methodology);
	  $("#content1").fadeOut("slow");
	  $("#content3").fadeOut("slow");
	  $("#content4").fadeOut("slow");
	  $("#filtermenu").fadeOut("slow");
	  $("#plottab").fadeOut("slow");
		event.stopPropagation();
        });
		
		$(document).click(function(){
        $("#content2").fadeOut("slow");
		event.stopPropagation();
        })
		
        $('#content2').click(function(){
        return false;
        });
}

function button3()
{
     $(document).ready(function(){
	  var link2team ='./text/the Team.html' 
      $("#content3").fadeToggle("slow");
	  $("#innercontent3").load(link2team);
	  $("#content1").fadeOut("slow");
	  $("#content2").fadeOut("slow");
	  $("#content4").fadeOut("slow");
	  $("#filtermenu").fadeOut("slow");
	  $("#plottab").fadeOut("slow");
		event.stopPropagation();
        });
		$(document).click(function(){
        $("#content3").fadeOut("slow");
		event.stopPropagation();
        })
		
        $('#content3').click(function(){
        return false;
        });
}

function button4()
{
     $(document).ready(function(){
	  var link2datasources ='./text/Data Sources.html'
      $("#content4").fadeToggle("slow");
	   $("#innercontent4").load(link2datasources);
	  $("#content1").fadeOut("slow");
	  $("#content2").fadeOut("slow");
	  $("#content3").fadeOut("slow");
	  $("#filtermenu").fadeOut("slow");
	  $("#plottab").fadeOut("slow");
		event.stopPropagation();
        });
		$(document).click(function(){
        $("#content4").fadeOut("slow");
		event.stopPropagation();
        })
		
        $('#content4').click(function(){
        return false;
        });
}


function filterclick()
{
	$(document).ready(function(){
      $("#filtermenu").fadeToggle("slow");
	  $("#plottab").fadeOut("slow");
	  $("#content1").fadeOut("slow");
	  $("#content2").fadeOut("slow");
	  $("#content3").fadeOut("slow");
	  $("#content4").fadeOut("slow");
		event.stopPropagation();
        });
		
		$(document).click(function(){
        $("#filtermenu").fadeOut("slow");
		event.stopPropagation();
        })
		
        $('#filtermenu').click(function(){
        return false;
        });	
}

function plotclick()
{
	$(document).ready(function(){
      $("#plottab").fadeToggle("slow");
	  $("#filtermenu").fadeOut("slow");
	  $("#content1").fadeOut("slow");
	  $("#content2").fadeOut("slow");
	  $("#content3").fadeOut("slow");
	  $("#content4").fadeOut("slow");
		event.stopPropagation();
        });
		
		$(document).click(function(){
        $("#plottab").fadeOut("slow");
		event.stopPropagation();
        })
		
        $('#plottab').click(function(){
        return false;
        });		
}


