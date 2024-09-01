import { LazyExoticComponent } from "react";

export interface RouteSpecification {
    path: string;
    name: string;
    childRoutes?: RouteSpecification[];
    classNames?: string;
    component?: LazyExoticComponent<() => React.JSX.Element>;
    requiresAdmin?: boolean;
}
