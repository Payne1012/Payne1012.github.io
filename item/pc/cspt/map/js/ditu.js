/**
 * Created by payne on 2017/7/29.
 */

    //底部三维地图

//a标签鼠标滑过切换背景

    function map(a, b, c, d, z) {//百度地图插件（a:"放地图的盒子id"；b,c："要标注的地址坐标"；d:"要标注的地址"；z:"当z不传值的时候是平面图，当z为真的时候，地图带3d"）
        var map = new BMap.Map(a,{enableMapClick:false});
        var point = new BMap.Point(b, c);

      map.disableScrollWheelZoom();
    map.disableInertialDragging();
 map.centerAndZoom(point, 17);

        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);               // 将标注添加到地图中
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        marker.setZIndex(1000)
        var rd = marker.getIcon();
        rd.setImageSize(0);
        var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
        var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
        var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL});
        map.addControl(top_left_control);
        map.addControl(top_left_navigation);
        map.addControl(top_right_navigation);
        map.addControl(top_left_control);
        var searchInfoWindow = null;
        if(a=='guangdong'){
           var content = '<div style="margin:0;padding:2px;"><div style="width:183px;height:70px;line-height:20px;float: left;padding-top:20px;">地址：广州市<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邦华环球广场<br/>电话： 020-12345678</div><img src="" alt="" style="float:left;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/></div>';
        }else if(a=='shandong'){
            var content = '<div style="margin:0;padding:2px;"><div style="width:183px;height:70px;line-height:20px;float: left;padding-top:20px;">地址：济南市<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中铁财智<br/>电话： 0531-12345678</div><img src="" alt="" style="float:left;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/></div>';
        }else if(a=='shanghai'){
            var content = '<div style="margin:0;padding:2px;"><div style="width:183px;height:70px;line-height:20px;float: left;padding-top:20px;">地址：上海市<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;世界广场一层电话： 021-12345678</div><img src="" alt="" style="float:left;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/></div>';
        }
        else{
            var content = '<div style="margin:0;padding:2px;"><div style="width:183px;height:70px;line-height:20px;float: left;padding-top:20px;">地址：<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>电话： 010-12345678</div><img src="" alt="" style="float:left;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/></div>';
            };
            searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
                title  : "",      //标题
                width  : 290,             //宽度
                height : 135,              //高度
                panel  : "panel",         //检索结果面板
                enableAutoPan : true,     //自动平移
                searchTypes   :[
                    BMAPLIB_TAB_TO_HERE  //到这里去
                ]
            });
        //创建检索信息窗口对象
        marker.addEventListener("click", function(e){
            searchInfoWindow.open(marker);
        });
      map.addOverlay(marker); //在地图中添加marker
    }
