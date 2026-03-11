export type Role = "ADMIN" | "CUSTOMER";
export declare class User {
    id: number;
    username: string;
    email: string;
    role: Role;
    constructor(id: number, username: string, email: string, role: Role);
}
//# sourceMappingURL=userbase.d.ts.map