
import FirstPage from "./page/FirstPage"
import SecondPage from "./page/SecondPage"
import Timetable from "./page/Timetable"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

//todo: поставить дату по умолчанию - текущую неделя
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<FirstPage />} />
          <Route exact path="/second" element={<SecondPage />} />
          <Route exact path="/timetable" element={<Timetable />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
