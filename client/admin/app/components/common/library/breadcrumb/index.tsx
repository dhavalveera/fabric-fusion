import { Children, forwardRef, isValidElement, type ComponentProps, type ReactElement, type ReactNode } from "react";

// Helpers
import { clsx } from "~/helpers/clsx";

// Utils
import { objectToString } from "~/utils/object-to-string";

// Default Value
import { breadcrumbsDefaultValue } from "./default-value";

interface BreadcrumbItemProps {
  disabled?: boolean;
}

export interface BreadcrumbProps extends ComponentProps<"ol"> {
  children: ReactElement<BreadcrumbItemProps>[];
  fullWidth?: boolean;
  separator?: ReactNode;
}

const CustomBreadcrumb = forwardRef<HTMLOListElement, BreadcrumbProps>((props, ref) => {
  let { className = "", children, fullWidth, separator, ...rest } = props;

  // Step 1. Init
  const {
    defaultProps,
    styles: { base },
  } = breadcrumbsDefaultValue;

  // Step 2. Set Default Props
  separator = separator ?? defaultProps.separator;
  fullWidth = fullWidth ?? defaultProps.fullWidth;

  // Step 3. Set Styles
  const breadcrumbsRootClass = clsx([fullWidth ? objectToString(base.root.fullWidth) : objectToString(base.root.initial)]);
  const breadcrumbsListClasses = clsx([objectToString(base.list), className]);
  const breadcrumbsItemClasses = clsx([objectToString(base.item.initial)]);
  const breadcrumbsSeparatorClasses = clsx([objectToString(base.separator)]);

  return (
    <nav aria-label="breadcrumb" className={breadcrumbsRootClass}>
      <ol {...rest} ref={ref} className={breadcrumbsListClasses}>
        {Children.map(children, (child, index) => {
          if (isValidElement(child)) {
            return (
              <li className={clsx([breadcrumbsItemClasses, child.props.disabled ? objectToString(base.item.disabled) : ""])} key={index}>
                {child}

                {index !== Children.count(children) - 1 ? <span className={breadcrumbsSeparatorClasses}>{separator}</span> : null}
              </li>
            );
          }
          return null;
        })}
      </ol>
    </nav>
  );
});

CustomBreadcrumb.displayName = "Breadcrumb";

export default CustomBreadcrumb;
