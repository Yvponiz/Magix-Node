import * as fs from 'fs';

export type UserSession = {
    username?: string,
    userKey?: string,
    className?: string,
    welcomeText?:string
    gameType?: string
}

export function setData(jsonString: string){
    fs.writeFile('./data.json', jsonString, (err) =>{
        if (err) throw err;
        console.log("data saved");
    })
}


export default async function getServerSideProps({  }) {
    const jsonString = fs.readFileSync('./data.json');
    const data = JSON.parse(jsonString.toString());

    return {
        props: {
            username: data?.username ?? null,
            userKey: data?.key ?? null,
            gameType: data?.type ?? null,
            welcomeText: data?.welcomeText ?? null
        }
    };
}