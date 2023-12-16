
import { ApiService } from "@app-verse/shared";
import { CoreService } from "./core.service";
import { TokenService } from "./token.service";

export function initializeApp(apiService:ApiService,coreService:CoreService,tokenService:TokenService) {
    return (): Promise<void> =>{
        return new Promise((resolve) => {
          const token=tokenService.getToken()
          if(token){
          
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
          }else{
            resolve();
          }

        });
      }
    
  }
  