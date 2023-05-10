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
    const prompt = `You are playing a tic tac toe game against me.
    I will provide you the board as a single array. 
    The first index of the array is the top left. The left middle spot is index 3 and the bottom left spot is index 6. 
    
    If an index in the array is "null" it is available for a move. The board will always be 9 spots long. The an example board with the first move in the middle spot would be: [null, null, null, null, "X", null, null, null, null].
    
    Here is a list of the winning index combinations: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      
    I will give you a board and the current player (X or O), and you will tell me the index of next move. Only respond to me in JSON. An example response would be { index: 5 } to pick the middle spot.
    
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
            "model": "gpt-4",
            "messages": [{ "role": "user", "content": prompt }]
        })
    });
}