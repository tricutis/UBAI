// aufruf z.B. mit <img onmouseover="fullimg(this)">

fullimg_last_w="";
fullimg_last_h="";
function fullimg(el) { 
el.onmouseout= fullimg_end;
fullimg_last_w=el.width;
fullimg_last_h=el.height;
el.width=fullimg_last_w+fullimg_last_w;
el.height=fullimg_last_h+fullimg_last_h;
//alert(3);
}
function fullimg_end(evt) {
this.width=fullimg_last_w;
this.height=fullimg_last_h;
}
