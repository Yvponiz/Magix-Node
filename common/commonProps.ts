import * as fs from 'fs';

export type User = {
    username?: string,
    userKey?: string
}

export default async function getServerSideProps({  }) {
    const jsonString = fs.readFileSync('./userSession.json');
    const user = JSON.parse(jsonString.toString());
    // console.log("USER",user)
    return {
        props: {
            username: user?.username ?? null,
            userKey: user?.userKey ?? null
        }
    };
}