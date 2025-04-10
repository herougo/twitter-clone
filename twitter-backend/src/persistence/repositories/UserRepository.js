const User = require("../models/User");

class UserRepository {
    async findOneByUsername(username) {
        return await User.findOne({username});
    }

    async findById(id) {
        return await User.findById(id);
    }

    async findByIds(ids) {
        const users = await User.find({'_id': { $in: ids } });
        const idToUser = {};
        for (let user of users) {
            idToUser[user._id] = user;
        }
        return ids.map(id => idToUser[id]);
    }

    async create(userData) {
        return await User.create(userData);
    }

    async deleteAll() {
        return await User.deleteMany({});
    }

    async addFollower(user, follower) {
        user.followers.push(follower);
        follower.following.push(user);
        await user.save();
        await follower.save();
    }

    async removeFollower(user, follower) {
        user.followers.remove(follower);
        follower.following.remove(user);
        await user.save();
        await follower.save();
    }

    async populate(data, specification) {
        return await User.populate(data, specification);
    }
}

module.exports = UserRepository;