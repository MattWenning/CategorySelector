<%
	Set TheDB = Server.CreateObject("ADODB.Connection")
    TheDB.Mode = adModeReadWrite
    TheDB.Open ("PROVIDER=Microsoft.Jet.OLEDB.4.0;DATA SOURCE=" & Session("DataSrc"))
    
    Dim WriteLine
    
    ThisCatID = request("CatId")
    
	TheSQL = "SELECT * FROM Categories Where CategoryMasterID=" & ThisCatID & " AND C_Auth<=" & Session("U_Auth") & " ORDER BY Categories.CatDisplayOrd;"
	
	Set rsSub=Server.CreateObject("ADODB.Recordset")
	rsSub.Open TheSQL,TheDB
	
	If NOT rsSub.EOF And NOT rsSub.BOF Then
		rsSub.MoveFirst
		While NOT rsSub.EOF 
			SubCatName = rsSub("CategoryName")
			SubCatID = rsSub("CategoryID")    
			WriteLine = WriteLine & "{""SubCatId"":""" & SubCatID & """, ""SubCatName"":""" & GetMagicQuotes(SubCatName) & """, ""SubExist"":""" & CheckForSubs(SubCatID) & """},"
			rsSub.MoveNext
		Wend
	Else
		' No Records Returned
	End if
	
	rsSub.Close
	
	Set rsSub=Nothing
	
	If Len(WriteLine) > 0 Then
		WriteLine = Left(WriteLine, Len(WriteLine)-1)
	End If
	
	Response.Write "{ ""Category"": [" & WriteLine & "]}"

Function CheckForSubs(ThisCatID)
	CheckSQL = "SELECT * FROM Categories Where CategoryMasterID=" & ThisCatID & " AND C_Auth<=" & Session("U_Auth") & " ORDER BY Categories.CatDisplayOrd;"
                   Set rsSub2=Server.CreateObject("ADODB.Recordset")
					rsSub2.Open CheckSQL,TheDB
					If NOT rsSub2.EOF And NOT rsSub2.BOF Then
				      rsSub2.MoveFirst
				      While NOT rsSub2.EOF 
				      		CheckForSubs = True
        					
				          rsSub2.MoveNext
				          Wend
				       Else
				 	    CheckForSubs = False
				       End if
				    rsSub2.Close
				    Set rsSub2=Nothing

	
	End Function
	Function GetMagicQuotes(strString) 
		if inStr(strString, """") Then
			strString = Replace(strString, """", "\""")
		End If

		GetMagicQuotes = strString

	End Function
%>