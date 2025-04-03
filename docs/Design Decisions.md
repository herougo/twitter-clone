Challenges

1) How to automatically add JWT token to axiosWrapper?

    - Chosen solution: make it a hook that returns the function axiosWithHeader.

2) logIn service needs access to a hook (useAxiosWrapper). How to resolve?

    - Chosen solution: pass the axiosWithHeader as an argument to the service.