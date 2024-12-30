import { json } from '@sveltejs/kit';
import EloRank from 'elo-rank';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('stocks.json');

// Initialize ELO with a custom K-Factor (defaults to 32 if not set)
const elo = new EloRank(15);

export async function POST({ request }: { request: Request }) {
	try {
		// Parse incoming data (winner and loser symbols)
		const { winner, loser } = await request.json();

		// Load current stocks data
		const data = await fs.readFile(filePath, 'utf-8');
		const stocks = JSON.parse(data);

		// Find winner and loser stocks
		const winnerStock = stocks.find((stock: any) => stock.symbol === winner);
		const loserStock = stocks.find((stock: any) => stock.symbol === loser);

		if (!winnerStock || !loserStock) {
			return json({ error: 'Winner or loser not found in stocks data' }, { status: 400 });
		}

		// Calculate expected scores
		const expectedScoreWinner = elo.getExpected(winnerStock.currentELO, loserStock.currentELO);
		const expectedScoreLoser = elo.getExpected(loserStock.currentELO, winnerStock.currentELO);

		// Update ELO ratings
		winnerStock.currentELO = elo.updateRating(expectedScoreWinner, 1, winnerStock.currentELO);
		loserStock.currentELO = elo.updateRating(expectedScoreLoser, 0, loserStock.currentELO);

		// Save updated stocks data back to the file
		await fs.writeFile(filePath, JSON.stringify(stocks, null, 2), 'utf-8');

		// Return updated ratings
		return json({
			message: 'ELO ratings updated successfully',
			winner: { symbol: winnerStock.symbol, newELO: winnerStock.currentELO },
			loser: { symbol: loserStock.symbol, newELO: loserStock.currentELO }
		});
	} catch (error) {
		console.error(error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
}
