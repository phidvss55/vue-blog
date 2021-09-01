import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {
        blogTitle: 'Blog Card 1',
        blogCoverPhoto: 'stock-1',
        blogDate: 'May 1 2020'
      },
      {
        blogTitle: 'Blog Card 2',
        blogCoverPhoto: 'stock-2',
        blogDate: 'May 5 2020'
      },
      {
        blogTitle: 'Blog Card 3',
        blogCoverPhoto: 'stock-3',
        blogDate: 'May 12 2021'
      }
    ],
    editPost: null
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    }
  },
  actions: {},
  modules: {}
});
