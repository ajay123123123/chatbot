package com.buddy.app;


import java.util.*;

import com.ibm.watson.developer_cloud.conversation.v1.ConversationService;
import com.ibm.watson.developer_cloud.conversation.v1.model.Intent;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageRequest;


public class ConversationHelper {
	static String workspaceId = "62d6f4da-bc61-4296-bb83-2ef29b3ce439"; // replace with your own
	static String userId = "86da0957-6abd-41e6-9b7a-186f4d03a977";// replace with your own
	static String password = "025EqR862y68";// replace with your own
	
	static private String validUIDs = "john,bob,bill";
	static private String userQAArr[][]={
			{"What is your pet name?","Tommy"},
			{"What is your birth city?","Mumbai"},
			{"What is your favorite game?","Cricket"},
			{"What is your favorite food?","Gulab Jamun"},
			};
	public static synchronized ConversationService getConvService(){
		ConversationService service = new ConversationService("2016-07-11");
		service.setUsernameAndPassword(userId, password);
		return service;
	}
	
	public static synchronized ConversationResponse converse(ConversationResponse convResp){
		MessageRequest newMessage;
		if(convResp.service== null){
			convResp.service = getConvService(); 
		}
		if(convResp.response == null || convResp.response.getContext()==null){
				newMessage = new MessageRequest.Builder().inputText(convResp.inputText).build();
		}else{
			newMessage = new MessageRequest.Builder().context(convResp.response.getContext()).inputText(convResp.inputText).build();
		}
		convResp.response  = convResp.service.message(workspaceId, newMessage).execute();
		
		// check if any action coming from the conversation servive
		if(convResp.getResponse().getContext().containsKey("action") 
				&& ! convResp.getResponse().getContext().get("action").equals("")){
			convResp = processResponseForAction(convResp);
		}
		
		return convResp;
	}
	
	@SuppressWarnings("unchecked")
	public static synchronized String getResponseText(ConversationResponse convResp){
		
		String outputStr="I am sorry my brain is not functioning well - echo - "+convResp.inputText;
		if(!convResp.response.getOutput().isEmpty()){
			outputStr = "";
			ArrayList<String> arrayResp =  (ArrayList<String>) convResp.response.getOutput().get("text");
			for(int i=0; i<arrayResp.size(); i++){
				outputStr +=  arrayResp.get(i);
			}
		}
		return outputStr;
	}
	
	public static synchronized Intent getIntentFromResponse(ConversationResponse convResp){
		List<Intent> intents  = convResp.response.getIntents();
		return intents.get(0);
	}
	
	
	private static String validateUID(String uid){
		String result="false";
		
			if(validUIDs.contains(uid)){
				result="true";
			}
		
		return result;
	}
	
	private static String getQuestion(){
		Random random = new Random();
		int i = random.nextInt(4);
		return userQAArr[i][0];
	}
	
	private static String validateAnswer(ConversationResponse convResp){
		String result="false";
		String question  = convResp.getResponse().getContext().get("verification_question").toString();
		String answer  = convResp.getResponse().getContext().get("user_input").toString();
		for(int i=0; i<userQAArr.length; i++){
			if(question.equals(userQAArr[i][0]) && answer.equalsIgnoreCase(userQAArr[i][1])){
				result="true";
				break;
			}
		}
		
		return result;
	}

	
	public static synchronized ConversationResponse processResponseForAction(ConversationResponse convResp){
		
		// if action = 

		if(convResp.getResponse().getContext().get("action").equals("validate_uid")){
			convResp.inputText = validateUID(convResp.getResponse().getContext().get("user_input").toString());
			convResp = converse(convResp); 
			
		}else if(convResp.getResponse().getContext().get("action").equals("provide_verification_question")){
			@SuppressWarnings("unchecked")
			ArrayList<String> arrayResp =  (ArrayList<String>) convResp.response.getOutput().get("text");
			String question = getQuestion();
			arrayResp.add(question);
			convResp.getResponse().getContext().put("verification_question", question);
			convResp.response.getOutput().put("text", arrayResp);
		}if(convResp.getResponse().getContext().get("action").equals("validate_verification_question")){
			convResp.inputText = validateAnswer(convResp);
			convResp = converse(convResp);
		}
		
	
		return convResp;
	}
	


}