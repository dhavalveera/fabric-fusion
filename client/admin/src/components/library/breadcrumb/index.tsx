import { forwardRef } from "react";

// react router
import { NavLink } from "react-router";

// utils
import { cn } from "@/utils/cn";

// types
import { BreadcrumbProps } from "@/types";

const Breadcrumb = forwardRef<HTMLOListElement, BreadcrumbProps>((props, ref) => {
  const { className = "", secondLabel, secondLabelLinkHref, thirdLabel, ...rest } = props;

  return (
    <ol className={cn("flex w-fit overflow-hidden rounded border border-gray-300 bg-white text-sm text-gray-700", className)} aria-label="Breadcrumb" ref={ref} {...rest} role="list">
      <li role="listitem">
        <NavLink to="/dashboard" role="link" className="font-della-respira block h-10 bg-gray-100 px-4 leading-10 font-bold transition-colors hover:text-gray-900">
          Home
        </NavLink>
      </li>
      <li role="listitem" className="relative flex items-center">
        <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180" />

        {secondLabelLinkHref ? (
          <NavLink
            to={secondLabelLinkHref as string}
            role="link"
            className={cn("font-della-respira block h-10 pr-4 pl-6 leading-10 transition-colors hover:text-gray-900", thirdLabel ? "bg-gray-200" : "")}
          >
            {secondLabel}
          </NavLink>
        ) : (
          <span className={cn("font-della-respira block h-10 pr-4 pl-6 leading-10 transition-colors hover:text-gray-900", thirdLabel ? "bg-gray-200" : "")}>{secondLabel}</span>
        )}
      </li>
      {thirdLabel ? (
        <li role="listitem" className="relative flex items-center">
          <span className={cn("absolute inset-y-0 -start-px h-10 w-4 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180", thirdLabel ? "bg-gray-200" : "")} />

          <span className="font-della-respira block h-10 pr-4 pl-6 leading-10 transition-colors hover:text-gray-900">{thirdLabel}</span>
        </li>
      ) : null}
    </ol>
  );
});

export default Breadcrumb;
