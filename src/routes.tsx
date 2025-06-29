import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import DemoPage from "./pages/DemoPage";

import ArtikelBoostLayout from "./components/demos/artikelboost/ArtikelBoostLayout";
import AbyssalShoppingLayout from "./components/demos/abyssal-shopping/AbyssalShoppingLayout";
import FireKitchenLayout from "./components/demos/fire-kitchen/FireKitchenLayout";

export const routes = createBrowserRouter([
    {
        path: "/", element: <Layout />, children: [
            { index: true, element: <HomePage /> },
            {
                path: "projects",
                lazy: async () => {
                    const module = await import("./pages/ProjectsPage");
                    return { Component: module.default };
                }
            },
        ]
    },
    {
        path: "/demo", element: <DemoPage />, children: [
            {
                path: "abyssal-shopping", element: <AbyssalShoppingLayout />, children: [
                    {
                        index: true,
                        lazy: async () => {
                            const module = await import("./pages/demos/abyssal-shopping/AbyssHomePage");
                            return { Component: module.default };
                        }
                    },
                    {
                        path: "auth",
                        lazy: async () => {
                            const module = await import("./pages/demos/abyssal-shopping/AuthPage");
                            const { default: AuthPage } = module;
                            const { default: ProtectedAuth } = await import("./components/demos/abyssal-shopping/auth/ProtectedAuth");

                            return {
                                Component: () => (
                                    <ProtectedAuth>
                                        <AuthPage />
                                    </ProtectedAuth>
                                ),
                            };
                        },
                    },
                    {
                        path: "logout",
                        lazy: async () => {
                            const module = await import("./components/demos/abyssal-shopping/auth/Logout");
                            return { Component: module.default };
                        }
                    },
                    {
                        path: "reset-password",
                        lazy: async () => {
                            const module = await import("./pages/demos/abyssal-shopping/ResetPasswordPage");
                            return { Component: module.default };
                        }
                    },
                    {
                        path: "profile",
                        lazy: async () => {
                            const module = await import("./pages/demos/abyssal-shopping/ProfilePage");
                            const { default: ProfilePage } = module;
                            const { default: ProtectedRoute } = await import("./components/demos/abyssal-shopping/ProtectedRoute");

                            return {
                                Component: () => (
                                    <ProtectedRoute>
                                        <ProfilePage />
                                    </ProtectedRoute>
                                ),
                            };
                        },
                    },
                    {
                        path: "products",
                        lazy: async () => {
                            const module = await import("./pages/demos/abyssal-shopping/ProductsPage");
                            return { Component: module.default };
                        }
                    },
                    {
                        path: "my-products",
                        lazy: async () => {
                            const module = await import("./pages/demos/abyssal-shopping/MyProductsPage");
                            const { default: MyProductsPage } = module;
                            const { default: ProtectedRoute } = await import("./components/demos/abyssal-shopping/ProtectedRoute");

                            return {
                                Component: () => (
                                    <ProtectedRoute>
                                        <MyProductsPage />
                                    </ProtectedRoute>
                                ),
                            };
                        },
                    },
                    {
                        path: "add-product",
                        lazy: async () => {
                            const module = await import("./pages/demos/abyssal-shopping/AddProductPage");
                            const { default: AddProductPage } = module;
                            const { default: ProtectedRoute } = await import("./components/demos/abyssal-shopping/ProtectedRoute");

                            return {
                                Component: () => (
                                    <ProtectedRoute>
                                        <AddProductPage />
                                    </ProtectedRoute>
                                ),
                            };
                        },
                    },
                    {
                        path: "products/:id",
                        lazy: async () => {
                            const module = await import("./pages/demos/abyssal-shopping/ProductDetailPage");
                            return { Component: module.default };
                        }
                    },
                    {
                        path: "cart",
                        lazy: async () => {
                            const module = await import("./pages/demos/abyssal-shopping/CartPage");
                            const { default: CartPage } = module;
                            const { default: ProtectedRoute } = await import("./components/demos/abyssal-shopping/ProtectedRoute");

                            return {
                                Component: () => (
                                    <ProtectedRoute>
                                        <CartPage />
                                    </ProtectedRoute>
                                ),
                            };
                        },
                    },
                    {
                        path: "orders/:orderId",
                        lazy: async () => {
                            const module = await import("./pages/demos/abyssal-shopping/OrderDetailsPage");
                            const { default: OrderDetailsPage } = module;
                            const { default: ProtectedRoute } = await import("./components/demos/abyssal-shopping/ProtectedRoute");

                            return {
                                Component: () => (
                                    <ProtectedRoute>
                                        <OrderDetailsPage />
                                    </ProtectedRoute>
                                ),
                            };
                        },
                    },
                    {
                        path: "orders",
                        lazy: async () => {
                            const module = await import("./pages/demos/abyssal-shopping/OrdersPage");
                            const { default: OrdersPage } = module;
                            const { default: ProtectedRoute } = await import("./components/demos/abyssal-shopping/ProtectedRoute");

                            return {
                                Component: () => (
                                    <ProtectedRoute>
                                        <OrdersPage />
                                    </ProtectedRoute>
                                ),
                            };
                        }
                    },
                ]
            },
            {
                path: "fire-kitchen",
                element: <FireKitchenLayout />,
                children: [
                    {
                        index: true,
                        lazy: async () => {
                            const module = await import("./pages/demos/fire-kitchen/FireKitchenHomePage");
                            return { Component: module.default };
                        }
                    },
                    {
                        path: "login",
                        lazy: async () => {
                            const module = await import("./pages/demos/fire-kitchen/auth/Loginpage");
                            const { default: LoginPage } = module;
                            const { default: ProtectedAuth } = await import("./components/demos/fire-kitchen/auth/ProtectedAuth");

                            return {
                                Component: () => (
                                    <ProtectedAuth>
                                        <LoginPage />
                                    </ProtectedAuth>
                                ),
                            };
                        },
                    },
                    {
                        path: "register",
                        lazy: async () => {
                            const module = await import("./pages/demos/fire-kitchen/auth/RegisterPage");
                            const { default: RegisterPage } = module;
                            const { default: ProtectedAuth } = await import("./components/demos/fire-kitchen/auth/ProtectedAuth");

                            return {
                                Component: () => (
                                    <ProtectedAuth>
                                        <RegisterPage />
                                    </ProtectedAuth>
                                ),
                            };
                        },
                    },
                    {
                        path: "logout",
                        lazy: async () => {
                            const module = await import("./components/demos/fire-kitchen/auth/Logout");
                            return { Component: module.default };
                        }
                    },
                    {
                        path: "recipes",
                        lazy: async () => {
                            const module = await import("./pages/demos/fire-kitchen/recipes/RecipesPage");
                            return { Component: module.default };
                        }
                    },
                    {
                        path: "my-recipes",
                        lazy: async () => {
                            const module = await import("./pages/demos/fire-kitchen/recipes/UserRecipesPage");
                            const { default: UserRecipesPage } = module;
                            const { default: ProtectedRoute } = await import("./components/demos/fire-kitchen/recipes/ProtectedRoute");

                            return {
                                Component: () => (
                                    <ProtectedRoute>
                                        <UserRecipesPage />
                                    </ProtectedRoute>
                                ),
                            };
                        },
                    },
                    {
                        path: "recipes/:id",
                        lazy: async () => {
                            const module = await import("./pages/demos/fire-kitchen/recipes/RecipesDetailsPage");
                            const { default: RecipesDetailsPage } = module;
                            const { default: ProtectedRoute } = await import("./components/demos/fire-kitchen/recipes/ProtectedRoute");

                            return {
                                Component: () => (
                                    <ProtectedRoute>
                                        <RecipesDetailsPage />
                                    </ProtectedRoute>
                                ),
                            };
                        },
                    },
                    {
                        path: "share",
                        lazy: async () => {
                            const module = await import("./pages/demos/fire-kitchen/recipes/SharePage");
                            const { default: SharePage } = module;
                            const { default: ProtectedRoute } = await import("./components/demos/fire-kitchen/recipes/ProtectedRoute");

                            return {
                                Component: () => (
                                    <ProtectedRoute>
                                        <SharePage />
                                    </ProtectedRoute>
                                ),
                            };
                        },
                    },
                ]
            },
            {
                path: "artikel-boost",
                element: <ArtikelBoostLayout />,
                children: [
                    {
                        index: true,
                        lazy: async () => {
                            const module = await import("./pages/demos/artikelboost/ArtikelBoostHomePage");
                            return { Component: module.default };
                        }
                    },
                    {
                        path: "tips",
                        lazy: async () => {
                            const module = await import("./pages/demos/artikelboost/TipPage");
                            return { Component: module.default };
                        }
                    },
                    {
                        path: "cases",
                        lazy: async () => {
                            const module = await import("./pages/demos/artikelboost/CasePage");
                            return { Component: module.default };
                        }
                    },
                    {
                        path: "collection",
                        lazy: async () => {
                            const module = await import("./pages/demos/artikelboost/CollectionPage");
                            return { Component: module.default };
                        }
                    },
                    {
                        path: "categories/:category",
                        lazy: async () => {
                            const module = await import("./pages/demos/artikelboost/CategoryPage");
                            return { Component: module.default };
                        }
                    },
                ],
            },
        ]
    }
]);
