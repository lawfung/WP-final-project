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
  // CreateStrategy(name: String!): Strategy!
  // async CreateStrategy(parent, {name}, {strategyDatabase, pubSub}, info) {
  //   const id = uuidv4();
  //   const newStrategy = new strategyDatabase({id, name});
  //   newStrategy.save();

  //   console.log(pubSub);
  //   await pubSub.publish("Strategy", {
  //     updateStrategy: {
  //       type: "CREATED",
  //       info: newStrategy
  //     }
  //   });
  //   return newStrategy;
  // },
  async DeleteStrategy(parent, {id}, {strategyDatabase, pubSub}, info) {
    const isExist = await strategyDatabase.findOne({id});
    if (!isExist) return false;
    await strategyDatabase.deleteOne(isExist);

    await pubSub.publish("Strategy", {
      updateStrategy: {
        type: "DELETED"
      }
    });
    return true;
  },
  async RenameStrategy(parent, {id, name}, {strategyDatabase, pubSub}, info) {
    const isExist = await strategyDatabase.findOne({id});
    if (!isExist) return false;
    await strategyDatabase.deleteOne(isExist);
    const newStrategy = new strategyDatabase({id, name});
    newStrategy.save();

    await pubSub.publish("Strategy", {
      updateStrategy: {
        type: "UPDATED",
        info: newStrategy
      }
    });
    return true;
  },
  async CreateRecord(parent, {strategyName, startTime, endTime, start, end, high, low}, {recordDatabase, strategyDatabase}, info) {
    const id = uuidv4();
    const strategyExist = await strategyDatabase.findOne({name: strategyName});
    if (strategyExist) {
      const strategyID = strategyExist.id;
      const newRecord = new recordDatabase({id, strategyID, startTime, endTime, start, end, high, low});
      try {
        newRecord.save();
        return true;
      } catch (error) {
        console.log("error: " + error);
        return false;
      }
    } else {
      try {
        const strategyID = uuidv4();
        const newRecord = new recordDatabase({id, strategyID, startTime, endTime, start, end, high, low});
        const newStrategy = new strategyDatabase({id: strategyID, name: strategyName});
        newRecord.save();
        newStrategy.save();
        return true;
      } catch (error) {
        console.log("error: " + error);
        return false;
      }
    }
  },
  async DeleteRecord(parent, {id}, {recordDatabase}, info) {
    const isExist = await recordDatabase.findOne({id});
    if (!isExist) return false;
    await recordDatabase.deleteOne(isExist);
    return true;
  },
  async DeleteRecordByStrategyID(parent, {strategyID}, {recordDatabase}, info) {
    const isExist = await recordDatabase.findOne({strategyID});
    if (!isExist) return false;
    await recordDatabase.deleteMany({strategyID});
    return true;
  },
  Cache(parent, { asset, startTime, endTime, scale, cookie }, { userDatabase }) {
    return;
  }
};

export default Mutation;
