import jwt from "jsonwebtoken";

export class JWT {
    private secret: string;

    public constructor() {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT secret is undefined");
        this.secret = secret;
    }

    public generateAccessToken = (userID: string) => jwt.sign({userID: userID}, this.secret, { expiresIn: "24h" });

    public authenticateToken = (token: string): string | null => {
        try {
            const payload = jwt.verify(token, this.secret) as {userID: string};
            return payload.userID;
        } catch(err: unknown) {
            return null;
        }
    }
}