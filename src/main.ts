import puppeteer from 'puppeteer';
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { useConfig } from './config/config';
import fs from 'node:fs'
import path from 'path'
import { getRandomGif } from './getRandomGif';
dotenv.config();

const [user, passwd, channelUrl] = useConfig();

function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}
(async () => {

    const browser = await puppeteer.launch({
        executablePath: process.env.EDGE_PATH,
        headless: true,
        userDataDir: "./utils/myuserDataDir",
    });
    const page = await browser.newPage();

    channelUrl ? await page.goto(channelUrl) : alert("you didnt specify any channel");
    await delay(2000)
    console.log(page.url().split("?"))
    console.log(page.url())
    if (page.url().includes('https://discord.com/login')) {
        const login = async () => {
            console.log("yes")
            await delay(2000)
            await page.waitForSelector('button.button-ejjZWC')
            await page.click('[type="button"]')
            await page.waitForSelector('[type="text"]')
            user ? await page.type('[type="text"]', user) : alert('you must enter your username in the environement file')
            await page.waitForSelector('[type="password"]')
            passwd ? await page.type('[type="password"]', passwd) : alert('you must enter your password in the environement file')
            await page.waitForSelector('[type="submit"]')
            await page.click('[type="submit"]')
        }
        login()
        await Promise.all([
            page.waitForNavigation()
        ]);

    }
    /*     const filePath = path.join(__dirname, '../rick.txt');
        const floodTxt = fs.readFileSync(filePath, "utf8");
        const sntnc = floodTxt.split(/[:,;\n]+/);
        console.log(sntnc)
        await page.waitForSelector('[role="textbox"]')
        for (const line of sntnc) {
            console.log(line);
            await delay(500);
            await page.keyboard.press('Enter')
            await page.type('[role="textbox"]', line);
        }
        await page.keyboard.press('Enter') */
    const sendGif = async () => {
        const gif = await getRandomGif("typing")
        console.log(gif.itemurl)
        await page.waitForSelector('[role="textbox"]')
        await page.type('[role="textbox"]', gif.itemurl)
        await page.keyboard.press('Enter')
        await delay(1000)
    }
    const loop = () => {
        sendGif()
        setTimeout(loop, Math.floor(Math.random() * (90000 - 60000 + 1)) + 60000);
    }

    loop()
})();


