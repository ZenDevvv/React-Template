import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, Link, useLocation } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import React__default, { createElement, useState, useCallback, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import * as Icons from "lucide-react";
import { Home, Settings, Film, UtensilsCrossed, Calendar, Phone, LogOut, Bell, User, ChevronDown, HelpCircle, Thermometer, Power, Music, Bluetooth, SkipBack, Play, SkipForward, Clock, Lock, Lightbulb, Edit2, Moon, Sun } from "lucide-react";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import axios from "axios";
import debounce from "lodash/debounce.js";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1e3,
      // 1 minute
      retry: 1
    }
  }
});
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(QueryClientProvider, {
    client: queryClient,
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const navLinkVariants = cva(
  "inline-flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group",
  {
    variants: {
      variant: {
        default: "text-foreground hover:text-primary",
        glass: "text-white hover:bg-white/15 rounded-xl",
        card: "bg-card text-card-foreground hover:bg-accent rounded-lg shadow-sm"
      },
      size: {
        sm: "p-1 gap-1",
        default: "p-2 gap-2",
        lg: "p-3 gap-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const NavLink = React.forwardRef(
  ({ className, variant, size, icon, label, ...props }, ref) => {
    return /* @__PURE__ */ jsxs(
      Link,
      {
        className: cn(navLinkVariants({ variant, size, className })),
        ref,
        ...props,
        children: [
          icon && /* @__PURE__ */ jsx("div", { className: "transition-all duration-300 group-hover:scale-110", children: icon }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium tracking-wide", children: label })
        ]
      }
    );
  }
);
NavLink.displayName = "NavLink";
const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        glass: "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white"
      },
      size: {
        sm: "h-8 w-8",
        default: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-14 w-14"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const IconButton = React.forwardRef(
  ({ className, variant, size, icon, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "button",
      {
        className: cn(iconButtonVariants({ variant, size, className })),
        ref,
        ...props,
        children: icon
      }
    );
  }
);
IconButton.displayName = "IconButton";
const NavigationMenu = () => {
  const navItems = [
    { icon: /* @__PURE__ */ jsx(Home, { className: "w-6 h-6" }), label: "Home", to: "/home" },
    { icon: /* @__PURE__ */ jsx(Settings, { className: "w-6 h-6" }), label: "Controls", to: "/controls" },
    { icon: /* @__PURE__ */ jsx(Film, { className: "w-6 h-6" }), label: "Entertainment", to: "/entertainment" },
    { icon: /* @__PURE__ */ jsx(UtensilsCrossed, { className: "w-6 h-6" }), label: "Dining", to: "/dining" },
    { icon: /* @__PURE__ */ jsx(Calendar, { className: "w-6 h-6" }), label: "Reservations", to: "/reservations" },
    { icon: /* @__PURE__ */ jsx(Phone, { className: "w-6 h-6" }), label: "Operator", to: "/operator" },
    { icon: /* @__PURE__ */ jsx(LogOut, { className: "w-6 h-6" }), label: "Sign Out", to: "/signout" }
  ];
  return /* @__PURE__ */ jsx("nav", { className: "inline-block px-6 py-3 bg-black/40 backdrop-blur-lg rounded-full border border-white/20 shadow-2xl", children: /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-3", children: navItems.map((item, index) => /* @__PURE__ */ jsx(
    NavLink,
    {
      to: item.to,
      label: item.label,
      icon: /* @__PURE__ */ jsx(IconButton, { variant: "glass", size: "lg", icon: item.icon }),
      variant: "glass"
    },
    index
  )) }) });
};
const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
      destructive: "text-destructive",
      white: "text-white"
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
      "7xl": "text-7xl"
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      light: "font-light"
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "base",
    weight: "normal",
    align: "left"
  }
});
const Text = React.forwardRef(
  ({
    className,
    variant,
    size,
    weight,
    align,
    as: Component = "p",
    italic = false,
    truncate = false,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsx(
      Component,
      {
        className: cn(
          textVariants({ variant, size, weight, align }),
          {
            italic,
            truncate
          },
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Text.displayName = "Text";
function Image({
  src,
  alt = "",
  aspectRatio = "auto",
  width,
  height,
  className,
  ...props
}) {
  const aspectRatioClasses = {
    auto: "",
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[16/9]"
  };
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: src || "/placeholder.svg",
      alt,
      width,
      height,
      className: cn("object-contain", aspectRatioClasses[aspectRatio], className),
      ...props
    }
  );
}
const HeroSection = ({ guestName = "Ancorl" }) => {
  const currentTime = /* @__PURE__ */ new Date();
  currentTime.getHours();
  return /* @__PURE__ */ jsxs("div", { className: "relative h-screen w-full", children: [
    /* @__PURE__ */ jsx(
      Image,
      {
        src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
        alt: "Hotel Exterior",
        className: "absolute inset-0 w-full h-full object-cover"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/50" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-16 left-1/2 transform -translate-x-1/2 text-white text-center", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 px-4", children: [
      /* @__PURE__ */ jsxs(
        Text,
        {
          as: "p",
          size: "xl",
          weight: "light",
          variant: "white",
          align: "center",
          italic: true,
          className: "md:text-2xl tracking-wide",
          children: [
            "Greetings, ",
            guestName,
            "!"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Text,
        {
          as: "h1",
          size: "3xl",
          weight: "bold",
          variant: "white",
          align: "center",
          className: "md:text-5xl lg:text-6xl leading-tight",
          children: "Welcome to Dusit Thani Manila"
        }
      ),
      /* @__PURE__ */ jsx(
        Text,
        {
          as: "p",
          size: "base",
          weight: "light",
          variant: "white",
          align: "center",
          className: "md:text-lg opacity-90 mb-8",
          children: "Experience luxury and comfort at its finest"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsx(NavigationMenu, {}) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "absolute top-6 left-6 flex items-center text-white", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M10 2s-6 6-6 10a6 6 0 1012 0c0-4-6-10-6-10z" }) }),
      /* @__PURE__ */ jsx("span", { className: "text-lg font-medium", children: "52% Humidity" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-6 right-6 text-white text-right", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx("div", { className: "text-lg font-medium", children: currentTime.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }) }),
      /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }) })
    ] }) })
  ] });
};
const WelcomePage = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "relative min-h-screen",
    children: /* @__PURE__ */ jsx(HeroSection, {})
  });
};
const WelcomePage$1 = withComponentProps(WelcomePage);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WelcomePage,
  default: WelcomePage$1
}, Symbol.toStringTag, { value: "Module" }));
const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  return /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 lg:py-5 bg-gradient-to-r from-white to-gray-50 shadow-sm border-b border-gray-100", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx(Text, { as: "h1", size: "xl", weight: "bold", className: "text-blue-900 tracking-tight", children: "Dusit" }),
      /* @__PURE__ */ jsx(
        Text,
        {
          as: "p",
          size: "xs",
          variant: "muted",
          className: "uppercase tracking-widest font-medium hidden sm:block",
          children: "INTERNATIONAL"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 sm:space-x-6", children: [
      /* @__PURE__ */ jsx(
        IconButton,
        {
          variant: "ghost",
          size: "default",
          icon: /* @__PURE__ */ jsx(Bell, { className: "w-5 h-5 text-gray-600" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowDropdown(!showDropdown),
            className: "flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-white" }) }),
              /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-gray-500" })
            ]
          }
        ),
        showDropdown && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50", children: [
          /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 border-b border-gray-100", children: [
            /* @__PURE__ */ jsx(Text, { as: "p", size: "sm", weight: "semibold", className: "text-gray-900", children: "John Doe" }),
            /* @__PURE__ */ jsx(Text, { as: "p", size: "xs", variant: "muted", children: "Guest - Room 1205" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "py-2", children: [
            /* @__PURE__ */ jsxs("button", { className: "w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors", children: [
              /* @__PURE__ */ jsx(Settings, { className: "w-4 h-4 text-gray-500" }),
              /* @__PURE__ */ jsx(Text, { as: "span", size: "sm", className: "text-gray-700", children: "Settings" })
            ] }),
            /* @__PURE__ */ jsxs("button", { className: "w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors", children: [
              /* @__PURE__ */ jsx(HelpCircle, { className: "w-4 h-4 text-gray-500" }),
              /* @__PURE__ */ jsx(Text, { as: "span", size: "sm", className: "text-gray-700", children: "Help & Support" })
            ] }),
            /* @__PURE__ */ jsxs("button", { className: "w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors", children: [
              /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4 text-red-500" }),
              /* @__PURE__ */ jsx(Text, { as: "span", size: "sm", className: "text-red-600", children: "Sign Out" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const NavItem = ({ icon, label, to, isActive = false }) => /* @__PURE__ */ jsxs(
  Link,
  {
    to,
    className: "flex flex-col items-center space-y-2 sm:space-y-3 cursor-pointer group transition-all duration-200 min-w-0 flex-shrink-0",
    children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `p-2 sm:p-3 lg:p-4 rounded-xl transition-all duration-200 ${isActive ? "text-blue-600 bg-blue-50 shadow-sm" : "text-gray-500 hover:text-blue-600 hover:bg-blue-50/50"}`,
          children: React__default.cloneElement(icon, {
            className: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
          })
        }
      ),
      /* @__PURE__ */ jsx(
        Text,
        {
          as: "span",
          size: "xs",
          weight: isActive ? "semibold" : "medium",
          className: `transition-colors text-center whitespace-nowrap sm:text-sm ${isActive ? "text-blue-600" : "text-gray-600 group-hover:text-blue-600"}`,
          children: label
        }
      ),
      isActive && /* @__PURE__ */ jsx("div", { className: "w-4 sm:w-6 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" })
    ]
  }
);
const HorizontalNav = () => {
  const location = useLocation();
  const navItems = [
    { icon: /* @__PURE__ */ jsx(Home, {}), label: "Home", to: "/home" },
    { icon: /* @__PURE__ */ jsx(Settings, {}), label: "Controls", to: "/controls" },
    { icon: /* @__PURE__ */ jsx(Film, {}), label: "Entertainment", to: "/entertainment" },
    { icon: /* @__PURE__ */ jsx(UtensilsCrossed, {}), label: "Dining", to: "/dining" },
    { icon: /* @__PURE__ */ jsx(Calendar, {}), label: "Reservations", to: "/reservations" },
    { icon: /* @__PURE__ */ jsx(Phone, {}), label: "Services", to: "/operator" }
  ];
  return /* @__PURE__ */ jsx("nav", { className: "flex items-center justify-center space-x-4 sm:space-x-6 lg:space-x-40 py-4 sm:py-6 lg:py-8 bg-gradient-to-b from-white to-gray-50/50 border-b border-gray-200 overflow-x-auto", children: navItems.map((item, index) => /* @__PURE__ */ jsx(NavItem, { ...item, isActive: location.pathname === item.to }, index)) });
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
const BASE_URL = "/api/dms";
const DEVICE_IDS = {
  AC: {
    deviceId: "eb9f194920a4ae4b877qs9",
    remoteId: "ebd03d60a10029efb4bryq"
  },
  TV: {
    deviceId: "eb9f194920a4ae4b877qs9",
    remoteId: "eb2a70815ce0f3b461jxdm"
  }
};
const tuyaIRService = {
  sendCommand: async (params, deviceType = "AC") => {
    const { deviceId, remoteId } = DEVICE_IDS[deviceType];
    const response = await axios.post(
      `${BASE_URL}/tuya-ir/${deviceId}/remotes/${remoteId}/command`,
      params
    );
    return response.data;
  },
  getACStatus: async (deviceIds) => {
    const { remoteId } = DEVICE_IDS.AC;
    const response = await axios.get(`${BASE_URL}/tuya-ir/ac/status/batch`, {
      params: { device_ids: remoteId }
    });
    return response.data;
  },
  getDeviceProperties: async () => {
    var _a, _b;
    const { remoteId } = DEVICE_IDS.AC;
    const response = await axios.get(`${BASE_URL}/tuya/devices/${remoteId}/properties`);
    return ((_b = (_a = response.data) == null ? void 0 : _a.result) == null ? void 0 : _b.properties) || [];
  },
  getRemoteKeys: async (deviceType = "AC") => {
    var _a;
    const { deviceId, remoteId } = DEVICE_IDS[deviceType];
    const response = await axios.get(
      `${BASE_URL}/tuya-ir/${deviceId}/remotes/${remoteId}/keys`
    );
    return ((_a = response.data) == null ? void 0 : _a.result) || {};
  }
};
const useTuyaIRCommand = (deviceId) => {
  const queryClient2 = useQueryClient();
  const { data: acStatus, isLoading: isLoadingStatus } = useQuery({
    queryKey: ["ac-status", deviceId],
    queryFn: async () => {
      const response = await tuyaIRService.getACStatus([deviceId]);
      return response.result[0];
    },
    refetchOnWindowFocus: true,
    refetchInterval: void 0,
    retry: false
  });
  const { mutate: sendCommand, isPending: isSendingCommand } = useMutation({
    mutationFn: (params) => tuyaIRService.sendCommand(params),
    onSuccess: () => {
      setTimeout(() => {
        queryClient2.invalidateQueries({ queryKey: ["ac-status", deviceId] });
      }, 1e3);
    }
  });
  return {
    acStatus,
    isLoadingStatus,
    sendCommand,
    isSendingCommand
  };
};
const ACWidget = () => {
  const [localTemp, setLocalTemp] = useState(19);
  const [isOn, setIsOn] = useState(false);
  const [currentMode, setCurrentMode] = useState("Auto");
  const [isDragging, setIsDragging] = useState(false);
  const cx = 120;
  const cy = 120;
  const radius = 100;
  const circumference = Math.PI * radius;
  const minTemp = 16;
  const maxTemp = 30;
  const clamped = Math.min(Math.max(localTemp, minTemp), maxTemp);
  const t = (clamped - minTemp) / (maxTemp - minTemp);
  const angle = -Math.PI + t * Math.PI;
  const pointerX = cx + radius * Math.cos(angle);
  const pointerY = cy + radius * Math.sin(angle);
  const bgPath = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`;
  const { mutate: sendCommand } = useTuyaIRCommand();
  const debouncedSendTemp = useCallback(
    debounce((temp) => {
      sendCommand({
        category_id: 5,
        key_id: 0,
        key: "T" + temp.toString()
      });
    }, 500),
    [sendCommand]
  );
  const handlePowerToggle = () => {
    sendCommand({
      category_id: 5,
      key_id: 0,
      key: isOn ? "PowerOff" : "PowerOn"
    });
    setIsOn(!isOn);
  };
  const handleModeChange = (mode) => {
    if (!isOn) return;
    const modeMap = {
      Auto: "M2",
      Cool: "M0",
      Dry: "M4"
    };
    sendCommand({
      category_id: 5,
      key_id: 1,
      key: modeMap[mode]
    });
    setCurrentMode(mode);
  };
  const calculateTemperature = (clientX, clientY, rect) => {
    const x = clientX - rect.left - cx;
    const y = clientY - rect.top - cy;
    const angle2 = Math.atan2(y, x);
    let newTemp = Math.round((angle2 + Math.PI) / Math.PI * (maxTemp - minTemp) + minTemp);
    return Math.max(minTemp, Math.min(maxTemp, newTemp));
  };
  const handleMouseDown = (e) => {
    if (!isOn) return;
    setIsDragging(true);
    const newTemp = calculateTemperature(
      e.clientX,
      e.clientY,
      e.currentTarget.getBoundingClientRect()
    );
    setLocalTemp(newTemp);
  };
  const handleMouseMove = (e) => {
    if (!isDragging || !isOn) return;
    const newTemp = calculateTemperature(
      e.clientX,
      e.clientY,
      e.currentTarget.getBoundingClientRect()
    );
    setLocalTemp(newTemp);
    debouncedSendTemp(newTemp);
  };
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      debouncedSendTemp(localTemp);
    }
  };
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mouseup", handleGlobalMouseUp);
      return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
    }
    return void 0;
  }, [isDragging]);
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col items-center h-[300px] justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full mb-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(Thermometer, { className: "w-5 h-5 text-pink-400" }),
        /* @__PURE__ */ jsx(Text, { as: "span", size: "xs", variant: "muted", children: "Climate" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handlePowerToggle,
          className: `p-2 rounded-full transition-colors ${isOn ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`,
          children: /* @__PURE__ */ jsx(Power, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative mb-2", children: /* @__PURE__ */ jsxs(
      "svg",
      {
        width: cx * 2,
        height: cy + 10,
        viewBox: `0 0 ${cx * 2} ${cy + 10}`,
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        className: `cursor-${isOn ? "pointer" : "not-allowed"} select-none`,
        children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: bgPath,
              stroke: "#f1f2f4",
              strokeWidth: 18,
              fill: "none",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: bgPath,
              stroke: isOn ? "#ff7f6b" : "#e5e7eb",
              strokeWidth: 18,
              fill: "none",
              strokeLinecap: "round",
              strokeDasharray: `${circumference * t} ${circumference}`,
              className: "transition-all duration-200"
            }
          ),
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: pointerX,
              cy: pointerY,
              r: 8,
              fill: isOn ? "#ff7f6b" : "#e5e7eb",
              className: "transition-all duration-200"
            }
          ),
          /* @__PURE__ */ jsx("circle", { cx: pointerX, cy: pointerY, r: 4, fill: "#fff" }),
          /* @__PURE__ */ jsxs(
            "text",
            {
              x: cx,
              y: cy - 10,
              textAnchor: "middle",
              className: isOn ? "fill-gray-700" : "fill-gray-400",
              fontWeight: 700,
              fontSize: 36,
              children: [
                localTemp,
                "°C"
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-center w-full", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleModeChange("Auto"),
          disabled: !isOn,
          className: `px-3 py-1 rounded-full text-xs font-semibold transition-colors ${currentMode === "Auto" && isOn ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`,
          children: "Auto"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleModeChange("Cool"),
          disabled: !isOn,
          className: `px-3 py-1 rounded-full text-xs font-semibold transition-colors ${currentMode === "Cool" && isOn ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`,
          children: "Cool"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleModeChange("Dry"),
          disabled: !isOn,
          className: `px-3 py-1 rounded-full text-xs font-semibold transition-colors ${currentMode === "Dry" && isOn ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`,
          children: "Dry"
        }
      )
    ] })
  ] });
};
const MusicPlayer = ({
  isPlaying = true,
  songTitle = "Love In the Dark",
  artist = "Adele",
  albumArt = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-4 max-h-48 overflow-hidden border border-gray-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsx(Music, { className: "w-5 h-5 text-gray-400" }),
      /* @__PURE__ */ jsx(Bluetooth, { className: "w-5 h-5 text-gray-400" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 mb-4", children: [
      /* @__PURE__ */ jsx(
        Image,
        {
          src: albumArt,
          alt: `${songTitle} by ${artist}`,
          className: "w-12 h-12 rounded-xl flex-shrink-0 object-cover"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsx(Text, { as: "p", size: "sm", weight: "medium", truncate: true, className: "text-gray-800 mb-1", children: songTitle }),
        /* @__PURE__ */ jsx(Text, { as: "p", size: "xs", variant: "muted", truncate: true, children: artist })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-4", children: [
      /* @__PURE__ */ jsx("button", { className: "p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors", children: /* @__PURE__ */ jsx(SkipBack, { className: "w-4 h-4 text-gray-600" }) }),
      /* @__PURE__ */ jsx("button", { className: "p-3 rounded-full bg-orange-400 hover:bg-orange-500 transition-colors", children: /* @__PURE__ */ jsx(Play, { className: "w-5 h-5 text-white" }) }),
      /* @__PURE__ */ jsx("button", { className: "p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors", children: /* @__PURE__ */ jsx(SkipForward, { className: "w-4 h-4 text-gray-600" }) })
    ] })
  ] });
};
const ControlButton = ({ icon, onClick }) => /* @__PURE__ */ jsx(
  "button",
  {
    onClick,
    className: "p-4 rounded-lg bg-orange-400 hover:bg-orange-500 transition-colors flex items-center justify-center",
    children: /* @__PURE__ */ jsx("div", { className: "text-white", children: icon })
  }
);
const ControlButtons = () => {
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
    /* @__PURE__ */ jsx(
      ControlButton,
      {
        icon: /* @__PURE__ */ jsx(Clock, { className: "w-6 h-6" }),
        onClick: () => console.log("Timer clicked")
      }
    ),
    /* @__PURE__ */ jsx(
      ControlButton,
      {
        icon: /* @__PURE__ */ jsx(Lock, { className: "w-6 h-6" }),
        onClick: () => console.log("Lock clicked")
      }
    ),
    /* @__PURE__ */ jsx(
      ControlButton,
      {
        icon: /* @__PURE__ */ jsx(Lightbulb, { className: "w-6 h-6" }),
        onClick: () => console.log("Light clicked")
      }
    )
  ] });
};
const DashboardLayout = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(Header, {}) }),
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(HorizontalNav, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row flex-1 p-4 sm:p-6 space-y-6 lg:space-y-0 lg:space-x-6 min-h-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col space-y-4 min-w-0", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsxs(
          Card,
          {
            className: "!flex !flex-col sm:!flex-row overflow-hidden shadow-xl rounded-3xl bg-white !gap-0 !p-0 border-0",
            style: { minHeight: "250px" },
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-full sm:w-2/5 h-48 sm:h-full", children: /* @__PURE__ */ jsx(
                Image,
                {
                  src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                  alt: "Event Name ABC",
                  className: "w-full h-full object-cover"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "w-full sm:w-3/5 p-4 sm:p-6 flex flex-col justify-center h-full relative", children: [
                /* @__PURE__ */ jsxs("div", { className: "absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center space-x-2 sm:space-x-3", children: [
                  /* @__PURE__ */ jsx("button", { className: "p-2 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200 bg-white shadow-sm", children: /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-sm", children: "←" }) }),
                  /* @__PURE__ */ jsx("button", { className: "p-2 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200 bg-white shadow-sm", children: /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-sm", children: "→" }) }),
                  /* @__PURE__ */ jsx(
                    Text,
                    {
                      as: "span",
                      size: "sm",
                      weight: "semibold",
                      className: "text-blue-600 ml-2",
                      children: "Today"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4 mt-6 sm:mt-8", children: [
                  /* @__PURE__ */ jsx(
                    Text,
                    {
                      as: "h3",
                      size: "xl",
                      weight: "bold",
                      className: "text-gray-800 leading-tight",
                      children: "Event Name ABC"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Text,
                    {
                      variant: "muted",
                      className: "leading-relaxed text-gray-600",
                      children: "Quis dolore ipsum laboris culpa nost Quis dolore ipsum laboris culpa nost Quis dolore ipsum laboris culpa nost Quis dolore ipsum laboris culpa nost Quis dolore laboris culpa nost."
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
                    Button,
                    {
                      onClick: () => console.log("Reserve clicked"),
                      className: "bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-medium transition-colors",
                      children: "Reserve"
                    }
                  ) })
                ] })
              ] })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsxs("div", { className: "relative rounded-3xl overflow-hidden h-48 sm:h-56 lg:h-64 shadow-xl", children: [
          /* @__PURE__ */ jsx(
            Image,
            {
              src: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368",
              alt: "Pyramids",
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsx(
            Text,
            {
              as: "p",
              size: "xs",
              className: "text-white/90 bg-black/50 px-2 py-1 rounded",
              children: "AD Space"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20 flex items-center justify-center", children: /* @__PURE__ */ jsx(
            Text,
            {
              as: "h3",
              size: "2xl",
              weight: "bold",
              className: "text-white drop-shadow-lg",
              children: "Immersive Experiences"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-80 flex flex-col space-y-4 min-h-0", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(ACWidget, {}) }),
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(
          MusicPlayer,
          {
            isPlaying: true,
            songTitle: "Love In the Dark",
            artist: "Adele",
            albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(ControlButtons, {}) })
      ] })
    ] })
  ] });
};
const HomePage = () => {
  return /* @__PURE__ */ jsx(DashboardLayout, {});
};
const HomePage$1 = withComponentProps(HomePage);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HomePage,
  default: HomePage$1
}, Symbol.toStringTag, { value: "Module" }));
const LightsController = () => {
  const [lights, setLights] = useState([
    {
      id: "reading",
      name: "Reading Light",
      schedule: "Every 7pm",
      brightness: 70,
      isOn: false
    },
    {
      id: "bathroom",
      name: "Bathroom Light",
      schedule: "Every 7pm",
      brightness: 80,
      isOn: false
    },
    {
      id: "balcony",
      name: "Balcony Light",
      schedule: "Every 7pm",
      brightness: 60,
      isOn: false
    },
    {
      id: "relax",
      name: "Relax Light Setting",
      schedule: "Every 7pm",
      brightness: 40,
      isOn: false
    },
    {
      id: "bright",
      name: "Bright Light Setting",
      schedule: "Every 7pm",
      brightness: 100,
      isOn: false
    },
    {
      id: "night",
      name: "Night Light Setting",
      schedule: "Every 7pm",
      brightness: 20,
      isOn: false
    }
  ]);
  const toggleLight = (id) => {
    setLights(
      lights.map((light) => light.id === id ? { ...light, isOn: !light.isOn } : light)
    );
  };
  const updateBrightness = (id, value) => {
    setLights(
      lights.map((light) => light.id === id ? { ...light, brightness: value } : light)
    );
  };
  return /* @__PURE__ */ jsxs(Card, { className: "p-6 bg-white shadow-lg rounded-2xl", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
      /* @__PURE__ */ jsx(Lightbulb, { className: "w-5 h-5 text-blue-600" }),
      /* @__PURE__ */ jsx(Text, { as: "h2", size: "lg", weight: "semibold", children: "Lights" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "space-y-6", children: lights.map((light) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx(Text, { weight: "medium", children: light.name }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-xs text-gray-500 space-x-2", children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", variant: "muted", children: light.schedule }),
            /* @__PURE__ */ jsx("button", { className: "text-blue-600 hover:text-blue-700", children: /* @__PURE__ */ jsx(Edit2, { className: "w-3 h-3" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              className: "sr-only peer",
              checked: light.isOn,
              onChange: () => toggleLight(light.id)
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4 text-gray-400" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "range",
            min: "0",
            max: "100",
            value: light.brightness,
            onChange: (e) => updateBrightness(light.id, parseInt(e.target.value)),
            className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
            style: {
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${light.brightness}%, #e5e7eb ${light.brightness}%, #e5e7eb 100%)`
            }
          }
        ),
        /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4 text-gray-400" })
      ] })
    ] }, light.id)) })
  ] });
};
const DEVICE_ID = "ebd03d60a10029efb4bryq";
const ACTuyaController = () => {
  const { acStatus, isLoadingStatus, sendCommand, isSendingCommand } = useTuyaIRCommand(DEVICE_ID);
  const debouncedSendTemp = useCallback(
    debounce((temp) => {
      sendCommand({
        category_id: 5,
        key_id: 0,
        key: "T" + temp.toString()
      });
    }, 500),
    [sendCommand]
  );
  const handleTempChange = (increment) => {
    if (!acStatus) return;
    const currentTemp = parseInt(acStatus.temp);
    const newTemp = increment ? currentTemp + 1 : currentTemp - 1;
    const limitedTemp = Math.min(Math.max(newTemp, 16), 30);
    debouncedSendTemp(limitedTemp);
  };
  if (isLoadingStatus) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-4", children: /* @__PURE__ */ jsxs("div", { className: "animate-pulse", children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-200 rounded w-1/2 mb-4" }),
      /* @__PURE__ */ jsx("div", { className: "h-16 bg-gray-200 rounded mb-4" }),
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-200 rounded" })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Air Conditioner" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `w-12 h-12 rounded-full flex items-center justify-center ${(acStatus == null ? void 0 : acStatus.powerOpen) ? "bg-green-50" : "bg-gray-50"}`,
          children: /* @__PURE__ */ jsx("span", { className: (acStatus == null ? void 0 : acStatus.powerOpen) ? "text-green-500" : "text-gray-400", children: /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-6 w-6",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M5 10a7 7 0 0114 0v4a7 7 0 11-14 0v-4z"
                }
              )
            }
          ) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-5xl font-bold mb-4", children: [
        (acStatus == null ? void 0 : acStatus.temp) || "--",
        "°C"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${isSendingCommand ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`,
            onClick: () => handleTempChange(false),
            disabled: isSendingCommand,
            children: "-"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${isSendingCommand ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`,
            onClick: () => handleTempChange(true),
            disabled: isSendingCommand,
            children: "+"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: `p-2 rounded ${(acStatus == null ? void 0 : acStatus.mode) === "0" ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600"} text-sm`,
          onClick: () => sendCommand({ category_id: 5, key_id: 1, key: "M0" }),
          children: /* @__PURE__ */ jsx("span", { children: "Auto" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: `p-2 rounded ${(acStatus == null ? void 0 : acStatus.mode) === "1" ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600"} text-sm`,
          onClick: () => sendCommand({ category_id: 5, key_id: 1, key: "M1" }),
          children: /* @__PURE__ */ jsx("span", { children: "Cool" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: `p-2 rounded ${(acStatus == null ? void 0 : acStatus.mode) === "2" ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600"} text-sm`,
          onClick: () => sendCommand({ category_id: 5, key_id: 1, key: "M2" }),
          children: /* @__PURE__ */ jsx("span", { children: "Dry" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: `p-2 rounded ${!(acStatus == null ? void 0 : acStatus.powerOpen) ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600"} text-sm`,
          onClick: () => sendCommand({ category_id: 5, key_id: 2, key: "PWR" }),
          children: /* @__PURE__ */ jsx("span", { children: "Power" })
        }
      )
    ] })
  ] });
};
const BluetoothController = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [devices, setDevices] = useState([
    { id: "1", name: "iPhone 123", isPaired: true },
    { id: "2", name: "iPhone 456", isPaired: true },
    { id: "3", name: "iPhone 789", isPaired: false },
    { id: "4", name: "iPhone XYZ", isPaired: false }
  ]);
  const togglePair = (id) => {
    setDevices(
      devices.map(
        (device) => device.id === id ? { ...device, isPaired: !device.isPaired } : device
      )
    );
  };
  return /* @__PURE__ */ jsxs(Card, { className: "p-4 bg-white shadow-lg rounded-2xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx(Icons.Bluetooth, { className: "w-5 h-5 text-blue-600" }),
        /* @__PURE__ */ jsx(Text, { as: "h2", size: "lg", weight: "semibold", children: "Bluetooth Setting" })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            className: "sr-only peer",
            checked: isEnabled,
            onChange: () => setIsEnabled(!isEnabled)
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })
      ] })
    ] }),
    isEnabled && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx(Text, { as: "h3", size: "sm", weight: "medium", className: "mb-3", children: "Paired Devices" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: devices.filter((d) => d.isPaired).map((device) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center justify-between p-3 bg-gray-50 rounded-xl",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                /* @__PURE__ */ jsx(Icons.Bluetooth, { className: "w-4 h-4 text-blue-600" }),
                /* @__PURE__ */ jsx(Text, { size: "sm", children: device.name })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => togglePair(device.id),
                  className: "p-1.5 hover:bg-gray-200 rounded-lg transition-colors",
                  children: /* @__PURE__ */ jsx(Icons.X, { className: "w-4 h-4 text-gray-500" })
                }
              )
            ]
          },
          device.id
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx(Text, { as: "h3", size: "sm", weight: "medium", children: "Available Devices" }),
          /* @__PURE__ */ jsx("button", { className: "p-1.5 hover:bg-gray-100 rounded-lg transition-colors", children: /* @__PURE__ */ jsx(Icons.RefreshCw, { className: "w-4 h-4 text-gray-500" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: devices.filter((d) => !d.isPaired).map((device) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center justify-between p-3 bg-gray-50 rounded-xl",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                /* @__PURE__ */ jsx(Icons.Bluetooth, { className: "w-4 h-4 text-gray-400" }),
                /* @__PURE__ */ jsx(Text, { size: "sm", children: device.name })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => togglePair(device.id),
                  className: "px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors",
                  children: "Pair"
                }
              )
            ]
          },
          device.id
        )) })
      ] })
    ] })
  ] });
};
const CurtainsController = () => {
  const [rooms, setRooms] = useState([
    { id: "foyer", name: "Foyer", isOpen: false, position: 0 },
    { id: "family", name: "Family Room", isOpen: false, position: 0 },
    { id: "room1", name: "Room 1", isOpen: false, position: 0 }
  ]);
  const [expandedRoom, setExpandedRoom] = useState("room1");
  const toggleRoom = (id) => {
    setExpandedRoom(expandedRoom === id ? null : id);
  };
  const updatePosition = (id, position) => {
    setRooms(
      rooms.map(
        (room) => room.id === id ? { ...room, position, isOpen: position > 0 } : room
      )
    );
  };
  const setAllCurtains = (position) => {
    setRooms(
      rooms.map((room) => ({
        ...room,
        position,
        isOpen: position > 0
      }))
    );
  };
  return /* @__PURE__ */ jsxs(Card, { className: "p-4 bg-white shadow-lg rounded-2xl", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
      /* @__PURE__ */ jsx(Icons.Blinds, { className: "w-5 h-5 text-blue-600" }),
      /* @__PURE__ */ jsx(Text, { as: "h2", size: "lg", weight: "semibold", children: "Curtains" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      rooms.map((room) => /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => toggleRoom(room.id),
            className: "w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors",
            children: [
              /* @__PURE__ */ jsx(Text, { weight: "medium", children: room.name }),
              /* @__PURE__ */ jsx(
                Icons.ChevronDown,
                {
                  className: `w-4 h-4 text-gray-500 transition-transform ${expandedRoom === room.id ? "rotate-180" : ""}`
                }
              )
            ]
          }
        ),
        expandedRoom === room.id && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-white border border-gray-100 rounded-xl space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "range",
                min: "0",
                max: "100",
                value: room.position,
                onChange: (e) => updatePosition(room.id, parseInt(e.target.value)),
                className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
                style: {
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${room.position}%, #e5e7eb ${room.position}%, #e5e7eb 100%)`
                }
              }
            ),
            /* @__PURE__ */ jsxs(Text, { size: "sm", className: "w-12 text-right", children: [
              room.position,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => updatePosition(room.id, 0),
                className: "px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors",
                children: "All Off"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => updatePosition(room.id, 100),
                className: "px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors",
                children: "All On"
              }
            ),
            /* @__PURE__ */ jsxs("button", { className: "flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors", children: [
              /* @__PURE__ */ jsx(Icons.Clock, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: "Schedule" })
            ] })
          ] })
        ] })
      ] }, room.id)),
      /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between space-x-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setAllCurtains(0),
            className: "flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors",
            children: "All Off"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setAllCurtains(100),
            className: "flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors",
            children: "All On"
          }
        ),
        /* @__PURE__ */ jsxs("button", { className: "flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors", children: [
          /* @__PURE__ */ jsx(Icons.Clock, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: "Schedule" })
        ] })
      ] }) })
    ] })
  ] });
};
const DoorController = () => {
  const [doors, setDoors] = useState([
    { id: "main", name: "Main Door", isLocked: true, hasSchedule: false },
    { id: "balcony", name: "Balcony Door", isLocked: true, hasSchedule: false }
  ]);
  const toggleLock = (id) => {
    setDoors(
      doors.map((door) => door.id === id ? { ...door, isLocked: !door.isLocked } : door)
    );
  };
  const toggleSchedule = (id) => {
    setDoors(
      doors.map(
        (door) => door.id === id ? { ...door, hasSchedule: !door.hasSchedule } : door
      )
    );
  };
  return /* @__PURE__ */ jsxs(Card, { className: "p-4 bg-white shadow-lg rounded-2xl", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
      /* @__PURE__ */ jsx(Icons.DoorClosed, { className: "w-5 h-5 text-blue-600" }),
      /* @__PURE__ */ jsx(Text, { as: "h2", size: "lg", weight: "semibold", children: "Door Lock Setting" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: doors.map((door) => /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-50 rounded-xl space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(Text, { weight: "medium", children: door.name }),
        /* @__PURE__ */ jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              className: "sr-only peer",
              checked: door.isLocked,
              onChange: () => toggleLock(door.id)
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-gray-200", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(Icons.Clock, { className: "w-4 h-4 text-gray-500" }),
          /* @__PURE__ */ jsx(Text, { size: "sm", variant: "muted", children: "Schedule Lock" })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              className: "sr-only peer",
              checked: door.hasSchedule,
              onChange: () => toggleSchedule(door.id)
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })
        ] })
      ] })
    ] }, door.id)) })
  ] });
};
const RoomPreferences = () => {
  const [services, setServices] = useState([
    {
      id: "dnd",
      name: "Do not disturb",
      icon: /* @__PURE__ */ jsx(Icons.Moon, { className: "w-6 h-6" }),
      isActive: false
    },
    {
      id: "cleaning",
      name: "Clean room",
      icon: /* @__PURE__ */ jsx(Icons.Brush, { className: "w-6 h-6" }),
      isActive: false
    },
    {
      id: "laundry",
      name: "Laundry Service",
      icon: /* @__PURE__ */ jsx(Icons.Shirt, { className: "w-6 h-6" }),
      isActive: false
    },
    {
      id: "pillows",
      name: "Extra Pillows",
      icon: /* @__PURE__ */ jsx(Icons.Bed, { className: "w-6 h-6" }),
      isActive: false
    },
    {
      id: "linens",
      name: "Extra Linens",
      icon: /* @__PURE__ */ jsx(Icons.Users, { className: "w-6 h-6" }),
      isActive: false
    },
    {
      id: "crib",
      name: "Crib Request",
      icon: /* @__PURE__ */ jsx(Icons.Baby, { className: "w-6 h-6" }),
      isActive: false
    }
  ]);
  const toggleService = (id) => {
    setServices(
      services.map(
        (service) => service.id === id ? { ...service, isActive: !service.isActive } : service
      )
    );
  };
  return /* @__PURE__ */ jsxs(Card, { className: "p-4 bg-white shadow-lg rounded-2xl", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
      /* @__PURE__ */ jsx(Icons.Settings, { className: "w-5 h-5 text-blue-600" }),
      /* @__PURE__ */ jsx(Text, { as: "h2", size: "lg", weight: "semibold", children: "Room Preference" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: services.map((service) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => toggleService(service.id),
        className: `p-4 rounded-xl flex flex-col items-center space-y-3 transition-all ${service.isActive ? "bg-blue-100 text-blue-600" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`,
        children: [
          service.icon,
          /* @__PURE__ */ jsx(Text, { size: "sm", weight: "medium", className: "text-center", children: service.name })
        ]
      },
      service.id
    )) })
  ] });
};
const AppsPanel = () => {
  const apps = [
    {
      id: "youtube",
      name: "YouTube",
      icon: "/apps/youtube.png",
      url: "https://youtube.com"
    },
    {
      id: "spotify",
      name: "Spotify",
      icon: "/apps/spotify.png",
      url: "https://spotify.com"
    },
    {
      id: "prime",
      name: "Prime Video",
      icon: "/apps/prime.png",
      url: "https://primevideo.com"
    },
    {
      id: "netflix",
      name: "Netflix",
      icon: "/apps/netflix.png",
      url: "https://netflix.com"
    },
    {
      id: "appletv",
      name: "Apple TV+",
      icon: "/apps/appletv.png",
      url: "https://tv.apple.com"
    }
  ];
  return /* @__PURE__ */ jsxs(Card, { className: "p-4 bg-white shadow-lg rounded-2xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx(Icons.LayoutGrid, { className: "w-5 h-5 text-blue-600" }),
        /* @__PURE__ */ jsx(Text, { as: "h2", size: "lg", weight: "semibold", children: "Apps" })
      ] }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "text-sm text-blue-600 hover:text-blue-700", children: "View All" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 sm:grid-cols-5 gap-4", children: apps.map((app) => /* @__PURE__ */ jsxs(
      "a",
      {
        href: app.url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-gray-50 transition-colors",
        children: [
          /* @__PURE__ */ jsx("img", { src: app.icon, alt: app.name, className: "w-12 h-12 rounded-xl" }),
          /* @__PURE__ */ jsx(Text, { size: "xs", weight: "medium", className: "text-center", children: app.name })
        ]
      },
      app.id
    )) })
  ] });
};
const TVController = () => {
  const [isOn, setIsOn] = useState(true);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [channel, setChannel] = useState(1);
  return /* @__PURE__ */ jsxs(Card, { className: "p-4 bg-white shadow-lg rounded-2xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx(Icons.Tv, { className: "w-5 h-5 text-blue-600" }),
        /* @__PURE__ */ jsx(Text, { as: "h2", size: "lg", weight: "semibold", children: "TV Control" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: async () => {
            try {
              await tuyaIRService.sendCommand(
                {
                  category_id: 2,
                  key_id: 0,
                  key: "Power"
                },
                "TV"
              );
              setIsOn(!isOn);
            } catch (error) {
              console.error("Failed to send TV command:", error);
            }
          },
          className: `p-2 rounded-full transition-colors ${isOn ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`,
          children: /* @__PURE__ */ jsx(Icons.Power, { className: "w-4 h-4" })
        }
      )
    ] }),
    isOn && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", weight: "medium", children: "Volume" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsMuted(!isMuted),
              className: `p-1.5 rounded-lg transition-colors ${isMuted ? "bg-gray-100 text-gray-400" : "text-gray-600 hover:bg-gray-100"}`,
              children: isMuted ? /* @__PURE__ */ jsx(Icons.VolumeX, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Icons.Volume2, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "range",
            min: "0",
            max: "100",
            value: isMuted ? 0 : volume,
            onChange: (e) => {
              setVolume(parseInt(e.target.value));
              setIsMuted(false);
            },
            className: "w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer",
            style: {
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${isMuted ? 0 : volume}%, #e5e7eb ${isMuted ? 0 : volume}%, #e5e7eb 100%)`
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setChannel(Math.max(1, channel - 1)),
            className: "p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors",
            children: /* @__PURE__ */ jsx(Icons.ChevronDown, { className: "w-4 h-4 mx-auto" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center bg-gray-100 rounded-lg", children: /* @__PURE__ */ jsxs(Text, { weight: "medium", children: [
          "CH ",
          channel
        ] }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setChannel(channel + 1),
            className: "p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors",
            children: /* @__PURE__ */ jsx(Icons.ChevronUp, { className: "w-4 h-4 mx-auto" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-2", children: [
        /* @__PURE__ */ jsx("button", { className: "p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors", children: /* @__PURE__ */ jsx(Text, { size: "sm", className: "text-center", children: "1" }) }),
        /* @__PURE__ */ jsx("button", { className: "p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors", children: /* @__PURE__ */ jsx(Text, { size: "sm", className: "text-center", children: "2" }) }),
        /* @__PURE__ */ jsx("button", { className: "p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors", children: /* @__PURE__ */ jsx(Text, { size: "sm", className: "text-center", children: "3" }) }),
        /* @__PURE__ */ jsx("button", { className: "p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors", children: /* @__PURE__ */ jsx(Text, { size: "sm", className: "text-center", children: "4" }) })
      ] })
    ] })
  ] });
};
const TuyaIRController = ({ categoryId = 5 }) => {
  const { mutate: sendCommand, isLoading } = useTuyaIRCommand();
  const handleCommand = (keyId, key) => {
    sendCommand({
      category_id: categoryId,
      key_id: keyId,
      key
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "IR Remote Control" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: /* @__PURE__ */ jsx(
      "button",
      {
        className: `px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`,
        onClick: () => handleCommand(0, "T26"),
        disabled: isLoading,
        children: "T26"
      }
    ) })
  ] });
};
const ControlsPage = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-50",
    children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx(HorizontalNav, {}), /* @__PURE__ */ jsx("div", {
      className: "container mx-auto px-4 py-4 min-h-[calc(100vh-8rem)] overflow-y-auto",
      children: /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/* @__PURE__ */ jsx(ACTuyaController, {}), /* @__PURE__ */ jsx(TVController, {})]
          }), /* @__PURE__ */ jsx(LightsController, {})]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/* @__PURE__ */ jsx(BluetoothController, {}), /* @__PURE__ */ jsx(DoorController, {})]
          }), /* @__PURE__ */ jsx(CurtainsController, {}), /* @__PURE__ */ jsx(TuyaIRController, {})]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx(RoomPreferences, {}), /* @__PURE__ */ jsx(AppsPanel, {})]
        })]
      })
    })]
  });
};
const ControlsPage$1 = withComponentProps(ControlsPage);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ControlsPage,
  default: ControlsPage$1
}, Symbol.toStringTag, { value: "Module" }));
const EntertainmentPage = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-100 p-8",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-4xl font-bold mb-4",
      children: "Entertainment"
    }), /* @__PURE__ */ jsx(NavigationMenu, {})]
  });
};
const EntertainmentPage$1 = withComponentProps(EntertainmentPage);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EntertainmentPage,
  default: EntertainmentPage$1
}, Symbol.toStringTag, { value: "Module" }));
const DiningPage = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-100 p-8",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-4xl font-bold mb-4",
      children: "Dining Services"
    }), /* @__PURE__ */ jsx(NavigationMenu, {})]
  });
};
const DiningPage$1 = withComponentProps(DiningPage);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DiningPage,
  default: DiningPage$1
}, Symbol.toStringTag, { value: "Module" }));
const ReservationsPage = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-100 p-8",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-4xl font-bold mb-4",
      children: "Reservations"
    }), /* @__PURE__ */ jsx(NavigationMenu, {})]
  });
};
const ReservationsPage$1 = withComponentProps(ReservationsPage);
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ReservationsPage,
  default: ReservationsPage$1
}, Symbol.toStringTag, { value: "Module" }));
const OperatorPage = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-100 p-8",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-4xl font-bold mb-4",
      children: "Contact Operator"
    }), /* @__PURE__ */ jsx(NavigationMenu, {})]
  });
};
const OperatorPage$1 = withComponentProps(OperatorPage);
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OperatorPage,
  default: OperatorPage$1
}, Symbol.toStringTag, { value: "Module" }));
const SignOutPage = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-100 p-8",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-4xl font-bold mb-4",
      children: "Sign Out"
    }), /* @__PURE__ */ jsx(NavigationMenu, {})]
  });
};
const SignOutPage$1 = withComponentProps(SignOutPage);
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SignOutPage,
  default: SignOutPage$1
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CnKTKsgV.js", "imports": ["/assets/chunk-KNED5TY2-DxLHhDWh.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-ZGoYI0-B.js", "imports": ["/assets/chunk-KNED5TY2-DxLHhDWh.js", "/assets/with-props-BUZBlRyP.js", "/assets/QueryClientProvider-RPsPiWQl.js"], "css": ["/assets/root-CEBUXWFi.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/guest/WelcomePage": { "id": "pages/guest/WelcomePage", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/WelcomePage-B6T9-maL.js", "imports": ["/assets/with-props-BUZBlRyP.js", "/assets/chunk-KNED5TY2-DxLHhDWh.js", "/assets/NavigationMenu-BSNztIo_.js", "/assets/text-Dr8JzClf.js", "/assets/image-DS9NyknJ.js", "/assets/icon-button-D3WrrEDa.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/guest/HomePage": { "id": "pages/guest/HomePage", "parentId": "root", "path": "home", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/HomePage-By1P1j-8.js", "imports": ["/assets/with-props-BUZBlRyP.js", "/assets/chunk-KNED5TY2-DxLHhDWh.js", "/assets/debounce-BeIMnGKF.js", "/assets/icon-button-D3WrrEDa.js", "/assets/text-Dr8JzClf.js", "/assets/image-DS9NyknJ.js", "/assets/QueryClientProvider-RPsPiWQl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/guest/ControlsPage": { "id": "pages/guest/ControlsPage", "parentId": "root", "path": "controls", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/ControlsPage-CCGHgZ_W.js", "imports": ["/assets/with-props-BUZBlRyP.js", "/assets/chunk-KNED5TY2-DxLHhDWh.js", "/assets/debounce-BeIMnGKF.js", "/assets/text-Dr8JzClf.js", "/assets/icon-button-D3WrrEDa.js", "/assets/QueryClientProvider-RPsPiWQl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/guest/EntertainmentPage": { "id": "pages/guest/EntertainmentPage", "parentId": "root", "path": "entertainment", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/EntertainmentPage-BAaSELcE.js", "imports": ["/assets/with-props-BUZBlRyP.js", "/assets/chunk-KNED5TY2-DxLHhDWh.js", "/assets/NavigationMenu-BSNztIo_.js", "/assets/icon-button-D3WrrEDa.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/guest/DiningPage": { "id": "pages/guest/DiningPage", "parentId": "root", "path": "dining", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/DiningPage-CFPl1hoo.js", "imports": ["/assets/with-props-BUZBlRyP.js", "/assets/chunk-KNED5TY2-DxLHhDWh.js", "/assets/NavigationMenu-BSNztIo_.js", "/assets/icon-button-D3WrrEDa.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/guest/ReservationsPage": { "id": "pages/guest/ReservationsPage", "parentId": "root", "path": "reservations", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/ReservationsPage-h01fiopK.js", "imports": ["/assets/with-props-BUZBlRyP.js", "/assets/chunk-KNED5TY2-DxLHhDWh.js", "/assets/NavigationMenu-BSNztIo_.js", "/assets/icon-button-D3WrrEDa.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/guest/OperatorPage": { "id": "pages/guest/OperatorPage", "parentId": "root", "path": "operator", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/OperatorPage-BCSxiSiH.js", "imports": ["/assets/with-props-BUZBlRyP.js", "/assets/chunk-KNED5TY2-DxLHhDWh.js", "/assets/NavigationMenu-BSNztIo_.js", "/assets/icon-button-D3WrrEDa.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/guest/SignOutPage": { "id": "pages/guest/SignOutPage", "parentId": "root", "path": "signout", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/SignOutPage-DpE-qHnb.js", "imports": ["/assets/with-props-BUZBlRyP.js", "/assets/chunk-KNED5TY2-DxLHhDWh.js", "/assets/NavigationMenu-BSNztIo_.js", "/assets/icon-button-D3WrrEDa.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-939774bb.js", "version": "939774bb", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "pages/guest/WelcomePage": {
    id: "pages/guest/WelcomePage",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "pages/guest/HomePage": {
    id: "pages/guest/HomePage",
    parentId: "root",
    path: "home",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "pages/guest/ControlsPage": {
    id: "pages/guest/ControlsPage",
    parentId: "root",
    path: "controls",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "pages/guest/EntertainmentPage": {
    id: "pages/guest/EntertainmentPage",
    parentId: "root",
    path: "entertainment",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "pages/guest/DiningPage": {
    id: "pages/guest/DiningPage",
    parentId: "root",
    path: "dining",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "pages/guest/ReservationsPage": {
    id: "pages/guest/ReservationsPage",
    parentId: "root",
    path: "reservations",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "pages/guest/OperatorPage": {
    id: "pages/guest/OperatorPage",
    parentId: "root",
    path: "operator",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "pages/guest/SignOutPage": {
    id: "pages/guest/SignOutPage",
    parentId: "root",
    path: "signout",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
