/* eslint-disable react-refresh/only-export-components */
import type { ComponentType } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Layout from "@/components/layouts/Layout";
import { ROUTES } from "./routes";

// Helper to load components
const loadComponent =
  (importFunc: () => Promise<{ default: ComponentType }>) => async () => {
    const module = await importFunc();
    return { Component: module.default };
  };

// Route Configuration using createBrowserRouter
export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      // Authentication Routes (Outside of Layout)
      {
        path: ROUTES.login,
        lazy: loadComponent(
          () => import("@/components/pages/authentication/Login"),
        ),
      },
      {
        path: ROUTES.signup,
        lazy: loadComponent(
          () => import("@/components/pages/authentication/Signup"),
        ),
      },
      {
        path: ROUTES.forgotPassword,
        lazy: loadComponent(
          () => import("@/components/pages/authentication/ForgotPassword"),
        ),
      },
      {
        path: ROUTES.resetPassword,
        lazy: loadComponent(
          () => import("@/components/pages/authentication/ResetPassword"),
        ),
      },
      {
        path: ROUTES.contact,
        lazy: loadComponent(() => import("@/components/pages/Contact")),
      },

      // Routes Wrapped in Layout
      {
        element: <Layout />,
        children: [
          // Nested Translator Routes
          {
            path: "/", // Home/Root route uses Translator
            lazy: loadComponent(() => import("@/components/pages/Translator")),
            children: [
              {
                index: true,
                lazy: loadComponent(
                  () => import("@/components/translator/TranslateTexts"),
                ),
              },
              {
                path: ROUTES.translate.index,
                lazy: loadComponent(
                  () => import("@/components/translator/TranslateTexts"),
                ),
              },
              {
                path: ROUTES.translate.summarization,
                lazy: loadComponent(
                  () => import("@/components/translator/Summarization"),
                ),
              },
              {
                path: ROUTES.translate.transliteration,
                lazy: loadComponent(
                  () => import("@/components/translator/Transliteration"),
                ),
              },
              {
                path: ROUTES.share,
                lazy: loadComponent(
                  () => import("@/components/translator/TranslateTexts"),
                ),
              },
            ],
          },
          {
            path: ROUTES.about,
            lazy: loadComponent(() => import("@/components/pages/About")),
          },
          {
            path: ROUTES.privacy,
            lazy: loadComponent(() => import("@/components/pages/Privacy")),
          },
          {
            path: ROUTES.contributionGuidelines,
            lazy: loadComponent(
              () => import("@/components/pages/ContributionGuidelines"),
            ),
          },
          {
            path: ROUTES.feedback,
            lazy: loadComponent(() => import("@/components/pages/Feedback")),
          },
          {
            path: ROUTES.liveAssistance,
            lazy: loadComponent(
              () => import("@/components/pages/LiveAssistance"),
            ),
          },
          {
            path: ROUTES.contribution,
            lazy: loadComponent(
              () => import("@/components/pages/Contribution"),
            ),
          },
          {
            path: ROUTES.learn,
            lazy: loadComponent(() => import("@/components/pages/Learn")),
          },
          {
            path: ROUTES.favorites,
            lazy: loadComponent(() => import("@/components/pages/Favorites")),
          },
          {
            path: ROUTES.dictionary,
            lazy: loadComponent(() => import("@/components/pages/Dictionary")),
          },
          {
            path: ROUTES.community,
            lazy: loadComponent(() => import("@/components/pages/Community")),
          },
          {
            path: ROUTES.communityStartPage,
            lazy: async () => {
              const { default: CommunityFrontPage } = await import(
                "@/components/community/CommunityFrontPage"
              );
              return { Component: () => <CommunityFrontPage isPage={true} /> };
            },
          },
          // Nested Settings Routes
          {
            path: ROUTES.settings.general,
            lazy: loadComponent(() => import("@/components/pages/Settings")),
            children: [
              {
                index: true,
                lazy: loadComponent(
                  () => import("@/components/pages/settings/ProfileSettings"),
                ),
              },
              {
                path: ROUTES.settings.profile,
                lazy: loadComponent(
                  () => import("@/components/pages/settings/ProfileSettings"),
                ),
              },
              {
                path: ROUTES.settings.appearance,
                lazy: loadComponent(
                  () =>
                    import("@/components/pages/settings/AppearanceSettings"),
                ),
              },
              {
                path: ROUTES.settings.notifications,
                lazy: loadComponent(
                  () =>
                    import("@/components/pages/settings/NotificationSettings"),
                ),
              },
            ],
          },
          // 404 / Not Found Route
          {
            path: ROUTES.notFound,
            lazy: loadComponent(() => import("@/components/pages/NotFound")),
          },
          {
            path: "*",
            lazy: loadComponent(() => import("@/components/pages/NotFound")),
          },
        ],
      },
    ],
  },
]);
