import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // Get the request body
    const currentBoard = await request.text();
    // send current board to open ai api
    const response = await callOpenAIApi(currentBoard);
    // return response from open ai api
    const { choices } = await response.json();
    const res = choices[0].message.content;
    return NextResponse.json(JSON.parse(res));
}

function callOpenAIApi(body: string) {
    const { board, history } = JSON.parse(body);
    // if board is empty, we are starting a new game
    let messages = [];
    const prompt = `You are playing a tic tac toe game against me.

    The board is a single array of 9 spots. Each index reflects on board like this:

    0 | 1 | 2
    ---------
    3 | 4 | 5
    ---------
    6 | 7 | 8
    
    I will give you a board, and you will tell me the index of next move. You are player "O". Only respond to me in JSON. An example response would be { index: 4 } to pick the middle spot.
    `
    messages = [{ "role": "system", "content": prompt }]

    history.forEach((board: Array<string>, i: number) => {
        if (i === 0) return;
        const formattedBoard = formatBoard(board);
        const role = i % 2 === 0 ? "assistant" : "user";
        const content = `Move ${i}: ${formattedBoard}. ${role === 'user' ? `What's your next move?` : ''}`
        messages.push({ role, content })
    });

    const formattedBoard = formatBoard(board);
    const content = `Current board: ${formattedBoard}. What is your next move?`
    messages.push({ role: "user", content })

    console.log(messages);


    return fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-4",
            messages,
        })
    });
}

function formatBoard(board: string[]) {
    return `
    ${board[0]} | ${board[1]} | ${board[2]}
    ---------
    ${board[3]} | ${board[4]} | ${board[5]}
    ---------
    ${board[6]} | ${board[7]} | ${board[8]}
    `
}