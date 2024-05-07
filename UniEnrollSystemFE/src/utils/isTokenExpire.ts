import { jwtDecode } from "jwt-decode";

export default function isTokenExpire(token: string) {
    if (!token) return true;
    const decodedToken = jwtDecode(token);

    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp && decodedToken.exp < currentTime) {
        return true;
    } else {
        return false;
    }
}
