<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE);
ini_set('display_errors',true);
require "func.htmlhead.php";#modinst
require "upw5.config.php";#modinst

htmlhead($hl="$siteraw Impressum"
,$content=$hl
,$keywords="gipsabformungen,gipsabdrücke,gipsabdruck,abdruck,abguss,gips,bilder,körper,körperformen,geschenk,kunst,erotische,erotisch,hochzeitstag,jahrestag,münchen"
,$css="style.css"
,$tobody=""
,$meta=""
,$webseite="$siteraw"
);
getjscript("bigger,feedback");

include "defconst.php";

echo <<< html
<div style='width:100%,z-index:8;'>
<img src='gips5bw.jpg' width=100%>

<div style='background-color:none;z-index:9;left:0;top:0;position:absolute;font-size:10;'>

<table>
<tr><td width=5%><td>

<a name="mich"><h3>über mich</h3></a>

<img src="ingo2.jpg" align=right onmouseover='bigger(this)'>
Ich bin Ingo, bin Informatiker und bei <a target=andreas href="http://andreas-schwarz.org">Andreas Schwarz</a>
in Ayurveda-Massage und anderen Ayurvedischen Behandlungen ausgebildet 
(meine Ayurveda-Seite: <a target=abhy href="http://www.abhyanga.de">www.abhyanga.de</a>).
 

<p><p><p>Diese Webseite wurde erstellt und wird unterhalten von
<a target=mail href='{$cryptlink}&subject=Impressum+www.gipsabformungen.info' title='email senden' >
Ingo Schmidt-Philipp
</a>


<font style='color:black;'>
<br>Postanschrift: 
<br>Ingo A. Schmidt-Philipp
<br>Amadeus' Ayurveda Institut
<br>Korbinianstr.1
<br>D-85457 Hofsingelding (S2 St.Kolomann)
<br>Telefon: 08123-9899886
</font>
<br><a target=routing href="http://termine.abhyanga.de/routing.php?ayurid=1&css=http://gipsabformungen.info/style.css">
Routenplanung dahin</a>
<hr>
</table>
</div>
</div>
html;

?>