<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE);
ini_set('display_errors',true);
require "func.htmlhead.php";#modinst
require "upw5.config.php";#modinst

htmlhead($hl="$siteraw Bedingungen -Natürlich schöne Abformungen Deines Körpers aus Gips"
,$content=$hl
,$keywords="gipsabformungen,gipsabdrücke,gipsabdruck,abdruck,abguss,gips,bilder,körper,körperformen,geschenk,kunst,erotische,erotisch,hochzeitstag,jahrestag,münchen"
,$css="style2.css"
,$tobody=""
,$meta=""
,$webseite="$siteraw"
);
getjscript("bigger");
#<img src="favicon.jpg" align=left border=0>
#<div style='background:url(gips6bw.jpg);height:620;'>

include "defconst.php";
#<img src="gipsonbody.jpg" align=right width=200 >

echo <<< html
<div style='width:100%,z-index:8;'>
<img src='gips6bw.jpg' width=100%>

<div style='background-color:none;z-index:9;left:0;top:0;position:absolute;'>
<table width=100%>
<tr><td width=5%><td width=35%><td width=60%>
{$hl}

<tr><td><td valign=top>
<img src="http://gipsabformungen.info/gipsonbody.jpg" 
width=80 onmouseover='bigger(this,4)'>
<td>




<a name="Bedingungen">
<b>Bedingungen bei $site</b></a><br>

<p>
Der Preis für eine Abformung ist 80 Euro (soviel wie eine <a href="http://ayur.info/?id=1">Ayurveda-Massage</a>).
Es dauert - mit allem drum und dran etwa 2 Stunden.


Ihr könnt auch zu zweit kommen. 
Zwei Modelle an einem Termin kosten für jeden 60.

<p>
Im Preis enthalten ist die Arbeitszeit und Rohmaterial  
für bis zu zwei Abformungsversuche 
und Material für die Wandmontage.
Die zweite Abformung am gleichen
Termin kostet die hälfte (40 Eur) und jede weitere 20 Euro.

<p>Oder Du wirst <a href="aktion.php">Modell</a>.


<p>Die Abformung entsteht in meinem Haus in S-Bahn-nähe bei München 
(<a target=routing href="http://termine.abhyanga.de/routing.php?ayurid=1&css=http://gipsabformungen.info/style.css" title="routenplaner dahin">Amadeus Ayurveda Institut</a>).

Bei Erstattung der Fahrtkosten (0,30 / km)  komme ich auch zu Dir.

<p>Die maximale Größe eines Standardabdrucks entspricht 
der im Eingangsbild. Größere Abformungen auf Anfrage.



<tr><td><td><td height=40>
<a href="aktion.php">weiter...</a>


</table>
<table>
<tr><td width=5%>
<td width=25%><img src="http://gipsabformungen.info/gipsbeispiel1.jpg" width=230>
<td width=5%>
<td width=25%><img src="http://gipsabformungen.info/gipsbeispiel1.jpg" width=230>
<td width=5%>
<td width=25%><img src="http://gipsabformungen.info/gipsbeispiel1.jpg" width=230>

<tr><td><td><td height=10>
<tr><td colspan=9>{$navi}
</table>
html;


?>