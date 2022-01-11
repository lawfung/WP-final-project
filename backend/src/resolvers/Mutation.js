import bcrypt from "bcrypt"; 
import { v4 as uuidv4 } from 'uuid'

const saltRounds = 10;

const Mutation = {
  async Login(parent, {user, hashPasswd}, {userDatabase, cookieDatabase}, info) {
    const isExist = await userDatabase.findOne({user});
    if (!isExist) return null;

    const res = await bcrypt.compare(hashPasswd, isExist['hashPasswd'])
    if (!res) return null; // password is not correct
    
    const cookie = uuidv4();
    const newCookie = new cookieDatabase({user, cookie});
    newCookie.save();
    return cookie;
  },

  async Logout(parent, {user, cookie}, {cookieDatabase}, info) {
    const isExist = await cookieDatabase.findOne({user, cookie});
    if (!isExist) return false;
    await cookieDatabase.deleteOne(isExist);
    return true;
  },  

  async Register(parent, {user, hashPasswd}, {userDatabase}, info) {
    console.log(user, {user})
    const isExist = await userDatabase.findOne({user});
    console.log(isExist)
    if (isExist) return false;
    else {
      const hash = await bcrypt.hash(hashPasswd, saltRounds);
      console.log('hash', hash);
      const newUsers = new userDatabase({user, hashPasswd: hash})
      newUsers.save();
      return true;
    }
  },

  Cache(parent, { asset, startTime, endTime, scale, cookie }, { userDatabase }) {
    return;
  }
};

export default Mutation;
