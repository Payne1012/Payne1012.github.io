/*
* jquery.counterup.js 1.0
*
* Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
* Released under the GPL v2 License
*
* Date: Nov 26, 2013
*/
(function(a){a.fn.counterUp=function(c){var b=a.extend({time:400,delay:10},c);return this.each(function(){var f=a(this),e=b,d=function(){var j=[],q=e.time/e.delay,m=f.text(),t=/[0-9]+,[0-9]+/.test(m);m=m.replace(/,/g,"");var r=/^[0-9]+$/.test(m),v=/^[0-9]+\.[0-9]+$/.test(m),g=v?(m.split(".")[1]||[]).length:0;for(var k=q;k>=1;k--){var p=parseInt(m/q*k);v&&(p=parseFloat(m/q*k).toFixed(g));if(t){while(/(\d+)(\d{3})/.test(p.toString())){p=p.toString().replace(/(\d+)(\d{3})/,"$1,$2")}}j.unshift(p)}f.data("counterup-nums",j);f.text("0");var h=function(){f.text(f.data("counterup-nums").shift());if(f.data("counterup-nums").length){setTimeout(f.data("counterup-func"),e.delay)}else{delete f.data("counterup-nums");f.data("counterup-nums",null);f.data("counterup-func",null)}};f.data("counterup-func",h);setTimeout(f.data("counterup-func"),e.delay)};f.waypoint(d,{offset:"100%",triggerOnce:!0})})}})(jQuery);