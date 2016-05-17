function button1()
{
     $(document).ready(function(){
      $("#content1").fadeToggle("slow");
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
      $("#content2").fadeToggle("slow");
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
      $("#content3").fadeToggle("slow");
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
      $("#content4").fadeToggle("slow");
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
