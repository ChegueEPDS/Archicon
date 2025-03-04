// app/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // Token lekérése

  // Ha van token, hozzáadjuk a kéréshez
  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      })
    : req;

  // A kérés továbbadása a következő interceptorhoz vagy a végső handlerhez
  return next(authReq);
};