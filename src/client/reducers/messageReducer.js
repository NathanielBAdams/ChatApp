import * as types from '../actions/actionTypes';

const initialState = {
  listOfUsersOnline: {},
  messageCount: 0,
  usersOnline: 0,
  messages: [],
  lastMessageID: 0,

  currUser: '',
};

const messageReducer = (state = initialState, action) => {
  let messages;
  let messageCount;
  let usersOnline;
  let currUser;
  let listOfUsersOnline;

  switch (action.type) {
    case types.ADD_MESSAGE: {
      messages = state.messages.slice(); // make a shallow copy
      messages.push(action.payload);
      messageCount = messages.length;

      return {
        ...state,
        messageCount,
        messages,
      };
    }
    // case types.EDIT_MESSAGE: {

    // }

    // case types.DELETE_MESSAGE: {

    // }

    case types.GET_MESSAGES: {
      let messages = action.payload;
      let messageCount = messages.length;
      return {
        ...state,
        messages,
        messageCount,
      };
    }

    case types.USER_LEFT: {
      
      usersOnline = state.usersOnline - 1;
      listOfUsersOnline = JSON.parse(JSON.stringify(state.listOfUsersOnline))
      for (let [username, data] of Object.entries(listOfUsersOnline)) {
        if (listOfUsersOnline[username]['socketID'] === action.payload) {
          delete listOfUsersOnline[username]
        }
      }
      return {
        ...state,
        usersOnline,
        listOfUsersOnline,
      }
    }
    // case types.BUILD_USER_DATA: {
    //   usersOnline = action.payload.usersOnline
    //   const socketIDs = action.payload.socketIDs
    //   listOfUsersOnline = listOfUsersOnline = JSON.parse(JSON.stringify(state.listOfUsersOnline))
    //   Object.keys(listOfUsersOnline).forEach((user) => {
    //     if (!socketIDs.includes(listOfUsersOnline[user]['socketID'])) {
    //       listOfUsersOnline[user] = {
    //         username: 'Unknown',
    //         profileURL: ""
    //       }
    //     }
    //   });
    //   return {
    //     ...state,
    //     usersOnline,
    //     listOfUsersOnline
    //   }
    // }

    case types.NEW_USER: {
      const { socketID, username } = action.payload
      usersOnline = state.usersOnline + 1;
      listOfUsersOnline = JSON.parse(JSON.stringify(state.listOfUsersOnline))
      listOfUsersOnline[username] = {
        username,
        socketID,
      }
      return {
        ...state,
        usersOnline,
        listOfUsersOnline
      }
    }

    case types.LOGIN: {
      currUser = action.payload;
      usersOnline = state.usersOnline;
      usersOnline += 1;
      currUser = action.payload;
      listOfUsersOnline = JSON.parse(JSON.stringify(state.listOfUsersOnline))
      listOfUsersOnline[currUser] = {
        username: currUser,
        profileURL: ""
      }
      return {
        ...state,
        currUser,
        usersOnline,
        listOfUsersOnline,
      };
    }

    case types.LOGOUT: {
      usersOnline = state.usersOnline;
      usersOnline -= 1;
      listOfUsersOnline = JSON.parse(JSON.stringify(state.listOfUsersOnline))
<<<<<<< HEAD
=======
      currUser = action.payload;
>>>>>>> 037ec6e38805bc0ad798c0f5bf836c1391064bd8
      delete listOfUsersOnline[currUser]
      return {
        ...state,
        usersOnline,
        currUser,
      };
    }

    default:
      return state;
  }
};

export default messageReducer;
