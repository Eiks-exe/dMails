import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

type TuseConfig = [user: string|undefined, passwd : string|undefined, channelUrl :string|undefined]
export const useConfig = (): TuseConfig => {
    const discord_user = process.env.DISCORD_USER;
    const discord_password = process.env.DISCORD_PASSWORD;
    const channel_url= process.env.CHANNEL_URL;

    return [discord_user, discord_password, channel_url];
}

