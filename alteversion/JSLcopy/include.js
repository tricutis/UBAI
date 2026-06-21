// copyright Ingo Schmidt-Philipp@spsoft.de
// free to use for anybody as long as copyright notice is retained
// Please notify me if you use it at  Isp.JavaScript@spsoft.de 
// please don't modify but send change suggestions. Thank You
// This JS is used to display a big version of a given thumbnail, including a text box (for description)
// it is called by <a href="..." onmouseover="include(this)" ..>ttt</a> 
if (typeof testmodus == 'undefined') testmodus=0

var isNN = document.layers ? true : false;
var isIE = document.all ? true : false;
 var dom = (document.getElementById) ? true : false;
var ns5 = ((navigator.userAgent.indexOf("Gecko")>-1) && dom) ? true: false ;
var ie5 = ((navigator.userAgent.indexOf("MSIE")>-1) && dom) ? true : false ;
var ns4 = (document.layers && !dom) ? true : false ;
var ie4 = (document.all && !dom) ? true : false ;
var nodyn = (!ns5 && !ns4 && !ie4 && !ie5) ? true : false ;

function include(htobj , addtext,returntyp,toelement,toelementwidth,iframheight) {
//alert("include:toelement="+toelement+" toelementwidth="+toelementwidth+" iframheight="+iframheight);
var url = htobj.href;
if (!url) url=htobj.title;
var merkaltHT = url;

if (typeof returntyp== 'undefined') returntyp=true;
if (typeof iframheight== 'undefined') iframheight='250px';
if (typeof addtext == 'undefined') addtext="";
if (typeof addtext == 'number') {
 var option=addtext;addtext="";
 if (option==9){//neues fenster machen, aber aus titel
 var twin=window.open(htobj.title,"incwindow","width=400,height=300,resize=yes,scrollbars=yes,status=0,toolbar=no,menubar=no");
 return true;
 }
 if (option==8){// includen: den titel damit onclick geht
 merkaltHT=htobj.title;
 //und unten gehts weiter
 }
}//open number


if (addtext == '') addtext="width='90%'";

var closer ='<A href="Javascript:void(0);" title="'+ merkaltHT+ '" onclick="uninclude(this);">ausblenden <a>';
var nopener='<A href="Javascript:void(0);" title="'+ merkaltHT+ '" onclick="include(this,9);">vergrößern <a>';
var iecloser ='<INPUT TYPE="button" VALUE="close" onClick="Javascript:uninclude(this);">';
iecloser="";;

//htobj.id = "included" + Math.random();
iframstyl="font-size:8pt;width:100%; height:"+iframheight+"; border: 0px; overflow-x: hidden; " ;

ifram=' <iframe src="'+merkaltHT+'" '+addtext +' style="'+iframstyl+'"> </iframe> ';

if (typeof toelement=='undefined') { // den <a tag selbst überschreiben

if (isIE) htobj.innerHTML = iecloser+ifram;
else htobj.innerHTML =   closer+ nopener+"<br>"+ ifram;

htobj.onmouseover='';

} else { 
 var updiff = document.getElementById(toelement); // ein element hiun included werden soll
 if(updiff)
 { if(typeof updiff.innerHTML !=="undefined")
   updiff.innerHTML = ifram;
   //alert("include:ifram="+ifram+" toelementwidth="+toelementwidth);
   if (typeof toelementwidth!=='undefined') 
   updiff.style.width=toelementwidth;
  }
} //if (typeof toelement=='undefined') { // den <a tag selbst überschreiben


return returntyp;
} // include

function uninclude(htobj) {
if (typeof htobj == "object")
     var ltext = htobj.title;
else var ltext = htobj;

// this ist das unter-A, das den close-link beinhaltet. Parentnode ist das Original.
var par=htobj.parentNode;
//alert("unincluding"+htobj.innerHTML);
var k="'";
if (isIE) 
     par.innerHTML='<INPUT TYPE="button" VALUE="open" onClick="Javascript:include('+k+ltext+k+')">';

else par.innerHTML='<A href="Javascript:void(0);" title="'+ltext+'" onclick="include(this,8);return true" >einblenden</a>';
return true;
} // sbig

 
