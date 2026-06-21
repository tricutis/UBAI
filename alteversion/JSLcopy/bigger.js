// aufruf z.B. mit <img onmouseover="bigger(this)">

bigger_last_w="";
bigger_last_h="";
function bigger(el,factor) {
if (typeof factor== 'undefined') factor=2; 
el.onmouseout= bigger_end;
bigger_last_w=el.width;
bigger_last_h=el.height;
el.width=bigger_last_w*factor;
el.height=bigger_last_h*factor;
//alert(3);
}
function bigger_end(evt) {
this.width=bigger_last_w;
this.height=bigger_last_h;
}
