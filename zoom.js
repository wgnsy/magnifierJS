var Zoom = (function(){
    var _imgCoords = {};
    var _imgSrc;
    var _img;
    var _cursor;
    const _zoomOptions = //zoom options
    {
        'width': '120px',
        'height':'120px',
        'zoom' : 2
    };
    var init = function(){
        _img = $('.img-zoom'); 
        _cursor = $('.cursor');

        _imgSrc = _img.attr('src'); //get img src
        _imgSrc = _imgSrc.replace("\\", "/"); 
        
        renderView(); // build divs
        getImgOffset();
        moveZoom();
    };
    var moveZoom = function(){
        $(document).on('mousemove',function(event){
            
        
            var x = event.clientX; // get X offset
            var y = event.clientY; //get y offset
            var imgX = _imgCoords.x; // get img offset left
            var imgY = _imgCoords.y; // get img offset top
            
                if(x >= imgX && x <= imgX+_img.width() //check if offset fit img width/height
                &&
                   y >= imgY && y <= imgY+_img.height()){
      
            _cursor.show(); //show magnifier
                _cursor.removeClass('scale-off'); 
                _cursor.addClass('scale-on'); //animate scale

            _cursor.css('background-size',(_img.width() *_zoomOptions.zoom) + 'px ' + (_img.width() *_zoomOptions.zoom) + 'px'); //set magnifier zoom
            //calculate magnifier
            cx = (((x-_img.offset().left) * _zoomOptions.zoom) - (_cursor.width()/2));
            cy = (((y-_img.offset().top) * _zoomOptions.zoom) - (_cursor.width()/2));
            //set position
            _cursor.css({
                "background-position": "-" + cx + 'px '+ "-" + cy + 'px'
              });
        
              //set magnifier position x,y
            _cursor.css('left',x-(_cursor.width()/2)+'px');
            _cursor.css('top',y-(_cursor.height()/2)+'px');
                }else{ //hide magnifier when outside
                    _cursor.removeClass('scale-on');
                    _cursor.addClass('scale-off');
                }
            });
    };
    var getImgOffset = function() {
         var x = _img.offset().left;
         var y = _img.offset().top;
         coords = {'x':x,'y':y};
            
        _imgCoords = coords;
        
      };
      var renderView = function(){

        if(_cursor.length) _cursor.remove();
          let zoomStyles = {
              'width': _zoomOptions.width,
              'height': _zoomOptions.height,
              'display':'none',
              'transform':'scale(0)',
              'border-radius':'50%',
              'border':'3px solid green',
              'position':'absolute',
              //'cursor':'none',
              'background-image':"url('" + _imgSrc + "')",
              'background-repeat':'no-repeat',
              'background-size':_img.width()+'px '+_img.height()+'px'
          }
       
       var zoomDiv = document.createElement('div');
       zoomDiv.className = 'cursor';
       
       Object.assign(zoomDiv.style,zoomStyles);
     //  zoomDiv.appendChild(imgDiv);
       document.body.appendChild(zoomDiv);
      // _img.clone().prependTo( zoomDiv );
       _cursor = $('.cursor');

      }
    
    return {
    init:init
}
})();
$(function() {  
    Zoom.init();
});



