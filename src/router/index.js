import Vue from "vue";
import Router from "vue-router";
import NotFound from "../views/404.vue";
import Forbidden from "../views/403.vue";
import Nprogress from "nprogress"; //有加载动画效果
import "nprogress/nprogress.css";

Vue.use(Router);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"), //将文件挂载在目录下
    children: [
      {
        path: "/user",
        redirect: "/user/login" //重定向
      },
      {
        path: "/user/login", // 登录页
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login")
      },
      {
        path: "/user/register", // 注册页
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register")
      }
    ]
  },
  {
    path: "/",
    // meta: { authority: ["user", "admin"] },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
    children: [
      //dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis" //重定向
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis"
              )
          }
        ]
      }
    ]
  },
  //form
  {
    path: "/form",
    name: "form",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
    meta: { icon: "form", title: "表单", authority: ["admin"] },
    children: [
      {
        path: "/form/basic-form",
        name: "basicform",
        meta: { title: "基础表单" },
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm")
      },
      {
        path: "/form/step-form",
        name: "stepform",
        hideChildenMenu: true,
        meta: { title: "分布表单" },
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"),
        children: [
          {
            path: "/form/step-form",
            redirect: "/form/step-form/info" //重定向
          },
          {
            path: "/form/step-form/info",
            name: "info",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1"
              )
          },
          {
            path: "/form/step-form/confirm",
            name: "confirm",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2"
              )
          },
          {
            path: "/form/step-form/result",
            name: "result",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3"
              )
          }
        ]
      }
    ]
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound
  }
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  //判断从不同地方，加载时才需显示进度条
  if (to.path !== from.path) {
    Nprogress.start();
  }
  //去寻找最近的一个权限
  // const record = FindLast(to.matched, record => record.meta.authority);
  // if (record && !check(record.meta.authority)) {
  //   if (!isLogin() && to.path !== "/user/login") {
  //     next({
  //       path: "/user/login"
  //     });
  //   } else if (to.path !== "/403") {
  //     //弹框提示
  //     notification.error({
  //       message: "403",
  //       description: "你没有权限访问，请咨询管理员！"
  //     });
  //     next({
  //       path: "/403"
  //     });
  //   }
  Nprogress.done();
  // }
  next();
});

router.afterEach(() => {
  Nprogress.done();
});

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

export default router;
