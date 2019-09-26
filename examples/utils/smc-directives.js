import Vue from 'vue';
import echarts from 'echarts';
import BScroll from 'better-scroll';
import wangEditor from "wangeditor";
import Vditor from 'vditor';
import axios from 'axios';
import { insertText,setSelectionByInlineText,i18n } from 'vditor';
/*
* echarts 配置指令
* echarts-render="{options: options}"
*/
Vue.directive('echartsRender', {
    inserted (el, binding) {
        const chart = echarts.init(el);
        el.chartoption = JSON.stringify(binding.value.options);
        chart.setOption(binding.value.options);
        window.addEventListener('resize', chart.resize);
    },
    update (el, binding) {
        if (JSON.stringify(binding.value.options) == el.chartoption) return;
        const oldChart = echarts.getInstanceByDom(el);
        if (oldChart) {
            window.removeEventListener('resize', oldChart.resize);
            oldChart.dispose();
        }
        const chart = echarts.init(el);
        chart.setOption(binding.value.options);
        el.chartoption = JSON.stringify(binding.value.options);
        window.addEventListener('resize', chart.resize);
    },
    unbind (el) {
        const oldChart = echarts.getInstanceByDom(el);
        if (oldChart) {
            window.removeEventListener('resize', oldChart.resize);
            oldChart.dispose();
        }
    }
});

/*
* better-scroll 配置指令
*/
Vue.directive('betterScroll', {
    inserted (el, binding) {
        const options = {
            scrollbar: {
                fade: false,
                interactive: true
            },
            mouseWheel: true, // 以上为默认配置
            ...(binding.value && binding.value.options)
        },
            events = (binding.value && binding.value.events) || {};
        const scroller = new BScroll(el, options);

        for (let key in events) { // 绑定事件
            if (events.hasOwnProperty(key)) {
                scroller.on(key, events[key]);
            }
        }
        if (binding.value && binding.value.init) { // 把BScroll对象回传以便进行额外操作
            binding.value.init(scroller);
        }
        el.style.position = 'relative';
        el.style.overflow = 'hidden';
    }
});


/*
* v-wang-editor wangeditor指令
*/
Vue.directive('wangEditor', {
    bind (el,binding) {
    },
    inserted (el, binding) {
        let editor = {};
        if (el.children[1]) {
            editor = new wangEditor(el.children[0], el.children[1]);
        }
        else {
            editor = new wangEditor(el.children[0]);
        }
        el.editor = editor;
        if (binding.value.config) {
            for (let key in binding.value.config) {
                if (binding.value.config.hasOwnProperty(key)) {
                    editor.customConfig[key] = binding.value.config[key];
                }
            }
        }
        editor.create();
        editor.txt.html(binding.value.text);
    },
    update (el, binding) {
        const editor = el.editor;
        if (binding.value.signal) {
            editor.txt.clear();
        }
        if(binding.oldValue.changeSignal != binding.value.changeSignal){
            editor.txt.html(binding.value.text);
        }
    },
    unbind (el) {
    }
});

/*
* v-vditor vditor指令
*/
Vue.directive('vditor', {
    bind (el,binding) {
    },
    inserted (el, binding) {
        const vditor = new Vditor('vditor', {
          counter: 100,
          height: 300,
          editorName: 'vditor',
          tab: ' ',
          upload: {
            accept: 'image/*',
            token: 'test',
            url: '/source/srp/source/uploadFiles?sourceType=picture',
            filename (name) {
              // ? \ / : | < > * [ ] white to -
              // return name.replace(/\?|\\|\/|:|\||<|>|\*|\[|\]|\s+/g, '-')
              return name;
            },
          },
        });
        vditor.focus();
        el.vditor = vditor;
    },
    update (el, binding) {
    },
    unbind (el) {
    }
});
