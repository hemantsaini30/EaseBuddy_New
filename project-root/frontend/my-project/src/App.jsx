import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { BookmarkProvider } from "./context/BookmarkContext";
import { MistakeProvider } from "./context/MistakeContext";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <BookmarkProvider>
        <MistakeProvider>
          <AppRoutes />
        </MistakeProvider>
      </BookmarkProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
