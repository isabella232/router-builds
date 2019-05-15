/**
 * @license Angular v8.0.0-rc.0+189.sha-3a8f74e.with-local-changes
 * (c) 2010-2019 Google LLC. https://angular.io/
 * License: MIT
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/common/testing'), require('@angular/core'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('@angular/router/testing', ['exports', '@angular/common', '@angular/common/testing', '@angular/core', '@angular/router'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.router = global.ng.router || {}, global.ng.router.testing = {}), global.ng.common, global.ng.common.testing, global.ng.core, global.ng.router));
}(this, function (exports, common, testing, i0, router) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

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
     * @publicApi
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
                    for (var _b = __values(Object.keys(modules)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        SpyNgModuleFactoryLoader.ngInjectableDef = i0.ΔdefineInjectable({ token: SpyNgModuleFactoryLoader, factory: function SpyNgModuleFactoryLoader_Factory(t) { return new (t || SpyNgModuleFactoryLoader)(i0.Δinject(i0.Compiler)); }, providedIn: null });
        return SpyNgModuleFactoryLoader;
    }());
    /*@__PURE__*/ i0.ɵsetClassMetadata(SpyNgModuleFactoryLoader, [{
            type: i0.Injectable
        }], function () { return [{ type: i0.Compiler }]; }, null);
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
    function setupTestingRouter(urlSerializer, contexts, location, loader, compiler, injector, routes, opts, urlHandlingStrategy) {
        var router$1 = new router.Router(null, urlSerializer, contexts, location, injector, loader, compiler, router.ɵflatten(routes));
        if (opts) {
            // Handle deprecated argument ordering.
            if (isUrlHandlingStrategy(opts)) {
                router$1.urlHandlingStrategy = opts;
            }
            else {
                // Handle ExtraOptions
                if (opts.malformedUriErrorHandler) {
                    router$1.malformedUriErrorHandler = opts.malformedUriErrorHandler;
                }
                if (opts.paramsInheritanceStrategy) {
                    router$1.paramsInheritanceStrategy = opts.paramsInheritanceStrategy;
                }
            }
        }
        if (urlHandlingStrategy) {
            router$1.urlHandlingStrategy = urlHandlingStrategy;
        }
        return router$1;
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
    var RouterTestingModule = /** @class */ (function () {
        function RouterTestingModule() {
        }
        RouterTestingModule.withRoutes = function (routes, config) {
            return {
                ngModule: RouterTestingModule,
                providers: [
                    router.provideRoutes(routes),
                    { provide: router.ROUTER_CONFIGURATION, useValue: config ? config : {} },
                ]
            };
        };
        RouterTestingModule.ngModuleDef = i0.ΔdefineNgModule({ type: RouterTestingModule });
        RouterTestingModule.ngInjectorDef = i0.ΔdefineInjector({ factory: function RouterTestingModule_Factory(t) { return new (t || RouterTestingModule)(); }, providers: [
                router.ɵROUTER_PROVIDERS, { provide: common.Location, useClass: testing.SpyLocation },
                { provide: common.LocationStrategy, useClass: testing.MockLocationStrategy },
                { provide: i0.NgModuleFactoryLoader, useClass: SpyNgModuleFactoryLoader }, {
                    provide: router.Router,
                    useFactory: setupTestingRouter,
                    deps: [
                        router.UrlSerializer, router.ChildrenOutletContexts, common.Location, i0.NgModuleFactoryLoader, i0.Compiler, i0.Injector,
                        router.ROUTES, router.ROUTER_CONFIGURATION, [router.UrlHandlingStrategy, new i0.Optional()]
                    ]
                },
                { provide: router.PreloadingStrategy, useExisting: router.NoPreloading }, router.provideRoutes([])
            ], imports: [router.RouterModule] });
        return RouterTestingModule;
    }());
    /*@__PURE__*/ i0.ΔsetNgModuleScope(RouterTestingModule, { exports: [router.RouterModule] });
    /*@__PURE__*/ i0.ɵsetClassMetadata(RouterTestingModule, [{
            type: i0.NgModule,
            args: [{
                    exports: [router.RouterModule],
                    providers: [
                        router.ɵROUTER_PROVIDERS, { provide: common.Location, useClass: testing.SpyLocation },
                        { provide: common.LocationStrategy, useClass: testing.MockLocationStrategy },
                        { provide: i0.NgModuleFactoryLoader, useClass: SpyNgModuleFactoryLoader }, {
                            provide: router.Router,
                            useFactory: setupTestingRouter,
                            deps: [
                                router.UrlSerializer, router.ChildrenOutletContexts, common.Location, i0.NgModuleFactoryLoader, i0.Compiler, i0.Injector,
                                router.ROUTES, router.ROUTER_CONFIGURATION, [router.UrlHandlingStrategy, new i0.Optional()]
                            ]
                        },
                        { provide: router.PreloadingStrategy, useExisting: router.NoPreloading }, router.provideRoutes([])
                    ]
                }]
        }], null, null);

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // This file only reexports content of the `src` folder. Keep it that way.

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    exports.SpyNgModuleFactoryLoader = SpyNgModuleFactoryLoader;
    exports.setupTestingRouter = setupTestingRouter;
    exports.RouterTestingModule = RouterTestingModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=router-testing.umd.js.map
