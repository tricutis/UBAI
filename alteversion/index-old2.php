<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE);
ini_set('display_errors',true);
require "func.htmlhead.php";#modinst
require "upw5.config.php";#modinst

htmlhead($hl="$siteraw Natürlich schöne Abformungen Deines Körpers aus Gips"
,$content=$hl
,$keywords="gipsabformungen,gipsabdrücke,gipsabdruck,abdruck,abguss,gips,bilder,körper,körperformen,geschenk,kunst,erotische,erotisch,hochzeitstag,jahrestag,münchen"
,$css=""
,$tobody=""
,$meta=""
,$webseite="$siteraw"
);
#<img src="favicon.jpg" align=left border=0>
#<div style='background:url(gips6bw.jpg);height:620;'>

include "defconst.php";

echo <<< html
<div style='width:100%,z-index:8;'>
<img src='gips6bw.jpg' width=100%>
{$navi}
<div style='background-color:none;z-index:9;left:0;top:0;position:absolute;'>
<table width=100% height=100%>
<tr height=60>
<tr><td>
<center>
{$hl}
<span style='font-size:16;color:maroon;'>
<p>Möchtest Du auch so ein Bild? 
<br>So eine Skulptur von Dir oder von Deinem Partner?

<p>Ein tolles Geschenk für den Partner
und 
<br>eine schöne Erinnerung für einen selber 

<p><b>dann geht's <a href="entstehung.php">hier</a> weiter</b>

</span>
</center>
</div>
</table>
</div>
html;

?>