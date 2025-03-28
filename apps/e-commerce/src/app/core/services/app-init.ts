import { ApiService, IApiResponse } from '@app-verse/shared';
import { CoreService } from './core.service';
import { TokenService } from './token.service';

export function initializeApp(
  apiService: ApiService,
  coreService: CoreService,
  tokenService: TokenService
) {
  return (): Promise<void> => {
    return new Promise((resolve) => {
      const token = tokenService.getToken();
      if (token) {
        apiService
          .get<
            IApiResponse<{
              role: string;
              user: string;
              userId: number;
              exp: number;
              iat: number;
            }>
          >('/users/showMe', { headers: { 'X-Show-Toast': 'false' } })
          .subscribe({
            next: (
              res: IApiResponse<{
                role: string;
                user: string;
                userId: number;
                exp: number;
                iat: number;
              }>
            ) => {
              const { user, userId, role } = res.data;
              coreService.user.set({ user, userId, role });
              resolve();
            },
            error: (error) => {
              coreService.navigateTo(['/login']);
              resolve();
            },
          });
      } else {
        resolve();
      }
    });
  };
}
