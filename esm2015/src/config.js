/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EmptyOutletComponent } from './components/empty_outlet';
import { PRIMARY_OUTLET } from './shared';
/** @typedef {?} */
var Routes;
export { Routes };
/** @typedef {?} */
var UrlMatchResult;
export { UrlMatchResult };
/** @typedef {?} */
var UrlMatcher;
export { UrlMatcher };
/** @typedef {?} */
var Data;
export { Data };
/** @typedef {?} */
var ResolveData;
export { ResolveData };
/** @typedef {?} */
var LoadChildrenCallback;
export { LoadChildrenCallback };
/** @typedef {?} */
var LoadChildren;
export { LoadChildren };
/** @typedef {?} */
var QueryParamsHandling;
export { QueryParamsHandling };
/** @typedef {?} */
var RunGuardsAndResolvers;
export { RunGuardsAndResolvers };
/**
 * See `Routes` for more details.
 *
 * \@publicApi
 * @record
 */
export function Route() { }
/** @type {?|undefined} */
Route.prototype.path;
/** @type {?|undefined} */
Route.prototype.pathMatch;
/** @type {?|undefined} */
Route.prototype.matcher;
/** @type {?|undefined} */
Route.prototype.component;
/** @type {?|undefined} */
Route.prototype.redirectTo;
/** @type {?|undefined} */
Route.prototype.outlet;
/** @type {?|undefined} */
Route.prototype.canActivate;
/** @type {?|undefined} */
Route.prototype.canActivateChild;
/** @type {?|undefined} */
Route.prototype.canDeactivate;
/** @type {?|undefined} */
Route.prototype.canLoad;
/** @type {?|undefined} */
Route.prototype.data;
/** @type {?|undefined} */
Route.prototype.resolve;
/** @type {?|undefined} */
Route.prototype.children;
/** @type {?|undefined} */
Route.prototype.loadChildren;
/** @type {?|undefined} */
Route.prototype.runGuardsAndResolvers;
/**
 * Filled for routes with `loadChildren` once the module has been loaded
 * \@internal
 * @type {?|undefined}
 */
Route.prototype._loadedConfig;
export class LoadedRouterConfig {
    /**
     * @param {?} routes
     * @param {?} module
     */
    constructor(routes, module) {
        this.routes = routes;
        this.module = module;
    }
}
if (false) {
    /** @type {?} */
    LoadedRouterConfig.prototype.routes;
    /** @type {?} */
    LoadedRouterConfig.prototype.module;
}
/**
 * @param {?} config
 * @param {?=} parentPath
 * @return {?}
 */
export function validateConfig(config, parentPath = '') {
    // forEach doesn't iterate undefined values
    for (let i = 0; i < config.length; i++) {
        /** @type {?} */
        const route = config[i];
        /** @type {?} */
        const fullPath = getFullPath(parentPath, route);
        validateNode(route, fullPath);
    }
}
/**
 * @param {?} route
 * @param {?} fullPath
 * @return {?}
 */
function validateNode(route, fullPath) {
    if (!route) {
        throw new Error(`
      Invalid configuration of route '${fullPath}': Encountered undefined route.
      The reason might be an extra comma.

      Example:
      const routes: Routes = [
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        { path: 'dashboard',  component: DashboardComponent },, << two commas
        { path: 'detail/:id', component: HeroDetailComponent }
      ];
    `);
    }
    if (Array.isArray(route)) {
        throw new Error(`Invalid configuration of route '${fullPath}': Array cannot be specified`);
    }
    if (!route.component && !route.children && !route.loadChildren &&
        (route.outlet && route.outlet !== PRIMARY_OUTLET)) {
        throw new Error(`Invalid configuration of route '${fullPath}': a componentless route without children or loadChildren cannot have a named outlet set`);
    }
    if (route.redirectTo && route.children) {
        throw new Error(`Invalid configuration of route '${fullPath}': redirectTo and children cannot be used together`);
    }
    if (route.redirectTo && route.loadChildren) {
        throw new Error(`Invalid configuration of route '${fullPath}': redirectTo and loadChildren cannot be used together`);
    }
    if (route.children && route.loadChildren) {
        throw new Error(`Invalid configuration of route '${fullPath}': children and loadChildren cannot be used together`);
    }
    if (route.redirectTo && route.component) {
        throw new Error(`Invalid configuration of route '${fullPath}': redirectTo and component cannot be used together`);
    }
    if (route.path && route.matcher) {
        throw new Error(`Invalid configuration of route '${fullPath}': path and matcher cannot be used together`);
    }
    if (route.redirectTo === void 0 && !route.component && !route.children && !route.loadChildren) {
        throw new Error(`Invalid configuration of route '${fullPath}'. One of the following must be provided: component, redirectTo, children or loadChildren`);
    }
    if (route.path === void 0 && route.matcher === void 0) {
        throw new Error(`Invalid configuration of route '${fullPath}': routes must have either a path or a matcher specified`);
    }
    if (typeof route.path === 'string' && route.path.charAt(0) === '/') {
        throw new Error(`Invalid configuration of route '${fullPath}': path cannot start with a slash`);
    }
    if (route.path === '' && route.redirectTo !== void 0 && route.pathMatch === void 0) {
        /** @type {?} */
        const exp = `The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`;
        throw new Error(`Invalid configuration of route '{path: "${fullPath}", redirectTo: "${route.redirectTo}"}': please provide 'pathMatch'. ${exp}`);
    }
    if (route.pathMatch !== void 0 && route.pathMatch !== 'full' && route.pathMatch !== 'prefix') {
        throw new Error(`Invalid configuration of route '${fullPath}': pathMatch can only be set to 'prefix' or 'full'`);
    }
    if (route.children) {
        validateConfig(route.children, fullPath);
    }
}
/**
 * @param {?} parentPath
 * @param {?} currentRoute
 * @return {?}
 */
function getFullPath(parentPath, currentRoute) {
    if (!currentRoute) {
        return parentPath;
    }
    if (!parentPath && !currentRoute.path) {
        return '';
    }
    else if (parentPath && !currentRoute.path) {
        return `${parentPath}/`;
    }
    else if (!parentPath && currentRoute.path) {
        return currentRoute.path;
    }
    else {
        return `${parentPath}/${currentRoute.path}`;
    }
}
/**
 * Makes a copy of the config and adds any default required properties.
 * @param {?} r
 * @return {?}
 */
export function standardizeConfig(r) {
    /** @type {?} */
    const children = r.children && r.children.map(standardizeConfig);
    /** @type {?} */
    const c = children ? Object.assign({}, r, { children }) : Object.assign({}, r);
    if (!c.component && (children || c.loadChildren) && (c.outlet && c.outlet !== PRIMARY_OUTLET)) {
        c.component = EmptyOutletComponent;
    }
    return c;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLyIsInNvdXJjZXMiOlsicGFja2FnZXMvcm91dGVyL3NyYy9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFVQSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sVUFBVSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9ZeEMsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7SUFDN0IsWUFBbUIsTUFBZSxFQUFTLE1BQXdCO1FBQWhELFdBQU0sR0FBTixNQUFNLENBQVM7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtLQUFJO0NBQ3hFOzs7Ozs7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLE1BQWMsRUFBRSxhQUFxQixFQUFFOztJQUVwRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7UUFDdEMsTUFBTSxLQUFLLEdBQVUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUMvQixNQUFNLFFBQVEsR0FBVyxXQUFXLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hELFlBQVksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDL0I7Q0FDRjs7Ozs7O0FBRUQsU0FBUyxZQUFZLENBQUMsS0FBWSxFQUFFLFFBQWdCO0lBQ2xELElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixNQUFNLElBQUksS0FBSyxDQUFDO3dDQUNvQixRQUFROzs7Ozs7Ozs7S0FTM0MsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDeEIsTUFBTSxJQUFJLEtBQUss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Q0FBQyxVQUFrQixFQUFFLFlBQW1CO0lBQzFELElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDakIsT0FBTyxVQUFVLENBQUM7S0FDbkI7SUFDRCxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRTtRQUNyQyxPQUFPLEVBQUUsQ0FBQztLQUNYO1NBQU0sSUFBSSxVQUFVLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO1FBQzNDLE9BQU8sR0FBRyxVQUFVLEdBQUcsQ0FBQztLQUN6QjtTQUFNLElBQUksQ0FBQyxVQUFVLElBQUksWUFBWSxDQUFDLElBQUksRUFBRTtRQUMzQyxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUM7S0FDMUI7U0FBTTtRQUNMLE9BQU8sR0FBRyxVQUFVLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQzdDO0NBQ0Y7Ozs7OztBQUtELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxDQUFROztJQUN4QyxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7O0lBQ2pFLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLG1CQUFLLENBQUMsSUFBRSxRQUFRLElBQUUsQ0FBQyxtQkFBSyxDQUFDLENBQUMsQ0FBQztJQUMvQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssY0FBYyxDQUFDLEVBQUU7UUFDN0YsQ0FBQyxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztLQUNwQztJQUNELE9BQU8sQ0FBQyxDQUFDO0NBQ1YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGVGYWN0b3J5LCBOZ01vZHVsZVJlZiwgVHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtFbXB0eU91dGxldENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2VtcHR5X291dGxldCc7XG5pbXBvcnQge1BSSU1BUllfT1VUTEVUfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQge1VybFNlZ21lbnQsIFVybFNlZ21lbnRHcm91cH0gZnJvbSAnLi91cmxfdHJlZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyByb3V0ZXIgY29uZmlndXJhdGlvbi5cbiAqXG4gKiBgUm91dGVzYCBpcyBhbiBhcnJheSBvZiByb3V0ZSBjb25maWd1cmF0aW9ucy4gRWFjaCBvbmUgaGFzIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqXG4gKiAtIGBwYXRoYCBpcyBhIHN0cmluZyB0aGF0IHVzZXMgdGhlIHJvdXRlIG1hdGNoZXIgRFNMLlxuICogLSBgcGF0aE1hdGNoYCBpcyBhIHN0cmluZyB0aGF0IHNwZWNpZmllcyB0aGUgbWF0Y2hpbmcgc3RyYXRlZ3kuXG4gKiAtIGBtYXRjaGVyYCBkZWZpbmVzIGEgY3VzdG9tIHN0cmF0ZWd5IGZvciBwYXRoIG1hdGNoaW5nIGFuZCBzdXBlcnNlZGVzIGBwYXRoYCBhbmQgYHBhdGhNYXRjaGAuXG4gKiAtIGBjb21wb25lbnRgIGlzIGEgY29tcG9uZW50IHR5cGUuXG4gKiAtIGByZWRpcmVjdFRvYCBpcyB0aGUgdXJsIGZyYWdtZW50IHdoaWNoIHdpbGwgcmVwbGFjZSB0aGUgY3VycmVudCBtYXRjaGVkIHNlZ21lbnQuXG4gKiAtIGBvdXRsZXRgIGlzIHRoZSBuYW1lIG9mIHRoZSBvdXRsZXQgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgcGxhY2VkIGludG8uXG4gKiAtIGBjYW5BY3RpdmF0ZWAgaXMgYW4gYXJyYXkgb2YgREkgdG9rZW5zIHVzZWQgdG8gbG9vayB1cCBDYW5BY3RpdmF0ZSBoYW5kbGVycy4gU2VlXG4gKiAgIGBDYW5BY3RpdmF0ZWAgZm9yIG1vcmUgaW5mby5cbiAqIC0gYGNhbkFjdGl2YXRlQ2hpbGRgIGlzIGFuIGFycmF5IG9mIERJIHRva2VucyB1c2VkIHRvIGxvb2sgdXAgQ2FuQWN0aXZhdGVDaGlsZCBoYW5kbGVycy4gU2VlXG4gKiAgIGBDYW5BY3RpdmF0ZUNoaWxkYCBmb3IgbW9yZSBpbmZvLlxuICogLSBgY2FuRGVhY3RpdmF0ZWAgaXMgYW4gYXJyYXkgb2YgREkgdG9rZW5zIHVzZWQgdG8gbG9vayB1cCBDYW5EZWFjdGl2YXRlIGhhbmRsZXJzLiBTZWVcbiAqICAgYENhbkRlYWN0aXZhdGVgIGZvciBtb3JlIGluZm8uXG4gKiAtIGBjYW5Mb2FkYCBpcyBhbiBhcnJheSBvZiBESSB0b2tlbnMgdXNlZCB0byBsb29rIHVwIENhbkxvYWQgaGFuZGxlcnMuIFNlZVxuICogICBgQ2FuTG9hZGAgZm9yIG1vcmUgaW5mby5cbiAqIC0gYGRhdGFgIGlzIGFkZGl0aW9uYWwgZGF0YSBwcm92aWRlZCB0byB0aGUgY29tcG9uZW50IHZpYSBgQWN0aXZhdGVkUm91dGVgLlxuICogLSBgcmVzb2x2ZWAgaXMgYSBtYXAgb2YgREkgdG9rZW5zIHVzZWQgdG8gbG9vayB1cCBkYXRhIHJlc29sdmVycy4gU2VlIGBSZXNvbHZlYCBmb3IgbW9yZVxuICogICBpbmZvLlxuICogLSBgcnVuR3VhcmRzQW5kUmVzb2x2ZXJzYCBkZWZpbmVzIHdoZW4gZ3VhcmRzIGFuZCByZXNvbHZlcnMgd2lsbCBiZSBydW4uIEJ5IGRlZmF1bHQgdGhleSBydW4gb25seVxuICogICAgd2hlbiB0aGUgbWF0cml4IHBhcmFtZXRlcnMgb2YgdGhlIHJvdXRlIGNoYW5nZS4gT3B0aW9ucyBpbmNsdWRlOlxuICogICAgLSBgcGFyYW1zQ2hhbmdlYCAoZGVmYXVsdCkgLSBSdW4gZ3VhcmRzIGFuZCByZXNvbHZlcnMgd2hlbiBwYXRoIG9yIG1hdHJpeCBwYXJhbXMgY2hhbmdlLiBUaGlzXG4gKiAgICAgIG1vZGUgaWdub3JlcyBxdWVyeSBwYXJhbSBjaGFuZ2VzLlxuICogICAgLSBgcGFyYW1zT3JRdWVyeVBhcmFtc0NoYW5nZWAgLSBHdWFyZHMgYW5kIHJlc29sdmVycyB3aWxsIHJ1biB3aGVuIGFueSBwYXJhbWV0ZXJzIGNoYW5nZS4gVGhpc1xuICogICAgICBpbmNsdWRlcyBwYXRoLCBtYXRyaXgsIGFuZCBxdWVyeSBwYXJhbXMuXG4gKiAgICAtIGBwYXRoUGFyYW1zQ2hhbmdlYCBSdW4gZ3VhcmRzIGFuZCByZXNvbHZlcnMgcGF0aCBvciBhbnkgcGF0aCBwYXJhbXMgY2hhbmdlLiBUaGlzIG1vZGUgaXNcbiAqICAgICAgdXNlZnVsIGlmIHlvdSB3YW50IHRvIGlnbm9yZSBjaGFuZ2VzIHRvIGFsbCBvcHRpb25hbCBwYXJhbWV0ZXJzIHN1Y2ggYXMgcXVlcnkgKmFuZCogbWF0cml4XG4gKiAgICAgIHBhcmFtcy5cbiAqICAgIC0gYGFsd2F5c2AgLSBSdW4gZ3VhcmRzIGFuZCByZXNvbHZlcnMgb24gZXZlcnkgbmF2aWdhdGlvbi5cbiAqIC0gYGNoaWxkcmVuYCBpcyBhbiBhcnJheSBvZiBjaGlsZCByb3V0ZSBkZWZpbml0aW9ucy5cbiAqIC0gYGxvYWRDaGlsZHJlbmAgaXMgYSByZWZlcmVuY2UgdG8gbGF6eSBsb2FkZWQgY2hpbGQgcm91dGVzLiBTZWUgYExvYWRDaGlsZHJlbmAgZm9yIG1vcmVcbiAqICAgaW5mby5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIFNpbXBsZSBDb25maWd1cmF0aW9uXG4gKlxuICogYGBgXG4gKiBbe1xuICogICBwYXRoOiAndGVhbS86aWQnLFxuICAqICBjb21wb25lbnQ6IFRlYW0sXG4gKiAgIGNoaWxkcmVuOiBbe1xuICogICAgIHBhdGg6ICd1c2VyLzpuYW1lJyxcbiAqICAgICBjb21wb25lbnQ6IFVzZXJcbiAqICAgfV1cbiAqIH1dXG4gKiBgYGBcbiAqXG4gKiBXaGVuIG5hdmlnYXRpbmcgdG8gYC90ZWFtLzExL3VzZXIvYm9iYCwgdGhlIHJvdXRlciB3aWxsIGNyZWF0ZSB0aGUgdGVhbSBjb21wb25lbnQgd2l0aCB0aGUgdXNlclxuICogY29tcG9uZW50IGluIGl0LlxuICpcbiAqICMjIyBNdWx0aXBsZSBPdXRsZXRzXG4gKlxuICogYGBgXG4gKiBbe1xuICogICBwYXRoOiAndGVhbS86aWQnLFxuICogICBjb21wb25lbnQ6IFRlYW1cbiAqIH0sIHtcbiAqICAgcGF0aDogJ2NoYXQvOnVzZXInLFxuICogICBjb21wb25lbnQ6IENoYXRcbiAqICAgb3V0bGV0OiAnYXV4J1xuICogfV1cbiAqIGBgYFxuICpcbiAqIFdoZW4gbmF2aWdhdGluZyB0byBgL3RlYW0vMTEoYXV4OmNoYXQvamltKWAsIHRoZSByb3V0ZXIgd2lsbCBjcmVhdGUgdGhlIHRlYW0gY29tcG9uZW50IG5leHQgdG9cbiAqIHRoZSBjaGF0IGNvbXBvbmVudC4gVGhlIGNoYXQgY29tcG9uZW50IHdpbGwgYmUgcGxhY2VkIGludG8gdGhlIGF1eCBvdXRsZXQuXG4gKlxuICogIyMjIFdpbGQgQ2FyZHNcbiAqXG4gKiBgYGBcbiAqIFt7XG4gKiAgIHBhdGg6ICcqKicsXG4gKiAgIGNvbXBvbmVudDogU2lua1xuICogfV1cbiAqIGBgYFxuICpcbiAqIFJlZ2FyZGxlc3Mgb2Ygd2hlcmUgeW91IG5hdmlnYXRlIHRvLCB0aGUgcm91dGVyIHdpbGwgaW5zdGFudGlhdGUgdGhlIHNpbmsgY29tcG9uZW50LlxuICpcbiAqICMjIyBSZWRpcmVjdHNcbiAqXG4gKiBgYGBcbiAqIFt7XG4gKiAgIHBhdGg6ICd0ZWFtLzppZCcsXG4gKiAgIGNvbXBvbmVudDogVGVhbSxcbiAqICAgY2hpbGRyZW46IFt7XG4gKiAgICAgcGF0aDogJ2xlZ2FjeS91c2VyLzpuYW1lJyxcbiAqICAgICByZWRpcmVjdFRvOiAndXNlci86bmFtZSdcbiAqICAgfSwge1xuICogICAgIHBhdGg6ICd1c2VyLzpuYW1lJyxcbiAqICAgICBjb21wb25lbnQ6IFVzZXJcbiAqICAgfV1cbiAqIH1dXG4gKiBgYGBcbiAqXG4gKiBXaGVuIG5hdmlnYXRpbmcgdG8gJy90ZWFtLzExL2xlZ2FjeS91c2VyL2ppbScsIHRoZSByb3V0ZXIgd2lsbCBjaGFuZ2UgdGhlIHVybCB0b1xuICogJy90ZWFtLzExL3VzZXIvamltJywgYW5kIHRoZW4gd2lsbCBpbnN0YW50aWF0ZSB0aGUgdGVhbSBjb21wb25lbnQgd2l0aCB0aGUgdXNlciBjb21wb25lbnRcbiAqIGluIGl0LlxuICpcbiAqIElmIHRoZSBgcmVkaXJlY3RUb2AgdmFsdWUgc3RhcnRzIHdpdGggYSAnLycsIHRoZW4gaXQgaXMgYW4gYWJzb2x1dGUgcmVkaXJlY3QuIEUuZy4sIGlmIGluIHRoZVxuICogZXhhbXBsZSBhYm92ZSB3ZSBjaGFuZ2UgdGhlIGByZWRpcmVjdFRvYCB0byBgL3VzZXIvOm5hbWVgLCB0aGUgcmVzdWx0IHVybCB3aWxsIGJlICcvdXNlci9qaW0nLlxuICpcbiAqICMjIyBFbXB0eSBQYXRoXG4gKlxuICogRW1wdHktcGF0aCByb3V0ZSBjb25maWd1cmF0aW9ucyBjYW4gYmUgdXNlZCB0byBpbnN0YW50aWF0ZSBjb21wb25lbnRzIHRoYXQgZG8gbm90ICdjb25zdW1lJ1xuICogYW55IHVybCBzZWdtZW50cy4gTGV0J3MgbG9vayBhdCB0aGUgZm9sbG93aW5nIGNvbmZpZ3VyYXRpb246XG4gKlxuICogYGBgXG4gKiBbe1xuICogICBwYXRoOiAndGVhbS86aWQnLFxuICogICBjb21wb25lbnQ6IFRlYW0sXG4gKiAgIGNoaWxkcmVuOiBbe1xuICogICAgIHBhdGg6ICcnLFxuICogICAgIGNvbXBvbmVudDogQWxsVXNlcnNcbiAqICAgfSwge1xuICogICAgIHBhdGg6ICd1c2VyLzpuYW1lJyxcbiAqICAgICBjb21wb25lbnQ6IFVzZXJcbiAqICAgfV1cbiAqIH1dXG4gKiBgYGBcbiAqXG4gKiBXaGVuIG5hdmlnYXRpbmcgdG8gYC90ZWFtLzExYCwgdGhlIHJvdXRlciB3aWxsIGluc3RhbnRpYXRlIHRoZSBBbGxVc2VycyBjb21wb25lbnQuXG4gKlxuICogRW1wdHktcGF0aCByb3V0ZXMgY2FuIGhhdmUgY2hpbGRyZW4uXG4gKlxuICogYGBgXG4gKiBbe1xuICogICBwYXRoOiAndGVhbS86aWQnLFxuICogICBjb21wb25lbnQ6IFRlYW0sXG4gKiAgIGNoaWxkcmVuOiBbe1xuICogICAgIHBhdGg6ICcnLFxuICogICAgIGNvbXBvbmVudDogV3JhcHBlckNtcCxcbiAqICAgICBjaGlsZHJlbjogW3tcbiAqICAgICAgIHBhdGg6ICd1c2VyLzpuYW1lJyxcbiAqICAgICAgIGNvbXBvbmVudDogVXNlclxuICogICAgIH1dXG4gKiAgIH1dXG4gKiB9XVxuICogYGBgXG4gKlxuICogV2hlbiBuYXZpZ2F0aW5nIHRvIGAvdGVhbS8xMS91c2VyL2ppbWAsIHRoZSByb3V0ZXIgd2lsbCBpbnN0YW50aWF0ZSB0aGUgd3JhcHBlciBjb21wb25lbnQgd2l0aFxuICogdGhlIHVzZXIgY29tcG9uZW50IGluIGl0LlxuICpcbiAqIEFuIGVtcHR5IHBhdGggcm91dGUgaW5oZXJpdHMgaXRzIHBhcmVudCdzIHBhcmFtcyBhbmQgZGF0YS4gVGhpcyBpcyBiZWNhdXNlIGl0IGNhbm5vdCBoYXZlIGl0c1xuICogb3duIHBhcmFtcywgYW5kLCBhcyBhIHJlc3VsdCwgaXQgb2Z0ZW4gdXNlcyBpdHMgcGFyZW50J3MgcGFyYW1zIGFuZCBkYXRhIGFzIGl0cyBvd24uXG4gKlxuICogIyMjIE1hdGNoaW5nIFN0cmF0ZWd5XG4gKlxuICogQnkgZGVmYXVsdCB0aGUgcm91dGVyIHdpbGwgbG9vayBhdCB3aGF0IGlzIGxlZnQgaW4gdGhlIHVybCwgYW5kIGNoZWNrIGlmIGl0IHN0YXJ0cyB3aXRoXG4gKiB0aGUgc3BlY2lmaWVkIHBhdGggKGUuZy4sIGAvdGVhbS8xMS91c2VyYCBzdGFydHMgd2l0aCBgdGVhbS86aWRgKS5cbiAqXG4gKiBXZSBjYW4gY2hhbmdlIHRoZSBtYXRjaGluZyBzdHJhdGVneSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgcGF0aCBjb3ZlcnMgdGhlIHdob2xlIHVuY29uc3VtZWQgdXJsLFxuICogd2hpY2ggaXMgYWtpbiB0byBgdW5jb25zdW1lZFVybCA9PT0gcGF0aGAgb3IgYCRgIHJlZ3VsYXIgZXhwcmVzc2lvbnMuXG4gKlxuICogVGhpcyBpcyBwYXJ0aWN1bGFybHkgaW1wb3J0YW50IHdoZW4gcmVkaXJlY3RpbmcgZW1wdHktcGF0aCByb3V0ZXMuXG4gKlxuICogYGBgXG4gKiBbe1xuICogICBwYXRoOiAnJyxcbiAqICAgcGF0aE1hdGNoOiAncHJlZml4JywgLy9kZWZhdWx0XG4gKiAgIHJlZGlyZWN0VG86ICdtYWluJ1xuICogfSwge1xuICogICBwYXRoOiAnbWFpbicsXG4gKiAgIGNvbXBvbmVudDogTWFpblxuICogfV1cbiAqIGBgYFxuICpcbiAqIFNpbmNlIGFuIGVtcHR5IHBhdGggaXMgYSBwcmVmaXggb2YgYW55IHVybCwgZXZlbiB3aGVuIG5hdmlnYXRpbmcgdG8gJy9tYWluJywgdGhlIHJvdXRlciB3aWxsXG4gKiBzdGlsbCBhcHBseSB0aGUgcmVkaXJlY3QuXG4gKlxuICogSWYgYHBhdGhNYXRjaDogZnVsbGAgaXMgcHJvdmlkZWQsIHRoZSByb3V0ZXIgd2lsbCBhcHBseSB0aGUgcmVkaXJlY3QgaWYgYW5kIG9ubHkgaWYgbmF2aWdhdGluZyB0b1xuICogJy8nLlxuICpcbiAqIGBgYFxuICogW3tcbiAqICAgcGF0aDogJycsXG4gKiAgIHBhdGhNYXRjaDogJ2Z1bGwnLFxuICogICByZWRpcmVjdFRvOiAnbWFpbidcbiAqIH0sIHtcbiAqICAgcGF0aDogJ21haW4nLFxuICogICBjb21wb25lbnQ6IE1haW5cbiAqIH1dXG4gKiBgYGBcbiAqXG4gKiAjIyMgQ29tcG9uZW50bGVzcyBSb3V0ZXNcbiAqXG4gKiBJdCBpcyB1c2VmdWwgYXQgdGltZXMgdG8gaGF2ZSB0aGUgYWJpbGl0eSB0byBzaGFyZSBwYXJhbWV0ZXJzIGJldHdlZW4gc2libGluZyBjb21wb25lbnRzLlxuICpcbiAqIFNheSB3ZSBoYXZlIHR3byBjb21wb25lbnRzLS1DaGlsZENtcCBhbmQgQXV4Q21wLS10aGF0IHdlIHdhbnQgdG8gcHV0IG5leHQgdG8gZWFjaCBvdGhlciBhbmQgYm90aFxuICogb2YgdGhlbSByZXF1aXJlIHNvbWUgaWQgcGFyYW1ldGVyLlxuICpcbiAqIE9uZSB3YXkgdG8gZG8gdGhhdCB3b3VsZCBiZSB0byBoYXZlIGEgYm9ndXMgcGFyZW50IGNvbXBvbmVudCwgc28gYm90aCB0aGUgc2libGluZ3MgY2FuIGdldCB0aGUgaWRcbiAqIHBhcmFtZXRlciBmcm9tIGl0LiBUaGlzIGlzIG5vdCBpZGVhbC4gSW5zdGVhZCwgeW91IGNhbiB1c2UgYSBjb21wb25lbnRsZXNzIHJvdXRlLlxuICpcbiAqIGBgYFxuICogW3tcbiAqICAgIHBhdGg6ICdwYXJlbnQvOmlkJyxcbiAqICAgIGNoaWxkcmVuOiBbXG4gKiAgICAgIHsgcGF0aDogJ2EnLCBjb21wb25lbnQ6IE1haW5DaGlsZCB9LFxuICogICAgICB7IHBhdGg6ICdiJywgY29tcG9uZW50OiBBdXhDaGlsZCwgb3V0bGV0OiAnYXV4JyB9XG4gKiAgICBdXG4gKiB9XVxuICogYGBgXG4gKlxuICogU28gd2hlbiBuYXZpZ2F0aW5nIHRvIGBwYXJlbnQvMTAvKGEvL2F1eDpiKWAsIHRoZSByb3V0ZSB3aWxsIGluc3RhbnRpYXRlIHRoZSBtYWluIGNoaWxkIGFuZCBhdXhcbiAqIGNoaWxkIGNvbXBvbmVudHMgbmV4dCB0byBlYWNoIG90aGVyLiBJbiB0aGlzIGV4YW1wbGUsIHRoZSBhcHBsaWNhdGlvbiBjb21wb25lbnRcbiAqIGhhcyB0byBoYXZlIHRoZSBwcmltYXJ5IGFuZCBhdXggb3V0bGV0cyBkZWZpbmVkLlxuICpcbiAqIFRoZSByb3V0ZXIgd2lsbCBhbHNvIG1lcmdlIHRoZSBgcGFyYW1zYCwgYGRhdGFgLCBhbmQgYHJlc29sdmVgIG9mIHRoZSBjb21wb25lbnRsZXNzIHBhcmVudCBpbnRvXG4gKiB0aGUgYHBhcmFtc2AsIGBkYXRhYCwgYW5kIGByZXNvbHZlYCBvZiB0aGUgY2hpbGRyZW4uIFRoaXMgaXMgZG9uZSBiZWNhdXNlIHRoZXJlIGlzIG5vIGNvbXBvbmVudFxuICogdGhhdCBjYW4gaW5qZWN0IHRoZSBhY3RpdmF0ZWQgcm91dGUgb2YgdGhlIGNvbXBvbmVudGxlc3MgcGFyZW50LlxuICpcbiAqIFRoaXMgaXMgZXNwZWNpYWxseSB1c2VmdWwgd2hlbiBjaGlsZCBjb21wb25lbnRzIGFyZSBkZWZpbmVkIGFzIGZvbGxvd3M6XG4gKlxuICogYGBgXG4gKiBbe1xuICogICAgcGF0aDogJ3BhcmVudC86aWQnLFxuICogICAgY2hpbGRyZW46IFtcbiAqICAgICAgeyBwYXRoOiAnJywgY29tcG9uZW50OiBNYWluQ2hpbGQgfSxcbiAqICAgICAgeyBwYXRoOiAnJywgY29tcG9uZW50OiBBdXhDaGlsZCwgb3V0bGV0OiAnYXV4JyB9XG4gKiAgICBdXG4gKiB9XVxuICogYGBgXG4gKlxuICogV2l0aCB0aGlzIGNvbmZpZ3VyYXRpb24gaW4gcGxhY2UsIG5hdmlnYXRpbmcgdG8gJy9wYXJlbnQvMTAnIHdpbGwgY3JlYXRlIHRoZSBtYWluIGNoaWxkIGFuZCBhdXhcbiAqIGNvbXBvbmVudHMuXG4gKlxuICogIyMjIExhenkgTG9hZGluZ1xuICpcbiAqIExhenkgbG9hZGluZyBzcGVlZHMgdXAgb3VyIGFwcGxpY2F0aW9uIGxvYWQgdGltZSBieSBzcGxpdHRpbmcgaXQgaW50byBtdWx0aXBsZSBidW5kbGVzLCBhbmRcbiAqIGxvYWRpbmcgdGhlbSBvbiBkZW1hbmQuIFRoZSByb3V0ZXIgaXMgZGVzaWduZWQgdG8gbWFrZSBsYXp5IGxvYWRpbmcgc2ltcGxlIGFuZCBlYXN5LiBJbnN0ZWFkIG9mXG4gKiBwcm92aWRpbmcgdGhlIGNoaWxkcmVuIHByb3BlcnR5LCB5b3UgY2FuIHByb3ZpZGUgdGhlIGBsb2FkQ2hpbGRyZW5gIHByb3BlcnR5LCBhcyBmb2xsb3dzOlxuICpcbiAqIGBgYFxuICogW3tcbiAqICAgcGF0aDogJ3RlYW0vOmlkJyxcbiAqICAgY29tcG9uZW50OiBUZWFtLFxuICogICBsb2FkQ2hpbGRyZW46ICd0ZWFtJ1xuICogfV1cbiAqIGBgYFxuICpcbiAqIFRoZSByb3V0ZXIgd2lsbCB1c2UgcmVnaXN0ZXJlZCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIgdG8gZmV0Y2ggYW4gTmdNb2R1bGUgYXNzb2NpYXRlZCB3aXRoICd0ZWFtJy5cbiAqIFRoZW4gaXQgd2lsbCBleHRyYWN0IHRoZSBzZXQgb2Ygcm91dGVzIGRlZmluZWQgaW4gdGhhdCBOZ01vZHVsZSwgYW5kIHdpbGwgdHJhbnNwYXJlbnRseSBhZGRcbiAqIHRob3NlIHJvdXRlcyB0byB0aGUgbWFpbiBjb25maWd1cmF0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IHR5cGUgUm91dGVzID0gUm91dGVbXTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gUmVwcmVzZW50cyB0aGUgcmVzdWx0cyBvZiB0aGUgVVJMIG1hdGNoaW5nLlxuICpcbiAqICogYGNvbnN1bWVkYCBpcyBhbiBhcnJheSBvZiB0aGUgY29uc3VtZWQgVVJMIHNlZ21lbnRzLlxuICogKiBgcG9zUGFyYW1zYCBpcyBhIG1hcCBvZiBwb3NpdGlvbmFsIHBhcmFtZXRlcnMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgdHlwZSBVcmxNYXRjaFJlc3VsdCA9IHtcbiAgY29uc3VtZWQ6IFVybFNlZ21lbnRbXTsgcG9zUGFyYW1zPzoge1tuYW1lOiBzdHJpbmddOiBVcmxTZWdtZW50fTtcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogQSBmdW5jdGlvbiBtYXRjaGluZyBVUkxzXG4gKlxuICogQSBjdXN0b20gVVJMIG1hdGNoZXIgY2FuIGJlIHByb3ZpZGVkIHdoZW4gYSBjb21iaW5hdGlvbiBvZiBgcGF0aGAgYW5kIGBwYXRoTWF0Y2hgIGlzbid0XG4gKiBleHByZXNzaXZlIGVub3VnaC5cbiAqXG4gKiBGb3IgaW5zdGFuY2UsIHRoZSBmb2xsb3dpbmcgbWF0Y2hlciBtYXRjaGVzIGh0bWwgZmlsZXMuXG4gKlxuICogYGBgXG4gKiBleHBvcnQgZnVuY3Rpb24gaHRtbEZpbGVzKHVybDogVXJsU2VnbWVudFtdKSB7XG4gKiAgIHJldHVybiB1cmwubGVuZ3RoID09PSAxICYmIHVybFswXS5wYXRoLmVuZHNXaXRoKCcuaHRtbCcpID8gKHtjb25zdW1lZDogdXJsfSkgOiBudWxsO1xuICogfVxuICpcbiAqIGV4cG9ydCBjb25zdCByb3V0ZXMgPSBbeyBtYXRjaGVyOiBodG1sRmlsZXMsIGNvbXBvbmVudDogQW55Q29tcG9uZW50IH1dO1xuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgdHlwZSBVcmxNYXRjaGVyID0gKHNlZ21lbnRzOiBVcmxTZWdtZW50W10sIGdyb3VwOiBVcmxTZWdtZW50R3JvdXAsIHJvdXRlOiBSb3V0ZSkgPT5cbiAgICBVcmxNYXRjaFJlc3VsdDtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBSZXByZXNlbnRzIHRoZSBzdGF0aWMgZGF0YSBhc3NvY2lhdGVkIHdpdGggYSBwYXJ0aWN1bGFyIHJvdXRlLlxuICpcbiAqIFNlZSBgUm91dGVzYCBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IHR5cGUgRGF0YSA9IHtcbiAgW25hbWU6IHN0cmluZ106IGFueVxufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBSZXByZXNlbnRzIHRoZSByZXNvbHZlZCBkYXRhIGFzc29jaWF0ZWQgd2l0aCBhIHBhcnRpY3VsYXIgcm91dGUuXG4gKlxuICogU2VlIGBSb3V0ZXNgIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgdHlwZSBSZXNvbHZlRGF0YSA9IHtcbiAgW25hbWU6IHN0cmluZ106IGFueVxufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBUaGUgdHlwZSBvZiBgbG9hZENoaWxkcmVuYC5cbiAqXG4gKiBTZWUgYFJvdXRlc2AgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIExvYWRDaGlsZHJlbkNhbGxiYWNrID0gKCkgPT5cbiAgICBUeXBlPGFueT58IE5nTW9kdWxlRmFjdG9yeTxhbnk+fCBQcm9taXNlPFR5cGU8YW55Pj58IE9ic2VydmFibGU8VHlwZTxhbnk+PjtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBUaGUgdHlwZSBvZiBgbG9hZENoaWxkcmVuYC5cbiAqXG4gKiBTZWUgYFJvdXRlc2AgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIExvYWRDaGlsZHJlbiA9IHN0cmluZyB8IExvYWRDaGlsZHJlbkNhbGxiYWNrO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRoZSB0eXBlIG9mIGBxdWVyeVBhcmFtc0hhbmRsaW5nYC5cbiAqXG4gKiBTZWUgYFJvdXRlckxpbmtgIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICovXG5leHBvcnQgdHlwZSBRdWVyeVBhcmFtc0hhbmRsaW5nID0gJ21lcmdlJyB8ICdwcmVzZXJ2ZScgfCAnJztcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBUaGUgdHlwZSBvZiBgcnVuR3VhcmRzQW5kUmVzb2x2ZXJzYC5cbiAqXG4gKiBTZWUgYFJvdXRlc2AgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IHR5cGUgUnVuR3VhcmRzQW5kUmVzb2x2ZXJzID1cbiAgICAncGF0aFBhcmFtc0NoYW5nZScgfCAncGFyYW1zQ2hhbmdlJyB8ICdwYXJhbXNPclF1ZXJ5UGFyYW1zQ2hhbmdlJyB8ICdhbHdheXMnO1xuXG4vKipcbiAqIFNlZSBgUm91dGVzYCBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSb3V0ZSB7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIHBhdGhNYXRjaD86IHN0cmluZztcbiAgbWF0Y2hlcj86IFVybE1hdGNoZXI7XG4gIGNvbXBvbmVudD86IFR5cGU8YW55PjtcbiAgcmVkaXJlY3RUbz86IHN0cmluZztcbiAgb3V0bGV0Pzogc3RyaW5nO1xuICBjYW5BY3RpdmF0ZT86IGFueVtdO1xuICBjYW5BY3RpdmF0ZUNoaWxkPzogYW55W107XG4gIGNhbkRlYWN0aXZhdGU/OiBhbnlbXTtcbiAgY2FuTG9hZD86IGFueVtdO1xuICBkYXRhPzogRGF0YTtcbiAgcmVzb2x2ZT86IFJlc29sdmVEYXRhO1xuICBjaGlsZHJlbj86IFJvdXRlcztcbiAgbG9hZENoaWxkcmVuPzogTG9hZENoaWxkcmVuO1xuICBydW5HdWFyZHNBbmRSZXNvbHZlcnM/OiBSdW5HdWFyZHNBbmRSZXNvbHZlcnM7XG4gIC8qKlxuICAgKiBGaWxsZWQgZm9yIHJvdXRlcyB3aXRoIGBsb2FkQ2hpbGRyZW5gIG9uY2UgdGhlIG1vZHVsZSBoYXMgYmVlbiBsb2FkZWRcbiAgICogQGludGVybmFsXG4gICAqL1xuICBfbG9hZGVkQ29uZmlnPzogTG9hZGVkUm91dGVyQ29uZmlnO1xufVxuXG5leHBvcnQgY2xhc3MgTG9hZGVkUm91dGVyQ29uZmlnIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJvdXRlczogUm91dGVbXSwgcHVibGljIG1vZHVsZTogTmdNb2R1bGVSZWY8YW55Pikge31cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlQ29uZmlnKGNvbmZpZzogUm91dGVzLCBwYXJlbnRQYXRoOiBzdHJpbmcgPSAnJyk6IHZvaWQge1xuICAvLyBmb3JFYWNoIGRvZXNuJ3QgaXRlcmF0ZSB1bmRlZmluZWQgdmFsdWVzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm91dGU6IFJvdXRlID0gY29uZmlnW2ldO1xuICAgIGNvbnN0IGZ1bGxQYXRoOiBzdHJpbmcgPSBnZXRGdWxsUGF0aChwYXJlbnRQYXRoLCByb3V0ZSk7XG4gICAgdmFsaWRhdGVOb2RlKHJvdXRlLCBmdWxsUGF0aCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVOb2RlKHJvdXRlOiBSb3V0ZSwgZnVsbFBhdGg6IHN0cmluZyk6IHZvaWQge1xuICBpZiAoIXJvdXRlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgIEludmFsaWQgY29uZmlndXJhdGlvbiBvZiByb3V0ZSAnJHtmdWxsUGF0aH0nOiBFbmNvdW50ZXJlZCB1bmRlZmluZWQgcm91dGUuXG4gICAgICBUaGUgcmVhc29uIG1pZ2h0IGJlIGFuIGV4dHJhIGNvbW1hLlxuXG4gICAgICBFeGFtcGxlOlxuICAgICAgY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gICAgICAgIHsgcGF0aDogJycsIHJlZGlyZWN0VG86ICcvZGFzaGJvYXJkJywgcGF0aE1hdGNoOiAnZnVsbCcgfSxcbiAgICAgICAgeyBwYXRoOiAnZGFzaGJvYXJkJywgIGNvbXBvbmVudDogRGFzaGJvYXJkQ29tcG9uZW50IH0sLCA8PCB0d28gY29tbWFzXG4gICAgICAgIHsgcGF0aDogJ2RldGFpbC86aWQnLCBjb21wb25lbnQ6IEhlcm9EZXRhaWxDb21wb25lbnQgfVxuICAgICAgXTtcbiAgICBgKTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShyb3V0ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY29uZmlndXJhdGlvbiBvZiByb3V0ZSAnJHtmdWxsUGF0aH0nOiBBcnJheSBjYW5ub3QgYmUgc3BlY2lmaWVkYCk7XG4gIH1cbiAgaWYgKCFyb3V0ZS5jb21wb25lbnQgJiYgIXJvdXRlLmNoaWxkcmVuICYmICFyb3V0ZS5sb2FkQ2hpbGRyZW4gJiZcbiAgICAgIChyb3V0ZS5vdXRsZXQgJiYgcm91dGUub3V0bGV0ICE9PSBQUklNQVJZX09VVExFVCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbnZhbGlkIGNvbmZpZ3VyYXRpb24gb2Ygcm91dGUgJyR7ZnVsbFBhdGh9JzogYSBjb21wb25lbnRsZXNzIHJvdXRlIHdpdGhvdXQgY2hpbGRyZW4gb3IgbG9hZENoaWxkcmVuIGNhbm5vdCBoYXZlIGEgbmFtZWQgb3V0bGV0IHNldGApO1xuICB9XG4gIGlmIChyb3V0ZS5yZWRpcmVjdFRvICYmIHJvdXRlLmNoaWxkcmVuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgSW52YWxpZCBjb25maWd1cmF0aW9uIG9mIHJvdXRlICcke2Z1bGxQYXRofSc6IHJlZGlyZWN0VG8gYW5kIGNoaWxkcmVuIGNhbm5vdCBiZSB1c2VkIHRvZ2V0aGVyYCk7XG4gIH1cbiAgaWYgKHJvdXRlLnJlZGlyZWN0VG8gJiYgcm91dGUubG9hZENoaWxkcmVuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgSW52YWxpZCBjb25maWd1cmF0aW9uIG9mIHJvdXRlICcke2Z1bGxQYXRofSc6IHJlZGlyZWN0VG8gYW5kIGxvYWRDaGlsZHJlbiBjYW5ub3QgYmUgdXNlZCB0b2dldGhlcmApO1xuICB9XG4gIGlmIChyb3V0ZS5jaGlsZHJlbiAmJiByb3V0ZS5sb2FkQ2hpbGRyZW4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbnZhbGlkIGNvbmZpZ3VyYXRpb24gb2Ygcm91dGUgJyR7ZnVsbFBhdGh9JzogY2hpbGRyZW4gYW5kIGxvYWRDaGlsZHJlbiBjYW5ub3QgYmUgdXNlZCB0b2dldGhlcmApO1xuICB9XG4gIGlmIChyb3V0ZS5yZWRpcmVjdFRvICYmIHJvdXRlLmNvbXBvbmVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEludmFsaWQgY29uZmlndXJhdGlvbiBvZiByb3V0ZSAnJHtmdWxsUGF0aH0nOiByZWRpcmVjdFRvIGFuZCBjb21wb25lbnQgY2Fubm90IGJlIHVzZWQgdG9nZXRoZXJgKTtcbiAgfVxuICBpZiAocm91dGUucGF0aCAmJiByb3V0ZS5tYXRjaGVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgSW52YWxpZCBjb25maWd1cmF0aW9uIG9mIHJvdXRlICcke2Z1bGxQYXRofSc6IHBhdGggYW5kIG1hdGNoZXIgY2Fubm90IGJlIHVzZWQgdG9nZXRoZXJgKTtcbiAgfVxuICBpZiAocm91dGUucmVkaXJlY3RUbyA9PT0gdm9pZCAwICYmICFyb3V0ZS5jb21wb25lbnQgJiYgIXJvdXRlLmNoaWxkcmVuICYmICFyb3V0ZS5sb2FkQ2hpbGRyZW4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbnZhbGlkIGNvbmZpZ3VyYXRpb24gb2Ygcm91dGUgJyR7ZnVsbFBhdGh9Jy4gT25lIG9mIHRoZSBmb2xsb3dpbmcgbXVzdCBiZSBwcm92aWRlZDogY29tcG9uZW50LCByZWRpcmVjdFRvLCBjaGlsZHJlbiBvciBsb2FkQ2hpbGRyZW5gKTtcbiAgfVxuICBpZiAocm91dGUucGF0aCA9PT0gdm9pZCAwICYmIHJvdXRlLm1hdGNoZXIgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEludmFsaWQgY29uZmlndXJhdGlvbiBvZiByb3V0ZSAnJHtmdWxsUGF0aH0nOiByb3V0ZXMgbXVzdCBoYXZlIGVpdGhlciBhIHBhdGggb3IgYSBtYXRjaGVyIHNwZWNpZmllZGApO1xuICB9XG4gIGlmICh0eXBlb2Ygcm91dGUucGF0aCA9PT0gJ3N0cmluZycgJiYgcm91dGUucGF0aC5jaGFyQXQoMCkgPT09ICcvJykge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjb25maWd1cmF0aW9uIG9mIHJvdXRlICcke2Z1bGxQYXRofSc6IHBhdGggY2Fubm90IHN0YXJ0IHdpdGggYSBzbGFzaGApO1xuICB9XG4gIGlmIChyb3V0ZS5wYXRoID09PSAnJyAmJiByb3V0ZS5yZWRpcmVjdFRvICE9PSB2b2lkIDAgJiYgcm91dGUucGF0aE1hdGNoID09PSB2b2lkIDApIHtcbiAgICBjb25zdCBleHAgPVxuICAgICAgICBgVGhlIGRlZmF1bHQgdmFsdWUgb2YgJ3BhdGhNYXRjaCcgaXMgJ3ByZWZpeCcsIGJ1dCBvZnRlbiB0aGUgaW50ZW50IGlzIHRvIHVzZSAnZnVsbCcuYDtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbnZhbGlkIGNvbmZpZ3VyYXRpb24gb2Ygcm91dGUgJ3twYXRoOiBcIiR7ZnVsbFBhdGh9XCIsIHJlZGlyZWN0VG86IFwiJHtyb3V0ZS5yZWRpcmVjdFRvfVwifSc6IHBsZWFzZSBwcm92aWRlICdwYXRoTWF0Y2gnLiAke2V4cH1gKTtcbiAgfVxuICBpZiAocm91dGUucGF0aE1hdGNoICE9PSB2b2lkIDAgJiYgcm91dGUucGF0aE1hdGNoICE9PSAnZnVsbCcgJiYgcm91dGUucGF0aE1hdGNoICE9PSAncHJlZml4Jykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEludmFsaWQgY29uZmlndXJhdGlvbiBvZiByb3V0ZSAnJHtmdWxsUGF0aH0nOiBwYXRoTWF0Y2ggY2FuIG9ubHkgYmUgc2V0IHRvICdwcmVmaXgnIG9yICdmdWxsJ2ApO1xuICB9XG4gIGlmIChyb3V0ZS5jaGlsZHJlbikge1xuICAgIHZhbGlkYXRlQ29uZmlnKHJvdXRlLmNoaWxkcmVuLCBmdWxsUGF0aCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RnVsbFBhdGgocGFyZW50UGF0aDogc3RyaW5nLCBjdXJyZW50Um91dGU6IFJvdXRlKTogc3RyaW5nIHtcbiAgaWYgKCFjdXJyZW50Um91dGUpIHtcbiAgICByZXR1cm4gcGFyZW50UGF0aDtcbiAgfVxuICBpZiAoIXBhcmVudFBhdGggJiYgIWN1cnJlbnRSb3V0ZS5wYXRoKSB7XG4gICAgcmV0dXJuICcnO1xuICB9IGVsc2UgaWYgKHBhcmVudFBhdGggJiYgIWN1cnJlbnRSb3V0ZS5wYXRoKSB7XG4gICAgcmV0dXJuIGAke3BhcmVudFBhdGh9L2A7XG4gIH0gZWxzZSBpZiAoIXBhcmVudFBhdGggJiYgY3VycmVudFJvdXRlLnBhdGgpIHtcbiAgICByZXR1cm4gY3VycmVudFJvdXRlLnBhdGg7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGAke3BhcmVudFBhdGh9LyR7Y3VycmVudFJvdXRlLnBhdGh9YDtcbiAgfVxufVxuXG4vKipcbiAqIE1ha2VzIGEgY29weSBvZiB0aGUgY29uZmlnIGFuZCBhZGRzIGFueSBkZWZhdWx0IHJlcXVpcmVkIHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFuZGFyZGl6ZUNvbmZpZyhyOiBSb3V0ZSk6IFJvdXRlIHtcbiAgY29uc3QgY2hpbGRyZW4gPSByLmNoaWxkcmVuICYmIHIuY2hpbGRyZW4ubWFwKHN0YW5kYXJkaXplQ29uZmlnKTtcbiAgY29uc3QgYyA9IGNoaWxkcmVuID8gey4uLnIsIGNoaWxkcmVufSA6IHsuLi5yfTtcbiAgaWYgKCFjLmNvbXBvbmVudCAmJiAoY2hpbGRyZW4gfHwgYy5sb2FkQ2hpbGRyZW4pICYmIChjLm91dGxldCAmJiBjLm91dGxldCAhPT0gUFJJTUFSWV9PVVRMRVQpKSB7XG4gICAgYy5jb21wb25lbnQgPSBFbXB0eU91dGxldENvbXBvbmVudDtcbiAgfVxuICByZXR1cm4gYztcbn1cbiJdfQ==