import { Mongo } from 'meteor/mongo';

const GroupsList = new UniCollection('groups');

GroupsList.setSchema(new SimpleSchema({
   name: {
       type: String,
       max: 50,
   },
   users: {
       type: [String],
   },
}));

export default GroupsList;