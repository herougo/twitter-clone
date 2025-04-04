# API Design

## Old Design

```
POST /channel/open
GET /channel/fullFeed/:userId
POST /message/send
GET /message/fullFeed/:channelId
POST /notification/markAsRead
POST /post/create
POST /post/like
POST /post/dislike
POST /post/unlike
POST /post/undislike
GET /post/byUsername/:username
GET /post/feed/:userId
GET /post/:postId
GET /profile/:username
POST /signup
POST /login
POST /follow
POST /unfollow
```

## New Design

Questions

1) POST /notification/:notificationid/read or POST /notification/read

    - chosen solution: POST /notification/:notificationid/read

```
POST /channel
GET /channel/fullFeed
POST /message
GET /channel/:channelid/messages
POST /notification/:notificationid/read
POST /post
POST /post/:postid/like
POST /post/:postid/dislike
DELETE /post/:postid/like
DELETE /post/:postid/dislike
GET /user/name/:username/post
GET /user/id/:userid/post/feed
GET /post/:postId
GET /user/name/:username/profile
POST /signup
POST /login
POST /user/id/:followingid/follow
DELETE /user/id/:followingid/follow
```

Other Changes

1) Always use JWT to infer user when possible (e.g. follow endpoint).