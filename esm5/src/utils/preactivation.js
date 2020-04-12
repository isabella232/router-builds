/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { equalParamsAndUrlSegments } from '../router_state';
import { equalPath } from '../url_tree';
import { forEach, shallowEqual } from '../utils/collection';
import { nodeChildrenAsMap } from '../utils/tree';
var CanActivate = /** @class */ (function () {
    function CanActivate(path) {
        this.path = path;
        this.route = this.path[this.path.length - 1];
    }
    return CanActivate;
}());
export { CanActivate };
var CanDeactivate = /** @class */ (function () {
    function CanDeactivate(component, route) {
        this.component = component;
        this.route = route;
    }
    return CanDeactivate;
}());
export { CanDeactivate };
export function getAllRouteGuards(future, curr, parentContexts) {
    var futureRoot = future._root;
    var currRoot = curr ? curr._root : null;
    return getChildRouteGuards(futureRoot, currRoot, parentContexts, [futureRoot.value]);
}
export function getCanActivateChild(p) {
    var canActivateChild = p.routeConfig ? p.routeConfig.canActivateChild : null;
    if (!canActivateChild || canActivateChild.length === 0)
        return null;
    return { node: p, guards: canActivateChild };
}
export function getToken(token, snapshot, moduleInjector) {
    var config = getClosestLoadedConfig(snapshot);
    var injector = config ? config.module.injector : moduleInjector;
    return injector.get(token);
}
function getClosestLoadedConfig(snapshot) {
    if (!snapshot)
        return null;
    for (var s = snapshot.parent; s; s = s.parent) {
        var route = s.routeConfig;
        if (route && route._loadedConfig)
            return route._loadedConfig;
    }
    return null;
}
function getChildRouteGuards(futureNode, currNode, contexts, futurePath, checks) {
    if (checks === void 0) { checks = {
        canDeactivateChecks: [],
        canActivateChecks: []
    }; }
    var prevChildren = nodeChildrenAsMap(currNode);
    // Process the children of the future route
    futureNode.children.forEach(function (c) {
        getRouteGuards(c, prevChildren[c.value.outlet], contexts, futurePath.concat([c.value]), checks);
        delete prevChildren[c.value.outlet];
    });
    // Process any children left from the current route (not active for the future route)
    forEach(prevChildren, function (v, k) {
        return deactivateRouteAndItsChildren(v, contexts.getContext(k), contexts, checks);
    });
    return checks;
}
function getRouteGuards(futureNode, currNode, parentContexts, futurePath, checks) {
    if (checks === void 0) { checks = {
        canDeactivateChecks: [],
        canActivateChecks: []
    }; }
    var future = futureNode.value;
    var curr = currNode ? currNode.value : null;
    var context = parentContexts ? parentContexts.getContext(futureNode.value.outlet) : null;
    // reusing the node
    if (curr && future.routeConfig === curr.routeConfig) {
        var shouldRun = shouldRunGuardsAndResolvers(curr, future, future.routeConfig.runGuardsAndResolvers);
        if (shouldRun) {
            checks.canActivateChecks.push(new CanActivate(futurePath));
        }
        else {
            // we need to set the data
            future.data = curr.data;
            future._resolvedData = curr._resolvedData;
        }
        // If we have a component, we need to go through an outlet.
        if (future.component) {
            getChildRouteGuards(futureNode, currNode, context ? context.children : null, futurePath, checks);
            // if we have a componentless route, we recurse but keep the same outlet map.
        }
        else {
            getChildRouteGuards(futureNode, currNode, parentContexts, futurePath, checks);
        }
        if (shouldRun) {
            var component = context && context.outlet && context.outlet.component || null;
            checks.canDeactivateChecks.push(new CanDeactivate(component, curr));
        }
    }
    else {
        if (curr) {
            deactivateRouteAndItsChildren(currNode, context, parentContexts, checks);
        }
        checks.canActivateChecks.push(new CanActivate(futurePath));
        // If we have a component, we need to go through an outlet.
        if (future.component) {
            getChildRouteGuards(futureNode, null, context ? context.children : null, futurePath, checks);
            // if we have a componentless route, we recurse but keep the same outlet map.
        }
        else {
            getChildRouteGuards(futureNode, null, parentContexts, futurePath, checks);
        }
    }
    return checks;
}
function shouldRunGuardsAndResolvers(curr, future, mode) {
    if (typeof mode === 'function') {
        return mode(curr, future);
    }
    switch (mode) {
        case 'pathParamsChange':
            return !equalPath(curr.url, future.url);
        case 'pathParamsOrQueryParamsChange':
            return !equalPath(curr.url, future.url) ||
                !shallowEqual(curr.queryParams, future.queryParams);
        case 'always':
            return true;
        case 'paramsOrQueryParamsChange':
            return !equalParamsAndUrlSegments(curr, future) ||
                !shallowEqual(curr.queryParams, future.queryParams);
        case 'paramsChange':
        default:
            return !equalParamsAndUrlSegments(curr, future);
    }
}
function deactivateRouteAndItsChildren(route, context, parentContexts, checks) {
    var children = nodeChildrenAsMap(route);
    var r = route.value;
    forEach(children, function (node, childName) {
        if (!r.component) {
            deactivateRouteAndItsChildren(node, parentContexts ? parentContexts.getContext(childName) : context, parentContexts, checks);
        }
        else if (context) {
            deactivateRouteAndItsChildren(node, context.children.getContext(childName), parentContexts, checks);
        }
        else {
            deactivateRouteAndItsChildren(node, null, parentContexts, checks);
        }
    });
    if (!r.component) {
        checks.canDeactivateChecks.push(new CanDeactivate(null, r));
    }
    else if (context && context.outlet && context.outlet.isActivated) {
        checks.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, r));
    }
    else {
        checks.canDeactivateChecks.push(new CanDeactivate(null, r));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlYWN0aXZhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3JvdXRlci9zcmMvdXRpbHMvcHJlYWN0aXZhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFNSCxPQUFPLEVBQThDLHlCQUF5QixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkcsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN0QyxPQUFPLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBVyxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUxRDtJQUVFLHFCQUFtQixJQUE4QjtRQUE5QixTQUFJLEdBQUosSUFBSSxDQUEwQjtRQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7O0FBRUQ7SUFDRSx1QkFBbUIsU0FBc0IsRUFBUyxLQUE2QjtRQUE1RCxjQUFTLEdBQVQsU0FBUyxDQUFhO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBd0I7SUFBRyxDQUFDO0lBQ3JGLG9CQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7O0FBT0QsTUFBTSxVQUFVLGlCQUFpQixDQUM3QixNQUEyQixFQUFFLElBQXlCLEVBQ3RELGNBQXNDO0lBQ3hDLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDaEMsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFFMUMsT0FBTyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLGNB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Q0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7UUFDaEIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM3RDtTQUFNLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7UUFDbEUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pGO1NBQU07UUFDTCxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzdEO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TG9hZGVkUm91dGVyQ29uZmlnLCBSdW5HdWFyZHNBbmRSZXNvbHZlcnN9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQge0NoaWxkcmVuT3V0bGV0Q29udGV4dHMsIE91dGxldENvbnRleHR9IGZyb20gJy4uL3JvdXRlcl9vdXRsZXRfY29udGV4dCc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QsIGVxdWFsUGFyYW1zQW5kVXJsU2VnbWVudHN9IGZyb20gJy4uL3JvdXRlcl9zdGF0ZSc7XG5pbXBvcnQge2VxdWFsUGF0aH0gZnJvbSAnLi4vdXJsX3RyZWUnO1xuaW1wb3J0IHtmb3JFYWNoLCBzaGFsbG93RXF1YWx9IGZyb20gJy4uL3V0aWxzL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtUcmVlTm9kZSwgbm9kZUNoaWxkcmVuQXNNYXB9IGZyb20gJy4uL3V0aWxzL3RyZWUnO1xuXG5leHBvcnQgY2xhc3MgQ2FuQWN0aXZhdGUge1xuICByZWFkb25seSByb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdDtcbiAgY29uc3RydWN0b3IocHVibGljIHBhdGg6IEFjdGl2YXRlZFJvdXRlU25hcHNob3RbXSkge1xuICAgIHRoaXMucm91dGUgPSB0aGlzLnBhdGhbdGhpcy5wYXRoLmxlbmd0aCAtIDFdO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYW5EZWFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudDogT2JqZWN0fG51bGwsIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCkge31cbn1cblxuZXhwb3J0IGRlY2xhcmUgdHlwZSBDaGVja3MgPSB7XG4gIGNhbkRlYWN0aXZhdGVDaGVja3M6IENhbkRlYWN0aXZhdGVbXSxcbiAgY2FuQWN0aXZhdGVDaGVja3M6IENhbkFjdGl2YXRlW10sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsUm91dGVHdWFyZHMoXG4gICAgZnV0dXJlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBjdXJyOiBSb3V0ZXJTdGF0ZVNuYXBzaG90LFxuICAgIHBhcmVudENvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzKSB7XG4gIGNvbnN0IGZ1dHVyZVJvb3QgPSBmdXR1cmUuX3Jvb3Q7XG4gIGNvbnN0IGN1cnJSb290ID0gY3VyciA/IGN1cnIuX3Jvb3QgOiBudWxsO1xuXG4gIHJldHVybiBnZXRDaGlsZFJvdXRlR3VhcmRzKGZ1dHVyZVJvb3QsIGN1cnJSb290LCBwYXJlbnRDb250ZXh0cywgW2Z1dHVyZVJvb3QudmFsdWVdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENhbkFjdGl2YXRlQ2hpbGQocDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6XG4gICAge25vZGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIGd1YXJkczogYW55W119fG51bGwge1xuICBjb25zdCBjYW5BY3RpdmF0ZUNoaWxkID0gcC5yb3V0ZUNvbmZpZyA/IHAucm91dGVDb25maWcuY2FuQWN0aXZhdGVDaGlsZCA6IG51bGw7XG4gIGlmICghY2FuQWN0aXZhdGVDaGlsZCB8fCBjYW5BY3RpdmF0ZUNoaWxkLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gIHJldHVybiB7bm9kZTogcCwgZ3VhcmRzOiBjYW5BY3RpdmF0ZUNoaWxkfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRva2VuKFxuICAgIHRva2VuOiBhbnksIHNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBtb2R1bGVJbmplY3RvcjogSW5qZWN0b3IpOiBhbnkge1xuICBjb25zdCBjb25maWcgPSBnZXRDbG9zZXN0TG9hZGVkQ29uZmlnKHNuYXBzaG90KTtcbiAgY29uc3QgaW5qZWN0b3IgPSBjb25maWcgPyBjb25maWcubW9kdWxlLmluamVjdG9yIDogbW9kdWxlSW5qZWN0b3I7XG4gIHJldHVybiBpbmplY3Rvci5nZXQodG9rZW4pO1xufVxuXG5mdW5jdGlvbiBnZXRDbG9zZXN0TG9hZGVkQ29uZmlnKHNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogTG9hZGVkUm91dGVyQ29uZmlnfG51bGwge1xuICBpZiAoIXNuYXBzaG90KSByZXR1cm4gbnVsbDtcblxuICBmb3IgKGxldCBzID0gc25hcHNob3QucGFyZW50OyBzOyBzID0gcy5wYXJlbnQpIHtcbiAgICBjb25zdCByb3V0ZSA9IHMucm91dGVDb25maWc7XG4gICAgaWYgKHJvdXRlICYmIHJvdXRlLl9sb2FkZWRDb25maWcpIHJldHVybiByb3V0ZS5fbG9hZGVkQ29uZmlnO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldENoaWxkUm91dGVHdWFyZHMoXG4gICAgZnV0dXJlTm9kZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD4sIGN1cnJOb2RlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PnwgbnVsbCxcbiAgICBjb250ZXh0czogQ2hpbGRyZW5PdXRsZXRDb250ZXh0cyB8IG51bGwsIGZ1dHVyZVBhdGg6IEFjdGl2YXRlZFJvdXRlU25hcHNob3RbXSxcbiAgICBjaGVja3M6IENoZWNrcyA9IHtcbiAgICAgIGNhbkRlYWN0aXZhdGVDaGVja3M6IFtdLFxuICAgICAgY2FuQWN0aXZhdGVDaGVja3M6IFtdXG4gICAgfSk6IENoZWNrcyB7XG4gIGNvbnN0IHByZXZDaGlsZHJlbiA9IG5vZGVDaGlsZHJlbkFzTWFwKGN1cnJOb2RlKTtcblxuICAvLyBQcm9jZXNzIHRoZSBjaGlsZHJlbiBvZiB0aGUgZnV0dXJlIHJvdXRlXG4gIGZ1dHVyZU5vZGUuY2hpbGRyZW4uZm9yRWFjaChjID0+IHtcbiAgICBnZXRSb3V0ZUd1YXJkcyhjLCBwcmV2Q2hpbGRyZW5bYy52YWx1ZS5vdXRsZXRdLCBjb250ZXh0cywgZnV0dXJlUGF0aC5jb25jYXQoW2MudmFsdWVdKSwgY2hlY2tzKTtcbiAgICBkZWxldGUgcHJldkNoaWxkcmVuW2MudmFsdWUub3V0bGV0XTtcbiAgfSk7XG5cbiAgLy8gUHJvY2VzcyBhbnkgY2hpbGRyZW4gbGVmdCBmcm9tIHRoZSBjdXJyZW50IHJvdXRlIChub3QgYWN0aXZlIGZvciB0aGUgZnV0dXJlIHJvdXRlKVxuICBmb3JFYWNoKFxuICAgICAgcHJldkNoaWxkcmVuLFxuICAgICAgKHY6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+LCBrOiBzdHJpbmcpID0+XG4gICAgICAgICAgZGVhY3RpdmF0ZVJvdXRlQW5kSXRzQ2hpbGRyZW4odiwgY29udGV4dHMgIS5nZXRDb250ZXh0KGspLCBjb250ZXh0cywgY2hlY2tzKSk7XG5cbiAgcmV0dXJuIGNoZWNrcztcbn1cblxuZnVuY3Rpb24gZ2V0Um91dGVHdWFyZHMoXG4gICAgZnV0dXJlTm9kZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD4sIGN1cnJOb2RlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PixcbiAgICBwYXJlbnRDb250ZXh0czogQ2hpbGRyZW5PdXRsZXRDb250ZXh0cyB8IG51bGwsIGZ1dHVyZVBhdGg6IEFjdGl2YXRlZFJvdXRlU25hcHNob3RbXSxcbiAgICBjaGVja3M6IENoZWNrcyA9IHtcbiAgICAgIGNhbkRlYWN0aXZhdGVDaGVja3M6IFtdLFxuICAgICAgY2FuQWN0aXZhdGVDaGVja3M6IFtdXG4gICAgfSk6IENoZWNrcyB7XG4gIGNvbnN0IGZ1dHVyZSA9IGZ1dHVyZU5vZGUudmFsdWU7XG4gIGNvbnN0IGN1cnIgPSBjdXJyTm9kZSA/IGN1cnJOb2RlLnZhbHVlIDogbnVsbDtcbiAgY29uc3QgY29udGV4dCA9IHBhcmVudENvbnRleHRzID8gcGFyZW50Q29udGV4dHMuZ2V0Q29udGV4dChmdXR1cmVOb2RlLnZhbHVlLm91dGxldCkgOiBudWxsO1xuXG4gIC8vIHJldXNpbmcgdGhlIG5vZGVcbiAgaWYgKGN1cnIgJiYgZnV0dXJlLnJvdXRlQ29uZmlnID09PSBjdXJyLnJvdXRlQ29uZmlnKSB7XG4gICAgY29uc3Qgc2hvdWxkUnVuID1cbiAgICAgICAgc2hvdWxkUnVuR3VhcmRzQW5kUmVzb2x2ZXJzKGN1cnIsIGZ1dHVyZSwgZnV0dXJlLnJvdXRlQ29uZmlnICEucnVuR3VhcmRzQW5kUmVzb2x2ZXJzKTtcbiAgICBpZiAoc2hvdWxkUnVuKSB7XG4gICAgICBjaGVja3MuY2FuQWN0aXZhdGVDaGVja3MucHVzaChuZXcgQ2FuQWN0aXZhdGUoZnV0dXJlUGF0aCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB3ZSBuZWVkIHRvIHNldCB0aGUgZGF0YVxuICAgICAgZnV0dXJlLmRhdGEgPSBjdXJyLmRhdGE7XG4gICAgICBmdXR1cmUuX3Jlc29sdmVkRGF0YSA9IGN1cnIuX3Jlc29sdmVkRGF0YTtcbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBoYXZlIGEgY29tcG9uZW50LCB3ZSBuZWVkIHRvIGdvIHRocm91Z2ggYW4gb3V0bGV0LlxuICAgIGlmIChmdXR1cmUuY29tcG9uZW50KSB7XG4gICAgICBnZXRDaGlsZFJvdXRlR3VhcmRzKFxuICAgICAgICAgIGZ1dHVyZU5vZGUsIGN1cnJOb2RlLCBjb250ZXh0ID8gY29udGV4dC5jaGlsZHJlbiA6IG51bGwsIGZ1dHVyZVBhdGgsIGNoZWNrcyk7XG5cbiAgICAgIC8vIGlmIHdlIGhhdmUgYSBjb21wb25lbnRsZXNzIHJvdXRlLCB3ZSByZWN1cnNlIGJ1dCBrZWVwIHRoZSBzYW1lIG91dGxldCBtYXAuXG4gICAgfSBlbHNlIHtcbiAgICAgIGdldENoaWxkUm91dGVHdWFyZHMoZnV0dXJlTm9kZSwgY3Vyck5vZGUsIHBhcmVudENvbnRleHRzLCBmdXR1cmVQYXRoLCBjaGVja3MpO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRSdW4pIHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGNvbnRleHQgJiYgY29udGV4dC5vdXRsZXQgJiYgY29udGV4dC5vdXRsZXQuY29tcG9uZW50IHx8IG51bGw7XG4gICAgICBjaGVja3MuY2FuRGVhY3RpdmF0ZUNoZWNrcy5wdXNoKG5ldyBDYW5EZWFjdGl2YXRlKGNvbXBvbmVudCwgY3VycikpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoY3Vycikge1xuICAgICAgZGVhY3RpdmF0ZVJvdXRlQW5kSXRzQ2hpbGRyZW4oY3Vyck5vZGUsIGNvbnRleHQsIHBhcmVudENvbnRleHRzLCBjaGVja3MpO1xuICAgIH1cblxuICAgIGNoZWNrcy5jYW5BY3RpdmF0ZUNoZWNrcy5wdXNoKG5ldyBDYW5BY3RpdmF0ZShmdXR1cmVQYXRoKSk7XG4gICAgLy8gSWYgd2UgaGF2ZSBhIGNvbXBvbmVudCwgd2UgbmVlZCB0byBnbyB0aHJvdWdoIGFuIG91dGxldC5cbiAgICBpZiAoZnV0dXJlLmNvbXBvbmVudCkge1xuICAgICAgZ2V0Q2hpbGRSb3V0ZUd1YXJkcyhmdXR1cmVOb2RlLCBudWxsLCBjb250ZXh0ID8gY29udGV4dC5jaGlsZHJlbiA6IG51bGwsIGZ1dHVyZVBhdGgsIGNoZWNrcyk7XG5cbiAgICAgIC8vIGlmIHdlIGhhdmUgYSBjb21wb25lbnRsZXNzIHJvdXRlLCB3ZSByZWN1cnNlIGJ1dCBrZWVwIHRoZSBzYW1lIG91dGxldCBtYXAuXG4gICAgfSBlbHNlIHtcbiAgICAgIGdldENoaWxkUm91dGVHdWFyZHMoZnV0dXJlTm9kZSwgbnVsbCwgcGFyZW50Q29udGV4dHMsIGZ1dHVyZVBhdGgsIGNoZWNrcyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNoZWNrcztcbn1cblxuZnVuY3Rpb24gc2hvdWxkUnVuR3VhcmRzQW5kUmVzb2x2ZXJzKFxuICAgIGN1cnI6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIGZ1dHVyZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcbiAgICBtb2RlOiBSdW5HdWFyZHNBbmRSZXNvbHZlcnMgfCB1bmRlZmluZWQpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiBtb2RlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG1vZGUoY3VyciwgZnV0dXJlKTtcbiAgfVxuICBzd2l0Y2ggKG1vZGUpIHtcbiAgICBjYXNlICdwYXRoUGFyYW1zQ2hhbmdlJzpcbiAgICAgIHJldHVybiAhZXF1YWxQYXRoKGN1cnIudXJsLCBmdXR1cmUudXJsKTtcblxuICAgIGNhc2UgJ3BhdGhQYXJhbXNPclF1ZXJ5UGFyYW1zQ2hhbmdlJzpcbiAgICAgIHJldHVybiAhZXF1YWxQYXRoKGN1cnIudXJsLCBmdXR1cmUudXJsKSB8fFxuICAgICAgICAgICFzaGFsbG93RXF1YWwoY3Vyci5xdWVyeVBhcmFtcywgZnV0dXJlLnF1ZXJ5UGFyYW1zKTtcblxuICAgIGNhc2UgJ2Fsd2F5cyc6XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGNhc2UgJ3BhcmFtc09yUXVlcnlQYXJhbXNDaGFuZ2UnOlxuICAgICAgcmV0dXJuICFlcXVhbFBhcmFtc0FuZFVybFNlZ21lbnRzKGN1cnIsIGZ1dHVyZSkgfHxcbiAgICAgICAgICAhc2hhbGxvd0VxdWFsKGN1cnIucXVlcnlQYXJhbXMsIGZ1dHVyZS5xdWVyeVBhcmFtcyk7XG5cbiAgICBjYXNlICdwYXJhbXNDaGFuZ2UnOlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gIWVxdWFsUGFyYW1zQW5kVXJsU2VnbWVudHMoY3VyciwgZnV0dXJlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWFjdGl2YXRlUm91dGVBbmRJdHNDaGlsZHJlbihcbiAgICByb3V0ZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD4sIGNvbnRleHQ6IE91dGxldENvbnRleHQgfCBudWxsLFxuICAgIHBhcmVudENvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzIHwgbnVsbCwgY2hlY2tzOiBDaGVja3MpOiB2b2lkIHtcbiAgY29uc3QgY2hpbGRyZW4gPSBub2RlQ2hpbGRyZW5Bc01hcChyb3V0ZSk7XG4gIGNvbnN0IHIgPSByb3V0ZS52YWx1ZTtcblxuICBmb3JFYWNoKGNoaWxkcmVuLCAobm9kZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD4sIGNoaWxkTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCFyLmNvbXBvbmVudCkge1xuICAgICAgZGVhY3RpdmF0ZVJvdXRlQW5kSXRzQ2hpbGRyZW4oXG4gICAgICAgICAgbm9kZSwgcGFyZW50Q29udGV4dHMgPyBwYXJlbnRDb250ZXh0cy5nZXRDb250ZXh0KGNoaWxkTmFtZSkgOiBjb250ZXh0LCBwYXJlbnRDb250ZXh0cyxcbiAgICAgICAgICBjaGVja3MpO1xuICAgIH0gZWxzZSBpZiAoY29udGV4dCkge1xuICAgICAgZGVhY3RpdmF0ZVJvdXRlQW5kSXRzQ2hpbGRyZW4oXG4gICAgICAgICAgbm9kZSwgY29udGV4dC5jaGlsZHJlbi5nZXRDb250ZXh0KGNoaWxkTmFtZSksIHBhcmVudENvbnRleHRzLCBjaGVja3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWFjdGl2YXRlUm91dGVBbmRJdHNDaGlsZHJlbihub2RlLCBudWxsLCBwYXJlbnRDb250ZXh0cywgY2hlY2tzKTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmICghci5jb21wb25lbnQpIHtcbiAgICBjaGVja3MuY2FuRGVhY3RpdmF0ZUNoZWNrcy5wdXNoKG5ldyBDYW5EZWFjdGl2YXRlKG51bGwsIHIpKTtcbiAgfSBlbHNlIGlmIChjb250ZXh0ICYmIGNvbnRleHQub3V0bGV0ICYmIGNvbnRleHQub3V0bGV0LmlzQWN0aXZhdGVkKSB7XG4gICAgY2hlY2tzLmNhbkRlYWN0aXZhdGVDaGVja3MucHVzaChuZXcgQ2FuRGVhY3RpdmF0ZShjb250ZXh0Lm91dGxldC5jb21wb25lbnQsIHIpKTtcbiAgfSBlbHNlIHtcbiAgICBjaGVja3MuY2FuRGVhY3RpdmF0ZUNoZWNrcy5wdXNoKG5ldyBDYW5EZWFjdGl2YXRlKG51bGwsIHIpKTtcbiAgfVxufVxuIl19