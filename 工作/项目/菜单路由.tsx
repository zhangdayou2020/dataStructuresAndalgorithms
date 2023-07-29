/*
  学习一下际民老师的页面,菜单管理(页面权限 菜单权限 以及页面资源权限)
*/

// 菜单props
interface MenuItemProps {
  breadcrumParentId?: string; // 子菜单所对应的父菜单Id
  icon?: string; //菜单图标
  id: string; //每个菜单唯一的标识,需要将新配置的id告知后台
  //本地调试的话 一般使用roles.concat 临时添加id
  menuParentId?: string; // 需要跳转的菜单,但不显示在左侧menu菜单上
  name: string; //菜单的名称
  route: string; // 点击菜单跳转的url 父级菜单无需跳转 不可以配置
  zh: { name: string }; //国际化菜单名称
}

interface ButtonItemProps {
  code: string; //按钮的code
  name: string; //按钮的名称
}

/*
  菜单处理
  菜单处理id
  父级节点id
  arr:整个菜单数组集合
  type:father 表示最外层父级菜单  children 每列菜单下的子菜单
*/

const setMenuFunc = (data, id, arr, type) => {
  if (type === "father") {
    // 当type 是 father 为页面顶部导航栏菜单按钮标题
    arr.push({
      icon: "team", // icon默认隐藏
      id, // 每个菜单的根节点id
      name: data.name, //导航栏的菜单名称
      route: data.url, //导航栏的菜单 没有URL
      zh: { name: data.name },
    });
    // 处理展开导航栏时候菜单下拉框的每一列子菜单
    if (data.children?.length) {
      data.children.forEach((item) => {
        const obj = {
          breadcrumParentId: id, //父菜单的id
          icon: "team", //icon默认隐藏
          id: item.code, //子菜单自己的id
          menuParentId: id, //父菜单的id
          name: data.name,
          route: data.url,
          zh: { name: data.name },
        };
        arr.push(obj);
        if (item?.children?.length) {
          setMenuFunc(item.children, item.code, arr, "children");
        }
      });
    }
  } else {
    // 子子菜单处理 一直处理到最后一级
    data.map((item) => {
      const obj = {
        breadcrumParentId: id, //父菜单的id
        icon: "team", //icon默认隐藏
        id: item.code, //子菜单自己的id
        menuParentId: id, //父菜单的id
        name: data.name,
        route: data.url,
        zh: { name: data.name },
      };
      arr.push(obj);
      if (item?.children?.length) {
        setMenuFunc(item.children, item.code, arr, "children");
      }
      return true;
    });
  }
};

const processData = (result) => {
  const menuList = [] as MenuItemProps[];
  const pageLst = [] as string[];
  const buttonList = [] as ButtonItemProps[];
  const tabControlList = [] as string[];
  // 首先要判断一下 result 是不是数组
  if (result && result instanceof Array) {
    store.set(
      "ioneworkspaces",
      result.filter((item) => item.code === IONE_PAGE_WORKSPACE[0])
    );
    store.set(
      "commonsystem",
      result.filter((item) => item.code === IONE_PAGE_FAVORITES_BOND_SALES[0])
    );
    result.forEach((item) => {
      // 处理首页菜单
      if (item.type === "MENU" && item.code === "IONE-MENU-SHOUYE") {
        // 后台返回的数据 约定 code为IONE-MENU-SHOUYE表示为云平台首页菜单
        item.children?.forEach((menu) => {
          if (menu.name !== "个人工作台") {
            // 处理每一个菜单
            setMenuFunc(menu, menu.code, menuList, "father");
          }
        });
      } else if (item.url && item.type === "PAGE") {
        // 所有页面的路由 没有返回的页面就表示没有相关的权限
        item.children.forEach((frame) => {
          if (frame.type === "FRAME") {
            // 把tab权限相关的URL存到一个集合中
            tabControlList.push(frame.code);
          }
        });
        // 把页面中所有的URL 存到一个集合中
        menuList.push({
          id: item.code,
          menuParentId: "-1",
          name: item.name,
          zh: {
            name: item.name,
          },
          route: item.url,
        });
        pageLst.push(item.url);
      } else if (item.type === "BUTTON") {
        buttonList.push({
          code: item.code,
          name: item.name,
        });
      }
    });
  }

  if (!pageLst.includes("/workspace")) {
    pageLst.push("/workspace");
    menuList.push({
      id: "workspace",
      icon: "user",
      name: "个人工作台",
      zh: {
        name: "个人工作台",
      },
      route: "/workspace",
    });
  }
  return {
    menuList,
    pageLst,
    buttonList,
    tabControlList,
  };
};

function processMenu(result) {
  if (result && result instanceof Array) {
    const processItem = (item) => {
      const { visible, enable, editable, pageResource, children } = item;
      const newItem = {
        id: pageResource.id,
        name: pageResource.name,
        code: pageResource.code,
        visible,
        enable,
        editable,
        type: pageResource.type,
        url: pageResource.url,
        children: Array.isArray(children)
          ? children.map((i) => processItem(i))
          : [],
      };
      return newItem;
    };
    return result.map((d) => processItem(d));
  }
  return result;
}

export default {
  // 命名空间 状态对象的名称
  namespace: "routes",
  // 对应Reducer的初始状态
  state: {
    menuList: [], //菜单列表
    pageList: [], //页面列表
    buttonList: [], //按钮权限
    tabControlList: [], // 页面内的tab权限相关
  },
  // action 改变state 异步请求
  effects: {
    *queryPagePermissions({ userId }, { call, put }) {
      const menu = yield call(getMenuListAndPagePermissions);
      const fakeMenu = processMenu(menu);
      const { menuList, pageLst, buttonList, tabControlList } =
        processMenu(fakeMenu);
        yield put({
          type 'setPageList',
          payload:{
            pageLst
          }
        })
    },
  },
  // 状态的更新
  reducers: {
    setPageList(state, { payload }) {
      state.pageList = payload.pageList;
      return state;
    },
    setMenuList(state, { payload }) {
      state.menuList = payload.menuList;
      return state;
    },
    setButtonList(state, { payload }) {
      state.buttonList = payload.buttonList;
      return state;
    },
    setTabControlList(state, { payload }) {
      state.tabControlList = payload.tabControlList;
      return state;
    },
    signOut(state) {
      state.menuList = [];
      state.tabControlList = [];
      state.pageList = [];
      state.buttonList = [];
      return state;
    },
  },
};
