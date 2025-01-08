import { TEMP_DB } from '$lib/server/redis/dbTemp';

class EloService {
	private readonly K_FACTOR = 15;

	private getExpected(playerELO: number, opponentELO: number): number {
		return 1 / (1 + 10 ** ((opponentELO - playerELO) / 400));
	}

	private calcElo(currentELO: number, expectedScore: number, actualScore: number): number {
		return currentELO + this.K_FACTOR * (actualScore - expectedScore);
	}

	async getElo(ticker: string): Promise<number | null> {
		return await TEMP_DB.getStockELO(ticker);
	}

	async updateElo(winnerTicker: string, loserTicker: string) {
		try {
			const [winnerELO, loserELO] = await Promise.all([
				TEMP_DB.getStockELO(winnerTicker),
				TEMP_DB.getStockELO(loserTicker)
			]);

			if (winnerELO === null || loserELO === null) {
				console.error('ELO not found for one or both tickers');
			}

			const expectedWinner = this.getExpected(winnerELO, loserELO);
			const expectedLoser = this.getExpected(loserELO, winnerELO);

			const newWinnerELO = this.calcElo(winnerELO, expectedWinner, 1);
			const newLoserELO = this.calcElo(loserELO, expectedLoser, 0);

			await TEMP_DB.updateStocksELO(winnerTicker, newWinnerELO, loserTicker, newLoserELO);
		} catch (error) {
			console.error(error);
		}
	}
}

export const ELO_SERVICE = new EloService();
