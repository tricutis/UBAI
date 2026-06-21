// copyright Ingo Schmidt-Philipp@spsoft.de & the authors
// Please notify me if you use it at  Isp.JavaScript@spsoft.de 
// please don't modify but send change suggestions. Thank You
// Examples at www.abhyanga.de
// This JS leaves a div with a quote, where it is included.
// the quote can be changed by clicking on the text
// the quote changes every minute before the change the background becomes grey
// touching the quote with the cursor prevents the change.
// call with:
// <script type="text/javascript" language="JavaScript1.2"> quote_type = 8; quote_color="black"; </script>
// <script type="text/javascript" language="JavaScript1.2" src="http://www.spsoft.de/JSL/aquote.js"> </script>
// the following quote-types are available (default is 6)
// 1: laengere Goethe-zitate (braucht qugoethe.js für die Texte)
// 2: zitate von Bert Hellinger
// 3: kuerzere Goethe-Zitate
// 4: sammlung von spruchweisheiten auf deutsch 
// 5: reserved spsoft sign
// 6: funy murphy-like quotes in english
// 7:gedichte
// 8: Zufällige Auswahl unter (ohne lange)
// 9: Zufällige Auswahl unter allen
//10: textes in english only
//11:zufällige auswahl von nur deutschen texten



// init a div
if (typeof quote_color =="undefined") quote_color="black";
if (typeof quote_inline =="undefined")
{ quote_inline =1;
   quote_timeout = new Array;
   quote_loaderdiv ='<div id=quoteloader style="VISIBILITY: invisible;cursor:hand;"></div>'
var quote_vers = 0;
var quote_disappear=60*1000;
if (quote_inline==1) quote_disappear=0;
var quote_reappear=30*1000;
var quote_types = new Array;
if (typeof quote_type =="undefined") quote_type = 6;
var quote_img_loc ="bilder/punktpfeil.gif";
var quote_img_loc =" ";
var quote_hbefore = " <center><i> " 
var quote_hafter      = "</center></i> "
}

var quote_posiabs = "position:absolute; top:5;  left:1510;  "
var quote_posiabs = ""
if  (!document.getElementById)  {
quote_posiabs = " ";
} 
else {
var quote_container_typ="div";
if  (document.layers)  {quote_container_typ="layer"}; 
quote_makeadiv() ;
}

function quote_makeadiv(ttyp)  {
quote_vers+= 1;
if (typeof ttyp == "number") quote_type = ttyp;
quote_types[quote_vers]=quote_type
quote_timeout[quote_vers]=0

var quote_style = quote_posiabs +"    margin: 0;  padding: 0;  border: 0;"
 + "  background-color:transparent; VISIBILITY: visible; Z-INDEX:2;"
 +  "font-size:14pt;"+quote_color+";"
var quote_contname="quotediv"+quote_vers;
var quote_textname="quote_text"+quote_vers;
var tempbu = quote_inline ? "" : '<input type="button" value="x" onclick="quote_show(0);">'  ;
var tempim = ( quote_img_loc == " ") ? " " : '<img src="'+ quote_img_loc +'" width=30 height=30 align=left onclick="quote_show('+quote_vers+');">' ;
var quote_make_container = 
   "<"  +quote_container_typ  + " id=\""+quote_contname+"\" style=\"" +  quote_style +"\"   > "
  +  tempim
  + tempbu
  + '<div id=\"'+quote_textname+'\"  onclick="quote_show('+quote_vers+',1);"    ' 
+ '  onkeypress="quote_key(this); "  '  
+ '  onmouseover="quote_show('+quote_vers+',4);"  '  
+ '  onmouseout="quote_show('+quote_vers+',5);"  ' 
+ '           > </div>'
+"</" + quote_container_typ + "> " ; 

document.write(quote_make_container+ quote_loaderdiv);
quote_loaderdiv= "";

quote_show(quote_vers);
}

function quote_key(t) {
alert("keypress "+t.innerHTML);
t.focus();t.select();
var cursor="cursor:pointer;cursor:hand;"
var cursor="cursor:crosshair;"
var quote_textname="quote_text"+quote_vers;
var span = document.getElementById(quote_textname);
if (span == null) return false;
var nextappear=quote_reappear;
var nextfun=1;//1=start 2=warn 4=freeze 5=start-noredraw
if (fun==1) {nextfun=2;span.innerHTML = q;span.style.cssText = "background-color:transparent;"+cursor; }
if (fun==5) {nextfun=2;span.style.cssText = "background-color:transparent;"+cursor; }
if (fun==2) {nextfun=1;span.style.cssText = "background-color:grey; "+cursor; nextappear=quote_reappear/5;}
if (fun==4) {nextfun=0;     nextappear=0;span.style.cssText = "background-color:lightgrey;"+cursor ; }

var tidtemp = quote_timeout[quote_vers];
if (tidtemp !=0) 
   {clearTimeout(tidtemp); 
    quote_timeout[quote_vers]  =0; }
alertt= 
(fun+" nf= "+nextfun+" nextapp= "+nextappear);

if (nextappear>0) {
if (q == "" ||  quote_disappear==0)
{tidtemp =setTimeout("quote_show("+quote_vers+","+nextfun+");",nextappear); }
else
{tidtemp =setTimeout("quote_show(0,1);",quote_disappear); }
quote_timeout[quote_vers] =tidtemp;
                                } 

}//f


function quote_show(a,fun) {
if (typeof fun == "undefined") fun=1;

var q
 if (typeof a =="number" )
       { if(a==0) q="";   
         else {quote_vers=a;  q = choose_quote(quote_types[quote_vers]);    }}


if (q=="clear") q = "";

var cursor="cursor:pointer;cursor:hand;"
var cursor="cursor:crosshair;"
var quote_textname="quote_text"+quote_vers;
var span = document.getElementById(quote_textname);
if (span == null) return false;
var nextappear=quote_reappear;
var nextfun=1;//1=start 2=warn 4=freeze 5=start-noredraw
if (fun==1) {nextfun=2;span.innerHTML = q;span.style.cssText = "background-color:transparent;"+cursor; }
if (fun==5) {nextfun=2;span.style.cssText = "background-color:transparent;"+cursor; }
if (fun==2) {nextfun=1;span.style.cssText = "background-color:grey; "+cursor; nextappear=quote_reappear/5;}
if (fun==4) {nextfun=0;     nextappear=0;span.style.cssText = "background-color:lightgrey;"+cursor ; }

var tidtemp = quote_timeout[quote_vers];
if (tidtemp !=0) 
   {clearTimeout(tidtemp); 
    quote_timeout[quote_vers]  =0; }
alertt= 
(fun+" nf= "+nextfun+" nextapp= "+nextappear);

if (nextappear>0) {
if (q == "" ||  quote_disappear==0)
{tidtemp =setTimeout("quote_show("+quote_vers+","+nextfun+");",nextappear); }
else
{tidtemp =setTimeout("quote_show(0,1);",quote_disappear); }
quote_timeout[quote_vers] =tidtemp;
                                } 

}//f

function choose_quote(kind) {
var r=  "-";

if (kind == 0) r="";
if (kind == 9) kind=random_int(1,7)
if (kind == 8) kind=random_int(2,5) // kleinere
if (kind ==10) kind=random_int(6,6) // englische
if (kind ==11) kind=random_int(6,6) // englische
if (kind == 6) r=random_wisdom();//en
if (kind == 7) r= random_poem();
if (kind == 2) r=qhellinger();
if (kind == 3) r=quotegoethe();
if (kind == 1) r=quotegoethe_ref();//requires qugoethe.js
if (kind == 4) r=spruchweisheiten();
if (kind == 5) r="JavaScript Zitategenerator von q.Javascript@spsoft.de"
        +" Information <a href='http://www.spsoft.de/JSL' target='JSL'> hier </a>";
if (kind ==111) r=quotetxt("bilder/zitatgoethe2.txt","<li>");

return  quote_hbefore + r + quote_hafter
}

function random_int(lo,hi) {
var randnr=Math.floor(0.5+Math.random()*(hi-lo));

return randnr+lo
}

function quotetxt(src,trenn) {// geht nicht
var ql = document.getElementById("quoteloader");
var ifr="<div id=quotelframe src='"+src+"'></div>";
ql.innerHTML =ifr; // load it
var qfr = document.getElementById("quotelframe");
var ht=  qfr.innerHTML;
alert(ht);
var r="?quotetxt";
return r
}


function quotegoethe() {
var alle = "?"
  + '$Alles Gescheite ist schon gedacht worden, man mu&szlig; nur versuchen es nochmals zu denken.'
  + '$Das sch&ouml;nste Gl&uuml;ck des denkenden Menschen ist, das Erforschliche erforscht zu haben und das Unerforschliche zu verehren.'
  + '$Einer neuen Wahrheit ist nichts sch&auml;dlicher als ein alter Irrtum. '
  + '$Die Kunst ist eine Vermittlerin des Unausprechlichen.'
  + '$Das Menschenleben ist seltsam eingerichtet. Nach den Jahren der Last hat man die Last der Jahre.'
  + '$Es gibt viele Menschen die sich einbilden, was sie erfahren, verst&uuml;nden sie auch.'
  + '$Wenn du eine weise Antwort verlangst, mu&szlig;t du vern&uuml;nftig fragen.'
  + '$Gegen&uuml;ber der F&auml;higkeit, die Arbeit eines einzigen Tages sinnvoll zu ordnen, ist alles andere im Leben ein Kinderspiel.'
  + '$Gew&ouml;hnlich glaubt der Mensch, wenn er nur Worte h&ouml;rt, es m&uuml;sse sich dabei doch auch was denken lassen.'
  + '$Mi&szlig;verst&auml;ndnisse und Tr&auml;gheit machen vielleicht mehr Irrungen in der Welt als List und Bosheit.'
  + '$Wer das erste Knopfloch verfehlt, kommt mit dem Zukn&ouml;pfen nicht zu Rande.'
  + '$Es h&ouml;rt doch jeder nur was er versteht.'
  + '$Wer nicht mehr liebt und nicht mehr irrt, der lasse sich begraben.'
  + '$Erfahrung ist fast immer eine Parodie auf die Idee.'
  + '$Geschichten schreiben ist eine Art, sich das Vergangene vom Halse zu schaffen.'
  + '$Wer sichere Schritte tun will, mu&szlig; sie langsam tun.'
  + '$Es bleibt jedem immer noch soviel Kraft, das auszuf&uuml;hren, wovon er &uuml;berzeugt ist.'
  + '$Das Gleiche l&auml;sst uns Ruhe, aber der Widerspruch ist es, der uns produktiv macht.'
  + '$Das H&ouml;chste wozu der Mensch gelangen kann, ist das Erstaunen.'
  + '$Die Botschaft h&ouml;r ich wohl, allein mir fehlt der Glaube. (Faust)'
  + '$Der Charakter ruht auf Pers&ouml;nlichkeiten, nicht auf Talenten.'
  + '$Wenn man alle Gesetze studieren wollte, so h&auml;tte man gar keine Zeit, sie zu &uuml;bertreten.'
  + '$Durch nichts bezeichnen die Menschen mehr ihren Charakter als durch das, was sie l&auml;cherlich finden.'
  + '$Wenn man von den Leuten Pflichten fordert und ihnen keine Rechte zugestehen will, mu&szlig; man sie gut bezahlen.'
  + '$Unsere Eigenschaften m&uuml;ssen wir kultivieren, nicht unsere Eigenheiten. '
;
var einz = alle.split("$");
var randnr=Math.floor(1+Math.random()*(einz.length-1));
return einz[randnr]+"  (Goethe)"
}

function qhellinger() {
var alle = "??"
+"$Hoffnung truebt den Blick "
+"$Man tritt in die Sonne, und schon ist es hell "
+"$Was wirklich ist, ist unbeschreiblich<br>doch wer es sieht, der weiss Bescheid "
+"$Was denkbar ist, ist meistens falsch "
+"$Das Wesentliche ist leicht<br>so ist das Wahre "
+"$Wachstum weicht ein bischen ab "
+"$An der Grenze kommt man zur Einsicht "
+"$Entscheidungen sind vorlaeufig "
+"$Besserwisser brauchen wenig Wissen"
+"$Die reine Wahrheit ist gelogen "
+"$Beim Richtigen ist das finden schwer und das Verstehen leicht "
+"$Ordnung ueberwaeltigt "
+"$Selbstbewusstsein ist Wissen um den eigenen Weg "
+"$Was richtig ist braucht niemand zu verteidigen, und was es nicht ist, auch nicht "
+"$Argumentieren heisst: ueber einer Goldader im Sandkasten spielen "
+"$Beim Richtigen gibt es keine Wahl "
+"$Musik, die uns gefällt können wir deswegen nicht auch schon spielen "
+"$Die Antwort keinem, der lauert "
+"$Mit Scheuklappen läuft man schneller "
+"$Man nimmt, was ist, vorübergehend "
+"$Das Eichhörnchen sammelt so viel, weil es vergisst "
+"$Das Optimum ist etwas weniger "
+"$Was man festhält flieht "
+"$Erfahrung wirkt, wenn man sie hinter sich lässt "
+"$Angst heisst: ich halte das Kleinere anstatt des Größeren fest "
+"$Festhalten an Enge ist Verweigerung von Entwicklung "
+"$Wer dem ersten Einwand wiedersteht braucht sich dem zweiten nicht zu beugen "
+"$Ich sehe deinen Stern und folge meinem "
+"$Bessere sind einsam "
+"$Was wir als gut bezeichnen ist oft nur das bequeme "
+"$Triumph ist für das Glück zu wenig "
+"$Nur was wir lieben läßt uns frei "
+"$Gier heisst: haben wollen aber nicht nehmen "
+"$Oft bewahrt die größten Schätze ein Drache "
+"$Oft gelingt das Gute nur durch eine Übertretung "
+"$Die meissten Engel sind gefallen "
+"$Zu seiner Läuterung muss jeder selber glühen "
+"$Achtung vor dem anderen Geschlecht heisst: Es sich vom anderen schenken lassen, doch sein Geheimnis bewahren "
+"$Der Wissende meidet, ewige Liebe zu schwören: er weis um Abschied und Ende und liebt lieber darauf zu "
+"$Auch wenn es nicht bleibt ist es schön, dass es war "
+"$Vorahnung heisst: geheime Absicht "
+"$Das spezifische seelische Gewicht ist gleich der Summe des Gewagten "
+"$Wer ihm folgt, den führt der Tod, wer ihn flieht, den holt er ein "
+"$Gestatte dir die Liebe, dann bist du frei "
+"$Was einmal wird <br> kann jetzt schon sein"

;
var einz = alle.split("$");

var randnr=Math.floor(1+Math.random()*(einz.length-1));
return einz[randnr]+"  (Hellinger)"
} //======================


function spruchweisheiten() {
var alle = "??"
+"$ Erfolg ist die Fähigkeit, von einem Mißerfolg zum anderen zu gehen,ohne seine Begeisterung zu verlieren.(Winston Churchill)"
+"$ Chancen präsentieren sich uns mit Vorliebe in der Maske von Unannehmlichkeiten."
+"$ Jede Dummheit findet einen der sie macht."
+"$ Nicht die Jahre in unserem Leben zählen, sondern das Leben in unseren Jahren zählt.(Adlai E. Stevenson)."
+"$ Wenn das Gehirn so einfach wäre, daß wir es verstehen könnten, wären wir zu dumm, um es zu begreifen.(Jostein Gaarder)."
+"$ Never wrestle with a pig, because you both get dirty, but the pig likes it!"
+"$ Ich arbeite nach dem Prinzip,dass man niemals etwas selbst tun soll, das jemand anderer für einen erledigen kann.(Rockefeller)."
+"$ Es gibt zwei Wege, um glücklich zu sein: Wir verringern unsere Wünsche oder vergrößern unsere Mittel. Wenn du weise bist, wirst Du beides gleichzeitig tun (Benjamin Franklin)"
+"$ Neid ist die aufrichtigste Form der Anerkennung."
+"$ Wähle einen Beruf den du liebst, und du brauchst niemals in deinem Leben zu arbeiten.."
+"$ Weine nicht, weil es vorbei ist, sondern lache, weil es so schön war.."
+"$ Man weiß nie, was daraus wird, wenn die Dinge verändert werden. Aber weiß man denn, was daraus wird, wenn sie nicht verändert werden? (Elias Canetti)."
+"$ Wenn jemand sagt, er habe keine Zeit, bedeutet das nur, daß andere Dinge wichtiger für ihn sind. (Richard Höhn)."
+"$Live as if you were to die tomorrow. Learn as if you were to live forever. (Gandhi)"
+"$Es gibt zwei Dinge, die unendlich sind. Das Universum und die menschliche Dummheit. Allerdings bin ich mir beim Universum nicht ganz sicher. (Albert Einstein)"
+"$Um etwas sauberzumachen, muß etwas anderes dreckig werden. (Aber Du kannst alles dreckig machen, ohne etwas sauber zu bekommen.)"
+"$ Ein Herz, das liebt, ragt an des Himmels Zinne. (Persische Spruchweisheit)"
+"$Man braucht nicht immer denselben Standpunkt vertreten, denn niemand kann einen daran hindern, klüger zu werden. (Konrad  Adenauer)"
+"$Jeder Mensch trägt in sich selbst die potentielle Kraft, um seiner Herr zu werden. (Sou - Tschien)."
+"$Entwicklung ist der Zweck des Lebens, das Leben selbst ist Entwicklung, also ist das Leben selbst Zweck. (Büchner)" 
+"$Es liegt in der menschlichen Natur vernünftig zu denken und unlogisch zu handeln. Anatole France (1844 - 1924)"
+"$ Nur wenn ich die Bedürfnisse meiner Mitmenschen kenne, kann ich sie motivieren. (Vera F. Birkenbihl)"
+"$Ein williges Pferd soll man nicht zuviel reiten. (Martin Luther)"
+"$Denn nur vom Nutzen wird die Welt regiert.  (Cicero)"
+"$Wenn etwas nützlich ist, hört es auf, schön zu sein. (Théophile Gautie)"
+"$ Wer immer nach dem Nutzen strebt,<br>der glaubt wohl, daß er ewig lebt.<br>Sonst würd’ er vor der Frage stutzen: <br>Am letzten Tag, wo bleibt der Nutzen? <br>(Oskar Blumenthal)"
+"$ Bedenke bei jedem Anschaffen und Benutzen eines Gegenstandes, dass dieser ein Produkt menschlicher Arbeit ist und daß Du indem Du ihn verbrauchst, zerstörst, beschädigst, diese Arbeit zerstörst und damit Menschenleben verbrauchst. (Tolstoi)"
+"$ Nichts lohnt sich, außer was ernste Folgen haben könnte.(George Bernard Shaw)"
+"$Ein Wikinger entschuldigt sich nicht und ein Wikinger erklärt nichts (Hägar)<br>Entschuldigung das habe ich nicht gewusst (Sven Glückspilz)"
;

var einz = alle.split("$");
var randnr=Math.floor(1+Math.random()*(einz.length-1));
return einz[randnr]
} //==================

function random_wisdom() {
var alle = "??"
+ "$If everything is coming your way, you're in the wrong lane."
+ "$If anything can go wrong, it will."
+ "$Nothing is as easy as it looks"
+ "$Everything takes longer than you think"
+ "$Left to themselves, things tend to go from bad to worse."
+ "$Whenever you set out to do something, something else must be done first."
+ "$Every solution breeds new problems"
+ "$It is impossible to make anything foolproof because fools are so ingenious"
+ "$Nature always sides with the hidden flaw"
+ "$Smile ... tomorrow will be worse"
+ "$Matter will be damaged in direct proportion to its value"
+ "$Everything goes wrong all at once"
+ "$Murphy was an optimist"
+ "$If you're feeling good, don't worry.  You'll get over it."
+ "$When things are going well, something will go wrong."
+ "$When things just can't get any worse, they will."
+ "$Anytime things appear to be going better, you have overlooked something."
+ "$Proposals, as understood by the proposer, will be judged otherwise by others."
+ "$If you explain so clearly that nobody can misunderstand, somebody will."
+ "$Procedures devised to implement the purpose won't quite work"
+ "$No matter what goes wrong, it will probably look right."
+ "$Once a job is fouled up, anything done to improve it only makes it worse."
+ "$Always keep a record of data - it indicates you've been working."
+ "$In case of doubt, make it sound convincing."
+ "$Experiments should be reproducible - they should all fail in the same way."
+ "$Do not believe in miracles - rely on them."
+ "$The probability of anything happening is in inverse ratio to its desirability"
+ "$A shortcut is the longest distance between two points"
+ "$Sooner or later, the worst possible set of circumstances is bound to occur."
+ "$Everything put together falls apart sooner or later"
+ "$You can't win. You can't break even. You can't even quit the game."
+ "$Things get worse before they get better. Who said things would get better?"
+ "$Things get worse under pressure"
+ "$Everyone has a scheme that will not work"
+ "$Firmness of delivery dates is inversely proportional to tightness of schedule"
+ "$Any wire cut to length will be too short"
+ "$A failure will not appear till a unit has passed final inspection"
+ "$If more than one person is responsible for a mistake, no one will be at fault."
+ "$Warranty and guarantee clauses are voided by payment of the invoice"
+ "$No books are lost by lending except those you particularly wanted to keep"
+ "$If you keep anything long enough you can throw it away"
+ "$Other people's tools work only in other people's gardens"
+ "$You get the most of what you need the least"
+ "$The other line moves faster"
+ "$An object or bit of information most needed will be the least available"
+ "$Badness comes in waves"
+ "$Any given programming project costs more and takes longer"
+ "$If a program is useful, it will have to be changed."
+ "$If a program is useless, it will have to be documented."
+ "$The value of a program is proportional to the weight of its output"
+ "$The effort required to correct course increases geometrically with time"
+ "$There's always one more bug"
+ "$Build a system that even a fool can use, and only a fool will want to use it"
+ "$Anything can be made to work if you fiddle with it long enough"
+ "$If it jams, force it.  If it breaks, it needed replacing anyway."
+ "$If you mess with a thing long enough, it'll break."
+ "$Push something hard enough and it will fall over"
+ "$When all else fails, read the instructions."
+ "$If a project is not worth doing at all, it is not worth doing well."
+ "$Enough research will tend to support your theory"
+ "$If the facts do not conform to the theory, they must be disposed of."
+ "$If enough data is collected, anything may be proven by statistical methods."
+ "$The solution to a problem changes the nature of the problem"
+ "$When working toward the solution, it always helps if you know the answer."
+ "$All great discoveries are made by mistake"
+ "$Inside every large problem is a small problem struggling to get out"
+ "$There's never time to do it right, but there's always time to do it over."
+ "$The first myth of management is that it exists"
+ "$In a hierarchy every employee tends to rise to his level of incompetence"
+ "$Internal consistency is valued more highly than efficient service"
+ "$Super-competence is more objectionable than incompetence"
+ "$Spend sufficient time in confirming the need and the need will disappear"
+ "$An ounce of image is worth a pound of performance"
+ "$In any human enterprise, work seeks the lowest hierarchal level."
+ "$Authority tends to assign jobs to those least able to do them"
+ "$People are always available for work in the past tense"
+ "$Overdoing things is harmful in all cases, even when it comes to efficiency."
+ "$If sophisticated calculations are needed to justify an action, don't do it."
+ "$No matter how much you do, you'll never do enough."
+ "$What you don't do is always more important than what you do do"
+ "$Any order that can be misunderstood has been misunderstood"
+ "$All the good ones are taken"
+ "$If you cannot convince them, confuse them."
+ "$Never argue with a fool - people might not know the difference."
+ "$When in doubt, mumble. When in trouble, delegate. When in charge, ponder."
+ "$A good plan today is better than a perfect plan tomorrow"
+ "$There ain't no such thing as a free lunch"
+ "$Expenditures rise to meet income"
+ "$Delay is the deadliest form of denial"
+ "$Trivial matters are handled promptly; important matters are never solved."
+ "$Progress is made on alternate Fridays"
+ "$Nothing ever gets built on schedule or within budget"
+ "$In order to get a loan you must first prove you don't need it"
+ "$The territory behind rhetoric is too often mined with equivocation"
+ "$Any simple idea will be worded in the most complicated way"
+ "$Always leave room to add an explanation if it doesn't work out"
+ "$No amount of genius can overcome a preoccupation with detail"
+ "$A man with one watch knows what time it is.  A man with two is never sure."
+ "$You can't tell how deep a puddle is until you step in it"
+ "$Nothing is impossible for the man who doesn't have to do it himself"
+ "$Nobody really cares or understands what anyone else is doing"
+ "$Everybody should believe in something - I believe I'll have another drink."
+ "$Friends come and go, but enemies accumulate."
+ "$To make an enemy, do someone a favor."
+ "$You have taken yourself too seriously"
+ "$It's better to have a horrible ending than to have horrors without end"
+ "$A pipe gives a wise man time to think & a fool something to stick in his mouth"
+ "$A bird in the hand is safer than one overhead"
+ "$If Murphy's Law can go wrong, it will."
+ "$Nothing is ever so bad that it can't get worse"
+ "$No matter what goes wrong, there is always somebody who knew it would."
+ "$Everything depends.  Nothing is always.  Everything is sometimes."
+ "$Complex problems have simple, easy-to-understand wrong answers."
+ "$Opportunity always knocks at the least opportune moment"
+ "$A crisis is when you can't say : let's forget the whole thing."
+ "$Washing your car to make it rain doesn't work"
+ "$It is impossible for an optimist to be pleasantly surprised."
+ "$You can make it foolproof, but you can't make it damnfoolproof."
+ "$Whenever you cut your fingernails you will find a need for them an hour later"
+ "$For every action, there is an equal and opposite criticism."
+ "$It is easier to get forgiveness than permission"
+ "$The client who pays the least complaints the most"
+ "$Never make a decision you can get someone else to make"
+ "$Whatever hits the fan will not be evenly distributed"
+ "$A meeting is an event at which the minutes are kept and the hours are lost"
+ "$You can never do just one thing"
+ "$There s no time like the present for postponing what you don t want to do"
+ "$Simple jobs always get put off because there will be time to do them later"
+ "$Assumption is the mother of all screw-ups"
+ "$Measure with a micrometer.  Mark with chalk.  Cut with an axe."
+ "$Important letters which contain no errors will develop errors in the mail"
+ "$Machines that have broken down will work perfectly when the repairman arrives"
+ "$When you do not know what you are doing, do it neatly."
+ "$To err is human, but to really foul things up requires a computer."
+ "$A computer program does what you tell it to do, not what you want it to do"
+ "$Where you stand depends on where you sit"
+ "$Information deteriorates upward through bureaucracies"
+ "$The secret of success is sincerity. Once you can fake that you've go it made."
+ "$An expert is anyone from out of town"
+ "$If it sits on your desk for 15 minutes, you've become the expert."
+ "$Indecision is the basis for flexibility"
+ "$Anything is possible if you don't know what you're talkig about"
+ "$Never create a problem for which you do not have the answer"
+ "$Create problems for which only you have the answer"
+ "$Hindsight is an exact science"
+ "$When in doubt, predic that the trend will continue."
+ "$When in trouble, obfuscate."
+ "$Never attribute to malice that which is adequately explained by stupidity"
+ "$Never leave hold of what you've got until you've got hold of something else"
+ "$The lease experienced fisherman always catches the biggest fish"
+ "$The one who least wants to play is the one who will win"
+ "$It always takes longer to get there than to get back"
+ "$If you like it, they don't have it in your size."
+ "$Multiple-function gadgets will not perform any function adquately"
+ "$The more expensive the gadget, the less often you will use it."
+ "$If you help a friend in need, he'll remember you - the next time he's in need."
+ "$If you do something right once, someone will ask you to do it again."
+ "$Forgive and remember"
+ "$He who laughs last - probably didn't get the joke"
+ "$Where there's a will, there's a won't."
+ "$If at first you dont succeed, destroy all evidence that you tried."
+ "$Never do anything you wouldn't be caught dead doing"
+ "$If all you have is a hammer, everything looks like a nail."
+ "$An error in the premise will appear in the conclusion"
+ "$The only time to be positive is when you are positive you are wrong"
+ "$It is the dead wood that holds up the tree"
+ "$The only important information in a hierarchy is who knows what"
+ "$If people listened to themselves more often, they would talk less."
+ "$Any issue worth debating is worth avioding altogether"
+ "$Any argument carried far enough will end up in semantics"
+ "$Success always occurs in private, and failure in full public view."
+ "$Two monologues do not make a dialogue"
+ "$In every work of genius we recognise our rejected thoughts"
+ "$If you consult enough experts you can confirm any opinion"
+ "$If it weren't for the last minute, nothing would get done."
+ "$To steal ideas from one person is plagiarism; to steal from many is research."
+ "$No one is listening until you make a mistake"
+ "$Asking dumb questions is easier than correcting dumb mistakes"
+ "$He who hesitates is probably right"
+ "$If you are given two contradictory orders, obey them both."
+ "$The one who does the least work will get the most credit"
+ "$Free time which unexpectedly becomes available will be wasted"
+ "$Never walk down a hallway in an office without a pieve of paper in your hand"
+ "$Do someone a favour and it becomes your job"
+ "$It's difficult to soar with eagles when you work with turkeys"
+ "$When packing for vacation, take half as much clothing and twice as much money"
+ "$If you can't fix it, feature it."
+ "$When it gets to be your turn, they change the rules."
+ "$Trust everybody, but cut the cards."
+ "$People who are resistant to change cannot resist change for the worst"
+ "$Whatever happens, look as if it were intended."
+ "$The severity of the itch is inversely proportional to the reach"
+ "$Experience is something you don't get until just after you need it"
+ "$When people are free to do as they please, they usually imitate each other."
+ "$Life can only be understood backwards, but it must be lived forwards."

var einz = alle.split("$");
var randnr=Math.floor(1+Math.random()*(einz.length-1));
return einz[randnr]

} // show

function random_poem() {
var alle = "??"
+"$What, if you slept,"
+"<br> and what if, in your sleep, you dreamed."
+"<br>And what if, in your dream,"
+"<br>you went to heaven and there plucked"
+"<br>a strange and beautiful flower."
+"<br>And what if, when you awoke,"
+"<br>you held the flower in your hand "
+"<br>ah, what then?"
+"<br>(Jostein Gaarder)"
+"$Schläft ein Lied in allen Dingen, <br>Die da träumen fort und fort.<br> Und die Welt hebt an zu singen,<br>Triffst du nur das Zauberwort. <br> (Eichendorff)"
+"$I feel like beeing in a cocoon."
+"<br>a fine thread of silk"
+"<br>wound millions of times"
+"<br>around an unknown body"
+"<br>which perhaps"
+"<br>can fly"
+"$Auf die Hände küßt die Achtung,"
+"<br>Freundschaft auf die offne Stirn,"
+"<br>Auf die Wange Wohlgefallen,"
+"<br>Sel'ge Liebe auf den Mund;"
+"<br>Aufs geschloßne Aug' die Sehnsucht,"
+"<br>In die hohle Hand Verlangen,"
+"<br>Arm und Nacken die Begierde,"
+"<br>Übrall sonst die Raserei."
+"<br>(Franz Grillparzer  1819)"
 
var einz = alle.split("$");
var randnr=Math.floor(1+Math.random()*(einz.length-1));
return einz[randnr]
}//poems

