// copyright(c) Ingo Schmidt-Philipp. Free to use unmodified for everyone. example and change requests at tricutis.de 
// htmldir generates a directory of all <h headers of the same level in a given html text
// this directory is inserted into a div, clicking on the headline inserts paragraph contents to a second div
// so you have a toc for html, at last (restricted to a single level of headlines so far

// example html:
// include the text of this file anywhere before first calling it 
// <script src="htmldir.js"></script>
// example css
// <STYLE type="text/css">
//  .dirb { background-color:lightblue;}	/* css for directory buttons (calling the sections) */
//  .dirh { font-size:120%;font-weight:bold;}	/* css for the headers in the text =(<h-text) */
//  .dirc { font-size:120%;}			/* css for the headers in the text (between <h-tags)*/
// </STYLE>
// example html where the directory should show up - for example in a table:
// <table><tr>
// <td width=25%><div id="wodir">Hier erscheint ein Schnell-Inhaltsverzeichnis (nur mit Javascript)</div>
// <td><div id="woinh">
// An dieser Stelle können Sie den gesamten Inhalt des Dokuments sehen.
// <br>Klicken Sie auf eine der Überschriften links um den Inhalt zu holen.
// </div>
// </table>

// part of the htm-code which should be indexed into the quick-toc can be in a div (or anything with an id)
// like this
// <div id=mycontent>

// example html where to call htmldir (should be at the end of the document, except for the script itself):

//<script>htmldir("mycontent",4,'wodir','woinh');</script>
// in case "mycontent" is not found, the whole doc will be indexed -- from the first <hn-tag

//<script>htmldir('addbutton',1,'<font size=-1>Inhaltsverzeichnus [ein/ausblenden]</font>');</script>


var isie4up = (document.all) ? 1 : 0;
var sections = new Array();
var outputdirdiv="showdirdiv";
var outputdiv="showdiv";
var trenn= "<H3>";
var trennde="</H3>";
var diraction="onmouseover"; //onmouseover
var diraction="onclick"; //onclick
var htmldir_hlevel=3;
var htmldir_buttonpressed_status=1;
var htmldir_button_ht1=1;
var htmldir_textvorausgabe="";

function htmldir_buttonpressed() {
var odiv = document.getElementById(outputdirdiv); 
var rdiv = document.getElementById(outputdiv); 
if (htmldir_textvorausgabe=="") htmldir_textvorausgabe=rdiv.innerHTML;

if (htmldir_buttonpressed_status==1) 	
 {odiv.innerHTML=htmldir_button_ht1;htmldir_buttonpressed_status=2;rdiv.innerHTML=htmldir_textvorausgabe;}
else
 {odiv.innerHTML=htmldir_button_ht1+htmldir_button_ht2;	htmldir_buttonpressed_status=1;}
}

function htmldir_addbutton(wo,text,reserve) {
var odiv = document.getElementById(outputdirdiv); 
var bu="<div class=dirb onclick='htmldir_buttonpressed();'>"+text+"</div>"; 
htmldir_button_ht1=bu;
htmldir_button_ht2=odiv.innerHTML;
odiv.innerHTML=htmldir_button_ht1+htmldir_button_ht2;
}//

function htmldir(divname,hlevel,poutputdirdiv,poutputdiv) {

 if (divname=="addbutton") {htmldir_addbutton(hlevel,poutputdirdiv,poutputdiv);return;}

 if (typeof hlevel =="number") {} else {hlevel=4}
 htmldir_hlevel=hlevel;
 if (typeof poutputdirdiv=="string") {outputdirdiv=poutputdirdiv;} 
 if (typeof poutputdiv=="string") {outputdiv=poutputdiv;} 
 var ht = "";
 var indiv = document.getElementById(divname);
 if (indiv) ht = indiv.innerHTML;
 if (ht!=="") {} else {ht=self.document.body.innerHTML;}
  
 //ht = indiv.innerHTML;

trenn= "<H"+hlevel+">";
trennde="</H"+hlevel+">";
trenn= "<H";
trennde="</H";
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
if(htmldir_textvorausgabe=="")htmldir_textvorausgabe=showdiv.innerHTML;
tx=vornach[1];

// delete all text following a higher <h level than htmldir_hlevel
var t="";
  t+=" htmldir_hlevel="+htmldir_hlevel+" ";

var pos=0;
for (si = htmldir_hlevel-1; si >= 0 ; si--) {
  pos = tx.indexOf("<H"+si); if(pos==-1)pos = tx.indexOf("<h"+si);
  t+="<h"+si+",pos="+pos+" ";
  if (pos>0) {   tx = tx.substring(0,pos);} // alert("deleted:"+tx.substring(pos));
}//si
tx=deltags(tx,"SCRIPT");// remove scripts -- if whole body is used i'll include myself....
//alert(t);
showdiv.innerHTML= "<div class='dirh'>"+vornach[0]+"</div>"
		+"<div class='dirc'>"+tx+"</div>";

}/////////////

function generate_directory (sections,level) {
var dir='';
if (sections.length < 2) return dir;
var si,endpos,endtpos=0; var e,shd,sbo=' ';

for (si = 0; si < sections.length; ++ si) { 
e = sections[si];
if (si==0 && e.length > 0)
  { e=""; }// ignore anything before first <h tag
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

