Challenges

1) How to automatically add JWT token to axiosWrapper?

    - Chosen solution: make it a hook that returns the function axiosWithHeader.

2) logIn service needs access to a hook (useAxiosWrapper). How to resolve?

    - Chosen solution: pass the axiosWithHeader as an argument to the service.

3) API design?

    - Chosen Solution: RESTful API (see design doc 1)

4) How to handle post endpoints with paths starting with "/user/..." (there's overlap with other endpoints)?

    - Chosen Solution: see below

    ```JavaScript
    const express = require("express");

    const app = express();
    const router = express.Router();

    router.get('/hello', async (req, res, next) => {
        res.sendStatus(200);
    });

    app.use("/", router);

    ```