const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const { DB_IDS } = require("../ids");

const populatePosts = async (diContainer) => {
    const postRepository = diContainer.resolve(DI_NAMES.postRepository);
    const mainPost = await postRepository.fullCreate({
        _id: DB_IDS.mainPost,
        authorId: DB_IDS.mainUser,
        content: 'I like dogs.',
        replyTo: null
    });
    const mainReply = await postRepository.fullCreate({
        _id: DB_IDS.mainReply,
        authorId: DB_IDS.followerUser,
        content: 'Me too!',
        replyTo: mainPost
    });
};

module.exports = {
    populatePosts
};
