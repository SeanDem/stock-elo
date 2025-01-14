export abstract class AdapterStrategy {
	abstract adapt(text: string): string | null;
}
