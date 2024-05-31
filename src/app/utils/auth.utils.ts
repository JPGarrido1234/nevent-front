import { environment } from "src/environments/environment";

export class AuthUtils {

    /**
     * A function that evaluates if, for the given origin, the user is in test environment or production
     * @param origin the given origin
     * @returns a boolean representing if we are in production
     */
    static isProduction(origin: string): boolean {

        console.log(origin);
        if (origin.includes(environment.test.domain)) {
            return false;
        } else if (origin.includes(environment.prod.domain)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * A function that evaluates if, for the given origin, it should login as admin or not
     * @param origin the given origin
     * @returns a boolean representing if the app is for admins or not
     */
    static isAdmin(appName: string): boolean {

        let isAdmin: boolean = false;

        environment.domains.admin.forEach(x => {
            if (appName.includes(x)) {
                isAdmin = true;
            }
        });

        return isAdmin;
    }
}