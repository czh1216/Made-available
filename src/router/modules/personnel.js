import Layout from '@/layout'

export default {
    path: '/personnel',
    component: Layout,
    redirect: '/personnel/personnel1',
    name: 'Personnel',
    meta: {
        title: '人员管理',
        icon: "user",
    },
    children: [
        {
            path: 'personnel1',
            component: () => import('@/views/personnels/personnel1'),
            name: 'Personnel1',
            meta: { title: "人员列表" },
        },
        {
            path: 'personnel2',
            component: () => import('@/views/personnels/personnel2'),
            name: 'Personnel2',
            meta: { title: "人效统计" },
        },
        {
            path: 'personnel3',
            component: () => import('@/views/personnels/personnel3'),
            name: 'Personnel3',
            meta: { title: "工作量列表" },
        }
    ]
}