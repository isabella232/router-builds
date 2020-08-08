/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵisObservable as isObservable, ɵisPromise as isPromise } from '@angular/core';
import { from, of } from 'rxjs';
import { concatAll, last as lastValue, map } from 'rxjs/operators';
import { PRIMARY_OUTLET } from '../shared';
export function shallowEqualArrays(a, b) {
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; ++i) {
        if (!shallowEqual(a[i], b[i]))
            return false;
    }
    return true;
}
export function shallowEqual(a, b) {
    // Casting Object.keys return values to include `undefined` as there are some cases
    // in IE 11 where this can happen. Cannot provide a test because the behavior only
    // exists in certain circumstances in IE 11, therefore doing this cast ensures the
    // logic is correct for when this edge case is hit.
    const k1 = Object.keys(a);
    const k2 = Object.keys(b);
    if (!k1 || !k2 || k1.length != k2.length) {
        return false;
    }
    let key;
    for (let i = 0; i < k1.length; i++) {
        key = k1[i];
        if (!equalArraysOrString(a[key], b[key])) {
            return false;
        }
    }
    return true;
}
/**
 * Test equality for arrays of strings or a string.
 */
export function equalArraysOrString(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length)
            return false;
        const aSorted = [...a].sort();
        const bSorted = [...b].sort();
        return aSorted.every((val, index) => bSorted[index] === val);
    }
    else {
        return a === b;
    }
}
/**
 * Flattens single-level nested arrays.
 */
export function flatten(arr) {
    return Array.prototype.concat.apply([], arr);
}
/**
 * Return the last element of an array.
 */
export function last(a) {
    return a.length > 0 ? a[a.length - 1] : null;
}
/**
 * Verifys all booleans in an array are `true`.
 */
export function and(bools) {
    return !bools.some(v => !v);
}
export function forEach(map, callback) {
    for (const prop in map) {
        if (map.hasOwnProperty(prop)) {
            callback(map[prop], prop);
        }
    }
}
export function waitForMap(obj, fn) {
    if (Object.keys(obj).length === 0) {
        return of({});
    }
    const waitHead = [];
    const waitTail = [];
    const res = {};
    forEach(obj, (a, k) => {
        const mapped = fn(k, a).pipe(map((r) => res[k] = r));
        if (k === PRIMARY_OUTLET) {
            waitHead.push(mapped);
        }
        else {
            waitTail.push(mapped);
        }
    });
    // Closure compiler has problem with using spread operator here. So we use "Array.concat".
    // Note that we also need to cast the new promise because TypeScript cannot infer the type
    // when calling the "of" function through "Function.apply"
    return of.apply(null, waitHead.concat(waitTail))
        .pipe(concatAll(), lastValue(), map(() => res));
}
export function wrapIntoObservable(value) {
    if (isObservable(value)) {
        return value;
    }
    if (isPromise(value)) {
        // Use `Promise.resolve()` to wrap promise-like instances.
        // Required ie when a Resolver returns a AngularJS `$q` promise to correctly trigger the
        // change detection.
        return from(Promise.resolve(value));
    }
    return of(value);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3JvdXRlci9zcmMvdXRpbHMvY29sbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsYUFBYSxJQUFJLFlBQVksRUFBRSxVQUFVLElBQUksU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxJQUFJLEVBQWMsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRSxPQUFPLEVBQVMsY0FBYyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRWpELE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxDQUFRLEVBQUUsQ0FBUTtJQUNuRCxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLE1BQU07UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN4QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztLQUM3QztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsQ0FBUyxFQUFFLENBQVM7SUFDL0MsbUZBQW1GO0lBQ25GLGtGQUFrRjtJQUNsRixrRkFBa0Y7SUFDbEYsbURBQW1EO0lBQ25ELE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUF5QixDQUFDO0lBQ2xELE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FB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QUFFLENBQUMsQ0FBSSxFQUFFLENBQVMsRUFBRSxFQUFFO1FBQy9CLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLEtBQUssY0FBYyxFQUFFO1lBQ3hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkI7YUFBTTtZQUNMLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkI7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILDBGQUEwRjtJQUMxRiwwRkFBMEY7SUFDMUYsMERBQTBEO0lBQzFELE9BQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBK0I7U0FDMUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3RELENBQUM7QUFFRCxNQUFNLFVBQVUsa0JBQWtCLENBQUksS0FBaUM7SUFDckUsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDdkIsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3BCLDBEQUEwRDtRQUMxRCx3RkFBd0Y7UUFDeEYsb0JBQW9CO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNyQztJQUVELE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHvJtWlzT2JzZXJ2YWJsZSBhcyBpc09ic2VydmFibGUsIMm1aXNQcm9taXNlIGFzIGlzUHJvbWlzZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2Zyb20sIE9ic2VydmFibGUsIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7Y29uY2F0QWxsLCBsYXN0IGFzIGxhc3RWYWx1ZSwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7UGFyYW1zLCBQUklNQVJZX09VVExFVH0gZnJvbSAnLi4vc2hhcmVkJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNoYWxsb3dFcXVhbEFycmF5cyhhOiBhbnlbXSwgYjogYW55W10pOiBib29sZWFuIHtcbiAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoIXNoYWxsb3dFcXVhbChhW2ldLCBiW2ldKSkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hhbGxvd0VxdWFsKGE6IFBhcmFtcywgYjogUGFyYW1zKTogYm9vbGVhbiB7XG4gIC8vIENhc3RpbmcgT2JqZWN0LmtleXMgcmV0dXJuIHZhbHVlcyB0byBpbmNsdWRlIGB1bmRlZmluZWRgIGFzIHRoZXJlIGFyZSBzb21lIGNhc2VzXG4gIC8vIGluIElFIDExIHdoZXJlIHRoaXMgY2FuIGhhcHBlbi4gQ2Fubm90IHByb3ZpZGUgYSB0ZXN0IGJlY2F1c2UgdGhlIGJlaGF2aW9yIG9ubHlcbiAgLy8gZXhpc3RzIGluIGNlcnRhaW4gY2lyY3Vtc3RhbmNlcyBpbiBJRSAxMSwgdGhlcmVmb3JlIGRvaW5nIHRoaXMgY2FzdCBlbnN1cmVzIHRoZVxuICAvLyBsb2dpYyBpcyBjb3JyZWN0IGZvciB3aGVuIHRoaXMgZWRnZSBjYXNlIGlzIGhpdC5cbiAgY29uc3QgazEgPSBPYmplY3Qua2V5cyhhKSBhcyBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcbiAgY29uc3QgazIgPSBPYmplY3Qua2V5cyhiKSBhcyBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcbiAgaWYgKCFrMSB8fCAhazIgfHwgazEubGVuZ3RoICE9IGsyLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBsZXQga2V5OiBzdHJpbmc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgazEubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBrMVtpXTtcbiAgICBpZiAoIWVxdWFsQXJyYXlzT3JTdHJpbmcoYVtrZXldLCBiW2tleV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIFRlc3QgZXF1YWxpdHkgZm9yIGFycmF5cyBvZiBzdHJpbmdzIG9yIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxBcnJheXNPclN0cmluZyhhOiBzdHJpbmd8c3RyaW5nW10sIGI6IHN0cmluZ3xzdHJpbmdbXSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShhKSAmJiBBcnJheS5pc0FycmF5KGIpKSB7XG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGFTb3J0ZWQgPSBbLi4uYV0uc29ydCgpO1xuICAgIGNvbnN0IGJTb3J0ZWQgPSBbLi4uYl0uc29ydCgpO1xuICAgIHJldHVybiBhU29ydGVkLmV2ZXJ5KCh2YWwsIGluZGV4KSA9PiBiU29ydGVkW2luZGV4XSA9PT0gdmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYSA9PT0gYjtcbiAgfVxufVxuXG4vKipcbiAqIEZsYXR0ZW5zIHNpbmdsZS1sZXZlbCBuZXN0ZWQgYXJyYXlzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbjxUPihhcnI6IFRbXVtdKTogVFtdIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIGFycik7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBsYXN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXN0PFQ+KGE6IFRbXSk6IFR8bnVsbCB7XG4gIHJldHVybiBhLmxlbmd0aCA+IDAgPyBhW2EubGVuZ3RoIC0gMV0gOiBudWxsO1xufVxuXG4vKipcbiAqIFZlcmlmeXMgYWxsIGJvb2xlYW5zIGluIGFuIGFycmF5IGFyZSBgdHJ1ZWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbmQoYm9vbHM6IGJvb2xlYW5bXSk6IGJvb2xlYW4ge1xuICByZXR1cm4gIWJvb2xzLnNvbWUodiA9PiAhdik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoPEssIFY+KG1hcDoge1trZXk6IHN0cmluZ106IFZ9LCBjYWxsYmFjazogKHY6IFYsIGs6IHN0cmluZykgPT4gdm9pZCk6IHZvaWQge1xuICBmb3IgKGNvbnN0IHByb3AgaW4gbWFwKSB7XG4gICAgaWYgKG1hcC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgY2FsbGJhY2sobWFwW3Byb3BdLCBwcm9wKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdhaXRGb3JNYXA8QSwgQj4oXG4gICAgb2JqOiB7W2s6IHN0cmluZ106IEF9LCBmbjogKGs6IHN0cmluZywgYTogQSkgPT4gT2JzZXJ2YWJsZTxCPik6IE9ic2VydmFibGU8e1trOiBzdHJpbmddOiBCfT4ge1xuICBpZiAoT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2Yoe30pO1xuICB9XG5cbiAgY29uc3Qgd2FpdEhlYWQ6IE9ic2VydmFibGU8Qj5bXSA9IFtdO1xuICBjb25zdCB3YWl0VGFpbDogT2JzZXJ2YWJsZTxCPltdID0gW107XG4gIGNvbnN0IHJlczoge1trOiBzdHJpbmddOiBCfSA9IHt9O1xuXG4gIGZvckVhY2gob2JqLCAoYTogQSwgazogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgbWFwcGVkID0gZm4oaywgYSkucGlwZShtYXAoKHI6IEIpID0+IHJlc1trXSA9IHIpKTtcbiAgICBpZiAoayA9PT0gUFJJTUFSWV9PVVRMRVQpIHtcbiAgICAgIHdhaXRIZWFkLnB1c2gobWFwcGVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2FpdFRhaWwucHVzaChtYXBwZWQpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gQ2xvc3VyZSBjb21waWxlciBoYXMgcHJvYmxlbSB3aXRoIHVzaW5nIHNwcmVhZCBvcGVyYXRvciBoZXJlLiBTbyB3ZSB1c2UgXCJBcnJheS5jb25jYXRcIi5cbiAgLy8gTm90ZSB0aGF0IHdlIGFsc28gbmVlZCB0byBjYXN0IHRoZSBuZXcgcHJvbWlzZSBiZWNhdXNlIFR5cGVTY3JpcHQgY2Fubm90IGluZmVyIHRoZSB0eXBlXG4gIC8vIHdoZW4gY2FsbGluZyB0aGUgXCJvZlwiIGZ1bmN0aW9uIHRocm91Z2ggXCJGdW5jdGlvbi5hcHBseVwiXG4gIHJldHVybiAob2YuYXBwbHkobnVsbCwgd2FpdEhlYWQuY29uY2F0KHdhaXRUYWlsKSkgYXMgT2JzZXJ2YWJsZTxPYnNlcnZhYmxlPEI+PilcbiAgICAgIC5waXBlKGNvbmNhdEFsbCgpLCBsYXN0VmFsdWUoKSwgbWFwKCgpID0+IHJlcykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcEludG9PYnNlcnZhYmxlPFQ+KHZhbHVlOiBUfFByb21pc2U8VD58T2JzZXJ2YWJsZTxUPik6IE9ic2VydmFibGU8VD4ge1xuICBpZiAoaXNPYnNlcnZhYmxlKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGlmIChpc1Byb21pc2UodmFsdWUpKSB7XG4gICAgLy8gVXNlIGBQcm9taXNlLnJlc29sdmUoKWAgdG8gd3JhcCBwcm9taXNlLWxpa2UgaW5zdGFuY2VzLlxuICAgIC8vIFJlcXVpcmVkIGllIHdoZW4gYSBSZXNvbHZlciByZXR1cm5zIGEgQW5ndWxhckpTIGAkcWAgcHJvbWlzZSB0byBjb3JyZWN0bHkgdHJpZ2dlciB0aGVcbiAgICAvLyBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgIHJldHVybiBmcm9tKFByb21pc2UucmVzb2x2ZSh2YWx1ZSkpO1xuICB9XG5cbiAgcmV0dXJuIG9mKHZhbHVlKTtcbn1cbiJdfQ==