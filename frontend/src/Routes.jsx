import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AIChatbot from './pages/ai-chatbot';
import AnalysisReport from './pages/analysis-report';
import DocumentUpload from './pages/document-upload';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIChatbot />} />
        <Route path="/ai-chatbot" element={<AIChatbot />} />
        <Route path="/analysis-report" element={<AnalysisReport />} />
        <Route path="/document-upload" element={<DocumentUpload />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
