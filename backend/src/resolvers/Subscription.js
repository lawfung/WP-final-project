const Subscription = {
  updateStrategy: {
    subscribe(parent, args, {pubSub}, info) {
      console.log(pubSub);
      console.log(args);
      return pubSub.asyncIterator("Strategy");
    }
  }
};

export default Subscription;
