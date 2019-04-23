;
(function ($, window, document, undefined) {

    $.fn.selectpick = function (options) {
        // selectpick鐨勯厤缃�
        var selectpick_config = {
            container: "body",//妯℃嫙select鐢熸垚鐨凞IV瀛樻斁鐨勭埗瀹瑰櫒
            disabled: false, // 鏄惁绂佺敤,榛樿false
            family: ['province','city','dealer'], // 澶氱骇鑱斿姩鍏宠仈鍏崇郴 //add by zz at 2017-6-20
            onSelect: "" // 鐐瑰嚮鍚庨€変腑浜嬩欢
        }
        var settings = $.extend({}, selectpick_config, options);
        if($(this[0]).hasClass('select_hide') && $(this[0]).next('.selectpick_div_box').length>0) return false; //add by zz at 2017-5-26, edit by zz at 2017-11-7
        // 姣忎釜涓嬫媺妗嗙粍浠剁殑鎿嶄綔
        return this.each(function (elem_id) {
            var obj = this;
            // 鐢熸垚鐨刣iv鐨勬牱寮�
            var _selectBody = "<div class='selectpick_div_box' onselectstart='return false;'><div class='selectpick_div'><span class='selectpick_chara'></span><span class='selectpick_icon'></span></div><div class='selectpick_options'></div></div>";
            $(_selectBody).appendTo($(obj).parent());
            $(this).addClass("select_hide");

            //璁剧疆榛樿鏄剧ず鍦╠iv涓婄殑鍊间负褰撳墠select鐨勯€変腑鍊�
            $(this).siblings('.selectpick_div_box').find('span:eq(0)').text(
                $(this).find("option:selected").text() || $(this).find('option[value="'+ $(this).val() +'"]').text()
            );

            // 鏄惁绂佺敤涓嬫媺妗�
            if (settings.disabled) {
                $(this).siblings('.selectpick_div_box').find(".selectpick_div").addClass("selectpick_no_select");
                return;
            }
            // 鐐瑰嚮div鏄剧ず鍒楄〃
            $(this).siblings('.selectpick_div_box').bind("click", function (event) {

                $('.selectpick_div_box').css('zIndex', '9').parents('dd').removeClass('cur').prev().removeClass('cur');
                $(this).css('zIndex', '99').parents('dd').addClass('cur').prev().addClass('cur');

                var selected_text = $(this).find('.selectpick_chara').html(); // 褰撳墠div涓殑鍊�
                event.stopPropagation(); //  闃绘浜嬩欢鍐掓场

                if ($(this).find('li').length > 0) {
                    // 闅愯棌鍜屾樉绀篸iv
                    $(this).find(".selectpick_options").empty().hide();
                    $('.selectpick_div_box').css('zIndex', '9');
                    $(this).parents('dd').removeClass('cur').prev().removeClass('cur');
                    return;
                } else {
                    $(".selectpick_options").hide();
                    $(this).find(".selectpick_options").show();
                    $(".selectpick_options ul li").remove();
                    // 娣诲姞鍒楄〃椤�
                    var ul = "<ul>";
                    $(obj).children("option").each(function () {
                        if ($(this).text() == selected_text) {
                            ul += "<li class='selectpick_options_selected'><label>" + $(this).text() + "</label></li>";
                        } else {
                            ul += "<li><label>" + $(this).text() + "</label></li>";
                        }
                    });
                    ul += "</ul>";
                    $(this).find(".selectpick_options").append(ul).show();
                    $(this).find('span:eq(0)').text(
                        $(obj).find("option:selected").text() || $(obj).find('option[value="'+ $(obj).val() +'"]').text()
                    );

                    //璁剧疆涓嬫媺妗嗘槸鍚︽湁婊氬姩鏉′互鍙婂睍绀烘柟鍚�
                    var lH = ($(this).find("li").height() + 1) * 7;
                    var lH2 = $(this).find(".selectpick_options").height() + 1;
                    var cH = $(this).offset().top + $(this).height();
                    var wH = $(window).height(),sT = $(window).scrollTop();


                    if ($(this).find("li").length > 7) {
                        $(this).find(".selectpick_options").css('height', lH + 'px');
                        if ((wH+sT) - cH < lH) {
                            $(this).find(".selectpick_options").css({
                                top: -lH + 'px'
                            })
                        }else{
                            $(this).find(".selectpick_options").css({
                                top: '-'
                            })
                        }
                    }
                    else {
                        if ((wH+sT) - cH < lH2) {
                            $(this).find(".selectpick_options").css({
                                top: -lH2 + 'px'
                            })
                        }else{
                            $(this).find(".selectpick_options").css({
                                top: '-'
                            })
                        }
                    }

                    // 姣忎釜li鐐瑰嚮浜嬩欢
                    $(this).find('li').bind("click", function (event) {
                        $(obj).siblings('.selectpick_div_box').find('span:eq(0)').text($(this).children("label:eq(0)").text());

                        $(this).parents('.selectpick_options').css('height','auto').empty().hide();
                        //$(obj).val(name);//璁剧疆涓嬫媺妗嗙殑鍊�
                        $(obj).children("option").removeAttr('selected');
                        $(obj).children("option:nth-child(" + ($(this).index() + 1) + ")").prop('selected', 'selected');
                        $(obj).change()

                        //娓呴櫎鑱斿姩榛樿鍊�
                        var cName = $(obj).attr('id'), family_length = settings.family.length;
                        for(var i=0; i<family_length-1; i++){
                            if(cName == settings.family[i]){
                                for(var o = i+1 ; o<family_length; o++){
                                    var sf = settings.family[o];
                                    $('#'+ sf +' ~ .selectpick_div_box').find('span:eq(0)').html($('#'+ sf +' option[value="'+ $('#'+ sf).val() +'"]').text())
                                }
                                break;
                            }
                        }

                        $(obj).parents('dd').removeClass('cur').prev().removeClass('cur');

                        // 鍥炶皟鍑芥暟
                        settings.onSelect && settings.onSelect();
                        return false;
                    });

                }

            });

            // 鐐瑰嚮div澶栭潰鍏抽棴鍒楄〃
            $(document).bind("click", function (event) {
                var e = event || window.event;
                var elem = e.srcElement || e.target;
                //console.log(elem)
                if (elem.className == "selectpick_div" || elem.className == "selectpick_icon" || elem.className == "selectpick_chara") {
                    return;
                } else {
                    //alert(0)
                    $(obj).siblings('.selectpick_div_box').css('zIndex', '9').find(".selectpick_options").css('height','auto').empty().hide();
                    $(obj).parents('dd').removeClass('cur').prev().removeClass('cur');
                }
            });

        });
    }

    $.fn.resetSelect = function(){
        $('.selectpick_div').each(function(){
            var text = $(this).parent().siblings('select').children("option:nth-child(1)").text();
            $(this).find('.selectpick_chara').text(text);
        })
    }
})(jQuery, window, document);