import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNameMap: { [key: string]: string } = {
    blog: "Blog",
    categories: "Calculator Categories",
    about: "About Us",
    contact: "Contact",
    faq: "FAQ",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    "blog-generator": "AI Blog Generator",
  };

  if (pathnames.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="container mx-auto px-4 py-4"
    >
      <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link
            to="/"
            className="flex items-center hover:text-primary transition-colors"
            itemProp="item"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only" itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const breadcrumbName = breadcrumbNameMap[name] || name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <li key={name} className="flex items-center gap-2" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <ChevronRight className="h-4 w-4" />
              {isLast ? (
                <span className="text-foreground font-medium" itemProp="name" aria-current="page">
                  {breadcrumbName}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="hover:text-primary transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{breadcrumbName}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 2)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};