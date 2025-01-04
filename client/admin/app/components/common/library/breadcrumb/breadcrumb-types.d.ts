import type { ReactNode } from "react";

export interface BreadcrumbsStyleTypes {
  defaultProps: {
    separator: ReactNode;
    fullWidth: boolean;
  };
  styles: {
    base: {
      root: {
        initial: {
          width: string;
        };
        fullWidth: {
          display: string;
          width: string;
        };
      };
      list: {
        display: string;
        flexWrap: string;
        alignItems: string;
        width: string;
        bg: string;
        bgOpacity: string;
        py: string;
        px: string;
        borderRadius: string;
      };
      item: {
        initial: {
          display: string;
          alignItems: string;
          color: string;
          fontSmoothing: string;
          fontFamily: string;
          fontSize: string;
          fontWeight: string;
          lineHeight: string;
          cursor: string;
          transition: string;
          hover: string;
        };
        disabled: {
          pointerEvents: string;
        };
      };
      separator: {
        color: string;
        fontSize: string;
        fontSmoothing: string;
        fontFamily: string;
        fontWeight: string;
        lineHeight: string;
        px: string;
        pointerEvents: string;
        userSelcet: string;
      };
    };
  };
}
