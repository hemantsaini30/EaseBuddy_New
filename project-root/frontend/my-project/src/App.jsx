import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { BookmarkProvider } from "./context/BookmarkContext";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <BookmarkProvider>
        <AppRoutes />
      </BookmarkProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
