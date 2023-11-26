import { Navigate, useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";

// layouts
import DashboardLayout from "src/layouts/dashboard";
import AuthLayout from "src/layouts/auth";
import LoadingScreen from "src/components/loadingScreen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            top: 0,
            left: 0,
            width: 1,
            zIndex: 9999,
            position: "fixed",
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "*",
      element: <AuthLayout />,
      children: [
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" replace /> },
        { path: "dashboard", element: <LandingPage /> },
        { path: "orders", element: <AllOrder /> },
        { path: "orders/:id", element: <OrderDetail /> },
        { path: "products", element: <Products /> },
        { path: "products/add", element: <AddProduct /> },
        { path: "products/:pid", element: <ProductUpdate /> },
        { path: "categories/main-categories", element: <Categories /> },
        { path: "categories/main-categories/add", element: <AddCategory /> },
        { path: "categories/main-categories/:cid", element: <EditCategory /> },
        { path: "categories/sub-categories", element: <SubCategories /> },
        { path: "categories/sub-categories/add", element: <AddSubCategory /> },
        {
          path: "categories/sub-categories/:cid",
          element: <EditSubCategory />,
        },
        { path: "slides", element: <MainSlides /> },
        {
          path: "slides/add",
          element: <AddPrimarySlider />,
        },
        {
          path: "slides/:sid",
          element: <EditPrimarySlider />,
        },

        { path: "brands", element: <Brands /> },
        { path: "brands/add", element: <AddBrands /> },
        { path: "brands/:bid", element: <EditBrands /> },
        { path: "users", element: <Users /> },
        { path: "users/:id", element: <UserProfile /> },
        { path: "newsletter", element: <Newsletter /> },
        { path: "settings", element: <GeneralSettings /> },
        { path: "blog/blog-categories", element: <BlogCategories /> },
        { path: "blog/blog-categories/add", element: <AddBlog /> },
        { path: "blog/blog-categories/:blid", element: <EditBlog /> },
        { path: "blog/all-blogs", element: <AllBlog /> },
        { path: "blog/all-blogs/add", element: <AddAllBlog /> },
        { path: "blog/all-blogs/:blid", element: <EditAllBlog /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <Login /> },
        {
          path: "/auth/forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "/auth/reset-password",
          element: <ResetPassword />,
        },
        {
          path: "/auth/register",
          element: <Register />,
        },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const AllOrder = Loadable(lazy(() => import("src/pages/orders")));
const OrderDetail = Loadable(
  lazy(() => import("src/pages/orders/orderDetail"))
);
const Products = Loadable(lazy(() => import("src/pages/products")));
const AddProduct = Loadable(
  lazy(() => import("src/pages/products/addProduct"))
);
const ProductUpdate = Loadable(
  lazy(() => import("src/pages/products/editProduct"))
);
const Categories = Loadable(lazy(() => import("src/pages/categories")));
const Brands = Loadable(lazy(() => import("src/pages/brands")));
const SubCategories = Loadable(
  lazy(() => import("src/pages/categories/subCategories"))
);
const Users = Loadable(lazy(() => import("src/pages/users")));
const UserProfile = Loadable(lazy(() => import("src/pages/users/profile")));
const AddCategory = Loadable(
  lazy(() => import("src/pages/categories/addCategory"))
);
const AddBrands = Loadable(lazy(() => import("src/pages/brands/addBrand.js")));
const EditBrands = Loadable(lazy(() => import("src/pages/brands/editBrand")));
const AddSubCategory = Loadable(
  lazy(() => import("src/pages/categories/subCategories/addCategory"))
);
const EditCategory = Loadable(
  lazy(() => import("src/pages/categories/editCategory"))
);
const EditSubCategory = Loadable(
  lazy(() => import("src/pages/categories/subCategories/editCategory"))
);
const GeneralSettings = Loadable(
  lazy(() => import("src/pages/settings/general"))
);
const AppSettings = Loadable(
  lazy(() => import("src/pages/settings/application"))
);
const AddPrimarySlider = Loadable(
  lazy(() => import("src/pages/slides/homeSlides/addHomeSlide"))
);
const EditPrimarySlider = Loadable(
  lazy(() => import("src/pages/slides/homeSlides/editHomeSlide"))
);
const EditBanners = Loadable(
  lazy(() => import("src/pages/settings/application/homeBanners/editBanners"))
);
// blog
const BlogCategories = Loadable(lazy(() => import("src/pages/blog")));
const AddBlog = Loadable(lazy(() => import("src/pages/blog/addBlog")));
const EditBlog = Loadable(lazy(() => import("src/pages/blog/editBlog")));
const AllBlog = Loadable(lazy(() => import("src/pages/blog/all-blog")));
const MainSlides = Loadable(lazy(() => import("src/pages/slides")));
const AddAllBlog = Loadable(
  lazy(() => import("src/pages/blog/all-blog/addAllBlog"))
);
const EditAllBlog = Loadable(
  lazy(() => import("src/pages/blog/all-blog/editAllBlog"))
);
// Main
const LandingPage = Loadable(lazy(() => import("src/pages")));

// notfound
const NotFound = Loadable(lazy(() => import("src/pages/404")));

// auth
const ForgetPassword = Loadable(
  lazy(() => import("src/pages/auth/forgetPassword"))
);
const ResetPassword = Loadable(
  lazy(() => import("src/pages/auth/resetPassword"))
);
const Login = Loadable(lazy(() => import("src/pages/auth/login")));
const Newsletter = Loadable(lazy(() => import("src/pages/newsletter")));
const Register = Loadable(lazy(() => import("src/pages/auth/register")));
