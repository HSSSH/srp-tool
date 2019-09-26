import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';
import Manage from '@/components/Manage';
import SiteManage from '@/components/manage/SiteManage';
import VideoManage from '@/components/manage/VideoManage';
import DocumentManage from '@/components/manage/DocumentManage';
import PictureManage from '@/components/manage/PictureManage';
import Platform from '@/components/Platform';
import Design from '@/components/platform/Design';
import Display from '@/components/Display';
Vue.use(Router);

export default new Router({
    routes: [{
        path: '/app',
        name: 'App',
        component: App,
        redirect: { name: 'Manage' },
        children: [{
            path: 'manage',
            name: 'Manage',
            component: Manage,
            redirect: { name: 'SiteManage' },
            children: [{
                path: 'siteManage',
                name: 'SiteManage',
                component: SiteManage,
            }, {
                path: 'sourceManage',
                name: 'SourceManage',
                component: { template:`<router-view></router-view>` },
                redirect: { name: 'PictureManage' },
                children: [{
                    path: 'videoManage',
                    name: 'VideoManage',
                    component: VideoManage
                },{
                    path: 'documentManage',
                    name: 'DocumentManage',
                    component: DocumentManage
                },{
                    path: 'pictureManage',
                    name: 'PictureManage',
                    component: PictureManage
                }]
            }],
        }, {
            path: 'platform',
            name: 'Platform',
            component: Platform,
            redirect: { name: 'Design' },
            children: [{
                path: 'design',
                name: 'Design',
                component: Design,
                props: (route) => { query: route.query.viewId }
            }]
        }, {
            path: 'display',
            name: 'Display',
            component: Display,
            props: (route) => { query: route.query.viewId }
        }]
    },{
		path: '/',
        redirect: { name: 'App' },
    }]
});