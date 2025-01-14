import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export enum Theme {
	Light = 'light',
	Dark = 'dark',
	Cupcake = 'cupcake',
	Bumblebee = 'bumblebee',
	Emerald = 'emerald',
	Corporate = 'corporate',
	Synthwave = 'synthwave',
	Retro = 'retro',
	Cyberpunk = 'cyberpunk',
	Valentine = 'valentine',
	Halloween = 'halloween',
	Garden = 'garden',
	Forest = 'forest',
	Aqua = 'aqua',
	Lofi = 'lofi',
	Pastel = 'pastel',
	Fantasy = 'fantasy',
	Wireframe = 'wireframe',
	Black = 'black',
	Luxury = 'luxury',
	Dracula = 'dracula',
	Cmyk = 'cmyk',
	Autumn = 'autumn',
	Business = 'business',
	Acid = 'acid',
	Lemonade = 'lemonade',
	Night = 'night',
	Coffee = 'coffee',
	Winter = 'winter',
	Dim = 'dim',
	Nord = 'nord',
	Sunset = 'sunset'
}

const KEY = 'theme';
const defaultTheme = Theme.Light;
export const themeStore = writable(defaultTheme);

if (browser) {
	// const initialValue = localStorage.getItem(KEY) ? localStorage.getItem(KEY) : defaultTheme;
	themeStore.set(defaultTheme as Theme);

	themeStore.subscribe((value) => {
		localStorage.setItem(KEY, value);
	});
}

export function setTheme(themeName: Theme) {
	themeStore.set(themeName);
}
