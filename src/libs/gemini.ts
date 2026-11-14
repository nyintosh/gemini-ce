const MODEL = 'gemini-3.5-flash-lite';
const KEY_STORAGE = 'gemini-api-key';

const safetySettings = [
	'HARM_CATEGORY_HARASSMENT',
	'HARM_CATEGORY_HATE_SPEECH',
	'HARM_CATEGORY_SEXUALLY_EXPLICIT',
	'HARM_CATEGORY_DANGEROUS_CONTENT',
].map((category) => ({ category, threshold: 'BLOCK_MEDIUM_AND_ABOVE' }));

type GeminiResponse = {
	candidates?: { content?: { parts?: { text?: string }[] } }[];
	error?: { message?: string };
};

let apiKey = (() => {
	try {
		return localStorage.getItem(KEY_STORAGE) ?? '';
	} catch {
		return '';
	}
})();

export const getApiKey = () => apiKey;

export function saveApiKey(key: string) {
	apiKey = key.trim();
	try {
		if (apiKey) localStorage.setItem(KEY_STORAGE, apiKey);
		else localStorage.removeItem(KEY_STORAGE);
	} catch {
		// Storage unavailable: the key lasts until the page is closed.
	}
}

export async function runChat(prompt: string): Promise<{ data?: string; error?: string }> {
	if (!apiKey) {
		return { error: 'Add your Gemini API key at the top of the page to start chatting.' };
	}

	try {
		const res = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
				body: JSON.stringify({
					contents: [{ role: 'user', parts: [{ text: prompt }] }],
					generationConfig: { temperature: 0.9, topK: 1, topP: 1 },
					safetySettings,
				}),
			},
		);
		const json = (await res.json()) as GeminiResponse;

		if (!res.ok) {
			return { error: json.error?.message ?? 'Gemini request failed' };
		}

		const text = json.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('');
		return text ? { data: text } : { error: 'No response. The prompt may have been blocked.' };
	} catch (error) {
		return { error: (error as Error).message };
	}
}
