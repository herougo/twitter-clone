const MAIN_CONTENT_TYPES = {
    home: 'home',
    posts: 'posts',
    profile: 'profile',
    search: 'search',
    store: 'store',
    notifications: 'notifications',
    messages: 'messages'
}

const classifyMainContentType = (pathname) => {
    // pathname: e.g. "/profile"
    if (pathname === '/') {
        return MAIN_CONTENT_TYPES.home;
    } else if (pathname.startsWith('/post')) {
        return MAIN_CONTENT_TYPES.posts;
    } else if (pathname.startsWith('/profile')) {
        return MAIN_CONTENT_TYPES.profile;
    } else if (pathname.startsWith('/search')) {
        return MAIN_CONTENT_TYPES.search;
    } else if (pathname.startsWith('/store')) {
        return MAIN_CONTENT_TYPES.store;
    } else if (pathname.startsWith('/notifications')) {
        return MAIN_CONTENT_TYPES.notifications;
    } else if (pathname.startsWith('/messages')) {
        return MAIN_CONTENT_TYPES.messages;
    } else {
        return null;
    }
};

export { MAIN_CONTENT_TYPES, classifyMainContentType };

