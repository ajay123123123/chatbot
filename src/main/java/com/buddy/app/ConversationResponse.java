package com.buddy.app;

import com.ibm.watson.developer_cloud.conversation.v1.ConversationService;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageResponse;

public class ConversationResponse {
	public MessageResponse response;
	public ConversationService service;
	public String inputText;

	public ConversationService getService() {
		return service;
	}
	public void setService(ConversationService service) {
		this.service = service;
	}
	public MessageResponse getResponse() {
		return response;
	}
	public void setResponse(MessageResponse response) {
		this.response = response;
	}
}
