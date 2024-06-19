import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import AccessibilitySettings from "./pages/AccessibilitySettings.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Navigation from "./components/Navigation.jsx";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/accessibility-settings" element={<AccessibilitySettings />} />
        <Route exact path="/" element={<Index />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
