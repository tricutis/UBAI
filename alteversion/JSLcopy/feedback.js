// copyright Ingo Schmidt-Philipp@spsoft.de
// free to use for anybody as long as copyright notice is retained
// Please notify me if you use it at  Isp.JavaScript @ spsoft.de 
// please don't modify but send change suggestions. Thank You
// This JS is used to display a big version of a given thumbnail, including a text box (for description)
// it is called by <a href="..." onmouseover="feedback(this)" ..>ttt</a> 
if (typeof testmodus == 'undefined') testmodus=0

var isNN = document.layers ? true : false;
var isIE = document.all ? true : false;
 var dom = (document.getElementById) ? true : false;
var ns5 = ((navigator.userAgent.indexOf("Gecko")>-1) && dom) ? true: false ;
var ie5 = ((navigator.userAgent.indexOf("MSIE")>-1) && dom) ? true : false ;
var ns4 = (document.layers && !dom) ? true : false ;
var ie4 = (document.all && !dom) ? true : false ;
var nodyn = (!ns5 && !ns4 && !ie4 && !ie5) ? true : false ;

function feedback(htobj , addtext) {
var aaa=htobj;
var merkaltHT = htobj.href;

if (typeof addtext == 'undefined') addtext="";
if (typeof addtext == 'number') {
 var option=addtext;addtext="";
 if (option==9){//neues fenster machen, aber aus titel
 var twin=window.open(htobj.title,"incwindow","width=400,height=300,resize=yes,scrollbars=yes,status=0,toolbar=no,menubar=no");
 return true;
 }
 if (option==8){// feedbackn: den titel damit onclick geht
 merkaltHT=htobj.title;
 //und unten gehts weiter
 }
}//open number

var closer ='<A href="Javascript:void(0);" title="'+ merkaltHT+ '" onclick="unfeedback(this);">ausblenden <a>';
//var nopener='<A href="Javascript:void(0);" title="'+ merkaltHT+ '" onclick="feedback(this,9);">vergrößern <a>';
var nopener='';
var iecloser ='<INPUT TYPE="button" VALUE="close" onClick="Javascript:unfeedback(this);">';
iecloser="";;

//htobj.id = "feedbackd" + Math.random();

//find parent title
var tit="";
var p=htobj.parentNode;
while(typeof p == 'object'){
   tit=p.title;
   if (tit !== "") break;
   p=p.parentNode;
  }
if (tit == "") tit=htobj.baseURI; //notfalltitel: die url
var ref=htobj.baseURI;  
var ref=document.location;  

//alert("parent="+p.nodeName+" tit="+tit);

var action='http://abhyanga.de/feedback.php?hl='+escape(tit); 
var fstyle=" style='font-size:12px;font-fact:arial;' ";
var istyle=" style='background-color:#eee;border:1px solid #aaa;font-size:12px;' ";
var iform="<table border=1><tr><td> <div style='font-size:14px;font-fact:arial;'>  Feedback: Kommentar abgeben"+

' <form name=fbf method=post style="margin:0;padding:0;" action="' + action + '"> ' +
'<table><tr '+fstyle+'>'+
    '<td colspan=9>mein Thema<input TYPE="text" NAME="mytopic" SIZE="60" '+istyle+' value="'+tit+'">'+
'<tr><td colspan=9><textarea name="text" cols=80 rows=8'+istyle+'></textarea>'+
'<tr '+fstyle+'>'+
    '<td>Name  <input TYPE="text" NAME="name"  SIZE="20" '+istyle+'>'+
    '<td>email <input TYPE="text" NAME="email" SIZE="20" '+istyle+' >'+
              '<input TYPE="hidden" NAME="ref"   value="'+ref+'" >'+
    '&nbsp; &nbsp; <input TYPE="submit" NAME="feedbackgo" value="Senden" '+istyle+'>'+
'</table></form> '+
'</div></table>';

     

//htobj.innerHTML = itit+iform;
//if (isIE) htobj.innerHTML = iecloser+iform;
//else htobj.innerHTML =   closer+ nopener+"<br>"+ iform;

if (isIE) htobj.outerHTML = iform; // einfach -- macht das ganze <a weg
else      htobj.innerHTML = iform; // problem: alles ist noch im <a

htobj.href='Javascript:void(0);';
htobj.onmouseover='';
return true;
} // feedback

function unfeedback(htobj) {
if (typeof htobj == "object")
     var ltext = htobj.title;
else var ltext = htobj;

// this ist das unter-A, das den close-link beinhaltet. Parentnode ist das Original.
var par=htobj.parentNode;
//alert("unincluding"+htobj.innerHTML);
var k="'";
if (isIE) 
     par.innerHTML='<INPUT TYPE="button" VALUE="open" onClick="Javascript:feedback('+k+ltext+k+')">';

else par.innerHTML='<A href="Javascript:void(0);" title="'+ltext+'" onclick="feedback(this,8);return true" >einblenden</a>';
return true;
} // sbig

 
