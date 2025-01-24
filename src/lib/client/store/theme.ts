import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export enum Theme {
	// Light Background Themes
	Light = 'light',
	Bumblebee = 'bumblebee',
	Emerald = 'emerald',
	Corporate = 'corporate',
	Pastel = 'pastel',
	Winter = 'winter',
	Lofi = 'lofi',
	Fantasy = 'fantasy',
	Wireframe = 'wireframe',
	Cmyk = 'cmyk',
	Acid = 'acid',
	Nord = 'nord',

	//Color Background Themes
	Garden = 'garden',
	Autumn = 'autumn',
	Retro = 'retro',
	Valentine = 'valentine',
	Lemonade = 'lemonade',
	Cupcake = 'cupcake',
	Cyberpunk = 'cyberpunk',
	Aqua = 'aqua',

	// Dark Background Themes
	Dark = 'dark',
	Synthwave = 'synthwave',
	Halloween = 'halloween',
	Forest = 'forest',
	Luxury = 'luxury',
	Dracula = 'dracula',
	Business = 'business',
	Night = 'night',
	Coffee = 'coffee',
	Dim = 'dim',
	Sunset = 'sunset',
	Black = 'black'
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
