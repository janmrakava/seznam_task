import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import CreateNewList from './pages/CreateNewList/CreateNewList';
import UpdateList from './pages/UpdateList/UpdateList';
import ShowList from './pages/ShowList/ShowList';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path="createnew" element={<CreateNewList />} />
      <Route path="updatelist" element={<UpdateList />} />
      <Route path="showlist" element={<ShowList />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
