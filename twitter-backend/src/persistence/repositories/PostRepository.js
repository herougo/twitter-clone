const User = require("../models/Post");


class  PostRepository {
    async findOneById(id) {
        return await Post.findOneById(id);
    }

    async _create({authorId, content, replyTo}) {
        return await Post.create(
            {
                author: authorId,
                content,
                replyTo: replyTo._id
            }
        );
    }

    async deleteAll() {
        return await Post.deleteMany({});
    }

    async fullCreate({authorId, content, replyTo}) {
        const newPost = await this._create({authorId, content, replyTo});
        if (replyTo) {
            replyTo.replies.push(newPost);
            replyTo.save();
        }
    }

    async addLike(post, userId) {
        post.likes.push(userId);
        await post.save();
    }

    async removeLike(post, userId) {
        post.likes.remove(userId);
        await post.save();
    }
    
    async addDislike(post, userId) {
        post.dislikes.push({_id: userId});
        await post.save();
    }

    async removeDislike(post, userId) {
        post.dislikes.remove({_id: userId});
        await post.save();
    }
}

module.exports = PostRepository;