import React from 'react';
import ReactDOM from 'react-dom/client';

import { ChatContextProvider } from '@/providers';

import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChatContextProvider>
			<App />
		</ChatContextProvider>
	</React.StrictMode>,
);
