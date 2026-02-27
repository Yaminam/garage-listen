import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { SavedSearchProvider } from './context/SavedSearchContext';
import { MentionsProvider } from './context/MentionsContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <SavedSearchProvider>
            <MentionsProvider>
              <RouterProvider router={router} />
            </MentionsProvider>
          </SavedSearchProvider>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
