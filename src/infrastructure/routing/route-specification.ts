import { LazyExoticComponent } from "react";

export interface RouteSpecification {
    path: string;
    name: string;
    childRoutes?: RouteSpecification[];
    component?: LazyExoticComponent<() => React.JSX.Element>;
}
