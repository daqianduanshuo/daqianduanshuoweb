export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    name: '文章管理',
    icon: 'table',
    path: '/article',
    component: './ArticleList',
  },
  {
    path: '/article/detail',
    component: './ArticleDetail'
  },
  {
    path: '/',
    redirect: '/article',
  },
  {
    component: './404',
  },
];
