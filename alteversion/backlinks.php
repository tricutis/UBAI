<?php
if (!function_exists('placelink')) {
 function placelink($site,$name="*",$sep="") {
 if ($name =="*") $name=$site;
 echo "$sep <a href=\"$site\">$name</a>";
 }
}
echo "<hr>";
placelink("/","home");
placelink("impressum.php","Impressum");
#placelink("regeln.php","AGB");

echo '
<script language="javascript" src="http://abhyanga.de/JSLcopy/feedback.js"></script>      
<a href="#" onclick="feedback(this,1);" title="Gästebuch">Gästebuch</a>
';
echo "
<font size=-2 style='color:grey;'>
<br>Texte und Bilder Copyright(c) $site sofern nicht anders vermerkt. Irrtum vorbehalten.
<br>Anwendungsdesign Copyright(c) $site
</font>
";

?>

