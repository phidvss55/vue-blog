import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../firebase/firebaseInit';

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

    blogHTML: 'Write your blog title here ... ',
    blogTitle: '',
    blogPhotoName: '',
    blogPhotoFileURL: null,
    blogPhotoPreview: null,

    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
      console.log(state.profileAdmin);
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstname;
      state.profileLastName = doc.data().lastname;
      state.profileUserName = doc.data().username;
    },
    setProfileInitials(state) {
      state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join('') + state.profileLastName.match(/(\b\S)?/g).join('');
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUserName(state, payload) {
      state.profileUserName = payload;
    }
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      const database = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResults = await database.get();
      commit('setProfileInfo', dbResults);
      commit('setProfileInitials');
      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      commit('setProfileAdmin', admin);
    },
    async updateUserSettings({ commit, state }) {
      const database = await db.collection('users').doc(state.profileId);
      await database.update({
        firstname: state.profileFirstName,
        lastname: state.profileLastName,
        username: state.profileUserName
      });
      commit('setProfileInitials');
    }
  },
  modules: {}
});
