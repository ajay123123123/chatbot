/**
 * http://usejsdoc.org/
 */

	var conversationElement = document.getElementById("conversation");
	var conversation_bodyElement = document.getElementById("conversation_body");

	
	
	function openDialog() {
		var windowWidthVal = 550;
		var fullHeight = window.top.frames['top'].innerHeight;
		var fullWidth = window.top.frames['top'].innerWidth;
		var leftPos = 760;
		if(fullWidth > 550){
			if(Math.round(fullWidth/2) < 550  ){
				leftPos = fullWidth - (550 +30);
			}else{
				leftPos = Math.round(fullWidth/2) - 550/2;
				
			}
			document.getElementById("bot").style.display = "block";
		    document.getElementById("bot").style.position = "absolute";
			document.getElementById("conversation_wait").style.width = "550px"; 
			document.getElementById("conversation_wait").style.height= "350px";

		}else if(fullWidth <= 550){
			windowWidthVal = fullWidth;
			document.getElementById("bot").style.display = "block";
			document.getElementById("bot").style.position = "absolute";
			document.getElementById("conversation_wait").style.width = (fullWidth-20)+"px"; 
			document.getElementById("conversation_wait").style.height= "350px";

			
		}else{
			document.getElementById("bot").style = "position:absolute; display: block;  "; 
		document.getElementById("conversation_wait").style.width = "550px";
			document.getElementById("conversation_wait").style.height= "350px";

		}
		document.getElementById("userInputTyped").style.width = (windowWidthVal - 105) +"px";
		
		document.getElementById("bot").style.zIndex  = "1";
		document.getElementById('userInputTyped').select();
	}
	
	function closeDialog() {
		document.getElementById("bot").style.display="none";
		document.getElementById("conversation_wait").style.display="none";
	}
	
	function createRequestObject() {
		var tmpXmlHttpObject;

		//depending on what the browser supports, use the right way to create the XMLHttpRequest object
		if (window.XMLHttpRequest) {
			// Mozilla, Safari would use this method ...
			tmpXmlHttpObject = new XMLHttpRequest();

		} else if (window.ActiveXObject) {
			// IE would use this method ...
			tmpXmlHttpObject = new ActiveXObject("Microsoft.XMLHTTP");
		}

		return tmpXmlHttpObject;
	}

	//call the above function to create the XMLHttpRequest object
	var http = createRequestObject();

	function requestConversation(userInput) {
		if (userInput && userInput != "") {
			//make a connection to the server ... specifying that you intend to make a GET request 
			//to the server. Specifiy the page name and the URL parameters to send
			var formatedInput = userInput.replace("#hide#", "");
			
			http.open('get', 'Conversation.jsp?userInput=' + formatedInput);
			//assign a handler for the response
			http.onreadystatechange = processResponse;
			displayConversation('req', userInput);
			
			//actually send the request to the server
			http.send(null);
		}
	}

	function processResponse() {
	
		//check if the response has been received from the server
		if (http.readyState == 4) {

			//read and assign the response from the server
			var response = http.responseText;

			//do additional parsing of the response, if needed

			//in this case simply assign the response to the contents of the <div> on the page. 
			//alert("response = "+response);
			if(response.indexOf("!#GET_USER_ID#!")>-1){
				requestConversation("#hide#"+userID); 
				return;
			}
			displayConversation('resp', response);
		}
	}


	function displayConversation(reqResp, showText) {
		if (reqResp == 'req' && showText.indexOf("#hide#")==-1 ) {
			document.getElementById("conversation_wait").style.display="block";
			conversationElement.innerHTML += "<div class='message new right'><div class='avatar'><img src='images/user.jpg' width='36' height='36' alt='User'  /></div><div class='replies'>"
					+ showText + "</div></div>";
		} else if (reqResp == 'resp') {
				conversationElement.innerHTML += "<div class='message new'><div class='avatar'><img src='images/MaleBuddy.png' width='36' height='36' alt='Accenture Buddy' /></div><div class='replies'>"
					+ showText + "</div></div>";
				document.getElementById("conversation_wait").style.display="none";
		}

		// scroll to the bottom
		conversation_bodyElement.scrollTop = conversation_bodyElement.scrollHeight;

	}
	
	

	function converseTyped() {
		var final_span = document.getElementById('final_span');

		if (document.getElementById('userInputTyped').value != "") {
			requestConversation(document.getElementById('userInputTyped').value);
			document.getElementById('userInputTyped').value = "";
			document.getElementById('userInputTyped').select();
		} else if (final_span.innerHTML != "") {
			requestConversation(final_span.innerHTML);
			final_span.innerHTML = "";
		}
		return false;
	}

	
	function openMe(openURL){
		window.open(openURL, "", "width=1000,height=700");
		
	}
	
	document.getElementById("userInputTyped")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("sendText").click();
    }
});

