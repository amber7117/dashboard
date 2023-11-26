// components
import { Icon } from "@iconify/react";
// ----------------------------------------------------------------------

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: <Icon icon="ant-design:dashboard-outlined" />,
    isSearch: false,
  },
  {
    title: "categories",
    path: "/categories",
    icon: <Icon icon="bx:category" />,
    isSearch: true,
    children: [
      {
        title: "main-categories",
        path: "/categories/main-categories",
        icon: <Icon icon="majesticons:users-line" />,
      },
      {
        title: "sub-categories",
        path: "/categories/sub-categories",
        icon: <Icon icon="majesticons:users-line" />,
      },
    ],
  },
  {
    title: "brands",
    path: "/brands",
    icon: <Icon icon="tabler:brand-booking" />,
    isSearch: true,
  },
  {
    title: "product",
    path: "/products",
    icon: <Icon icon="fluent:building-shop-20-regular" />,
    isSearch: true,
  },
  {
    title: "orders",
    path: "/orders",
    icon: <Icon icon="bi:cart-check" />,
    isSearch: true,
  },

  // {
  //   title: "Sliders",
  //   path: "/sliders",
  //   icon: <Icon icon="majesticons:users-line" />,
  //   // isSearch: true,
  //   children: [
  //     {
  //       title: "Home Slider",
  //       path: "/home-slider",
  //       icon: <Icon icon="majesticons:users-line" />,
  //     },
  //     {
  //       title: "Home Banners",
  //       path: "/home-banners",
  //       icon: <Icon icon="majesticons:users-line" />,
  //     },
  //   ],
  // },
  {
    title: "users",
    path: "/users",
    icon: <Icon icon="majesticons:users-line" />,
    isSearch: true,
  },
  {
    title: "newsletter",
    path: "/newsletter",
    icon: <Icon icon="clarity:email-line" />,
  },
  {
    title: "slides",
    path: "/slides",
    icon: <Icon icon="solar:slider-vertical-linear" />,
  },
  {
    title: "setting",
    path: "/settings",
    icon: <Icon icon="bytesize:settings" />,
  },
  // {
  //   title: "setting",
  //   path: "/settings",
  //   icon: <Icon icon="bytesize:settings" />,
  //   isSearch: false,
  //   children: [
  //     {
  //       title: "front-end-app",
  //       path: "/settings/application",
  //       icon: <Icon icon="majesticons:users-line" />,
  //     },
  //     {
  //       title: "general",
  //       path: "/settings/general",
  //       icon: <Icon icon="majesticons:users-line" />,
  //     },
  //   ],
  // },
  // {
  //   title: "Blog",
  //   path: "/blog",
  //   icon: <Icon icon="bx:category" />,
  //   isSearch: true,
  //   children: [
  //     {
  //       title: "blog-categories",
  //       path: "/blog/blog-categories",
  //       icon: <Icon icon="majesticons:users-line" />,
  //     },
  //     {
  //       title: "All Blogs",
  //       path: "/blog/all-blogs",
  //       icon: <Icon icon="majesticons:users-line" />,
  //     },
  //   ],
  // },
];

export default sidebarConfig;
