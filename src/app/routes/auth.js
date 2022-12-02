class Auth {
    constructor(token) {
        this.token = token;
    }

    isAuthenticated() {
        return this.token ? true : false;
    }
}

export default Auth;
