import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Location, LocationStrategy } from '@angular/common';
import { MockLocationStrategy, SpyLocation } from '@angular/common/testing';
import { Compiler, Injectable, Injector, NgModule, NgModuleFactoryLoader, Optional } from '@angular/core';
import { ChildrenOutletContexts, NoPreloading, PreloadingStrategy, ROUTER_CONFIGURATION, ROUTES, Router, RouterModule, UrlHandlingStrategy, UrlSerializer, provideRoutes, ɵROUTER_PROVIDERS as ROUTER_PROVIDERS, ɵflatten as flatten } from '@angular/router';
/**
 * @description
 *
 * Allows to simulate the loading of ng modules in tests.
 *
 * ```
 * const loader = TestBed.get(NgModuleFactoryLoader);
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
 *
 */
export class SpyNgModuleFactoryLoader {
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
    get stubbedModules() { return this._stubbedModules; }
    load(path) {
        if (this._stubbedModules[path]) {
            return this._stubbedModules[path];
        }
        else {
            return Promise.reject(new Error(`Cannot find module ${path}`));
        }
    }
}
SpyNgModuleFactoryLoader.ngInjectableDef = i0.defineInjectable({ token: SpyNgModuleFactoryLoader, factory: function SpyNgModuleFactoryLoader_Factory() { return new SpyNgModuleFactoryLoader(i0.inject(Compiler)); }, providedIn: null });
function isUrlHandlingStrategy(opts) {
    // This property check is needed because UrlHandlingStrategy is an interface and doesn't exist at
    // runtime.
    return 'shouldProcessUrl' in opts;
}
/**
 * Router setup factory function used for testing.
 *
 *
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
 *
 */
export class RouterTestingModule {
    static withRoutes(routes, config) {
        return {
            ngModule: RouterTestingModule,
            providers: [
                provideRoutes(routes),
                { provide: ROUTER_CONFIGURATION, useValue: config ? config : {} },
            ]
        };
    }
}
RouterTestingModule.ngModuleDef = i0.ɵdefineNgModule({ type: RouterTestingModule, bootstrap: [], declarations: [], imports: [], exports: [RouterModule] });
RouterTestingModule.ngInjectorDef = i0.defineInjector({ factory: function RouterTestingModule_Factory() { return new RouterTestingModule(); }, providers: [
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
    ], imports: [[RouterModule]] });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3Rlc3RpbmdfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3Rlc3Rpbmcvc3JjL3JvdXRlcl90ZXN0aW5nX21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxXQUFXLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQXVCLFFBQVEsRUFBbUIscUJBQXFCLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlJLE9BQU8sRUFBQyxzQkFBc0IsRUFBZ0IsWUFBWSxFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBUyxNQUFNLEVBQUUsWUFBWSxFQUFVLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUUsUUFBUSxJQUFJLE9BQU8sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBSXpSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBRUgsTUFBTTtJQXNCSixZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBckJ0Qzs7V0FFRztRQUNLLG9CQUFlLEdBQW9ELEVBQUUsQ0FBQztJQWtCckMsQ0FBQztJQWhCMUM7O09BRUc7SUFDSCxJQUFJLGNBQWMsQ0FBQyxPQUE4QjtRQUMvQyxNQUFNLEdBQUcsR0FBMEIsRUFBRSxDQUFDO1FBQ3RDLEtBQUssTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNwQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFB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cUIsRUFBRSxRQUFRLEVBQUUsUUFBUTtnQkFDMUYsTUFBTSxFQUFFLG9CQUFvQixFQUFFLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxRQUFRLEVBQUUsQ0FBQzthQUNwRTtTQUNGO1FBQ0QsRUFBQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBQyxFQUFFLGFBQWEsQ0FBQyxFQUFFLENBQUM7S0FDNUUsWUFiUSxDQUFDLFlBQVksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMb2NhdGlvbiwgTG9jYXRpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TW9ja0xvY2F0aW9uU3RyYXRlZ3ksIFNweUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24vdGVzdGluZyc7XG5pbXBvcnQge0NvbXBpbGVyLCBJbmplY3RhYmxlLCBJbmplY3RvciwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE5nTW9kdWxlRmFjdG9yeSwgTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NoaWxkcmVuT3V0bGV0Q29udGV4dHMsIEV4dHJhT3B0aW9ucywgTm9QcmVsb2FkaW5nLCBQcmVsb2FkaW5nU3RyYXRlZ3ksIFJPVVRFUl9DT05GSUdVUkFUSU9OLCBST1VURVMsIFJvdXRlLCBSb3V0ZXIsIFJvdXRlck1vZHVsZSwgUm91dGVzLCBVcmxIYW5kbGluZ1N0cmF0ZWd5LCBVcmxTZXJpYWxpemVyLCBwcm92aWRlUm91dGVzLCDJtVJPVVRFUl9QUk9WSURFUlMgYXMgUk9VVEVSX1BST1ZJREVSUywgybVmbGF0dGVuIGFzIGZsYXR0ZW59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIEFsbG93cyB0byBzaW11bGF0ZSB0aGUgbG9hZGluZyBvZiBuZyBtb2R1bGVzIGluIHRlc3RzLlxuICpcbiAqIGBgYFxuICogY29uc3QgbG9hZGVyID0gVGVzdEJlZC5nZXQoTmdNb2R1bGVGYWN0b3J5TG9hZGVyKTtcbiAqXG4gKiBAQ29tcG9uZW50KHt0ZW1wbGF0ZTogJ2xhenktbG9hZGVkJ30pXG4gKiBjbGFzcyBMYXp5TG9hZGVkQ29tcG9uZW50IHt9XG4gKiBATmdNb2R1bGUoe1xuICogICBkZWNsYXJhdGlvbnM6IFtMYXp5TG9hZGVkQ29tcG9uZW50XSxcbiAqICAgaW1wb3J0czogW1JvdXRlck1vZHVsZS5mb3JDaGlsZChbe3BhdGg6ICdsb2FkZWQnLCBjb21wb25lbnQ6IExhenlMb2FkZWRDb21wb25lbnR9XSldXG4gKiB9KVxuICpcbiAqIGNsYXNzIExvYWRlZE1vZHVsZSB7fVxuICpcbiAqIC8vIHNldHMgdXAgc3R1YmJlZE1vZHVsZXNcbiAqIGxvYWRlci5zdHViYmVkTW9kdWxlcyA9IHtsYXp5TW9kdWxlOiBMb2FkZWRNb2R1bGV9O1xuICpcbiAqIHJvdXRlci5yZXNldENvbmZpZyhbXG4gKiAgIHtwYXRoOiAnbGF6eScsIGxvYWRDaGlsZHJlbjogJ2xhenlNb2R1bGUnfSxcbiAqIF0pO1xuICpcbiAqIHJvdXRlci5uYXZpZ2F0ZUJ5VXJsKCcvbGF6eS9sb2FkZWQnKTtcbiAqIGBgYFxuICpcbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTcHlOZ01vZHVsZUZhY3RvcnlMb2FkZXIgaW1wbGVtZW50cyBOZ01vZHVsZUZhY3RvcnlMb2FkZXIge1xuICAvKipcbiAgICogQGRvY3NOb3RSZXF1aXJlZFxuICAgKi9cbiAgcHJpdmF0ZSBfc3R1YmJlZE1vZHVsZXM6IHtbcGF0aDogc3RyaW5nXTogUHJvbWlzZTxOZ01vZHVsZUZhY3Rvcnk8YW55Pj59ID0ge307XG5cbiAgLyoqXG4gICAqIEBkb2NzTm90UmVxdWlyZWRcbiAgICovXG4gIHNldCBzdHViYmVkTW9kdWxlcyhtb2R1bGVzOiB7W3BhdGg6IHN0cmluZ106IGFueX0pIHtcbiAgICBjb25zdCByZXM6IHtbcGF0aDogc3RyaW5nXTogYW55fSA9IHt9O1xuICAgIGZvciAoY29uc3QgdCBvZiBPYmplY3Qua2V5cyhtb2R1bGVzKSkge1xuICAgICAgcmVzW3RdID0gdGhpcy5jb21waWxlci5jb21waWxlTW9kdWxlQXN5bmMobW9kdWxlc1t0XSk7XG4gICAgfVxuICAgIHRoaXMuX3N0dWJiZWRNb2R1bGVzID0gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkb2NzTm90UmVxdWlyZWRcbiAgICovXG4gIGdldCBzdHViYmVkTW9kdWxlcygpOiB7W3BhdGg6IHN0cmluZ106IGFueX0geyByZXR1cm4gdGhpcy5fc3R1YmJlZE1vZHVsZXM7IH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBpbGVyOiBDb21waWxlcikge31cblxuICBsb2FkKHBhdGg6IHN0cmluZyk6IFByb21pc2U8TmdNb2R1bGVGYWN0b3J5PGFueT4+IHtcbiAgICBpZiAodGhpcy5fc3R1YmJlZE1vZHVsZXNbcGF0aF0pIHtcbiAgICAgIHJldHVybiB0aGlzLl9zdHViYmVkTW9kdWxlc1twYXRoXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDxhbnk+UHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGBDYW5ub3QgZmluZCBtb2R1bGUgJHtwYXRofWApKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNVcmxIYW5kbGluZ1N0cmF0ZWd5KG9wdHM6IEV4dHJhT3B0aW9ucyB8IFVybEhhbmRsaW5nU3RyYXRlZ3kpOlxuICAgIG9wdHMgaXMgVXJsSGFuZGxpbmdTdHJhdGVneSB7XG4gIC8vIFRoaXMgcHJvcGVydHkgY2hlY2sgaXMgbmVlZGVkIGJlY2F1c2UgVXJsSGFuZGxpbmdTdHJhdGVneSBpcyBhbiBpbnRlcmZhY2UgYW5kIGRvZXNuJ3QgZXhpc3QgYXRcbiAgLy8gcnVudGltZS5cbiAgcmV0dXJuICdzaG91bGRQcm9jZXNzVXJsJyBpbiBvcHRzO1xufVxuXG4vKipcbiAqIFJvdXRlciBzZXR1cCBmYWN0b3J5IGZ1bmN0aW9uIHVzZWQgZm9yIHRlc3RpbmcuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldHVwVGVzdGluZ1JvdXRlcihcbiAgICB1cmxTZXJpYWxpemVyOiBVcmxTZXJpYWxpemVyLCBjb250ZXh0czogQ2hpbGRyZW5PdXRsZXRDb250ZXh0cywgbG9jYXRpb246IExvY2F0aW9uLFxuICAgIGxvYWRlcjogTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCBjb21waWxlcjogQ29tcGlsZXIsIGluamVjdG9yOiBJbmplY3Rvciwgcm91dGVzOiBSb3V0ZVtdW10sXG4gICAgb3B0cz86IEV4dHJhT3B0aW9ucywgdXJsSGFuZGxpbmdTdHJhdGVneT86IFVybEhhbmRsaW5nU3RyYXRlZ3kpOiBSb3V0ZXI7XG5cbi8qKlxuICogUm91dGVyIHNldHVwIGZhY3RvcnkgZnVuY3Rpb24gdXNlZCBmb3IgdGVzdGluZy5cbiAqXG4gKiBAZGVwcmVjYXRlZCBBcyBvZiB2NS4yLiBUaGUgMm5kLXRvLWxhc3QgYXJndW1lbnQgc2hvdWxkIGJlIGBFeHRyYU9wdGlvbnNgLCBub3RcbiAqIGBVcmxIYW5kbGluZ1N0cmF0ZWd5YFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBUZXN0aW5nUm91dGVyKFxuICAgIHVybFNlcmlhbGl6ZXI6IFVybFNlcmlhbGl6ZXIsIGNvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzLCBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgbG9hZGVyOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIGNvbXBpbGVyOiBDb21waWxlciwgaW5qZWN0b3I6IEluamVjdG9yLCByb3V0ZXM6IFJvdXRlW11bXSxcbiAgICB1cmxIYW5kbGluZ1N0cmF0ZWd5PzogVXJsSGFuZGxpbmdTdHJhdGVneSk6IFJvdXRlcjtcblxuLyoqXG4gKiBSb3V0ZXIgc2V0dXAgZmFjdG9yeSBmdW5jdGlvbiB1c2VkIGZvciB0ZXN0aW5nLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFRlc3RpbmdSb3V0ZXIoXG4gICAgdXJsU2VyaWFsaXplcjogVXJsU2VyaWFsaXplciwgY29udGV4dHM6IENoaWxkcmVuT3V0bGV0Q29udGV4dHMsIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICBsb2FkZXI6IE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgY29tcGlsZXI6IENvbXBpbGVyLCBpbmplY3RvcjogSW5qZWN0b3IsIHJvdXRlczogUm91dGVbXVtdLFxuICAgIG9wdHM/OiBFeHRyYU9wdGlvbnMgfCBVcmxIYW5kbGluZ1N0cmF0ZWd5LCB1cmxIYW5kbGluZ1N0cmF0ZWd5PzogVXJsSGFuZGxpbmdTdHJhdGVneSkge1xuICBjb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKFxuICAgICAgbnVsbCAhLCB1cmxTZXJpYWxpemVyLCBjb250ZXh0cywgbG9jYXRpb24sIGluamVjdG9yLCBsb2FkZXIsIGNvbXBpbGVyLCBmbGF0dGVuKHJvdXRlcykpO1xuICBpZiAob3B0cykge1xuICAgIC8vIEhhbmRsZSBkZXByZWNhdGVkIGFyZ3VtZW50IG9yZGVyaW5nLlxuICAgIGlmIChpc1VybEhhbmRsaW5nU3RyYXRlZ3kob3B0cykpIHtcbiAgICAgIHJvdXRlci51cmxIYW5kbGluZ1N0cmF0ZWd5ID0gb3B0cztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSGFuZGxlIEV4dHJhT3B0aW9uc1xuXG4gICAgICBpZiAob3B0cy5tYWxmb3JtZWRVcmlFcnJvckhhbmRsZXIpIHtcbiAgICAgICAgcm91dGVyLm1hbGZvcm1lZFVyaUVycm9ySGFuZGxlciA9IG9wdHMubWFsZm9ybWVkVXJpRXJyb3JIYW5kbGVyO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0cy5wYXJhbXNJbmhlcml0YW5jZVN0cmF0ZWd5KSB7XG4gICAgICAgIHJvdXRlci5wYXJhbXNJbmhlcml0YW5jZVN0cmF0ZWd5ID0gb3B0cy5wYXJhbXNJbmhlcml0YW5jZVN0cmF0ZWd5O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICh1cmxIYW5kbGluZ1N0cmF0ZWd5KSB7XG4gICAgcm91dGVyLnVybEhhbmRsaW5nU3RyYXRlZ3kgPSB1cmxIYW5kbGluZ1N0cmF0ZWd5O1xuICB9XG4gIHJldHVybiByb3V0ZXI7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogU2V0cyB1cCB0aGUgcm91dGVyIHRvIGJlIHVzZWQgZm9yIHRlc3RpbmcuXG4gKlxuICogVGhlIG1vZHVsZXMgc2V0cyB1cCB0aGUgcm91dGVyIHRvIGJlIHVzZWQgZm9yIHRlc3RpbmcuXG4gKiBJdCBwcm92aWRlcyBzcHkgaW1wbGVtZW50YXRpb25zIG9mIGBMb2NhdGlvbmAsIGBMb2NhdGlvblN0cmF0ZWd5YCwgYW5kIHtAbGlua1xuICogTmdNb2R1bGVGYWN0b3J5TG9hZGVyfS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogYmVmb3JlRWFjaCgoKSA9PiB7XG4gKiAgIFRlc3RCZWQuY29uZmlndXJlVGVzdE1vZHVsZSh7XG4gKiAgICAgaW1wb3J0czogW1xuICogICAgICAgUm91dGVyVGVzdGluZ01vZHVsZS53aXRoUm91dGVzKFxuICogICAgICAgICBbe3BhdGg6ICcnLCBjb21wb25lbnQ6IEJsYW5rQ21wfSwge3BhdGg6ICdzaW1wbGUnLCBjb21wb25lbnQ6IFNpbXBsZUNtcH1dXG4gKiAgICAgICApXG4gKiAgICAgXVxuICogICB9KTtcbiAqIH0pO1xuICogYGBgXG4gKlxuICpcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW1JvdXRlck1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIFJPVVRFUl9QUk9WSURFUlMsIHtwcm92aWRlOiBMb2NhdGlvbiwgdXNlQ2xhc3M6IFNweUxvY2F0aW9ufSxcbiAgICB7cHJvdmlkZTogTG9jYXRpb25TdHJhdGVneSwgdXNlQ2xhc3M6IE1vY2tMb2NhdGlvblN0cmF0ZWd5fSxcbiAgICB7cHJvdmlkZTogTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCB1c2VDbGFzczogU3B5TmdNb2R1bGVGYWN0b3J5TG9hZGVyfSwge1xuICAgICAgcHJvdmlkZTogUm91dGVyLFxuICAgICAgdXNlRmFjdG9yeTogc2V0dXBUZXN0aW5nUm91dGVyLFxuICAgICAgZGVwczogW1xuICAgICAgICBVcmxTZXJpYWxpemVyLCBDaGlsZHJlbk91dGxldENvbnRleHRzLCBMb2NhdGlvbiwgTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCBDb21waWxlciwgSW5qZWN0b3IsXG4gICAgICAgIFJPVVRFUywgUk9VVEVSX0NPTkZJR1VSQVRJT04sIFtVcmxIYW5kbGluZ1N0cmF0ZWd5LCBuZXcgT3B0aW9uYWwoKV1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtwcm92aWRlOiBQcmVsb2FkaW5nU3RyYXRlZ3ksIHVzZUV4aXN0aW5nOiBOb1ByZWxvYWRpbmd9LCBwcm92aWRlUm91dGVzKFtdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFJvdXRlclRlc3RpbmdNb2R1bGUge1xuICBzdGF0aWMgd2l0aFJvdXRlcyhyb3V0ZXM6IFJvdXRlcywgY29uZmlnPzogRXh0cmFPcHRpb25zKTpcbiAgICAgIE1vZHVsZVdpdGhQcm92aWRlcnM8Um91dGVyVGVzdGluZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogUm91dGVyVGVzdGluZ01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBwcm92aWRlUm91dGVzKHJvdXRlcyksXG4gICAgICAgIHtwcm92aWRlOiBST1VURVJfQ09ORklHVVJBVElPTiwgdXNlVmFsdWU6IGNvbmZpZyA/IGNvbmZpZyA6IHt9fSxcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=