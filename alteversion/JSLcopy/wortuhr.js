// copyright Ingo Schmidt-Philipp@spsoft.de & the authors
// Please notify me if you use it at  Isp.JavaScript@spsoft.de 
// please don't modify but send change suggestions. Thank You
// Examples at www.abhyanga.de
// 2 modi wortuhr_in_line oder an festem platz default=wortuhr_in_line->nicht loeschen

if(typeof wortuhr_in_line=="undefined")var wortuhr_in_line =1;
if(typeof wortuhr_modus=="undefined")var wortuhr_modus="digital"; // "lwort";
if(typeof wortuhr_size=="undefined")var wortuhr_size="10pt";

var includetime=new Date();
if(typeof wortuhr_vdiff=="undefined") ; else { //vergleichen mit...angefordert
 var hms=wortuhr_vdiff.split(':');
 var wortuhr_vdatum=new Date(includetime.getFullYear(),includetime.getMonth(),includetime.getDate(),hms[0],hms[1],hms[2]);
}
var wortuhr_type =2;
//

// init a div
var wortuhr_timeout=0;
var wortuhr_disappear=30*1000;
if (wortuhr_in_line==1) wortuhr_disappear=0;
var wortuhr_reappear=300;

var wortuhr_img_loc ="bilder/punktpfeil.gif";
var wortuhr_posiabs = "";
if  (!document.getElementById)  {
wortuhr_posiabs = " ";
} 
else {
var ctyp="div";
if  (document.layers)  {ctyp="layer"}; 

var wortuhr_style = wortuhr_posiabs +"    margin: 0;  padding: 0;  border: 0;"
 + "  background-color:transparent; VISIBILITY: visible; Z-INDEX:2;"
 +  "font-size:"+wortuhr_size+";color:black; "
var makecontainer = 
   "<"  +ctyp  + " id=\"wortuhrdiv\" style=\"" +  wortuhr_style +"\"   > "
  + "<span id=wortuhrtxt ></span>"
//  + wortuhr_in_line ? "" : '<input type="button" value="x" onclick="show_wortuhr(0);">'  
+"</" + ctyp + "> " ; 

document.write(makecontainer);
show_wortuhr();
}

function about_wortuhr() {
show_wortuhr();
alert("Diese Uhr in Wörtern ist ein Javascript von Ingo Schmidt-Philipp. "
+ "Wenn Sie Bemerkungen anbringen möchten oder etwas benutzen möchten"
+ " bitte ich um eine kleine mail an isp.javascript@spsoft.de Danke"); 
}

function show_wortuhr(a) {
var q
if (typeof a =="string" ) q=a
else if (typeof a =="number" )
       { if(a==0) q="";   
         else { q = choose_wortuhr(a);}}
else { q = choose_wortuhr();}

if (q=="clear") q = "";

q= '<a  STYLE="text-decoration:none;color:black;" href="JavaScript:change_wortuhr();">'
    +q+'</a>'; 


var span = document.getElementById("wortuhrtxt");
span.innerHTML = q;

if (wortuhr_timeout !=0) 
   {clearTimeout(wortuhr_timeout); 
    wortuhr_timeout  =0; }

if (q == "" ||  wortuhr_disappear==0)
{wortuhr_timeout=setTimeout("show_wortuhr();",wortuhr_reappear); }
else
{wortuhr_timeout=setTimeout("show_wortuhr(0);",wortuhr_disappear); }

if(typeof jetzt=="undefined") ; else { delete jetzt;}
jetzt=new Date();

if(typeof wortuhr_vdiff=="undefined") ; else { //vergleiche läuft
 //wortuhr_vdiff=hh:mm:ss-> bei include in _vdatum umgesetzt

 var dauersec=Math.ceil((jetzt.getTime()-wortuhr_vdatum.getTime())/(1000)) // in seku
 if(dauersec<0)dauersec+=24*60*60;
 var dauer=Math.ceil((jetzt.getTime()-wortuhr_vdatum.getTime())/(10*60*60)) // in 100stel stunden
 dauer=dauer/100 //gerundet in Stunden 2 dezimalen   wie: Math.round(original*100)/100
 if(dauer<0)dauer+=24;


 var updiff = document.getElementById("wortuhrdiff"); // ein element wo stundenanzahl rein soll
 if(updiff)
  if(typeof updiff.innerHTML !=="undefined")
   if(dauersec<60*60)
   {	dauermin=parseInt(dauersec/60);
   	dauersec=dauersec-dauermin*60;
   	if (dauersec<10&&dauersec>=0) dauersec='0'+dauersec;
    	updiff.innerHTML = dauermin+':'+dauersec+' Min';
   }
   else	updiff.innerHTML = dauer   +' Std' ;
   
   var up2t = document.getElementById("wortuhr2title"); // ein element wo stundenanzahl rein soll
   if(up2t)
	if(typeof up2t.innerHTML !=="undefined")
	document.title=updiff.innerHTML+' '+up2t.innerHTML;
 } //vergleiche läuft

}//show_wortuhr

function choose_wortuhr() {
if(typeof jetzt=="undefined") ; else { delete jetzt;}
var jetzt = new Date();
var hour = jetzt.getHours();
var min  = jetzt.getMinutes();
var sec = jetzt.getSeconds();
if ( wortuhr_modus=="wort" || wortuhr_modus=="lwort" ) {

  // Extract the hours, minutes, and seconds from the time.   
  if (sec>29 ) min=min+1                // round up minutes 

  // Nearness phrases - this time using an array              
  var n5='genau* *kurz nach*gleich*fast'

  var n5=' * * *gleich*gleich'
  var nach5=' *vorbei*vorbei* * '
  var near=n5.split("*");
  var nachw=nach5.split("*")
 

  var mod=min%5 		// where we are in 5 minute bracket 
 var nachsatz=nachw[mod]
  if ( wortuhr_modus=="lwort" ) out ="Es ist "; else out="";
  out+=near[mod]+" " 		// start building the result 
  if (min>22) hour=hour+1; 	// we are TO the hour... 
  min=min+2		  	// shift minutes to straddle a 5-minute point 

  // Now special-case the result for Noon and Midnight hours  
  if (hour%12==0 & min%60<=4 ) {
    if (hour==12 ) {return out +'Mittag.'}
    return out+'Mitternacht.'
    }

  min=min-(min%5) 		// find nearest 5 mins 
  if (hour>12)
       hour=hour-12; 		// get rid of 24-hour clock 
   else
    if (hour==0) hour=12 ;	// .. and allow for midnight 

  // Determine the phrase to use for each 5-minute segment    
    if (min==0  ) min=0		// add "o'clock" later 
    else if (min==60 ) min=0 	// ditto 
    else if (min== 5 ) out+= 'fünf nach'
    else if (min==10 ) out+= 'zehn nach'
    else if (min==15 ) out+= 'viertel nach'
    else if (min==20 ) out+= 'zwanzig nach'
    else if (min==25 ) out+= 'fünf vor halb'
    else if (min==30 ) out+= 'halb'
    else if (min==35 ) out+= 'fünf nach halb'
    else if (min==40 ) out+= 'zwanzig vor'
    else if (min==45 ) out+= 'dreiviertel'
    else if (min==50 ) out+= 'zehn vor'
    else if (min==55 ) out+= 'fünf vor'
    
   numbers='eins zwei drei vier fünf sechs sieben acht neun zehn elf zwölf '
  var sname= numbers.split(" ")[hour-1] 
 //alert(hour+" "+sname+" "+numbers.split(" ").length+" "+hour); 
out+= " "+sname // add the hour number 
  if (min==0 ) out+= " Uhr"  	// .. and o'clock if exact 
  out += " "+nachsatz
  
  if (wortuhr_modus=="lwort") {
    var d=new Date();
    var monname = new Array("","Januar","Februar","März","April","Juni","Juli","August","September","Oktober","November","Dezember");
    var TagInWoche = d.getDay();
    var wtname = new Array("Sonntag", "Montag", "Dienstag", "Mittwoch",
                          "Donnerstag", "Freitag", "Samstag");
    var tag= wtname[TagInWoche] + ' '+d.getDate()+'.'+monname[d.getMonth()]+' '+d.getFullYear();
    out =  out + '  ' + tag;
  }
  return out	// return the final result 
}// wort oder lwort
else {//digital
if (hour<10) hour="0"+hour;
if (min<10) min="0"+mon;
if (sec<10) sec="0"+sec;

return hour+':'+min+':'+sec
}//digital

}
function change_wortuhr() {
if (wortuhr_modus=="wort") wortuhr_modus="digital";
else if (wortuhr_modus=="digital") wortuhr_modus="lwort";
else if (wortuhr_modus=="lwort") wortuhr_modus="wort";
else wortuhr_modus="wort";
//about_wortuhr();
}
