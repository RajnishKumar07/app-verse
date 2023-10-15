
import { ApiService } from "@app-verse/shared";
import { CoreService } from "./core.service";

export function initializeApp(apiService:ApiService,coreService:CoreService) {
    return (): Promise<void> =>{
        return new Promise((resolve) => {
          apiService.get('/users/showMe',{headers:{'X-Show-Toast':  'false'}}).subscribe(
           { next:(res:any) => {
            const {name:user,userId,role}=res.user
              coreService.user.set({user,userId,role})
             console.log('user------->',res,coreService.user())
              resolve();
            },
           error: (error) => {
              coreService.navigateTo(['/login'])
              resolve();
            }}
          );
        });
      }
    
  }
  