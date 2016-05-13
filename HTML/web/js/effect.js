function button1()
{
     $(document).ready(function(){
      $("#content1").slideToggle("slow");
	  $("#content2").hide();
	  $("#content3").hide();
	  $("#content4").hide();
		event.stopPropagation();
        });
		$(document).click(function(){
        $("#content1").slideUp("slow");
		event.stopPropagation();
        })
		
        $('#content1').click(function(){
        return false;
        });
		
}

function button2()
{
     $(document).ready(function(){
      $("#content2").slideToggle("slow");
	  $("#content1").hide();
	  $("#content3").hide();
	  $("#content4").hide();
		event.stopPropagation();
        });
		
		$(document).click(function(){
        $("#content2").slideUp("slow");
		event.stopPropagation();
        })
		
        $('#content2').click(function(){
        return false;
        });
}

function button3()
{
     $(document).ready(function(){
      $("#content3").slideToggle("slow");
	  $("#content1").hide();
	  $("#content2").hide();
	  $("#content4").hide();
		event.stopPropagation();
        });
		$(document).click(function(){
        $("#content3").slideUp("slow");
		event.stopPropagation();
        })
		
        $('#content3').click(function(){
        return false;
        });
}

function button4()
{
     $(document).ready(function(){
      $("#content4").slideToggle("slow");
	  $("#content1").hide();
	  $("#content2").hide();
	  $("#content3").hide();
		event.stopPropagation();
        });
		$(document).click(function(){
        $("#content4").slideUp("slow");
		event.stopPropagation();
        })
		
        $('#content4').click(function(){
        return false;
        });
}


function filterclick()
{
	$(document).ready(function(){
      $("#filtermenu").slideToggle("slow");
	  $("#plottab").hide();
		event.stopPropagation();
        });
		
		$(document).click(function(){
        $("#filtermenu").slideUp("slow");
		event.stopPropagation();
        })
		
        $('#filtermenu').click(function(){
        return false;
        });	
}

function plotclick()
{
	$(document).ready(function(){
      $("#plottab").slideToggle("slow");
	  $("#filtermenu").hide();
		event.stopPropagation();
        });
		
		$(document).click(function(){
        $("#plottab").slideUp("slow");
		event.stopPropagation();
        })
		
        $('#plottab').click(function(){
        return false;
        });	
	
	
}