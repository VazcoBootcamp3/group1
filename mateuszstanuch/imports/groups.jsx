const GroupList = new UniCollection('groups');

GroupList.setSchema(new SimpleSchema({
   name: {
       type: String,
       max: 50,
   },
   users: {
       type: [String],
   },
}));

export default GroupList;