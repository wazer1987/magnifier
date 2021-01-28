$(function(){
    //1.获取我们要操作的元素
    //最外层的大盒子
    let $magnifier = $('.magnifier')
        //大盒子下的所旅途的盒子
        $abbre = $magnifier.find('.abbre')
        // 缩略图中的遮罩层
        $mark = $magnifier.find('.mark')
        // 缩略图中的详情
        $detail = $magnifier.find('.detail')
        // 详情中的图片
        $detailIMG = $detail.find('img')

    //4.动态计算大图的大小
    let abbreW = $abbre.width()
        abbreH = $abbre.height()
        //5.获取abbre的距离上边 和 左边的距离 是个对象
        abbreOffset = $abbre.offset()
        markW = $mark.width()
        markH = $mark.height()
        detailW = $detail.width()
        detailH = $detail.height()
        detailIMGW = 0
        detailIMGH = 0
        detailIMGW = detailW / (markW / abbreW)
        detailIMGH = detailH / (markH / abbreH)
        $detailIMG.css({
            width:detailIMGW,
            height:detailIMGH
        })
        //5.动态计算mark移动的距离 和 大图移动的位置
        const computed = (ev) => {
            //鼠标距离页面的距离 减去 abbre 的左偏移 在 减去 mark的宽的一半
            let curL = ev.pageX - abbreOffset.left - markW /2
                curT = ev.pageY - abbreOffset.top - markH /2
            //需要做边界判断 如果 你mark的 在左边超出了abbre 我们就归零 如果在右边 超出了安全距离 就让他等于我们的安全距离
            let minL = 0
                minT = 0
                maxL = abbreW - markW  
                maxT = abbreH - markH 
                curL = curL < minL? minL : (curL > maxL?maxL:curL)
                curT = curT < minT? minT : (curT > maxT?maxT:curT)
            $mark.css({
                left:curL,
                top:curT
            })
            //根据公式去算 大图应该移动的距离的比例 
            // a(mark移动的距离) / abbre = b(大图移动的距离) / 大图的尺寸
            // 如果mark 向左移动 那么 大图应该向右移动
            $detailIMG.css({
                left:-curL / abbreW * detailIMGW,
                top:-curT / abbreH * detailIMGH
            })
        }
        //2.鼠标进入abbre的时候 mark显示 详情要显示 鼠标移除的时候 要隐藏
    $abbre.mouseenter((function(ev){
        //鼠标进入到abbre
        //3. 让mark 和 detail 显示
        $mark.css('display','block')
        $detail.css('display','block')
        computed(ev)
    }))
    .mousemove(function(ev){
        //鼠标在abbre移动
        computed(ev)
        
    })
    .mouseleave(function(ev){
        //鼠标离开 让mark 和 detail 隐藏
        $mark.css('display','none')
        $detail.css('display','none')
    })
})