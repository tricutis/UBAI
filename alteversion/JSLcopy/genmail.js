
// generate an email address into a document (spam security) 

genmail_subject="";
function genmail(to,dom,linktext,sj)
{
var at="@";
if (to == "subject") {genmail_subject = dom; return true;}
if (genmail_subject =="") 
{var t=document.URL;
  if(t.substr(0,7)=="http://") {t=t.substr(8) }
  if(t.substr(0,8)=="file:///") {t=t.substr(11) }
 genmail_subject=t;}
var subject=genmail_subject;
if (typeof sj !="undefined") subject=sj;
if (subject!="") { subject = "?subject="+subject } 

var email=to+at+dom;
var ltxt=email;
if (typeof linktext !="undefined") ltxt=linktext;
var elink='<A href="mailto:' + email + subject+ '">' + ltxt + '</a>';
if (to.indexOf("keineeigne")>0) {}
else {document.write(elink);}
}