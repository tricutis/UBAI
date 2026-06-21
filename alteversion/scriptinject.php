<?php

$htm=$_GET["htm"];

echo " document.write(' \n // scriptinject htm=$htm '); ";

echo " alert('x $htm'); document.write(' <b>abc</b>def '); ";
exit();

$writestart= " document.write('";
$writeend= "');\n\r ";
$startcomment ="\n\r <!---- ";
$endcomment="\n\r ---!>  ";
if ($script) {
$startcomment ="\n //  ";
$endcomment=" \n\r " ;
}

$ht= get_include_contents($htm);
#echo "htm=$htm,ht=$ht";

if ($ht) {
$file=explode("\n",$ht);

foreach ($file as $line)
  {
   $t = trim($line);
   $t=str_replace("\r", " ", $t); # javascript code wird durch die \n im text gestört
   $t=str_replace( "\n", '<br />', $t );# also rausdamit (nl2br lässt die \n drin
   $t=str_replace( "'", "''", $t );# falls einzelne hochkommas im txt sind, diese doppeln
#   $erg[]=addslashes(strip_tags($t,"<br><b><p><i><strong>"));
   $t=trim($t);
   if ($t) $erg[]=$t; #addslashes($t);
  }
  
foreach ($erg as $e)
 echo $writestart.$e.$writeend;
}


function get_include_contents($filename) {
   if (is_file($filename)) {
       ob_start();
       include $filename;
       $contents = ob_get_contents();
       ob_end_clean();
       return $contents;
   }
   return false;
}
?>
