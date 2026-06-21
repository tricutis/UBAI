<?php
$htloc='/httpdocs';
#To have all errors reported, use
ini_set('error_reporting', E_ALL ^ E_NOTICE);
ini_set('display_errors',true);
# assume LAST /html to be root under which "functions" is
if ($function_loc) { 
  echo "\r\n<!--- htmlhead nicht das 2. mal function_loc=$function_loc -->";
}
else {

$function_loc=$HTTP_SERVER_VARS["DOCUMENT_ROOT"];
$t=-1;while($t=strpos($function_loc,$htloc,($t+1))) {$htmlfound=$t;}
if ($htmlfound) {# root auch durchsuchen
   $basis_loc=substr($function_loc,0,$htmlfound);
   $root_loc=$basis_loc.$htloc;
   $function_loc=$basis_loc.$htloc.'/functions';
   $jssource_loc=$basis_loc.$htloc.'/JSLcopy';
   if ($addpath) $addpath=":$basis_loc$htloc/$addpath";
   }
ini_set('include_path', ".:$root_loc:$function_loc:$basis_loc".$addpath);

function htmlhead($title
,$content=""
,$keywords=""
,$css=""
,$tobody=""
,$meta=""
,$webseite="gsmzeit.de"
,$default_keywords="Zeiterfassung,personalzeiterfassung,intarap,gsmzeit"
) {
global $htmlhead_include_count;
if    ($htmlhead_include_count) { echo "\r\n<!--- htmlhead nicht das 2. mal aufgerufen $title -->";return;}
       $htmlhead_include_count++;


if (!$content)  $content=$title;
if (!$keywords) $keywords=$content.','.$default_keywords.'.'.$webseite;
if (!$css)      $css="http://gipsabformungen.info/style.css";

$r="<html><head>
<title>$title</title>
<LINK REL=\"SHORTCUT ICON\" HREF=\"http://gipsabformungen.info/favicon.ico\">
<LINK REL=\"StyleSheet\" HREF=\"$css\" TYPE=\"text/css\">
<meta NAME=\"language\" CONTENT=\"de\">
<meta http-equiv=\"content-type\" content=\"text/html; charset=ISO-8859-1\">
<META NAME=\"description\" CONTENT=\"$content\">
<META NAME=\"keywords\"    CONTENT=\"$keywords\">  
$meta
</head>
<body $tobody>
";
echo $r;
}//--------------

function putdata($s){global $debug; if (!$debug)return;
  foreach(explode(',',$s) as $n) {
    global $$n;
    $v = $$n;
    if (!is_numeric($n)) echo "<br><b>$n</b>=";var_dump($v);
    }
}#-- 

function getjscript($f,$loc="",$immed=true,$linelimit=200) {
global $js_available,$jssource_loc,$function_loc;
if (!$loc) $loc="http://gsmzeit.de/JSLcopy";

foreach(explode(',',$f) as $js) {
 $l[]="\r\n<!--- requested: $js ---> ";

 if (   $js_available[$js] ) {  }// schon da
 else {   $js_available[$js]=true;
      $scriptinhalt=array(); 
      if ($immed) {
           $scriptinhalt=file($jssource_loc."/$js.js");
           }
      if ($immed  && $scriptinhalt  &&  count($scriptinhalt) < $linelimit) 
           {# script direkt im html mitschicken
           $l[]='<script  type="text/javascript" language="JavaScript"> '; 

           foreach($scriptinhalt as $key => $val) {	# kommentare+leerzeilen entfernen
	     $val=trim($val);
             if ( $p=strpos($val,'//') )  
               if (strpos($val,'://')===false)  		$l[]= substr($val,0,$p); 
               else						$l[]= $val; 
             elseif ($p===false && $val!=='')		 	$l[]= $val;
             //else leerzeilen und comments ganz weglassen
             }
           $l[]="</script>";         
           }
      else {
            $l[]="<script  type=\"text/javascript\" language=\"JavaScript\"  src=\"$loc/$js.js\"> </script>";
           }
      }
 }
echo implode("\r\n",$l);
}////////////
function getfunction($f,$loc="") { ## must be called with eval(getfunction("somefunction"));

foreach(explode(',',$f) as $fu) {
 if (strpos($fu,".php")===false)  $fu.='.php';
 if (strpos($fu,"func.")===false) $fu='func.'.$fu;
 $l.=" include \"$loc/$fu\"; \r\n ";
 }
echo $l;
}////////////
}#--------kein 2.mal 
?>