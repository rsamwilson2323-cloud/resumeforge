import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import { EditorPage } from "./pages/EditorPage";

// Root route with Layout as the shell
const rootRoute = createRootRoute({
  component: Layout,
});

// / — redirect directly to /editor
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/editor" });
  },
});

// /editor — main editor (no auth required)
const editorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/editor",
  component: EditorPage,
});

const routeTree = rootRoute.addChildren([indexRoute, editorRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { redirect };
