import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from "./pages/homepage/HomePage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/*" element={<Navigate replace to='/' />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
