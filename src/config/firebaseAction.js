
import {db} from './firebaseconfig';

class firebaseClass {
 
  pushSignup(key,array) {
    db.ref(`users/${key}`).set(array);
  }
  pushSocialSignup(array) {
    db.ref('users').push(array);
  }
 
  getUsers(key, callback) {
    db.ref(`users/${key}`).once('value', (res) => {
      callback(res);
    });
  }
  getSocialUsers(callback) {
    db.ref('users').on('value', (res) => {
      callback(res);
    });
  }
  updatePassword(key, val) {
    db.ref(`users`).child(key).update({pass: val});
  }
 
  updateUserData(key, val,val1,index,image) {
    db.ref(`users`).child(key).update({email: val,name :val1,gen:index,photo:image});
  }
  GetUserData(key) {
    db.ref(`users`).child(key).toJSON.toString;
  }
 
}
const firebaseAction = new firebaseClass();
export default firebaseAction;
