import Layout from '@/layout'

export default {
    path: '/equipment',
    component: Layout,
    redirect: '/equipment/equipment1',
    name: 'Equipment',
    meta: {
        title: '设备管理',
        icon: "link",
    },
    children: [
        {
            path: 'equipment1',
            component: () => import('@/views/equipments/equipment1'),
            name: 'Equipment1',
            meta: { title: "设备管理" },
        },
        {
            path: 'equipment2',
            component: () => import('@/views/equipments/equipment2'),
            name: 'Equipment2',
            meta: { title: "设备状态" },
        },
        {
            path: 'equipment3',
            component: () => import('@/views/equipments/equipment3'),
            name: 'Equipment3',
            meta: { title: "设备类型管理" },
        }
    ]
}