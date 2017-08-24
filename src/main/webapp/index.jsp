<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>ABC Insurance Co.</title>
<link rel="shortcut icon" href="images/MaleBuddy.png" />
<link type="text/css" rel="stylesheet" href="css/normalize.css">
<link type="text/css" rel="stylesheet" href="css/jquery.mCustomScrollbar.min.css">
<link rel="stylesheet" href="css/BUBBLE.css">
<link rel="stylesheet" href="css/dialog.css">
<link rel="stylesheet" href="css/main.css">
</head>
<%session.invalidate();%>
<body bgcolor="#e3efd6">
<DIV class="chatAppParent" id="" ><table width=100% height=100%>
<tr bgcolor=#dbd7df>
	<td valign=top>
	<table width=100%>
	<tr>
		<td width=10%>&nbsp;</td>
		<td width=80%><center><h1>ABC Insurance Corp</h1></center></td>
		<td width=10%><input type="button" value="Chat" class="messageSubmit1"  onclick="return openBuddy();"></td>
	</tr>
	<tr>
		<td>&nbsp;</td>
		<td></td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td>&nbsp;</td>
		<td>&nbsp;</td>
		<td>&nbsp;</td>
	</tr>
	</table>
	</td>
</tr>
</table></div>

<DIV class="chatApp" id="bot" style="display:none;" >
		<table width=100% cellpadding=0 cellspacing=0 >
			<tr>
				<td>
					<table width=100% cellpadding=0 cellspacing=0 >
						<tr class="title" >
							<td   align=center width=40px ><!-- <img 
									src="images/FemaleBuddy.png" width=60px alt="Accenture Buddy"> -->
							</td>
							<td><h1>My<span>Chat Bot</span></h1></td>
							<td  align=center width=40px><!--  <a
								href="javaScript:voiceOnOff();"> <img id="speaker"
									src="images/speaker-up.png" width=25px alt="Speaker On/Off"></a>-->
							</td>
							<td align=center width=40px><a
								href="javaScript:closeDialog();"> <img
									src="images/Close1.png" border="0" width=25px
									alt="Close Dialog"></a></td>
						</tr>
						<tr>
							<td bgcolor=#ffffff  align="center" colspan=4>
							
								<div align="center"  id="conversation_wait"  style="height: 350px; position:absolute; z-index:10; display:none;  align-items: center; justify-content: center" >
								<p><br><br><br><br>&nbsp</p>
								<img src="images/loading.gif" width=60px alt="wait">
								</div>
								<div  id="conversation_body" class="messages" style="height: 420px; overflow-y: auto; z-index:1;">
									<div class="messagesContent">
										<div id="conversation" class="messageMargin" >
										</div>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<td colspan=4 >
							<table width=100% border=0 cellpadding=0 cellspacing=0 >
									<tr>
										<td class="messageBox"><input type="text" id="userInputTyped" class="messageInput" placeholder="Type message here..." ></td>
										<td class="messageBox">
										<input type="button" id="sendText" value="Send" class="messageSubmit"  onclick="return converseTyped()"></td>
									</tr>
								</table>
							</td>
						</tr>
						<tr class="messageBox">
							<td colspan=4 >&nbsp;
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</DIV>
</body>
</html>

	

<script language="Javascript" type="text/javascript">
<!--
	var userID = "ATUL";
	var firstTime=true;
-->
</script>


<SCRIPT src="scripts/chatBot.js"></SCRIPT>	

<script language="Javascript" type="text/javascript">
<!--
	// start conversation
	
	function openBuddy(){
		if(firstTime){
			firstTime=false;
			requestConversation("#hide#");
		}
		openDialog();
	}

	-->
</script>