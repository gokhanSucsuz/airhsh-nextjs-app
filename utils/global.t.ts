export {};
declare global {
	interface Window {
		Clerk?: {
			openSignIn: () => void;
		};
	}
}
