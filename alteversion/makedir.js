// copyright Ingo Schmidt-Philipp. Just ast for permission to use if you like it at  isp.Javascript@spsoft.de example at www.abhyanga.de
// printmain: opens up a printerfriendly window from any html with an id
// (default = div named "main")
// plus creates a directory(toc) of parts seperated with <Hn headlines
// seperate printable 
// valuable to print contents of a scrolled div or any Hx seperated part
// finally printing is done with the browser print-key

//to call  printmain:   printmain()  --> print whole object "main" (eventually divide into into sections) 
//to call  printmain:   printmain("xyz")  --> same for object "xyz"
//to call  printmain:   
// call example: <a href="JavaScript:printmain('wirk',4) ">Druckeroptimierte Anzeige </a> 
// (this prints the div id="wirk" with parts displayed at level of "<H4")  

var isie4up = (document.all) ? 1 : 0;
var sections = new Array();
var outputdirdiv="showdirdiv";
var outputdiv="showdiv";
var trenn= "<H3>";
var trennde="</H3>";
var diraction="onclick";

function makedir(divname,hlevel,poutputdirdiv,poutputdiv) {
 if (typeof hlevel =="number") {} else {hlevel=4}
 if (typeof poutputdirdiv=="string") {outputdirdiv=poutputdirdiv;} 
 if (typeof poutputdiv=="string") {outputdiv=poutputdiv;} 
 

 
 var indiv = document.getElementById(divname);  
 ht = indiv.innerHTML;

trenn= "<H"+hlevel+">";
trennde="</H"+hlevel+">";
//msiemakes html tags uppercase -- if mozilla change to uppercase too
if (isie4up) {} else
{ // ht=changeall(ht,trenn,trenn.toUpperCase());
  // ht=changeall(ht,trennde,trennde.toUpperCase());
  ht=changeall(ht,'<h','<H');
  ht=changeall(ht,'</h','</H');
}

//split into parts divided by <h tags
sections=ht.split(trenn);  
//generate directory html
ixinfo = generate_directory(sections); 

//document.write("<br>makedir hllen="+ht.length+" sections="+sections.length);


//insert it into given name
var odiv = document.getElementById(outputdirdiv);  
odiv.innerHTML=ixinfo;
}


function changeall(s,from,to) {  // using regexp
var RegMatch = new RegExp(from, "gi")  
var r= s.replace(RegMatch,to);
 return r;
}


function deltags_reg(s,ptag) {  /*  Remove given html tags */
tag =ptag.toUpperCase();
var t='<'+tag;
var et = "";
if (tag=='IMG') {et='>';}
else {et='/' +tag +'>';}

// problem bei diesem pattern ist, dass vom ERSTEN bis zum LETZTEN ende gematcht wird.
// also weitere tags drin verschwinden :-(

var RegMatch = new RegExp(t+".+"+et,  "gi") 

r = s.replace(RegMatch,"");
 return r;
}



function changeall_old(s,from,to) {  /* change from anycase to to every occurance */
// nötig weil replace nur eins replaced 
var es="$ESC$"
var temp=from.toUpperCase()+es+from.toLowerCase()
var froma =temp.split(es);
var fr=""
var r=s;
for( var ul = 0;ul < froma.length  ; ++ul  )
{ fr = froma[ul];
   if (to.indexOf(fr) == -1) {
      while(r.indexOf(fr)> -1 ) 
        { r = r.replace(fr,to); }
   }
 } // ul, lower, upper
  return r;
}

function deltags(s,ptag) {  /*  Remove given html tags */
var tag=ptag.toUpperCase();
var t='<'+tag;
var r="";var intag="";
var rest=s;
if (isie4up) {} else {rest=changeall(rest,t,t.toUpperCase()) };

if (tag=='IMG') {et='>';}
else {var et='/' +tag +'>';
        if (isie4up) {} else {rest=changeall(rest,et,et.toUpperCase())};        
}

for( i = rest.indexOf(t); i > 1; i = rest.indexOf(t ) )
 { r +=  rest.substring(0,i);
  rest = rest.substring(i);
  i = rest.indexOf(et);
  if (i>0) {  intag = rest.substring(0,i); rest = rest.substring(i+et.length);  };
  }
  r+=rest;
  return r;
  }

function showsection(nr) {
var showdiv=document.getElementById(outputdiv);
var e=sections[nr];
var vornach = e.split(trennde);
var shd=vornach[0];
showdiv.innerHTML="<div class='dirh'>"+vornach[0]+"</div>"
		+"<div class='dirc'>"+vornach[1]+"</div>";
}/////////////

function generate_directory (sections,level) {
var dir='';
if (sections.length < 2) return dir;
var si,endpos,endtpos=0; var e,shd,sbo=' ';

for (si = 0; si < sections.length; ++ si) { 
e = sections[si];
if (si==0 && e.length > 0)
  {  }
vornach = e.split(trennde);
shd=vornach[0];
shd=changeall(shd,"<hr>"," ");// eliminate some tags in headlines
shd=changeall(shd,"<br>"," ");// eliminate some tags in headlines
shd=deltags(shd,'a');
shd=deltags(shd,'img');// img as last as the end ">" is so universal
oncl='showsection('+si+')';
dir+="<div class=dirb "+diraction+"='"+oncl+"'>"+shd+'</div>'; // button to display to showdiv 
} // si
//alert('dir inhalt:'+dir);
return dir;
}

