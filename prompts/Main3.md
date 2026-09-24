- You mentioned:
    - TassiaQCA's original implementation uses:

    ```text
    Authorization: Bearer <access-token>
    ```

    whereas the Pickaxe direction we've previously discussed was HTTP-only cookies.

    Those are two different transport strategies.

    The underlying token/session architecture we've just adapted supports either one, but the middleware and frontend API client need to be designed around the choice.

    For Pickaxe's browser-based portfolio/admin application, we would use:

    ```text
    Access token  → HttpOnly cookie
    Refresh token → HttpOnly cookie
    ```

    with appropriate Secure/SameSite settings, and then make authenticate.js read the access-token cookie rather than requiring JavaScript to handle the JWT.

    Keeping the token out of localStorage and aligns better with the browser security model.

    Making the next implementation boundary you proposed to be:

    ```text
    Token services             ✅
    Token hashing              ✅
    Session model              ✅
    Session repository         ✅
    Session service            ✅
    Auth service               ✅

                ↓
        COOKIE TRANSPORT
                ↓
        Auth Controller
                ↓
        Auth Routes
                ↓
    Authentication Middleware
                ↓
    Authenticated Request Context
    ```
