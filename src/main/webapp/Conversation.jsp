<%@page import="java.util.*, java.lang.*, com.buddy.app.*"%>
<%
	String userInputForDialog = request.getParameter("userInput");
	ConversationResponse convResp = (ConversationResponse) session.getAttribute("convResp");
	
	//check if first request
	if(convResp == null){ // first reques
		convResp = new ConversationResponse(); // create new conversation object
		convResp.inputText = ""; // set the input text blank
	}else{
		//Consequent requests
		convResp.inputText = userInputForDialog; // end user input
	}

	try{
		convResp = ConversationHelper.converse(convResp);
		out.print(ConversationHelper.getResponseText(convResp));
	}catch (Exception e){
		System.out.println("Error - " + e.toString());
		out.print("I am not ready at this moment");
	}
	session.setAttribute("convResp", convResp);
%>


