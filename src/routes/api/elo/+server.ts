import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';
import type { StockCardData } from '$lib';

const filePath = path.resolve('stocks.json');
const K_FACTOR = 15;


function getExpected(playerELO: number | undefined, opponentELO: number | undefined): number {
	if (!playerELO || !opponentELO) {
		throw new Error('Player or opponent ELO not found');
	}
	return 1 / (1 + 10 ** ((opponentELO - playerELO) / 400));
}

function updateELO(currentELO: number | undefined, expectedScore: number, actualScore: number): number {
	if (!currentELO) {
		throw new Error('Current ELO not found');
	}
	return currentELO + K_FACTOR * (actualScore - expectedScore);
}

export async function POST({ request }: { request: Request }) {
	try {
		const { winner, loser }: { winner: string; loser: string } = await request.json();
		const data = await fs.readFile(filePath, 'utf-8');
		const stocks: StockCardData[] = JSON.parse(data);

		const winnerStock = stocks.find((stock) => stock.symbol === winner);
		const loserStock = stocks.find((stock) => stock.symbol === loser);

		if (!winnerStock || !loserStock) {
			return json({ error: 'Winner or loser not found in stocks data' }, { status: 400 });
		}

		const expectedScoreWinner = getExpected(winnerStock.current_elo, loserStock.current_elo);
		const expectedScoreLoser = getExpected(loserStock.current_elo, winnerStock.current_elo);

		winnerStock.current_elo = updateELO(winnerStock.current_elo, expectedScoreWinner, 1);
		loserStock.current_elo = updateELO(loserStock.current_elo, expectedScoreLoser, 0);

		await fs.writeFile(filePath, JSON.stringify(stocks, null, 2), 'utf-8');

		return json({
			message: 'ELO ratings updated successfully',
			winner: { symbol: winnerStock.symbol, newELO: winnerStock.current_elo },
			loser: { symbol: loserStock.symbol, newELO: loserStock.current_elo }
		});
	} catch (error) {
		console.error('Error updating ELO:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
}
