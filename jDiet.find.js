/**
 * jDiet find plugin v0.1
 */
jDiet.fn.find=function(c,e){"undefined"==typeof e&&(e=!0);var a=new jDiet,b=[];this.each.call(this,function(){var a=[],d=[],g=[],h=[];
if("object"==typeof this&&"#text"!==String(this.nodeName).toLowerCase()){d=c.split(".");g=-1<c.indexOf(".")?[1,1]:[1,0];g[0]&&(h[0]=
String(this.nodeName).toLowerCase()==d[0].toLowerCase());g[1]&&(h[1]=-1<String(" "+this.className+" ").indexOf(" "+c[0]+" "));
if(g[0]&&!g[1]&&h[0]||g[0]&&g[1]&&h[0]&&h[1])a=[this];if(!e||e&&0===a.length)a=jDiet.fn.find.fn.b(this,c,e,0)}a.length&&(b=b.concat(a))});
for(var d in b)a[d]=b[d];a.length=b.length;a.selector=this.selector+" ~> "+c;return a};jDiet.fn.find.fn={b:function(c,e,a,b){var d=[],
f=jDiet(c).children(e);0<f.length&&(d=a?[f[0]]:this.a(d,f));if(!a||a&&0===d.length)c=this.c(c,e,a,d,b+1),0<c.length&&(d=this.a(d,c));return d
},c:function(c,e,a,b,d){var b=[],f=[],c=jDiet(c).children();if(0<c.length)for(var i=0,g=c.length;i<g;i+=1)if(b=this.b(c[i],e,a,d),
0<b.length&&(f=this.a(f,b)),a){f=[f[0]];break}return f},a:function(c,e){for(var a=[],b=0,d=c.length;b<d;b+=1)a.push(c[b]);b=0;for(d=e.length;
b<d;b+=1)a.push(e[b]);return a}};
