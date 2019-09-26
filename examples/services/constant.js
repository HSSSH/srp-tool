// export const host = 'http://192.168.50.20:8081';
// export const host = "http://localhost:8091";
export const debug = process.env.NODE_ENV !== 'production';
export const allPanelType = [
    'layoutPanel',
    'layoutPicText',
    'layoutPicText1',
    'layoutBottom'
];
export const ALL_ELEMENT = [
{  
    name: '模块列表',
    icon: 'icon-renwuxiangqing',
    contentList: [
        {
            text: '排版',
            ifShowDetail: false,
            children: [
                {
                    text: '自由容器',
                    type: 'layoutPanel',
                },
                {
                    text: '导航容器',
                    type: 'composePanel',
                },
            ]
        },
        {
            text: '基础',
            ifShowDetail: false,
            children: [
                {
                    text: '文本',
                    type: 'label',
                }, 
                {
                    text: '图片',
                    type: 'picture'
                },
                {
                    text: '按钮',
                    type: 'button'
                },
                {
                    text: '视频',
                    type: 'video'
                },
                {
                    text: '下拉框',
                    type: 'select'
                }
            ]
        },
        {
            text: '高级',
            ifShowDetail: false,
            children: [
                {
                    text: '广告栏',
                    type: 'picTextTable'
                },
                {
                    text: '底部文字',
                    type: 'bottom'
                },
                {
                    text: '轮播图',
                    type: 'slidePic'
                },
                {
                    text: '合作伙伴',
                    type: 'companion'
                },
                {
                    text: '分页图文',
                    type: 'picTextByPage'
                },
                {
                    text: '分页图文2',
                    type: 'picTextByPage2'
                },
                {
                    text: '新闻中心',
                    type: 'news'
                },
                {
                    text: '图表',
                    type: 'charts'
                },
                {
                    text: '相册',
                    type: 'album'
                }
            ]
        },
        {
            text: '导航',
            ifShowDetail: false,
            children: [
                {
                    text: '顶部导航',
                    type: 'guide'
                },
                {
                    text: '侧边导航',
                    type: 'sideGuide',
                }
            ]
        }, 
        {
            text: '华南院',
            ifShowDetail: false,
            children: [
                {
                    text: '研发平台',
                    type: 'developSection'
                },
                {
                    text: '科技产品',
                    type: 'slide'
                },
                {
                    text: '平台人物产品',
                    type: 'slideDetail'
                },
                {
                    text: '党内文件',
                    type: 'document'
                }
            ]
        },
        {
            text: 'banner',
            ifShowDetail: false,
            children: [
            ]
        },
        {
            text: '底部',
            ifShowDetail: false,
            children: [
            ]
        },
    ],
},
{
    name: '产品列表',
    icon: 'icon-chanpin'
},
{
    name: '页面列表',
    icon: 'icon-shengchanguanli'
}
]