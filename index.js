const Draw = (lineWidth = 10, strokeStyle = "#000") => {
    let canvas = document.getElementById('canvas');

    canvas.width = document.documentElement.clientWidth;//应该去获取文档的高度
    canvas.height = document.documentElement.clientHeight;
    let painting = false;
    let last = {};
    document.ontouchmove = function(e){ e.preventDefault(); }
    let ctx = canvas.getContext('2d');
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth; //粗细
    ctx.lineCap = 'round';


    //画连贯线条
    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    //移动设备画画
    function drawForMobile() {
        canvas.ontouchstart = (e) => {
            let { clientX, clientY } = e.touches[0];//第一个手指
            last = { clientX, clientY };
        }
        canvas.ontouchmove = (e) => {
            let { clientX, clientY } = e.touches[0];//第一个手指
            drawLine(last.clientX, last.clientY, clientX, clientY);
            last = { clientX, clientY };
        }
    }

    // pc设备画画
    function drawForPc() {
        canvas.onmousedown = (e) => {
            painting = true;
            last = { clientX: e.clientX, clientY: e.clientY };
        }
        canvas.onmousemove = (e) => {
            if (painting) {
                drawLine(last.clientX, last.clientY, e.clientX, e.clientY);
                last = { clientX: e.clientX, clientY: e.clientY };
            }
        }
        canvas.onmouseup = () => {
            painting = false;
        }
    }

    let isTouchDevice = 'ontouchstart' in document.documentElement;//是否手机端
    isTouchDevice ? drawForMobile() : drawForPc()

}

