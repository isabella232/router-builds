/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata } from "tslib";
import { Location, LocationStrategy } from '@angular/common';
import { MockLocationStrategy, SpyLocation } from '@angular/common/testing';
import { Compiler, Injectable, Injector, NgModule, NgModuleFactoryLoader, Optional } from '@angular/core';
import { ChildrenOutletContexts, NoPreloading, PreloadingStrategy, provideRoutes, Router, ROUTER_CONFIGURATION, RouterModule, ROUTES, UrlHandlingStrategy, UrlSerializer, ɵflatten as flatten, ɵROUTER_PROVIDERS as ROUTER_PROVIDERS } from '@angular/router';
/**
 * @description
 *
 * Allows to simulate the loading of ng modules in tests.
 *
 * ```
 * const loader = TestBed.inject(NgModuleFactoryLoader);
 *
 * @Component({template: 'lazy-loaded'})
 * class LazyLoadedComponent {}
 * @NgModule({
 *   declarations: [LazyLoadedComponent],
 *   imports: [RouterModule.forChild([{path: 'loaded', component: LazyLoadedComponent}])]
 * })
 *
 * class LoadedModule {}
 *
 * // sets up stubbedModules
 * loader.stubbedModules = {lazyModule: LoadedModule};
 *
 * router.resetConfig([
 *   {path: 'lazy', loadChildren: 'lazyModule'},
 * ]);
 *
 * router.navigateByUrl('/lazy/loaded');
 * ```
 *
 * @publicApi
 */
let SpyNgModuleFactoryLoader = /** @class */ (() => {
    let SpyNgModuleFactoryLoader = class SpyNgModuleFactoryLoader {
        constructor(compiler) {
            this.compiler = compiler;
            /**
             * @docsNotRequired
             */
            this._stubbedModules = {};
        }
        /**
         * @docsNotRequired
         */
        set stubbedModules(modules) {
            const res = {};
            for (const t of Object.keys(modules)) {
                res[t] = this.compiler.compileModuleAsync(modules[t]);
            }
            this._stubbedModules = res;
        }
        /**
         * @docsNotRequired
         */
        get stubbedModules() {
            return this._stubbedModules;
        }
        load(path) {
            if (this._stubbedModules[path]) {
                return this._stubbedModules[path];
            }
            else {
                return Promise.reject(new Error(`Cannot find module ${path}`));
            }
        }
    };
    SpyNgModuleFactoryLoader = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Compiler])
    ], SpyNgModuleFactoryLoader);
    return SpyNgModuleFactoryLoader;
})();
export { SpyNgModuleFactoryLoader };
function isUrlHandlingStrategy(opts) {
    // This property check is needed because UrlHandlingStrategy is an interface and doesn't exist at
    // runtime.
    return 'shouldProcessUrl' in opts;
}
/**
 * Router setup factory function used for testing.
 *
 * @publicApi
 */
export function setupTestingRouter(urlSerializer, contexts, location, loader, compiler, injector, routes, opts, urlHandlingStrategy) {
    const router = new Router(null, urlSerializer, contexts, location, injector, loader, compiler, flatten(routes));
    if (opts) {
        // Handle deprecated argument ordering.
        if (isUrlHandlingStrategy(opts)) {
            router.urlHandlingStrategy = opts;
        }
        else {
            // Handle ExtraOptions
            if (opts.malformedUriErrorHandler) {
                router.malformedUriErrorHandler = opts.malformedUriErrorHandler;
            }
            if (opts.paramsInheritanceStrategy) {
                router.paramsInheritanceStrategy = opts.paramsInheritanceStrategy;
            }
        }
    }
    if (urlHandlingStrategy) {
        router.urlHandlingStrategy = urlHandlingStrategy;
    }
    return router;
}
/**
 * @description
 *
 * Sets up the router to be used for testing.
 *
 * The modules sets up the router to be used for testing.
 * It provides spy implementations of `Location`, `LocationStrategy`, and {@link
 * NgModuleFactoryLoader}.
 *
 * @usageNotes
 * ### Example
 *
 * ```
 * beforeEach(() => {
 *   TestBed.configureTestModule({
 *     imports: [
 *       RouterTestingModule.withRoutes(
 *         [{path: '', component: BlankCmp}, {path: 'simple', component: SimpleCmp}]
 *       )
 *     ]
 *   });
 * });
 * ```
 *
 * @publicApi
 */
let RouterTestingModule = /** @class */ (() => {
    var RouterTestingModule_1;
    let RouterTestingModule = RouterTestingModule_1 = class RouterTestingModule {
        static withRoutes(routes, config) {
            return {
                ngModule: RouterTestingModule_1,
                providers: [
                    provideRoutes(routes),
                    { provide: ROUTER_CONFIGURATION, useValue: config ? config : {} },
                ]
            };
        }
    };
    RouterTestingModule = RouterTestingModule_1 = __decorate([
        NgModule({
            exports: [RouterModule],
            providers: [
                ROUTER_PROVIDERS, { provide: Location, useClass: SpyLocation },
                { provide: LocationStrategy, useClass: MockLocationStrategy },
                { provide: NgModuleFactoryLoader, useClass: SpyNgModuleFactoryLoader }, {
                    provide: Router,
                    useFactory: setupTestingRouter,
                    deps: [
                        UrlSerializer, ChildrenOutletContexts, Location, NgModuleFactoryLoader, Compiler, Injector,
                        ROUTES, ROUTER_CONFIGURATION, [UrlHandlingStrategy, new Optional()]
                    ]
                },
                { provide: PreloadingStrategy, useExisting: NoPreloading }, provideRoutes([])
            ]
        })
    ], RouterTestingModule);
    return RouterTestingModule;
})();
export { RouterTestingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3Rlc3RpbmdfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3Rlc3Rpbmcvc3JjL3JvdXRlcl90ZXN0aW5nX21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxXQUFXLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQXVCLFFBQVEsRUFBbUIscUJBQXFCLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlJLE9BQU8sRUFBQyxzQkFBc0IsRUFBZ0IsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBUyxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBVSxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsUUFBUSxJQUFJLE9BQU8sRUFBRSxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBSXpSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBRUg7SUFBQSxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtRQXdCbkMsWUFBb0IsUUFBa0I7WUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtZQXZCdEM7O2VBRUc7WUFDSyxvQkFBZSxHQUFvRCxFQUFFLENBQUM7UUFvQnJDLENBQUM7UUFsQjFDOztXQUVHO1FBQ0gsSUFBSSxjQUFjLENBQUMsT0FBOEI7WUFDL0MsTUFBTSxHQUFHLEdBQTBCLEVBQUUsQ0FBQztZQUN0QyxLQUFLLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3BDLEdBQUcs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QUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFDO2dCQUMzRCxFQUFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUMsRUFBRTtvQkFDcEUsT0FBTyxFQUFFLE1BQU07b0JBQ2YsVUFBVSxFQUFFLGtCQUFrQjtvQkFDOUIsSUFBSSxFQUFFO3dCQUNKLGFBQWEsRUFBRSxzQkFBc0IsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLFFBQVE7d0JBQzFGLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxDQUFDLG1CQUFtQixFQUFFLElBQUksUUFBUSxFQUFFLENBQUM7cUJBQ3BFO2lCQUNGO2dCQUNELEVBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUMsRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDO2FBQzVFO1NBQ0YsQ0FBQztPQUNXLG1CQUFtQixDQVcvQjtJQUFELDBCQUFDO0tBQUE7U0FYWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TG9jYXRpb24sIExvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01vY2tMb2NhdGlvblN0cmF0ZWd5LCBTcHlMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL3Rlc3RpbmcnO1xuaW1wb3J0IHtDb21waWxlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBOZ01vZHVsZUZhY3RvcnksIE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDaGlsZHJlbk91dGxldENvbnRleHRzLCBFeHRyYU9wdGlvbnMsIE5vUHJlbG9hZGluZywgUHJlbG9hZGluZ1N0cmF0ZWd5LCBwcm92aWRlUm91dGVzLCBSb3V0ZSwgUm91dGVyLCBST1VURVJfQ09ORklHVVJBVElPTiwgUm91dGVyTW9kdWxlLCBST1VURVMsIFJvdXRlcywgVXJsSGFuZGxpbmdTdHJhdGVneSwgVXJsU2VyaWFsaXplciwgybVmbGF0dGVuIGFzIGZsYXR0ZW4sIMm1Uk9VVEVSX1BST1ZJREVSUyBhcyBST1VURVJfUFJPVklERVJTfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBBbGxvd3MgdG8gc2ltdWxhdGUgdGhlIGxvYWRpbmcgb2YgbmcgbW9kdWxlcyBpbiB0ZXN0cy5cbiAqXG4gKiBgYGBcbiAqIGNvbnN0IGxvYWRlciA9IFRlc3RCZWQuaW5qZWN0KE5nTW9kdWxlRmFjdG9yeUxvYWRlcik7XG4gKlxuICogQENvbXBvbmVudCh7dGVtcGxhdGU6ICdsYXp5LWxvYWRlZCd9KVxuICogY2xhc3MgTGF6eUxvYWRlZENvbXBvbmVudCB7fVxuICogQE5nTW9kdWxlKHtcbiAqICAgZGVjbGFyYXRpb25zOiBbTGF6eUxvYWRlZENvbXBvbmVudF0sXG4gKiAgIGltcG9ydHM6IFtSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoW3twYXRoOiAnbG9hZGVkJywgY29tcG9uZW50OiBMYXp5TG9hZGVkQ29tcG9uZW50fV0pXVxuICogfSlcbiAqXG4gKiBjbGFzcyBMb2FkZWRNb2R1bGUge31cbiAqXG4gKiAvLyBzZXRzIHVwIHN0dWJiZWRNb2R1bGVzXG4gKiBsb2FkZXIuc3R1YmJlZE1vZHVsZXMgPSB7bGF6eU1vZHVsZTogTG9hZGVkTW9kdWxlfTtcbiAqXG4gKiByb3V0ZXIucmVzZXRDb25maWcoW1xuICogICB7cGF0aDogJ2xhenknLCBsb2FkQ2hpbGRyZW46ICdsYXp5TW9kdWxlJ30sXG4gKiBdKTtcbiAqXG4gKiByb3V0ZXIubmF2aWdhdGVCeVVybCgnL2xhenkvbG9hZGVkJyk7XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTcHlOZ01vZHVsZUZhY3RvcnlMb2FkZXIgaW1wbGVtZW50cyBOZ01vZHVsZUZhY3RvcnlMb2FkZXIge1xuICAvKipcbiAgICogQGRvY3NOb3RSZXF1aXJlZFxuICAgKi9cbiAgcHJpdmF0ZSBfc3R1YmJlZE1vZHVsZXM6IHtbcGF0aDogc3RyaW5nXTogUHJvbWlzZTxOZ01vZHVsZUZhY3Rvcnk8YW55Pj59ID0ge307XG5cbiAgLyoqXG4gICAqIEBkb2NzTm90UmVxdWlyZWRcbiAgICovXG4gIHNldCBzdHViYmVkTW9kdWxlcyhtb2R1bGVzOiB7W3BhdGg6IHN0cmluZ106IGFueX0pIHtcbiAgICBjb25zdCByZXM6IHtbcGF0aDogc3RyaW5nXTogYW55fSA9IHt9O1xuICAgIGZvciAoY29uc3QgdCBvZiBPYmplY3Qua2V5cyhtb2R1bGVzKSkge1xuICAgICAgcmVzW3RdID0gdGhpcy5jb21waWxlci5jb21waWxlTW9kdWxlQXN5bmMobW9kdWxlc1t0XSk7XG4gICAgfVxuICAgIHRoaXMuX3N0dWJiZWRNb2R1bGVzID0gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkb2NzTm90UmVxdWlyZWRcbiAgICovXG4gIGdldCBzdHViYmVkTW9kdWxlcygpOiB7W3BhdGg6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB0aGlzLl9zdHViYmVkTW9kdWxlcztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcGlsZXI6IENvbXBpbGVyKSB7fVxuXG4gIGxvYWQocGF0aDogc3RyaW5nKTogUHJvbWlzZTxOZ01vZHVsZUZhY3Rvcnk8YW55Pj4ge1xuICAgIGlmICh0aGlzLl9zdHViYmVkTW9kdWxlc1twYXRoXSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3N0dWJiZWRNb2R1bGVzW3BhdGhdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gPGFueT5Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYENhbm5vdCBmaW5kIG1vZHVsZSAke3BhdGh9YCkpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc1VybEhhbmRsaW5nU3RyYXRlZ3kob3B0czogRXh0cmFPcHRpb25zfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVybEhhbmRsaW5nU3RyYXRlZ3kpOiBvcHRzIGlzIFVybEhhbmRsaW5nU3RyYXRlZ3kge1xuICAvLyBUaGlzIHByb3BlcnR5IGNoZWNrIGlzIG5lZWRlZCBiZWNhdXNlIFVybEhhbmRsaW5nU3RyYXRlZ3kgaXMgYW4gaW50ZXJmYWNlIGFuZCBkb2Vzbid0IGV4aXN0IGF0XG4gIC8vIHJ1bnRpbWUuXG4gIHJldHVybiAnc2hvdWxkUHJvY2Vzc1VybCcgaW4gb3B0cztcbn1cblxuLyoqXG4gKiBSb3V0ZXIgc2V0dXAgZmFjdG9yeSBmdW5jdGlvbiB1c2VkIGZvciB0ZXN0aW5nLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldHVwVGVzdGluZ1JvdXRlcihcbiAgICB1cmxTZXJpYWxpemVyOiBVcmxTZXJpYWxpemVyLCBjb250ZXh0czogQ2hpbGRyZW5PdXRsZXRDb250ZXh0cywgbG9jYXRpb246IExvY2F0aW9uLFxuICAgIGxvYWRlcjogTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCBjb21waWxlcjogQ29tcGlsZXIsIGluamVjdG9yOiBJbmplY3Rvciwgcm91dGVzOiBSb3V0ZVtdW10sXG4gICAgb3B0cz86IEV4dHJhT3B0aW9ucywgdXJsSGFuZGxpbmdTdHJhdGVneT86IFVybEhhbmRsaW5nU3RyYXRlZ3kpOiBSb3V0ZXI7XG5cbi8qKlxuICogUm91dGVyIHNldHVwIGZhY3RvcnkgZnVuY3Rpb24gdXNlZCBmb3IgdGVzdGluZy5cbiAqXG4gKiBAZGVwcmVjYXRlZCBBcyBvZiB2NS4yLiBUaGUgMm5kLXRvLWxhc3QgYXJndW1lbnQgc2hvdWxkIGJlIGBFeHRyYU9wdGlvbnNgLCBub3RcbiAqIGBVcmxIYW5kbGluZ1N0cmF0ZWd5YFxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBUZXN0aW5nUm91dGVyKFxuICAgIHVybFNlcmlhbGl6ZXI6IFVybFNlcmlhbGl6ZXIsIGNvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzLCBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgbG9hZGVyOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIGNvbXBpbGVyOiBDb21waWxlciwgaW5qZWN0b3I6IEluamVjdG9yLCByb3V0ZXM6IFJvdXRlW11bXSxcbiAgICB1cmxIYW5kbGluZ1N0cmF0ZWd5PzogVXJsSGFuZGxpbmdTdHJhdGVneSk6IFJvdXRlcjtcblxuLyoqXG4gKiBSb3V0ZXIgc2V0dXAgZmFjdG9yeSBmdW5jdGlvbiB1c2VkIGZvciB0ZXN0aW5nLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldHVwVGVzdGluZ1JvdXRlcihcbiAgICB1cmxTZXJpYWxpemVyOiBVcmxTZXJpYWxpemVyLCBjb250ZXh0czogQ2hpbGRyZW5PdXRsZXRDb250ZXh0cywgbG9jYXRpb246IExvY2F0aW9uLFxuICAgIGxvYWRlcjogTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCBjb21waWxlcjogQ29tcGlsZXIsIGluamVjdG9yOiBJbmplY3Rvciwgcm91dGVzOiBSb3V0ZVtdW10sXG4gICAgb3B0cz86IEV4dHJhT3B0aW9uc3xVcmxIYW5kbGluZ1N0cmF0ZWd5LCB1cmxIYW5kbGluZ1N0cmF0ZWd5PzogVXJsSGFuZGxpbmdTdHJhdGVneSkge1xuICBjb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKFxuICAgICAgbnVsbCEsIHVybFNlcmlhbGl6ZXIsIGNvbnRleHRzLCBsb2NhdGlvbiwgaW5qZWN0b3IsIGxvYWRlciwgY29tcGlsZXIsIGZsYXR0ZW4ocm91dGVzKSk7XG4gIGlmIChvcHRzKSB7XG4gICAgLy8gSGFuZGxlIGRlcHJlY2F0ZWQgYXJndW1lbnQgb3JkZXJpbmcuXG4gICAgaWYgKGlzVXJsSGFuZGxpbmdTdHJhdGVneShvcHRzKSkge1xuICAgICAgcm91dGVyLnVybEhhbmRsaW5nU3RyYXRlZ3kgPSBvcHRzO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBIYW5kbGUgRXh0cmFPcHRpb25zXG5cbiAgICAgIGlmIChvcHRzLm1hbGZvcm1lZFVyaUVycm9ySGFuZGxlcikge1xuICAgICAgICByb3V0ZXIubWFsZm9ybWVkVXJpRXJyb3JIYW5kbGVyID0gb3B0cy5tYWxmb3JtZWRVcmlFcnJvckhhbmRsZXI7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRzLnBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3kpIHtcbiAgICAgICAgcm91dGVyLnBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3kgPSBvcHRzLnBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3k7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHVybEhhbmRsaW5nU3RyYXRlZ3kpIHtcbiAgICByb3V0ZXIudXJsSGFuZGxpbmdTdHJhdGVneSA9IHVybEhhbmRsaW5nU3RyYXRlZ3k7XG4gIH1cbiAgcmV0dXJuIHJvdXRlcjtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBTZXRzIHVwIHRoZSByb3V0ZXIgdG8gYmUgdXNlZCBmb3IgdGVzdGluZy5cbiAqXG4gKiBUaGUgbW9kdWxlcyBzZXRzIHVwIHRoZSByb3V0ZXIgdG8gYmUgdXNlZCBmb3IgdGVzdGluZy5cbiAqIEl0IHByb3ZpZGVzIHNweSBpbXBsZW1lbnRhdGlvbnMgb2YgYExvY2F0aW9uYCwgYExvY2F0aW9uU3RyYXRlZ3lgLCBhbmQge0BsaW5rXG4gKiBOZ01vZHVsZUZhY3RvcnlMb2FkZXJ9LlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogYmVmb3JlRWFjaCgoKSA9PiB7XG4gKiAgIFRlc3RCZWQuY29uZmlndXJlVGVzdE1vZHVsZSh7XG4gKiAgICAgaW1wb3J0czogW1xuICogICAgICAgUm91dGVyVGVzdGluZ01vZHVsZS53aXRoUm91dGVzKFxuICogICAgICAgICBbe3BhdGg6ICcnLCBjb21wb25lbnQ6IEJsYW5rQ21wfSwge3BhdGg6ICdzaW1wbGUnLCBjb21wb25lbnQ6IFNpbXBsZUNtcH1dXG4gKiAgICAgICApXG4gKiAgICAgXVxuICogICB9KTtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbUm91dGVyTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgUk9VVEVSX1BST1ZJREVSUywge3Byb3ZpZGU6IExvY2F0aW9uLCB1c2VDbGFzczogU3B5TG9jYXRpb259LFxuICAgIHtwcm92aWRlOiBMb2NhdGlvblN0cmF0ZWd5LCB1c2VDbGFzczogTW9ja0xvY2F0aW9uU3RyYXRlZ3l9LFxuICAgIHtwcm92aWRlOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIHVzZUNsYXNzOiBTcHlOZ01vZHVsZUZhY3RvcnlMb2FkZXJ9LCB7XG4gICAgICBwcm92aWRlOiBSb3V0ZXIsXG4gICAgICB1c2VGYWN0b3J5OiBzZXR1cFRlc3RpbmdSb3V0ZXIsXG4gICAgICBkZXBzOiBbXG4gICAgICAgIFVybFNlcmlhbGl6ZXIsIENoaWxkcmVuT3V0bGV0Q29udGV4dHMsIExvY2F0aW9uLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIENvbXBpbGVyLCBJbmplY3RvcixcbiAgICAgICAgUk9VVEVTLCBST1VURVJfQ09ORklHVVJBVElPTiwgW1VybEhhbmRsaW5nU3RyYXRlZ3ksIG5ldyBPcHRpb25hbCgpXVxuICAgICAgXVxuICAgIH0sXG4gICAge3Byb3ZpZGU6IFByZWxvYWRpbmdTdHJhdGVneSwgdXNlRXhpc3Rpbmc6IE5vUHJlbG9hZGluZ30sIHByb3ZpZGVSb3V0ZXMoW10pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUm91dGVyVGVzdGluZ01vZHVsZSB7XG4gIHN0YXRpYyB3aXRoUm91dGVzKHJvdXRlczogUm91dGVzLCBjb25maWc/OiBFeHRyYU9wdGlvbnMpOlxuICAgICAgTW9kdWxlV2l0aFByb3ZpZGVyczxSb3V0ZXJUZXN0aW5nTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBSb3V0ZXJUZXN0aW5nTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHByb3ZpZGVSb3V0ZXMocm91dGVzKSxcbiAgICAgICAge3Byb3ZpZGU6IFJPVVRFUl9DT05GSUdVUkFUSU9OLCB1c2VWYWx1ZTogY29uZmlnID8gY29uZmlnIDoge319LFxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==