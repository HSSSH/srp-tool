const stickSize = 8;
const styleMapping = {
  y: {
    t: 'top',
    m: 'marginTop',
    b: 'bottom',
  },
  x: {
    l: 'left',
    m: 'marginLeft',
    r: 'right',
  }
};

export default {
    name: 'vue-drag-resize',
    props: {
        parentW: {
            type: Number,
            default: 0,
            validator: function (val) {
                return val >= 0
            }
        },
        parentH: {
            type: Number,
            default: 0,
            validator: function (val) {
                return val >= 0
            }
        },
        minw: {
            type: Number,
            default: 10,
            validator: function (val) {
                return val > 0
            }
        },
        minh: {
            type: Number,
            default: 10,
            validator: function (val) {
                return val > 0
            }
        },
        w: {
            type: [String, Number],
            default: '100px',
            validator: function (val) {
                return typeof val === 'string' || typeof val === 'number'
            }
        },
        h: {
            type: Number,
            default: 100,
            validator: function (val) {
                return val > 0
            }
        },
        x: {
            type: [String, Number],
            default: '0px',
            validator: function (val) {
                return typeof val === 'string' || typeof val === 'number'
            }
        },
        y: {
            type: Number,
            default: 0,
            validator: function (val) {
                return typeof val === 'number'
            }
        },
        z: {
        },
        isActive: {
            type: Boolean, default: false
        },
        sticks: {
            type: Array,
            default: function () {
                return ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
            }
        }
    },

    data() {
        return {
            parentWidth: null,
            parentHeight: null,
            minWidth: this.minw,
            minHeight: this.minh,
            rawWidth: null,
            rawHeight: this.h,
            rawLeft: null,
            rawTop: this.y,
            rawRight: null,
            rawBottom: null,
            left: null,
            top: this.y,
            right: null,
            bottom: null,
            zIndex: this.z,
            active: this.isActive,
            positionType: null,
            widthType: null,
            verPosType: 'top',
            perWidth: null,
            middlePosStr: '',
            rightPosStr: '',
            showSettingPanel: false
        }
    },

    created() {
        this.stickDrag = false;
        this.bodyDrag = false;
        this.stickAxis = null;
        this.stickStartPos = {mouseX: 0, mouseY: 0, x: 0, y: 0, w: 0, h: 0};
        this.limits = {
            minLeft: null,
            maxLeft: null,
            minRight: null,
            maxRight: null,
            minTop: null,
            maxTop: null,
            minBottom: null,
            maxBottom: null
        };
        this.currentStick = [];
    },

    mounted() {
        this.parentElement = this.$el.parentNode;
        this.parentWidth = this.parentW ? this.parentW : this.parentElement.clientWidth;
        this.parentHeight = this.parentH ? this.parentH : this.parentElement.clientHeight;

        if(typeof this.w === 'number' || this.w.endsWith('px')){
            this.widthType = 'num';
            this.rawWidth = typeof this.w === 'string'?parseInt(this.w.replace('px','')):this.w;
            this.perWidth = Math.round(this.rawWidth * 100 / this.parentWidth);
        }else if(this.w.endsWith('%')){
            this.widthType = 'percent';
            this.perWidth = parseInt(this.w.replace('%',''));
            this.rawWidth = Math.round(this.perWidth * this.parentWidth / 100);
        }

        if(typeof this.x === 'number' || this.x.endsWith('px')){
            this.positionType = 'left';
            this.rawLeft = typeof this.x === 'string'?parseInt(this.x.replace('px','')):this.x;
        }else if(this.x.indexOf('100%') != -1){
            this.positionType = 'right';
            this.rightPosStr = this.x;
            //提取字符串calc(100% - npx)中的n
            this.rawLeft = this.parentWidth - this.rawWidth - parseInt(this.x.match(/\d+(.\d+)?/g)[2]);
        }else if(this.x.indexOf('50%') != -1){
            this.positionType = 'middle';
            this.middlePosStr = this.x;
            this.rawLeft = Math.round((this.parentWidth - this.rawWidth) / 2);
        }
        this.rawBottom = this.parentHeight - this.rawHeight - this.rawTop;
        this.rawRight = this.parentWidth - this.rawLeft - this.rawWidth;
        
        document.documentElement.addEventListener('mousemove', this.move);
        document.documentElement.addEventListener('mouseup', this.up);
        document.documentElement.addEventListener('mouseleave', this.up);

        document.documentElement.addEventListener('mousedown', this.deselect);

        document.documentElement.addEventListener('touchmove', this.move, true);
        document.documentElement.addEventListener('touchend touchcancel', this.up, true);
        document.documentElement.addEventListener('touchstart', this.up, true);
    },

    beforeDestroy() {
        document.documentElement.removeEventListener('mousemove', this.move);
        document.documentElement.removeEventListener('mouseup', this.up);
        document.documentElement.removeEventListener('mouseleave', this.up);

        document.documentElement.removeEventListener('mousedown', this.deselect);

        document.documentElement.removeEventListener('touchmove', this.move, true);
        document.documentElement.removeEventListener('touchend touchcancel', this.up, true);
        document.documentElement.removeEventListener('touchstart', this.up, true);
    },

    methods: {
        deselect() {
            this.active = false;
        },

        move(ev) {
            if (!this.stickDrag && !this.bodyDrag) {
                return
            }
            ev.stopPropagation();

            if (this.stickDrag) {
                this.stickMove(ev);
            }
            if (this.bodyDrag) {
                this.bodyMove(ev)
            }
        },

        up(ev) {
            if (this.stickDrag) {
                this.stickUp(ev);
            }
            if (this.bodyDrag) {
                this.bodyUp(ev)
            }
        },

        bodyDown(ev) {
            this.active = true;

            if (ev.button && ev.button !== 0) {
                return
            }
          
            ev.stopPropagation();
            ev.preventDefault();

            this.bodyDrag = true;
            this.$store.dispatch('event/changeMouseDown', this.bodyDrag);
            this.$emit('saveOrDeleteId',this.bodyDrag);

            this.stickStartPos.mouseX = ev.pageX || ev.touches[0].pageX;
            this.stickStartPos.mouseY = ev.pageY || ev.touches[0].pageY;

            this.stickStartPos.left = this.left;
            this.stickStartPos.right = this.right;
            this.stickStartPos.top = this.top;
            this.stickStartPos.bottom = this.bottom;

            this.limits = this.calcDragLimitation();
        },

        calcDragLimitation() {
            const parentWidth = this.parentWidth;
            const parentHeight = this.parentHeight;

            return {
                minLeft: 0,
                maxLeft: parentWidth - this.width,
                minRight: 0,
                maxRight: parentWidth - this.width,
                minTop: 0,
                maxTop: parentHeight - this.height,
                minBottom: 0,
                maxBottom: parentHeight - this.height
            }
        },

        bodyMove(ev) {
            const stickStartPos = this.stickStartPos;

            let delta = {
                x: stickStartPos.mouseX - (ev.pageX || ev.touches[0].pageX),
                y: stickStartPos.mouseY - (ev.pageY || ev.touches[0].pageY)
            };

            this.rawTop = stickStartPos.top - delta.y;
            this.rawBottom = stickStartPos.bottom + delta.y;
            if(this.positionType != 'middle'){
                this.rawLeft = stickStartPos.left - delta.x;
                this.rawRight = stickStartPos.right + delta.x;
            }
            this.$emit('changePosSize', this.rect);
            let tempX = ev.pageX || ev.touches[0].pageX;
            let tempY = ev.pageY || ev.touches[0].pageY;
            //开始MOVE，且位移不为0
            if (Math.sqrt((tempX-this.stickStartPos.mouseX)*(tempX-this.stickStartPos.mouseX)+(tempY-this.stickStartPos.mouseY)*(tempY-this.stickStartPos.mouseY))!=0) {
                this.$store.dispatch('event/changeIsMove', true);
            }
        },

        bodyUp(ev) {
            this.bodyDrag = false;
            this.$store.dispatch('event/changeMouseDown', this.bodyDrag);
            this.checkLimit();
            this.$emit('changePosSize', this.rect);
            const vm = this;
            setTimeout(() => {
                vm.$store.dispatch('event/changeIsMove', false);
            },0);
            this.$emit('saveOrDeleteId',this.bodyDrag);

            this.stickStartPos = {mouseX: 0, mouseY: 0, x: 0, y: 0, w: 0, h: 0};
            this.limits = {
                minLeft: null,
                maxLeft: null,
                minRight: null,
                maxRight: null,
                minTop: null,
                maxTop: null,
                minBottom: null,
                maxBottom: null
            };
        },

        stickDown (stick, ev) {
            if (!this.active) {
                return
            }

            this.stickDrag = true;
            this.stickStartPos.mouseX = ev.pageX || ev.touches[0].pageX;
            this.stickStartPos.mouseY = ev.pageY || ev.touches[0].pageY;
            this.stickStartPos.left = this.left;
            this.stickStartPos.right = this.right;
            this.stickStartPos.top = this.top;
            this.stickStartPos.bottom = this.bottom;
            this.currentStick = stick.split('');
            this.stickAxis = null;

            switch (this.currentStick[0]) {
                case 'b':
                    this.stickAxis = 'y';
                    break;
                case 't':
                    this.stickAxis = 'y';
                    break;
            }
            switch (this.currentStick[1]) {
                case 'r':
                    this.stickAxis = this.stickAxis === 'y' ? 'xy' : 'x';
                    break;
                case 'l':
                    this.stickAxis = this.stickAxis === 'y' ? 'xy' : 'x';
                    break;
            }

            this.limits = this.calcResizeLimitation();
        },

        calcResizeLimitation() {
            let minw = this.minWidth;
            let minh = this.minHeight;
            const width = this.width;
            const height = this.height;
            const bottom = this.bottom;
            const top = this.top;
            const left = this.left;
            const right = this.right;
            const parentLim = 0;

            let limits = {
                minLeft: parentLim,
                maxLeft: left + (width - minw),
                minRight: parentLim,
                maxRight: right + (width - minw),
                minTop: parentLim,
                maxTop: top + (height - minh),
                minBottom: parentLim,
                maxBottom: bottom + (height - minh)
            };

            return limits;
        },

        stickMove(ev) {
            const stickStartPos = this.stickStartPos;

            const delta = {
                x: stickStartPos.mouseX - (ev.pageX || ev.touches[0].pageX),
                y: stickStartPos.mouseY - (ev.pageY || ev.touches[0].pageY)
            };

            switch (this.currentStick[0]) {
                case 'b':
                    this.rawBottom = stickStartPos.bottom + delta.y;
                    break;
                case 't':
                    this.rawTop = stickStartPos.top - delta.y;
                    break;
            }

            if(this.widthType == 'num'){
                switch (this.currentStick[1]) {
                    case 'r':
                        if(this.positionType == "middle"){
                            if(stickStartPos.left + 2 * delta.x + stickStartPos.right < this.parentWidth){
                                this.rawRight = stickStartPos.right + delta.x;
                                this.rawLeft = stickStartPos.left + delta.x;
                                this.middlePosStr = 'calc(50% - ' + Math.round(this.rawWidth / 2) + 'px)';
                            }
                        }
                        else{
                            this.rawRight = stickStartPos.right + delta.x;
                        }
                        break;
                    case 'l':
                        if(this.positionType == "middle"){
                            if(stickStartPos.left - 2 * delta.x + stickStartPos.right < this.parentWidth){
                                this.rawLeft = stickStartPos.left - delta.x;
                                this.rawRight = stickStartPos.right - delta.x;
                                this.middlePosStr = 'calc(50% - ' + Math.round(this.rawWidth / 2) + 'px)'
                            }
                        }
                        else{
                            this.rawLeft = stickStartPos.left - delta.x;
                        }
                        break;
                }
            }

            this.$emit('changePosSize', this.rect);
        },

        stickUp() {
            this.stickDrag = false;
            this.stickStartPos = {
                mouseX: 0,
                mouseY: 0,
                x: 0,
                y: 0,
                w: 0,
                h: 0
            };
            this.limits = {
                minLeft: null,
                maxLeft: null,
                minRight: null,
                maxRight: null,
                minTop: null,
                maxTop: null,
                minBottom: null,
                maxBottom: null
            };
            this.rawTop = this.top;
            this.rawBottom = this.bottom;
            this.rawLeft = this.left;
            this.rawRight = this.right;

            this.stickAxis = null;

            this.$emit('changePosSize', this.rect);
            this.$store.dispatch('event/changeStick');
        },

        checkLimit(){
            const limits = this.limits;
            if (limits.minLeft !== null && this.rawLeft < limits.minLeft) {
                this.rawLeft = limits.minLeft;
            } else if (limits.maxLeft !== null && limits.maxLeft < this.rawLeft) {
                this.rawLeft = limits.maxLeft;
            }
            if (limits.minRight !== null && this.rawRight < limits.minRight) {
                this.rawRight = limits.minRight;
            } else if (limits.maxRight !== null && limits.maxRight < this.rawRight) {
                this.rawRight = limits.maxRight;
            }
            if (limits.minTop !== null && this.rawTop < limits.minTop) {
                this.rawTop = limits.minTop;
            } else if (limits.maxTop !== null && limits.maxTop < this.rawTop) {
                this.rawTop = limits.maxTop;
            }
            if (limits.minBottom !== null && this.rawBottom < limits.minBottom) {
                this.rawBottom = limits.minBottom;
            } else if (limits.maxBottom !== null && limits.maxBottom < this.rawBottom) {
                this.rawBottom = limits.maxBottom;
            }
            this.left = this.rawLeft;
            this.right = this.rawRight;
            this.top = this.rawTop;
            this.bottom = this.rawBottom;
        },

        changePositionType(){
            if(this.positionType == 'middle'){
                let halfWidthStr = this.widthType == 'num'?Math.round(this.rawWidth / 2) + 'px':Math.round(this.perWidth / 2) + '%';
                this.middlePosStr = 'calc(50% - ' + halfWidthStr + ')';
                this.rawLeft = Math.round(this.parentWidth / 2) - this.widthType == 'num'?Math.round(this.rawWidth / 2):Math.round(this.parentWidth * this.perWidth / 200);
                this.rawRight = this.parentWidth - this.rawLeft - this.rawWidth;
            }
            else if(this.positionType == 'right'){
                this.rightPosStr = 'calc(100% - ' + (this.widthType == 'num'?this.rawWidth + 'px - ': this.perWidth + '% - ') + this.rawRight + 'px)';
            }
            this.$emit('changePosSize', this.rect);
        },

        changeWidth(){
            if(this.widthType == "percent"){
                this.perWidth = Math.round(this.rawWidth * 100 / this.parentWidth);
            }
            if(this.widthType == "num"){
                this.rawWidth = Math.round(this.perWidth * this.parentWidth / 100);
            }
            this.$emit('changePosSize', this.rect);
        },

        deleteElement(){
            this.$emit('deleteElement');
        }

    },

    computed: {
        style() {
            let tempStyle = {
                top: this.top + 'px',
                width: this.widthType == 'num'?this.width + 'px':this.perWidth + '%',
                height: this.height + 'px',
                zIndex: this.zIndex
            }
            switch (this.positionType){
                case 'left':
                    tempStyle.left = this.left + 'px';
                    break;
                case 'middle':
                    tempStyle.left = this.middlePosStr;
                    break;
                case 'right':
                    tempStyle.left = this.rightPosStr;
                    break;
            }
            return tempStyle;
        },

        vdrStick() {
            return (stick) => {
                const stickStyle = {
                    width: `${stickSize}px`,
                    height: `${stickSize}px`,
                };
                stickStyle[styleMapping.y[stick[0]]] = `${stickSize / -2}px`;
                stickStyle[styleMapping.x[stick[1]]] = `${stickSize / -2}px`;
                return stickStyle;
            }
        },

        width() {
            return this.parentWidth - this.left - this.right;
        },

        height() {
            return this.parentHeight - this.top - this.bottom;
        },

        rect() {
            let tempRect = {
                top: Math.round(this.top),
                width: this.widthType == 'num'?Math.round(this.width):this.perWidth + '%',
                height: Math.round(this.height),
                zIndex:this.zIndex
            }
            switch (this.positionType){
                case 'left':
                    tempRect.left = this.left;
                    break;
                case 'middle':
                    tempRect.left = this.middlePosStr;
                    break;
                case 'right':
                    tempRect.left = this.rightPosStr;
                    break;
            }
            return tempRect;
        }
    },

    watch: {
        rawLeft(newLeft) {
            if(this.stickDrag){
                const limits = this.limits;
                if (limits.minLeft !== null && newLeft < limits.minLeft) {
                    newLeft = limits.minLeft;
                } else if (limits.maxLeft !== null && limits.maxLeft < newLeft) {
                    newLeft = limits.maxLeft;
                }
            }
            this.left = newLeft;
            this.rawWidth = this.parentWidth - newLeft - this.rawRight;
            if(this.positionType == 'right'){
                this.rightPosStr = 'calc(100% - ' + (this.widthType == 'num'?this.rawWidth + 'px - ': this.perWidth + '% - ') + this.rawRight + 'px)';
            }
        },

        rawRight(newRight) {
            if(this.stickDrag){
                const limits = this.limits;
                if (limits.minRight !== null && newRight < limits.minRight) {
                    newRight = limits.minRight;
                } else if (limits.maxRight !== null && limits.maxRight < newRight) {
                    newRight = limits.maxRight;
                }
            }
            this.right = newRight;
            this.rawWidth = this.parentWidth - newRight - this.rawLeft;
            if(this.positionType == 'right'){
                this.rightPosStr = 'calc(100% - ' + (this.widthType == 'num'?this.rawWidth + 'px - ': this.perWidth + '% - ') + this.rawRight + 'px)';
            }
        },

        rawTop(newTop) {
            if(this.stickDrag){
                const limits = this.limits;
                if (limits.minTop !== null && newTop < limits.minTop) {
                    newTop = limits.minTop;
                } else if (limits.maxTop !== null && limits.maxTop < newTop) {
                    newTop = limits.maxTop;
                }
            }
            this.top = newTop;
        },

        rawBottom(newBottom) {
            if(this.stickDrag){
                const limits = this.limits;
                if (limits.minBottom !== null && newBottom < limits.minBottom) {
                    newBottom = limits.minBottom;
                } else if (limits.maxBottom !== null && limits.maxBottom < newBottom) {
                    newBottom = limits.maxBottom;
                }
            }
            this.bottom = newBottom;
        },

        perWidth(newVal){
            if(this.widthType != 'percent') return;
            switch(this.positionType){
                case 'left':
                    this.rawRight = this.parentWidth - this.rawLeft - Math.round(newVal * this.parentWidth / 100);
                    break;
                case 'middle':
                    this.rawLeft = Math.round(this.parentWidth * (50 - Math.round(newVal / 2)) / 100);
                    this.rawRight = this.parentWidth - this.rawLeft - Math.round(newVal * this.parentWidth / 100);
                    this.middlePosStr = 'calc(50% - ' + Math.round(newVal / 2) + '%)'
                    break;
                case 'right':
                    this.rawRight = this.parentWidth - this.rawLeft - Math.round(newVal * this.parentWidth / 100);
                    this.rightPosStr = 'calc(100% - ' + (this.widthType == 'num'?this.rawWidth + 'px - ': newVal + '% - ') + this.rawRight + 'px)';
                    break;
            }
            this.$emit('changePosSize', this.rect);
            this.$store.dispatch('event/changeStick');
        },

        zIndex(val){
            this.$emit('changePosSize', this.rect);
        },

        z(val) {
            if (val >= 0 || val === 'auto') {
                this.zIndex = val
            }
        },

        // x() {
        //     if (this.stickDrag || this.bodyDrag) {
        //         return
        //     }
    //         this.limits = this.calcDragLimitation();

        //     let delta = this.x - this.left;
        //     this.rawLeft = this.x;
        //     this.rawRight = this.right - delta;
        // },

        y() {
            if (this.stickDrag || this.bodyDrag) {
                return
            }

            this.limits = this.calcDragLimitation();
            let delta = this.y - this.top;
            this.rawTop = this.y;
            this.rawBottom = this.bottom - delta;
        },

        // w() {
        //     if (this.stickDrag || this.bodyDrag) {
        //         return
        //     }

        //     this.currentStick = ['m', 'r'];
        //     this.stickAxis = 'x';
    //         this.limits = this.calcResizeLimitation();
        //     let delta = this.width - this.w;
        //     this.rawRight = this.right + delta;
        // },

        h() {
            if (this.stickDrag || this.bodyDrag) {
                return
            }

            this.currentStick = ['b', 'm'];
            this.stickAxis = 'y';
            this.limits = this.calcResizeLimitation();
            let delta = this.height - this.h;
            this.rawBottom = this.bottom + delta;
        },

        active(isActive){
            this.$emit('setActivateEv',isActive);
        },

        isActive(val) {
            this.active = val;
        },

        parentW(val) {
            this.parentWidth = val;
            if(this.widthType == 'percent'){
                this.rawWidth = Math.round(this.perWidth * val / 100);
            }
            if(this.positionType == 'middle'){
                this.rawLeft = Math.round((this.parentWidth - this.rawWidth)/ 2);
                this.rawRight = this.parentWidth - this.rawLeft - this.rawWidth;
            }
            else if(this.positionType == 'right'){
                this.rawLeft = val - this.rawWidth - this.rawRight;
            }
            else{
                this.rawRight = val - this.rawWidth - this.rawLeft;
            }
        },

        parentH(val) {
            this.parentHeight = val;
            this.rawBottom = val - this.rawHeight - this.rawTop;
        }
    }
}
