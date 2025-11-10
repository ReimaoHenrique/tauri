import { JwtProvider, useJwt } from './context/JwtManager';
import { Login } from './components/Login';
import { UserProfile } from './components/UserProfile';
import './App.css';

const AppContent = () => {
  const { token } = useJwt();
  return token ? <UserProfile /> : <Login />;
}

function App() {
  return (
    <JwtProvider>
      <AppContent />
    </JwtProvider>
  );
}

export default App;
