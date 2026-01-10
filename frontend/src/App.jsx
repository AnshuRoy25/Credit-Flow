import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate
} from "react-router-dom";

import AppLayout from "./AppLayout.jsx";
import HomePage from "./Pages/Home";

// Loan application pages
import LoanTypesPage from "./Pages/LoanTypesPage.jsx";
import PersonalLoanPage from "./Pages/PersonalLoanPage.jsx";
import ConfirmDetailsPage from "./Pages/ConfirmDetailsPage.jsx";
import ContactDetailsPage from "./Pages/ContactDetailsPage.jsx";
import GrantPermissionsPage from "./Pages/GrantPermissionsPage.jsx";
import EmploymentDetailsPage from "./Pages/EmploymentDetailsPage.jsx";
import LoanAmountPage from "./Pages/LoanAmountPage.jsx";
import EMIStartDatePage from "./Pages/EMIStartDatePage.jsx";
import ReviewApplicationPage from "./Pages/ReviewApplicationPage.jsx";
import ProcessingPage from "./Pages/ProcessingPage.jsx";
import ResultPage from "./Pages/ResultPage.jsx";

/* ============== App Root Component ============== */
import Navbar from "./components/navbar.jsx";

/* ============== App Root Component ============== */
export default function App() {
  const [links, setLinks] = useState([]);

  function addLink(title, url) {
    setLinks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        url
      }
    ]);
  }

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          {/* ===== Loan Application Flow ===== */}
          <Route path="/loan-types" element={<LoanTypesPage />} />
          <Route path="/personal-loan" element={<PersonalLoanPage />} />
          <Route path="/confirm-details" element={<ConfirmDetailsPage />} />
          <Route path="/contact-details" element={<ContactDetailsPage />} />
          <Route path="/grant-permissions" element={<GrantPermissionsPage />} />
          <Route path="/employment-details" element={<EmploymentDetailsPage />} />
          <Route path="/loan-amount" element={<LoanAmountPage />} />
          <Route path="/emi-start-date" element={<EMIStartDatePage />} />
          <Route path="/review-application" element={<ReviewApplicationPage />} />
          <Route path="/processing" element={<ProcessingPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}
