const User = require("../models/User");

class UserRepository {
    async findOneByUsername(username) {
        return await User.findOne({username});
    }

    async create(userData) {
        return await User.create(userData);
    }
}

module.exports = UserRepository;