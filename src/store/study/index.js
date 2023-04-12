import Vuex from "vuex";
// 引入插件
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
//  初始化
const state = {
	userName:'admin'
};
const mutations = {};
const actions = {};
// 创建实例
const vuexPersisted = new VuexPersistence({
	storage: window.sessionStorage,
  render:state=>({
  	userName:state.userName,
    // 或
    ...state
  })
});

const store = new Vuex.Store({
	state,
  actions,
  mutations,
  // 数据持久化设置
  plugins:[vuexPersisted]
});

export default store;