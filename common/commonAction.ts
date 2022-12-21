import { useRef, useState } from "react";

export function callAPI(service: any, data: any) {
  const apiURL = `https://magix.apps-de-cours.com/api/${service}`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(data).toString()
  };

  return fetch(apiURL, options)
    .then(response => response.json())
    .then(result => {
      return result;
    });
}

export async function action(action: string, uid?: number, target?: number, yourTurn?: boolean) {
  if (yourTurn) {
    const data: any = {}

    data.action = action;

    if (uid != null) {
      data.uid = uid;
    }
    if (target != null) {
      data.targetuid = target;
    }

    const s = await callAPI('games/action', data)
    console.log("ACTION", s)
    try {
    }
    catch (error) {
      console.error(error);
    }
  }
}
