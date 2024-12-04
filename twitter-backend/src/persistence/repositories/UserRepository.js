const User = require("../models/User");

class UserRepository {
    async findOneByUsername(username) {
        return await User.findOne({username});
    }

    async findOneById(id) {
        return await User.findOneById(id);
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
}

module.exports = UserRepository;