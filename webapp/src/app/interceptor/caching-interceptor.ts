import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestCacheWithMap } from '../service/request-cache.service';

export class CachingInterceptor implements HttpInterceptor {
    constructor(private cache: RequestCacheWithMap) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // continue if not cachable.
        if (!isCachable(req)) { return next.handle(req); }

        const cachedResponse = this.cache.get(req);
        return cachedResponse ?
            of(cachedResponse) : sendRequest(req, next, this.cache);
    }
}
function sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCacheWithMap): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
        tap(event => {
            // There may be other events besides the response.
            if (event instanceof HttpResponse) {
                cache.put(req, event); // Update the cache.
            }
        })
    );
}

function isCachable(req: HttpRequest<any>) {
    return req.method.toLowerCase() === 'get';
}
