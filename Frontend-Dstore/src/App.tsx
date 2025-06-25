import './App.css'
import React from "react";
import {publicRoutes} from "@/constants/routesContant";
import Layout from '@/layouts/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Routes>
                  {publicRoutes.map((route, index) => {
                      let DefaultLayout: React.ComponentType<any> = Layout
                      if (route.layout) {
                          DefaultLayout = route.layout as React.ComponentType<any>
                      }
                      const Page = route.element

                      return (
                          <Route
                              key={index}
                              path={route.path}
                              element={
                                  <DefaultLayout>
                                      <Page />
                                  </DefaultLayout>
                              }
                          />
                      )
                  })}
              </Routes>
          </div>
      </BrowserRouter>
  )
}

export default App
