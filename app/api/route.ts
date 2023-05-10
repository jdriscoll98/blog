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
    const { board, player} = JSON.parse(body);
    const prompt = `You are playing a tic tac toe game against me. The goal is to get 3 of your letters in a row. I will provide you the board as a single array. The first index of the array is the top left. The left middle spot is index 3 and the bottom left spot is index 6. If an index in the array is "null" it is available for a move. An example of a win is if you have indexes 0, 4, and 8 all with the same letter. Another example would be 0, 3, 6. I will give you a board and the current player (X or O), and you will tell me the index of next move. Only respond to me in JSON. An example response would be { index: 5 } to pick the middle spot.
    
    Here is the board: ${JSON.stringify(board)}
    Current player: ${player}

    What is your next move?
    `
    return fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "user", "content": prompt }]
        })
    });
}