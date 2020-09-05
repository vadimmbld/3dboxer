let isAnimated = false;
let isMouseDown = false;
let isVertical = true;
let Grounds = $('#boxer3d .ground');
let GroundsArr = [];
GroundsArr[0] = { 
    right:3,
    left:1,
    top:4,
    bottom:5
}
GroundsArr[1] = { 
    right:0,
    left:2,
    top:4,
    bottom:5
}
GroundsArr[2] = { 
    right:1,
    left:3,
    top:4,
    bottom:5
}
GroundsArr[3] = { 
    right:2,
    left:0,
    top:4,
    bottom:5
}
GroundsArr[4] = { 
    right:3,
    left:1,
    top:2,
    bottom:0
}
GroundsArr[5] = { 
    right:3,
    left:1,
    top:0,
    bottom:2
}


let currentGround = 0;
function ResetRotate(){
    let slide = Grounds[currentGround];
    let matrix = $(slide).css('transform');
    console.log(currentGround);
    let values = matrix.split('(')[1].split(')')[0].split(',');
    let a = values[0];
    let b = values[2];
    let c = values[5];
    let d = values[6];
    let angleY = Math.round(Math.atan2(b, a) * (180/Math.PI));
    let angleX = Math.round(Math.atan2(d, c) * (180/Math.PI));
    if(!angleY){
        angleY = 0;
    }
    if(!angleX){
        angleX = 0;
    }
    if(angleX == 90){
        $(slide).parent().css('transform','rotateX('+ -(angleX) +'deg) rotateY(0deg) rotateZ('+ (angleY) +'deg)')
    }else if(angleX == -90){
        $(slide).parent().css('transform','rotateX('+ -(angleX) +'deg) rotateY(0deg) rotateZ('+ -(angleY) +'deg)')
    }else{
        $(slide).parent().css('transform','rotateX('+ -(angleX) +'deg) rotateY(' + (angleY) + 'deg) rotateZ(0deg)')
    }
}

function Rotater(){
    if(!$(this).parent().hasClass('clicked') && $(this).parent().hasClass('anim_active')){
        let $animElem = $(this.parentNode);
        let transformValue = $animElem.css('webkitTransform') || $animElem.css('transform');
        $(this).parent().addClass('clicked').removeClass('anim_active');
        $animElem.css({     'webkitTransform': transformValue,
                            'transform': transformValue}).removeClass('anim_active');
        requestAnimationFrame(function(){
            $animElem.css({  'webkitTransform': 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
                            'transform': 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'});
        })
        setTimeout(function(){
            isAnimated = true;
        },600)

    } 
}
$(document).ready(function(){
    let startMoveX;
    let startMoveY;
    let endMoveX;
    let endMoveY;
    $('#boxer3d .ground').on('click', Rotater);
    $('#boxer3d .ground').on('mousedown', function(event){
        if(isAnimated){
            isMouseDown = true;
            startMoveX = event.offsetX;
            startMoveY = event.offsetY;
        }
    })
    $('#boxer3d .ground').on('mousemove', function(event){
        if(isAnimated && isMouseDown){
            let matrix = $(this).css('transform');
            let values = matrix.split('(')[1].split(')')[0].split(',');
            let a = values[0];
            let b = values[2];
            let c = values[5];
            let d = values[6];
            let angleY = Math.round(Math.atan2(b, a) * (180/Math.PI));
            let angleX = Math.round(Math.atan2(d, c) * (180/Math.PI));
            if(!angleY){
                angleY = 0;
            }
            if(!angleX){
                angleX = 0;
            }
            if(angleX == 90){
                $(this).parent().css('transform','rotateX('+ -(event.offsetY-startMoveY+angleX) +'deg) rotateY(0deg) rotateZ('+ (event.offsetX-startMoveX+angleY) +'deg)')
            }else if(angleX == -90){
                $(this).parent().css('transform','rotateX('+ -(event.offsetY-startMoveY+angleX) +'deg) rotateY(0deg) rotateZ('+ -(event.offsetX-startMoveX+angleY) +'deg)')
            }else{
                $(this).parent().css('transform','rotateX('+ -(event.offsetY-startMoveY+angleX) +'deg) rotateY(' + (event.offsetX-startMoveX+angleY) + 'deg) rotateZ(0deg)')
            }
             
        }
    })
    $('#boxer3d .ground').on('mouseout', function(event){
        if(isAnimated && isMouseDown){
            isMouseDown = false;
            endMoveX = event.offsetX;
            endMoveY = event.offsetY;
            if(Math.abs(startMoveX-endMoveX) > 20 || Math.abs(startMoveY-endMoveY) > 20 ){
                if(Math.abs(startMoveX-endMoveX) > Math.abs(startMoveY-endMoveY)){
                    if(startMoveX-endMoveX>0){
                        currentGround = GroundsArr[currentGround].left;
                        ResetRotate();
                        console.log('left')
                    }else{
                        currentGround = GroundsArr[currentGround].right;
                        ResetRotate();
                        console.log('right')
                    }
                }else{
                    if(startMoveY-endMoveY>0){
                        currentGround = GroundsArr[currentGround].bottom;
                        ResetRotate();
                        console.log('bottom')
                    }else{
                        currentGround = GroundsArr[currentGround].top; 
                        ResetRotate();
                        console.log('top')
                    }
                }
            }
        }
    })
    $('#boxer3d .ground').on('mouseup', function(event){
        if(isAnimated && isMouseDown){
            isMouseDown = false;
            endMoveX = event.offsetX;
            endMoveY = event.offsetY;
            if(Math.abs(startMoveX-endMoveX) > 20 || Math.abs(startMoveY-endMoveY) > 20 ){
                if(Math.abs(startMoveX-endMoveX) > Math.abs(startMoveY-endMoveY)){
                    if(startMoveX-endMoveX>0){
                        currentGround = GroundsArr[currentGround].left;
                        ResetRotate();
                        console.log('left')
                    }else{
                        currentGround = GroundsArr[currentGround].right;
                        ResetRotate();
                        console.log('right')
                    }
                }else{
                    if(startMoveY-endMoveY>0){
                        currentGround = GroundsArr[currentGround].bottom;
                        ResetRotate();
                        console.log('bottom')
                    }else{
                        currentGround = GroundsArr[currentGround].top;
                        ResetRotate();
                        console.log('top')
                    }
                }
            }
            
        }
    })
})