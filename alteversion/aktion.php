<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE);
ini_set('display_errors',true);
require "func.htmlhead.php";#modinst
require "upw5.config.php";#modinst

htmlhead($hl="$siteraw Einführungsaktion -Natürlich schöne Abformungen Deines Körpers aus Gips"
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
<img src="http://gipsabformungen.info/gipsbeispiel1.jpg" 
width=80 onmouseover='bigger(this,4)'>
<td>
<p><a name="Aktion"><b>Einführungsaktion - Modelle gesucht</b></a><br/>

<p>Wir brauchen noch die Rechte für 
einige gute Fotos von gelungenen Gipsabformungen.
Als Einführungsaktion gibt es folgendes Angebot:
<br>Wer Modell werden möchte bekommt seinen Gips kostenlos.
Ich möchte Fotos des fertigen Objekts.

Die Fotos sind zur möglichen Veröffentlichung auf dieser Internetseite oder in Prospekten von $site.
Du bekommst eine eigene Kopie des digitalen Bildes 
- zum Nachmachen oder als Bildschirmhintergrund. 

<p>Ich suche noch Modelle für folgende Abdrücke:
<ul><li>Oberkörper Frau
<li>Oberkörper Mann
<li>Rücken
<li>knackiger Po
</ul>

<p>Klicke hier für <a href="{$cryptlink}&subject=Ich+möchte+Model+für+die+Einführungsaktion+sein">
Als Modell für die Einführungsaktion bewerben</a>

<p>

<tr><td><td valign=top>
<td>
<b>Ein Wort zum Thema Schönheit</b><br/>

Das Modell auf den Eingangsfotos hat perfekte Formen. 
Das ist für Gipsabformungen allgemein wie für die Modellaktion <b>nicht</b> 
Vorausetzung. 
Eine gelungenes Abbild macht aus, dass man die <b>Individualität</b>
der Körperform erkennt.
Auch in jedem Alter hat der Körper seine Schönheit.  
Bauch, Hüfte, Schulter, Brust, Po, Knie - jeder Mensch hat Schönheit 
und tolle oder weniger tolle Seiten. 
Manche die er oder sie schon kennt und manche die nicht gleich offensichtlich sind.
<br>
<a href="impressum.php">Lass uns diese Schönheiten herausarbeiten und festhalten</a>




</table>
<table>
<tr><td width=5%>
<td width=25%><img src="http://gipsabformungen.info/gipsonbody.jpg" width=230>
<td width=5%>
<td width=25%><img src="http://gipsabformungen.info/gipsonbody.jpg" width=230>
<td width=5%>
<td width=25%><img src="http://gipsabformungen.info/gipsonbody.jpg" width=230>

<tr><td><td><td height=10>
<tr><td colspan=9>{$navi}
</table>
html;


?>