//! This WHOLE CODE need ZUSTAND to be installed to apply this coding
//! ZUSTAND technique, it is use so that all components can use each codes here so no need to repeat the codes

import { create } from "zustand"
import axios from "axios"

axios.defaults.withCredentials = true;
// const API_URL = "http://localhost:5000/api/"; //LOCALHOST
const API_URL = "https://netflixclone-9513.onrender.com/api/"; //RENDER DEPLOYED

export const useAuthStore = create((set) => ({
  //! INITIAL STATES
  user:null,
  isLoading: false,
  error: null,
  message: null,
  fetchingUser: true,

  //! FUNCTIONS SET STATES
  signup: async (username, email, password) => {
    set({
      isLoading: true,
      message: null,
      error: null,
    });

    try {
      const response = await axios.post(API_URL+"signup", {
        username,
        email,
        password
      });

      set({
        user: response.data.user, 
        isLoading: false
      });
    } catch (error) {
      set({isLoading: false, error: error || "There is an error in signing up."});
      throw error;
    }
  },

  login: async (username, password) => {
    set({
      isLoading: true,
      message: null,
      error: null,
    });

    try {
      const response = await axios.post(API_URL+"login", {
        username,
        password,
      });

      const {user, message} = response.data;
      set({
        user,
        message,
        isLoading: false,
      });

      return {user, message};
    } catch (error) {
      set({isLoading: false, error: error || "There is an error in logging in."});
      throw error;
    }
  },

  fetchUser: async () => {
    set({
      fetchingUser: true,
      error: null
    });
    
    try {
      const response = await axios.get(API_URL+"fetch-user");
      set({
        user: response.data.user,
        fetchingUser: false,
      });
    } catch (error) {
      set({fetchingUser: false, error: null, user: null});
      // throw error;
    }
  },

  logout: async () => {
    set({
      isLoading: true,
      error: null,
      message: null,
    });

    try {
      const response = await axios.post(API_URL+"logout");
      const {message} = response.data;
      set({
        message: message,
        isLoading: false,
        user: null,
        error: null,
      });

      return {message}
    } catch (error) {
      set({isLoading: false, error: error || "There is an error in fetching user."});
      throw error;
    }
  }
}));