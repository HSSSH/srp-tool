export default {
    'layout': [],
    'comResource':{},
    'copyResource':{},
    'composePanel':{
        'id': '',
        'type': '',
        'guideConfig': {
            'top': -15,
            'width': '1000px'
        },
        'panelList':[]
    },
    'layoutPanel': {
        'name': '',
        'width': '1000px',
        'height': '650px',
        'background': 'transparent',
        'children': [
            {
                'width': '100%',
                'height': '100%',
                'children': [
                    {
                        'width': '100%',
                        'height': '100%',
                        'background': 'transparent',
                        'rects': []
                    }
                ]
            }
        ]
    },
    'initContainer': {
        'id': '',
        'width': '100px',
        'height': 100,
        'top': 0,
        'left': '0px',
        'minw': 10,
        'minh': 10,
        'zIndex': 1,
        'active': false,
        'element': {}
    },
    'initText': {
        'type': 'label',
        'config': {
            'text': '单行文字',
            'eleStyle': {
            }
        },
        'style': {}
    },
    'initPicture': {
        'type': 'picture',
        'config': {
            'ifShowHover': false,
            'ifShowHoverIcon': true,
            'src': 'images/test/Layer4.png',
            'contentList': [
                {
                    type: '电话',
                    iconfont: 'icondianhua2',
                    url: '',
                    content: ''
                },
                {
                    type: '邮箱',
                    iconfont: 'iconyouxiang1',
                    url: '',
                    content: '',
                }
            ],
            'hoverState': '下',
            'hoverStyle': {},
            'eleStyle': {

            }
        },
        'style': {}
    },
    'initPicTextTable': {
        'type': 'picTextTable',
        'config': {
            'reSetWidth': 300, //重设宽度
            'reSetHeight': 300, //重设高度
            'rowNum': 3,
            'columnNum': 3,
            'contentList': [],
            'eleStyle': {

            },
            'ifShowBorder': true,
            'ifShowLabel': true
        },
        'style': {}
    },
    'initSlidePic': {
        'type': 'slidePic',
        'config': {
            'reSetWidth': 500, //重设宽度
            'reSetHeight': 300, //重设高度
            'setHeight': 300,
            'autoplay': true,
            'autoplaySpeed': 2000,
            'dots': 'inside',
            'radiusDot': false,
            'trigger': 'click',
            'arrow': 'hover',
            'slidePicList': [{
                "id": 1,
                "ifShowTitle": true,
                "title": '标题1',
                "ifShowButton": true,
                "buttonText": "查看更多",
                "linkType": '',
                "insideLink": '',
                "outsideLink": '',
                "absoluteUrl": "images/test/222.jpg",
                "eleStyle": {
                    "backgroundColor": "#1259c3",
                    "color": "#fff",
                    "borderRadius": "23px",
                    "padding": '5px',
                    "fontSize": '18px'
                }
            },
            {
                "id": 2,
                "ifShowTitle": true,
                "title": '标题2',
                "ifShowButton": true,
                "buttonText": "查看更多",
                "linkType": '',
                "insideLink": '',
                "outsideLink": '',
                "absoluteUrl": "images/test/333.jpg",
                "eleStyle": {
                    "backgroundColor": "#1259c3",
                    "color": "#fff",
                    "borderRadius": "23px",
                    "padding": '5px',
                    "fontSize": '18px'
                }
            }
            ],
            'eleStyle': {

            }
        },
        'style': {}
    },
    'initBottom': {
        'type': 'bottom',
        'config': {
            'reSetWidth': 500, //重设宽度
            'reSetHeight': 300, //重设高度
            'contentList': [{
                majorColumn: '产品',
                secondaryList: [{
                    name: '产品更新记录',
                },
                {
                    name: 'API文档',
                },
                {
                    name: '快速入门',
                },
                {
                    name: '参考指南',
                }
                ],
            },
            {
                majorColumn: '关于',
                secondaryList: [{
                    name: 'FAQ',
                },
                {
                    name: '关于我们',
                }
                ],
            },
            {
                majorColumn: '资源',
                secondaryList: [{
                    name: 'CG design',
                },
                {
                    name: 'CG design',
                },
                {
                    name: 'CG design',
                },
                {
                    name: 'CG design',
                }
                ]
            }
            ],
            'eleStyle': {

            }
        },
        'style': {
            width: 'max-content'
        }
    },
    'initButton': {
        'type': 'button',
        'config': {
            'text': '按钮',
            'insideLink': '',
            'outsideLink': '',
            'linkType': '',
            'eleStyle': {
                'color': '#fff',
                'background': 'rgba(45,140,240,1)',
                'fontSize': '12px',
                'borderStyle': 'solid',
                'borderColor': '',
                'borderWidth': '0px',
                'borderRadius': '0px',
            },
        },
        'style': {}
    },
    'initPanel': {
        'type': 'panel',
        'config': {
            'width': 0,
            'height': 0,
            'allowDrop': false,
            'coverVisible': false,
            'children': []
        },
        'style': {}
    },
    'initGuide': {
        'type': 'guide',
        'config': {
            'reSetWidth': 500,
            'reSetHeight': 63,
            'guideList': [
                {
                    'id': new Date().getTime(),
                    'title': '首页',
                    'url': '',
                    'viewName': '',
                }
            ],
            'normalStyle': {
                'width': '120px',
                'height': '63px',
                'fontSize': '12px',
                'lineHeight': '63px',
            },
            'guideStyle': {
                'color': '#343e5c',
                'backgroundColor': '#fff',
            },
            'activeStyle': {
                'color': '#6981fb',
                'backgroundColor': 'rgba(180, 192, 253, 0.24)',
            }
        },
    },
    'initCompanion': {
        'type': 'companion',
        'config': {
            'reSetWidth': 1000,
            'reSetHeight': 300,
            'logoRowPerPage': 2,
            'logoColPerPage': 4,
            'logoList': [
                {
                    'id': 1,
                    'name': 'pic1',
                    'absoluteUrl': require('@/images/test/222.jpg'),
                },
                {
                    'id': 2,
                    'name': 'pic2',
                    'absoluteUrl': require('@/images/test/333.jpg'),
                },
                {
                    'id': 3,
                    'name': 'pic3',
                    'absoluteUrl': require('@/images/test/444.jpg'),
                },
                {
                    'id': 4,
                    'name': 'pic4',
                    'absoluteUrl': require('@/images/test/222.jpg'),
                },
                {
                    'id': 5,
                    'name': 'pic5',
                    'absoluteUrl': require('@/images/test/333.jpg'),
                },
                {
                    'id': 6,
                    'name': 'pic6',
                    'absoluteUrl': require('@/images/test/444.jpg'),
                },
                {
                    'id': 7,
                    'name': 'pic7',
                    'absoluteUrl': require('@/images/test/222.jpg'),
                },
                {
                    'id': 8,
                    'name': 'pic8',
                    'absoluteUrl': require('@/images/test/333.jpg'),
                },
                {
                    'id': 9,
                    'name': 'pic9',
                    'absoluteUrl': require('@/images/test/444.jpg'),
                },
                {
                    'id': 10,
                    'name': 'pic10',
                    'absoluteUrl': require('@/images/test/222.jpg'),
                },
                {
                    'id': 11,
                    'name': 'pic11',
                    'absoluteUrl': require('@/images/test/333.jpg'),
                },
                {
                    'id': 12,
                    'name': 'pic12',
                    'absoluteUrl': require('@/images/test/444.jpg'),
                },
                {
                    'id': 13,
                    'name': 'pic13',
                    'absoluteUrl': require('@/images/test/222.jpg'),
                },
                {
                    'id': 14,
                    'name': 'pic14',
                    'absoluteUrl': require('@/images/test/333.jpg'),
                },
                {
                    'id': 15,
                    'name': 'pic15',
                    'absoluteUrl': require('@/images/test/444.jpg'),
                },
                {
                    'id': 16,
                    'name': 'pic16',
                    'absoluteUrl': require('@/images/test/222.jpg'),
                },
                {
                    'id': 17,
                    'name': 'pic17',
                    'absoluteUrl': require('@/images/test/333.jpg'),
                },
                {
                    'id': 18,
                    'name': 'pic18',
                    'absoluteUrl': require('@/images/test/444.jpg'),
                },
                {
                    'id': 19,
                    'name': 'pic19',
                    'absoluteUrl': require('@/images/test/222.jpg'),
                }
            ],
            'eleStyle': {

            },
        },
    },
    'initPicTextByPage': {
        'type': 'picTextByPage',
        'config': {
            'groupId': '',
            "reSetWidth": 800,
            "reSetHeight": 550,
            "eleStyle": {}
        },
        'style': {}
    },
    'initDocument': {
        'type': 'document',
        'config': {
            'groupId': '',
            'pageNum': 14,
            "reSetWidth": 800,
            "reSetHeight": 920,
            "eleStyle": {}
        },
        'style': {}
    },
    'initPicTextByPage2': {
        'type': 'picTextByPage2',
        'config': {
            'groupId': '',
            'reSetWidth': 800,
            'reSetHeight': 650,
            'ifShowDate': true,
            'ifShowSubTitle': true,
            'ifShowPic': true,
            'pageNum': 3,
            'eleStyle': {
                'marginBottom': '10px',
                'background': '#fff',
                'fontSize': '12px',
                'color': '#000',
                'height': '169px'
            },
            'titleStyle': {
                'fontSize': '16px',
                'color': '#000',
            },
            'subTitleStyle': {
                'fontSize': '14px',
                'color': '#000'
            },
            'dateStyle': {
                'fontSize':'12px',
                'color': '#000',
            },
            'ifShowSearchBtn': false,
            'searchBtnFloat': 'left',
            'ifShowDomainSelect': false,
            'picFloat':'left',
            'tagsList': []
        },
        'style': {}
    },
    'initSideGuide': {
        'type': 'sideGuide',
        'config': {
            "reSetWidth": 800,
            "reSetHeight": 550,
            "eleStyle": {},
            'contentList': [{
                'title': '公司介绍',
                'content': '公司介绍content',
            }, {
                'title': '发展历程',
                'content': '发展历程content',
            }, {
                'title': '荣誉资质',
                'content': '荣誉资质content',
            }, {
                'title': '组织机构',
                'content': '组织机构content'
            }]
        },
        'style': {}
    },
    'initVideo': {
        'type': 'video',
        'config': {
            'reSetHeight': 500,
            'reSetWidth': 500,
            'eleStyle': {},
            'videoUrl': 'http://192.168.50.20:8082/file/download/tran_admin-c170710a574a438f99d521d47f25ab15.mp4',
            'settingUrl': false,
            'postImageUrl': '',
        },
    },
    'initSlide': {
        'type': 'slide',
        'config': {
            'reSetWidth': 900,
            'reSetHeight': 300,
            'changeTime': 2000,
            'speed': 0.5,
            'ifUseData': true,
            'ifShowLabel': true,
            'link': '',
            'eleStyle': {},
            'contentList': [
                {
                   'pic': require('@/images/icon/upload-pic.png'),
                   'name': '文本'
                }
            ]
        },
    },
    'initDevelopSection': {
        'type': 'developSection',
        'config': {
            'reSetWidth': 900, //重设宽度
            'reSetHeight': 800, //重设高度
            'columnNum': 4,  //每行多少个
            'url': '',
            'typeName': '',
            'eleStyle': {},
        },
        'style': {}
    },
    'initSlideDetail': {
        'type': 'slideDetail',
        'config': {
            'reSetWidth': 900, //重设宽度
            'reSetHeight': 1000, //重设高度
            'type': '1', //类型（平台1、人物2、产品3）
            'cardWidth': 230, //卡片宽度
            'cardHeight': 129, //卡片高度
            'gap':10, //卡片间距
            'borderRadius':0, //卡片轮廓弧度
            'showLarge':'0', //显示大图
            'showName':'0', //显示名称
            'eleStyle': {},
        },
        'style': {}
    },
    'initNews': {
        'type': 'news',
        'config': {
            'reSetWidth': 1000,
            'reSetHeight': 400,
            'changeTime': 2000,
            'speed': 0.5,
            'eleStyle': {},
            'viewId': '4028b2826c41c2a7016c41dcc1870004',
        },
        'style': {}
    },
    'initAlbum': {
        'type': 'album',
        'config': {
            'groupId': '',
            'reSetWidth': 1000,
            'reSetHeight': 400,
            'ifUseData': true,
            'ifShowLabel': true,
            'ifShowBoxShadow': true,
            'contentList': [
                {
                    'title': '文本',
                    'titlePic': require('@/images/icon/upload-pic.png')
                }
            ],
            'imgStyle': {
                'width': '277px',
                'height': '156px',
                'boxShadow': ''
            },
            'eleStyle': {
                'textAlign': 'left',
                'fontSize': '20px'
            }
        },
        'style': {}
    },
    'initCharts': {
        'type': 'charts',
        'config': {
            'reSetWidth': 1000,
            'reSetHeight': 500,
            'eleStyle': {}
        },
        'style': {}
    },
    'initSelect': {
        'type': 'select',
        'config': {
            'reSetWidth': 200,
            'reSetHeight': 30,
            'title': '标题',
            'direction': 'down',
            'srpSelectList':[],
            'eleStyle': {},
        },
        'style': {}
    }
};