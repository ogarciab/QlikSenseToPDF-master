define( ["./jspdf","./jspdf.plugin.javascript","./jspdf.plugin.addimage","./html2canvas","./jspdf.plugin.from_html"
,"./jspdf.plugin.sillysvgrenderer","./jspdf.plugin.split_text_to_size","./jspdf.plugin.standard_fonts_metrics"
,"./jspdf.min","./jspdf.debug","./FileSaver"
],

function ( ) {

	return {
		
			paint: function ($element) {
					
			var html ="<center><div id='exp'><img id='my_image' src='/extensions/com-qliktech-screenshottopdf/PDF.png'></center></div>";
			var w = $element.width();
			var transparent="<img id='transparent' src='/extensions/com-qliktech-screenshottopdf/transparent.png' height='44px' width='"+$(document).width()+"px'>";
			var container = $("#qv-toolbar-container").html();
			
			$element.html(html);								
			 
			function parseAndHideHtmlTags($param) {  						
   						//we remove temporally the PDF Button and the ToolBar Container
   						//in order to take the ScreenShot that it will be record in the PDF File
   						$("#exp").hide();
   						//The toolbar is changed by a translucent image
   						//$("#qv-toolbar-container").html(transparent);
   						$("#qv-toolbar-container").hide();
   						//$(".qv-object-content ng-isolate-scope").hide();   						
   						$("div.qv-gridcell-nav.ng-scope.visible").hide();
   						$("div.quick-navigation.ng-scope").hide();
   						$("div.buttons-end.borderbox").hide();
  						$(transparent).insertAfter("#qv-toolbar-container");   						
   						//var origen = $("body").html();
   						
						return $param; 
   			}		
														
								 			
 			$element.find("img").on("qv-activate", function() {						
 				
 				//$element.find("div").off();
 								            	
		       html2canvas(parseAndHideHtmlTags($("body")), {
		       onrendered: function(canvas) {
		    	//we show PDF image and the toolbar content again
				//$("#qv-toolbar-container").html(container);
				$("#qv-toolbar-container").show();
		    	$("#exp").show();
		    	$("div.qv-gridcell-nav.ng-scope.visible").show();
		    	$("#qv-toolbar-container").show();
		    	$("div.quick-navigation.ng-scope").show();
		    	$("div.buttons-end.borderbox").show();
		    	$("#transparent").remove();
		    
				   
				//var ctx = canvas.getContext("2d");
				var imgData = canvas.toDataURL('image/jpeg');
				
				//We reduce the picture to the PDF file A4 size dimensions				
				var originalWidth = canvas.width;
    			var originalHeight = canvas.height;

    			
    			var safeWidth = 210 - 10;
    			var safeHeight = 297 - 10;

			    var scaleWidth = originalWidth / safeWidth;
			    var scaleHeight = originalHeight / safeHeight;
				
				var withh =  0;
			    var heightt = 0;
				
			    if (scaleWidth > scaleHeight)
			    {
			         withh =  originalWidth / scaleWidth;
			         heightt =  originalHeight / scaleWidth;
			    }
			
			    else
			    {
			         withh = originalWidth / scaleHeight;
			         heightt= originalHeight / scaleHeight;
			    }						
				    //we create 	
					var doc = new jsPDF();
					
					doc.addImage(imgData, 'JPEG', 5,5, withh, heightt,"ScreenShot","SLOW",180);
					//We get the TimeStamp in order to save the PDF file 
					var resultado = $.now();
					//The pdf file is saved directly from the browser 
					doc.save(resultado+".pdf");

			    }
			   });
		  });	
		  
		  
		}
	};

} );
