<?php 
function cutstr($string, $start, $length, $dot = '',$charset = "utf-8") {
    //判断当前的环境中是否开启了mb_substr这个函数
    if(function_exists("mb_substr")){

        if(mb_strlen($string,$charset)>$length){
            //如果开启了就可以直接使用这个
            return mb_substr($string,$start,$length,$charset).$dot;
        }
        return mb_substr($string,$start,$length,$charset);
    }
    //否则就是下面没开启
    $new = '';
    //判断是否是gbk，是gbk就转码成utf-8
    if($charset==='gbk'){
        $string = iconv("gbk","utf-8",$string);
    }
    //下面这个只能使用在utf-8的编码格式中
    $str = preg_split('//u',trim($string));
    for($i = $start,$len = 1;$i<count($str)-1 && $len<=$length;$i++,$len++){
        $new .= $str[$i+1];
    }
    //如果是gbk，就需要在返回结果之前，把之前的转换编码恢复一下
    if($charset==='gbk'){
        $new = iconv("utf-8","gbk",$new);
    }
    return count($str)-2<$length?$new:$new.$dot;
}
function showMsg($msg, $url = ''){
    if(!$url) {
        echo "<script>alert('{$msg}');history.go(-1);</script>";die;
    }else {
        echo "<script>alert('{$msg}');location.href='{$url}';</script>";die;
    }
}
/**
 * [echo_json 返回结果给前端]
 * @author JunJuaHuang
 * @DateTime 2019-08-08T15:39:21+0800
 * @param    [type]                   $code [返回码]
 * @param    string                   $msg  [信息]
 * @return   [type]                         [json格式的字符串]
 */
function echo_json($code, $msg = '') {
    $data = array(
        'code' => $code, // 自定义 
    );
    if($msg) {
        $data['msg'] = $msg;
    }
    echo json_encode($data);die;
}