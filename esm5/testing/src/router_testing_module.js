import * as tslib_1 from "tslib";
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
import * as i0 from "@angular/core";
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
var SpyNgModuleFactoryLoader = /** @class */ (function () {
    function SpyNgModuleFactoryLoader(compiler) {
        this.compiler = compiler;
        /**
         * @docsNotRequired
         */
        this._stubbedModules = {};
    }
    Object.defineProperty(SpyNgModuleFactoryLoader.prototype, "stubbedModules", {
        /**
         * @docsNotRequired
         */
        get: function () { return this._stubbedModules; },
        /**
         * @docsNotRequired
         */
        set: function (modules) {
            var e_1, _a;
            var res = {};
            try {
                for (var _b = tslib_1.__values(Object.keys(modules)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var t = _c.value;
                    res[t] = this.compiler.compileModuleAsync(modules[t]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this._stubbedModules = res;
        },
        enumerable: true,
        configurable: true
    });
    SpyNgModuleFactoryLoader.prototype.load = function (path) {
        if (this._stubbedModules[path]) {
            return this._stubbedModules[path];
        }
        else {
            return Promise.reject(new Error("Cannot find module " + path));
        }
    };
    SpyNgModuleFactoryLoader.ngInjectableDef = i0.defineInjectable({ token: SpyNgModuleFactoryLoader, factory: function SpyNgModuleFactoryLoader_Factory(t) { return new (t || SpyNgModuleFactoryLoader)(i0.inject(Compiler)); }, providedIn: null });
    return SpyNgModuleFactoryLoader;
}());
export { SpyNgModuleFactoryLoader };
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
    var router = new Router(null, urlSerializer, contexts, location, injector, loader, compiler, flatten(routes));
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
var RouterTestingModule = /** @class */ (function () {
    function RouterTestingModule() {
    }
    RouterTestingModule.withRoutes = function (routes, config) {
        return {
            ngModule: RouterTestingModule,
            providers: [
                provideRoutes(routes),
                { provide: ROUTER_CONFIGURATION, useValue: config ? config : {} },
            ]
        };
    };
    RouterTestingModule.ngModuleDef = i0.ɵdefineNgModule({ type: RouterTestingModule, bootstrap: [], declarations: [], imports: [], exports: [RouterModule] });
    RouterTestingModule.ngInjectorDef = i0.defineInjector({ factory: function RouterTestingModule_Factory(t) { return new (t || RouterTestingModule)(); }, providers: [
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
    return RouterTestingModule;
}());
export { RouterTestingModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3Rlc3RpbmdfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3Rlc3Rpbmcvc3JjL3JvdXRlcl90ZXN0aW5nX21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxXQUFXLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQXVCLFFBQVEsRUFBbUIscUJBQXFCLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlJLE9BQU8sRUFBQyxzQkFBc0IsRUFBZ0IsWUFBWSxFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBUyxNQUFNLEVBQUUsWUFBWSxFQUFVLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUUsUUFBUSxJQUFJLE9BQU8sRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQUl6Ujs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNIO0lBdUJFLGtDQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBckJ0Qzs7V0FFRztRQUNLLG9CQUFlLEdBQW9ELEVBQUUsQ0FBQztJQWtCckMsQ0FBQztJQWIxQyxzQkFBSSxvREFBYztRQVFsQjs7V0FFRzthQUNILGNBQThDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFkNUU7O1dBRUc7YUFDSCxVQUFtQixPQUE4Qjs7WUFDL0MsSUFBTSxHQUFHLEdBQTBCLEVBQUUsQ0FBQzs7Z0JBQ3RDLEtBQWdCLElBQUEsS0FBQSxpQkFB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QUU7Z0JBQ3BFLE9BQU8sRUFBRSxNQUFNO2dCQUNmLFVBQVUsRUFBRSxrQkFBa0I7Z0JBQzlCLElBQUksRUFBRTtvQkFDSixhQUFhLEVBQUUsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxRQUFRO29CQUMxRixNQUFNLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLFFBQVEsRUFBRSxDQUFDO2lCQUNwRTthQUNGO1lBQ0QsRUFBQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBQyxFQUFFLGFBQWEsQ0FBQyxFQUFFLENBQUM7U0FDNUUsWUFiUSxDQUFDLFlBQVksQ0FBQzs4QkF0S3pCO0NBZ01DLEFBM0JELElBMkJDO1NBWFksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0xvY2F0aW9uLCBMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtNb2NrTG9jYXRpb25TdHJhdGVneSwgU3B5TG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi90ZXN0aW5nJztcbmltcG9ydCB7Q29tcGlsZXIsIEluamVjdGFibGUsIEluamVjdG9yLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgTmdNb2R1bGVGYWN0b3J5LCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2hpbGRyZW5PdXRsZXRDb250ZXh0cywgRXh0cmFPcHRpb25zLCBOb1ByZWxvYWRpbmcsIFByZWxvYWRpbmdTdHJhdGVneSwgUk9VVEVSX0NPTkZJR1VSQVRJT04sIFJPVVRFUywgUm91dGUsIFJvdXRlciwgUm91dGVyTW9kdWxlLCBSb3V0ZXMsIFVybEhhbmRsaW5nU3RyYXRlZ3ksIFVybFNlcmlhbGl6ZXIsIHByb3ZpZGVSb3V0ZXMsIMm1Uk9VVEVSX1BST1ZJREVSUyBhcyBST1VURVJfUFJPVklERVJTLCDJtWZsYXR0ZW4gYXMgZmxhdHRlbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuXG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogQWxsb3dzIHRvIHNpbXVsYXRlIHRoZSBsb2FkaW5nIG9mIG5nIG1vZHVsZXMgaW4gdGVzdHMuXG4gKlxuICogYGBgXG4gKiBjb25zdCBsb2FkZXIgPSBUZXN0QmVkLmdldChOZ01vZHVsZUZhY3RvcnlMb2FkZXIpO1xuICpcbiAqIEBDb21wb25lbnQoe3RlbXBsYXRlOiAnbGF6eS1sb2FkZWQnfSlcbiAqIGNsYXNzIExhenlMb2FkZWRDb21wb25lbnQge31cbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGRlY2xhcmF0aW9uczogW0xhenlMb2FkZWRDb21wb25lbnRdLFxuICogICBpbXBvcnRzOiBbUm91dGVyTW9kdWxlLmZvckNoaWxkKFt7cGF0aDogJ2xvYWRlZCcsIGNvbXBvbmVudDogTGF6eUxvYWRlZENvbXBvbmVudH1dKV1cbiAqIH0pXG4gKlxuICogY2xhc3MgTG9hZGVkTW9kdWxlIHt9XG4gKlxuICogLy8gc2V0cyB1cCBzdHViYmVkTW9kdWxlc1xuICogbG9hZGVyLnN0dWJiZWRNb2R1bGVzID0ge2xhenlNb2R1bGU6IExvYWRlZE1vZHVsZX07XG4gKlxuICogcm91dGVyLnJlc2V0Q29uZmlnKFtcbiAqICAge3BhdGg6ICdsYXp5JywgbG9hZENoaWxkcmVuOiAnbGF6eU1vZHVsZSd9LFxuICogXSk7XG4gKlxuICogcm91dGVyLm5hdmlnYXRlQnlVcmwoJy9sYXp5L2xvYWRlZCcpO1xuICogYGBgXG4gKlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNweU5nTW9kdWxlRmFjdG9yeUxvYWRlciBpbXBsZW1lbnRzIE5nTW9kdWxlRmFjdG9yeUxvYWRlciB7XG4gIC8qKlxuICAgKiBAZG9jc05vdFJlcXVpcmVkXG4gICAqL1xuICBwcml2YXRlIF9zdHViYmVkTW9kdWxlczoge1twYXRoOiBzdHJpbmddOiBQcm9taXNlPE5nTW9kdWxlRmFjdG9yeTxhbnk+Pn0gPSB7fTtcblxuICAvKipcbiAgICogQGRvY3NOb3RSZXF1aXJlZFxuICAgKi9cbiAgc2V0IHN0dWJiZWRNb2R1bGVzKG1vZHVsZXM6IHtbcGF0aDogc3RyaW5nXTogYW55fSkge1xuICAgIGNvbnN0IHJlczoge1twYXRoOiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgZm9yIChjb25zdCB0IG9mIE9iamVjdC5rZXlzKG1vZHVsZXMpKSB7XG4gICAgICByZXNbdF0gPSB0aGlzLmNvbXBpbGVyLmNvbXBpbGVNb2R1bGVBc3luYyhtb2R1bGVzW3RdKTtcbiAgICB9XG4gICAgdGhpcy5fc3R1YmJlZE1vZHVsZXMgPSByZXM7XG4gIH1cblxuICAvKipcbiAgICogQGRvY3NOb3RSZXF1aXJlZFxuICAgKi9cbiAgZ2V0IHN0dWJiZWRNb2R1bGVzKCk6IHtbcGF0aDogc3RyaW5nXTogYW55fSB7IHJldHVybiB0aGlzLl9zdHViYmVkTW9kdWxlczsgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcGlsZXI6IENvbXBpbGVyKSB7fVxuXG4gIGxvYWQocGF0aDogc3RyaW5nKTogUHJvbWlzZTxOZ01vZHVsZUZhY3Rvcnk8YW55Pj4ge1xuICAgIGlmICh0aGlzLl9zdHViYmVkTW9kdWxlc1twYXRoXSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3N0dWJiZWRNb2R1bGVzW3BhdGhdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gPGFueT5Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYENhbm5vdCBmaW5kIG1vZHVsZSAke3BhdGh9YCkpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc1VybEhhbmRsaW5nU3RyYXRlZ3kob3B0czogRXh0cmFPcHRpb25zIHwgVXJsSGFuZGxpbmdTdHJhdGVneSk6XG4gICAgb3B0cyBpcyBVcmxIYW5kbGluZ1N0cmF0ZWd5IHtcbiAgLy8gVGhpcyBwcm9wZXJ0eSBjaGVjayBpcyBuZWVkZWQgYmVjYXVzZSBVcmxIYW5kbGluZ1N0cmF0ZWd5IGlzIGFuIGludGVyZmFjZSBhbmQgZG9lc24ndCBleGlzdCBhdFxuICAvLyBydW50aW1lLlxuICByZXR1cm4gJ3Nob3VsZFByb2Nlc3NVcmwnIGluIG9wdHM7XG59XG5cbi8qKlxuICogUm91dGVyIHNldHVwIGZhY3RvcnkgZnVuY3Rpb24gdXNlZCBmb3IgdGVzdGluZy5cbiAqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBUZXN0aW5nUm91dGVyKFxuICAgIHVybFNlcmlhbGl6ZXI6IFVybFNlcmlhbGl6ZXIsIGNvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzLCBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgbG9hZGVyOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIGNvbXBpbGVyOiBDb21waWxlciwgaW5qZWN0b3I6IEluamVjdG9yLCByb3V0ZXM6IFJvdXRlW11bXSxcbiAgICBvcHRzPzogRXh0cmFPcHRpb25zLCB1cmxIYW5kbGluZ1N0cmF0ZWd5PzogVXJsSGFuZGxpbmdTdHJhdGVneSk6IFJvdXRlcjtcblxuLyoqXG4gKiBSb3V0ZXIgc2V0dXAgZmFjdG9yeSBmdW5jdGlvbiB1c2VkIGZvciB0ZXN0aW5nLlxuICpcbiAqIEBkZXByZWNhdGVkIEFzIG9mIHY1LjIuIFRoZSAybmQtdG8tbGFzdCBhcmd1bWVudCBzaG91bGQgYmUgYEV4dHJhT3B0aW9uc2AsIG5vdFxuICogYFVybEhhbmRsaW5nU3RyYXRlZ3lgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFRlc3RpbmdSb3V0ZXIoXG4gICAgdXJsU2VyaWFsaXplcjogVXJsU2VyaWFsaXplciwgY29udGV4dHM6IENoaWxkcmVuT3V0bGV0Q29udGV4dHMsIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICBsb2FkZXI6IE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgY29tcGlsZXI6IENvbXBpbGVyLCBpbmplY3RvcjogSW5qZWN0b3IsIHJvdXRlczogUm91dGVbXVtdLFxuICAgIHVybEhhbmRsaW5nU3RyYXRlZ3k/OiBVcmxIYW5kbGluZ1N0cmF0ZWd5KTogUm91dGVyO1xuXG4vKipcbiAqIFJvdXRlciBzZXR1cCBmYWN0b3J5IGZ1bmN0aW9uIHVzZWQgZm9yIHRlc3RpbmcuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldHVwVGVzdGluZ1JvdXRlcihcbiAgICB1cmxTZXJpYWxpemVyOiBVcmxTZXJpYWxpemVyLCBjb250ZXh0czogQ2hpbGRyZW5PdXRsZXRDb250ZXh0cywgbG9jYXRpb246IExvY2F0aW9uLFxuICAgIGxvYWRlcjogTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCBjb21waWxlcjogQ29tcGlsZXIsIGluamVjdG9yOiBJbmplY3Rvciwgcm91dGVzOiBSb3V0ZVtdW10sXG4gICAgb3B0cz86IEV4dHJhT3B0aW9ucyB8IFVybEhhbmRsaW5nU3RyYXRlZ3ksIHVybEhhbmRsaW5nU3RyYXRlZ3k/OiBVcmxIYW5kbGluZ1N0cmF0ZWd5KSB7XG4gIGNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIoXG4gICAgICBudWxsICEsIHVybFNlcmlhbGl6ZXIsIGNvbnRleHRzLCBsb2NhdGlvbiwgaW5qZWN0b3IsIGxvYWRlciwgY29tcGlsZXIsIGZsYXR0ZW4ocm91dGVzKSk7XG4gIGlmIChvcHRzKSB7XG4gICAgLy8gSGFuZGxlIGRlcHJlY2F0ZWQgYXJndW1lbnQgb3JkZXJpbmcuXG4gICAgaWYgKGlzVXJsSGFuZGxpbmdTdHJhdGVneShvcHRzKSkge1xuICAgICAgcm91dGVyLnVybEhhbmRsaW5nU3RyYXRlZ3kgPSBvcHRzO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBIYW5kbGUgRXh0cmFPcHRpb25zXG5cbiAgICAgIGlmIChvcHRzLm1hbGZvcm1lZFVyaUVycm9ySGFuZGxlcikge1xuICAgICAgICByb3V0ZXIubWFsZm9ybWVkVXJpRXJyb3JIYW5kbGVyID0gb3B0cy5tYWxmb3JtZWRVcmlFcnJvckhhbmRsZXI7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRzLnBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3kpIHtcbiAgICAgICAgcm91dGVyLnBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3kgPSBvcHRzLnBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3k7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHVybEhhbmRsaW5nU3RyYXRlZ3kpIHtcbiAgICByb3V0ZXIudXJsSGFuZGxpbmdTdHJhdGVneSA9IHVybEhhbmRsaW5nU3RyYXRlZ3k7XG4gIH1cbiAgcmV0dXJuIHJvdXRlcjtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBTZXRzIHVwIHRoZSByb3V0ZXIgdG8gYmUgdXNlZCBmb3IgdGVzdGluZy5cbiAqXG4gKiBUaGUgbW9kdWxlcyBzZXRzIHVwIHRoZSByb3V0ZXIgdG8gYmUgdXNlZCBmb3IgdGVzdGluZy5cbiAqIEl0IHByb3ZpZGVzIHNweSBpbXBsZW1lbnRhdGlvbnMgb2YgYExvY2F0aW9uYCwgYExvY2F0aW9uU3RyYXRlZ3lgLCBhbmQge0BsaW5rXG4gKiBOZ01vZHVsZUZhY3RvcnlMb2FkZXJ9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBiZWZvcmVFYWNoKCgpID0+IHtcbiAqICAgVGVzdEJlZC5jb25maWd1cmVUZXN0TW9kdWxlKHtcbiAqICAgICBpbXBvcnRzOiBbXG4gKiAgICAgICBSb3V0ZXJUZXN0aW5nTW9kdWxlLndpdGhSb3V0ZXMoXG4gKiAgICAgICAgIFt7cGF0aDogJycsIGNvbXBvbmVudDogQmxhbmtDbXB9LCB7cGF0aDogJ3NpbXBsZScsIGNvbXBvbmVudDogU2ltcGxlQ21wfV1cbiAqICAgICAgIClcbiAqICAgICBdXG4gKiAgIH0pO1xuICogfSk7XG4gKiBgYGBcbiAqXG4gKlxuICovXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbUm91dGVyTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgUk9VVEVSX1BST1ZJREVSUywge3Byb3ZpZGU6IExvY2F0aW9uLCB1c2VDbGFzczogU3B5TG9jYXRpb259LFxuICAgIHtwcm92aWRlOiBMb2NhdGlvblN0cmF0ZWd5LCB1c2VDbGFzczogTW9ja0xvY2F0aW9uU3RyYXRlZ3l9LFxuICAgIHtwcm92aWRlOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIHVzZUNsYXNzOiBTcHlOZ01vZHVsZUZhY3RvcnlMb2FkZXJ9LCB7XG4gICAgICBwcm92aWRlOiBSb3V0ZXIsXG4gICAgICB1c2VGYWN0b3J5OiBzZXR1cFRlc3RpbmdSb3V0ZXIsXG4gICAgICBkZXBzOiBbXG4gICAgICAgIFVybFNlcmlhbGl6ZXIsIENoaWxkcmVuT3V0bGV0Q29udGV4dHMsIExvY2F0aW9uLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIENvbXBpbGVyLCBJbmplY3RvcixcbiAgICAgICAgUk9VVEVTLCBST1VURVJfQ09ORklHVVJBVElPTiwgW1VybEhhbmRsaW5nU3RyYXRlZ3ksIG5ldyBPcHRpb25hbCgpXVxuICAgICAgXVxuICAgIH0sXG4gICAge3Byb3ZpZGU6IFByZWxvYWRpbmdTdHJhdGVneSwgdXNlRXhpc3Rpbmc6IE5vUHJlbG9hZGluZ30sIHByb3ZpZGVSb3V0ZXMoW10pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUm91dGVyVGVzdGluZ01vZHVsZSB7XG4gIHN0YXRpYyB3aXRoUm91dGVzKHJvdXRlczogUm91dGVzLCBjb25maWc/OiBFeHRyYU9wdGlvbnMpOlxuICAgICAgTW9kdWxlV2l0aFByb3ZpZGVyczxSb3V0ZXJUZXN0aW5nTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBSb3V0ZXJUZXN0aW5nTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHByb3ZpZGVSb3V0ZXMocm91dGVzKSxcbiAgICAgICAge3Byb3ZpZGU6IFJPVVRFUl9DT05GSUdVUkFUSU9OLCB1c2VWYWx1ZTogY29uZmlnID8gY29uZmlnIDoge319LFxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==