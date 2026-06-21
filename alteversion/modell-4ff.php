<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE);
ini_set('display_errors',true);
require "func.htmlhead.php";#modinst
require "upw5.config.php";#modinst

htmlhead($hl="$siteraw Natürlich schöne Abformungen Deines Körpers aus Gips"
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

<div style='background-color:none;z-index:9;left:0;top:0;position:absolute;font-size:10;'>
<table width=100%>
<tr><td width=5%><td width=35%><td width=60%>
{$hl}
<tr><td><td valign=top>
<img src="http://gipsabformungen.info/gipsbeispiel7black.jpg" 
width=80 onmouseover='bigger(this,4)'>
<td>
<a name="Verwendung">
<b>Wie kann ich eine solche Gipsabformung verwenden?</b></a><br/>
So ein Körperbild ist natürlich 
<ol><li>ein tolles Geschenk für den Partner
<br>Es gibt Geburtstage, Jahrestage, Hochzeitstage .. und einfach geliebte Menschen
<li>eine tolle Erinnerung für einen selber ("so hab ich damals ausgesehen")
-- wir werden schließlich nicht jünger
<li>ein wunderschönes Schmuckstück
</ol>
So können die Gipsabformungen zum Beispiel aufbewahrt werden:

<br>An einem durchsichtigen Nylonfaden (Angelschnur) an einem Nagel an der Wand
<span style='font-size:70%;'>(Wie im Bild links oben)
Alle Bilder vergrößern sich übrigens durch Überfahren mit der Maus
</span>
<p>

<tr><td><td valign=top>
<img src="http://gipsabformungen.info/gipsbeispiel6.jpg" 
width=80 onmouseover='bigger(this,4)'>
<td>
Durch den Licht- und Schatten-Effekt kommt an einer Wand die Drei-Dimensionalität des Objekts sehr gut zur Geltung.
wie ein Bild (aber dreidimensional) auf einem dunklen Untergrund (Karton) befestigt



<br>oder stehend auf einer Oberfläche 

<br>

Das bietet die Möglichkeit die Form am besten von allen Seiten zu betrachten.
<p>auf einem Podest oder Ständer 

<tr><td><td valign=top>
<img src="http://gipsabformungen.info/gipsonbody.jpg" 
width=80 onmouseover='bigger(this,4)'>
<td>

<a name="Bedingungen">
<b>Bedingungen bei $site</b></a><br>


Der Preis für eine Abformung ist 80 Euro (soviel wie eine 90-minütige <a href="http://ayur.info/?id=1">Ayurveda-Massage</a>)
Ihr könnt auch zu zweit kommen. 
Zwei Modelle an einem Termin kosten 120 Eur - für jeden 60.

<p>
Im Preis enthalten ist die Arbeitszeit und Rohmaterial  für bis zu zwei Abformungsversuche 
und ein Karton für die Wandmontage.
Solltest Du eine zweite Abformung wünschen <b>und</b> diese behalten wollen wird für das zweite Modell
nur 50% des Preises des ersten Bildes berechnet.

<p>Die Abformung entsteht in meinem Haus in S-Bahn-nähe bei München 
(<a target=routing href="http://termine.abhyanga.de/routing.php?ayurid=1" title="routenplaner dahin">Amadeus Ayurveda Institut</a>).
Bei Erstattung der Fahrtkosten (0,30 / km)  komme ich auch zu Dir.

<p>Die maximale Größe eines Standardabdrucks entspricht etwa einer halben Körperseite (wie im Eingangsbild).
Größere Abformungen auf Anfrage.

<p>Das Abformungsmaterial besteht aus reinem hautfreundlichem Gips auf einer Textilgrundlage.
Keine Chemie.

<p>So eine Gipsabformung ist unbegrenzt haltbar, 
sie kann jedoch bei Schlag oder Druck brechen.

<tr><td><td colspan=9>



<a name="Aktion"><b>Einführungsaktion - Modelle gesucht</b></a><br/>

Wir brauchen noch die Rechte für 
einige gute Fotos von gelungenen Gipsabformungen.
Als Einführungsaktion gibt es folgendes Angebot:
<br>Die <b>nächsten drei</b> Bestellungen haben die Wahl ihren Gipsabdruch 
<b>kostenlos</b> zu erhalten
sofern sie der Veröffenlichung von Fotos des Gipsabdrucks zustimmen
(Einer dieser Einführungsplätze solle ein Mann sein).


<p>
Die Fotos werden auf dieser Internetseite sowie in Prospekten von $site verwendet.
Die Veröffentlichung ist selbstverständlich anonym.
Solltest Du mit der Veröffentlichung des Gipsabdrucks nachträglich 
nicht einverstanden sein, 
kannst Du immer noch auf die Einführungsaktion verzichten 
und eine reguläre Gipsabformung vorziehen.

<p>
Du bekommst eine eigene Kopie des digitalen Bildes 
- zum Nachmachen oder als Bildschirmhintergrund. 

<p>Klicke hier für <a href="{$cryptlink}&subject=Ich+möchte+Model+für+die+Einführungsaktion+sein">
Als Modell für die Einführungsaktion bewerben</a>

<tr><td><td><td height=40>
<a href="modell-3.php">weiter...</a>
<tr><td><td><td height=40>
<tr><td colspan=9>{$navi}

html;


?>