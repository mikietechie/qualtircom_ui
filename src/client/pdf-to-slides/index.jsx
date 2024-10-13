import { createRoot } from 'react-dom/client';

import './styles.css';
import App from './components/App';

const container = document.getElementById('index');
const root = createRoot(container);
root.render(<App />);
